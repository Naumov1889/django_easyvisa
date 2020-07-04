from django.urls import path
from index_page.views import index_page

app_name = "index_page"
urlpatterns = [
    path('', index_page, name="home"),
]
