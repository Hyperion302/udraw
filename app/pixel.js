module.exports = function (x,y) {
  var module = {};
  var pixelMem = []
  for(var _x = 0; _x < x; _x++) {
    pixelMem[_x] = []
    for(var _y = 0; _y < y; _y++){
      pixelMem[_x][_y] = '#FFFFFF'
    }
  }

  module.putPixel = (x,y,col) => {
    pixelMem[x][y] = col
  }

  return module;
}
