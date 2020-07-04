# transliterate uploading files
import os
from pytils import translit

# for thumbnails
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

# for changing word form (падежи стран)
import pymorphy2

from django_ymap.fields import YmapCoord
from django.db import models
from autoslug import AutoSlugField  # for forming slug


class Country(models.Model):
    title = models.CharField(max_length=200, verbose_name="Страна")
    title_2 = models.CharField(max_length=200, blank=True, null=True, verbose_name="Страна в Р.П.")

    order = models.PositiveIntegerField(default=0, unique=True, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Страна"
        verbose_name_plural = "Страны"

    def __str__(self):
        return self.title

    def save(self, **kwargs):
        morph = pymorphy2.MorphAnalyzer()

        self.title = self.title.capitalize()

        if not self.title_2:
            self.title_2 = morph.parse(self.title)[0].inflect({'gent'}).word.capitalize()

        super(Country, self).save()


class Branch(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["branch_photo/", translit.slugify(name)])
        return path + extension

    city = models.CharField(max_length=200, verbose_name="Город")
    subdivision = models.CharField(max_length=20, blank=True, null=True, verbose_name="Регион iso code")
    slug = AutoSlugField(populate_from="city", blank=True, null=True, unique="True",
                         db_index=True, max_length=220, editable=True, verbose_name="Ссылка")
    coordinates = YmapCoord(max_length=200, start_query=u'Россия', size_width=600, size_height=200,
                            verbose_name="Координаты")
    address = models.TextField(verbose_name="Адрес")
    phone = models.CharField(max_length=200, verbose_name="Телефон")
    email = models.CharField(max_length=200, blank=True, null=True, verbose_name="Почта")
    whatsapp = models.CharField(max_length=200, blank=True, verbose_name="WhatsApp")
    instagram_link = models.CharField(max_length=200, default="https://www.instagram.com/",
                                      verbose_name="Instagram Ссылка")
    instagram_tag = models.CharField(max_length=200, verbose_name="Instagram Тэг")
    work_hours = models.TextField(default="ПН-ПТ с 9:00 до 20:00<br>СБ-ВС выходной", verbose_name="Режим работы")
    vk = models.CharField(max_length=200, blank=True, null=True, verbose_name="VK")

    photo = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото")
    thumbnail = ImageSpecField(source='photo',
                               processors=[ResizeToFit(500, 500)],
                               format='JPEG',
                               options={'quality': 100})

    country = models.ForeignKey(Country, to_field='order', default=0, null=True, on_delete=models.SET_NULL,
                                verbose_name="Страна")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Филиал"
        verbose_name_plural = "Филиалы"

    def __str__(self):
        return self.city

    def save(self, **kwargs):
        self.city = self.city.capitalize()

        super(Branch, self).save()
