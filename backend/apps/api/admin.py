from django.contrib import admin
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise

@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'muscle_group')
    ordering = ('id',)

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'exercise_name', 'list_muscle_groups')
    ordering = ('id',)

    def list_muscle_groups(self, obj):
        return ", ".join([mg.muscle_group_name for mg in obj.muscle_groups.all()])
    list_muscle_groups.short_description = 'Muscle Groups'

@admin.register(TrainingPlan)
class TrainingPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'plan_name', 'slug', 'start_date', 'end_date')
    ordering = ('id',)
    
    def workout_percentage(self, obj):
        return f"{obj.calculate_muscle_workout_percentage():.2f}%"
    workout_percentage.short_description = 'Workout %'

@admin.register(TrainingDay)
class TrainingDayAdmin(admin.ModelAdmin):
    list_display = ('id', 'training_plan', 'day_of_week')
    ordering = ('id',)

@admin.register(DayExercise)
class DayExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'training_day', 'exercise', 'sets', 'reps')
    ordering = ('id',)
