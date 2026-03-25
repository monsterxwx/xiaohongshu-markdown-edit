import{d as $,r as b,c as F,l as z,y as p,q as u,D as S,K as A,L as E,i as C,u as H,v as M}from"./@vue-Cay7kK_Y.js";import{u as D,M as B,A as _,a as h}from"./useDeepSeek-egvjRaMM.js";import{g as m}from"./marked-BrAPT9WN.js";import{_ as R}from"./plugin-vueexport-helper-DlAUqK2U.js";const g={tech:{wrapperStyle:"max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; color: #333; line-height: 1.7; letter-spacing: 0.5px; padding: 15px; box-sizing: border-box;",h1:e=>`
        <section style="margin-bottom: 30px; text-align: center;">
            <h1 style="font-size: 24px; color: #1a1a1a; font-weight: bold; line-height: 1.4; margin-bottom: 15px;">${e}</h1>
            <p style="font-size: 14px; color: #999; margin: 0;">科技前沿 · 效率利器</p>
        </section>`,h2:(e,n)=>{const i=n.match(/^([\d]+)[ \.]*(.*)$/);if(i){const o=i[1].padStart(2,"0"),t=e.replace(/^([\d]+)[ \.]*/,"");return`
          <section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;">
              <span style="background-color: #2b5cff; color: #fff; font-size: 14px; font-weight: bold; padding: 2px 8px; border-radius: 4px; margin-right: 10px;">${o}</span>
              <strong style="font-size: 18px; color: #2b5cff;">${t}</strong>
          </section>`}return`<section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;"><strong style="font-size: 18px; color: #2b5cff;">${e}</strong></section>`},h3:(e,n)=>{let o=n.split(" ")[0],t=e.replace(o,"").trim();return t||(o="💡",t=e),`<p style="font-size: 14px; color: #666; margin: 0 0 12px 0; display: flex; align-items: center;"><span style="display: inline-block; background: #eef2ff; color: #5c7cfa; padding: 2px 6px; border-radius: 4px; margin-right: 8px;">${o}</span> ${t}</p>`},h4:e=>`
        <section style="background-color: #fff8e6; border: 1px dashed #ffc107; padding: 12px 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 14px; color: #d97706;"><strong>${e}</strong></p>
        </section>`,blockquote:e=>`
      <section style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #2b5cff;">
          ${e.replace(/<p(.*?)>/g,'<p style="margin: 0 0 10px 0; font-size: 15px; color: #555;">')}
      </section>`,p:e=>`<p style="font-size: 15px; color: #333; margin-bottom: 15px; line-height: 1.8;">${e}</p>`,code:e=>`
      <section style="background-color: #252526; border-radius: 8px; margin: 20px 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #1E1E1E; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #ce9178; font-size: 14px; font-family: ui-monospace, Consolas, monospace; overflow-x: auto; line-height: 1.8;">
          <span style="color: #6a9955; font-size: 12px; margin-bottom: 8px; display: block;">// 💬 Code / Prompt：</span>
          ${e.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")}
        </div>
      </section>`,strong:e=>`<strong style="color: #2b5cff; font-weight: bold;">${e}</strong>`},minimal:{wrapperStyle:"max-width: 600px; margin: 0 auto; font-family: -apple-system, system-ui, 'Helvetica Neue', sans-serif; color: #111; line-height: 1.6; letter-spacing: -0.2px; padding: 20px; box-sizing: border-box; background: #fff;",h1:e=>`
        <h1 style="font-size: 32px; color: #000; font-weight: 800; line-height: 1.2; margin: 40px 0 20px 0; letter-spacing: -1px;">${e}</h1>`,h2:(e,n)=>`<h2 style="font-size: 20px; color: #000; font-weight: 700; margin: 48px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #000;">${n.match(/^([\d]+)[ \.]*(.*)$/)?e.replace(/^([\d]+)[ \.]*/,"$1. "):e}</h2>`,h3:e=>`<h3 style="font-size: 14px; color: #86868b; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin: 32px 0 12px 0;">${e}</h3>`,h4:e=>`
        <section style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; background: #fafbfc; margin: 24px 0;">
            <p style="margin: 0; font-size: 15px; color: #111; font-weight: 500;">${e}</p>
        </section>`,blockquote:e=>`
      <section style="margin: 24px 0; border-left: 3px solid #000; padding-left: 16px;">
          ${e.replace(/<p(.*?)>/g,'<p style="margin: 0 0 12px 0; font-size: 17px; color: #555; font-style: italic;">')}
      </section>`,p:e=>`<p style="font-size: 16px; color: #333; margin-bottom: 20px; line-height: 1.7;">${e}</p>`,code:e=>`
      <section style="background-color: #f5f5f7; border-radius: 8px; margin: 24px 0; overflow: hidden; border: 1px solid #e5e5e5;">
        <div style="background-color: #e8e8ed; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #1d1d1f; font-size: 14px; font-family: ui-monospace, SFMono-Regular, monospace; overflow-x: auto;">
          ${e.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")}
        </div>
      </section>`,strong:e=>`<strong style="color: #000; font-weight: 700; background: #f5f5f7; padding: 2px 4px; border-radius: 4px;">${e}</strong>`},emotion:{wrapperStyle:"max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; color: #4a4a4a; line-height: 2; letter-spacing: 1px; padding: 20px; box-sizing: border-box; background-color: #fff;",h1:e=>`
        <section style="margin: 30px 0 40px; text-align: center;">
            <h1 style="font-size: 22px; color: #ff5e7e; font-weight: normal; line-height: 1.6; margin-bottom: 15px; border-bottom: 1px solid #ffe3e8; padding-bottom: 15px;">${e}</h1>
            <p style="font-size: 13px; color: #ffb3c6; margin: 0; letter-spacing: 2px;">「 陪你度过漫长岁月 」</p>
        </section>`,h2:(e,n)=>`<div style="text-align: center; margin: 45px 0 25px;"><h2 style="display: inline-block; background: linear-gradient(to right, #fff0f3, #fff); padding: 6px 20px; border-radius: 30px; color: #ff5e7e; font-size: 17px; font-weight: bold; margin: 0;">${n.match(/^([\d]+)[ \.]*(.*)$/)?e.replace(/^([\d]+)[ \.]*/,""):e}</h2></div>`,h3:e=>`<h3 style="font-size: 15px; color: #ff8fa3; font-weight: bold; border-left: 3px solid #ff8fa3; padding-left: 12px; margin: 30px 0 15px 0;">${e}</h3>`,h4:e=>`
        <section style="background-color: #fff0f3; color: #d6336c; padding: 20px; border-radius: 12px; font-size: 14px; line-height: 1.8; text-align: center; margin: 25px 0;">
            <p style="margin: 0; font-weight: 500; letter-spacing: 1.5px;">暖心寄语：${e}</p>
        </section>`,blockquote:e=>`
      <section style="background-color: #fdf2f4; border-left: 4px solid #ffb3c6; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
          ${e.replace(/<p(.*?)>/g,'<p style="margin: 0 0 8px 0; font-size: 15px; color: #855b64; font-style: italic; line-height: 1.8;">')}
      </section>`,p:e=>`<p style="font-size: 16px; color: #555; margin-bottom: 22px; text-align: justify; line-height: 2; letter-spacing: 1px;">${e}</p>`,code:e=>`
      <section style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; margin: 25px 0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <div style="background-color: #f1f3f5; padding: 10px 15px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #e9ecef;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFb3c6;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFdf65;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #92e6a7;"></span>
        </div>
        <div style="padding: 15px 20px; color: #495057; font-size: 14px; line-height: 1.8; overflow-x: auto;">
          <span style="display: block; color: #adb5bd; font-size: 12px; margin-bottom: 8px;">对话 / 留言：</span>
          ${e.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")}
        </div>
      </section>`,strong:e=>`<strong style="color: #e03131; font-weight: bold; text-decoration: underline; text-decoration-color: #ffb3c6; text-decoration-thickness: 2px; text-underline-offset: 4px;">${e}</strong>`},indigo:{wrapperStyle:"max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.75; letter-spacing: 0.5px; padding: 15px; box-sizing: border-box; background-color: #fff;",h1:e=>`
        <section style="margin-bottom: 30px; text-align: center;">
            <h1 style="font-size: 24px; color: #1a1a1a; font-weight: bold; line-height: 1.5; margin-bottom: 12px;">${e}</h1>
        </section>`,h2:e=>`<h2 style="font-size: 18px; color: #2A3F82; font-weight: bold; margin: 35px 0 15px;">${e}</h2>`,h3:e=>`<h3 style="font-size: 16px; color: #2A3F82; font-weight: bold; margin: 25px 0 12px 0;">${e}</h3>`,h4:e=>`
        <section style="background-color: #F7EEF6; padding: 18px 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0; font-size: 15px; color: #4A3A4A; line-height: 1.7; display: flex; align-items: flex-start; gap: 8px;">
                <span style="color: #E24C4B;">💡</span><span>${e}</span>
            </p>
        </section>`,blockquote:e=>`
      <section style="background-color: #F4F4F9; border-left: 4px solid #2A3F82; padding: 18px 20px; margin: 20px 0;">
          ${e.replace(/<p(.*?)>/g,'<p style="margin: 0 0 10px 0; font-size: 15px; color: #3A3A3A; line-height: 1.7; text-align: justify;">')}
      </section>`,p:e=>`<p style="font-size: 15px; color: #444; margin-bottom: 20px; line-height: 1.8; text-align: justify; word-wrap: break-word;">${e}</p>`,code:e=>`
      <section style="background-color: #2D2D2D; border-radius: 6px; margin: 20px 0; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #1E1E1E; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #E3E3E3; font-size: 14px; font-family: Consolas, monospace; overflow-x: auto; line-height: 1.6;">
          ${e.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")}
        </div>
      </section>`,strong:e=>`<strong style="font-weight: bold; color: #2A3F82;">${e}</strong>`,table:(e,n)=>`
      <section style="overflow-x: auto; margin: 25px 0;">
        <table style="border-collapse: collapse; width: 100%; font-size: 14px; min-width: 400px; text-align: left; margin: 0; border: 1px solid #EAEAEA;">
          <thead style="background-color: #2A3F82; color: #fff;">
            <tr>${e}</tr>
          </thead>
          <tbody>${n}</tbody>
        </table>
      </section>`,tablecell:(e,n,i)=>{const o=i?`text-align: ${i};`:"";return n?`<th style="padding: 12px 15px; font-weight: normal; ${o} border: 1px solid #2A3F82;">${e}</th>`:`<td style="padding: 12px 15px; ${o} border: 1px solid #EAEAEA; color: #444;">${e}</td>`}},geek:{wrapperStyle:"max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.8; letter-spacing: 0.5px; padding: 20px; box-sizing: border-box; background-color: #fff;",h1:e=>`
        <h1 style="font-size: 26px; color: #111; font-weight: 900; line-height: 1.4; margin: 30px 0 20px;">${e}</h1>`,h2:(e,n)=>`<h2 style="font-size: 22px; color: #111; font-weight: 900; margin: 50px 0 25px; line-height: 1.5; letter-spacing: 1px;">${n.match(/^([\d]+)[ \.]*(.*)$/)?e.replace(/^([\d]+)[ \.]*/,"$1. "):e}</h2>`,h3:e=>`<h3 style="font-size: 16px; font-weight: bold; color: #D97706; margin: 35px 0 15px; line-height: 1.6;">${e}</h3>`,h4:e=>`<h4 style="font-size: 15px; font-weight: bold; color: #111; margin: 25px 0 15px;">${e}</h4>`,blockquote:e=>`
      <section style="background-color: #FFF9F0; border-radius: 8px; padding: 20px; margin: 25px 0;">
          ${e.replace(/<p(.*?)>/g,'<p style="margin: 0 0 10px 0; font-size: 15px; color: #4A4A4A; line-height: 1.8;">')}
      </section>`,p:e=>`<p style="font-size: 15px; color: #333; margin-bottom: 20px; line-height: 1.8; text-align: justify; word-wrap: break-word;">${e}</p>`,code:e=>`
      <section style="background-color: #1E1E1E; border-radius: 8px; margin: 25px 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background-color: #2D2D2D; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #A6ACCD; font-size: 14px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; overflow-x: auto; line-height: 1.6;">
          ${e.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")}
        </div>
      </section>`,codespan:e=>`<code style="background-color: #F3F4F6; padding: 3px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 14px; color: #4B5563; margin: 0 2px;">${e}</code>`,strong:e=>`<strong style="font-weight: 900; color: #111;">${e}</strong>`}};function I(e){const n=g[e]||g.tech,i=new m.Renderer;return i.heading=function(o){const t=this.parser.parseInline(o.tokens),l=o.depth,a=o.text;return l===1?n.h1(t):l===2?n.h2(t,a):l===3?n.h3(t,a):l===4?n.h4(t):`<h${l} style="margin-top:20px; font-weight:bold; color:#333;">${t}</h${l}>`},i.blockquote=function(o){const t=this.parser.parse(o.tokens);return n.blockquote(t)},i.paragraph=function(o){const t=this.parser.parseInline(o.tokens);return n.p(t)},i.code=function(o){return n.code(o.text)},i.codespan=function(o){const t=o.text;return n.codespan?n.codespan(t):`<code style="background-color: #f1f3f5; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.9em; color: #e83e8c;">${t}</code>`},i.strong=function(o){const t=this.parser.parseInline(o.tokens);return n.strong(t)},i.listitem=function(o){let t="";return o.tokens&&(t=this.parser.parse(o.tokens),t=t.replace(/<p[^>]*>/g,'<span style="display:block; margin-bottom: 4px;">').replace(/<\/p>/g,"</span>")),`<li style="margin-bottom: 8px; line-height: 1.6; color: inherit; font-size: 15px;">${t}</li>`},i.list=function(o){let t="";for(const a of o.items)t+=i.listitem.call(this,a);const l=o.ordered?"ol":"ul";return`<${l} style="padding-left: 24px; color: inherit; margin-bottom: 20px; font-size: 15px;">${t}</${l}>`},i.table=function(o){let t="";for(const a of o.header)t+=this.tablecell(a);let l="";for(const a of o.rows){let s="";for(const f of a)s+=this.tablecell(f);l+=this.tablerow({text:s})}return n.table?n.table(t,l):`<section style="overflow-x: auto; margin: 20px 0;">
      <table style="border-collapse: collapse; width: 100%; font-size: 14px; min-width: 400px; text-align: left;">
        <thead><tr style="background-color: #f8f9fa;">${t}</tr></thead>
        <tbody>${l}</tbody>
      </table>
    </section>`},i.tablerow=function(o){return`<tr>${o.text}</tr>`},i.tablecell=function(o){const t=this.parser.parseInline(o.tokens),l=o.header,a=o.align;if(n.tablecell)return n.tablecell(t,l,a);const s=a?`text-align: ${a};`:"";return l?`<th style="padding: 10px; border: 1px solid #ddd; ${s} font-weight: bold; color: #333;">${t}</th>`:`<td style="padding: 10px; border: 1px solid #ddd; ${s} color: #555;">${t}</td>`},i}function T(e,n="tech"){var s;if(!e||!e.trim())return"";const i=I(n),t=`<section style="${((s=g[n])==null?void 0:s.wrapperStyle)||g.tech.wrapperStyle}">`,l="</section>",a=m.parse(e,{renderer:i,breaks:!0,gfm:!0});return t+a+l}const V={class:"wechat-container"},N={class:"editor-panel"},q={class:"actions"},U={class:"theme-selector"},j={class:"preview-panel"},K={class:"phone-shell"},L=["innerHTML"],P=$({__name:"index",setup(e){const n=b("tech"),i=b(`# 🚀 全新一代公众号排版引擎（测试文档）
<span style="color: #888; font-size: 14px;">（请在右上角下拉框自由切换 4 种预设主题体验区别！）</span>

> 欢迎使用纯本地化构建的 Markdown 公众号渲染器！
> 无论是 **科技职场**、**极简干货**、**情感走心** 还是 **极客开发**，我们都能瞬间帮您拿捏气场。
> 下面我将为您展示目前渲染器支持的所有排版元素种类。

## 01 基础版式与文字强调

### 💡 多级标题支持

你不仅能用常规的加粗来 **强调文本**，还能利用不同的标题层级制造视觉冲击：

#### 这是一个四级标题，相当于强调卡片，通常用来做高亮总结与核心观点升华！

## 02 代码与极客元素支持

在现代技术博客中，行内代码 \`console.log('Hello World')\` 是必不可少的。而对于大段长串代码，这里有完美的适配保护：

\`\`\`javascript
// 💬 核心业务流保护样例：
function optimizeWorkflow() {
  const tools = ['GPT-4o', 'Claude 3.5', 'DeepSeek'];
  console.log('开启全自动极客模式！');
  return tools.map(tool => activate(tool));
}
\`\`\`

## 03 列表与数据表格展示

有时候你需要有条理地陈列信息，这是无序/有序列表嵌套排版的演示：

*   **准备工作阶段**
    *   下载并安装最新版本开发工具
    *   输入 \`chrome://inspect\` 打开配置
*   **落地执行步骤**
    1.  梳理自动化重构流程
    2.  坚决执行任务，定期复盘

当遇到对比数据时，表格是梳理逻辑的最佳解药（原生支持左、中、右列对齐定制）：

| 底层基础模型 | 逻辑推理能力 | 代码生成能力 | 核心适用场景定位 |
| :--- | :---: | :---: | :--- |
| **Claude 3.5** | 卓越（S 级） | ✨ 巅峰（SS 级） | 前后端组件全自动构建、老项目重构 |
| **GPT-4o** | 优秀（S 级） | 优秀（S 级） | 通用知识结构解答、多模态任务流处理 |
| **DeepSeek** | 强大（S 级） | 极为优秀（S 级）| 极高性价比的日常高频需求开发助手 |

---

<div style="text-align: center; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
  👇 你觉得今天加的哪个主题最好看？快去上方下拉框自由切换试试吧！
</div>`),{showKeyModal:o,formatTextWithAI:t,saveApiKey:l}=D(),a=b(null),s=F(()=>T(i.value,n.value)),f=async c=>{l(c);const r=await t(i.value,"optimize","wechat");r&&(i.value=r)},y=async()=>{if(a.value)try{const c=a.value.innerHTML;if(navigator.clipboard&&window.ClipboardItem){const w=new Blob([c],{type:"text/html"}),k=new Blob([a.value.innerText],{type:"text/plain"}),v=[new ClipboardItem({"text/html":w,"text/plain":k})];await navigator.clipboard.write(v),h.success("复制成功！快去公众号后台 Ctrl+V 粘贴吧~");return}const r=document.createElement("div");r.innerHTML=c,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r);const d=document.createRange();d.selectNodeContents(r);const x=window.getSelection();x&&(x.removeAllRanges(),x.addRange(d),document.execCommand("copy"),x.removeAllRanges(),h.success("复制成功！快去公众号后台 Ctrl+V 粘贴吧~")),document.body.removeChild(r)}catch(c){console.error("复制失败:",c),h.error("复制失败，请尝试手动全选右侧预览区域进行复制。")}};return(c,r)=>(M(),z("div",V,[p("div",N,[r[4]||(r[4]=p("h2",null,"✍️ 公众号长文排版",-1)),r[5]||(r[5]=p("div",{class:"subtitle"},"在这里编写 Markdown，右侧实时预览公众号最终效果",-1)),u(B,{style:{flex:"1"},modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=d=>i.value=d),"hide-ai":""},null,8,["modelValue"]),p("div",q,[p("div",U,[S(p("select",{"onUpdate:modelValue":r[1]||(r[1]=d=>n.value=d)},[...r[3]||(r[3]=[E('<option value="tech" data-v-98bd6031>💎 科技职场风格</option><option value="minimal" data-v-98bd6031>🍏 苹果极简风格</option><option value="emotion" data-v-98bd6031>💌 情感走心风格</option><option value="indigo" data-v-98bd6031>📘 深度技术风格</option><option value="geek" data-v-98bd6031>💻 极客开发风格</option>',5)])],512),[[A,n.value]])]),p("button",{class:"action-btn primary",onClick:y},"🔗 一键复制排版去公众号粘贴")])]),p("div",j,[p("div",K,[p("div",{class:"phone-content",ref_key:"previewRef",ref:a,innerHTML:s.value},null,8,L)])]),u(_,{modelValue:H(o),"onUpdate:modelValue":r[2]||(r[2]=d=>C(o)?o.value=d:null),onSave:f},null,8,["modelValue"])]))}}),O=R(P,[["__scopeId","data-v-98bd6031"]]);export{O as default};
