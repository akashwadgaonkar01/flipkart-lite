import{u as d,b as B,d as R,c as $}from"./ThemeProvider-ba5d72ab.js";import{r as w,j}from"./index-3a18405f.js";const c=w.forwardRef(({bsPrefix:n,className:i,as:l="div",...t},f)=>{const a=d(n,"row"),p=B(),u=R(),m=`${a}-cols`,r=[];return p.forEach(s=>{const o=t[s];delete t[s];let e;o!=null&&typeof o=="object"?{cols:e}=o:e=o;const x=s!==u?`-${s}`:"";e!=null&&r.push(`${m}${x}-${e}`)}),j.jsx(l,{ref:f,...t,className:$(i,a,...r)})});c.displayName="Row";const h=c;export{h as R};
