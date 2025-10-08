from django.urls import path
from .views import StallBookingView

urlpatterns = [
    path('api/bookstall/', StallBookingView.as_view(), name='book-stall'),
]