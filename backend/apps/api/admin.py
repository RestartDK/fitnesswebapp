from django.contrib import admin
from apps.api.models import MuscleGroup, Exercise

@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'muscle_group_name')
    ordering = ('id',)
    
@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'musclegroup', 'user', 'exercise_name', 'image', 'date_added')
    ordering = ('id',)
