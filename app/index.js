const path = require('path')
const express = require('express') 
const exphbs = require('express-handlebars')
const request = require('request-promise')
const app = express()  
const port = Number(process.env.PORT || 3000);
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
      // TODO: Request to Spotify
      var video_sources = ['<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14335548_1051193988330176_850900594_n.mp4" type="video/mp4">',]
      var wod = formatter.formatResponse(data);
      res.render('wod', {wod: wod,
        source: video_sources[0]
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