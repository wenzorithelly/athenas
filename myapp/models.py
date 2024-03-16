from django.db import models


# Create your models here.
class Pessoa(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    height = models.IntegerField()

    def __str__(self):
        return self.name
