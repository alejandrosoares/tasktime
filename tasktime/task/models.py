from django.db import models
from projects.models import Project

from projects.models import Project
from utils.functions import generate_code, generate_str_duration
from utils.models import Base
from .utils import STATUS, DIC_STATUS

from datetime import datetime

class Task(Base):

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    status = models.SmallIntegerField("Status", choices=STATUS, default=0)
    start = models.DateTimeField("Start", null=True, blank=True)
    end = models.DateTimeField("End",  null=True, blank=True)

    estimated_duration = models.PositiveBigIntegerField(
        "Estimated Duration", null=True, blank=True)
    times = models.JSONField("Times", default=list, null=True, blank=True)

    def __generate_task_code(self):
        self.code = generate_code(__class__)

    def __save_duration(self):
        self.end = datetime.now()
        duration = (self.end - self.start).total_seconds()
        self.times.append(duration)
    
    def __get_accumulated(self):
        accumulated = sum(self.times)
        self.real_duration = int(accumulated)
    
    def __in_process(self):
        self.start = datetime.now()

    def __paused(self):
        self.__save_duration()
    
    def __generate_str_duration(self):
        self.str_duration = generate_str_duration(self.real_duration)

    def __finalized(self):

        self.__save_duration()
        self.__get_accumulated()
        self.__generate_str_duration() # In Base Class

    def __check_change_status(self):
        old = __class__.objects.get(id=self.id)

        if ((old.status == 0 and self.status == 1) or
            (old.status == 2 and self.status == 1)):
            self.__in_process()

        elif old.status == 1 and self.status == 2:
            self.__paused()

        elif ((old.status == 1 and self.status == 3) or
            (old.status == 2 and self.status == 3)):
            self.__finalized()

    def save(self, *args, **kwargs):

        created = True if self._state.adding else False

        if created:
            self.__generate_task_code()
        else:
            self.__check_change_status()

        super(__class__, self).save(*args, **kwargs)

        if created:
            self.project.update_number_task(True)
        else:
            if self.status == 3:
                self.project.update_percent_completed()

    def delete(self, *args, **kwargs):

        super(__class__, self).delete(*args, **kwargs)

        self.project.update_number_task(False)

    def __str__(self):
        return f"{self.title} - {DIC_STATUS[self.status]}"
