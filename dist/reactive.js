"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=new Map,d={createStore(e){m.has(e)||(m.set(e,new Map),Object.defineProperty(d,e,{get(){return m.get(e)}}))}};d.createStore("tickets");function E(e){const t=e.queue.at(e.ticket);return e.ticket+=1,e.queue.length===e.ticket&&(e.ticket=0),t}function R(e){d.tickets.has(e)||d.tickets.set(e,{reInvoke:!1,ticket:0,queue:[]});const t=d.tickets.get(e);return e.isReInvoke&&(t.reInvoke=!0),t}d.createStore("callbacks");function H(e,t){const n=R(t);return n.reInvoke?E(n):(n.queue.push(e),e)}d.createStore("memo");function T(e,t){const n=H(e,t);return d.memo.has(n)||d.memo.set(n,!1),(...r)=>(d.memo.get(n)===!1&&d.memo.set(n,n(...r)),d.memo.get(n))}d.createStore("states");function x(e){const t=R(e);return t.reInvoke?E(t):t}var O=(e=>(e[e.CREATE=0]="CREATE",e[e.NEW=1]="NEW",e[e.UPDATE=2]="UPDATE",e[e.PREPEND=3]="PREPEND",e))(O||{});class u{constructor(t,n){this.state=n,this._parentNode=null,this.node=null,this.node=t.map(r=>r.render())}set parentNode(t){this._parentNode=t,t.implementStates(this.state)}get parentNode(){return this._parentNode}}class D{constructor(t,n,r=0){this.superCtx=t,this.TYPE_ACTION=r,this.store=[],this.data=n}set data(t){if(this.TYPE_ACTION===3&&(this.rendering=t),this.TYPE_ACTION!==3){if(this.store.includes(t))return;this.store.push(t)}}get data(){return this.store.at(-1)}get previousData(){return this.store.at(-2)}toString(){var t,n;return(n=(t=this.data)==null?void 0:t.toString())!=null?n:""}}function z(e,t,n){t.TYPE_ACTION=n,t.data=e}class c{constructor(t,n){this.store=new Map,this.currentStoreState=new D(n,t)}get parentNode(){return this.currentParentNode}get superCtx(){return this.currentStoreState.superCtx}get previousData(){return this.currentStoreState.previousData}set parentNode(t){}get data(){return this.currentStoreState.data}addProxySelf(t){return this.proxySelf=t,this}set(t){z(t,this.currentStoreState,1)}is(t){return this.currentStoreState.data===t}toString(){return this.currentStoreState.toString()}[Symbol.toPrimitive](){return this.toString()}*[Symbol.iterator](){for(const t of this.currentStoreState.data)yield t}}function G(e,t){return typeof e[t]=="function"?e[t].bind(e):e[t]}function y(e,t){const n=t?x(t):void 0;if(n instanceof c)return n;const r=new Proxy(new c(e,t),{get(i,s){if(s==="flatten")return n;if(s in i)return G(i,s);if(typeof i.data[s]!="undefined")return!Array.isArray(i.data)&&i.data instanceof Object?i.data[s]:typeof i.data[s]=="function"?(...a)=>{if(typeof i.data[s].apply(i.data,a)!="undefined")return new u(i.data[s].apply(i.data,a),r)}:r;throw new Error("error proxy "+s)},set(i,s,a){if(s in i)i[s]=a;else if(s in i.data)i.data[s]=a;else return!1;return!0}});return typeof n=="object"&&n.queue.push(r),r}function J(e,t){const{state:n,callback:r,option:i}=e!=null?e:{};return r?r.call(this,{state:n,option:i,children:t}):t}let S;const k=e=>e.find(t=>K(t.properties));function K({path:e}){const t=location.hash.length&&location.hash.startsWith("#")?location.hash.slice(1):"/",r=new globalThis.URLPattern(e,location.origin).exec(t,location.origin);return S=r?{path:r.input,params:r.groups}:null,S!==null}function Q({children:e,notFount:t}){const n=y(!1,this),r=y(n.data?t:k(e),this);return T(()=>{this.implementStates(r),window.addEventListener("hashchange",()=>{var i;n.data===!1&&n.set(!0),r.set((i=k(e))!=null?i:t)})},this)(),r.data.parentNode||(r.data.parentNode=this),r.data}function X(e){return e.render.parentNode=this,e.render}function Z(){return S.params}function $(){return S.path}function ee(e){let t=e.flatten;e.currentStoreState.superCtx&&!t&&(t=x(e.currentStoreState.superCtx)),t&&!(t instanceof c)&&(t.reInvoke=!0)}function q(e,t=()=>{}){for(const n of e){const r=n.set.bind(n);n.set=i=>{ee(n),r(i),t(n)}}}function te(e,t){T(()=>{q(t,n=>{C.call(e,n.currentStoreState)})},e)()}function w(e){return Array.isArray(e)?e:[e]}function L(e){return typeof e.type=="string"?w(e.node):e.childs.map(p).flat()}function p(e){return e.node?e.node:ne(e).flat()}function ne(e){const t=[];for(const n of e.childs){let r=n;n instanceof h&&(r=p(n)),t.push(r)}return t}function M(e){let t=e;for(;t&&typeof t.node!="object";)t=t.parentNode;return t}function N(e=!1){const t={};e&&(t.children=this.originalChilds);for(const n in this.properties)e&&n==="shareContext"?t.sharedContext=this.properties[n]:t[n==="className"?"class":n]=this.properties[n];return t}var re=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},l=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},I=(e,t,n)=>(re(e,t,"access private method"),n),j,U,_,Y,V,v,B;function C(e){this.isReInvoke=!0;const t=this.parentNode,n=typeof this.type=="function"?M(this):this,r=this.childs;let i=r.findIndex(g=>g instanceof h||g instanceof c||g instanceof u&&g.state.currentStoreState===e);const s=r[i],a=s instanceof h?[s]:s instanceof u?s.node:s.toString();typeof this.type=="function"&&(r[i]=this.type.call(this,N.call(this,!0)));const o=r[i],f=o instanceof h;f&&(o.parentNode=this);const F=f?[o.render()]:o instanceof c?o.toString():o.node;this.widgedHelper.updateWidget(new class{getNodeParent(){return n.node}getParent(){return t}get index(){return i}get newChilds(){return F}get oldChilds(){return a}})}const A={pos:0,current:0},W=class P{constructor(t,n,r,i){this.type=t,this.properties=n,this.widgedHelper=r,this.originalChilds=i,l(this,j),l(this,U),l(this,_),l(this,V),l(this,v),this.isReInvoke=!1,this.node=void 0,this.parentNode=void 0,this.childs=void 0,this._id=A.pos,this._ns=!1,this._fnparent=void 0,this._listenerOnCreate=()=>{},typeof this.type=="string"&&this.type==="svg"&&(this._ns=!0),n&&n.onCreate&&(this._listenerOnCreate=n.onCreate,delete this.properties.onCreate);for(let s of i)this._ns&&s instanceof P&&(s._ns=!0),typeof this.type=="function"&&s instanceof P&&(s._fnparent=this);A.pos++}createNodeAndChilds(){typeof this.type=="string"&&(this.node=this.widgedHelper.createWidget(this.type,this._ns),this.childs=w(this.originalChilds))}render(){if(this.node&&(this.widgedHelper.setProperties(this.node,N.call(this)),this.isReInvoke&&this.widgedHelper.resetWidgets&&this.widgedHelper.resetWidgets(L(this))),typeof this.type=="function"&&!this.childs){const t=N.call(this,!0),n=this.type.name==="Fragment"?this.type(t):this.type.call(this,t);this.childs=w(n)}return I(this,_,Y).call(this),this._listenerOnCreate(this.node),this}getNodeWidget(){return typeof this.node=="object"?this:M(this)}implementStates(...t){q(t,n=>{I(this,v,B).call(this,n.currentStoreState)})}};j=new WeakSet;U=new WeakSet;_=new WeakSet;Y=function(){this.getNodeWidget();for(let e of this.childs)(e instanceof W||e instanceof c||e instanceof u)&&(e.parentNode=this),e instanceof W?(typeof this.type=="function"?e._fnparent=this.type.name!=="Fragment"?this:this._fnparent:typeof this.type=="string"&&this._fnparent&&(e._fnparent=this._fnparent),typeof e.type=="string"&&this._ns&&(e._ns=!0,e.createNodeAndChilds()),this.isReInvoke&&(e.createNodeAndChilds(),e.isReInvoke=!0),e.render(),this.widgedHelper.appendWidget(this,e)):e instanceof u?this.widgedHelper.appendWidget(this,e):this.widgedHelper.appendWidget(this,e instanceof c?(this.implementStates(e),e.toString()):e)};V=new WeakSet;v=new WeakSet;B=function(e){return e.superCtx?C.call(e.superCtx,e):C.call(this,e)};let h=W,b;function ie(e){b=e}class se{static Fragment({children:t}){return t}static createElement(t,n,...r){const i=Object.seal(new h(t,n||{},b,r));return i.createNodeAndChilds(),i}}function oe(e,t){return t.node=b.querySelector(e),t.render(),t}const ae=typeof window!="undefined";class de{constructor(){this.resetWidgets=t=>{for(const n of t)n.innerHTML=""}}createWidget(t,n){return n?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t)}appendWidget(t,n){if(ae){if(typeof n.type=="function")return;const r=t.getNodeWidget(),i=n instanceof h?L(n):n instanceof u?n.node.map(p):n;Array.isArray(i)?r.node.append(...i):r.node.append(i)}}setProperties(t,n){for(const r in n){const i=n[r];r.startsWith("on")?t.addEventListener(r.slice(2).toLowerCase(),i):t.setAttribute(r==="className"?"class":r,String(i))}}querySelector(t){return document.querySelector(t)}updateWidget(t){var n;const r=t.getNodeParent();let{index:i,oldChilds:s,newChilds:a}=t;if(typeof a=="string")r.childNodes.item(i).data=a;else{a=a.map(o=>p(o)),s=s.map(o=>p(o)),a.length>s.length;for(let o=0;o<a.length;o++){const f=a[o];s[o]?s[o].replaceWith(f):r.insertBefore(f,(n=a[o-1])==null?void 0:n.nextSibling)}}}}exports.Execute=J;exports.HookStore=d;exports.NativeRender=de;exports.Reactive=se;exports.Route=X;exports.Routes=Q;exports.State=c;exports.StateAction=O;exports.StateRender=u;exports.StoreState=D;exports.addWidgetHelper=ie;exports.createTicket=R;exports.exec=T;exports.flattenState=x;exports.implementStates=te;exports.nextTicket=E;exports.render=oe;exports.useCallback=H;exports.useParams=Z;exports.usePath=$;exports.useState=y;
