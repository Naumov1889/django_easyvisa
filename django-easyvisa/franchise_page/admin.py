from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django.contrib import admin
from franchise_page.models import Feature, Story, StoryCharacteristic


@admin.register(Feature)
class FeatureAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("order", "title", "description", "wide")
    list_editable = ("title", "description", "wide")


class StoryCharacteristicInline(SortableInlineAdminMixin, admin.StackedInline):
    model = StoryCharacteristic
    extra = 3


@admin.register(Story)
class StoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = (StoryCharacteristicInline,)
