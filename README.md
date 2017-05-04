# Simple angular 2 project

To run a project:
```bash
npm install
npm run start

navigate to localhost:8080
```


### Changelog

###### 04.05.2017
1) Added routing
2) Added breadcrumbs
3) Added guards for routes
4) changed behaviour of create\edit form
5) added 404 page


###### 26.04.2017
1) Login stil - 123\123
2) Added template driven form for login component
3) Added model driven form for creating new course
4) Added custom validators

###### 17.04.2017
1) ADDED JSON SERVER! LAUNCH PROJECT AS USUAL. one command will start both dev and json servers
2) Available users\pass - 123\123 (check users.json in fake_server folder for more users)
3) Added support of http for ALL calls
4) Added pagination (server-side)
5) Added server-side search (clear will call for all courses)
6) Extended http service with AuthorizedHttpService (which add special header to all calls, for all calls except LOGIN SERVICE)

###### 11.04.2017
1) added some Observables
2) implemented fake component from creating courses
3) there is no Observable.of(), but i used it, changed to BehaviourSubject after talking to mentor

###### 3.04.2017
1) Added directives
2) Added pipes
3) Removed some interfaced ( :( )

###### 27.03.2017
1) Added Observable
2) Added profile
3) Changed tslint (to support console.time for profiling)
4) Added spinner (will move it to separeted component later)

###### 19.03.2017
1) Application splitter to several Modules
2) Added services - CoursesService and LoginService
3) Added lot's of new logic (login, CRUD courses etc)
4) Added confirmation message on course DELETE

=========

1) changed angular starter
2) added real components (src/app/components)
3) added interfaces (src/app/interfaces)