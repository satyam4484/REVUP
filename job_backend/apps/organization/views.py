from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from apps.accounts.views import content
from django.db.models import Q
from apps.profiles.jobScheduler import updater

def infinite_jobs(request,jb):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    # return jb[int(offset):int(offset)+int(limit)]
    return jb


@api_view(['POST'])
def jobApplicationStatus(request):
    try:
        data = request.data 
        if data['type'] == "set":
            jb = jobApplication.objects.get(id = data['id'])
            jb.status = data['status']
            jb.save()
            return content(False,"")
        elif data['type'] == "get":
            jb = jobApplication.objects.filter(status = data['status'],job_detail=job.objects.get(id = data['job_id']))
            serializer = jobApplicationSerializer(jb,many=True,context={'request':request})
            return content(False,"","",serializer.data)
    except Exception as e:
        return content(True,str(e),"Setting job application")


@api_view(['POST'])
def getUserJobs(request):
    try:
        data=request.data
        jb = jobApplication.objects.filter(status = data['status'],user = userProfile.objects.get(user=request.user))
        
        serializer = jobApplicationSerializer(jb,many=True,context={'request':request})
        return content(False,"","",serializer.data)

    except Exception as e:
        return content(True,str(e),"Getting user jobs")

@api_view(['GET'])
def checkJobApplied(request,id):
    try:
        if id:
            jb = job.objects.get(id = id)
            user = userProfile.objects.get(user=request.user)
            js = jobApplication.objects.filter(user = user ,job_detail = jb)
            if js :
                return content(True,"")
            else:
                return content(False,"")
        else:
            raise Exception("Invalid id")
    except Exception as e:
        return content(True,str(e),"checking job applied or not")

# @api_view(['GET','POST'])
# def getUserApplied(request,id=None):
#     if request.method == "POST":
#         try:
#             data = job.objects.get(id = id).usersApplied
#             print(data)
#             return content(False,"")
#         except Exception as e:
#             return content(True,str(e),"getting applied jobs")


# this function shows the list of job to the particular organization in their home page
@api_view(['GET','POST','PATCH','DELETE'])
def Job(request,id=None):
    if request.method == "GET":
        try :
            if request.user.usertype == 2:
                if id:
                    data = job.objects.get(id = id)
                    serializer = jobSerializer(data,context={"fields":"usersApplied","request":request})
                    return content(False,"","",serializer.data)                
                org = organization.objects.get(company = request.user)
                data = job.objects.filter(company = org).order_by('-id')
                serializer = jobSerializer(data,many=True,context={"request":request})
                return content(False,"","",serializer.data)
            raise Exception("Organization job")
        except Exception as e:
            return content(True,str(e),"organization job")
    elif request.method == "POST":
        try :
            data = request.data 
            
            user = userProfile.objects.get(id=data['user_id'])
            jb = job.objects.get(id = data['job_id'])
            if data['type']== "add":
                jb = jobApplication.objects.create(user = user,job_detail = jb)
                jb.save()
                # jb.usersApplied.add(user)
                return content(False,"Job Added")
            elif data['type'] =="delete":
                jb.usersApplied.remove(user)
                return content(False,"Job removed")
            raise Exception("Jobs")
        except Exception as e:
            return content(True,str(e),"Jobs")


@api_view(['POST'])
def getJobByOrganization(request):
    try:
        org = request.data['organization']
        jb = job.objects.filter(company__companyName = org[0])
        serializer = jobSerializer(jb,many=True,context={"request": request})
        return content(False,"","",serializer.data)
    except Exception as e:
        return content(True,str(e),"Getting jobs by organization")

@api_view(['GET','POST','PATCH','DELETE'])
def jobView(request,id=None):
    if request.method == "GET":
        try:
            if id:
                jb = job.objects.get(id=id)
                serializer = jobSerializer(jb,context={"request": request})
                return content(False,"","",serializer.data)
            # jb = jobFilter(request.GET,queryset=job.objects.all())
            # print(jb)
            search =request.GET.get('title')
            ls = job.objects.all().order_by('-id')
            if search :
                ls = job.objects.filter(role__contains=search)
            jb = infinite_jobs(request,ls)
            serializer = jobSerializer(jb,many=True,context={"request": request})
            return content(False,"","",serializer.data)
        except Exception as e:
            return content(True,str(e),"Getting jobs")
    elif request.method == "POST":
        try:
            data = request.data
            serializer = jobSerializer(data=data,context={'request':request})
            if serializer.is_valid(raise_exception=True):
                org = organization.objects.get(company = request.user)
                serializer.save(company=org)

                # scheduling the task to apply automatically 
                updater.start(serializer.data['id'])
                return content(False,"","",serializer.data)
            raise Exception(serializer.errors)
        except Exception as e:
            return content(True,str(e),"adding jobs")
    elif request.method == "PATCH":
        try:
            if id:
                jb = job.objects.get(id = id)
                serializer = jobSerializer(data=request.data,instance=jb,partial=True,context={'request':request,"fields":"usersApplied"})
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return content(False,"","",serializer.data)
                raise Exception(serializer.errors)
            raise Exception("Job Not Found")
        except Exception as e:
            return content(True,str(e),"Getting jobs")
    else:
        try:
            if id:
                jb = job.objects.get(id=id)
                jb.delete()
                return content(False,"Job deleted Successfully")
            raise Exception("Job Not Found")
        except Exception as e:
            return content(True,str(e),"Getting jobs")

@api_view(['GET','POST','PATCH'])
def organizationView(request,id=None):
    if request.method == "GET":
        try:
            user = request.user
            company = organization.objects.get(company = user)
            serializer = organizationSerializer(company,context={"request": request})
            return content(False,"","",serializer.data)
        except Exception as e:
            return content(True,str(e),"Getting Oraganization")
    elif request.method == "POST":
        try:
            user = request.user
            data = request.data 
            serializer = organizationSerializer(data=data,context={"request": request})
            if serializer.is_valid(raise_exception=True):
                serializer.save(company = user)
                return content(False,"","",serializer.data)
            raise Exception(serializer.errors)
        except Exception as e:
            return content(True,str(e),"Adding Organization")
    else :
        try:
            if id:
                org = organization.objects.get(id=id)
                data = request.data 
                serializer = organizationSerializer(data = data,instance=org,partial = True,context={"request": request})
                if serializer.is_valid():
                    serializer.save()
                    return content(False,"","",serializer.data)
                raise Exception(serializer.errors)
            raise Exception("Organization does not exist")
        except Exception as e:
            return content(True,str(e),"Updating Organization")
