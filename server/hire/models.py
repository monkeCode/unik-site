from django.db import models
from django.urls import reverse

class Company(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(("name"), max_length=50)
    number = models.CharField(("number"), max_length=20)
    mail = models.CharField(("mail"), max_length=50)
    address = models.CharField(("address"), max_length=50)


    class Meta:
        verbose_name = ("Compoany")
        verbose_name_plural = ("Compoanys")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Compoany_detail", kwargs={"pk": self.pk})
    

class Recruter(models.Model):

    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, verbose_name=("company"), 
                                related_name="recruters", 
                                on_delete=models.CASCADE)
    name = models.CharField(("name"), max_length=50)
    last_name = models.CharField(("last_name"), max_length=50)
    number = models.CharField(("number"), max_length=20)
    birth = models.DateField(("date of birth"), auto_now=False, auto_now_add=False)
    is_male = models.BooleanField(("is_male"))
    key = models.CharField(("key"), max_length=50)
    class Meta:
        verbose_name = ("Recruter")
        verbose_name_plural = ("Recruters")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Recruter_detail", kwargs={"pk": self.pk})


class Employee(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(("name"), max_length=50)
    last_name = models.CharField(("last_name"), max_length=50)
    number = models.CharField(("number"), max_length=20)
    birth = models.DateField(("date of birth"), auto_now=False, auto_now_add=False)
    is_male = models.BooleanField(("is_male"))
    key = models.CharField(("key"), max_length=50)

    class Meta:
        verbose_name = ("Employee")
        verbose_name_plural = ("Employees")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Employee_detail", kwargs={"pk": self.pk})


class Post(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Resume(models.Model):

    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, verbose_name=("Employee"), 
                                 on_delete=models.CASCADE)
    post = models.ForeignKey(Post, verbose_name=("Post"), related_name="resumes", 
                             on_delete=models.CASCADE)
    creating_date = models.DateTimeField(auto_now=True)
    salary = models.IntegerField()
    description = models.TextField()

    class Meta:
        verbose_name = ("Resume")
        verbose_name_plural = ("Resumes")

    def __str__(self):
        return str(self.employee) + " " + str(self.post)

    def get_absolute_url(self):
        return reverse("Resume_detail", kwargs={"pk": self.pk})

class Vacancy(models.Model):

    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, verbose_name=("Employee"), 
                                on_delete=models.CASCADE)
    post = models.ForeignKey(Post, verbose_name=("Post"), related_name="vacancys", 
                             on_delete=models.CASCADE)
    creating_date = models.DateTimeField(auto_now=True)
    salary = models.IntegerField()
    description = models.TextField()
    resumes = models.ManyToManyField(Resume, verbose_name=("vacancy"))


    def __str__(self):
        return str(self.company) + " " + str(self.post)

    class Meta:
        verbose_name = ("Vacancy")
        verbose_name_plural = ("Vacancys")


    def get_absolute_url(self):
        return reverse("Vacancy_detail", kwargs={"pk": self.pk})
