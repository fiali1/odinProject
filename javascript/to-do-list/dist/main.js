!function(e){var t={};function n(o){if(t[o])return t[o].exports;var d=t[o]={i:o,l:!1,exports:{}};return e[o].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(o,d,function(t){return e[t]}.bind(null,d));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=class{constructor(e,t,n,o){this._name=e,this._description=t,this._dueDate=n,this._priority=o}set name(e){this._name=e}set description(e){this._description=e}set dueDate(e){this._dueDate=e}set priority(e){this._priority=e}get name(){return this._name}get description(){return this._description}get dueDate(){return this._dueDate}get priority(){return this._priority}};var d=class{constructor(e){this._name=e,this._todos=[]}set name(e){this._name=e}set todos(e){this._todos=e}addTodo(e){this._todos.push(e)}removeTodo(e){const t=this._todos.indexOf(e);-1!=t&&this._todos.splice(t,1)}get name(){return this._name}get todos(){return this._todos}};function c(e){const t=JSON.stringify(e);localStorage.setItem("storage",t)}function a(){const e=JSON.parse(localStorage.getItem("storage"));if(null==e)return[];const t=[];return e.forEach(e=>{const n=new d(e._name);e._todos.forEach(e=>{const t=new o(e._name,e._description,e._dueDate,e._priority);n.addTodo(t)}),t.push(n)}),t}function i(){document.querySelector(".dark-div").remove()}function r(){const e=document.createElement("div");return e.classList.add("dark-div"),e}function l(e,t,n){const o=document.querySelector(".form-div"),d=document.querySelector(".submit-btn");if(1==e.target.checked){const e=document.createElement("div"),c=document.createElement("ul");e.classList.add("list-div"),0==t?n[0].todos.forEach(e=>{const t=document.createElement("li"),n=document.createElement("a");n.textContent=e.name,n.addEventListener("click",e=>{e.target.parentNode.toggleAttribute("selected")}),t.appendChild(n),c.appendChild(t)}):1==t&&n.forEach(e=>{if(e!=n[0]){const t=document.createElement("li"),n=document.createElement("a");n.textContent=e.name,n.addEventListener("click",e=>{e.target.parentNode.toggleAttribute("selected")}),t.appendChild(n),c.appendChild(t)}}),e.appendChild(c),o.insertBefore(e,d)}else{document.querySelector(".list-div").remove()}}function s(e,t){const n=r(),o=document.createElement("div"),d=document.createElement("h3"),c=document.createElement("label"),a=document.createElement("input"),s=document.createElement("label"),u=document.createElement("textarea"),m=document.createElement("label"),p=document.createElement("input"),h=document.createElement("label"),C=document.createElement("input"),E=document.createElement("div"),v=document.createElement("label"),b=document.createElement("input"),y=document.createElement("button"),g=document.createElement("button");o.classList.add("form-div","todo"),a.classList.add("form-todo-title"),u.classList.add("form-todo-description"),p.classList.add("form-todo-date"),C.classList.add("form-todo-priority"),y.classList.add("submit-btn"),g.classList.add("cancel-btn"),d.textContent=0==t?"Create Your New To Do":"Edit Your To Do",c.textContent="To Do Title",a.placeholder="Enter To Do Title",s.textContent="Description",u.placeholder="Enter A Short Description",u.setAttribute("rows","2"),m.textContent="Due Date",p.placeholder="Enter Due Date (dd/mm/yy)",h.textContent="Priority",C.placeholder="Set Priority (1 to 10)",E.classList.add("add-todo-div"),b.classList.add("form-check"),y.textContent="Submit",g.textContent="Cancel",y.addEventListener("click",()=>{f(a.value,u.value,p.value,C.value,e)}),g.addEventListener("click",()=>{i()}),o.appendChild(d),o.appendChild(c),o.appendChild(a),o.appendChild(s),o.appendChild(u),o.appendChild(m),o.appendChild(p),o.appendChild(h),o.appendChild(C),e.length>1&&(v.textContent="Attach To Do to some project?",b.type="checkbox",b.addEventListener("click",t=>{l(t,1,e)}),E.appendChild(v),E.appendChild(b),o.appendChild(E)),o.appendChild(y),o.appendChild(g),n.appendChild(o),document.body.appendChild(n)}function u(e,t){const n=r(),o=document.createElement("div"),d=document.createElement("h3"),c=document.createElement("label"),a=document.createElement("input"),s=document.createElement("div"),u=document.createElement("label"),m=document.createElement("input"),p=document.createElement("button"),h=document.createElement("button");o.classList.add("form-div","project"),a.classList.add("form-project-title"),s.classList.add("add-todo-div"),m.classList.add("form-check"),p.classList.add("submit-btn"),h.classList.add("cancel-btn"),d.textContent=0==t?"Create Your New Project":"Edit Your Project",c.textContent="Project Title",a.placeholder="Enter Project Title",p.textContent="Submit",h.textContent="Cancel",p.addEventListener("click",()=>{E(a.value,e)}),h.addEventListener("click",()=>{i()}),o.appendChild(d),o.appendChild(c),o.appendChild(a),0!=e[0].todos.length&&(u.textContent="Add some existing To Dos?",m.type="checkbox",m.addEventListener("click",t=>{l(t,0,e)}),s.appendChild(u),s.appendChild(m),o.appendChild(s)),o.appendChild(p),o.appendChild(h),n.appendChild(o),document.body.appendChild(n)}function m(){const e=document.querySelector(".display-todo");null!=e&&e.remove()}function p(e,t){const n=e.data;t.forEach(e=>{e.removeTodo(n)}),m(),c(t),y(t)}function h(e){const t=document.querySelector(".display-todo"),n=document.createElement("div"),o=document.createElement("button"),d=document.createElement("button"),c=document.createElement("button");o.classList.add("close-todo-btn"),d.classList.add("edit-todo-btn"),c.classList.add("delete-todo-btn"),o.textContent="Close",d.textContent="Edit",c.textContent="Delete",o.addEventListener("click",m),c.addEventListener("click",()=>p(t,e)),d.addEventListener("click",()=>function(e,t){s(t,1);const n=e.data,o=document.querySelector(".form-todo-title"),d=document.querySelector(".form-todo-description"),c=document.querySelector(".form-todo-date"),a=document.querySelector(".form-todo-priority"),i=document.querySelector(".submit-btn");o.value=n._name,d.value=n._description,c.value=n._dueDate,a.value=n._priority;const r=i.cloneNode();r.classList.add("submit-btn"),r.textContent="Submit",i.parentNode.replaceChild(r,i),r.addEventListener("click",()=>{const n=o.value,i=d.value,r=c.value,l=a.value;p(e,t),f(n,i,r,l,t)})}(t,e)),n.appendChild(o),n.appendChild(d),n.appendChild(c),t.appendChild(n)}function C(e,t){!function(e){const t=document.querySelector(".display");t.children.length>0&&m();const n="LI"==e.target.tagName?e.target.data:e.target.parentNode.data,o=document.createElement("div"),d=document.createElement("h1"),c=document.createElement("h3"),a=document.createElement("p"),i=document.createElement("p");o.classList.add("display-todo"),o.data=n,d.textContent=n.name,c.textContent="Description: "+n.description,a.textContent="Due Date: "+n.dueDate,i.textContent="Priority: "+n.priority,o.appendChild(d),o.appendChild(c),o.appendChild(a),o.appendChild(i),t.appendChild(o)}(e),h(t)}function E(e,t){const n=new d(e),o=document.querySelector(".form-check"),a=t[0].todos;if(null!=o&&1==o.checked){document.querySelectorAll("li[selected] a").forEach(e=>{for(let t=0;t<a.length;t++)a[t].name==e.textContent&&n.addTodo(a[t])})}t.push(n),c(t),i(),y(t)}function f(e,t,n,d,a){const r=new o(e,t,n,d),l=document.querySelector(".form-check");if(a[0].addTodo(r),null!=l&&1==l.checked){document.querySelectorAll("li[selected] a").forEach(e=>{for(let t=0;t<a.length;t++)a[t].name==e.textContent&&a[t].addTodo(r)})}c(a),i(),y(a)}function v(e,t){const n=e.data,o=t.indexOf(n),d=n.todos,a=document.querySelector(".display-todo");if(null!=a)for(let e=0;e<d.length;e++)d[e].name==a.firstChild.textContent&&m();-1!=o&&t.splice(o,1),c(t),y(t)}function b(e){const t=r(),n=document.createElement("div"),o=document.createElement("h3"),d=document.createElement("button"),a=document.createElement("button");n.classList.add("clear-warning"),o.textContent="Are you sure you want to delete all To Dos?",d.classList.add("yes-btn"),a.classList.add("no-btn"),d.textContent="Yes",a.textContent="No",d.addEventListener("click",()=>function(e){e.forEach(e=>{e._todos=[]}),c(e),m(),i(),y(e)}(e)),a.addEventListener("click",()=>i()),n.appendChild(o),n.appendChild(d),n.appendChild(a),t.appendChild(n),document.body.appendChild(t)}function y(e){const t=document.querySelector(".sidebar"),n=document.querySelector("#theme").getAttribute("theme");if(2==t.childNodes.length&&document.querySelector(".sidebar").lastChild.remove(),e.length<=1&&0==e[0].todos.length)return void function(){const e=document.querySelector(".sidebar"),t=document.createElement("div"),n=document.createElement("h3"),o=document.createElement("p");t.classList.add("empty-warning"),n.textContent="It appears you have no Projects or To Dos.",o.textContent="Start by creating either one with the '+' buttons!",t.appendChild(n),t.appendChild(o),e.appendChild(t)}();const o=document.createElement("div");o.classList.add("project-div");let d=0;e.forEach(t=>{if(0==e[0].todos.length&&0==d++)return;const c=document.createElement("div"),a=document.createElement("div"),i=document.createElement("h2");if(c.data=t,c.classList.add("project-item"),a.classList.add("project-item-data"),i.textContent=t.name,i.addEventListener("click",()=>function(e,t){if(0==e.data.todos.length)return e.toggleAttribute("empty"),void setTimeout(()=>{e.toggleAttribute("empty")},500);if(null!=e.getAttribute("show"))return e.toggleAttribute("show"),void e.lastChild.remove();e.toggleAttribute("show");const n=document.createElement("ul");e.data.todos.map(e=>{const o=document.createElement("li"),d=document.createElement("a");o.data=e,d.textContent=o.data.name,o.addEventListener("click",e=>C(e,t)),o.appendChild(d),n.appendChild(o)}),e.appendChild(n)}(c,e)),a.appendChild(i),0!=d){const t=document.createElement("img"),o=document.createElement("img");t.id="edit-icon",t.src=`./assets/icons/pencil-${n}.png`,o.id="delete-icon",o.src=`./assets/icons/delete-${n}.png`,t.addEventListener("click",()=>function(e,t){u(t,1);const n=e.data,o=document.querySelector(".form-project-title"),d=document.querySelector(".submit-btn");o.value=n._name;const c=d.cloneNode();c.classList.add("submit-btn"),c.textContent="Submit",d.parentNode.replaceChild(c,d),c.addEventListener("click",()=>{const n=o.value;v(e,t),E(n,t)})}(c,e)),o.addEventListener("click",()=>v(c,e)),a.appendChild(t),a.appendChild(o)}else{a.classList.add("all-todos");const t=document.createElement("img");t.id="clear-icon",t.src=`./assets/icons/close-${n}.png`,t.addEventListener("click",()=>b(e)),a.appendChild(t)}c.appendChild(a),o.appendChild(c),d++}),t.appendChild(o)}(function(){const e=function(){const e=new d("All To Dos");let t=a()==[]?[]:a();return 0==t.length&&t.push(e),t}();!function(e){const t=document.querySelector(".sidebar"),n=document.createElement("div"),o=document.createElement("button"),d=document.createElement("button");n.classList.add("btn-div"),o.classList.add("project-btn"),d.classList.add("todo-btn"),o.textContent="+ Project",o.addEventListener("click",()=>u(e)),d.textContent="+ Todo",d.addEventListener("click",()=>s(e,0)),n.appendChild(o),n.appendChild(d),t.appendChild(n)}(e),y(e)})()}]);