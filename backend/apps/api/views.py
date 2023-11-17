from rest_framework import generics
from apps.api.models import MuscleGroup, Exercise
from apps.api.serializers import MuscleGroupSerializer, ExerciseSerializer

class MuscleGroupView(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
