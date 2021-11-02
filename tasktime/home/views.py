from django.shortcuts import render
from django.conf import settings
def MainView(request):
    path_video = f"{settings.BASE_DIR}static/video/how-it-works.mp4"

    
    context = {
        "path_video": path_video
    }
    return render(request, "home/index.html", context)
