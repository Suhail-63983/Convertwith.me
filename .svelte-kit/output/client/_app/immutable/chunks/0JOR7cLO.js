const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./l2562rkP.js","./D6-XlEtG.js"])))=>i.map(i=>d[i]);
import{_ as h}from"./Ct5FWWRu.js";const y={libraryName:"mammoth",async init(){},async convert(e,o,a){if(o!=="docx"||a!=="html")throw new Error(`Mammoth converter only supports docx-to-html, got ${o}-to-${a}`);const n=await h(()=>import("./l2562rkP.js").then(i=>i.i),__vite__mapDeps([0,1]),import.meta.url),m=await e.arrayBuffer(),t=await n.convertToHtml({arrayBuffer:m});t.messages&&t.messages.length>0&&console.warn("Mammoth warnings:",t.messages);const l=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Converted Document</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
img { max-width: 100%; height: auto; }
table { border-collapse: collapse; width: 100%; }
td, th { border: 1px solid #ddd; padding: 8px; }
</style>
</head>
<body>
${t.value}
</body>
</html>`,s=new Blob([l],{type:"text/html"}),r=`${e.name.replace(/\.[^.]+$/,"")}.html`;return{blob:s,filename:r}}};export{y as mammothConverter};
