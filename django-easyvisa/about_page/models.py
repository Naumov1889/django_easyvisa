# transliterate uploading files
import os
from pytils import translit

from django.core.exceptions import ValidationError
from django.db import models


class AboutPageFeature(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["about_page/", translit.slugify(name)])
        return path + extension

    title = models.CharField(max_length=200, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    icon = models.FileField(upload_to=get_file_path, verbose_name="Иконка")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Мы в цифрах"
        verbose_name_plural = "Мы в цифрах"

    def __str__(self):
        return self.title + " / " + self.description[:30]


class Video(models.Model):
    youtube_id = models.CharField(max_length=100, verbose_name="Youtube ID")

    class Meta(object):
        verbose_name = "Видео о нашей работе"
        verbose_name_plural = "Видео о нашей работе"

    def __str__(self):
        return "Видео о нашей работе"

    def save(self, *args, **kwargs):
        if not self.pk and Video.objects.exists():
            # if you'll not check for self.pk
            # then error will also raised in update of exists model
            raise ValidationError('Только 1 видео')
        return super(Video, self).save(*args, **kwargs)


class History(models.Model):
    year = models.CharField(max_length=30, verbose_name="Год")
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "История компании"
        verbose_name_plural = "История компании"

    def __str__(self):
        return self.year + " / " + self.title


class Requisite(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["requisite/", translit.slugify(name)])
        return path + extension

    requisite_1 = models.CharField(max_length=200, verbose_name="ИНН")
    requisite_2 = models.CharField(max_length=200, verbose_name="КПП")
    requisite_3 = models.CharField(max_length=200, verbose_name="БИК")
    requisite_4 = models.TextField(max_length=200, verbose_name="Юридический адрес")
    requisite_5 = models.TextField(max_length=200, verbose_name="Расчетный счет")
    requisite_6 = models.TextField(max_length=200, verbose_name="Корреспондентный счет")
    requisite_file = models.FileField(upload_to=get_file_path, verbose_name="Файл с реквизитами")

    class Meta(object):
        verbose_name = "Реквизиты"
        verbose_name_plural = "Реквизиты"

    def __str__(self):
        return "Реквизиты"

    def save(self, *args, **kwargs):
        if not self.pk and Requisite.objects.exists():
            # if you'll not check for self.pk
            # then error will also raised in update of exists model
            raise ValidationError('Только 1 объект с реквизитами')
        return super(Requisite, self).save(*args, **kwargs)
