from django.contrib import admin
from .models import Stall

@admin.register(Stall)
class StallAdmin(admin.ModelAdmin):
    list_display = ('name', 'rent_price', 'available')
    search_fields = ('name',)
    list_filter = ('available',)