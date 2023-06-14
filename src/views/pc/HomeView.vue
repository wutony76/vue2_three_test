<template>
  <div class="home-container">
    PC HOME PAGE
    <div ref="homeMain">
      <div class="row">
        <div class="grid">
          <canvas ref="sample01" id="three"></canvas>
          <h5>Mat- MeshBasicMaterial</h5>
          <h5>Light- None</h5>
        </div>

        <div class="grid">
          <canvas id="three02"></canvas>
          <h5>Mat- MeshBasicMaterial</h5>
          <h5>Light- None</h5>
        </div>

        <div class="grid">
          <canvas id="three03"></canvas>
          <h5>Mat- MeshBasicMaterial</h5>
          <h5>Light- None</h5>
        </div>

        <!-- <div class="grid">
          <canvas id="three02"></canvas>
        </div>
        <div class="grid">
          <canvas id="three03"></canvas>
        </div>
        <div class="grid">
          <canvas id="three04"></canvas>
        </div> -->
        <!-- <canvas class="grid" id="three"></canvas>
        <canvas class="grid" id="three"></canvas>
        <canvas class="grid" id="three"></canvas> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HrMenu from '@/layout/components/HrMenu.vue'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import html2canvas from 'html2canvas';

// import three.js
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 

import defMulitConf from '@/config/MultipleTreeConf'
import { DrawCanvas } from '@/logic/TreeGltfClass.js'
// import { TYPE as MatType, DESC as MatDesc } from '@/logic/TreeMatClass.js'
// import { TYPE as LightType, DESC as LightDesc } from '@/logic/TreeLightClass.js'



