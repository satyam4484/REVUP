from django.urls import path 
from .views import *

urlpatterns = [
    path('profile',ProfileView),
    path('contact',contactView),
    path('website',websiteView),
    path('website/<int:id>',websiteView),
    path('skill',setSkill),
    path('skill/<int:id>',setSkill),
    path('education',educationView),
    path('education/<int:id>',educationView),
    path('experience',experienceView),
    path('experience/<int:id>',experienceView),
    path('project',projectView),
    path('project/<int:id>',projectView),
    path('preference/',jobPreferenceView),
    path('preference/<int:id>',jobPreferenceView)
]
