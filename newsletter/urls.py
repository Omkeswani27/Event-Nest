from django.urls import path
from .views import NewsletterSubscriptionView

urlpatterns = [
    path('newsletter/', NewsletterSubscriptionView.as_view(), name='newsletter_subscription'),
]