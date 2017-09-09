const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const pixel = require('./pixel')(200,200)
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  exname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use('/static',express.static(path.join(__dirname,'static')))
app.get('/', (req,res) => {
  res.render('home',{
    source: "174.20.75.208:3000",
    width: 200,
    height: 200
  })
})
app.get('/local', (req,res) => {
  res.render('home',{
    source: "localhost:3000",
    width: 200,
    height: 200
  })
})

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('put', (u) => {
    console.log(u)
    var n = u.split(',')
    pixel.putPixel(parseInt(n[0]),parseInt(n[1]),n[2])
    socket.broadcast.emit('update',u)
  })
})




server.listen(3000)
