!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(){const e=document.querySelector("#content"),t=document.querySelector(".selected");null!=t&&t.classList.toggle("selected"),e.children.length>0&&e.lastChild.remove()};var a=function(){const e=document.querySelector("#content"),t=document.createElement("div"),n=document.createElement("h3"),o=document.createElement("p");t.classList.add("info"),n.textContent="Visit us.",o.textContent="Enjoy a great meal in a pleasant environment, be it day or evening.",t.appendChild(n),t.appendChild(o),e.appendChild(t)};var d=function(){const e=document.querySelector("#content"),t=document.createElement("div"),n=document.createElement("h3"),o=document.createElement("p");t.classList.add("info"),n.textContent="More than 30 years of tradition.",o.textContent="The Restaurant offers a diverse selection of dishes, including meat, pasta, fish and seafood, salads and vegetarian options. Enjoy the best homemade food in the business!",t.appendChild(n),t.appendChild(o),e.appendChild(t)};var c=function(){const e=document.querySelector("#content"),t=document.createElement("div"),n=document.createElement("h3"),o=document.createElement("div");for(let e=0;e<3;e++){const t=document.createElement("div"),n=document.createElement("img"),a=document.createElement("h3"),d=document.createElement("p");0==e?(n.src="./icons/message-outline.png",a.textContent="Chat",d.textContent="223-456-7890"):1==e?(n.src="./icons/phone-outline.png",a.textContent="Phone",d.textContent="234-567-8900"):2==e&&(n.src="./icons/email-outline.png",a.textContent="Email",d.textContent="therestaurant@email.com"),t.appendChild(n),t.appendChild(a),t.appendChild(d),o.appendChild(t)}t.classList.add("contact-info"),o.classList.add("container"),n.textContent="Contact us.",t.appendChild(n),t.appendChild(o),e.appendChild(t)};function i(e){switch(o(),e.target.classList.toggle("selected"),e.target.id){case"tab-1":a();break;case"tab-2":d();break;case"tab-3":c()}}(function(){const e=document.createElement("nav"),t=document.createElement("li"),n=document.createElement("h1"),o=document.createElement("ul"),a=document.createElement("li"),d=document.createElement("p"),c=document.createElement("li"),i=document.createElement("p"),r=document.createElement("li"),l=document.createElement("p");n.textContent="The Restaurant",d.textContent="Home",i.textContent="About",l.textContent="Contact",d.classList.add("tab"),i.classList.add("tab"),l.classList.add("tab"),n.id="title",d.id="tab-1",i.id="tab-2",l.id="tab-3",t.appendChild(n),a.appendChild(d),c.appendChild(i),r.appendChild(l),o.appendChild(t),o.appendChild(a),o.appendChild(c),o.appendChild(r),e.appendChild(o),document.body.appendChild(e),document.body.insertBefore(e,document.body.firstChild)})(),document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",i)}),a()}]);