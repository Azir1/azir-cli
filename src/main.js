// 解析用户参数
const program = require('commander')
const path = require('path')
const { version } = require('./constans')
// 当前用户输入的命令行的参数
// console.log(process.argv)

// 自定义用户命令
const mapAction = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'azir-cli create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'azir-cli config set <k> <v>',
      'azir-cli config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
}

// 遍历配置的命令,Reflect.ownKeys比Object.keys好，因为可以遍历Symbol
Reflect.ownKeys(mapAction).forEach((action) => {
  // 自定义命令
  program
    .command(action) // 配置命令名字
    .alias(mapAction[action].alias) // 命令别名
    .description(mapAction[action].description)
    .action(() => {
      if (action === '*') {
        console.log(mapAction[action].description)
      } else {
        // console.log(mapAction[action].description) // 命令描述
        // 动态引入当前目录下对应的命令动作文件,process.argv的内容是[node,azir-cli,create]
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
      }
    })
})

// 监听用户的help帮助事件,把自定义的用户命令的example传入
program.on('--help', () => {
  console.log('\nExamples:')
  Reflect.ownKeys(mapAction).forEach((action) => {
    mapAction[action].examples.forEach((examples) => {
      console.log(` ${examples}`)
    })
  })
})

// 解析用户传递过来的参数,必须放在遍历配置命令之后
program.version(version).parse(process.argv)
