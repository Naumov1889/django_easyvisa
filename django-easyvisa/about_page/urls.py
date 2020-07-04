from django.urls import path
from about_page.views import about_page

app_name = "about_page"
urlpatterns = [
    path('', about_page, name="home"),
]
