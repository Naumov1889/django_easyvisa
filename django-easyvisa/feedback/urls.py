from django.urls import path
from feedback.views import feedback_page

app_name = "feedback"
urlpatterns = [
    path('', feedback_page, name="home"),
]
