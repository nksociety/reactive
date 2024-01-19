"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var S=(t=>(t[t.CREATE=0]="CREATE",t[t.NEW=1]="NEW",t[t.UPDATE=2]="UPDATE",t[t.PREPEND=3]="PREPEND",t))(S||{});class v{constructor(e,r,n=0){this.superCtx=e,this.TYPE_ACTION=n,this.store=[],this.data=r}set data(e){const r=this.data;if(this.TYPE_ACTION===1||this.TYPE_ACTION===0?this._current=e:this.TYPE_ACTION===2?this._current=e:this.TYPE_ACTION===3&&(this.rendering=e),this.TYPE_ACTION!==3){if(this.store.includes(e))return;this.TYPE_ACTION===2?this.store.push(this._current=[...r,...this._current]):this.store.push(this._current)}}get data(){return this._current}get previousData(){return this.store.at(-1)}toString(){var e,r;return(r=(e=this.data)==null?void 0:e.toString())!=null?r:""}}function k(t,e,r){e.TYPE_ACTION=r,e.data=t}class d{constructor(e,r){this.superCtx=r,this.store=new Map,this.currentStoreState=new v(r,e)}get parentNode(){return this.currentParentNode}set parentNode(e){this.currentParentNode=e,typeof this.currentStoreState.parentNode!="undefined"&&this.currentStoreState.parentNode!==e&&(this.currentStoreState=new v(this.superCtx,this.currentStoreState.data)),this.currentStoreState.parentNode=e,this.store.set(e,this.currentStoreState)}get data(){return this.currentStoreState.data}addProxySelf(e){return this.proxySelf=e,this}set(e){k(e,this.currentStoreState,1)}append(e){k(e,this.proxySelf?this.proxySelf.currentStoreState:this.currentStoreState,2)}$setReturnData(e){return this.currentStoreState.TYPE_ACTION=3,this.currentStoreState.data=e,this}$map(e){if(Array.isArray(this.data))return this.currentStoreState.TYPE_ACTION=3,this.currentStoreState.data=this.data.map(e);throw new Error("data is not array")}is(e){return this.currentStoreState.data===e}toString(){return this.currentStoreState.toString()}[Symbol.toPrimitive](){return this.toString()}*[Symbol.iterator](){for(const e of this.currentStoreState.data)yield e}}class q extends Text{constructor(e){super(e)}get text(){return this.data}set text(e){this.data=e}}class Q{constructor(){this.resetWidgets=e=>{for(const r of e)r.innerHTML=""}}replaceChild(e,r,n){if(r.length===n.length)n.forEach((i,s)=>{i.replaceWith(r[s])});else if(n.length===1)n.at(0).replaceWith(...r);else{let i=n.at(-1).nextSibling;n.forEach(s=>s.remove()),r.forEach(s=>{e.insertBefore(s,i)})}}setText(e,r){e.textContent=r}createText(e){return new q(e)}createWidget(e,r){return r?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e)}appendWidget(e,r){e.append(...Array.isArray(r)?r:[r])}setProperties(e,r){for(const n in r){const i=r[n];n.startsWith("on")?e.addEventListener(n.slice(2).toLowerCase(),i):e.setAttribute(n==="className"?"class":n,String(i))}}querySelector(e){return document.querySelector(e)}updateWidget(e){var r;const n=e.node.childNodes,i=n.item(e.updateIndex),s=i==null?void 0:i.previousSibling;if(!e.state)return;if(e.isStringable)return i.data=e.state;const a=Array.from(n).slice(e.updateIndex).slice(0,e.totalChilds),c=(r=a.at(-1))==null?void 0:r.nextSibling;if(e.typeAction===S.NEW){for(let p=0;p<a.length;p++)a[p].remove();if(n.length===0||!i&&!s&&!c)return e.node.append(...e.state);if(i.parentNode)return i.before(...e.state);if(c&&!i.parentNode)return c.before(...e.state);s.after(...e.state)}else e.typeAction===S.UPDATE&&e.node.append(...e.state)}}const _=new Map,o={createStore(t){_.has(t)||(_.set(t,new Map),Object.defineProperty(o,t,{get(){return _.get(t)}}))}};o.createStore("tickets");function C(t){const e=t.queue.at(t.ticket);return t.ticket+=1,t.queue.length===t.ticket&&(t.ticket=0),e}function A(t){return o.tickets.has(t)||o.tickets.set(t,{reInvoke:!1,ticket:0,queue:[]}),o.tickets.get(t)}o.createStore("callbacks");function U(t,e){const r=A(e);return r.reInvoke?C(r):(r.queue.push(t),t)}o.createStore("memo");function x(t,e){const r=U(t,e);return o.memo.has(r)||o.memo.set(r,!1),(...n)=>(o.memo.get(r)===!1&&o.memo.set(r,r(...n)),o.memo.get(r))}o.createStore("states");function P(t){const e=A(t);return e.reInvoke?C(e):e}function X(t,e){return typeof t[e]=="function"?t[e].bind(t):t[e]}function w(t,e){const r=e?P(e):void 0;if(r instanceof d)return r;const n=new Proxy(new d(t,e),{get(i,s){if(s==="flatten")return r;if(s in i)return X(i,s);if(typeof i.data[s]!="undefined")return!Array.isArray(i.data)&&i.data instanceof Object?i.data[s]:typeof i.data[s]=="function"?(...a)=>{if(typeof i.data[s].apply(i.data,a)!="undefined")return i.$setReturnData(i.data[s].apply(i.data,a))}:n;throw new Error("error proxy "+s)},set(i,s,a){if(s in i)i[s]=a;else if(s in i.data)i.data[s]=a;else return!1;return!0}});return typeof r=="object"&&r.queue.push(n),n}function Z(t,e){const{state:r,callback:n,option:i}=t!=null?t:{};return n?n.call(this,{state:r,option:i,children:e}):e}let g;const D=t=>t.find(e=>ee(e.properties));function ee({path:t}){const e=location.hash.length&&location.hash.startsWith("#")?location.hash.slice(1):"/",n=new globalThis.URLPattern(t,location.origin).exec(e,location.origin);return g=n?{path:n.input,params:n.groups}:null,g!==null}function te({children:t,notFount:e}){const r=w(!1,this),n=w(r.data?e:D(t),this);return x(()=>{this.implementStates(n),window.addEventListener("hashchange",()=>{var i;r.data===!1&&r.set(!0),n.set((i=D(t))!=null?i:e)})},this)(),n.data.parentNode||(n.data.parentNode=this),n.data}function re(t){return t.render.parentNode=this,t.render}function ne(){return g.params}function ie(){return g.path}function Y(t){let e=t.flatten;t.currentStoreState.superCtx&&!e&&(e=P(t.currentStoreState.superCtx)),e&&!(e instanceof d)&&(e.reInvoke=!0)}function se(t,e=()=>{}){for(const r of t){const n=r.set.bind(r),i=r.append.bind(r);r.set=s=>{Y(r),n(s),e(r)},r.append=s=>{Y(r),i(s),e(r)}}}function ae(...t){var e;for(const r of t){const[n,i]=Array.isArray(r)?r:[r],s=(e=n.currentStoreState.superCtx)!=null?e:i;if(typeof s=="undefined")throw new Error("el estado no tiene el contexto del componente");x(()=>{i&&(n.currentStoreState.superCtx=s),s.implementStates(n)},s)()}}function y(t){return Array.isArray(t)?t:[t]}function l(t){return typeof t.type=="string"?y(t.node):t.childs.map(L).flat()}function L(t){return t.node?t.node:oe(t).flat()}function oe(t){const e=[];for(const r of t.childs){let n=r;r instanceof K&&(n=L(r)),e.push(n)}return e}function M(t){let e=t;for(;e&&typeof e.node!="object";)e=e.parentNode;return e}function m(t=!1){const e={};t&&(e.children=this.originalChilds);for(const r in this.properties)t&&r==="shareContext"?e.sharedContext=this.properties[r]:e[r==="className"?"class":r]=this.properties[r];return e}var ce=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},h=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},u=(t,e,r)=>(ce(t,e,"access private method"),r),b,$,W,F,I,V,R,B,N,z,H,G,E,J;const de=["string","number","boolean"],j={pos:0,current:0},f=class T{constructor(e,r,n,i){this.type=e,this.properties=r,this.widgedHelper=n,this.originalChilds=i,h(this,b),h(this,W),h(this,I),h(this,R),h(this,N),h(this,H),h(this,E),this.isReInvoke=!1,this.node=void 0,this.parentNode=void 0,this.childs=void 0,this._id=j.pos,this._ns=!1,this._fnparent=void 0,this._listenerOnCreate=()=>{},typeof this.type=="string"&&this.type==="svg"&&(this._ns=!0),r&&r.onCreate&&(this._listenerOnCreate=r.onCreate,delete this.properties.onCreate);for(let s of i)this._ns&&s instanceof T&&(s._ns=!0),typeof this.type=="function"&&s instanceof T&&(s._fnparent=this);j.pos++}createNodeAndChilds(){typeof this.type=="string"&&(this.node=this.widgedHelper.createWidget(this.type,this._ns),this.childs=y(this.originalChilds))}render(){if(this.node&&(this.widgedHelper.setProperties(this.node,m.call(this)),this.isReInvoke&&this.widgedHelper.resetWidgets&&this.widgedHelper.resetWidgets(l(this))),typeof this.type=="function"&&!this.childs){const e=m.call(this,!0),r=this.type.name==="Fragment"?this.type(e):this.type.call(this,e);this.childs=y(r)}return u(this,N,z).call(this),this._listenerOnCreate(this.node),this}getNodeWidget(){return typeof this.node=="object"?this:M(this)}implementStates(...e){se(e,r=>{u(this,E,J).call(this,r.currentStoreState)})}};b=new WeakSet;$=function(t){if(t instanceof d&&!u(this,W,F).call(this,t))throw new Error("the execution of a state without an executing function is only allowed if they are strings, numbers or boolean values")};W=new WeakSet;F=function(t){return Array.isArray(t.data)?t.data.some(e=>typeof e=="object")===!1:de.includes(typeof t.data)};I=new WeakSet;V=function(t){var e,r;const n=typeof this.type=="function"?M(this):this,i=n.childs;for(let s=0,a;a=i[s];s++){if(this!==a||!(a instanceof d&&a.data===t.data))continue;u(this,b,$).call(this,a);const c={isStringable:!1,node:n.node,typeAction:t.TYPE_ACTION,updateIndex:s};a instanceof d&&Object.assign(c,{isStringable:!0,state:t.data,totalChilds:i.length}),a instanceof f&&typeof a.type=="function"&&(a.type.call(this,m.call(this,!0)),t.parentNode&&(c.state=(r=(e=t.rendering)==null?void 0:e.map(p=>l(p.render())).flat())!=null?r:l(t.data)),c.totalChilds=t.previousData.length),this.widgedHelper.updateWidget(c)}};R=new WeakSet;B=function(t){t.isReInvoke=!0;const e=t.type.call(t,m.call(t,!0)),r=l(t);let n;if(e instanceof f)e.isReInvoke=!0,e.render(),n=l(e),e.parentNode=t;else if(Array.isArray(e))n=e.map(i=>l(i.render()).at(0));else throw new Error("could not resolve nodes");this.widgedHelper.replaceChild(this.getNodeWidget().node,n,r),t.childs=y(e)};N=new WeakSet;z=function(){const t=this.getNodeWidget();for(let e of this.childs)(e instanceof f||e instanceof d)&&(e.parentNode=this),e instanceof f?(typeof this.type=="function"?e._fnparent=this.type.name!=="Fragment"?this:this._fnparent:typeof this.type=="string"&&this._fnparent&&(e._fnparent=this._fnparent),typeof e.type=="string"&&this._ns&&(e._ns=!0,e.createNodeAndChilds()),this.isReInvoke&&(e.createNodeAndChilds(),e.isReInvoke=!0),t&&typeof e.node=="object"&&this.widgedHelper.appendWidget(t.node,e.node),e.render()):e instanceof d?(this.implementStates(e),t&&u(this,H,G).call(this,this,t.node,e)):t&&this.widgedHelper.appendWidget(t.node,this.widgedHelper.createText(e))};H=new WeakSet;G=function(t,e,r){var n;const i=r.currentStoreState;Array.isArray(i.data)||Array.isArray(i.rendering)?((n=i.rendering)!=null?n:i.data).forEach(s=>{this.widgedHelper.appendWidget(e,s instanceof f?s.render().node:s)}):this.widgedHelper.appendWidget(e,r)};E=new WeakSet;J=function(t){return t.superCtx?u(this,R,B).call(this,t.superCtx):u(this,I,V).call(this,t)};let K=f,O;function he(t){O=t}class ue{static Fragment({children:e}){return e}static createElement(e,r,...n){const i=Object.seal(new K(e,r||{},O,n));return i.createNodeAndChilds(),i}}function le(t,e){return e.node=O.querySelector(t),e.render(),e}exports.Execute=Z;exports.HookStore=o;exports.Reactive=ue;exports.ReactiveText=q;exports.Route=re;exports.Routes=te;exports.State=d;exports.StateAction=S;exports.StoreState=v;exports.WidgetHelper=Q;exports.addWidgetHelper=he;exports.createTicket=A;exports.exec=x;exports.flattenState=P;exports.implementStates=ae;exports.nextTicket=C;exports.render=le;exports.useCallback=U;exports.useParams=ne;exports.usePath=ie;exports.useState=w;