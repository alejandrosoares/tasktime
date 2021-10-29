from django.db import models

class Base(models.Model):

    code = models.SmallIntegerField("Code", blank=True)
    title = models.CharField("Title", max_length=30)
    description = models.CharField(
        "Description", max_length=100, blank=True, null=True)

    created = models.DateTimeField(
        "Created", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(
        "Updated", auto_now_add=False, auto_now=True)

    def __str__(self):
        return self.title