from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import math, random

from apps.organization.models import organization
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from apps.profiles.models import *
from apps.profiles.jobScheduler.emailSender import *

def content(error,message,extraMessage="",data=[]):
    newmsg =''
    if(extraMessage) :
        newmsg = f'Error Occured in {extraMessage} !!!'
    return Response({"error":error,"message":message,"additionalMessage":newmsg,"data":data})



def generateOTP() :
    string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    OTP = ""
    length = len(string)
    for i in range(6) :
        OTP += string[math.floor(random.random() * length)]
 
    return OTP


@api_view(['GET'])
@permission_classes([AllowAny])
def sendOtp(request,id):
    try:
        if id:
            user = User.objects.get(id = id)
            otp = generateOTP()
            user.otp = otp 
            user.save()
            sentOtpMail(otp,user.email)
            # sent mail to user
            return content(False,"otp sent successfully")
        else:
            raise Exception("Invalid id")
    except Exception as e:
        return content(True,str(e),"Sending otp")

@api_view(['POST'])
@permission_classes([AllowAny])
def verifyOtp(request):
    try:
        user = User.objects.get(email = request.data['email'])
        if user :
            if user.otp == request.data['otp']:
                user.verified = True
                user.save()
                return content(False,"Otp verified","")
            else:
                return content(True,"Otp did not match",)
        else:
            return content(True,"Invaid Email","validating otp")
    except Exception as e:
        return content(True,str(e),"Verifying otp")


@api_view(['POST'])
@permission_classes([AllowAny])
def changePassword(request):
    try:
        user = User.objects.get(email = request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        return content(False,'Password changed Successfully')
    except Exception as e:
        return content(False,str(e),"Changing Password")

@api_view(['GET'])
def getUser(request):
    try:
        user = User.objects.get(email = request.user)
        serializer = UserSerializer(user)
        return content(False,'','',serializer.data)
    except Exception as e:
        return content(True,str(e),'getting user')

@api_view(['POST'])
@permission_classes([AllowAny])
def userData(request):
    try:
        user = User.objects.get(email = request.data['email'])
        serializer = UserSerializer(user)
        return content(False,'','',serializer.data)
    except Exception as e:
        return content(True,str(e),'getting user')

    
@api_view(['POST'])
@permission_classes([AllowAny])
def  validateEmail(request):
    try:
        email = request.data['email']
        if(User.objects.filter(email = email)):
            return content(True,"Email has been Already Taken")
        return content(False,"")
    except Exception as e:
        return content(True,str(e),"Error Occured in validating email")



@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    try:
        data = request.data
        password = data['password']
        user = User.objects.create(email =data['email'],usertype=data['usertype'])
        user.set_password(password)
        user.save()
        if User.objects.filter(email = data['email']):
            user = User.objects.get(email = data['email'])
            if user.usertype == 2:
                organization.objects.create(company = user)
                # pass
            elif user.usertype == 1:
                # profile = userProfile.objects.get_or_create(user=user)[0]
                userProfile.objects.create(user=user)
            serializer = UserSerializer(user,context={"request": request})
            return content(False,'Account Created Successfully','',serializer.data)
        return content(True,'Something went wrong try again','Error occurred in getting creating user') 
    except Exception as e:
        return content(True,str(e),'Error occurred in getting creating user')

# @api_view(['GET'])
# def userActions(request):
#     if request.method == "GET":
#         try:
#             user = request.user
#             serializer = UserSerializer(user,context={"request": request})
#             return content(False,'','',serializer.data)
#         except Exception as e:
#             return content(True,str(e),'Error Occured in getting user data ')
#     elif request.method =="PATCH":
#         try:
#             data = request.data 
#             user = User.objects.get(email = request.user)
#             serializer = UserSerializer(data=data,instance=user)
#             if serializer.is_valid():
#                 serializer.save()
#                 return content(False,'Profile Updated Successfully','',serializer.data)
#             else:
#                 return content(True,str(serializer.errors),'Error occurred in updating user proile')
#         except Exception as e:
#             return content(True,str(e),'Error Occured in updating user profile')