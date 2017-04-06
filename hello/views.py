from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

# receives some parameters (category, location, bussiness type, etc), and suggest a list of cities for the user to rate
def cities(request):
    citiesList = ['id1', 'id2', 'id3'];
    return JsonResponse(citiesList)


# returns the points in the map
def map_points(request):
    mapPoints = [{
        'lat': 123,
        'long': 456,
        'relevance': 4
    },{
        'lat': 123,
        'long': 456,
        'relevance': 3
    }];
    return JsonResponse(mapPoints, safe=False)


def db(request):
    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

