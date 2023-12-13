import graphene
from graphene_django import DjangoListField
import hire.models as models
import hire.mutations as mutations
from hire.types import *


class Query(graphene.ObjectType):
    companies = graphene.List(CompanyType)
    company = graphene.Field(CompanyType, id=graphene.Int(required=True))

    recruters = graphene.List(RecruterType)
    recruter = graphene.Field(RecruterType, id=graphene.Int(required=True))

    posts = DjangoListField(PostType)
    post = graphene.Field(PostType, id=graphene.Int(required=True))

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

    def resolve_post(root, info, id):
        try:
            return models.Post.objects.get(pk=id)
        except models.Post.DoesNotExist:
            return None

class Mutation(graphene.ObjectType):
    company = mutations.CompanyMutation.Field()
    delete_resume = mutations.ResumeDeletion.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)