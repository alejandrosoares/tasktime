from django.db import models

from project.models import Project
from utils.base import ModelBase

class Component(ModelBase):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

