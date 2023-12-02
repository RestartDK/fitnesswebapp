from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MuscleGroupSerializer
import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote

@api_view(['GET'])
def scrape_data(request, exercise_name):
    # URL decode the exercise_name
    exercise_name = unquote(exercise_name)

    url = "https://en.wikipedia.org/wiki/List_of_weight_training_exercises"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    muscle_groups = []
    
    table = soup.find('table', {'class': 'wikitable'})
    headers = [header.get_text(strip=True) for header in table.find_all('th')[1:]]

    for row in table.find_all('tr')[1:]:
        # Compare the decoded exercise name with the table content
        if row.th.get_text(strip=True).lower() == exercise_name.lower():
            for i, cell in enumerate(row.find_all('td')):
                value = cell.get_text(strip=True)
                if value:
                    muscle_groups.append(headers[i])
            break

    serializer = MuscleGroupSerializer(data=[{'muscle_group': group} for group in muscle_groups], many=True)
    
    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)