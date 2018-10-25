import Base from './base.js';
import * as urllib from 'urllib'
export default class extends Base {
  async indexAction() {
    if(!this.ctx.isPost){
        return this.ctx.json({
            success: false
        })
    }
    const res = await this.upload()
    const callback = this.get('callback')
    let ret = {status: true, data: res}
    if(callback){
      const result = await urllib.request(callback, {
        method: 'GET',
        data: {data: JSON.stringify(res)},
        dataType: 'json'
      })
      ret.data = result.data && result.data.data
    }
    this.ctx.json(ret)
  }
  async demoAction(){
    const str: string = this.get('data')
    const data: any = JSON.parse(str)
    let i = 1
    data.forEach((it: any) => it.id = i++)
    return this.ctx.json({data})
  }
}
