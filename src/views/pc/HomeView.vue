<template>
  <div class="home">
    PC HOME PAGE
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HrMenu from '@/layout/components/HrMenu.vue'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import html2canvas from 'html2canvas';
import UAParser from 'ua-parser-js'

// import three.js
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 

let ua = new UAParser(navigator.userAgent)
console.log('navigator.userAgent >', navigator.userAgent)
console.log('parser >', ua.getDevice().type)
console.log('parser >', ua.getDevice())

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
    this.initThree()
  },
  methods: {
    initThree () {
      // init three
      const scene = new Three.Scene()
      scene.background = new Three.Color('#eee')
      scene.fog = new Three.Fog('#eee', 20, 100)
      const canvas = document.querySelector('#three')
      const renderer = new Three.WebGLRenderer({ canvas, antialias: true })
      renderer.shadowMap.enabled = true

      /**
       * fov — 摄像机视锥体垂直视野角度。可以理解为人类的视野广度。
       * aspect — 摄像机视锥体横纵比。渲染结果的横向尺寸和纵向尺寸的比值，这里我们使用的是 浏览器窗口的宽高比。
       * near — 摄像机视锥体近端面。一切比近面更近的事物将不被渲染。
       * far — 摄像机视锥体远端面。一切比远面更远的事物将不被渲染，但是设置过大可能会影响性能。
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


          //将纹理图生成基础网格材质(MeshBasicMaterial)
          // const material = new Three.MeshBasicMaterial({
          const material = new Three.MeshPhongMaterial({
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
      scene.add(hemLight)

      const dirLight = new Three.DirectionalLight(0xffffff, 0.6)
      //光源等位置
      // dirLight.position.set(-1, -1, -1)
      dirLight.position.set(-10, 8, -5)
      //可以产生阴影
      dirLight.castShadow = true
      dirLight.shadow.mapSize = new Three.Vector2(1024, 1024)
      scene.add(dirLight)

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
  #three {
    width: 100%;
    height: 100%;
    // position: fixed;
    // left: 0;
    // top: 0;
  }
</style>
