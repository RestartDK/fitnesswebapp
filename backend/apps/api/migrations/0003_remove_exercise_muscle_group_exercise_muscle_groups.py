# Generated by Django 4.1.13 on 2023-11-19 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_musclegroup_exercise_muscle_group_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='muscle_group',
        ),
        migrations.AddField(
            model_name='exercise',
            name='muscle_groups',
            field=models.ManyToManyField(to='api.musclegroup'),
        ),
    ]
