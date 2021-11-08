from django.shortcuts import render
from django.conf import settings


def MainView(request):

    context = {
        "path_video": f"{settings.BASE_DIR}static/video/how-it-works.mp4"
    }
    return render(request, "home/index.html", context)
