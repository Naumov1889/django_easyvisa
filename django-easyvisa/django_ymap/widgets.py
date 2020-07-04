from django.forms.widgets import TextInput


class YmapCoordFieldWidget(TextInput):
    attrs = None

    def __init__(self, attrs=None):

        default = {'class': 'ymap_field', 'style': 'width:270px'}
        if attrs:
            default.update(attrs)
        super(YmapCoordFieldWidget, self).__init__(default)

    class Media:
        js = ('https://api-maps.yandex.ru/2.1/?apikey=c599d252-3a6f-4b64-872c-a529f6263f40&lang=ru_RU', 'django_ymap/init.js')
