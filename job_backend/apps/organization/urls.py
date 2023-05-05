from django.urls import path 
from .views import *

urlpatterns = [
    path('',organizationView),
    path('<int:id>',organizationView),
    path('jobs',jobView),
    path('jobs/organization',getJobByOrganization),
    path('jobs/<int:id>/',jobView),
    path('job_company/',Job),
    path('job_company/<int:id>',Job),
    path('job_applied/<int:id>',checkJobApplied),
    path('get_user_jobs',getUserJobs),
    path('jobs/status',jobApplicationStatus)
    # path('job_company_applied/<int:id>',getUserApplied),
]
