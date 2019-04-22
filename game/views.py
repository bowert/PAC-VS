from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils.safestring import mark_safe
from . forms import CreateRoomForm
from . models import Server
import json


# Create your views here.
def home(request):
    error = "No Error"


    if (request.method == "GET"):
        #print("here")
        form = CreateRoomForm(request.GET)

        if form.is_valid():
            #print("here2")
            lobbyName = form.cleaned_data['lobbyName']

            if (request.GET.get('createLobby')):
                print("createLobby")
                servers = Server.objects.filter(serverName=lobbyName).first()
                print(servers)
                if (servers != None and servers.numOfPlayers != 0):
                    print("Server already Created")
                    error = "Server Already Created"
                else:
                    Server.objects.create(serverName=lobbyName, numOfPlayers=0)
                    return redirect('/pac_test/' + lobbyName)
            elif(request.GET.get('joinLobby')):
                servers = Server.objects.filter(serverName=lobbyName).first()
                print(servers)
                if (servers == None):
                    print("Server Doesn't Exist")
                    error = "Server Doesn't Exist"
                elif(servers.numOfPlayers >= 2):
                    print("Server Already Full")
                    error = "Server Already Full"
                else:
                    print("redirect")
                    return redirect('/pac_test/' + lobbyName)
            #else:
            print(lobbyName)

    return render(request, 'pac_vs.html', {'error_message': error})

def disconnected(request):
    return render(request, 'disconnected.html')

def stats(request):
    return render(request, 'stats.html')

def game(request):
	return render(request, 'game.html')
def test(request, room_name):
    return render(request, 'test.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })

def pac_test(request, room_name):

    servers = Server.objects.filter(serverName=room_name).first()
    #print(servers)

    #print(servers.numOfPlayers)
    if (servers == None or servers.numOfPlayers >= 2):
        return redirect('/home')
    else:
        servers.numOfPlayers += 1
        servers.save()
        return render(request, 'pac_test.html', {
            'room_name_json': mark_safe(json.dumps(room_name))
        })
