//路径生成器
//条件加载器

import requireHacker from "./requireHacker.js"

import ifdefParser from "./public/util/ifdef/index.js";
import pathConstructor from "./backend/util/pathConstructor.js"
//import { initNaive } from "./initNaive.js";
//创建naive对象
export default class naive {
  constructor(options) {
    this.frontend = {}
    this.backend = {
      port: options.publish.port || '80',
      ip: options.publish.ip || window.siyuan.config.localIPs
    }
    this.public = {
      config: options,
      status: {
        ifDefOptions: {}
      }
    }
    this.doc = {}
    console.log(this)
    global.naive = this
    this.合并设置()
    this.初始化编译条件()
    if (require) {
      this.hackRequire()
      console.log(require)
      this.初始化工作空间()
      this.初始化后端()
    }
    this.初始化前端()
  }
  重新加载() {
    if (window.require) {
      const { webContents } = require('@electron/remote');
      webContents.getAllWebContents().forEach(element => {
        element.reloadIgnoringCache()
      });
    }
  }
  初始化工作空间() {
    this.pathConstructor = new pathConstructor(this.public.config.system.workspaceDir,this)
  }
  async 初始化后端() {
    let that = this
    await import('./backend/index.js').then(
      module => {
        let naiveBackend = module.default
        that.backend = new naiveBackend(this)
      }
    ).catch(e => {
      console.error(e)
    })
  }
  初始化前端() {

  }
  log(...args) {
    if (require) {
      console.log(...args)
    }
  }
  合并设置() {
    let options = this.public.config
    if (window.siyuan) {
      this.log('在思源中运行,使用思源的工作空间')
      this.public.status.workspaceDir = window.siyuan.config.system.workspaceDir
      this.siyuan = window.siyuan
    }

  }
  初始化编译条件() {
    let { ifDefOptions } = this.public.status.ifDefOptions
    ifDefOptions = {
      defs: {
        //如果没有require说明运行在浏览器中
        BROWSER: window.require ? false : true,
        APP: window.require ? true : false,
        PUBLISH: !window.siyuan,
        MOBILE: !window.siyuan.mobileEditor ? false : true,
        DEBUG: true,
      },
      //是否输出编译日志
      verbose: this.public.config.log.verbose,
      //是否使用三道斜杠定义
      tripleSlash: true,
      fillWithBlanks: true,
      uncommentPrefixString: "",
    };
    this.public.ifdefParser = new ifdefParser(ifDefOptions)
  }
  hackRequire() {
  }
  初始化服务器() {
    this.backend.serverUtil = new serverUtil()
    this.backend.server = new naiveServer(this)
    //const server = require("./script/server/initServer.js", this.pathConstructor.naivePath());
    //this.backend.server = server.创建服务器(naive);
    //const fileWatcher = require("./script/server/util/watch.js", this.pathConstructor.naivePath())
    //fileWatcher.startWatch()
  }
}
/*
window.naive = {
  frontend:{},
  backend:{},
  public:{
    status:{}
  },
  doc:{},
};
let naive = window.naive;
//初始化naive对象
//条件加载器
//这里应该放到别的部分去
let {ifDefOptions} = naive.public.status
ifDefOptions = {
  defs: {
    BROWSER: window.require ? false : true,
    APP: window.require ? true : false,
    PUBLISH: !window.siyuan,
    MOBILE: !window.siyuan.mobileEditor ? false : true,
    DEBUG: true,
  },
  verbose: true,
  tripleSlash: true,
  fillWithBlanks: true,
  uncommentPrefixString: "",
};
//判定环境
ifDefOptions.defs.BROWSER = window.require ? false : true,
ifDefOptions.defs.APP = window.require ? true : false,
ifDefOptions.defs.PUBLISH = !window.siyuan,
ifDefOptions.defs.MOBILE = !window.siyuan.mobileEditor ? false : true,
ifDefOptions.defs.DEBUG = true,
  naive.backend.ifdefParser = new ifdefParser(naive.ifDefOptions);
//从siyuan对象获取工作空间路径
naive.public.status.workspaceDir = window.siyuan.config.system.workspaceDir;
//从siyuan对象获取主题名称
naive.public.status.themeName = !window.siyuan.config.appearance.mode
  ? window.siyuan.config.appearance.themeLight
  : window.siyuan.config.appearance.themeDark;
//路径生成器，主要用于生成各种路径变量
//获取用户信息
if(window.siyuan){
naive.public.status.user = {}
if (window.siyuan.user) {
  naive.public.status.user = window.siyuan.user;
}
//获取websocket
naive.frontend.siyuanWs = window.siyuan.ws;
}


//await initNaive();

*/
