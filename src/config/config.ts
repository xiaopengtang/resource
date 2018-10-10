// default config

import * as path from 'path'

module.exports = {
  workers: 1,
  resource_on: true, //是否开启静态资源解析功能
  resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/,
  upload: {
    path: path.join(__dirname, '../../www/static/source')
  }
};
