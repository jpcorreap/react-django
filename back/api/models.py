from django.db import models

# Create your models here.
class Delivery(models.Model):
    """
    Represents a delivery on the app.
    """
    id = models.CharField(max_length=2, default="", primary_key=True)
    x = models.CharField(max_length=3, default="")
    y = models.CharField(max_length=3, default="")

    def __str__(self):
        return self.id