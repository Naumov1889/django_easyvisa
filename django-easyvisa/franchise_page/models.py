from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models


class Feature(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    description = models.TextField(max_length=200, verbose_name="Описание")
    wide = models.BooleanField(default=False, verbose_name="Ширикий")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Мы в цифрах"
        verbose_name_plural = "Мы в цифрах"

    def __str__(self):
        return self.title + " / " + self.description[:60]


class Story(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя")
    city = models.CharField(max_length=200, verbose_name="Город")
    text = RichTextUploadingField(default="Скоро здесь будет статья", verbose_name="Текст")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "История успеха"
        verbose_name_plural = "Истории успеха"

    def __str__(self):
        return self.name + " / " + self.city


class StoryCharacteristic(models.Model):
    characteristic = models.CharField(max_length=200, verbose_name="Характеристика")
    value = models.CharField(max_length=200, verbose_name="Значение")

    success_story = models.ForeignKey(Story, on_delete=models.CASCADE)

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Характеристика"
        verbose_name_plural = "Характеристики"

    def __str__(self):
        return self.characteristic
