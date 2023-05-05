# REVUP - A Job Application

## Running

### Basic setup
- open the git terminal and paste the following command `git clone https://github.com/satyam4484/final-year-project.git` .

### Backend
- Inside the `job_backend` folder, do the following:
  - create virtual environment , type `virtualenv env`. if virtual environment is not insalled then open command promt and type `pip install virtualenv`.
  - Once virtual environment is done a env file will be there in job_backend folder.

  - Activate the file using the command in `command promt` or `powershell` : `env\Scripts\activate`

  - After activation of virutal environment run `pip install -r requirements.txt` it will install all the required libraries for the django project.

  - Inside `backend/setting.py` file replace the following contents.
    - ```SECRET_KEY = env('SECRET_KEY')``` with ```SECRET_KEY = 'django-insecure-49co6c$xobuom2h97xd83+-k263ma^d885#_s(2w4-+$&ndhx6'```.
    - `DEBUG = env('DEBUG')` with `DEBUG = True`.

    - ``` 
        DATABASES = {'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': env('DATABASE_HOST'),
        'PORT': env('DATABASE_PORT'), }}
        ```
        with 
        
        ```
            DATABASES = {
            'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3'}
            }
        ```

  - After that run `python manage.py makemigrations` and `python manage.py migrate`  to setup database.

  - For running django app run `python manage.py runserver` and these will run you project at `http://127.0.0.1:8000/`.

  - you can find the postman api documentation [Postman](https://documenter.getpostman.com/view/17718134/2s84DkT4ro)

### Frontend
- Inside the `job_frontend` folder, do the following:
  - open the terminal and run `npm start` it will download app dependencies required for the project to start.
  - Once done with installation run `npm start` and it will start the project at `http://localhost:3000/`.