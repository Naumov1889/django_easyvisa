# transliterate uploading files
import os
from pytils import translit

# for thumbnails
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from autoslug import AutoSlugField
from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models


class FirstScreenStatistic(models.Model):
    stat_1 = models.CharField(max_length=200, verbose_name="Международных представительств")
    stat_2 = models.CharField(max_length=200, verbose_name="турагенств доверяет нам")
    stat_3 = models.CharField(max_length=200, verbose_name="Выданных виз за прошедший год")
    stat_4 = models.CharField(max_length=200, verbose_name="Одобрения на получение визы")

    class Meta(object):
        verbose_name = "Статистика"
        verbose_name_plural = "Статистика"

    def __str__(self):
        return "Статистика"


class PopularDestination(models.Model):
    city = models.CharField(max_length=200, verbose_name="Город")
    country = models.CharField(max_length=200, verbose_name="Страна")
    slug = AutoSlugField(populate_from="city", blank=True, null=True, unique="True",
                         db_index=True, max_length=220, editable=True, verbose_name="Ссылка")
    price = models.CharField(max_length=20, verbose_name="Цена от")
    how_long = models.CharField(default="5 дней", max_length=20, verbose_name="Срок выдачи")

    visa_counter = models.PositiveIntegerField(verbose_name="Выдано виз")

    photo = models.ImageField(upload_to="popular_destination_photo", default=None, verbose_name="Фото")
    thumbnail = ImageSpecField(source='photo',
                               processors=[ResizeToFill(520, 520)],
                               format='JPEG',
                               options={'quality': 100})

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Популярное направление"
        verbose_name_plural = "Популярные направления"

    def __str__(self):
        return self.city + " / " + self.country


class Staff(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["staff_photo/", translit.slugify(name)])
        return path + extension

    name = models.CharField(max_length=100, verbose_name="Имя")
    job = models.CharField(max_length=100, verbose_name="Должность")
    quote = models.TextField(verbose_name="Цитата")
    photo = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Наша команда"
        verbose_name_plural = "Наша команда"

    def __str__(self):
        return self.name + " / " + self.job


class EnglishCoursePrice(models.Model):
    price = models.CharField(max_length=30, verbose_name="Цена")

    class Meta(object):
        verbose_name = "Цена на курсы английского языка"
        verbose_name_plural = "Цена на курсы английского языка"

    def __str__(self):
        return "Курсы английского языка: " + self.price


class Copyright(models.Model):
    text = RichTextUploadingField(verbose_name="Текст")

    class Meta(object):
        verbose_name = "Копирайт"
        verbose_name_plural = "Копирайт"

    def __str__(self):
        return "Копирайт"
