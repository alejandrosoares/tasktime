from django.shortcuts import render

from .models import Task

def MainView(request):

    tasks = Task.objects.all()

    context = {
        "pending": tasks.filter(status=0),
        "in_process": tasks.filter(status=1),
        "paused": tasks.filter(status=2),
        "finalized": tasks.filter(status=3)
    }

    return render(request, 'task/index.html', context)
