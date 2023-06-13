// import three.js
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 

import { MatClass, TYPE as MatType } from './TreeMatClass.js'
import { LightClass, TYPE as LightType } from './TreeLightClass.js'

// base mat
const textureUrl = '/free_merc_hovercar/textures/Material.001_baseColor.jpeg'
// const mat001 = new MatClass() 

/**
 * Log header msg set.
 * @param {*} header 
 * @returns 
 */
function LogHeader(header) {
  const log = '--class'
  return log.concat(' ', header).concat(' >>> ')
}

/**
 * isSuccess
 * defalut: false
 * finished: true
 */
class BaseClass {
  constructor (_canvas) {
    this._canvas = _canvas 
    this._isSuccess = false
    this._isLoadModel = false

    this._renderer = null
    this._scene = null
    this._camera = null
    this._controls = null
    this._group = null
    // Model Objects
    this._ModelArr = {} 
	}
  async init () {
    console.log(LogHeader('init'), this._canvas)
    if (!this._canvas) return

    const renderer = new Three.WebGLRenderer({ canvas: this._canvas, antialias: true })
    renderer.shadowMap.enabled = true
    const scene = this._addScene()
    const camera = this._addCamera()
    const controls = this._addControls(camera, renderer)
    const group = this._addGroup()
    scene.add(group)

    this._renderer = renderer
    this._scene = scene
    this._camera = camera
    this._controls = controls
    this._group = group
    // init is finished.
    this._isSuccess = true

    /**
     * start handle settings somthing.
     */
    return await new Promise( (resolve, reject) => {
       this._loadGltfModel(group).then((res) => {
        console.log('_loadGltfModel >>>', res, this._ModelArr)
        Object.keys(this._ModelArr).forEach((_model) => {
          console.log('_model -', _model)
        })
        // res===true success 
        const matBase = new MatClass({ textureUrl })
        // set MAT
        this._handleModelAddMat('Plane006_0', matBase)
        this._handleModelAddMat('Plane006_1', matBase)

        this._animateFunc()
      })
      resolve({
        model: this._ModelArr
      }) // init success 
    })
  }
  _addScene () {
    const scene = new Three.Scene()
    scene.background = new Three.Color('#eee')
    scene.fog = new Three.Fog('#eee', 20, 100)
    return scene
  }
  _addCamera () {
    // PerspectiveCamera
    // OrthographicCamera
    const camera = new Three.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 1.5
    return camera 
  }
  _addGroup () {
    const group = new Three.Group()
    group.position.y = 0.09
    return group
  }
  _addControls (_camera, _renderer) {
    const controls = new OrbitControls(_camera, _renderer.domElement)
    controls.enableDamping = true
    return controls
  }
  _animateFunc() {
    console.log(LogHeader('_animateFunc'))
    const renderer = this._renderer 
    const scene = this._scene 
    const camera = this._camera 
    const controls = this._controls
    const group = this._group

    // 渲染 animate loop 1/60 s 
    function animate(time) {
      group.rotation.y -= 0.002
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
      // //添加下面代码
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
    }
    function resizeRendererToDisplaySize (renderer) {
      const canvas = renderer.domElement
      var width = window.innerWidth
      var height = window.innerHeight
      var canvasPixelWidth = canvas.width / window.devicePixelRatio
      var canvasPixelHeight = canvas.height / window.devicePixelRatio
      const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }
    animate()
  }
  _loadGltfModel (_group, cb) {
    var model = null
    const gltfLoader = new GLTFLoader()
    // const mat00 = this.handleMaterial()
    // const matBase = new MatClass({ textureUrl })
    // const matShadow = new MatClass({ textureUrl: '/free_merc_hovercar/textures/Plane_0_baseColor.png' })
    return new Promise((resolve, reject) => {
      gltfLoader.load('free_merc_hovercar/scene.gltf', (gltf) => {
        this._isLoadModel = true
        model = gltf.scene
        model.traverse((o, i) => {
          if (o.type === 'Mesh') this._ModelArr[o.name] = o
          // model主體
          // if (o.name === 'Plane006_0') o.material = matBase
          // model部件
          // if (o.name === 'Plane006_1') o.material = matBase
          // 陰影
          // if (o.name === 'Plane_0') o.material = matShadow
        })
        _group.add(model)
        resolve(true)
      })
    })
  }
  _handleModelAddMat (modelName, _material ) {
    // console.log('_handleModelAddMat', this._ModelArr[modelName])
    this._ModelArr[modelName].material = _material
  }
  handleMaterial (type = 'mat_BASIC') {
    //将图片作为纹理加载
    let explosionTexture = new Three.TextureLoader().load(
      '/free_merc_hovercar/textures/Material.001_baseColor.jpeg'
      // '/free_merc_hovercar/textures/Plane_0_baseColor.png'
    )
    explosionTexture.flipY = false //调整纹理图的方向

    // let textureNormal = new Three.TextureLoader().load(
    //   '/free_merc_hovercar/textures/Material.001_clearcoat_normal.png'
    // )
    // textureNormal.flipY = false

    //将纹理图生成基础网格材质(MeshBasicMaterial)
    let material = null 
    switch (type) {
      case 'mat_BASIC': 
        material = new Three.MeshBasicMaterial({
          map: explosionTexture, // 普通顏色紋理貼圖
        })
      break
    } 
    // const material = new Three.MeshStandardMaterial({
    // // const material = new Three.MeshBasicMaterial({
    // // const material = new Three.MeshPhongMaterial({
    //   map: explosionTexture, // 普通顏色紋理貼圖
    //   normalMap: textureNormal, // 法線貼圖 
    //   normalScale: new Three.Vector2(1.2, 5) //深淺值 
    // })
    console.log('material --', material )
    return material 
  }
}

export class DrawCanvas extends BaseClass{
  constructor (_canvas, args, cb) {
    super(_canvas)
    this.args = args 
    console.log(LogHeader('DrawCanvas'), args)
    // this._init().then((res) => {
    //   if (cb) cb(res)
    // })
  }
  _addLight () {
    const _args = Object.prototype.hasOwnProperty.call(this.args, 'Light')? this.args.Light: {}
    let spotLight = new LightClass(_args, LightType.SPOT)
    spotLight.position.set( 100, 1000, 200 );
    this._scene.add(spotLight)
  }
  updateModelMat () {
    console.log('--------------updateModelMat--------------')
    const _args = Object.prototype.hasOwnProperty.call(this.args, 'Mat')? this.args.Mat: {}
    const mat = new MatClass({ textureUrl, ..._args }, MatType.LAMBERT)
    // set MAT
    this._handleModelAddMat('Plane006_0', mat)
    this._handleModelAddMat('Plane006_1', mat)
  }
  
} 

