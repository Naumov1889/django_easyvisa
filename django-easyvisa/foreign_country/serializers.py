from rest_framework import serializers
from foreign_country.models import VisaRepresentative, VisaDocument


class VisaRepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisaRepresentative
        fields = (
            'city',
            'city_2',
            'phone',
            'email',
            'address',
            'coordinates',
            'website'
        )


class VisaDocumentSerializer(serializers.ModelSerializer):
    document_title = serializers.CharField(source='document_title.title', read_only=True)

    class Meta:
        model = VisaDocument
        fields = (
            'document_title',
            'description',
        )
