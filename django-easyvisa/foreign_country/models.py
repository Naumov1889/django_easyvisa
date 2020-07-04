# for forming slug
from pytils.translit import slugify
from autoslug import AutoSlugField

# transliterate uploading files
import os
from pytils import translit

# for thumbnails
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# for changing word form (падежи стран)
import pymorphy2

from django_ymap.fields import YmapCoord  # creates interactive map to get coordinates
from django.db import models
from django.core.exceptions import ValidationError
from ckeditor_uploader.fields import RichTextUploadingField

from branch.models import Branch


class Pipeline(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["visa_pipeline/", translit.slugify(name)])
        return path + extension

    title = models.TextField(verbose_name="Текст")
    icon = models.FileField(upload_to=get_file_path, verbose_name="Иконка")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    def icon_tag(self):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:60px;max-height:60px" />' % (
                self.icon))

    icon_tag.short_description = 'Иконка'
    icon_tag.allow_tags = True

    class Meta(object):
        ordering = ['order']
        verbose_name = "Этап работы"
        verbose_name_plural = "Этапы работы"

    def __str__(self):
        return self.title


def get_default_visa_title():
    try:
        last_obj_id = str(Visa.objects.all().last().id)
    except:
        last_obj_id = "0"
    return "Страна " + last_obj_id


class Visa(models.Model):
    def get_file_path_icon(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["flags/", translit.slugify(name)])
        return path + extension

    def get_file_path_photo(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["visa_photo/", translit.slugify(name)])
        return path + extension

    title = models.CharField(max_length=200, default=get_default_visa_title, verbose_name="Название")
    title_2 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Название в В.П.")
    title_3 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Название в Д.П.")

    slug = AutoSlugField(populate_from="title", blank=True, null=True, unique="True",
                         db_index=True, max_length=220, editable=True, verbose_name="Ссылка")
    text = RichTextUploadingField(default="Скоро здесь будет статья", verbose_name="Текст")
    duration_validity = models.CharField(max_length=50, verbose_name="Срок действия", default="до лет")
    duration_registration = models.CharField(max_length=50, verbose_name="Срок оформления", default="от дня")
    price = models.CharField(max_length=50, verbose_name="Цена", default="от")
    icon = models.FileField(upload_to=get_file_path_icon, verbose_name="Иконка", default="flags/empty-flag.svg")
    photo = models.ImageField(upload_to=get_file_path_photo, default="visa_photo/visa_photo_default.jpg", blank=True,
                              verbose_name="Фото для заголовка")

    pipeline = models.ManyToManyField(Pipeline, through='VisaPipeline')

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Страна"
        verbose_name_plural = "Страны"

    def __str__(self):
        return str(self.title)

    def save(self, **kwargs):
        morph = pymorphy2.MorphAnalyzer()

        if not self.title_2:
            self.title_2 = morph.parse(self.title)[0].inflect({'accs'}).word.capitalize()

        if not self.title_3:
            self.title_3 = morph.parse(self.title)[0].inflect({'datv'}).word.capitalize()

        super(Visa, self).save()


class VisaPipeline(models.Model):
    visa = models.ForeignKey(Visa, null=True, on_delete=models.CASCADE, verbose_name="Страна")
    pipeline = models.ForeignKey(Pipeline, null=True, on_delete=models.CASCADE, verbose_name="Этап работы")
    pipeline_order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    def __str__(self):
        return self.pipeline.title

    class Meta(object):
        ordering = ['pipeline_order']
        verbose_name = "Этап работы"
        verbose_name_plural = "Этапы работы"


