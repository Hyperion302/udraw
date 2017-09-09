var Pix = (function (c,h,w){
  //Private vars
  var c = c.getContext('2d')
  var cameraX = 0
  var cameraY = 0
  var pixelScale = 10
  var pointMem = []
  var _this = this
  var network = ''
  var height = h
  var width = w
  //Construction
  for(var y=0;y<h;y++){
    pointMem[y] = []
    for(var x=0;x<w;x++){
      pointMem[y][x] = '#FFFFFF'
    }
  }
  c.canvas.width = window.innerWidth
  c.canvas.height = window.innerHeight
  //Public methods
  var pix = {
    manualRedraw: () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      pointMem.forEach((col,x) => {
        col.forEach((sq,y) => {
          c.fillStyle = sq
          c.fillRect((x+cameraX)*pixelScale,(y+cameraY)*pixelScale,pixelScale,pixelScale)
        })
      })
    },
    setNetwork: (n) => {
      network = n
    },
    drawPoint: (x,y,col,netUse) => {
      pointMem[x][y] = col
      //Update Client
      pix.manualRedraw()
      //Update Server
      if(!netUse){network.sendChange(x,y,col)}
    },
    drawBatch: (x,y,colDat) => {

    },
    setCamera: (x,y,scale) => {

    },
    moveCamera: ($x,$y) => {
      cameraX += $x
      cameraY += $y
      pix.manualRedraw()
    },
    setScale: (s) => {
      pixelScale = s
    },
    changeScale: ($s) => {
      pixelScale += $s
      if(pixelScale < 1) {
        pixelScale = 1
      }
      pix.manualRedraw()
    },
    handleClick: (e) => {
      var _x = Math.floor((e.clientX/pixelScale)-cameraX)
      var _y = Math.floor((e.clientY/pixelScale)-cameraY)
      if(_x <= width && _y <= height) {
        pix.drawPoint(_x,_y,'#0000FF')
      }

      //console.log('['+_x+','+_y+']')
    },
    handleKey: (e) => {
      //console.log(e.keyCode)
      switch(e.keyCode){
        case 187:
          pix.changeScale(1)
          break;
        case 189:
          pix.changeScale(-1)
          break;
        case 65:
          pix.moveCamera(1,0)
          break;
        case 68:
          pix.moveCamera(-1,0)
          break;
        case 83:
          pix.moveCamera(0,-1)
          break;
        case 87:
          pix.moveCamera(0,1)
          break;
        case 32:
          $("#toolbar").slideToggle(200)
          console.log('toggled')
          break;
        default:
          break;
      }
    }
  }
  return pix
})
