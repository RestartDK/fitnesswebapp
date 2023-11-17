from rest_framework import serializers

class MuscleGroupSerializer(serializers.Serializer):
    muscle_group = serializers.CharField(max_length=100)
    target_level = serializers.CharField(max_length=100)
