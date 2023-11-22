from djongo import models

class MuscleGroupItem(models.Model):
    muscle_group = models.CharField(max_length=100)

    class Meta:
        abstract = True

class ExerciseMuscleGroup(models.Model):
    exercise_name = models.CharField(max_length=100, unique=True)
    muscle_groups = models.ArrayField(
        model_container=MuscleGroupItem,
    )
    
    

    class Meta:
        app_label = 'apps.scraper'

    def __str__(self):
        return self.exercise_name
