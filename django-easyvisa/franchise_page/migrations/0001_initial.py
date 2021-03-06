# Generated by Django 3.0.7 on 2020-06-30 06:41

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Заголовок')),
                ('description', models.TextField(max_length=200, verbose_name='Описание')),
                ('wide', models.BooleanField(default=False, verbose_name='Ширикий')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
            ],
            options={
                'verbose_name': 'Мы в цифрах',
                'verbose_name_plural': 'Мы в цифрах',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Имя')),
                ('city', models.CharField(max_length=200, verbose_name='Город')),
                ('text', ckeditor_uploader.fields.RichTextUploadingField(default='Скоро здесь будет статья', verbose_name='Текст')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
            ],
            options={
                'verbose_name': 'История успеха',
                'verbose_name_plural': 'Истории успеха',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='StoryCharacteristic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('characteristic', models.CharField(max_length=200, verbose_name='Характеристика')),
                ('value', models.CharField(max_length=200, verbose_name='Значение')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
                ('success_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='franchise_page.Story')),
            ],
            options={
                'verbose_name': 'Характеристика',
                'verbose_name_plural': 'Характеристики',
                'ordering': ['order'],
            },
        ),
    ]
