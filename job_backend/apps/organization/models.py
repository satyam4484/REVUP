from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from apps.profiles.models import *
from ckeditor.fields import RichTextField
from django.utils.text import slugify
# Create your models here. 
class organization(models.Model):
    company = models.OneToOneField(User,on_delete=models.CASCADE)
    companyName = models.CharField(max_length = 300,default="company")
    companyLogo = models.ImageField(upload_to='organization/',default='defaultProfile.jpg')
    companyCover = models.ImageField(upload_to='organization/',default='cover.png')
    website = models.URLField()
    industry = models.CharField(max_length = 200)
    specialties = models.CharField(max_length = 300)

    def __str__(self):
        return self.companyName


# end date changes to be done with experience form to be completed by tommorow
class job(models.Model):
    role = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    jobType = models.CharField(max_length=20)
    description = RichTextField()
    skillSet = models.ManyToManyField(skill)
    company = models.ForeignKey(organization,on_delete=models.CASCADE)
    usersApplied = models.ManyToManyField(userProfile,blank=True,null=True) 
    posted =models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50,default='open')
    slug = models.SlugField(blank=True,max_length=100)

    def save(self,*args,**kwargs):
        super(job,self).save(*args, **kwargs)

        if not self.slug:
            unique_string = f"{self.role}{self.company} {self.id}"
            self.slug = slugify(unique_string)
            self.save()
        
    def __str__(self):
        return f'{self.role} in {self.company}'

class jobApplication(models.Model):
    user = models.ForeignKey(userProfile,on_delete=models.CASCADE)
    job_detail = models.ForeignKey(job,on_delete=models.CASCADE)
    status = models.IntegerField(default=1)

    # def __str__(self):
    #     return self.job.role
