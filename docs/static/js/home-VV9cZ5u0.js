import{r as f,c as x,l as w,y as n,z as y,A as T,v as C}from"./@vue-DIrYLlok.js";import{g as R}from"./marked-BrAPT9WN.js";import{t as $}from"./html-to-image-Br7REqB6.js";const M=(v,o)=>{const i=v.__vccOpts||v;for(const[d,c]of o)i[d]=c;return i},S={class:"container-home"},H={class:"editor-panel"},B={class:"form-group"},V={class:"toolbar"},q={class:"preview-panel"},E={class:"cover-content"},I=["innerHTML"],L={__name:"home",setup(v){const o=f(`# 🌟 2026 前端大咖学习路线

🔥 掌握这些核心技术，成为高薪抢手人才！

## ✨ 核心大纲
1. **Vue 3 & React** 前端双引擎全解析
2. **TypeScript** 必备类型系统与规范
3. **工程化环境** 从零配置 Vite / Webpack
4. **性能监控** 首屏秒开的终极秘密

> "种一棵树最好的时间是十年前，其次是现在。不要犹豫，现在就开始行动！"

---
👉 **划到下一页看详细学习计划！**
每天进步一点点，记得点赞收藏，防走丢哦~ ❤️`),i=f(null),d=f(null),c=x(()=>R.parse(o.value)),a=u=>{const t=d.value;if(!t)return;const e=t.selectionStart,p=t.selectionEnd,b=o.value.substring(e,p);let l="",r="",s="";switch(u){case"bold":l="**",r="**",s="加粗文字";break;case"italic":l="*",r="*",s="斜体文字";break;case"h1":l="# ",r="",s="一级标题",e>0&&o.value[e-1]!==`
`&&(l=`
# `);break;case"h2":l="## ",r="",s="二级标题",e>0&&o.value[e-1]!==`
`&&(l=`
## `);break;case"quote":l="> ",r="",s="引用文字",e>0&&o.value[e-1]!==`
`&&(l=`
> `);break;case"ul":l="- ",r="",s="列表项",e>0&&o.value[e-1]!==`
`&&(l=`
- `);break;case"ol":l="1. ",r="",s="列表项",e>0&&o.value[e-1]!==`
`&&(l=`
1. `);break;case"hr":l=`
---
`,r="",s="";break}const m=b||s,g=o.value.substring(0,e)+l+m+r+o.value.substring(p);o.value=g,setTimeout(()=>{t.focus(),b?t.setSelectionRange(e+l.length,e+l.length+b.length):s?t.setSelectionRange(e+l.length,e+l.length+s.length):t.setSelectionRange(e+l.length,e+l.length)},0)},k=async()=>{if(i.value)try{const u=await $(i.value,{quality:1,pixelRatio:3,style:{transform:"scale(1)",transformOrigin:"top left"}}),t=document.createElement("a");t.download=`xhs-cover-${Date.now()}.png`,t.href=u,t.click()}catch(u){console.error("导出失败:",u),alert("导出图片失败，请检查控制台")}};return(u,t)=>(C(),w("div",S,[n("div",H,[t[13]||(t[13]=n("h2",null,"✨ 小红书封面生成器",-1)),n("div",B,[t[12]||(t[12]=n("label",null,"Markdown 内容",-1)),n("div",V,[n("button",{class:"tool-btn font-bold",onClick:t[0]||(t[0]=e=>a("bold")),title:"加粗"},"B"),n("button",{class:"tool-btn font-italic",onClick:t[1]||(t[1]=e=>a("italic")),title:"斜体"},"I"),t[9]||(t[9]=n("div",{class:"divider"},null,-1)),n("button",{class:"tool-btn",onClick:t[2]||(t[2]=e=>a("h1")),title:"大标题"},"H1"),n("button",{class:"tool-btn",onClick:t[3]||(t[3]=e=>a("h2")),title:"小标题"},"H2"),t[10]||(t[10]=n("div",{class:"divider"},null,-1)),n("button",{class:"tool-btn",onClick:t[4]||(t[4]=e=>a("quote")),title:"金句引用"},"”"),n("button",{class:"tool-btn text-xl",onClick:t[5]||(t[5]=e=>a("ul")),title:"无序列表"},"•"),n("button",{class:"tool-btn",onClick:t[6]||(t[6]=e=>a("ol")),title:"有序列表"},"1."),t[11]||(t[11]=n("div",{class:"divider"},null,-1)),n("button",{class:"tool-btn",onClick:t[7]||(t[7]=e=>a("hr")),title:"分割线"},"—")]),y(n("textarea",{ref_key:"textareaRef",ref:d,"onUpdate:modelValue":t[8]||(t[8]=e=>o.value=e),placeholder:"输入 Markdown 内容..."},null,512),[[T,o.value]])]),n("button",{class:"export-btn",onClick:k},"💾 导出超清封面图"),t[14]||(t[14]=n("div",{class:"tips"},"💡 提示：选中文字后点击上方工具栏，可以快速添加加粗、标题等排版样式！",-1))]),n("div",q,[n("div",{class:"cover-wrapper",ref_key:"coverRef",ref:i},[n("div",E,[n("div",{class:"markdown-body",innerHTML:c.value},null,8,I)])],512)])]))}},U=M(L,[["__scopeId","data-v-34463341"]]);export{U as default};
