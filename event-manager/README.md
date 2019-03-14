# Code Challenge - #3 - EventManager
Implement a simple application "Event manager":

1. Main screen should contain a list of "events" of two types "Call" and "Meeting":
    1. user can create/edit/delete event;
    1. events must be ordered by event date (desc);
    1. all events fields should be shown on the main screen.

1. User can create/delete/edit event "Call":
    1. fields: event_date (datetime), name (string), created_date (date), exactly 2 participants;
    1. participant should provide a valid email;
    1. when new "Call" type event is created an email about it should be sent to participants.

1. User can create/delete/edit event "Meeting":
    1. fields: event_date (date), name (string), created_date (date), exactly 3 participants, address (string);
    1. participant is just a name;
    1. clicking on the address (main screen) should open maps application.

Your pull request should contain:

* High quality, well documented and tested code following clean architecture principles;
* Instructions for our QA (not Angular engineer!), guiding how to setup and run "Event manager" application in a safe and emulated environment on Mac.

## Dockerisation

1.build docker container
```bash
docker build -t nginx-angular -f nginx.prod.dockerfile .
``` 
2.start image:
```bash
docker run -p 8080:80 nginx-angular
```
3.open `localhost:8080` in your browser
