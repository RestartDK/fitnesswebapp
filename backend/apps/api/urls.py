from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MuscleGroupViewSet, ExerciseViewSet, TrainingPlanViewSet, TrainingDayViewSet, DayExerciseViewSet

router = DefaultRouter()
router.register(r'muscle_group', MuscleGroupViewSet)
router.register(r'exercise', ExerciseViewSet)
router.register(r'training_plan', TrainingPlanViewSet, basename='trainingplan')
router.register(r'training_day', TrainingDayViewSet)
router.register(r'day_exercise', DayExerciseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('scraper/', include('apps.scraper.urls'))  # Keep this if you have scraper URLs
]