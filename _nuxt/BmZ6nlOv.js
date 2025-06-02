import{T as f,S as v,C as h,P as x,W as _,B as S,f as T,V as P,a as b}from"./DxyHs_SD.js";import{G as y}from"./BJhxo_fm.js";import{_ as C,q as s,S as c,m as u,T as k,l as a,n as z,y as W,w as B,U as L,o as M,a as n}from"./Djoni2md.js";const G={__name:"scroll-test",setup(A){s.registerPlugin(c),u(()=>{const{$lenis:t}=k();t&&t.on("scroll",c.update)});let o=null;const l=a(null),m=a(null),p=a(null);return u(()=>{new f,new y;const t=new v;t.background=new h(9486046);const e=new x(75,window.innerWidth/window.innerHeight,.1,1e3);o=new _({antialias:!0}),o.setSize(window.innerWidth,window.innerHeight),l.value.appendChild(o.domElement);const r=new S,w=new T({uniforms:{time:{value:1},resolution:{value:new P}},vertexShader:`
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
        `}),i=new b(r,w);t.add(i),s.to(i.position,{scrollTrigger:{trigger:0,start:"top top",end:"bottom bottom",scrub:!0,markers:!0},x:12,y:12,z:12,duration:2}),s.to(i.scale,{scrollTrigger:{trigger:0,start:"top top",end:"bottom bottom",scrub:!0,markers:!0},x:15,y:15,z:15,duration:2}),e.position.z=5;function d(){requestAnimationFrame(d),i.rotation.x+=.01,o.render(t,e)}d();function g(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",g,!1)}),z(()=>{o.dispose()}),(t,e)=>{const r=L("LenisContainer");return M(),W(r,{root:""},{default:B(()=>[n("div",{ref_key:"starterTemplate",ref:l,class:"scroll-template"},null,512),n("span",{ref_key:"h3",ref:m},"Scroll Animation",512),n("section",{ref_key:"s1",ref:p},e[0]||(e[0]=[n("p",null," s1 ",-1)]),512),e[1]||(e[1]=n("section",null,[n("p",null," This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect. ")],-1)),e[2]||(e[2]=n("section",null,[n("p",null," This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect. ")],-1))]),_:1,__:[1,2]})}}},V=C(G,[["__scopeId","data-v-f702a67e"]]);export{V as default};
