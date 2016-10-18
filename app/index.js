const path = require('path')
const express = require('express') 
const app = express()  
//const layout = require('./config/views-config')
const port = Number(process.env.PORT || 3000);
const exphbs = require('express-handlebars')
const request = require('request-promise')
const formatter = require('./helpers/requestFormatter') 

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views')) 
app.use(express.static(__dirname + '/views'));

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.get('/', (req, res) => {  
  request({
    uri: 'https://wodx.herokuapp.com/api/v1/wod',
    json: true
  })
    .then((data) => {
      // request({
      //   uri: 'https://api.instagram.com/v1/tags/pushups/media/recent?count=30&client_id=93daf7f27158410b8a8991ab0d8689c0',
      //   json: true
      // })
      // .then((videos_data)=>{
      //   console.log(videos_data);
      // })

      var wod = formatter.formatResponse(data);
      res.render('wod', {name: wod,
        video: "TEST TEST"
      }) 
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.use((err, request, response, next) => {  
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})