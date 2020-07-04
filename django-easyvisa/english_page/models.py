from django.db import models


class EnglishPrice(models.Model):
    price_1 = models.CharField(max_length=30, verbose_name="Цена за индивидуальные занятия")
    price_2 = models.CharField(max_length=30, verbose_name="Цена за занятия в группе")

    price_3 = models.CharField(max_length=30, verbose_name="Min план цена за 1 занятие")
    price_4 = models.CharField(max_length=30, verbose_name="Min план цена за курс")

    price_5 = models.CharField(max_length=30, verbose_name="Std план цена за 1 занятие")
    price_6 = models.CharField(max_length=30, verbose_name="Std план цена за курс")

    price_7 = models.CharField(max_length=30, verbose_name="Мax план цена за 1 занятие")
    price_8 = models.CharField(max_length=30, verbose_name="Мax план цена за курс")

    class Meta(object):
        verbose_name = "Курс английского языка"
        verbose_name_plural = "Курсы английского языка"

    def __str__(self):
        return "Цены на курсы английского языка"
