const express = require('express')
const exphbs = require('express-handlebars');
const session = require('express-session');
const users = require('./users.json');

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'Secret',
  name: 'user', // optional
  saveUninitialized: false,
  resave: true, 
}))

app.get('/', (req, res) =>{
  console.log("session",req.session)
  console.log("sessionID",req.sessionID) 
  res.render('index')
})

app.post('/login', (req, res) => {
  const Email = req.body.Email 
  const Password = req.body.password

  const Emailexist = users.find( user =>  user.email === Email  )


  if(!Emailexist){

    res.render('index' , {  Emailunexist : Email })

  } else {
    //這個抓取方式要記得
    const passwordexist = Emailexist.password
    
    if( passwordexist!== Password){

      res.render('index' , {  Emailunexist : Email })
    } else {
      const username = Emailexist.firstName
      req.session.user = username
      res.render('welcome' ,{  username : username })
    }
   
  }
})



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})

