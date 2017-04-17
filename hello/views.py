from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting
from django.http import JsonResponse
from django.core import serializers

from .predictions import get_users, map_locations
from .yelp import users_data

# Create your views here.
def index(request):
    return render(request, 'index.html')

# receives some parameters (category, location, business type, etc), and suggest a list of cities for the user to rate
def users(request):
    # 1. get the city details that were selected from the user
    # /www.com/users?city=Montreal&restaurants=1&museums=1
    city = request.GET.get('city', '')

    seen_categories = []
    for category in ['restaurants', 'museums']:
        if request.GET.get(category, False):
            seen_categories.append(category)

    # 2. Get the users that should be rated by the user
    users_ids = get_users(city, seen_categories)

    # 3. Call the YELP Api for each users and retrieve the users info
    usersList = [users_data(id) for id in users_ids]

    # serialized = serializers.serialize('json', usersList)
    return JsonResponse(usersList, safe=False)


# returns the points in the map
def map_points(request):
    # 1. get the ratings for each business ID
    # /www.com/map_points?id1=5&id2=3
    ratings_dict = request.GET

    # 2. Predict the places to recommend to the user
    points = map_locations(ratings_dict)
    return JsonResponse(points, safe=False)


def db(request):
    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

