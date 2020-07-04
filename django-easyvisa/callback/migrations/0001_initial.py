# Generated by Django 3.0.7 on 2020-06-30 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Callback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Дата')),
                ('note', models.CharField(default='Обратный звонок', max_length=200, verbose_name='Пометка')),
                ('name', models.CharField(max_length=200, verbose_name='Имя')),
                ('phone', models.CharField(max_length=200, verbose_name='Телефон')),
                ('email', models.CharField(max_length=200, verbose_name='Почта')),
                ('city', models.CharField(max_length=200, verbose_name='Ваш город')),
                ('destination', models.CharField(max_length=200, verbose_name='Куда поедете')),
                ('date', models.CharField(max_length=200, verbose_name='Дата поездки')),
                ('n_of_passengers', models.CharField(max_length=200, verbose_name='№ пассажиров')),
                ('how_old', models.CharField(max_length=200, verbose_name='Возраст')),
                ('question', models.CharField(max_length=200, verbose_name='Вопрос')),
                ('feedback', models.CharField(max_length=200, verbose_name='Отзыв')),
            ],
            options={
                'verbose_name': 'Заявка на обратную связь',
                'verbose_name_plural': 'Заявки на обратную связь',
            },
        ),
    ]
