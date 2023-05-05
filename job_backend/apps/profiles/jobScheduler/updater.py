from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

from .schedulingJob import displayJob



def start(id):
    scheduler=BackgroundScheduler()
    scheduler.add_job(displayJob,args=(id,'job'))
    scheduler.start()