import{S as L,P as T,W as C,C as R,k as F,F as i,T as D,i as _,m as U}from"./DdUGlUBh.js";import"./CIZhVwNQ.js";const W=""+new URL("pngegg.DzOgZOsw.png",import.meta.url).href;function O(p){const M=p.offsetWidth,b=p.offsetHeight,w=new L,x=new T(75,M/b,.1,1e3);x.position.z=60;const m=new C({alpha:!0});m.setSize(M,b),p.appendChild(m.domElement);const n=1600,v=320,y=[],z=[],g=[];for(let a=0;a<n;a++){const s=v*Math.cbrt(Math.random()),d=Math.random()*2*Math.PI,e=Math.acos(2*Math.random()-1),f=s*Math.sin(e)*Math.cos(d),c=s*Math.sin(e)*Math.sin(d),u=s*Math.cos(e);y.push(f,c,u);const l=[5610669,16777215,16775106,16757683,12244735],h=new R(l[Math.floor(Math.random()*l.length)]);z.push(h.r,h.g,h.b),g.push(.5+Math.random()*1.5)}const o=new F;o.setAttribute("position",new i(y,3)),o.setAttribute("color",new i(z,3)),o.setAttribute("size",new i(g,1));const P=[],S=[],A=[];for(let a=0;a<n;a++)P.push(Math.random()*Math.PI*2),S.push((Math.random()-.5)*.02),A.push(Math.random()<.2?Math.random()*20+10:0);o.setAttribute("rotation",new i(P,1)),o.setAttribute("rotationSpeed",new i(S,1)),o.setAttribute("trailLength",new i(A,1)),new D().load(W,a=>{const s=new _({uniforms:{pointTexture:{value:a},size:{value:6},opacity:{value:1}},vertexShader:`
                attribute float size;
                attribute float rotation;
                attribute float trailLength;
                varying float vRotation;
                varying float vTrailLength;
                void main() {
                    vRotation = rotation;
                    vTrailLength = trailLength;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,fragmentShader:`
                uniform sampler2D pointTexture;
                uniform float opacity;
                varying float vRotation;
                varying float vTrailLength;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float c = cos(vRotation);
                    float s = sin(vRotation);
                    mat2 rot = mat2(c, -s, s, c);
                    uv = rot * uv;
                    uv += 0.5;
                    vec4 color = texture2D(pointTexture, uv);
                    if (color.a < 0.1) discard;
                    // Apply trail effect
                    if (vTrailLength > 0.0) {
                        float dist = length(gl_PointCoord - 0.5);
                        if (dist > 0.5) {
                            float trail = 1.0 - (dist - 0.5) / vTrailLength;
                            if (trail > 0.0) {
                                color.a *= trail * 4.0; // Further increase trail opacity
                            } else {
                                discard;
                            }
                        }
                    }
                    gl_FragColor = vec4(color.rgb, color.a * opacity);
                }
            `,transparent:!0,depthWrite:!1}),d=new U(o,s);w.add(d);const e=o.attributes.position.array;function f(){const c=Date.now()*.002,u=o.attributes.size;for(let t=0;t<n;t++)u.array[t]=g[t]*(.7+.3*Math.abs(Math.sin(c+t)));u.needsUpdate=!0;for(let t=0;t<n;t++){const r=t*3;e[r+0]+=Math.sin(c+t)*.01,e[r+1]+=Math.cos(c+t)*.01,e[r+2]+=.25,e[r+2]>60&&(e[r+2]=-320,e[r+0]=(Math.random()-.5)*v*2,e[r+1]=(Math.random()-.5)*v*2)}o.attributes.position.needsUpdate=!0;const l=o.attributes.rotation,h=o.attributes.rotationSpeed;for(let t=0;t<n;t++)l.array[t]+=h.array[t];l.needsUpdate=!0,m.render(w,x),requestAnimationFrame(f)}f()})}export{O as c};
