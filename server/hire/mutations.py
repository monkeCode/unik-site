import hire.serializers as serializers
from graphene_django.rest_framework.mutation import SerializerMutation
import graphene
import hire.models as models
import hire.types as types

class CompanyMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.CompanySerializer

class RecruterMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.RecruterSerializer

class EmployeeMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.EmployeeSerializer

class ResumeMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.ResumeSerializer
    
class ResumeDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    result = graphene.Boolean()

    def mutate(self, info, id):
        try:
            models.Resume.objects.delete(pk=id)
        except:
            return ResumeDeletion(result= False)
        
        return ResumeDeletion(result= False)

class VacancyMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.VacancySerializer
