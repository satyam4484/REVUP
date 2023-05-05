from django.urls import path 
from .views import *
urlpatterns = [
    path('',getUser),
    path('userdata',userData),
    path('create/',createUser),
    path('validate',validateEmail),
    path('sendotp/<int:id>',sendOtp),
    path('otpvalidate',verifyOtp),
    path('password-change',changePassword)
]
