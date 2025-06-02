import{C as M,f as b,g,h as z,F as P,i as L,T as R,j as F,k as B,S as j,P as I,W as T,l as G,L as U,G as A,I as W,m as k,a as h,M as E,c as D,n as H}from"./DxyHs_SD.js";import{O as q}from"./IIeNiGKj.js";import{m as J}from"./CDs0j8a9.js";const N=""+new URL("00_earthmap1k.e02w945l.jpg",import.meta.url).href,O=""+new URL("02_earthspec1k.BrvTab0F.jpg",import.meta.url).href,V=""+new URL("01_earthbump1k.BqTZ_n3R.jpg",import.meta.url).href,Z=""+new URL("03_earthlights1k.CMJgtjeX.jpg",import.meta.url).href,X=""+new URL("04_earthcloudmap.DFRuT0IE.jpg",import.meta.url).href,K=""+new URL("05_earthcloudmaptrans.DBvtCPIC.jpg",import.meta.url).href;function Q({rimHex:p=35071,facingHex:i=0}={}){const a={color1:{value:new M(p)},color2:{value:new M(i)},fresnelBias:{value:.1},fresnelScale:{value:1},fresnelPower:{value:4}},n=`
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
  `,t=`
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;return new b({uniforms:a,vertexShader:n,fragmentShader:t,transparent:!0,blending:g})}const Y=""+new URL("circle.Cn3Ra9JZ.png",import.meta.url).href;function $({numStars:p=500}={}){function i(){const e=Math.random()*25+25,s=Math.random(),l=Math.random(),c=2*Math.PI*s,d=Math.acos(2*l-1);let u=e*Math.sin(d)*Math.cos(c),f=e*Math.sin(d)*Math.sin(c),m=e*Math.cos(d);return{pos:new B(u,f,m),hue:.6,minDist:e}}const a=[],n=[];let t;for(let e=0;e<p;e+=1){let s=i();const{pos:l,hue:c}=s;t=new M().setHSL(c,.2,Math.random()),a.push(l.x,l.y,l.z),n.push(t.r,t.g,t.b)}const o=new z;o.setAttribute("position",new P(a,3)),o.setAttribute("color",new P(n,3));const r=new L({size:.2,vertexColors:!0,map:new R().load(Y)});return new F(o,r)}const ne={__name:"earth",setup(p){return J(()=>{const i=window.innerWidth,a=window.innerHeight,n=new j,t=new I(75,i/a,.1,1e3);t.position.z=5;const o=new T({antialias:!0});o.setSize(i,a),document.body.appendChild(o.domElement),o.toneMapping=G,o.outputColorSpace=U;const r=new A;r.rotation.z=-23.4*Math.PI/180,n.add(r),new q(t,o.domElement);const v=12,e=new R,s=new W(1,v),l=new k({map:e.load(N),specularMap:e.load(O),bumpMap:e.load(V),bumpScale:.04}),c=new h(s,l);r.add(c);const d=new E({map:e.load(Z),blending:g}),u=new h(s,d);r.add(u);const f=new D({map:e.load(X),transparent:!0,opacity:.8,blending:g,alphaMap:e.load(K)}),m=new h(s,f);m.scale.setScalar(1.008),r.add(m);const _=Q(),w=new h(s,_);w.scale.setScalar(1.01),r.add(w);const x=$({numStars:2222});n.add(x);const S=new H(16777215,2);S.position.set(-2,.5,1.5),n.add(S);function y(){requestAnimationFrame(y),c.rotation.y+=.002,u.rotation.y+=.002,m.rotation.y+=.0023,w.rotation.y+=.002,x.rotation.y-=2e-4,n.rotation.y+=5e-4,o.render(n,t)}y();function C(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",C,!1)}),(i,a)=>null}};export{ne as default};
