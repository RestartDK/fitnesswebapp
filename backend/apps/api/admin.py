from django.contrib import admin
from apps.api.models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise

@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'muscle_group_name')
    ordering = ('id',)
    
@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'muscle_group', 'exercise_name')
    ordering = ('id',)
    
@admin.register(TrainingPlan)
class TrainingPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'plan_name', 'start_date', 'end_date')
    ordering = ('id',)
    
@admin.register(TrainingDay)
class TrainingDayAdmin(admin.ModelAdmin):
    list_display = ('id', 'training_plan', 'day_of_week')
    ordering = ('id',)
    
@admin.register(DayExercise)
class DayExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'training_day', 'exercise', 'sets', 'reps')
    ordering = ('id',)
