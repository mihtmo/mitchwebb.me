// Canvas
const canvas = document.querySelector('canvas.three')

// Texture Loader
const texture = new THREE.TextureLoader()

// Scene
const scene = new THREE.Scene()

// Create Record Jacket Components
// Textures
// const jacketface_texture = texture.load('../images/imaginarydeadlines-jacket-front.png');
// const jacketback_texture = texture.load('../images/imaginarydeadlines-jacket-back.png');
// Geometry

const weatherblanket = new THREE.Group()

for (let i = 0; i < dayNum; i++) {
    const width = 14;
    const low = fulltable[i][1];
    const high= fulltable[i][2];
    const precip = fulltable[i][3];
    const lowColor = heatcolorScale(fulltable[i][1])
    const highColor = heatcolorScale(fulltable[i][2])
    const heatHeight = (high-low) * 10
    const rainHeight = precip * 10 * 10
    const positionX = ((-(dayNum * width) / 2) + (i * width));
    const positionZ = 0;
    const heatMidpoint = ((high - low) * 10) + 600
    // const date = (props.weatherData[i][0]).toLocaleString('default', { month: 'long' })

    const heatBarGeo = new THREE.PlaneGeometry(width, heatHeight)
    const rainBarGeo = new THREE.PlaneGeometry(width, rainHeight)

    // Materials
    const heatBarMat = new THREE.MeshBasicMaterial({ color: highColor })
    const rainBarMat = new THREE.MeshBasicMaterial({ color: 'blue' })

    // Meshes
    const heatBar = new THREE.Mesh(heatBarGeo, heatBarMat)
    const rainBar = new THREE.Mesh(rainBarGeo, rainBarMat)

    // Position Bars
    heatBar.position.set(positionX, heatMidpoint - 200, positionZ)
    heatBar.rotation.y += Math.PI
    rainBar.position.set(positionX, (rainHeight - 500)/2 - 200, positionZ)

    // Group Bars
    weatherblanket.add(heatBar)
    if (rainHeight > 0) {
        weatherblanket.add(rainBar)
    }

    // Position Bars


};

// Add to Scene
scene.add(weatherblanket)


// // Create Vinyl
// const vinylfront_texture = texture.load('../images/imaginarylp-side1.png')
// const vinyl_bump = texture.load('../images/vinyl-bump.png')
// const vinyl_geo = new THREE.CylinderGeometry(150, 150, 2, 64, 3)
// const vinyl_mat = new THREE.MeshBasicMaterial({ map: vinylfront_texture })
// vinyl_mat.transparent = true
// const vinyl_matb = new THREE.MeshPhongMaterial({ bumpMap: vinyl_bump })
// const vinyl = new THREE.Mesh(vinyl_geo, vinyl_mat, vinyl_matb)

// vinyl.position.set(100, 0, -1.5)
// vinyl.rotation.x = Math.PI / 2

// scene.add(vinyl)


// Sizes
const sizes = {
    width: window.innerWidth * .9,
    height: window.innerHeight * .9
}

// Camera
const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 1, 10000)
camera.position.z = 3000
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

// Controls
const controls = new DragControls(weatherblanket, camera, renderer.domElement)
controls.enableDamping = true

controls.addEventListener( 'dragstart', function ( event ) {
	event.object.material.emissive.set( 0xaaaaaa );
} )

controls.addEventListener( 'dragend', function ( event ) {
	event.object.material.emissive.set( 0x000000 );
} )

// Fit-Screen
function resize() {
    // Update Sizes
    sizes.width = window.innerWidth * .8,
    sizes.height = window.innerHeight * .8,
    // Update Camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    // Update pixel ratio
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
}

window.onresize = resize

// Fullscreen support, including safari
function fullscreen() {
  
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }

    }
}

window.addEventListener('dblclick', fullscreen)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// "12 Inch Vinyl Record EP" (https://skfb.ly/6Z8zV) by finnddot is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).