from django.db import models
import time

class Domiciliary(models.Model):
    """
    Represents a domiciliary registered on the app.
    """
    id = models.CharField(max_length=2, default='', primary_key=True)
    x = models.CharField(max_length=3, default='')
    y = models.CharField(max_length=3, default='')
    timestamp = models.DateField(default=time.time())

    def __str__(self):
        return self.id