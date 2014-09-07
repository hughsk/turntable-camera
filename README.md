# turntable-camera [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A turntable camera for use in 3D scenes. Useful as a limited alternative
to [orbit-camera](http://github.com/mikolalysenko/orbit-camera) in specific
cases.

## Usage

[![NPM](https://nodei.co/npm/turntable-camera.png)](https://nodei.co/npm/turntable-camera/)

### camera = TurntableCamera()

Creates a new turntable camera instance.

### camera.view([data])

Calculates and returns a 4x4 view matrix based on the camera's current
configuration. Optionally, you can pass in your own `data` array to update
too.

### camera.rotation

The rotation the camera should make around the Y axis, in radians.

### camera.center

An `[x, y, z]` array, referring to the center (or, "focal point") of the camera.

### camera.distance

The camera's distance from the focal point along the XZ plane.

### camera.downwards

The angle for the camera to look downwards, in radians. Note that this will also
effect the Y position of the camera, and hence its overall distance from the
focal point.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/turntable-camera/blob/master/LICENSE.md) for details.
