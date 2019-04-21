from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils.safestring import mark_safe
from . forms import CreateRoomForm
from . models import Server
import json


# Create your views here.
def home(request):

    if (request.method == "GET"):
        #print("here")
        form = CreateRoomForm(request.GET)

        if form.is_valid():
            #print("here2")
            lobbyName = form.cleaned_data['lobbyName']

            if (request.GET.get('createLobby')):
                print("createLobby")
                Server.objects.create(serverName=lobbyName, numOfPlayers=1)
            elif(request.GET.get('joinLobby')):
                print("joinLobby")
                print(Server.objects.all())
            #else:
            print(lobbyName)

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