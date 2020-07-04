# Generated by Django 3.0.7 on 2020-06-30 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EnglishPrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_1', models.CharField(max_length=30, verbose_name='Цена за индивидуальные занятия')),
                ('price_2', models.CharField(max_length=30, verbose_name='Цена за занятия в группе')),
                ('price_3', models.CharField(max_length=30, verbose_name='Min план цена за 1 занятие')),
                ('price_4', models.CharField(max_length=30, verbose_name='Min план цена за курс')),
                ('price_5', models.CharField(max_length=30, verbose_name='Std план цена за 1 занятие')),
                ('price_6', models.CharField(max_length=30, verbose_name='Std план цена за курс')),
                ('price_7', models.CharField(max_length=30, verbose_name='Мax план цена за 1 занятие')),
                ('price_8', models.CharField(max_length=30, verbose_name='Мax план цена за курс')),
            ],
            options={
                'verbose_name': 'Курс английского языка',
                'verbose_name_plural': 'Курсы английского языка',
            },
        ),
    ]