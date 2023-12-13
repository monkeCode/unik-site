from graphene_django import DjangoObjectType
import hire.models as models

class CompanyType(DjangoObjectType):
     class Meta:
        model = models.Company
        fields = "__all__"

class RecruterType(DjangoObjectType):
    class Meta:
        model = models.Recruter
        exclude = ("login", "password")

class EmployeesType(DjangoObjectType):
    class Meta:
        model = models.Employee
        exclude = ("login", "password")

class PostType(DjangoObjectType):
    class Meta:
        model = models.Post
        fields = "__all__"

class ResumeType(DjangoObjectType):
    class Meta:
        model = models.Resume
        fields = "__all__"
    
class VacancyType(DjangoObjectType):
    class Meta:
        model = models.Vacancy
        fields = "__all__"