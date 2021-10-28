from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from .models import Task

from json import loads


def MainView(request):

    tasks = Task.objects.all()

    context = {
        "pending": tasks.filter(status=0),
        "in_process": tasks.filter(status=1),
        "paused": tasks.filter(status=2),
        "finalized": tasks.filter(status=3)
    }

    print("")

    for t in tasks:
        print(t)

    return render(request, 'task/index.html', context)

@require_http_methods(['POST'])
def CreateView(request):

    data = loads(request.body)

    print(data)

    title = data.get("title", False)

    if title:
        new_task = Task.objects.create(title=title)

        print(new_task)
        
        res = {
            "status": "ok",
            "task": {
                "id": new_task.id,
                "title": new_task.title,
                "code": new_task.code,
                "status": new_task.status
            }
        }

        return JsonResponse(res)

    return JsonResponse({"status": "error", "obj": None})


def UpdateView(request):
    # Change the status task
    
    data = loads(request.body)
    id_task = data.get("id", False)
    status = data.get("status", False)

    if id_task and status:

        try:
            task = Task.objects.get(id=id_task)

            print(status)
            print(task.status)

            if ((task.status == 0 and status == 1) or 
                (task.status == 1 and status == 3) or
                (task.status == 2 and status == 3) or
                (task.status == 2 and status == 3) or
                (task.status == 2 and status == 3)):

                task.status = status; task.save()

                res = {
                    "status": "ok",
                    "task": {
                        "id": task.id,
                        "title": task.title,
                        "code": task.code,
                        "status": task.status
                    }
                }

                return JsonResponse(res)

        except Task.DoesNotExist:
            pass
        
    return JsonResponse({"status": "error", "task": None})

@require_http_methods(['POST'])
def DeleteView(request):
    
    data = loads(request.body)
    id_task = data.get("id", False)

    print("data ", data)

    if id_task:
        try:
            task = Task.objects.get(id=id_task)
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
