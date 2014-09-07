var canvas  = document.body.appendChild(document.createElement('canvas'))
var clear   = require('gl-clear')({ color: [0, 0, 0, 1], depth: true })
var gl      = require('gl-context')(canvas, render)
var wire    = require('gl-wireframe')
var Geom    = require('gl-geometry')
var combine = require('mesh-combine')
var Shader  = require('glslify')
var mat4    = require('gl-mat4')
var bunny   = require('bunny')

//
// Create a bunny on a grid
//
var grid = require('grid-mesh')(30, 30)
for (var i = 0; i < grid.positions.length; i++) {
  grid.positions[i][2] = grid.positions[i][1] - 15
  grid.positions[i][1] = 0
  grid.positions[i][0] -= 15
}

bunny = combine([bunny, grid])
bunny = Geom(gl)
  .attr('position', bunny.positions)
  .faces(wire(bunny.cells))

//
// Basic white shader
//
var shader = Shader({
    vert: './demo.vert'
  , frag: './demo.frag'
})(gl)

var camera = require('./')()
var proj   = mat4.create()

camera.center[1] = 0
camera.downwards = Math.PI * 0.25 * Math.sin(Date.now() * 0.001)

window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)

function render() {
  var width = canvas.width
  var height = canvas.height

  gl.viewport(0, 0, width, height)
  clear(gl)

  mat4.perspective(proj
    , Math.PI / 4
    , width / height
    , 0.001
    , 1000
  )

  // update camera rotation angle
  camera.rotation = Date.now() * 0.0004
  camera.downwards = Math.PI * 0.25 * Math.sin(Date.now() * 0.001)

  bunny.bind(shader)
  shader.uniforms.proj = proj
  shader.uniforms.view = camera.view()
  bunny.draw(gl.LINES)
}
