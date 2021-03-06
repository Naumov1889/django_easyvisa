# Generated by Django 3.0.7 on 2020-07-10 18:04

import autoslug.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index_page', '0004_populardestination_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='FirstScreenStatistic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stat_1', models.CharField(max_length=200, verbose_name='Международных представительств')),
                ('stat_2', models.CharField(max_length=200, verbose_name='турагенств доверяет нам')),
                ('stat_3', models.CharField(max_length=200, verbose_name='Выданных виз за прошедший год')),
                ('stat_4', models.CharField(max_length=200, verbose_name='Одобрения на получение визы')),
            ],
            options={
                'verbose_name': 'Статистика',
                'verbose_name_plural': 'Статистика',
            },
        ),
        migrations.AlterField(
            model_name='populardestination',
            name='slug',
            field=autoslug.fields.AutoSlugField(blank=True, editable=True, max_length=220, null=True, populate_from='city', unique='True', verbose_name='Ссылка'),
        ),
    ]
