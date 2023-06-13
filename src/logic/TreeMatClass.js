import * as Three from 'three'
export const TYPE = {
  NONE: 'None',
  BASIC: 'MAT_BASIC',
  BASIC_Normal: 'MAT_BASIC',
  LAMBERT: 'MAT_LAMBERT',
}
export const DESC = {
  BASIC: 'MeshBasicMaterial',
  LAMBERT: 'MeshLambertMaterial',
}

export class MatClass{
  constructor (args, type = TYPE.BASIC ) {
    console.log('TTT new MatClass', args, type)
    this.texture = new Three.TextureLoader().load(args.textureUrl)
    if (this.texture) this.texture.flipY = false
    this.type = type
    this.args = args
    console.log('TTT new MatClass this.args', this.args)
    return this._render()
  }

  _render () {
    let material = null
    let matArgs = {}
    switch (this.type) {
      case TYPE.BASIC:
        // DESC: 基本材質MeshBasicMaterial是個簡單的顏色材質, 此材質並不會對光線產生反應
        material = new Three.MeshBasicMaterial({
          map: this.texture, // 普通顏色紋理貼圖
        })
        break

      case TYPE.LAMBERT:
        // DESC: 朗伯材質MeshLambertMaterial, 這是一個黯淡, 不光亮的材質, 可對光源產生反應, 一般使用方式很簡單, 只需要定義顏色即可
        matArgs = {
          map: this.texture, // 普通顏色紋理貼圖
        }
        if (Object.prototype.hasOwnProperty.call(this.args, 'color')) matArgs.color = this.args.color
        material = new Three.MeshLambertMaterial(matArgs)
        break
    } 
    return material 
  }
}
