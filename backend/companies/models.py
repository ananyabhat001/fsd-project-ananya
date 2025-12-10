from django.db import models
from django.core.validators import MinLengthValidator

class Company(models.Model):
    company_name = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(5)]
    )
    email_id = models.EmailField()
    company_code = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )
    website = models.URLField(
        max_length=300,
        null=True,
        blank=True
    )
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name}"
