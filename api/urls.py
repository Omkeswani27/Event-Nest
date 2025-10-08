from django.urls import path
from .views import user_events, event_detail, event_list

urlpatterns = [
    path('events/', event_list, name='event-list'),
    path('events/<int:pk>/', event_detail, name='event-detail'),
    path('user/events/', user_events, name='user-events'),
]