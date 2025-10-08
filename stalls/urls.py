from django.urls import path
from .views import StallListView

urlpatterns = [
    path('api/stalls/', StallListView.as_view(), name='stall-list'),
]