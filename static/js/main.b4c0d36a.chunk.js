(this.webpackJsonptimelog=this.webpackJsonptimelog||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(1),r=n.n(a),s=n(6),i=n.n(s),o=(n(14),n(8)),d=n(4),u=n(7);n(15);function l(t){var e=Math.floor(t/3600);return{hours:e,minutes:Math.floor((t-3600*e)/60)}}function j(t,e){var n=(t-e)/1e3,c=l(n);return{hours:c.hours,minutes:c.minutes,deltaSeconds:n,start:e,end:t}}function h(t){var e=t.getHours(),n="".concat(t.getMinutes()<10?"0":"").concat(t.getMinutes());return"".concat(e,":").concat(n)}function b(t){return Object(c.jsx)("table",{children:Object(c.jsx)("tbody",{children:t.map((function(t){var e=t.name,n=t.duration;return Object(c.jsxs)("tr",{className:"tr-logs",children:[Object(c.jsx)("td",{className:"td-duration",children:"".concat(n.hours,"h ").concat(n.minutes<10?"0":"").concat(n.minutes,"min")}),Object(c.jsx)("td",{className:"td-interval",children:"".concat(h(n.start)," - ").concat(h(n.end))}),e.endsWith("**")?Object(c.jsx)("td",{className:"td-name-ignore",children:e}):Object(c.jsx)("td",{className:"td-name",children:e})]},e)}))})})}function m(t){if(!(t.length<1)){var e,n=0,a=Object(u.a)(t);try{for(a.s();!(e=a.n()).done;){var r=e.value;r.name.endsWith("**")||(n+=r.duration.deltaSeconds)}}catch(h){a.e(h)}finally{a.f()}var s=l(n),i=s.hours,o=s.minutes,d=i<8?8-i-1:0,j=i<8?60-o:0;return 7===d&60===j&&(d=8,j=0),Object(c.jsx)("table",{children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{className:"tr-work",children:[Object(c.jsx)("td",{className:"td-name",children:"Work Done:"}),Object(c.jsx)("td",{className:"td-duration",children:"".concat(i,"h ").concat(o<10?"0":"").concat(o,"min")})]}),Object(c.jsxs)("tr",{className:"tr-work",children:[Object(c.jsx)("td",{className:"td-name",children:"Time Left:"}),Object(c.jsx)("td",{className:"td-duration",children:"".concat(d,"h ").concat(j<10?"0":"").concat(j,"min")})]})]})})}}var O=function(){var t=Object(a.useState)("arrived **"),e=Object(d.a)(t,2),n=e[0],r=e[1],s=Object(a.useState)(new Date),i=Object(d.a)(s,2),u=i[0],l=i[1],h=Object(a.useState)(new Date),O=Object(d.a)(h,2),f=O[0],v=O[1],x=Object(a.useState)([]),g=Object(d.a)(x,2),N=g[0],p=g[1];Object(a.useEffect)((function(){var t=setInterval((function(){v(new Date)}),6e4);return function(){return clearInterval(t)}}),[]);var w=function(t,e,n){var c={name:t,duration:j(n,e)};p([].concat(Object(o.a)(N),[c])),r(""),l(n),v(new Date)};return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("header",{className:"App-header",children:[Object(c.jsx)("div",{children:m(N)}),Object(c.jsxs)("div",{className:"Insert-task",children:[function(t,e){var n=j(e,t),a=n.hours,r=n.minutes;return Object(c.jsx)(c.Fragment,{children:"".concat(a,"h ").concat(r<10?"0":"").concat(r,"m")})}(u,f),Object(c.jsx)("input",{className:"input-task",value:n,onChange:function(t){return r(t.target.value)}}),Object(c.jsx)("button",{onClick:function(){if("arrived **"===n){var t=new Date;w(n,t,t)}else if(n.length>0){var e=new Date;w(n,u,e)}},children:"Add"})]}),Object(c.jsx)("div",{children:b(N)})]})})},f=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,r=e.getLCP,s=e.getTTFB;n(t),c(t),a(t),r(t),s(t)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(O,{})}),document.getElementById("root")),f()}},[[16,1,2]]]);
//# sourceMappingURL=main.b4c0d36a.chunk.js.map