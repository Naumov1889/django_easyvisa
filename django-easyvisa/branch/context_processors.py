import os
import geoip2.database
import geoip2
from ipware import get_client_ip
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers
from django.forms.models import model_to_dict

from branch.models import Branch
from branch.serializers import BranchSerializer


def branch(request):
    # only - qs, values - dict.
    branches = Branch.objects.all()
    if not request.session.get('current_branch'):
        # client_ip, is_routable = get_client_ip(request)
        # if client_ip is not None and is_routable:

        reader = geoip2.database.Reader(os.path.join(settings.BASE_DIR, 'GeoLite2-City.mmdb'))

        response = reader.city("145.255.9.175")  # Уфа BA
        client_city = response.city.names['ru']
        client_subdivisions = response.subdivisions.most_specific.iso_code
        reader.close()

        print(client_city, client_subdivisions)

        for branch_i in branches:
            if branch_i.city == client_city:  # match city
                serializer_data = BranchSerializer(branch_i).data
                serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
                request.session['current_branch'] = serializer_data
                break

            elif branch_i.subdivision == client_subdivisions:  # if no city match then try find matching subdivision
                serializer_data = BranchSerializer(branch_i).data
                serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
                request.session['current_branch'] = serializer_data

        if not request.session.get('current_branch'):  # if no matches then assign first
            serializer_data = BranchSerializer(branches.first()).data
            serializer_data["phone"] = [x.strip() for x in serializer_data["phone"].split(',')]
            request.session['current_branch'] = serializer_data

    branches_city_n_slug = branches.values('city', 'slug')

    return {"branches_city_n_slug": branches_city_n_slug}
