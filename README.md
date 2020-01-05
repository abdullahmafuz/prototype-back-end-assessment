
#### prototype-assessment (Backend API code in ExpressJS)


# StarWar API

**API** has registration and login route  and Get starwars information from MongoDB database



### Route
```javascript
// for user authentcation [Login]
app.use('/api/users',require('./router/api/user'));

// for regisration [registraion]
app.use('/api/auth',require('./router/api/auth'));


/* api for getting Which of all Star Wars movies has the longest opening crawl (counted by numberof characters*/
app.use('/api/task1',require('./router/api/task1'));


/* api for getting What character (person) appeared in most of the Star Wars films?*/
app.use('/api/task2',require('./router/api/task2'));



/* api for getting What species (i.e. characters that belong to certain species) appeared in the most
number of Star Wars films*/
app.use('/api/task3',require('./router/api/task3'));


/* api for getting What planet in Star Wars universe provided largest number of vehicle pilots?*/
app.use('/api/task4',require('./router/api/task4'));


```

> All get Route is Privated Route , so you can acces those by geting JWT token 

>All Post Route is public , like login and regiration rote




### Available Scripts

In the project directory, you can run:

### Installation
<!-- Code Blocks -->
```bash
  npm install

  npm start

  npm test

  npm run build
``` 

###You need to run `npm install` to install all its dependencies
 
### `npm start`



Open [http://localhost:5000](http://localhost:5000) to view it in the browser and will open up index api with message `StarWars APi is Running !!!`

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

its  [FrontEnd repository](https://github.com/abdullahmafuz/prototype-front-end-assessment)


>You can contact me through email or phone call
<!-- Tables -->


| Email | abdullahmafuz1@gmail.com |
| Mobile no | 971567729088 |
