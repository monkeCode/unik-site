import graphene
from graphene_django import DjangoListField
import hire.models as models
import hire.mutations as mutations
from hire.types import CompanyType, RecruterType, EmployeesType, PostType
from hire.types import ResumeType, VacancyType


class Query(graphene.ObjectType):
    companies = DjangoListField(CompanyType)
    company = graphene.Field(CompanyType, id=graphene.Int(required=True))

    recruters = DjangoListField(RecruterType)
    recruter = graphene.Field(RecruterType, id=graphene.Int(required=True))

    posts = DjangoListField(PostType)
    post = graphene.Field(PostType, id=graphene.Int(required=True))

    employees = DjangoListField(EmployeesType)
    employee = graphene.Field(EmployeesType, id=graphene.Int(required=True))

    resumes = graphene.List(ResumeType, emp_id = graphene.Int(required=False) )
    resume = graphene.Field(ResumeType, id=graphene.Int(required = True))

    vacancies = graphene.List(VacancyType, company_id = graphene.Int(required=False))
    vacancy = graphene.Field(VacancyType, id=graphene.Int(required=True))

    
    def resolve_vacancies(self, info, company_id=None):
        if company_id is not None:
            return models.Vacancy.objects.filter(company__id = company_id)
        return models.Vacancy.objects.all()
    
    def resolve_resumes(self, info, emp_id=None):
        if emp_id is not None:
            return models.Resume.objects.filter(employee__id = emp_id)
        return models.Resume.objects.all()
    
    def resolve_company(self, info, id): 
        try:
            return models.Company.objects.get(pk=id)
        except models.Company.DoesNotExist:
            return None

    def resolve_recruter(self, info, id):
        try:
            return models.Recruter.objects.get(pk=id)
        except models.Recruter.DoesNotExist:
            return None

    def resolve_post(self, info, id):
        try:
            return models.Post.objects.get(pk=id)
        except models.Post.DoesNotExist:
            return None 
        
    def resolve_employee(self, info, id):
        try:
            return models.Employee.objects.get(pk=id)
        except models.Employee.DoesNotExist:
            return None
    
    def resolve_resume(self, info, id):
        try:
            return models.Resume.objects.get(pk=id)
        except models.Resume.DoesNotExist:
            return None
        
    def resolve_vacancy(self, info, id):
        try:
            return models.Vacancy.objects.get(pk=id)
        except models.Vacancy.DoesNotExist:
            return None
    


        

class Mutation(graphene.ObjectType):
    company = mutations.CompanyMutation.Field()
    recruter = mutations.RecruterMutation.Field()
    employee = mutations.EmployeeMutation.Field()
    vacancy = mutations.VacancyMutation.Field()
    delete_vacancy = mutations.VacancyDeletion.Field()
    resume = mutations.ResumeMutation.Field()
    delete_resume = mutations.ResumeDeletion.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)