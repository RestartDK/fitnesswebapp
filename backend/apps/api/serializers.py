from rest_framework import serializers
from apps.api.models import MuscleGroup, Exercise

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'muscle_group_name')
    
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'musclegroup', 'user', 'exercise_name', 'image', 'date_added')