class VisaRepresentative(models.Model):
    city = models.CharField(max_length=200, verbose_name="Город")
    city_2 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Город в П.П.")
    subdivision = models.CharField(max_length=20, blank=True, null=True, verbose_name="Регион iso code")
    slug = models.SlugField(max_length=200, unique=True, null=True)
    coordinates = YmapCoord(max_length=200, start_query=u'Россия', size_width=600, size_height=150,
                            verbose_name="Координаты")
    address = models.TextField(verbose_name="Адрес")
    phone = models.CharField(max_length=200, verbose_name="Телефон")
    email = models.CharField(max_length=200, blank=True, verbose_name="Почта")
    website = models.CharField(max_length=200, blank=True, verbose_name="Сайт")

    visa = models.ForeignKey(Visa, blank=True, null=True, on_delete=models.CASCADE)

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Представитель"
        verbose_name_plural = "Представители"

    def __str__(self):
        return "Представитель " + self.visa.title + " в " + self.city

    def save(self, **kwargs):
        self.slug = "%s-%s" % (slugify(self.visa), slugify(self.city))

        self.city = self.city.capitalize()

        morph = pymorphy2.MorphAnalyzer()
        if not self.city_2:
            self.city_2 = morph.parse(self.city)[0].inflect({'loct'}).word.capitalize()

        if not self.subdivision:
            branch_subdivision = Branch.objects.filter(city=self.city).filter(subdivision__isnull=False).first()
            if branch_subdivision:
                self.subdivision = branch_subdivision.subdivision
            else:
                visa_representative_subdivision = VisaRepresentative.objects.filter(city=self.city).filter(
                    subdivision__isnull=False).first()
                if visa_representative_subdivision:
                    self.subdivision = branch_subdivision.subdivision

        super(VisaRepresentative, self).save()


class VisaPhoto(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["visa_photo/", translit.slugify(name)])
        return path + extension

    photo_1 = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото 1")
    thumbnail_1 = ImageSpecField(source='photo_1',
                                 processors=[ResizeToFill(565, 380)],
                                 format='JPEG',
                                 options={'quality': 100})
    note_1 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Надпись для фото 1")

    photo_2 = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото 2")
    thumbnail_2 = ImageSpecField(source='photo_2',
                                 processors=[ResizeToFill(625, 415)],
                                 format='JPEG',
                                 options={'quality': 100})
    note_2 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Надпись для фото 2")

    visa = models.ForeignKey(Visa, blank=True, null=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk and VisaPhoto.objects.exists():
            # if you'll not check for self.pk
            # then error will also raised in update of exists model
            raise ValidationError('Только 2 фотографии')
        return super(VisaPhoto, self).save(*args, **kwargs)

    class Meta(object):
        verbose_name = "Фото"
        verbose_name_plural = "Фото"

    def __str__(self):
        return "Фото для " + self.visa.title


class PersonTitle(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")

    class Meta(object):
        verbose_name = "Заголовок лица"
        verbose_name_plural = "Заголовки лиц"

    def __str__(self):
        return self.title


class DocumentTitle(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")

    class Meta(object):
        verbose_name = "Заголовок документа"
        verbose_name_plural = "Заголовки документов"

    def __str__(self):
        return self.title


class VisaPerson(models.Model):
    person_title = models.ForeignKey(PersonTitle, null=True, on_delete=models.SET_NULL,
                                     verbose_name="Лицо")
    slug = models.SlugField(max_length=200, unique=True, null=True)
    visa = models.ForeignKey(Visa, blank=True, null=True, on_delete=models.SET_NULL, verbose_name="Страна")
    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    def __str__(self):
        return self.person_title.title + ' / ' + self.visa.title

    class Meta(object):
        ordering = ['order']
        verbose_name = "Документ"
        verbose_name_plural = "Документы"

    def save(self, **kwargs):
        self.slug = "%s-%s" % (slugify(self.visa), slugify(self.person_title.title))
        super(VisaPerson, self).save()


class VisaDocument(models.Model):
    document_title = models.ForeignKey(DocumentTitle, null=True, on_delete=models.SET_NULL,
                                       verbose_name="Документ")
    description = models.TextField(max_length=400, verbose_name="Описание")
    visa_person = models.ForeignKey(VisaPerson, blank=True, null=True,
                                    on_delete=models.SET_NULL)
    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    def __str__(self):
        return self.document_title.title

    class Meta(object):
        ordering = ['order']
        verbose_name = "Документ"
        verbose_name_plural = "Документы"
