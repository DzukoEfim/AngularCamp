const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const url = require('url');

const users = require('./users.json');
const courses = require('./courses.json');
const authors = require('./authors.json');

let currentLastId = courses.length + 1;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/users/:id', (req, res) => {

    const id = +req.params.id,
          userIndex = users.findIndex( user => {
              return user.id === id
          });

    if (userIndex >= 0 && users[userIndex]) {
        res.send({success: true, name: users[userIndex].name, id: users[userIndex].id})
    } else {
        res.send({success: false})
    }

});

server.post('/login', (req, res) => {
    let userPos = void 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === req.body.name && users[i].password == req.body.password) {
            userPos = i;
        }
    }

    if (userPos !== void 0) {
        res.json(users[userPos]);
    } else {
        res.json({fail: true});
    }
});

server.get('/logout', (req, res) => {
//    some logout logic here
    res.json({succcess: true});
});

server.get('/authors', (req, res) => {
    res.json(authors)
});

server.get('/courses', (req, res) => {

    const urlParts = url.parse(req.url, true),
          pageNumber = urlParts.query.pageNumber,
          coursesOnPage = urlParts.query.coursesOnPage,
          searchText = urlParts.query.searchText;

    let coursesArray = [];

    if (searchText) {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                coursesArray.push(courses[i])
            }
        }

    } else {
        coursesArray = courses;
    }

    let newCourses = [];

    for(let i = (pageNumber - 1)*coursesOnPage; i < pageNumber*coursesOnPage; i++) {
        if (i >= coursesArray.length) {
            break;
        }

        newCourses.push(coursesArray[i]);
    }

    res.json({newCourses: newCourses, totalCount: coursesArray.length});
});

server.delete('/courses/:id', (req, res) => {

    const id = +req.params.id,
          courseIndex = courses.findIndex( course => {
              return course.id === id
          });

    courses.splice(courseIndex, 1);
    res.json({success: true})
});

server.post('/courses', (req, res) => {

    const newCourse = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        duration: +req.body.duration,
        authors: req.body.authors,
        id: currentLastId
    };

    currentLastId++;
    courses.unshift(newCourse);
    res.json({success: true})

});

server.put('/courses/:id', (req, res) => {
    const id = +req.params.id,
        courseIndex = courses.findIndex( course => {
            return course.id === id
        });

    courses[courseIndex].title = req.body.title;
    courses[courseIndex].description = req.body.description;
    courses[courseIndex].duration = req.body.duration;

    res.json({success: true});
});

server.get('/courses/:id', (req, res) => {

    const id = +req.params.id,
        courseIndex = courses.findIndex( course => {
            return course.id === id
        });

    res.json(courses[courseIndex]);

});

server.listen(3000, () => {
    console.log('server is running at port: 3000');
});

