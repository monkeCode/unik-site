import hire.serializers as serializers
from graphene_django.rest_framework.mutation import SerializerMutation
import graphene
import hire.models as models
from unikSite.auth.auth import authification, UserType

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

    @authification(UserType.employee)
    def mutate(self, info, id, user):
        employee = models.Employee.objects.get(key=user["key"])
        try:
            res = models.Resume.objects.get(pk=id)
            if res.employee == employee:
                res.delete()
            else:
                return ResumeDeletion(result= False) 
        except models.Resume.DoesNotExist:
            return ResumeDeletion(result= False)
        
        return ResumeDeletion(result= True)

class VacancyMutation(SerializerMutation):
    class Meta:
        serializer_class = serializers.VacancySerializer

class VacancyDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    result = graphene.Boolean()

    @authification(UserType.recruter)
    def mutate(self, info, id, user):
        rec = models.Recruter.objects.get(key=user["key"])
        try:
            vac = models.Vacancy.objects.get(pk=id)
            if vac.company == rec.company:
                vac.delete()
            else :
                return VacancyDeletion(result= False) 
        except models.Vacancy.DoesNotExist:
            return VacancyDeletion(result= False)
        
        return VacancyDeletion(result= True)
