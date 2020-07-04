from django.urls import path
from callback.views import record_callback

app_name = "callback"
urlpatterns = [
    path('record_callback/', record_callback, name="record_callback"),
]
