(this.webpackJsonpnotes_frontend=this.webpackJsonpnotes_frontend||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(14),r=n.n(a),o=n(0),c=n.n(o),u=n(4),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return c.a.createElement("li",{className:"note"},e.content,c.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},E=function(){return c.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},c.a.createElement("br",null),c.a.createElement("em",null,"Note application, Department of Computer Science, University of Helsinki 2020"))},b=function(t){var e=t.message;return null===e?null:c.a.createElement("div",{className:"error"},e)},v=function(){var t=Object(o.useState)([]),e=Object(i.a)(t,2),n=e[0],a=e[1],r=Object(o.useState)(""),m=Object(i.a)(r,2),f=m[0],v=m[1],g=Object(o.useState)(!0),h=Object(i.a)(g,2),O=h[0],j=h[1],S=Object(o.useState)(null),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(o.useEffect)((function(){s().then((function(t){a(t)}))}),[]);var N=O?n:n.filter((function(t){return!0===t.important}));return c.a.createElement("div",null,c.a.createElement("h1",null,"Notes"),c.a.createElement(b,{message:y}),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),c.a.createElement("ul",null,N.map((function(t,e){return c.a.createElement(l,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),r=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});d(t,r).then((function(e){a(n.map((function(n){return n.id!==t?n:e})))})).catch((function(r){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),a(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),c.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};p(e).then((function(t){a(n.concat(t)),v("")}))}},c.a.createElement("input",{value:f,onChange:function(t){console.log(t.target.value),v(t.target.value)}}),c.a.createElement("button",{type:"submit"},"save")),c.a.createElement(E,null))};n(37);r.a.render(c.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b15842ad.chunk.js.map