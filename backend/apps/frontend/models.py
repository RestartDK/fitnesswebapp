import uuid
from django.db import models

class UserModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    
class ExercisesModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=100)
    reps = models.IntegerField()
    sets = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    
class ExercisesMongoDBModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=100)
    reps = models.IntegerField()
    sets = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        pass



    
