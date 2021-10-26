from django.db import models


STATUS = [
    (0, "Pending"),
    (1, "In process"),
    (2, "Paused"),
    (3, "Finalized"),
    (4, "Eliminated"),
]

DIC_STATUS = {
    0:"Pending",
    1:"In process",
    2:"Paused",
    3:"Finalized",
    4:"Eliminated"
}

class Task(models.Model):
    
    code = models.SmallIntegerField("Code")
    title = models.CharField("Title", max_length=30)
    description = models.CharField("Description", max_length=70, blank=True, null=True)
    status = models.SmallIntegerField("Status", choices=STATUS)
    
    created = models.DateTimeField("Created", auto_now_add=True, auto_now=False)
    updated =  models.DateTimeField("Updated", auto_now_add=False, auto_now=True)
    start = models.DateTimeField("Start", null=True, blank=True)
    end = models.DateTimeField("End",  null=True, blank=True)
    real_duration = models.PositiveBigIntegerField("Duration", null=True, blank=True)
    estimated_duration = models.PositiveBigIntegerField("Estimated Duration", null=True, blank=True)
    times = models.JSONField("Times", default=list, null=True, blank=True)

    def __str__(self):
        return f"{self.title} - {DIC_STATUS[self.status]}"

