# transliterate uploading files
import os
from pytils import translit

# for thumbnails
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit, ResizeToFill

from django.db import models


class FeedbackPhoto(models.Model):
    def get_file_path(self, filename):
        name, extension = os.path.splitext(filename)
        path = ''.join(["feedback_photo/", translit.slugify(name)])
        return path + extension

    photo = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото")
    thumbnail_index_page = ImageSpecField(source='photo',
                                          processors=[ResizeToFill(295, 470)],
                                          format='JPEG',
                                          options={'quality': 100})

    thumbnail_feedback_page = ImageSpecField(source='photo',
                                             processors=[ResizeToFit(295, 700)],
                                             format='JPEG',
                                             options={'quality': 100})

    note = models.CharField(max_length=200, blank=True, null=True, verbose_name="Надпись")
    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Фото"
        verbose_name_plural = "Фото"

    def __str__(self):
        return "Фото " + str(self.order)


class FeedbackVideo(models.Model):
    def get_file_path(self, filename):
        path = ''.join(["feedback_video/thumb/", translit.slugify(filename)])
        return path

    photo = models.ImageField(upload_to=get_file_path, default=None, verbose_name="Фото")
    thumbnail = ImageSpecField(source='photo',
                               processors=[ResizeToFill(450, 260)],
                               format='JPEG',
                               options={'quality': 100})
    youtube_id = models.CharField(max_length=100, verbose_name="Youtube ID")
    note = models.CharField(max_length=200, blank=True, null=True, verbose_name="Надпись")

    order = models.PositiveIntegerField(default=0, blank=False, null=False, verbose_name="Порядок")

    class Meta(object):
        ordering = ['order']
        verbose_name = "Видео"
        verbose_name_plural = "Видео"

    def __str__(self):
        return "Видео " + str(self.order)
