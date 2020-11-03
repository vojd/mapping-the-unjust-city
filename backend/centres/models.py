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


class HistoricalOwner(models.Model):
    centre = models.ForeignKey('Centre',
                               on_delete=models.SET_NULL,
                               blank=True,
                               null=True,
                               related_name='historical_owners'
                               )
    company = models.ForeignKey('Company', on_delete=models.SET_NULL, null=True, blank=True)
    year = models.IntegerField()
    price = models.IntegerField(blank=True, null=True)
    currency = models.CharField(blank=True, null=True, max_length=10)


class DetailPlan(models.Model):
    centre = models.ForeignKey('Centre',
                               on_delete=models.SET_NULL,
                               blank=True,
                               null=True,
                               related_name='detail_plans')

    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True, help_text='English description')
    image = models.ImageField(upload_to=settings.UPLOAD_DIR, null=True, blank=True)
    document = models.FileField(upload_to=settings.UPLOAD_DIR, null=True, blank=True)


class Company(models.Model):
    name = models.CharField(blank=False, max_length=255)
    slug = models.SlugField(blank=True)
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True, help_text='English description')
    image = models.ImageField(upload_to=settings.UPLOAD_DIR, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Company, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'companies'
        ordering = ('name',)


class Tag(models.Model):
    """
    Tagging centres lets the client show only those of a selected tag
    Example of tags:
      * private
      * municipality
      * etc.
    """

    name = models.CharField(max_length=255, blank=False, null=False)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


DECADES = (
    ('1960', '1960'),
    ('1970', '1970'),
    ('1980', '1980'),
    ('1990', '1990'),
    ('2000', '2000'),
    ('2010', '2010'),
    ('2020', '2020'),
)


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
    description_en = models.TextField(blank=True, help_text='English description')

    tags = models.ManyToManyField(Tag, blank=True)
    sold = models.CharField(max_length=4, blank=True, null=True, choices=DECADES)
    private = models.BooleanField(default=True)

    def __str__(self):
        return self.name
