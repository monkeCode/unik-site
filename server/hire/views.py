from django.http.response import HttpResponse
import unikSite.auth.auth as auth
from django.views.decorators.csrf import csrf_exempt
from hire.models import Employee
import json
# Create your views here.
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            username = request.GET.get('username')
            password = request.GET.get('password')
            if username is None or password is None:
                return HttpResponse("no username or password", 400)
            key = auth.Authenticator().login(username, password)
            response = HttpResponse('sucseffully login')
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
            
            response = HttpResponse('sucseffully register')
            Employee(name=data["name"], last_name=data["last_name"], 
                     birth=data["birth"], is_male=data["is_male"], 
                     number=data["number"], key=key).save()
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

