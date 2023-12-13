from rest_framework import serializers
import hire.models as models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = "__all__"

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = "__all__"

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = "__all__"

class RecruterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recruter
        fields = "__all__"

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resume
        fields = "__all__"

class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vacancy
        fields = "__all__"