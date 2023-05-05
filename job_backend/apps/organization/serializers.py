from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers
from .models import *
from apps.profiles.serializers import skillSerializer,userProfileSerializer
from drf_writable_nested import WritableNestedModelSerializer 
from django_filters import rest_framework as filters

class jobFilter(filters.FilterSet):
    class Meta:
        model = job
        fields = ('role', 'jobType')
class organizationSerializer(ModelSerializer):
    class Meta:
        model = organization
        fields=['id','companyName','industry','specialties','companyLogo','companyCover','website']


class jobSerializer(WritableNestedModelSerializer,ModelSerializer):
    company = organizationSerializer(read_only=True)
    skillSet = skillSerializer(many=True)
    posted = SerializerMethodField()

    usersApplied = userProfileSerializer(serializers.SerializerMethodField(method_name='get_userApplied'),many=True)

    
    class Meta:
        model = job
        fields=['id','role','location','jobType','description','company','skillSet','posted','status','slug','usersApplied']

    def get_posted(self,obj):
        date = obj.posted
        newdate = date.strftime("%d %B ,%Y")
        return newdate

    def get_userApplied(self, instance):
        request = self.context.get('fields')
        if request == 'usersApplied':
            return instance.usersApplied.all()
        return ""

class jobApplicationSerializer(ModelSerializer):
    job_detail = jobSerializer()
    user = userProfileSerializer()
    class Meta:
        model = jobApplication
        fields=['id','user','job_detail','status']
