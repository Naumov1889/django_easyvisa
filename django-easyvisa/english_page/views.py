from django.shortcuts import render
from english_page.models import EnglishPrice


def english_page(request):
    prices = EnglishPrice.objects.all().first()

    return render(request, 'english_page/english.html', {'prices': prices})
