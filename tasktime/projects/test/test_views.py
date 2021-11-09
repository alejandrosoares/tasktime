from django.test import TestCase, Client
from django.urls import reverse

from projects.models import Project

from json import loads


class ViewTest(TestCase):

    def setUp(self):

        self.url_list = reverse('project:main')
        self.url_create = reverse('project:create')
        self.url_delete = reverse('project:delete')

        self.project = Project.objects.create(title="New Project")

        self.c = Client()

    def test_list_projects(self):

        r = self.c.get(self.url_list)

        self.assertIn("projects", r.context)
        self.assertEqual(r.context["projects"].count(), 1)

    def test_create_project(self):

        data = {"title": "New Project 2"}

        response = self.c.post(
            self.url_create, 
            data=data,
            content_type="application/json"
            )

        dic_response = loads(response.content)

        self.assertEqual(Project.objects.count(), 2)
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", dic_response["project"])
        self.assertIn("title", dic_response["project"])
        self.assertIn("code", dic_response["project"])
        self.assertIn("percent_completed", dic_response["project"])
        self.assertIn("str_duration", dic_response["project"])

    def test_delete_project(self):

        data = {"id": self.project.id}

        self.c.post(
            self.url_delete, 
            data=data,
            content_type="application/json"
            )

        self.assertEqual(Project.objects.count(), 0)

    def test_invalid_creation_request(self):

        # empty title
        data = {"title": ""}

        response = self.c.post(
            self.url_create,
            data=data,
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(dic_response["status"], "error")

    def test_delete_with_empty_id(self):

        data = {"id": None}

        response = self.c.post(
            self.url_delete, 
            data=data,
            content_type="application/json"
            )
        dic_response = loads(response.content)

        self.assertEqual(Project.objects.count(), 1)
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

        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(dic_response["status"], "error")
