from rest_framework import serializers
from .models import Company
from django.core.validators import URLValidator

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = ['id', 'created_time']

    def validate_company_name(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Company name must be at least 5 characters long.")
        return value.strip()

    def validate_website(self, value):
        if value:
            validator = URLValidator()
            validator(value)
        return value
