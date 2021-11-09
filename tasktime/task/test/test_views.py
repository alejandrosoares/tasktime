from django.test import TestCase, Client
from django.urls import reverse

from projects.models import Project
from task.models import Task

from json import loads

class ViewTest(TestCase):

    def setUp(self):

        self.project = Project.objects.create(title="New Project")
        self.task = Task.objects.create(title="New Task", project=self.project)

        self.url_list = reverse('project:task:main', kwargs={"project_id":self.project.id})
        self.url_create = reverse('project:task:create', kwargs={"project_id":self.project.id})
        self.url_update = reverse('project:task:update', kwargs={"project_id":self.project.id})
        self.url_delete = reverse('project:task:delete', kwargs={"project_id":self.project.id})

        self.c = Client()

    def test_list(self):

        r = self.c.get(self.url_list)

        self.assertIn("pending", r.context)
        self.assertIn("in_process", r.context)
        self.assertIn("paused", r.context)
        self.assertIn("finalized", r.context)
        self.assertIn("project_id", r.context)
        self.assertIn("project_title", r.context)
        self.assertEqual(r.context["pending"].count(), 1)

    def test_create(self):
        
        data = {"title": "New Task"}
        
        response = self.c.post(
            self.url_create, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", dic_response["task"])
        self.assertIn("title", dic_response["task"])
        self.assertIn("code", dic_response["task"])
        self.assertIn("status", dic_response["task"])
    
    def test_update(self):
        
        data = {
            "id": self.task.id,
            "status": 1
        }

        response = self.c.post(
            self.url_update, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)
        updated_task = Task.objects.get(id=self.task.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(updated_task.status, 1)
        self.assertEqual(dic_response["status"], "ok")
        self.assertIn("id", dic_response["task"])
        self.assertIn("title", dic_response["task"])
        self.assertIn("code", dic_response["task"])
        self.assertIn("status", dic_response["task"])

    def test_delete(self):

        data = {"id": self.task.id}

        response = self.c.post(
            self.url_delete, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.count(), 0)
        self.assertEqual(dic_response["status"], "ok")
        self.assertEqual(dic_response["task"]["id"], self.task.id)
    
    def test_invalid_creation_request(self):
        
        # empty title
        data = {"title": ""}
        
        response = self.c.post(
            self.url_create, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(dic_response["status"], "error")

    def test_invalid_update(self):
        # Is not possible change status to finalized 
        # without before have be in process 

        data = {
            "id": self.task.id,
            "status": 3 # Finalized status
        }

        response = self.c.post(
            self.url_update, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)
        updated_task = Task.objects.get(id=self.task.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(updated_task.status, 0)
        self.assertEqual(dic_response["status"], "error")

    def test_delete_with_empty_id(self):

        data = {"id": None}

        response = self.c.post(
            self.url_delete, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(dic_response["status"], "error")
        
    def test_delete_with_invalid_id(self):

        data = {"id": 555}

        response = self.c.post(
            self.url_delete, 
            data=data, 
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(dic_response["status"], "error")
