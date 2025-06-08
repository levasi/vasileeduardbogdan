import{T as f,S as v,C as h,P as x,W as _,B as S,i as P,h as T,a as b}from"./DdUGlUBh.js";import{G as y}from"./9NwP3Wld.js";import{_ as C,j as r,S as c,k as u,a4 as z,r as a,s as B,B as W,w as k,a5 as L,o as M,a as n}from"./CIZhVwNQ.js";const G={__name:"scroll-test",setup(j){r.registerPlugin(c),u(()=>{const{$lenis:o}=z();o&&o.on("scroll",c.update)});let t=null;const l=a(null),p=a(null),m=a(null);return u(()=>{new f,new y;const o=new v;o.background=new h(9486046);const e=new x(75,window.innerWidth/window.innerHeight,.1,1e3);t=new _({antialias:!0}),t.setSize(window.innerWidth,window.innerHeight),l.value.appendChild(t.domElement);const s=new S,w=new P({uniforms:{time:{value:1},resolution:{value:new T}},vertexShader:`
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            varying vec3 vPosition;
            void main() {
                gl_FragColor = vec4(abs(sin(vPosition.x)), abs(sin(vPosition.y)), abs(sin(vPosition.z)), 1.0);
            }
        `}),i=new b(s,w);o.add(i),r.to(i.position,{scrollTrigger:{trigger:0,start:"top top",end:"bottom bottom",scrub:!0},x:12,y:12,z:12,duration:2}),r.to(i.scale,{scrollTrigger:{trigger:0,start:"top top",end:"bottom bottom",scrub:!0},x:15,y:15,z:15,duration:2}),e.position.z=5;function d(){requestAnimationFrame(d),i.rotation.x+=.01,t.render(o,e)}d();function g(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",g,!1)}),B(()=>{t.dispose()}),(o,e)=>{const s=L("LenisContainer");return M(),W(s,{root:""},{default:k(()=>[n("div",{ref_key:"starterTemplate",ref:l,class:"scroll-template"},null,512),n("span",{ref_key:"h3",ref:p},"Scroll Animation",512),n("section",{ref_key:"s1",ref:m},e[0]||(e[0]=[n("p",null," s1 ",-1)]),512),e[1]||(e[1]=n("section",null,[n("p",null," This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect. ")],-1)),e[2]||(e[2]=n("section",null,[n("p",null," This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect. ")],-1))]),_:1,__:[1,2]})}}},F=C(G,[["__scopeId","data-v-fea4a519"]]);export{F as default};
