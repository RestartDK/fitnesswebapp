from django.db import models
from django.contrib.auth.models import User

class MuscleGroup(models.Model):
    id = models.AutoField(primary_key=True)
    muscle_group_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.muscle_group_name

class Exercise(models.Model):
    id = models.AutoField(primary_key=True)
    muscle_group = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.exercise_name

class TrainingPlan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan_name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

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
