from django.shortcuts import render
from foreign_country.models import Visa


def legal_entity_page(request):
    return render(request, 'base/legal-entity.html')


def airticket_page(request):
    return render(request, 'base/airticket.html')


def foreign_passport_page(request):
    return render(request, 'base/foreign-passport.html')


def insurance_page(request):
    countries = Visa.objects.all().values_list("title", flat=True)
    return render(request, 'base/insurance.html', {'countries': countries})
