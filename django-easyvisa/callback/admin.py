from django.contrib import admin
from callback.models import Callback
from django.utils import timezone


@admin.register(Callback)
class CallbackAdmin(admin.ModelAdmin):
    readonly_fields = ('created_date', 'note', 'name', 'phone', 'email', 'detected_or_selected_city', 'city',
                       'destination', 'date', 'n_of_passengers', 'how_old', 'question', 'feedback')
    list_display = ('created_date', 'note', 'name', 'phone', 'email', 'detected_or_selected_city', 'city',
                    'destination', 'date', 'n_of_passengers', 'how_old', 'question', 'feedback')

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False
