from django.test import TestCase

from projects.models import Project
from task.models import Task

class ModelTest(TestCase):

    def __change_status(self, status):
        
        self.new.status = status
        self.new.save()

    def setUp(self):

        self.project = Project.objects.create(title="New project")
        self.new = Task.objects.create(title="New Task", project=self.project) 

    def test_assing_start_time(self):
        # self.new.start is assigned when change status to in process
        
        self.__change_status(1)

        self.assertIsNotNone(self.new.start)

    def test_paused_task(self):
        # When a task is paused, the duration is assigned to self.new.times 
        
        # In process
        self.__change_status(1)

        # Pausing task
        self.__change_status(2)

        self.assertEqual(len(self.new.times), 1)

    def test_paused_task(self):
        # When a task is paused, the duration is assigned to self.new.times 
       
        # In process
        self.__change_status(1)

        # Pausing task
        self.__change_status(2)

        self.assertEqual(len(self.new.times), 1)

    def test_finalized_task(self):
        # When a task is finalized, self.new.real_duration is assigned

        self.__change_status(1)

        # Finishing task
        self.__change_status(3)

        self.assertIsNotNone(self.new.real_duration)