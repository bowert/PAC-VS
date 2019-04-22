from django.contrib import admin
from . models import Server, Stats, PacMan, Ghost, Game
# Register your models here.
admin.site.register(Server)
admin.site.register(Stats)
admin.site.register(PacMan)
admin.site.register(Ghost)
admin.site.register(Game)