# Generated by Django 3.0 on 2020-03-08 19:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('centres', '0015_auto_20191211_2122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
        migrations.CreateModel(
            name='DetailPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads')),
                ('document', models.FileField(blank=True, null=True, upload_to='uploads')),
                ('centre', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='detail_plans', to='centres.Centre')),
            ],
        ),
    ]
