# TaskTime

## Objetive
The objective of this web application is to record the time it takes to complete a task.

## How it works
- First create a project.
- Second, create tasks inside of the project.
- Third, when start a first task, press on Start b-utton for start registering the time.\
  You can pause the task at any time and resume it, pressing on pause and play button.
- Fourth, when you completed you task, press in Finalized button.

## Languages and tools
This project is created with the following tools and language:

## backend:
- Python and Django
- Sqlite database

## frontend:
- HTML, CSS and Flexbox
- Java Script

## Apps
This project has 3 applications listed below:

### home
This app show the home page.

### project
This app register the project to which the task belongs.
In the dashboard show the next:
- Number of tasks.
- Percentage of tasks completed.
- Sum of duration of completed tasks.

### task
This app register the time of task.
In the dashboard show the next:
- Title task.
- Status task.
- For completed task, show its duration.

#### Status
The following are the status changes of the tasks:

0 to 1 -> in process\
1 to 2 -> paused\
2 to 1 -> resume\
1 to 3 -> Finalized\
2 to 3 -> Finalized\
all to 4 -> Canceled\

## Installation

### Run
Follow the next steps:
- Create a virtual environment 
- Inside virtual environment, install requirements.txt
- Run python manage.py runserver
- Open http://localhost:8000

## Test
Unit test were performed

### backend:
Were made through TestCase of Django
For run these, execute python manage.py test command

### frontend:
Were made through Jest JS
For run these, go to test directory (inside root directory) and execute npm run test