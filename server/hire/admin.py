from django.contrib import admin
import hire.models as models

admin.site.register(models.Company)
admin.site.register(models.Employee)
admin.site.register(models.Post)
admin.site.register(models.Recruter)
admin.site.register(models.Resume)
admin.site.register(models.Vacancy)