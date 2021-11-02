from django.core.management.base import BaseCommand

from task.models import Task


class Command(BaseCommand):

	help = "Changing status task to pending"

	def handle(self, *args, **options):

		Task.objects.update(status=0, times=[])



