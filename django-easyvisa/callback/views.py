from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from callback.serializers import CallbackSerializer
from django.core.mail import send_mail
from django.contrib.auth.models import User


class ResponseThen(Response):
    def __init__(self, data, then_callback, **kwargs):
        super().__init__(data, **kwargs)
        self.then_callback = then_callback

    def close(self):
        super().close()
        self.then_callback()


@api_view(['POST'])
def record_callback(request):
    serializer = CallbackSerializer(data=request.data)
    if serializer.is_valid():
        def do_after():
            title = "Запрос на обратную связь"
            superusers_emails = list(User.objects.filter(is_superuser=True).values_list('email', flat=True))

            if request.session.get("current_branch")["email"] and serializer.validated_data["note"] != "Открыть филиал":
                superusers_emails.append(request.session.get("current_branch")["email"])

            serializer.validated_data["detected_or_selected_city"] = request.session.get("current_branch")["city"]

            message = form_message(serializer.validated_data)

            serializer.save()

            send_mail(
                title,
                message,
                '"easyvisainc.ru" <settings.EMAIL_HOST_USER>',
                superusers_emails
            )

        return ResponseThen({}, do_after, status=status.HTTP_200_OK)

        # return Response(serializer.data)
    return Response(serializer.errors)


def form_message(data):
    message = ""
    for key, value in data.items():
        key = translate_key(key)

        if value != "—":
            message += key + ": " + value + "\n"

    return message


def translate_key(key):
    if key == "note":
        key = "Примечание"

    if key == "detected_or_selected_city":
        key = "Определённый город"

    if key == "name":
        key = "Имя"

    if key == "phone":
        key = "Телефон"

    if key == "email":
        key = "Почта"

    if key == "city":
        key = "Город клиента/вылета"

    if key == "destination":
        key = "Город назначения"

    if key == "date":
        key = "Дата поездки"

    if key == "n_of_passengers":
        key = "№ пассажиров"

    if key == "how_old":
        key = "Возраст"

    if key == "question":
        key = "Вопрос"

    if key == "feedback":
        key = "Отзыв"

    return key
