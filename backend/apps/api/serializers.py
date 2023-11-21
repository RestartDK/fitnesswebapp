from rest_framework import serializers
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'muscle_group')

class ExerciseSerializer(serializers.ModelSerializer):
    muscle_groups = MuscleGroupSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ('id', 'exercise_name', 'muscle_groups')

    def create(self, validated_data):
        muscle_groups_data = validated_data.pop('muscle_groups', [])
        exercise = Exercise.objects.create(**validated_data)

        for mg_data in muscle_groups_data:
            muscle_group = mg_data.get('muscle_group')
            muscle_group_element, created = MuscleGroup.objects.get_or_create(muscle_group=muscle_group)
            exercise.muscle_groups.add(muscle_group_element)

        return exercise

class DayExerciseSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = DayExercise
        fields = ('id', 'exercise', 'sets', 'reps')  # Removed 'training_day' from fields

    def create(self, validated_data):
        exercise_data = validated_data.pop('exercise')
        
        # Handle the creation of Exercise with nested muscle_groups
        muscle_groups_data = exercise_data.pop('muscle_groups', [])
        exercise, created = Exercise.objects.get_or_create(**exercise_data)
        if created:
            for mg_data in muscle_groups_data:
                muscle_group = mg_data.get('muscle_group')
                muscle_group_element, _ = MuscleGroup.objects.get_or_create(muscle_group=muscle_group)
                exercise.muscle_groups.add(muscle_group_element)

        day_exercise = DayExercise.objects.create(exercise=exercise, **validated_data)
        return day_exercise

class TrainingDaySerializer(serializers.ModelSerializer):
    exercises = DayExerciseSerializer(many=True)

    class Meta:
        model = TrainingDay
        fields = ('id', 'training_plan', 'day_of_week', 'exercises')
        extra_kwargs = {'training_plan': {'required': False, 'allow_null': True}}

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        training_day = TrainingDay.objects.create(**validated_data)
        for exercise_data in exercises_data:
            DayExerciseSerializer().create({'training_day': training_day, **exercise_data})
        return training_day

class TrainingPlanSerializer(serializers.ModelSerializer):
    workout_percentage = serializers.SerializerMethodField()
    training_days = TrainingDaySerializer(many=True)

    class Meta:
        model = TrainingPlan
        fields = ('id', 'user', 'plan_name', 'slug', 'start_date', 'end_date', 'workout_percentage', 'training_days')

    def create(self, validated_data):
        training_days_data = validated_data.pop('training_days')
        training_plan = TrainingPlan.objects.create(**validated_data)
        for day_data in training_days_data:
            TrainingDaySerializer().create({'training_plan': training_plan, **day_data})
        return training_plan

    def get_workout_percentage(self, obj):
        return obj.calculate_muscle_workout_percentage()



