from django.contrib import admin
from .models import NewsletterSubscription

@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'message')  # Columns to display in the list view
    search_fields = ('name', 'email', 'subject')