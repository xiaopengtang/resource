import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs'
import { think } from 'thinkjs';
function md5(str: string) {
    const hasher = crypto.createHash("md5")
    hasher.update(str)
    return hasher.digest('hex')
}
const utils = {
    createRelativePath(){
        const $d = new Date
        const r = (d: any) => d < 10 ? `0${d}` : d
        const formatDate = `${$d.getFullYear()}-${r($d.getMonth() + 1)}-${r($d.getDate())}`
        return formatDate
    },
    createFileName(data: any){
        return md5(`${data.name}@${data.lastModifiedDate}@${data.size}@${data.type}`) + path.extname(data.path)
    }
}
export default {
    async upload(): Promise<any>{
        let themefile = this.file() || {}
        const relative = utils.createRelativePath()
        const setting = this.ctx.config('upload')
        const staticPath = path.join(setting.path, relative)
        const keys = Object.keys(themefile)
        think.mkdir(staticPath)
        if(keys.length === 0){
            return null
        }
        let ret = []
        for(let i = 0; i < keys.length; i++){
            const key = keys[i]
            const info = themefile[key]
            const name = utils.createFileName(info)
            const filename = path.join(staticPath, name)
            fs.renameSync(info.path, filename)
            ret.push({
                path: path.join('static/source', relative),
                name,
                size: info.size,
                type: info.type,
                mtime: info.lastModifiedDate
            })
        }
        return ret
    }
}