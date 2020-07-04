from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from about_page.models import AboutPageFeature, Video, History, Requisite


@admin.register(AboutPageFeature)
class AboutPageFeatureAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("order", "title", "description", "icon")
    list_editable = ("title", "description", "icon")


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "youtube_id")
    list_editable = ("youtube_id",)

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(History)
class HistoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("order", "year", "title", "description")
    list_editable = ("year", "title", "description")


@admin.register(Requisite)
class RequisiteAdmin(admin.ModelAdmin):
    list_display = ("id", "requisite_1", "requisite_2", "requisite_3", "requisite_4",
                    "requisite_5", "requisite_6", "requisite_file")
    list_editable = ("requisite_1", "requisite_2", "requisite_3", "requisite_4",
                     "requisite_5", "requisite_6", "requisite_file")

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
