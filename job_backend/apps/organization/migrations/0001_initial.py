# Generated by Django 4.1.1 on 2023-04-12 16:48

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0002_jobpreference_notification_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('jobType', models.CharField(max_length=20)),
                ('description', ckeditor.fields.RichTextField()),
                ('posted', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(default='open', max_length=50)),
                ('slug', models.SlugField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('companyName', models.CharField(default='company', max_length=300)),
                ('companyLogo', models.ImageField(default='defaultProfile.jpg', upload_to='organization/')),
                ('companyCover', models.ImageField(default='cover.png', upload_to='organization/')),
                ('website', models.URLField()),
                ('industry', models.CharField(max_length=200)),
                ('specialties', models.CharField(max_length=300)),
                ('company', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='jobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(default=1)),
                ('job_detail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.job')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='job',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.organization'),
        ),
        migrations.AddField(
            model_name='job',
            name='skillSet',
            field=models.ManyToManyField(to='profiles.skill'),
        ),
        migrations.AddField(
            model_name='job',
            name='usersApplied',
            field=models.ManyToManyField(blank=True, null=True, to='profiles.userprofile'),
        ),
    ]
