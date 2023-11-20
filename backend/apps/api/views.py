from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import MuscleGroup, Exercise, TrainingPlan, TrainingDay, DayExercise
from .serializers import (MuscleGroupSerializer, ExerciseSerializer, TrainingPlanSerializer, TrainingDaySerializer, DayExerciseSerializer)

class MuscleGroupViewSet(viewsets.ModelViewSet):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class TrainingDayViewSet(viewsets.ModelViewSet):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer

class DayExerciseViewSet(viewsets.ModelViewSet):
    queryset = DayExercise.objects.all()
    serializer_class = DayExerciseSerializer

class TrainingPlanViewSet(viewsets.ModelViewSet):
    queryset = TrainingPlan.objects.all()
    serializer_class = TrainingPlanSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(TrainingPlan, slug=item)

    def get_queryset(self):
        return TrainingPlan.objects.prefetch_related('training_days__exercises').all()

