from django.db import models

from utils.functions import generate_code, generate_str_duration
from utils.models import Base

class Project(Base):

    number_tasks = models.PositiveSmallIntegerField(
        "Number of Tasks", default=0)
    percent_completed = models.PositiveSmallIntegerField(
        "Percent Completed", default=0)

    def __generate_project_code(self):
        self.code = generate_code(__class__)
    
    def __generate_str_duration(self):
        self.str_duration = generate_str_duration(self.real_duration)

    def update_percent_completed(self):
        completed_tasks = self.tasks.filter(status=3)

        if self.number_tasks != 0 and len(completed_tasks) != 0: 
            self.percent_completed = round((len(completed_tasks) * 100) / self.number_tasks)
            self.real_duration = sum(completed_tasks.values_list("real_duration", flat=True))
        else:
            self.percent_completed = 0
            self.real_duration = 0
            
        self.__generate_str_duration() # In Base Class
        self.save()
        
    def update_number_task(self, increase):

        if increase:
            # Creation of a task
            self.number_tasks += 1
        else:
            # Elimination of a task
            self.number_tasks -= 1

        self.update_percent_completed()

    def save(self, *args, **kwargs):

        created = True if self._state.adding else False

        if created:
            self.__generate_project_code()

        super(__class__, self).save(*args, **kwargs)
