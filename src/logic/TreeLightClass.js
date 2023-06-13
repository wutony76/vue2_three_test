import * as Three from 'three'
export const TYPE = {
  NONE: 'None',
  SPOT: 'SpotLight',
}
export const DESC = {
  SPOT: 'SpotLight',
}

export class LightClass{
  constructor (args, type) {
    console.log('TTT new LightClass', args, type)
    this.type = type
    this.args = args 
    return this._render()
  }

  _render () {
    let light = null
    switch (this.type) {
      case TYPE.SPOT:
        // DESC: 是一种具有锥形效果的光源，该光源拥有产生光的方向和角度。我们可以将其与手电筒或者灯笼产生的光进行对比。
        light = this._addSportLight(this.args) 
        break
    } 
    return light 
  }

  // ADD LIGHT
  _addSportLight (args) {
    let _light = null
    const defLightColor = args.defLightColor? args.defLightColor: 0xffffff
    _light = new Three.SpotLight(defLightColor)
    return _light 
  }


}
