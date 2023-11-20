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

class DayExerciseSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = DayExercise
        fields = ('id', 'training_day', 'exercise', 'sets', 'reps')

class TrainingDaySerializer(serializers.ModelSerializer):
    exercises = DayExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingDay
        fields = ('id', 'training_plan', 'day_of_week', 'exercises')
        
class TrainingPlanSerializer(serializers.ModelSerializer):
    workout_percentage = serializers.SerializerMethodField()
    training_days = TrainingDaySerializer(many=True, read_only=True)

    class Meta:
        model = TrainingPlan
        fields = ('id', 'user', 'plan_name', 'slug', 'start_date', 'end_date', 'workout_percentage', 'training_days')

    def get_workout_percentage(self, obj):
        return obj.calculate_muscle_workout_percentage()



