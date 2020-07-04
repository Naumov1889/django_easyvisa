from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from branch.models import Branch, Country
from branch.serializers import BranchSerializer


@api_view(['GET'])
def get_branch(request, slug):
    branch = Branch.objects.get(slug=slug)

    serializer_data = BranchSerializer(branch).data

    serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
    serializer_data["coordinates"] = [x.strip() for x in serializer_data["coordinates"].split(',')]
    request.session['current_branch'] = serializer_data

    return Response(serializer_data)


def contact_page(request, slug):
    current_branch = Branch.objects.get(slug=slug)

    serializer_data = BranchSerializer(current_branch).data

    serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
    current_branch.phone = [x.strip() for x in current_branch.phone.split(',')]
    serializer_data["coordinates"] = [float(x.strip()) for x in serializer_data["coordinates"].split(',')]

    request.session['current_branch'] = serializer_data

    return render(request, 'branch/contact.html', {'current_branch': current_branch})


def branches_page(request):
    countries = Country.objects.all()

    return render(request, 'branch/branches.html', {'countries': countries})
