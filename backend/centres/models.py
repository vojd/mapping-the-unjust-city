from django.db import models
from django.utils.text import slugify

from backend import settings


class Image(models.Model):
    centre = models.ForeignKey('Centre', on_delete=models.SET_NULL, null=True, blank=True, related_name='images')
    company = models.ForeignKey('Company', on_delete=models.SET_NULL, null=True, blank=True, related_name='images')
    image = models.ImageField(upload_to=settings.UPLOAD_DIR)


class Document(models.Model):
    centre = models.ForeignKey('Centre', on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')
    company = models.ForeignKey('Company', on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')

    title = models.CharField(blank=True, max_length=255)
    text = models.TextField(blank=True)
    file = models.FileField(blank=True, upload_to=settings.UPLOAD_DIR)


class Company(models.Model):
    name = models.CharField(blank=False, max_length=255)
    slug = models.SlugField(blank=True)

    description = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Company, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'companies'


class Centre(models.Model):
    """
    Each station has a centre
    """
    name = models.CharField(blank=False, max_length=255)
    slug = models.SlugField(blank=True, max_length=255,
                            help_text='Mapping to the GUI. Do not change unless you have to')
    status = models.IntegerField(choices=((1, 1), (2, 2), (3, 3), (4, 4)), default=1,
                                 help_text='Determines how "filled" the centre will be in the GUI')
    owner = models.ForeignKey(Company,
                              on_delete=models.SET_NULL,
                              blank=True,
                              null=True,
                              related_name='centres'
                              )

    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
