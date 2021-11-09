from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import Project

from json import loads 


def MainView(request):
    projects = Project.objects.all()

    context = {
        "projects": projects
    }
    return render(request, 'projects/index.html', context)
    

@require_http_methods(['POST'])
def CreateView(request):

    data = loads(request.body)
    title = data.get("title", False)

    if title:

        new = Project.objects.create(title=title)

        res = {
            "status": "ok",
            "project": {
                "id": new.id,
                "title": new.title,
                "code": new.code,
                "percent_completed": new.percent_completed,
                "str_duration": new.str_duration
            }
        }

        return JsonResponse(res, status=201)

    return JsonResponse({
        "status": "error", 
        "project": None
        })


@require_http_methods(['POST'])
def DeleteView(request):
    
    data = loads(request.body)
    id = data.get("id", False)
    
    if id:
        try:
            project = Project.objects.get(id=id)
            project_id = project.id
            project.delete()

            return JsonResponse({
                "status": "ok",
                "project": {
                    "id": project_id
                }
            })

        except Project.DoesNotExist:
            pass
    
    return JsonResponse({
        "status": "error", 
        "project": None
        })
