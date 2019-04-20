from django.db import models
from django.core.validators import MinValueValidator


maxPellets = 20
maxPP = 4
startPositionxP = 20
startPositionyP = 20
startPositionxG = 20
startPositionyG = 20
# Create your models here.
class Server(models.Model):
    serverName = models.CharField(max_length = 40)
    numOfPlayers = models.PositiveIntegerField(default=1)

class Stats(models.Model):
    pacVictories = models.PositiveIntegerField(default=0)
    ghostVictories = models.PositiveIntegerField(default=0)
    pellets = models.BigIntegerField(default=0, validators=[MinValueValidator(0)]) # number of pellets eaten
    PP = models.PositiveIntegerField(default=0) # number of Power Pellets eaten

class PacMan(models.Model):
    x = models.PositiveIntegerField(default = startPositionxP)
    y = models.PositiveIntegerField(default = startPositionyP)

class Ghost(models.Model):
    x = models.PositiveIntegerField(default = startPositionxG)
    y = models.PositiveIntegerField(default = startPositionyG)

class Game(models.Model):
    CreatorIp = models.CharField(max_length = 16)
    CreatorPort = models.PositiveIntegerField()
    SeekerIP = models.CharField(max_length = 16)
    SeekerPort = models.PositiveIntegerField()
    PM = models.OneToOneField(PacMan,on_delete=models.CASCADE)
 





