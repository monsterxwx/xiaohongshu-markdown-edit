import{r as c,c as y,l as w,y as l,z as T,A as C,B as R,v as $}from"./@vue-CNa4m0Gp.js";import{g as S}from"./marked-BrAPT9WN.js";import{t as M}from"./html-to-image-Br7REqB6.js";const B=(f,o)=>{const u=f.__vccOpts||f;for(const[v,i]of o)u[v]=i;return u},H={class:"container-home"},E={class:"editor-panel"},V={class:"form-group"},h={class:"toolbar"},q=["disabled"],D={class:"preview-panel"},I={class:"cover-content"},L=["innerHTML"],O={__name:"home",setup(f){const o=c(`# 🌟 2026 前端大咖学习路线

🔥 掌握这些核心技术，成为高薪抢手人才！

## ✨ 核心大纲
1. **Vue 3 & React** 前端双引擎全解析
2. **TypeScript** 必备类型系统与规范
3. **工程化环境** 从零配置 Vite / Webpack
4. **性能监控** 首屏秒开的终极秘密

> "种一棵树最好的时间是十年前，其次是现在。不要犹豫，现在就开始行动！"

---
👉 **划到下一页看详细学习计划！**
每天进步一点点，记得点赞收藏，防走丢哦~ ❤️`),u=c(null),v=c(null),i=c(!1),k=y(()=>S.parse(o.value)),r=d=>{const t=v.value;if(!t)return;const e=t.selectionStart,p=t.selectionEnd,b=o.value.substring(e,p);let n="",a="",s="";switch(d){case"bold":n="**",a="**",s="加粗文字";break;case"italic":n="*",a="*",s="斜体文字";break;case"h1":n="# ",a="",s="一级标题",e>0&&o.value[e-1]!==`
`&&(n=`
# `);break;case"h2":n="## ",a="",s="二级标题",e>0&&o.value[e-1]!==`
`&&(n=`
## `);break;case"quote":n="> ",a="",s="引用文字",e>0&&o.value[e-1]!==`
`&&(n=`
> `);break;case"ul":n="- ",a="",s="列表项",e>0&&o.value[e-1]!==`
`&&(n=`
- `);break;case"ol":n="1. ",a="",s="列表项",e>0&&o.value[e-1]!==`
`&&(n=`
1. `);break;case"hr":n=`
---
`,a="",s="";break}const m=b||s,x=o.value.substring(0,e)+n+m+a+o.value.substring(p);o.value=x,setTimeout(()=>{t.focus(),b?t.setSelectionRange(e+n.length,e+n.length+b.length):s?t.setSelectionRange(e+n.length,e+n.length+s.length):t.setSelectionRange(e+n.length,e+n.length)},0)},g=async()=>{if(!(!u.value||i.value)){i.value=!0;try{const d=await M(u.value,{quality:1,pixelRatio:3,style:{transform:"scale(1)",transformOrigin:"top left"}}),t=document.createElement("a");t.download=`xhs-cover-${Date.now()}.png`,t.href=d,t.click()}catch(d){console.error("导出失败:",d),alert("导出图片失败，请检查控制台")}finally{i.value=!1}}};return(d,t)=>($(),w("div",H,[l("div",E,[t[13]||(t[13]=l("h2",null,"✨ 小红书封面生成器",-1)),l("div",V,[t[12]||(t[12]=l("label",null,"Markdown 内容",-1)),l("div",h,[l("button",{class:"tool-btn font-bold",onClick:t[0]||(t[0]=e=>r("bold")),title:"加粗"},"B"),l("button",{class:"tool-btn font-italic",onClick:t[1]||(t[1]=e=>r("italic")),title:"斜体"},"I"),t[9]||(t[9]=l("div",{class:"divider"},null,-1)),l("button",{class:"tool-btn",onClick:t[2]||(t[2]=e=>r("h1")),title:"大标题"},"H1"),l("button",{class:"tool-btn",onClick:t[3]||(t[3]=e=>r("h2")),title:"小标题"},"H2"),t[10]||(t[10]=l("div",{class:"divider"},null,-1)),l("button",{class:"tool-btn",onClick:t[4]||(t[4]=e=>r("quote")),title:"金句引用"},"”"),l("button",{class:"tool-btn text-xl",onClick:t[5]||(t[5]=e=>r("ul")),title:"无序列表"},"•"),l("button",{class:"tool-btn",onClick:t[6]||(t[6]=e=>r("ol")),title:"有序列表"},"1."),t[11]||(t[11]=l("div",{class:"divider"},null,-1)),l("button",{class:"tool-btn",onClick:t[7]||(t[7]=e=>r("hr")),title:"分割线"},"—")]),T(l("textarea",{ref_key:"textareaRef",ref:v,"onUpdate:modelValue":t[8]||(t[8]=e=>o.value=e),placeholder:"输入 Markdown 内容..."},null,512),[[C,o.value]])]),l("button",{class:"export-btn",disabled:i.value,onClick:g},R(i.value?"⏳ 正在导出，请稍候...":"💾 导出超清封面图"),9,q),t[14]||(t[14]=l("div",{class:"tips"},"💡 提示：选中文字后点击上方工具栏，可以快速添加加粗、标题等排版样式！",-1))]),l("div",D,[l("div",{class:"cover-wrapper",ref_key:"coverRef",ref:u},[l("div",I,[l("div",{class:"markdown-body",innerHTML:k.value},null,8,L)])],512)])]))}},A=B(O,[["__scopeId","data-v-64c2d1f8"]]);export{A as default};
