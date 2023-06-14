import { TYPE as MatType, DESC as MatDesc } from '../logic/TreeMatClass.js'
import { TYPE as LightType, DESC as LightDesc } from '../logic/TreeLightClass.js'

export const DefThreeConf = [
  { desc_mat: MatDesc.BASIC, desc_light: LightDesc.NONE,
    Light: { type: LightType.NONE, }, 
  },
  { desc_mat: MatDesc.LAMBERT, desc_light: LightDesc.SPOT,
    Mat: { type: MatType.LAMBERT},
    Light: { type: LightType.SPOT, }, 
  },
  { desc_mat: MatDesc.LAMBERT, desc_light: LightDesc.SPOT,
    Mat: { type: MatType.LAMBERT, color: 0xFF00ff, },
    Light: { type: LightType.SPOT, }, 
  },
]

export default DefThreeConf
