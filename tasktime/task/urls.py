from django.urls import path

from .views import MainView

app_name = "task"
urlpatterns = [
    path('', MainView, name="main"),
]