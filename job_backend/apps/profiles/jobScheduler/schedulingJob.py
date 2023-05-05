from apps.organization.models import job
from apps.organization.models import *
from apps.profiles.models import *
from email.mime.text import MIMEText
from .emailSender import sendMail
def intersection(lst1, lst2):
    temp = set(lst2)
    lst3 = [value for value in lst1 if value in temp]
    return len(lst3)

def displayJob(*args):
    jb = job.objects.get(id = args[0])
    user = userProfile.objects.all()
    skilllist = []
    for i in jb.skillSet.values("name"):
        skilllist.append(i['name'])
    
    for i in user:
        sk=[]
        
        for val in i.skill.values("name"):
            sk.append(val['name'])
        if len(sk) > 0:
            common = intersection(skilllist,sk)
            if int((common/len(skilllist))*100) >= 20 :
                jobApp = jobApplication.objects.create(user = i,job_detail = jb)
                jobApp.save()
                # jb.usersApplied.add(i.id)
                name = i.firstName + " " +i.lastName
                org = jb.company.companyName
                website = jb.company.website
                site = jb.slug
                position = jb.role
                # text = 'We have applied for the job role ' + position + ". you can check job description here ."
                # noti = notification.objects.create(user = i)
            
                sendMail(name,org,website,site,position,i.user.email)