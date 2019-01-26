# Generated by Django 2.0.7 on 2018-11-08 13:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('centres', '0008_auto_20181108_1307'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalowner',
            name='centre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='centres', to='centres.Centre'),
        ),
    ]