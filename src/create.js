// create的所有逻辑
// 拉取你自己的所有项目列出来，让用户选，安装那个项目 projectName
// 选完后，再显示所有版本号
// 可能还需要用户配置一些数据，来结合渲染我的项目

// 到GitHub开发者api中 https://api.github.com/users/Azir1/repos 获取用户或组织下的仓库
const axios = require('axios')
const path = require('path')
const ora = require('ora')
const Inquirer = require('inquirer')
const { downloadDirectory } = require('./constans')
const { promisify } = require('util')
const fs = require('fs')
// 遍历文件夹，找需不需要渲染
const MetalSmith = require('metalsmith')
// consolidate统一了  所有的模板引擎
let { render } = require('consolidate').ejs
render = promisify(render)
let ncp = require('ncp')
let downloadGitRepo = require('download-git-repo')
// promisify将异步回掉转成promise
downloadGitRepo = promisify(downloadGitRepo)
ncp = promisify(ncp)
// 获取项目的所有模板
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/users/Azir1/repos')
  return data
}
// 获取版本号
const fetchVersion = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/Azir1/${repo}/tags`)
  return data
}
// 下载模板
const download = async (repo, tag) => {
  let api = `Azir1/${repo}`
  if (tag) {
    api += `#${tag}`
  }
  let dest = `${downloadDirectory}/${repo}`
  await downloadGitRepo(api, dest)
  return dest // 下载的最终目录
}


// 封装loading效果，这边使用高阶函数，相当于是返回了一个匿名函数,分开传参，也是柯里化的思想
const waitLoading = (fn, msg) => async (...args) => {
  // 设置loading效果
  const spinner = ora(msg)
  spinner.start()
  // 获取模板
  let repos = await fn(...args)
  // 获取之前显示loading，关闭loading
  spinner.succeed()
  return repos
}

module.exports = async (projectName) => {
  // 获取模板
  let repos = await waitLoading(fetchRepoList, 'fetching template...')()
  let reposName = repos.map(item => item.name)
  // console.log(reposName)

  // 选择模板inquirer
  let { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice a template to create project',
    choices: reposName
  })
  console.log(repo)

  // 通过当前选择的项目，拉取对应的版本
  // 获取版本号  https://api.github.com/repos/Azir1/vue-ts-memo/tags
  let versions = await waitLoading(fetchVersion, 'please wait...')(repo)
  let versionName = versions.map(item => item.name)
  let { version } = await Inquirer.prompt({
    name: 'version',
    type: 'list',
    message: 'please choice a version to create project',
    choices: versionName
  })

  // 下载模板后，放到一个临时目录，以备后期使用，缓存
  // download-git-repo
  let res = await download(repo, version)
  console.log(res, '路径')
  // 先判断项目名字是否存在，存在就提示当前已经存在
  // 如果有ask.js文件
  if (fs.existsSync(path.join(res, 'ask.js'))) {
    // 复杂的需要模板渲染，然后再拷贝
    // 把git上的项目下载下来，如果有ask文件就是一个复杂的模板，我们需要用户选择，选择后编译模板
    // metalsmith，只要是编译都需要这个模块
    await new Promise((resolve, reject) => {
      // 1）让用户填信息
      MetalSmith(__dirname) // 如果你传入路径，默认会遍历当前路径的src
        .source(res)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(res, 'ask.js'))
          const obj = await Inquirer.prompt(args)
          const meta = metal.metadata()
          Object.assign(meta, obj)
          delete files['ask.js']
          done()
        })
        .use((files, metal, done) => {
          let obj = metal.metadata()
          console.log(metal.metadata())
          // 渲染模板，后会自动输出到根目录下
          Reflect.ownKeys(files).forEach(async file => {
            // 找出配置文件，渲染到类似package.json中的<%>引擎中
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].content.toString() // 文件的内容
              if (content.includes('<%')) {
                content = await render(content, obj)
                files[file].content = Buffer.from(content)
              }
            }
          })
          done()
        })
        .build(err => {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
    })
    // 2）用户的信息去渲染模板
    console.log('复杂模板')
  } else {
    // 拿到了下载的目录，简单模板直接拷贝当前执行的目录下即可 ncp
    ncp(res, path.resolve(projectName))
  }


}
