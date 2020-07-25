from django.urls import path
from branch.views import get_branch, contact_page, branches_page, change_is_branch_selected

app_name = "branch"
urlpatterns = [
    path('branch/get_branch/<slug>/', get_branch, name="get_branch"),
    path('change_is_branch_selected/', change_is_branch_selected, name="change_is_branch_selected"),
    path('contact/<slug>/', contact_page, name="contact_page"),
    path('branches/', branches_page, name="branches_page"),
]
