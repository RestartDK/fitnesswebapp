from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ExerciseMuscleGroup
from .serializers import MuscleGroupSerializer
from rest_framework import status
import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote

@api_view(['GET'])
def scrape_data(request, exercise_name):
    exercise_name = unquote(exercise_name)

    # Web scraping for new exercise
    url = "https://en.wikipedia.org/wiki/List_of_weight_training_exercises"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    muscle_groups = []

    table = soup.find('table', {'class': 'wikitable'})
    headers = [header.get_text(strip=True) for header in table.find_all('th')[1:]]

    for row in table.find_all('tr')[1:]:
        if row.th.get_text(strip=True).lower() == exercise_name.lower():
            for i, cell in enumerate(row.find_all('td')):
                value = cell.get_text(strip=True)
                if value:
                    muscle_groups.append(headers[i])
            break

    # Save new data if found
    if muscle_groups:
        new_exercise_muscle_group = ExerciseMuscleGroup(exercise_name=exercise_name, muscle_groups=[{'muscle_group': group} for group in muscle_groups])
        new_exercise_muscle_group.save()

        serializer = MuscleGroupSerializer([{'muscle_group': group} for group in muscle_groups], many=True)
        return Response(serializer.data)
    
    return Response({'error': 'No muscle groups found for the specified exercise.'}, status=status.HTTP_404_NOT_FOUND)
