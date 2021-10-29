from django.db import models
from django.db.models.fields import DateTimeField

from component.models import Component
from .utils import STATUS, DIC_STATUS

from datetime import datetime
from random import randint

class Task(models.Model):

    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    code = models.SmallIntegerField("Code", blank=True)
    title = models.CharField("Title", max_length=30)
    description = models.CharField(
        "Description", max_length=70, blank=True, null=True)
    status = models.SmallIntegerField("Status", choices=STATUS, default=0)

    created = models.DateTimeField(
        "Created", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(
        "Updated", auto_now_add=False, auto_now=True)
    start = models.DateTimeField("Start", null=True, blank=True)
    end = models.DateTimeField("End",  null=True, blank=True)
    real_duration = models.PositiveBigIntegerField(
        "Duration", null=True, blank=True)
    estimated_duration = models.PositiveBigIntegerField(
        "Estimated Duration", null=True, blank=True)
    times = models.JSONField("Times", default=list, null=True, blank=True)

    def __generate_task_code(self):
        list_code = __class__.objects.values_list("code", flat=True)

        while True:
            code = randint(1, 10000)
            if code not in list_code:
                break

        self.code = code

    def __save_duration(self):
        self.end = datetime.now()
        duration = (self.end - self.start).total_seconds()
        self.times.append(duration)

    def __in_process(self):
        self.start = datetime.now()

    def __paused(self):
        self.__save_duration()

    def __finalized(self):
        accumulated = 0

        self.__save_duration()

        for duration in self.times:
            accumulated += duration

        self.real_duration = int(accumulated)

    def __check_change_status(self):
        old = __class__.objects.get(id=self.id)

        if ((old.status == 0 and self.status == 1) or 
            (old.status == 2 and self.status == 1)):
            self.__in_process()

        elif old.status == 1 and self.status == 2:
            self.__paused()

        elif old.status == 1 and self.status == 3:
            self.__finalized()
    

    def save(self, *args, **kwargs):

        created = True if self._state.adding else False

        if created:
            self.__generate_task_code()
        else:
            self.__check_change_status()

        super(__class__, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {DIC_STATUS[self.status]}"
