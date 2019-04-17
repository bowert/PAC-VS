from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils.safestring import mark_safe
import json


# Create your views here.
def home(request):
	return render(request, 'pac_vs.html')

def disconnected(request):
    return render(request, 'disconnected.html')

def stats(request):
    return render(request, 'stats.html')

def test(request, room_name):
    return render(request, 'test.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })

def pac_test(request, room_name):
    return render(request, 'pac_test.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })