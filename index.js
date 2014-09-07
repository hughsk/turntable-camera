var mat4 = require('gl-mat4')

module.exports = TurntableCamera

function TurntableCamera() {
  if (!(this instanceof TurntableCamera))
    return new TurntableCamera

  this.data = new Float32Array(16)
  this.center = new Float32Array(3)
  this.rotation = 0
  this.distance  = 30
  this.downwards = 0
}

var translation = new Float32Array([ 0, 0, 0 ])
var scratch = new Float32Array(16)

TurntableCamera.prototype.view = function(data) {
  data = data || this.data

  mat4.identity(data)
  translation[2] = -this.distance
  translation[1] = -Math.tan(this.downwards) * this.distance
  mat4.translate(data, data, translation)
  mat4.rotateY(data, data, this.rotation)
  mat4.translate(data, data, this.center)
  mat4.identity(scratch)
  mat4.rotateX(scratch, scratch, this.downwards)
  mat4.multiply(data, scratch, data)

  return data
}
