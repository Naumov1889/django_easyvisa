from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from index_page.models import PopularDestination, Staff, EnglishCoursePrice, Copyright


@admin.register(PopularDestination)
class PopularDestinationAdmin(SortableAdminMixin, admin.ModelAdmin):
    # inlines = (PopularDestinationCharacteristicInline,)
    readonly_fields = ('image_tag',)
    list_display = ('image_tag', 'city', 'visa_counter', 'price', 'how_long', 'country')
    list_editable = ('city', 'visa_counter', 'price', 'how_long', 'country')

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo))

    image_tag.short_description = 'Превью'
    image_tag.allow_tags = True


@admin.register(Staff)
class StaffAdmin(SortableAdminMixin, admin.ModelAdmin):
    readonly_fields = ('image_tag',)
    list_display = ('image_tag', 'name', 'job', 'quote', 'photo',)
    list_editable = ('name', 'job', 'quote', 'photo',)

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo))

    image_tag.short_description = 'Превью'
    image_tag.allow_tags = True


@admin.register(EnglishCoursePrice)
class EnglishCoursePriceAdmin(admin.ModelAdmin):
    list_display = ('id', 'price',)
    list_editable = ('price',)

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Copyright)
class CopyrightAdmin(admin.ModelAdmin):
    list_display = ('id', 'text',)
    list_editable = ('text',)

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
