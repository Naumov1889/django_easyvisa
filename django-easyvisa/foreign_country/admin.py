from django_ymap.admin import YmapAdmin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from foreign_country.models import Visa, VisaRepresentative, VisaPhoto, Pipeline, \
    VisaPipeline, VisaPerson, VisaDocument, PersonTitle, DocumentTitle

admin.site.register(PersonTitle)
admin.site.register(DocumentTitle)


class VisaDocumentInline(SortableInlineAdminMixin, admin.StackedInline):
    model = VisaDocument


@admin.register(VisaPerson)
class VisaPersonAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = (VisaDocumentInline,)
    exclude = ('slug',)
    list_display = ('person_title', 'visa',)
    list_filter = ('person_title', 'visa',)
    save_as = True


class VisaPhotoInline(admin.StackedInline):  # or admin.StackedInline or admin.TabularInline
    model = VisaPhoto
    extra = 1
    max_num = 1
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:120px;max-height:120px" /><img src="/media/%s" style="max-width:120px;max-height:120px" />' % (
                obj.photo_1, obj.photo_2))

    image_tag.short_description = 'Превью'
    image_tag.allow_tags = True


class VisaRepresentativeInline(YmapAdmin, SortableInlineAdminMixin, admin.StackedInline):
    model = VisaRepresentative
    exclude = ('slug',)


class PipelineAdmin(SortableAdminMixin, admin.ModelAdmin):
    model = VisaPipeline
    readonly_fields = ('icon_tag',)


admin.site.register(Pipeline, PipelineAdmin)


class VisaPipelineAdmin(SortableInlineAdminMixin, admin.TabularInline):
    model = Visa.pipeline.through
    extra = 1


@admin.register(Visa)
class VisaAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = (VisaPhotoInline, VisaPipelineAdmin,
               VisaRepresentativeInline,)

    readonly_fields = ('icon_tag',)

    def icon_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe(
            '<img src="/media/%s" style="max-width:15px;max-height:15px" />' % (
                obj.icon))

    icon_tag.short_description = 'Иконка'
    icon_tag.allow_tags = True
