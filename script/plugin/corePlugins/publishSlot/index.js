export class publishSlot extends naive.plugin {
    constructor() {
        super({ name: "publishSlot"});
    }
    pipe = [
        this.生成导航栏,
        this.生成脚注
    ]
    async 生成导航栏(req,res,渲染结果){
        let 导航栏容器 = 渲染结果.querySelector('.publishNavi')
        let html = `<li data-type="tab-header" data-position="center" class="item">
        <span class="item__icon favicon" style="width: 30px;height: 30px;">
            <img src="/stage/favicon.png">
        </span>
        <a href="/block/${naive.设置.首页.思源文档id}">
            ${naive.设置.首页.显示名称||'首页'}
        </a>
    </li>
    <li data-type="tab-header" data-position="center" class="item" data-type="搜索">



    <span class="item__icon" data-type="navi-searcher">

        <input />
    </span>
    <span class="item__icon">
        <svg>
            <use xlink:href="#iconSearch"></use>
        </svg>
    </span>

</li>

    `
        let stmt = `select * from blocks where id in (select block_id from attributes where name ="custom-publish-slot" and value="navi" )`
        let naviBlocks = await this.核心api.sql({stmt:stmt},'')
        naviBlocks.forEach(
            block=>{
                html += `<li data-type="tab-header" data-position="center" class="item">
                <span>
                    <span class="item__text"><a href="/block/${block.id}">${block.name||block.content.slice(0,6)}</a></span>
                </span>
            </li>`
            }
        )
        导航栏容器.querySelector('.toolbarCenter .layout-tab-bar').innerHTML=html
        return 渲染结果
    }
    async 生成脚注(req,res,渲染结果){
        let 文档容器 = 渲染结果.querySelector('.protyle-wysiwyg.protyle-wysiwyg--attr[data-doc-type="NodeDocument"]')
        let html = `
            <div class="fn__flex fn__flex-1 fn__flex-column" style="text-align:center;min-height:0.1px !important">
        `
        let stmt = `select * from blocks where id in (select block_id from attributes where name ="custom-publish-slot" and value="footer" )`
        let footBlocks = await this.核心api.sql({stmt:stmt},'')
        footBlocks.forEach(
            block=>{
                html += `<div data-type="footer-item" data-position="center" class="item">
                <span>
                    <span class="item__text"><a href="/block/${block.id}">${block.name||block.content.slice(0,6)}</a></span>
                </span>
            </div>`
            }
        )
        文档容器.parentElement.innerHTML+=html+"</div>"
        return 渲染结果
    }
}
export const dependencies= ['publishContent']