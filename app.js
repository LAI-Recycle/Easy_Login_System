const express = require('express')
const exphbs = require('express-handlebars');
const users = require('./users.json');

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
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
      res.render('welcome' ,{  username : username })
    }
   
  }
})



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})

