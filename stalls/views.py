from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Stall
from .serializers import StallSerializer

class StallListView(generics.ListCreateAPIView):
    queryset = Stall.objects.all()
    serializer_class = StallSerializer
    permission_classes = [AllowAny]