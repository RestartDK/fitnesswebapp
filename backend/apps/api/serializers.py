from rest_framework import serializers
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise
from django.contrib.auth.models import User

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'muscle_group_name')

class ExerciseSerializer(serializers.ModelSerializer):
    muscle_group = serializers.PrimaryKeyRelatedField(queryset=MuscleGroup.objects.all())

    class Meta:
        model = Exercise
        fields = ('id', 'muscle_group', 'exercise_name')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')  # Add other fields as needed

class TrainingPlanSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TrainingPlan
        fields = ('id', 'user', 'plan_name', 'start_date', 'end_date')

class TrainingDaySerializer(serializers.ModelSerializer):
    training_plan = TrainingPlanSerializer(read_only=True)

    class Meta:
        model = TrainingDay
        fields = ('id', 'training_plan', 'day_of_week')

class DayExerciseSerializer(serializers.ModelSerializer):
    training_day = TrainingDaySerializer(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = DayExercise
        fields = ('id', 'training_day', 'exercise', 'sets', 'reps')
