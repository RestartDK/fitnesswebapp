"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from apps.api.views import MuscleGroupView, ExerciseView, TrainingPlanView, TrainingDayView, DayExerciseView

urlpatterns = [
    path('muscle_group/', MuscleGroupView.as_view(), name="muscle_groups-all"),
    path('exercise/', ExerciseView.as_view(), name="exercises-all"),
    path('training_plan/', TrainingPlanView.as_view(), name="training_plans-all"),
    path('training_day/', TrainingDayView.as_view(), name="training_days-all"),
    path('day_exercise/', DayExerciseView.as_view(), name="day_exercises-all"),
    path('scraper/', include('apps.scraper.urls'))
]


