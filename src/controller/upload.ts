import Base from './base.js';
export default class extends Base {
  async indexAction() {
    if(!this.ctx.isPost){
        return this.ctx.json({
            success: false
        })
    }
    let themefile = this.file()
    const res = await this.upload()
    // this.ctx.json(this.ctx.config('upload'))
    // this.ctx.json({themefile})
    console.log(res)
    this.ctx.json({res})
  }
}
