from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from projects.models import Project
from .models import Task

from json import loads

def MainView(request, project_id):
    
    project = Project.objects.get(id=project_id)
    tasks = project.tasks.all()

    context = {
        "pending": tasks.filter(status=0),
        "in_process": tasks.filter(status=1),
        "paused": tasks.filter(status=2),
        "finalized": tasks.filter(status=3),
        "project_id": project.id,
        "project_title": project.title
    }

    return render(request, 'task/index.html', context)


@require_http_methods(['POST'])
def CreateView(request, project_id):

    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return redirect("project:main")

    data = loads(request.body)
    title = data.get("title", False)

    if title:
        new = Task.objects.create(title=title, project=project)

        res = {
            "status": "ok",
            "task": {
                "id": new.id,
                "title": new.title,
                "code": new.code,
                "status": new.status
            }
        }

        return JsonResponse(res, status=201)

    return JsonResponse({"status": "error", "task": None})


@require_http_methods(['POST'])
def UpdateView(request, project_id):
    # Change the status task
    
    data = loads(request.body)
    id = data.get("id", False)
    status = data.get("status", False)

    if id and status:

        try:
            task = Task.objects.get(id=id)

            if ((task.status == 0 and status == 1) or 
                (task.status == 1 and status == 2) or
                (task.status == 2 and status == 1) or
                (task.status == 1 and status == 3) or
                (task.status == 2 and status == 3) or
                (status == 4)):

                task.status = status; task.save()

                res = {
                    "status": "ok",
                    "task": {
                        "id": task.id,
                        "title": task.title,
                        "code": task.code,
                        "status": task.status,
                        "duration": task.str_duration
                    }
                }

                return JsonResponse(res)

        except Task.DoesNotExist:
            pass
        
    return JsonResponse({"status": "error", "task": None})


@require_http_methods(['POST'])
def DeleteView(request, project_id):
    
    data = loads(request.body)
    id = data.get("id", False)
    
    if id:
        try:
            task = Task.objects.get(id=id)
            id_task = task.id
            task.delete()

            return JsonResponse({
                "status": "ok",
                "task": {
                    "id": id_task
                }
            })

        except Task.DoesNotExist:
            pass
        
    return JsonResponse({
        "status": "error", 
        "task": None
        })
