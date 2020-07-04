from django_ymap.admin import YmapAdmin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from branch.models import Branch, Country

@admin.register(Branch)
class BranchAdmin(YmapAdmin, SortableAdminMixin, admin.ModelAdmin):
    readonly_fields = ('image_tag',)
    list_display = ('image_tag', 'city', 'coordinates', 'address', 'phone', 'email', 'whatsapp', 'instagram_link', 'instagram_tag', 'vk', 'photo', 'slug',)
    list_editable = ('city', 'coordinates', 'address', 'phone', 'email', 'whatsapp', 'instagram_link', 'instagram_tag', 'vk', 'photo', 'slug',)

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo))

    image_tag.short_description = 'Фото превью'
    image_tag.allow_tags = True


@admin.register(Country)
class CountryAdmin(SortableAdminMixin, admin.ModelAdmin):
    pass


# @admin.register(Callback)
# class CallbackAdmin(admin.ModelAdmin):
#     readonly_fields = ('created_date', 'note', 'name', 'phone', 'email', 'city',
#                        'destination', 'date', 'how_old', 'question', 'feedback')
#     list_display = ('created_date', 'note', 'name', 'phone', 'email', 'city',
#                     'destination', 'date', 'how_old', 'question', 'feedback')