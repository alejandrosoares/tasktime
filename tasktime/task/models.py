from django.db import models

from .utils import STATUS, DIC_STATUS

from random import randint

class Task(models.Model):
    
    code = models.SmallIntegerField("Code", blank=True)
    title = models.CharField("Title", max_length=30)
    description = models.CharField("Description", max_length=70, blank=True, null=True)
    status = models.SmallIntegerField("Status", choices=STATUS, default=0)
    
    created = models.DateTimeField("Created", auto_now_add=True, auto_now=False)
    updated =  models.DateTimeField("Updated", auto_now_add=False, auto_now=True)
    start = models.DateTimeField("Start", null=True, blank=True)
    end = models.DateTimeField("End",  null=True, blank=True)
    real_duration = models.PositiveBigIntegerField("Duration", null=True, blank=True)
    estimated_duration = models.PositiveBigIntegerField("Estimated Duration", null=True, blank=True)
    times = models.JSONField("Times", default=list, null=True, blank=True)

    def __generate_task_code(self):

        list_code = __class__.objects.values_list("code", flat=True)

        while True:
            code = randint(1, 10000)
            if code not in list_code:
                break

        self.code = code

    def save(self, *args, **kwargs):

        created = True if self._state.adding else False

        if created:
            self.__generate_task_code()

        super(__class__, self).save( *args, **kwargs)

    def __str__(self):
        return f"{self.title} - {DIC_STATUS[self.status]}"

