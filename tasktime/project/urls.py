from django.urls import path

from .views import  MainView

app_name = "project"
urlpatterns = [
    path('', MainView, name="main")
]