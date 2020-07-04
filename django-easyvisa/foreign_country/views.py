from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from foreign_country.serializers import VisaRepresentativeSerializer, VisaDocumentSerializer
from foreign_country.models import Visa, VisaRepresentative, VisaPerson


def visa_list(request):
    visas = Visa.objects.all()

    return render(request, 'foreign_country/visa-list.html', {'visas': visas})


def visa_detail(request, slug):
    visa = get_object_or_404(Visa, slug=slug)

    try:
        representatives = visa.visarepresentative_set.all().values('city', 'city_2', 'slug')
        current_representative = visa.visarepresentative_set.filter(
            city=request.session.get('current_branch')['city']).first()  # match by city
        if not current_representative:  # if no match by city then try find matching by subdivision
            current_representative = visa.visarepresentative_set.filter(
                subdivision=request.session.get('current_branch')['subdivision']).first()
        if not current_representative:  # if no matches then assign first
            current_representative = visa.visarepresentative_set.all().first()

        current_representative.phone = [x.strip() for x in current_representative.phone.split(',')]
    except:  # no representatives
        representatives = False
        current_representative = False

    try:
        persons = visa.visaperson_set.all().values('person_title__title', 'slug')
        current_person = visa.visaperson_set.all().first()
    except:  # no documents(persons)
        persons = False
        current_person = False

    return render(request, 'foreign_country/visa.html',
                  {
                      'visa': visa,
                      'representatives': representatives,
                      'current_representative': current_representative,
                      'persons': persons,
                      'current_person': current_person,
                  })


@api_view(['GET'])
def get_visa_representative(request, slug):
    visa_representative = VisaRepresentative.objects.get(slug=slug)

    serializer_data = VisaRepresentativeSerializer(visa_representative).data

    serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
    serializer_data["coordinates"] = [x.strip() for x in serializer_data["coordinates"].split(',')]
    serializer_data["country"] = visa_representative.visa.title_3

    return Response(serializer_data)


@api_view(['GET'])
def get_visa_documents(request, slug):
    visa_person = VisaPerson.objects.get(slug=slug)
    visa_documents = visa_person.visadocument_set.all()

    serializer_data = VisaDocumentSerializer(visa_documents, many=True).data

    return Response(serializer_data)
