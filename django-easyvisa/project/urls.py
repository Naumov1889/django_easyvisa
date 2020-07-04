from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('', include('base.urls')),
    path('', include('index_page.urls')),
    path('visa/', include('foreign_country.urls')),
    path('', include('branch.urls')),
    path('about/', include('about_page.urls')),
    path('english/', include('english_page.urls')),
    path('franchise/', include('franchise_page.urls')),
    path('feedback/', include('feedback.urls')),
    path('callback/', include('callback.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
