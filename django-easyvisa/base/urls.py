from django.urls import path
from base.views import legal_entity_page, airticket_page, foreign_passport_page, insurance_page

app_name = "base"
urlpatterns = [
    path('yur-licam/', legal_entity_page, name="legal_entity_page"),
    path('airticket/', airticket_page, name="airticket_page"),
    path('zagranpasport/', foreign_passport_page, name="foreign_passport_page"),
    path('insurance/', insurance_page, name="insurance_page"),
]
