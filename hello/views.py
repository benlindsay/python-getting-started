from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting
from django.http import JsonResponse
from django.core import serializers

from .predictions import get_business, map_locations
from .yelp import business_data

# Create your views here.
def index(request):
    return render(request, 'index.html')

# receives some parameters (category, location, business type, etc), and suggest a list of cities for the user to rate
def business(request):
    # 1. get the city details that were selected from the user
    # /www.com/business?city=Montreal&restaurants=1&museums=1
    city = request.GET.get('city', '')

    seen_categories = []
    for category in ['restaurants', 'museums']:
        if request.GET.get(category, False):
            seen_categories.append(category)

    # 2. Get the businesses that should be rated by the user
    business_ids = get_business(city, seen_categories)

    # 3. Call the YELP Api for each business and retrieve the business info
    businessList = [business_data(id) for id in business_ids]

    # serialized = serializers.serialize('json', businessList)
    return JsonResponse(businessList, safe=False)


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

