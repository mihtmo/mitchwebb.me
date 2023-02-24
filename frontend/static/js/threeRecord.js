

// Canvas
const canvas = document.querySelector('canvas.three')

// Texture Loader
const texture = new THREE.TextureLoader()

// Scene
const scene = new THREE.Scene()

// Create Record Jacket Components
// Textures
const jacketfaceTexture = texture.load('../images/imaginarydeadlines-jacket-front.png');
const jacketbackTexture = texture.load('../images/imaginarydeadlines-jacket-back.png');
// Geometry
const jacketfaceGeo = new THREE.BoxGeometry(314.3, 314.3, 1)
const jacketsideGeo = new THREE.BoxGeometry(314.3, 1, 2)
// Materials
const jacketfaceMat = new THREE.MeshBasicMaterial({ map: jacketfaceTexture })
const jacketbackMat = new THREE.MeshBasicMaterial({ map: jacketbackTexture })
const jacketsideMat = new THREE.MeshBasicMaterial({ color: '#b9805d' })
// Meshes
const jacketface = new THREE.Mesh(jacketfaceGeo, jacketfaceMat)
const jacketback = new THREE.Mesh(jacketfaceGeo, jacketbackMat)
const jackettop = new THREE.Mesh(jacketsideGeo, jacketsideMat)
const jacketside = new THREE.Mesh(jacketsideGeo, jacketsideMat)
const jacketbot = new THREE.Mesh(jacketsideGeo, jacketsideMat)

// Jacket elements repositioning
jacketback.position.z = -3
jackettop.position.set(0, 156.65, -1.5)
jacketbot.position.set(0, -156.65, -1.5)
jacketside.position.set(-156.65, 0, -1.5)
jacketside.rotation.z = Math.PI / 2

// Group jacket and add
const jacket = new THREE.Group()
jacket.add(jacketface, jacketback, jackettop, jacketside, jacketbot)
scene.add(jacket)

// Create Vinyl
const vinylfrontTexture = texture.load('../images/imaginarylp-side1.png')
const vinylBump = texture.load('../images/vinyl-bump.png')
const vinylGeo = new THREE.CylinderGeometry(150, 150, 2, 64, 3)
const vinylMat = new THREE.MeshBasicMaterial({ map: vinylfrontTexture })
vinylMat.transparent = true
const vinylMatB = new THREE.MeshPhongMaterial({ bumpMap: vinylBump })
const vinyl = new THREE.Mesh(vinylGeo, vinylMat, vinylMatB)

vinyl.position.set(100, 0, -1.5)
vinyl.rotation.x = Math.PI / 2

scene.add(vinyl)


// Sizes
const sizes = {
    width: window.innerWidth * .8,
    height: window.innerHeight * .8
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 3000)
camera.position.z = 450
scene.add(camera)

// Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

// Fit-Screen
function resize() {
    // Update Sizes
    console.log('hi')
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

function tick() {
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()


// "12 Inch Vinyl Record EP" (https://skfb.ly/6Z8zV) by finnddot is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).