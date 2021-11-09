from django.test import TestCase

from projects.models import Project
from task.models import Task

class ModelTest(TestCase):

    def setUp(self):

        self.project = Project.objects.create(title="New project")
        self.new = Task.objects.create(title="New Task", project=self.project)

    def test_increasing_number_of_tasks(self):

        self.assertEqual(self.project.tasks.count(), 1)
        self.assertEqual(self.project.number_tasks, 1)

    def test_decreasing_number_of_tasks(self):

        self.new.delete()
        
        self.assertEqual(self.project.tasks.count(), 0)
        self.assertEqual(self.project.number_tasks, 0)
        self.assertEqual(self.project.real_duration, 0)

    def test_update_percent_completed(self):

        # In process task
        self.new.status = 1
        self.new.save()

        # finishing task        
        self.new.status = 3
        self.new.save()

        self.assertEqual(self.project.percent_completed, 100)