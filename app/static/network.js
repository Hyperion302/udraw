var PixNet = (function(_s){
  //Private vars
  var s = _s
  var _this = this
  var render = ''
  //Constructor
  //Public
  s.on('update',(u) => {
    console.log('received' + u)
    var n = u.split(',')
    console.log('drawing point')
    render.drawPoint(parseInt(n[0]),parseInt(n[1]),n[2],true)
  })
  var pixNet = {
    sendChange: (x,y,col) => {
      var m = '' + x + ',' + y + ',' + col
      //console.log(s)
      s.emit('put',m)
      console.log('sending: ' + m)
    },
    setRender: (r) => {
      render = r
    }
  }
  return pixNet
})
