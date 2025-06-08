import{C as g,i as L,j as x,k as b,F as R,l as B,T as _,m as F,V as j,S as k,P as I,W as T,n as G,L as U,G as A,I as E,o as W,a as f,M as D,c as H,p as V}from"./DdUGlUBh.js";import{O as q}from"./jVSss2RU.js";import{r as J,k as N,c as O,o as Z}from"./CIZhVwNQ.js";const X=""+new URL("00_earthmap1k.e02w945l.jpg",import.meta.url).href,K=""+new URL("02_earthspec1k.BrvTab0F.jpg",import.meta.url).href,Q=""+new URL("01_earthbump1k.BqTZ_n3R.jpg",import.meta.url).href,Y=""+new URL("03_earthlights1k.CMJgtjeX.jpg",import.meta.url).href,$=""+new URL("04_earthcloudmap.DFRuT0IE.jpg",import.meta.url).href,ee=""+new URL("05_earthcloudmaptrans.DBvtCPIC.jpg",import.meta.url).href;function te({rimHex:p=35071,facingHex:c=0}={}){const s={color1:{value:new g(p)},color2:{value:new g(c)},fresnelBias:{value:.1},fresnelScale:{value:1},fresnelPower:{value:4}},i=`
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `,e=`
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;return new L({uniforms:s,vertexShader:i,fragmentShader:e,transparent:!0,blending:x})}const oe=""+new URL("circle.Cn3Ra9JZ.png",import.meta.url).href;function ae({numStars:p=500}={}){function c(){const r=Math.random()*25+25,o=Math.random(),a=Math.random(),d=2*Math.PI*o,m=Math.acos(2*a-1);let h=r*Math.sin(m)*Math.cos(d),u=r*Math.sin(m)*Math.sin(d),w=r*Math.cos(m);return{pos:new j(h,u,w),hue:.6,minDist:r}}const s=[],i=[];let e;for(let r=0;r<p;r+=1){let o=c();const{pos:a,hue:d}=o;e=new g().setHSL(d,.2,Math.random()),s.push(a.x,a.y,a.z),i.push(e.r,e.g,e.b)}const t=new b;t.setAttribute("position",new R(s,3)),t.setAttribute("color",new R(i,3));const n=new B({size:.2,vertexColors:!0,map:new _().load(oe)});return new F(t,n)}const ie={__name:"earth",setup(p){const c=J(null);return N(()=>{const s=window.innerWidth,i=window.innerHeight,e=new k,t=new I(75,s/i,.1,1e3);t.position.z=5;const n=new T({antialias:!0});n.setSize(s,i),c.value.appendChild(n.domElement),n.toneMapping=G,n.outputColorSpace=U;const l=new A;l.rotation.z=-23.4*Math.PI/180,e.add(l),new q(t,n.domElement);const r=12,o=new _,a=new E(1,r),d=new W({map:o.load(X),specularMap:o.load(K),bumpMap:o.load(Q),bumpScale:.04}),m=new f(a,d);l.add(m);const h=new D({map:o.load(Y),blending:x}),u=new f(a,h);l.add(u);const w=new H({map:o.load($),transparent:!0,opacity:.8,blending:x,alphaMap:o.load(ee)}),M=new f(a,w);M.scale.setScalar(1.008),l.add(M);const C=te(),v=new f(a,C);v.scale.setScalar(1.01),l.add(v);const S=ae({numStars:2222});e.add(S);const y=new V(16777215,2);y.position.set(-2,.5,1.5),e.add(y);function P(){requestAnimationFrame(P),m.rotation.y+=.002,u.rotation.y+=.002,M.rotation.y+=.0023,v.rotation.y+=.002,S.rotation.y-=2e-4,e.rotation.y+=5e-4,n.render(e,t)}P();function z(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",z,!1)}),(s,i)=>(Z(),O("div",{class:"earth-container",ref_key:"earthRef",ref:c},null,512))}};export{ie as default};
