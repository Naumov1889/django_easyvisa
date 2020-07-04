from rest_framework import serializers
from callback.models import Callback
from django import forms


class CallbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Callback
        fields = (
            'note',
            'name',
            'phone',
            'email',
            'city',
            'destination',
            'date',
            'n_of_passengers',
            'how_old',
            'question',
            'feedback',
            'detected_or_selected_city'
        )
