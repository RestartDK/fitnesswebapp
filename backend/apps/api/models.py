from django.db import models
from django.contrib.auth.models import User

class MuscleGroup(models.Model):
    id = models.AutoField(primary_key=True)
    muscle_group_name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.muscle_group_name

class Exercise(models.Model):
    id = models.AutoField(primary_key=True)
    musclegroup = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=100)
    image = models.CharField(max_length=250)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.exercise_name
