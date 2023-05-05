from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *
from apps.accounts.serializers import UserSerializer

class websiteSerializer(ModelSerializer):
    class Meta:
        model = website
        fields="__all__"


# class commonProfileSerializer(ModelSerializer):
#     # websites = websiteSerializer(many=True)  # removing the website from the request adding it manully 
#     class Meta:
#         model = commonProfile
#         fields = ['headline','profilePic','coverImage','user']


class contactSerializer(ModelSerializer):
    class Meta:
        model = contact
        fields = "__all__"
    

class skillSerializer(ModelSerializer):

    class Meta:
        model = skill
        fields = ['id','name']

    def create(self, validated_data): 
        validated_data['name'] = validated_data['name'][:1].capitalize() + validated_data['name'][1:].lower()
        if(skill.objects.filter(name = validated_data['name'])) :
            return skill.objects.get(name = validated_data['name'])

        return skill.objects.create(name = validated_data['name'])



class userProfileSerializer(ModelSerializer):
    user =UserSerializer()
    class Meta:
        model = userProfile
        fields = ['id','firstName','lastName','headline','gender','profilePic','resume','user']
        depth = 1


class educationSerializer(ModelSerializer):
    class Meta:
        model = education
        fields = ['id','school','degree','fieldOfStudy','startdate','enddate','grade','description']


class experienceSerializer(ModelSerializer):
    class Meta:
        model = experience
        fields = ['id','role','employementType','companyName','location','startdate','enddate','description']


class projectSerializer(ModelSerializer):
    class Meta:
        model = project
        fields = ['id','title','startdate','enddate','projectUrl','description']




class jobPreferenceSerializer(ModelSerializer):
    class Meta:
        model = jobPreference
        fields=['id','user','title']
