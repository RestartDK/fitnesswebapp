# Generated by Django 4.1.13 on 2023-11-20 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_exercise_muscle_group_exercise_muscle_groups'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainingplan',
            name='slug',
            field=models.SlugField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
