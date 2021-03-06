from django.db import models

class Base(models.Model):

    code = models.SmallIntegerField("Code", blank=True)
    title = models.CharField("Title", max_length=30)
    description = models.CharField(
        "Description", max_length=70, blank=True, null=True)

    created = models.DateTimeField(
        "Created", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(
        "Updated", auto_now_add=False, auto_now=True)
    
    real_duration = models.PositiveBigIntegerField(
        "Duration", null=True, blank=True)
    str_duration = models.CharField(
        "String Duration", max_length=12, null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title
