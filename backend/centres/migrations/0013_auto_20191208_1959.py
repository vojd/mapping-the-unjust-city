# Generated by Django 3.0 on 2019-12-08 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centres', '0012_auto_20191208_1959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='centre',
            name='tags',
            field=models.ManyToManyField(blank=True, to='centres.Tag'),
        ),
    ]