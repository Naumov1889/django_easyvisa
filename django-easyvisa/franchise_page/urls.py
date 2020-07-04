from django.urls import path
from franchise_page.views import franchise_page

app_name = "franchise_page"
urlpatterns = [
    path('', franchise_page, name="home"),
]
