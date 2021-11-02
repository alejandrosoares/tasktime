from django.urls import path

from .views import  MainView

app_name = "home"
urlpatterns = [
    path('', MainView, name="main"),
]