from django.contrib import admin
from english_page.models import EnglishPrice


@admin.register(EnglishPrice)
class EnglishPriceAdmin(admin.ModelAdmin):
    fieldsets = (
        ("1", {
           'fields': ('price_1', 'price_2')
        }),
        ("2", {
            'fields': ('price_3', 'price_4'),
        }),
        ("3", {
            'fields': ('price_5', 'price_6'),
        }),
        ("4", {
            'fields': ('price_7', 'price_8'),
        }),
    )

    list_display = ('id', 'price_1', 'price_2', 'price_3', 'price_4', 'price_5', 'price_6', 'price_7', 'price_8')
    list_editable = ('price_1', 'price_2', 'price_3', 'price_4', 'price_5', 'price_6', 'price_7', 'price_8')

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
