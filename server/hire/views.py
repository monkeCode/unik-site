from django.http.response import HttpResponse
import unikSite.auth.auth as auth
from django.views.decorators.csrf import csrf_exempt
from hire.models import Employee, Recruter, Vacancy, Resume
import json
import hire.serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            username = request.GET.get('username')
            password = request.GET.get('password')
            if username is None or password is None:
                return HttpResponse("no username or password", status = 400)
            key = auth.Authenticator().login(username, password)
            response = HttpResponse(key)
            response.set_cookie('key', key)
        except Exception as e:
            return HttpResponse(e, status=500) 
        return response
    return HttpResponse('allow only POST requests', status =404)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            data = json.loads(body_unicode)
            if data is None:
                return HttpResponse("no full data", 400)
            print(data)
            key = auth.Authenticator().register(data["username"], data["password"], 
                                                data["email"], "employee")
            
            
            Employee(name=data["name"], last_name=data["last_name"], 
                     birth=data["birth"], is_male=data["is_male"], 
                     number=data["number"], key=key).save()
            response = HttpResponse(key)
            response.set_cookie('key', key)
            
        except Exception as e:
            return HttpResponse(e, status=500) 
        return response
    return HttpResponse('allow only POST requests', status =404)

@csrf_exempt
def logout(request):
    if request.method == 'POST':
        response = HttpResponse('logout')
        response.delete_cookie('key')
        return response
    return HttpResponse('allow only POST requests', status =404)

@api_view(["GET"])
def get_me(request):
    try:
        key= request.COOKIES["key"]
    except KeyError:
        return HttpResponse("not authorized", status=401)
    user = auth.Authenticator().get_user_by_key(key)
    if(user.type == "employee"):
        emp = Employee.objects.get(key=key)
        data = hire.serializers.EmployeeSerializer(emp)
        res = data.data
        res["type"] = "employee"
        return Response(res, status=200) 
    if(user.type == "recruter"):
        emp = Recruter.objects.get(key=key)
        data = hire.serializers.RecruterSerializer(emp)
        res = data.data
        res["type"] = "recruter"
        return Response(res, status=200)

@api_view(["POST"])
def send_resume(request, vacId, resId):
    try:
        resume = Resume.objects.get(pk=resId)
        vacancy = Vacancy.objects.get(pk = vacId)

    except Vacancy.DoesNotExist | Resume.DoesNotExist as e:
        return Response(e, status=404)

    if(vacancy.resumes.contains(resume)):
        return Response(status=200)
    vacancy.resumes.add(resume)
    vacancy.save()
    return Response(status=200)