export default {
  name: 'HomeView',
  components: {
    HelloWorld, HrMenu
  },
  computed: {
    ...mapState({
      uaInfo: state => state.global.uaInfo,
    })
  },
  mounted () {
    // console.log('ttttt mounted', this.$device())
    // console.log('mxDevice > ', this.uaInfo.device)

    // this.initThree()
    // const getDom = this.$refs.homeMain
    // console.log('this.$refs.homeMain >', getDom.children)
    // console.log('this.$refs.homeMain >', getDom.$el)
    this.initCanvas()
  },

  methods: {
    initCanvas () {
      const DefThreeConf = defMulitConf 
      Array.prototype.forEach.call(this.$refs.homeMain.children, (childs) => {
        Array.prototype.forEach.call(childs.children, (child, index) => {
          const getCanvasId = `#${child.children[0].id}`
          const args = DefThreeConf[index]
          // console.log('getCanvasId >', getCanvasId, index)
          const matColor = this.handleGetMatColorDesc(args)
          child.children[1].innerText = 'Mat - ' + args.desc_mat + matColor 
          child.children[2].innerText = 'Light - ' + args.desc_light 
          this.initThree(getCanvasId, args)
        })
      })

      /**
       *  test single canvas. 
       */
      // console.log(
      //   'this.$refs.homeMain.children[0] >',
      //   this.$refs.homeMain.children[0].children[0].children[0].id
      // )
      // const getFirstCanvasId = `#${this.$refs.homeMain.children[0].children[1].children[0].id}`
      // // this.initThree(`#${this.$refs.homeMain.children[0].children[0].children[0].id}`)
      // this.initThree(`#${this.$refs.homeMain.children[0].children[0].children[0].id}`, {
      //   desc_mat: MatDesc.LAMBERT,
      //   desc_light: LightDesc.SPOT,
      //   Light: {
      //     type: LightType.SPOT,
      //   }, 
      // })
      // this.initThree(getFirstCanvasId, {
      //   desc_mat: MatDesc.LAMBERT,
      //   desc_light: LightDesc.SPOT,
      //   Mat: {
      //     type: MatType.LAMBERT, 
      //     color: 0xFF00ff,
      //   },
      //   Light: {
      //     type: LightType.SPOT, 
      //   },
      // })
      // this.initThree(`#${this.$refs.homeMain.children[0].children[2].children[0].id}`, {
      //   Mat: {
      //     desc_mat: 'MeshLambertMaterial',
      //     desc_light: '',
      //     type: MatType.LAMBERT, 
      //     color: 0xFF00ff,
      //   },
      //   Light: {
      //     type: LightType.SPOT, 
      //   },
      // })

    },
    async initThree (canvasId, args) {
      console.log('canvasId >>', canvasId)
      const canvas = document.querySelector(canvasId)
      const drawCanvas = new DrawCanvas(canvas, args)
      const res = await drawCanvas.init()
      setTimeout(() => {
        console.log('>>>>>>>', Object.keys(res.model).length, res)
        if (args && Object.keys(res.model).length > 0) {
          // 如果有設定Light，場景加入燈
          if (Object.prototype.hasOwnProperty.call(args, 'Light')) drawCanvas._addLight()
          // 如果有設定Mat，物件重新改材質
          if (Object.prototype.hasOwnProperty.call(args, 'Mat')) drawCanvas.updateModelMat()
        }
      }, 500)


      const isReturn = true
      if (isReturn) return

      const renderer = new Three.WebGLRenderer({ canvas, antialias: true })
      renderer.shadowMap.enabled = true

      const scene = this.three_scene()
      const camera = this.three_camera_PerspectiveCamera()
      const group = this.three_group()
      scene.add(group)
      const controls = this.three_controls(camera, renderer)

      /**
       * start handle settings somthing.
       */
      this.handleGltfModel(group)

      this.three_animateFunc({
        renderer: renderer,
        scene: scene, 
        camera: camera, 
        group: group,
        controls: controls
      })
    },

    /**
     * three base configs
     */ 
    three_canvas (canvasId) {
    },
    three_scene () {
      const scene = new Three.Scene()
      scene.background = new Three.Color('#eee')
      scene.fog = new Three.Fog('#eee', 20, 100)

      
      return scene
    },
    three_camera_PerspectiveCamera () {
      const camera = new Three.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 1.5
      return camera 
    },
    three_group () {
      const group = new Three.Group()
      group.position.y = 0.09
      return group
    },
    three_controls (_camera, _renderer) {
      const controls = new OrbitControls(_camera, _renderer.domElement)
      controls.enableDamping = true
      return controls
    },
    three_animateFunc (args) {
      const scene = args.scene 
      const camera = args.camera 
      const renderer = args.renderer 
      const controls = args.controls
      const group = args.group

      // 渲染 animate 
      function animate(time) {
        // console.log('animate', model.rotation)
        time *= 0.001
        group.rotation.y -= 0.005
        // console.log('time >', time)
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
        //添加下面代码
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
      }

      animate()

      // resize render 
      function resizeRendererToDisplaySize(renderer) {
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
    },

    /**
     * handle start model 
     */ 
    handleGetMatColorDesc (args) {
      let matColor = ''
      if (Object.prototype.hasOwnProperty.call(args, 'Mat')) {
        if (Object.prototype.hasOwnProperty.call(args.Mat, 'color')) {
          matColor = ' '+ '(c:' + args.Mat.color.toString(16) + ')'
        } 
      }
      return matColor 
    },
    handleNormalModel () {
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('free_merc_hovercar/scene.gltf', (gltf) => {});
    },
    handleGltfModel (_group, cb) {
      var model = null
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('free_merc_hovercar/scene.gltf', (gltf) => {
        if (cb) {
          cb(gltf)
          return
        } 
        model = gltf.scene
        model.traverse((o) => {
          console.log('o >', o)
          //主體
          if (o.name === 'Plane006_0') {
            o.material = this.handleMaterial()
          }  
          if (o.name === 'Plane006_1') {
            o.material = this.handleMaterial()
          }  

        })
        _group.add(model)
      });
    },
    handleMaterial (type = 'mat_BASIC') {
      //将图片作为纹理加载
      let explosionTexture = new Three.TextureLoader().load(
        '/free_merc_hovercar/textures/Material.001_baseColor.jpeg'
        // '/free_merc_hovercar/textures/Plane_0_baseColor.png'
      )
      explosionTexture.flipY = false //调整纹理图的方向

      let textureNormal = new Three.TextureLoader().load(
        '/free_merc_hovercar/textures/Material.001_clearcoat_normal.png'
      )
      textureNormal.flipY = false

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
      return material 
    },
  
    _initThree () {
      // init three
      const scene = new Three.Scene()
      scene.background = new Three.Color('#eee')
      scene.fog = new Three.Fog('#eee', 20, 100)
      const canvas = document.querySelector('#three')
      // const canvas = document.querySelector(this.$refs.sample01)
      const renderer = new Three.WebGLRenderer({ canvas, antialias: true })
      renderer.shadowMap.enabled = true

      /**
       * fov — 摄像机视锥体垂直视野角度。可以理解为人类的视野广度。
       * aspect — 摄像机视锥体横纵比。渲染结果的横向尺寸和纵向尺寸的比值，这里我们使用的是 浏览器窗口的宽高比。
       * near — 摄像机视锥体近端面。一切比近面更近的事物将不被渲染。
       * far — 摄像机视锥体远端面。一切比远面更远的事物将不被渲染，但是设置过大可能会影响性能。
       * 
       * PerspectiveCamera 透視相機 (有遠近)
       * Orthographic 正交投影相機 (無遠近)
       */
      const camera = new Three.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 1.5 
  
      const group = new Three.Group()
      group.position.y = 0.09 
      scene.add(group)
      var model = null

      // loader add model
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('free_merc_hovercar/scene.gltf', (gltf) => {
        console.log('載入模型 gltf >>>', gltf)
        model = gltf.scene
        console.log('載入模型 gltf.model >>>', model)
        model.traverse((o) => {
          //将图片作为纹理加载
          let explosionTexture = new Three.TextureLoader().load(
            '/free_merc_hovercar/textures/Material.001_baseColor.jpeg'
            // '/free_merc_hovercar/textures/Plane_0_baseColor.png'
          )
          //调整纹理图的方向
          explosionTexture.flipY = false
          let textureNormal = new Three.TextureLoader().load(
            '/free_merc_hovercar/textures/Material.001_clearcoat_normal.png'
          )
          textureNormal.flipY = false

          //将纹理图生成基础网格材质(MeshBasicMaterial)
          const material = new Three.MeshStandardMaterial({
          // const material = new Three.MeshBasicMaterial({
          // const material = new Three.MeshPhongMaterial({
            map: explosionTexture, // 普通顏色紋理貼圖
            normalMap: textureNormal, // 法線貼圖 
            normalScale: new Three.Vector2(1.2, 5) //深淺值 
          })
          //给模型每部分上材质
          o.material = material
          //加这句，让模型等每个部分都能产生阴影
          if (o.isMesh) {
            o.castShadow = true
            o.receiveShadow = true
          }
        })
        // scene.add(model)
        group.add(model)
      })

      // controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      const hemLight = new Three.HemisphereLight(0xffffff, 0xffffff, 0.6)
      hemLight.position.set(0, 0, 0)
      // scene.add(hemLight)

      const dirLight = new Three.DirectionalLight(0xffffff, 0.6)
      //光源等位置
      // dirLight.position.set(-1, -1, -1)
      dirLight.position.set(-10, 8, -5)
      //可以产生阴影
      dirLight.castShadow = true
      dirLight.shadow.mapSize = new Three.Vector2(1024, 1024)
      // scene.add(dirLight)

      let floorGeometry = new Three.PlaneGeometry(8000, 8000)
      let floorMaterial = new Three.MeshPhongMaterial({
        color: 0x857ebb,
        shininess: 0,
      })

      let floor = new Three.Mesh(floorGeometry, floorMaterial)
      floor.rotation.x = -0.5 * Math.PI
      floor.receiveShadow = true
      // floor.position.y = -0.001
      floor.position.y = -0.25
      scene.add(floor)


      // 渲染 animate 
      function animate(time) {
        // console.log('animate', model.rotation)
        time *= 0.001
        group.rotation.y -= 0.005
        // console.log('time >', time)
        controls.update()
        // model.rotation.y = time
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
        //添加下面代码
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
      }

      animate()

      // resize render 
      function resizeRendererToDisplaySize(renderer) {
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
    },

    generatorImage () {
      console.log('handleChange...')
      // html2canvas(document.body).then(function (canvas) {
      //   console.log('canvas >>', canvas)
      //   document.body.appendChild(canvas);
      // });

      html2canvas(document.body).then(canvas => {
      // html2canvas(this.$refs.capture).then(canvas => {
        console.log('canvas >>', canvas)
        this.$refs.addImage.append(canvas);
        let link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.setAttribute('download', 'web截圖.png');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
      })

    }
  }
}
</script>
<style lang="scss">
  .home-container {
    // display: grid;
    .row {
      display: flex;
      justify-content: space-between;
    }
  }
  .grid {
    display: inline-block;
    // width: 24%;
    width: 47%;
    border: 1px solid #0f0;
    border-radius: 5px;

    canvas{
      width: 100%;
    }
    h5{
      margin-top: 0.3em;
      margin-bottom: 0.7em;
    }
  }

  #three {
    // width: 100%;
    // height: 100%;
    // border: 1px solid #000;

    // position: fixed;
    // left: 0;
    // top: 0;
  }
</style>
