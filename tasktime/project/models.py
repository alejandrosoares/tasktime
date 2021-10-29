from django.db import models

from utils.base import ModelBase

class Project(ModelBase):
    
    slug = models.SlugField("Slug", blank=True)

    def __slug(self):
        slug = self.title.lower()
        slug = slug.replace(" ", "-")
        self.slug = slug

    def save(self, *args, **kwargs):

        created = True if self._state.adding else False

        if created:
            self.__slug()

        super(__class__, self).save(*args, **kwargs)
