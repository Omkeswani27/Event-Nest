from rest_framework import generics, status
from rest_framework.response import Response
from .models import Booking_stall
from .serializers import StallBookingSerializer
from django.core.mail import send_mail
from rest_framework.permissions import AllowAny  
import logging

logger = logging.getLogger(__name__)

class StallBookingView(generics.CreateAPIView):
    queryset = Booking_stall.objects.all()
    serializer_class = StallBookingSerializer
    permission_classes = [AllowAny]   
    
    def create(self, request, *args, **kwargs):
        logger.info("Received data: %s", request.data)  # Log the incoming data
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()
            # Send confirmation email
            try:
                send_mail(
                    'Thank you for booking a stall',
                    f'Thank you, {booking.name}, for booking the stall {booking.stall.name}!',
                    'bhattibhagirath4618@gmail.com',
                    [booking.email],
                    fail_silently=False,
                )
                return Response({'message': 'Booking successful!'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error("Error sending email: %s", e)
                return Response({'message': 'Booking successful, but failed to send confirmation email.'}, status=status.HTTP_201_CREATED)
        logger.error("Validation errors: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)