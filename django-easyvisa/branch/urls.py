from django.urls import path
from branch.views import get_branch, contact_page, branches_page

app_name = "branch"
urlpatterns = [
    path('branch/get_branch/<slug>/', get_branch, name="get_branch"),
    path('contact/<slug>/', contact_page, name="contact_page"),
    path('branches/', branches_page, name="branches_page"),
]
