# Generated by Django 4.1.13 on 2023-11-22 13:24

import apps.scraper.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('scraper', '0002_delete_exercisemusclegroup'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExerciseMuscleGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise_name', models.CharField(max_length=100, unique=True)),
                ('muscle_groups', djongo.models.fields.ArrayField(model_container=apps.scraper.models.MuscleGroupItem)),
            ],
        ),
    ]
