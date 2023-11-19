from rest_framework import generics
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise
from .serializers import MuscleGroupSerializer, ExerciseSerializer, TrainingPlanSerializer, TrainingDaySerializer, DayExerciseSerializer

class MuscleGroupView(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseView(generics.ListCreateAPIView):
    queryset = Exercise.objects.select_related('muscle_group').all()
    serializer_class = ExerciseSerializer

class TrainingPlanView(generics.ListCreateAPIView):
    queryset = TrainingPlan.objects.select_related('user').all()
    serializer_class = TrainingPlanSerializer

class TrainingDayView(generics.ListCreateAPIView):
    queryset = TrainingDay.objects.select_related('training_plan').all()
    serializer_class = TrainingDaySerializer

class DayExerciseView(generics.ListCreateAPIView):
    queryset = DayExercise.objects.select_related('training_day', 'exercise').all()
    serializer_class = DayExerciseSerializer
