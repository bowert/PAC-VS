from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/test/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
    url(r'^ws/pac_test/(?P<room_name>[^/]+)/$', consumers.PacConsumer),
]
