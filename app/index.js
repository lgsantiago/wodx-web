const path = require('path')
const express = require('express') 
const exphbs = require('express-handlebars')
const request = require('request-promise')
//const layout = require('./config/views-config')
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
      // request({
      //   uri: 'https://api.instagram.com/v1/tags/pushups/media/recent?count=30&client_id=93daf7f27158410b8a8991ab0d8689c0',
      //   json: true
      // })
      // .then((videos_data)=>{
      //   console.log(videos_data);
      // })
      //TODO: send videos_data to getVideoSource() function
      var video_sources = [
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14335548_1051193988330176_850900594_n.mp4" type="video/mp4">',
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14669536_1760713030860499_7732674590190600192_n.mp4" type="video/mp4">',
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14801852_1718398785149252_661271319718920192_n.mp4" type="video/mp4">',
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14795120_1089801374468528_2292598764591906816_n.mp4" type="video/mp4">',
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14796873_1129518557131557_255216543095324672_n.mp4" type="video/mp4>',
      '<source name="video" src="https://scontent-ord1-1.cdninstagram.com/t50.2886-16/14793103_1704712819850274_7538965195704500224_n.mp4" type="video/mp4>'
      ]
      var wod = formatter.formatResponse(data);
      res.render('wod', {name: wod,
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