from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MuscleGroupSerializer
import requests
from bs4 import BeautifulSoup

@api_view(['GET'])
def scrape_data(request, exercise_name):
    url = "https://en.wikipedia.org/wiki/List_of_weight_training_exercises"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    muscle_groups = []
    
    # Find the table by class or id if it's unique
    table = soup.find('table', {'class': 'wikitable'})
    
    # The first row contains headers with the muscle group names
    headers = [header.get_text(strip=True) for header in table.find_all('th')[1:]]
    
    # Find the row with the matching exercise name
    for row in table.find_all('tr')[1:]:
        if row.th.get_text(strip=True).lower() == exercise_name.lower():
            # Iterate over the table data elements, skipping the first one as it is the exercise name
            for i, cell in enumerate(row.find_all('td')):
                value = cell.get_text(strip=True)
                if value:
                    # Map 'Some' and 'Yes' to muscle group, ignore empty cells
                    muscle_groups.append(headers[i])
            break

    # After scraping, serialize the data
    serializer = MuscleGroupSerializer(data=[{'muscle_group': group} for group in muscle_groups], many=True)
    
    # Check if the serializer is valid
    if serializer.is_valid():
        # Return serialized data
        return Response(serializer.data)
    else:
        # If invalid, return an error response
        return Response(serializer.errors, status=400)
