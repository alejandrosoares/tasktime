# from django.test import TestCase

# from projects.models import Project
# from .models import Task

# class ModelTest(TestCase):

#     def setUp(self):

#         self.project = Project.objects.create(title="New project")

#         self.new = Task.objects.create(title="New Task", project=self.project)

#     def test_create_task(self):

#         self.assertEqual(self.project.tasks.count(), 1)
#         self.assertEqual(self.project.number_tasks, 1)

#     def test_delete_task(self):

#         self.new.delete()
        
#         self.assertEqual(self.project.tasks.count(), 0)
#         self.assertEqual(self.project.number_tasks, 0)



        