from django.db import models
from django.core.validators import MinValueValidator


maxPellets = 20
maxPP = 4
startPositionx = 20
startPositiony = 20
# Create your models here.
class Stats(models.Model):
    pacVictories = models.PositiveIntegerField(default=0)
    ghostVictories = models.PositiveIntegerField(default=0)
    pellets = models.BigIntegerField(default=0, validators=[MinValueValidator(0)]) # number of pellets eaten
    PP = models.PositiveIntegerField(default=0) # number of Power Pellets eaten

class PacMan(models.Model):
    x = models.PositiveIntegerField(default = startPositionx)
    y = models.PositiveIntegerField(default = startPositiony)

class Ghost(models.Model):
    x = models.PositiveIntegerField(default = startPositionx)
    y = models.PositiveIntegerField(default = startPositiony)

class Game(models.Model):
    CreatorIp = models.CharField(max_length = 16)
    CreatorPort = models.PositiveIntegerField()
    SeekerIP = models.CharField(max_length = 16)
    SeekerPort = models.PositiveIntegerField()
    PM = models.OneToOneField(PacMan,on_delete=models.CASCADE)
 
class Pellets(models.Model):
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()
    isEaten = models.BooleanField(default=False)




