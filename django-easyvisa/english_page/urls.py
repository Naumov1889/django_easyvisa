from django.urls import path
from english_page.views import english_page

app_name = "english_page"
urlpatterns = [
    path('', english_page, name="home"),
]
