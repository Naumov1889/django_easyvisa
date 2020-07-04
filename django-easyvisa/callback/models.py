from django.db import models


class Callback(models.Model):
    created_date = models.DateField(auto_now_add=True, blank=True, verbose_name="Дата")
    detected_or_selected_city = models.CharField(max_length=100, verbose_name="Определённый город")
    note = models.CharField(max_length=200, verbose_name="Пометка", default="Обратный звонок")
    name = models.CharField(max_length=200, verbose_name="Имя")
    phone = models.CharField(max_length=200, verbose_name="Телефон")
    email = models.CharField(max_length=200, verbose_name="Почта")
    city = models.CharField(max_length=200, verbose_name="Ваш город")
    destination = models.CharField(max_length=200, verbose_name="Куда поедете")
    date = models.CharField(max_length=200, verbose_name="Дата поездки")
    n_of_passengers = models.CharField(max_length=200, verbose_name="№ пассажиров")
    how_old = models.CharField(max_length=200, verbose_name="Возраст")
    question = models.CharField(max_length=200, verbose_name="Вопрос")
    feedback = models.CharField(max_length=200, verbose_name="Отзыв")

    class Meta(object):
        verbose_name = "Заявка на обратную связь"
        verbose_name_plural = "Заявки на обратную связь"

    def __str__(self):
        return self.name + str(self.created_date)
