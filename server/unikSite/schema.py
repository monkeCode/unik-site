import graphene
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

class Query(graphene.ObjectType):
    companies = graphene.List(CompanyType)
    company = graphene.Field(CompanyType, id=graphene.Int(required=True))

    recruters = graphene.List(RecruterType)
    recruter = graphene.Field(RecruterType, id=graphene.Int(required=True))

    def resolve_companies(root, info):
        return models.Company.objects.all() 

    def resolve_company(root, info, id):
        try:
            return models.Company.objects.get(pk=id)
        except models.Company.DoesNotExist:
            return None
    
    def resolve_recruters(root, info):
        return models.Recruter.objects.all() 

    def resolve_recruter(root, info, id):
        try:
            return models.Recruter.objects.get(pk=id)
        except models.Recruter.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)