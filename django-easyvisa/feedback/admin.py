from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from feedback.models import FeedbackPhoto, FeedbackVideo


class FeedbackPhotoAdmin(SortableAdminMixin, admin.ModelAdmin):
    readonly_fields = ('image_tag',)
    list_display = ('image_tag', 'photo', 'note',)
    list_editable = ('photo', 'note',)

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo))

    image_tag.short_description = 'Превью'
    image_tag.allow_tags = True


class FeedbackVideoAdmin(SortableAdminMixin, admin.ModelAdmin):
    readonly_fields = ('image_tag',)
    list_display = ('image_tag', 'photo', 'youtube_id', 'note',)
    list_editable = ('photo', 'youtube_id', 'note',)

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo))

    image_tag.short_description = 'Превью'
    image_tag.allow_tags = True


admin.site.register(FeedbackPhoto, FeedbackPhotoAdmin)
admin.site.register(FeedbackVideo, FeedbackVideoAdmin)
