from django.db import models

from utils.functions import generate_code
from utils.models import Base


class Project(Base):

    number_tasks = models.PositiveSmallIntegerField(
        "Number of Tasks", default=0)
    percent_completed = models.FloatField(
        "Percent Completed", default=0)

    def __generate_project_code(self):
        self.code = generate_code(__class__)

    def update_number_task(self, increase):

        if increase:
            # Creation of a task
            self.number_task += 1
        else:
            # Elimination of a task
            self.number_task -= 1

        self.save()

    def update_percent_completed(self, number_completed):

        self.percent_completed = (number_completed * 100) / self.number_tasks

        self.save()

    def save(self, *args, **kwargs):
        created = True if self._state.adding else False

        if created:
            self.__generate_project_code()

        super(__class__, self).save(*args, **kwargs)
