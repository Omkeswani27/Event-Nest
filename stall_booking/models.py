# stall_booking/models.py
from django.db import models
from stalls.models import Stall  # Make sure to import the Stall model

class Booking_stall(models.Model):
    stall = models.ForeignKey(Stall, on_delete=models.CASCADE)  # Link to Stall model
    name = models.CharField(max_length=255)
    email = models.EmailField()
    address = models.TextField()
    # price = models.DecimalField(max_digits=10, decimal_places=2)   # Fixed price from Stall model
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Booking for {self.stall.name} by {self.name}'