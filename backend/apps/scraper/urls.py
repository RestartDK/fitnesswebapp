from django.urls import path
from .views import scrape_data

urlpatterns = [
    path('exercisemuscle/<str:exercise_name>/', scrape_data, name='scrape_data'),
]
