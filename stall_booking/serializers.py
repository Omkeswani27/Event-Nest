# serializers.py
from rest_framework import serializers
from .models import Booking_stall

class StallBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking_stall
        fields = ['stall', 'name', 'email', 'address']