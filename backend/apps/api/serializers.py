from rest_framework import serializers
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'muscle_group_name')

class ExerciseSerializer(serializers.ModelSerializer):
    muscle_groups = MuscleGroupSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = ('id', 'exercise_name', 'muscle_groups')

class TrainingPlanSerializer(serializers.ModelSerializer):
    workout_percentage = serializers.SerializerMethodField()
    class Meta:
        model = TrainingPlan
        fields = ('id', 'user', 'plan_name', 'start_date', 'end_date', 'workout_percentage')

    def get_workout_percentage(self, obj):
        return obj.calculate_muscle_workout_percentage()

class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = ('id', 'training_plan', 'day_of_week')

class DayExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayExercise
        fields = ('id', 'training_day', 'exercise', 'sets', 'reps')
