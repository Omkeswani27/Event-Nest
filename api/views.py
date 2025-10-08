

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Event
# from .serializers import EventSerializer

# # List all events (GET) or create a new event (POST)
# @api_view(['GET', 'POST'])
# def event_list(request):
#     if request.method == 'GET':
#         # Allow any user (authenticated or not) to access the events list
#         events = Event.objects.all()
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         # Protect POST requests with token authentication
#         permission_classes = [IsAuthenticated]
#         if not request.user.is_authenticated:
#             return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # Attach the logged-in user to the event
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# # Retrieve, update, or delete a single event
# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])  # Ensure the user is authenticated
# def event_detail(request, pk):
#     try:
#         event = Event.objects.get(pk=pk, user=request.user)  # Ensure the event belongs to the user
#     except Event.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = EventSerializer(event)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # List all events created by the logged-in user
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])  # User must be authenticated
# def user_events(request):
#     events = Event.objects.filter(user=request.user)  # Only the user's events
#     serializer = EventSerializer(events, many=True)
#     return Response(serializer.data)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])  # Allow any user for GET requests
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Protect POST requests with token authentication
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Attach the logged-in user to the event
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete a single event
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)  # Get the event by primary key
        if event.user != request.user:  # Check if the event belongs to the logged-in user
            return Response({'detail': 'You do not have permission to edit this event.'}, status=status.HTTP_403_FORBIDDEN)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# List all events created by the logged-in user
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # User must be authenticated
def user_events(request):
    events = Event.objects.filter(user=request.user)  # Only the user's events
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)