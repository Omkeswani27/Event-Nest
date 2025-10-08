from django.urls import path
from .views import RegisterView, LoginView
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', obtain_auth_token, name='api-token-auth'),
]