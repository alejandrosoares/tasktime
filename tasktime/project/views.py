from django.shortcuts import render

from .models import Project

def MainView(request):
    projects = Project.objects.all()

    context = {
        "projects": projects
    }
    return render(request, "project/index.html", context)