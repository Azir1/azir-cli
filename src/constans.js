// 存放用户所需要的常量
const { version } = require('../package.json')
// 缓存模板的位置,mac下为darwin，并隐藏文件夹/.
const downloadDirectory = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']+'/.template'

// console.log(downloadDirectory)
module.exports = {
  version,downloadDirectory
}
