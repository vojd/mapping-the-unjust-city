# Generated by Django 2.0.2 on 2018-02-28 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centers', '0005_auto_20180228_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='centre',
            name='status',
            field=models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)], default=1),
        ),
        migrations.AlterField(
            model_name='centre',
            name='slug',
            field=models.SlugField(blank=True, help_text='Mapping to the GUI. Do not change unless you have to', max_length=255),
        ),
    ]
