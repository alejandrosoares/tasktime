from django.urls import path

from .views import  MainView, CreateView, UpdateView, DeleteView

app_name = "task"
urlpatterns = [
    path('', MainView, name="main"),
    path('create', CreateView, name="create"),
    path('update', UpdateView, name="update"),
    path('delete', DeleteView, name="delete"),
]