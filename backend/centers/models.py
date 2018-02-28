from django.db import models

from backend import settings


class Owner(models.Model):
    name = models.CharField(blank=False, max_length=255)

    def __str__(self):
        return self.name


class CentreImage(models.Model):
    centre = models.ForeignKey('Centre', on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to=settings.UPLOAD_DIR)


class CentreDocument(models.Model):
    centre = models.ForeignKey('Centre', on_delete=models.SET_NULL, null=True)
    title = models.CharField(blank=True, max_length=255)
    text = models.TextField(blank=True)
    file = models.FileField(blank=True, upload_to=settings.UPLOAD_DIR)


class Centre(models.Model):
    name = models.CharField(blank=False, max_length=255)
    slug = models.SlugField(blank=True, max_length=255,
                            help_text='Mapping to the GUI. Do not change unless you have to')
    status = models.IntegerField(choices=((1, 1), (2, 2), (3, 3), (4, 4)), default=1,
                                 help_text='Determines how "filled" the centre will be in the GUI')
    owner = models.ForeignKey(Owner, on_delete=models.SET_NULL, blank=True, null=True)
