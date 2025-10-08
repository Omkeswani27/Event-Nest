from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Question, Choice
from .serializers import QuestionSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class PollViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        question = self.get_object()
        choice_id = request.data.get('choice_id')
        choice = question.choices.get(id=choice_id)
        choice.votes += 1
        choice.save()
        return Response({'status': 'vote recorded'})
