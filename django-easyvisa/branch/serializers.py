from rest_framework import serializers
from branch.models import Branch


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = (
            'city',
            'subdivision',
            'slug',
            'whatsapp',
            'instagram_link',
            'vk',
            'phone',
            'email',
            'address',
            'coordinates',
            'work_hours',
        )
