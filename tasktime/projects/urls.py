from django.urls import path, include

from .views import  MainView, CreateView, DeleteView

app_name = "project"
urlpatterns = [
    path('', MainView, name="main"),
    path('create', CreateView, name="create"),
    path('delete', DeleteView, name="delete"),
    path('<int:project_id>/', include("task.urls")),
]