from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from graphene_django.views import GraphQLView
import hire.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("api/usrlogin", hire.views.login),
    path("api/usrregister", hire.views.register),
    path("api/usrlogout", hire.views.logout),
    path("api/getme", hire.views.get_me),
    path("api/addresume/<int:vacId>/<int:resId>", hire.views.send_resume),
]
