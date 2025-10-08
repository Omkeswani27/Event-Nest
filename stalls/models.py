from django.db import models

class Stall(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    rent_price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='stalls/')

    def __str__(self):
        return self.name