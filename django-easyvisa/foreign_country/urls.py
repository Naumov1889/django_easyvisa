from django.urls import path
from foreign_country.views import visa_list, visa_detail, get_visa_representative, get_visa_documents

app_name = "visa"
urlpatterns = [
    path('', visa_list, name="visa_list"),
    path('<slug>/', visa_detail, name="visa_detail"),
    path('get_visa_representative/<slug>/', get_visa_representative, name="get_visa_representative"),
    path('get_visa_documents/<slug>/', get_visa_documents, name="get_visa_documents"),
]
