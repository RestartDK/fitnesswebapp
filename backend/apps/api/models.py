from django.db import models
from django.contrib.auth.models import User

class MuscleGroup(models.Model):
    id = models.AutoField(primary_key=True)
    muscle_group = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.muscle_group

class Exercise(models.Model):
    id = models.AutoField(primary_key=True)
    muscle_groups = models.ManyToManyField(MuscleGroup)
    exercise_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.exercise_name

class TrainingPlan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    
    def calculate_muscle_workout_percentage(self):
        IMPORTANT_MUSCLE_GROUPS_COUNT = 14  # Total number of important muscle groups

        # Get all unique muscle groups worked on in this training plan
        worked_muscle_groups = set()
        for training_day in self.training_days.all():
            for day_exercise in training_day.exercises.all():
                worked_muscle_groups.update(day_exercise.exercise.muscle_groups.all())

        worked_muscle_groups_count = len(worked_muscle_groups)

        return (worked_muscle_groups_count / IMPORTANT_MUSCLE_GROUPS_COUNT) * 100

    def __str__(self) -> str:
        return self.plan_name

class TrainingDay(models.Model):
    id = models.AutoField(primary_key=True)
    training_plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE, related_name='training_days')
    day_of_week = models.CharField(max_length=9)  # e.g., Monday, Tuesday, etc.

    def __str__(self) -> str:
        return f"{self.training_plan.plan_name} - {self.day_of_week}"

class DayExercise(models.Model):
    id = models.AutoField(primary_key=True)
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.SmallIntegerField()
    reps = models.SmallIntegerField()

    def __str__(self) -> str:
        return f"{self.training_day} - {self.exercise.exercise_name}"