├── .gitignore
├── .npmignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── Spacefile
├── TODO.md
├── bun.lockb
├── dingo.png
├── docs
    └── assets
    │   ├── Button.stories-48658847.js.map
    │   ├── Draggable.stories-a0a02e29.js
    │   ├── Draggable.stories-a0a02e29.js.map
    │   ├── Grid-1a07993f.js.map
    │   ├── Header.stories-00558764.js.map
    │   ├── Positionable-6a060a99.js
    │   ├── Positionable-6a060a99.js.map
    │   ├── WithTooltip-J57HCPYA-92c5e8bc.js
    │   ├── WithTooltip-J57HCPYA-92c5e8bc.js.map
    │   ├── index-cd3423c8.js.map
    │   ├── preview-15573006.js
    │   ├── syntaxhighlighter-PONEFOSF-e9522a55.js
    │   ├── syntaxhighlighter-PONEFOSF-e9522a55.js.map
    │   └── tela-c608b082.js.map
├── package.json
├── src
    ├── app.css
    ├── app.d.ts
    ├── app.html
    ├── lib
    │   ├── Board.svelte
    │   ├── ChunkOverlay.svelte
    │   ├── DebugPanel.svelte
    │   ├── DebugPanels.svelte
    │   ├── Draggable.svelte
    │   ├── Grid.svelte
    │   ├── ImmutablePositionable.svelte
    │   ├── LazyComponent.svelte
    │   ├── Positionable.svelte
    │   ├── Resizable.svelte
    │   ├── debugUtils.ts
    │   ├── index.ts
    │   ├── old
    │   │   ├── board
    │   │   │   ├── Board.svelte
    │   │   │   ├── Draggable.svelte
    │   │   │   ├── Positionable.svelte
    │   │   │   └── Resizable.svelte
    │   │   ├── types
    │   │   │   ├── Board.type.ts
    │   │   │   └── Positionable.type.ts
    │   │   └── utils.ts
    │   ├── old2
    │   │   ├── Board.svelte
    │   │   ├── Chunk.svelte
    │   │   ├── Chunked.svelte
    │   │   ├── Draggable.svelte
    │   │   ├── Gradient.svelte
    │   │   ├── Grid.svelte
    │   │   ├── Positionable.svelte
    │   │   ├── Resizable.svelte
    │   │   ├── index.ts
    │   │   ├── tela.css
    │   │   ├── types
    │   │   │   ├── Board.type.ts
    │   │   │   └── Utils.type.ts
    │   │   └── utils.ts
    │   ├── state-machine
    │   │   └── fsm.ts
    │   ├── stores
    │   │   └── ChunkMap.ts
    │   ├── tela.css
    │   ├── types
    │   │   ├── Board.type.ts
    │   │   └── Utils.type.ts
    │   └── utils.ts
    └── routes
    │   ├── +layout.svelte
    │   ├── +layout.ts
    │   ├── +page.svelte
    │   ├── dev
    │       ├── +page.svelte
    │       └── Card.svelte
    │   ├── examples
    │       └── README.md
    │   └── v3
    │       └── test
    │           ├── +page.svelte
    │           ├── Card.svelte
    │           └── LazyComponent.svelte
├── static
    └── favicon.png
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts


/.gitignore:
--------------------------------------------------------------------------------
 1 | .DS_Store
 2 | node_modules
 3 | /build
 4 | /dist
 5 | /.svelte-kit
 6 | /package
 7 | .env
 8 | .env.*
 9 | !.env.example
10 | vite.config.js.timestamp-*
11 | vite.config.ts.timestamp-*
12 | 


--------------------------------------------------------------------------------
/.npmignore:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/deta/tela/main/.npmignore


--------------------------------------------------------------------------------
/.npmrc:
--------------------------------------------------------------------------------
1 | engine-strict=true
2 | resolution-mode=highest
3 | 


--------------------------------------------------------------------------------
/.prettierignore:
--------------------------------------------------------------------------------
 1 | .DS_Store
 2 | node_modules
 3 | /build
 4 | /.svelte-kit
 5 | /package
 6 | .env
 7 | .env.*
 8 | !.env.example
 9 | 
10 | # Ignore files for PNPM, NPM and YARN
11 | pnpm-lock.yaml
12 | package-lock.json
13 | yarn.lock
14 | 


--------------------------------------------------------------------------------
/.prettierrc:
--------------------------------------------------------------------------------
 1 | {
 2 | 	"useTabs": false,
 3 |   "tabWidth": 2,
 4 | 	"singleQuote": false,
 5 | 	"trailingComma": "none",
 6 | 	"printWidth": 100,
 7 | 	"plugins": ["prettier-plugin-svelte"],
 8 | 	"pluginSearchDirs": ["."],
 9 | 	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
10 | }
11 | 


--------------------------------------------------------------------------------
/LICENSE:
--------------------------------------------------------------------------------
 1 | MIT License
 2 | 
 3 | Copyright (c) 2023 Deta
 4 | 
 5 | Permission is hereby granted, free of charge, to any person obtaining a copy
 6 | of this software and associated documentation files (the "Software"), to deal
 7 | in the Software without restriction, including without limitation the rights
 8 | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 9 | copies of the Software, and to permit persons to whom the Software is
10 | furnished to do so, subject to the following conditions:
11 | 
12 | The above copyright notice and this permission notice shall be included in all
13 | copies or substantial portions of the Software.
14 | 
15 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
16 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
17 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
18 | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
19 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
20 | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
21 | SOFTWARE.
22 | 


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
/Spacefile:
--------------------------------------------------------------------------------
 1 | # Spacefile Docs: https://go.deta.dev/docs/spacefile/v0
 2 | v: 0
 3 | # icon: icon.png
 4 | micros:
 5 |   - name: blank
 6 |     src: ./
 7 |     engine: svelte-kit
 8 |     public_routes:
 9 |       - /shared/*
10 |       - /
11 |       # - /_app/*
12 |     primary: true


--------------------------------------------------------------------------------
/TODO.md:
--------------------------------------------------------------------------------
 1 | # Features
 2 | 
 3 | - [ ] Board
 4 |   - [ ] Configuration
 5 |     - [ ] Modes
 6 |       - [ ] Dragging
 7 |       - [ ] Selecting
 8 |       - [ ] Pan
 9 |       - [X] Zoom
10 |     - [ ] Bounds
11 |       - [ ] Offset
12 |       - [ ] Zoom
13 |       - [ ] Limit ("hard" / "soft")
14 |     - [ ] Grid Snap
15 |       - [ ] Snapping
16 |       - [ ] Snapping Size
17 |     - [ ] Culling
18 |     - [ ] Cull margin
19 |     - [ ] Dev
20 |       - [ ] Dev Pos
21 |       - [ ] Dev Mode
22 |   - [ ] Implementation
23 |     - [ ] Modes & Events
24 |       - [ ] Mode changes emit better events
25 |     - [ ] Bounds
26 |     - [ ] Respect parent container boundingRect
27 | 
28 | - [X]] Background Grid
29 |   - [X] Configuration
30 |     - [X] dotColor
31 |     - [X] dotOpacity
32 |     - [X] dotSize
33 |     - [X] gridSize -> always linked to board
34 | 
35 | - [ ] Positionable
36 |   - [ ] Configuration
37 |     - [ ] SnapToGrid override
38 |     - [ ] Cull override
39 |   - [ ] Implementation
40 |     - [X] Update position
41 |     - [ ] Respect bounds (maybe damp out of bound return dep on cfg)
42 |     - [ ]
43 | 
44 | - [ ] Draggable
45 |   - [ ] Events -> Rethink them & usefullness / cancelability
46 | 
47 | - [ ] Resizable -> Maybe turn into ResizeHandle -> + direction cfg
48 |   - [ ] Configurability
49 |     - [ ] Min/Max width/height
50 |   - [ ] Support all directions
51 | 
52 | - [ ] Optimizations
53 |   - [ ] Position updates if snapping to grid
54 |   - [ ] Make culling work correctly
55 | 
56 | - !! have GPU accelerated option using transform3d
57 | - ! make element list a board prop, expose TPositionable array type & each block slot inside for declaring elements
58 | 
59 | - Add full touch support
60 | - Extract default styling to importable css (mode cursors etc)
61 | - Auto pan board when dragging to the edge
62 | 
63 | 
64 | 
65 | # Bugs / Missing
66 | 
67 | - [ ] Zooming fcks up mouse click events -> positions are wrong
68 | - [ ] When board is not full window, click & drag calculations are wrong
69 | - [ ] Touchscreens not working
70 | 
71 | - Add some sort of click event hijacking and adjust cursor to scaled position
72 | - ON bounded -> window resize -> fix view jump
73 | - fix scrolling trackpag nested scrolls
74 | - when not fullscreen, window.innerwidth does not apply --> Replace with getting parent bounding box
75 | 
76 | importing into ohe
77 | "exports": {
78 |     ".": {
79 |       "types": "./dist/index.d.ts",
80 |       "svelte": "./dist/index.js"
81 |     }
82 |   },


--------------------------------------------------------------------------------
/bun.lockb:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/deta/tela/main/bun.lockb


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/deta/tela/main/dingo.png


--------------------------------------------------------------------------------
/docs/assets/Button.stories-48658847.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"Button.stories-48658847.js","sources":[],"sourcesContent":[],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;"}


--------------------------------------------------------------------------------
/docs/assets/Draggable.stories-a0a02e29.js:
--------------------------------------------------------------------------------
 1 | import{S as oe,i as ne,s as ae,F as pe,N as q,e as ie,c as re,b as le,f as _,O as V,j as d,z as Z,G as me,H as _e,I as de,m as z,t as y,P as be,Q as F,n as ze,D as H,E as Q,R as ye,p as U,q as Y,h as he,r as T,v as X,a as De,d as Se,L,T as x,w as C,x as M,U as j}from"./index-76d2f1d2.js";import{h as $e,s as W,B as ve,P as J,w as K}from"./Positionable-6a060a99.js";import{g as Oe}from"./spread-8a54911c.js";function we(n){let e,o,i,r,t;const u=n[7].default,l=pe(u,n,n[6],null);let c=[n[3],{class:o="draggable "+(n[3].class||"")}],s={};for(let a=0;a<c.length;a+=1)s=q(s,c[a]);return{c(){e=ie("div"),l&&l.c(),this.h()},l(a){e=re(a,"DIV",{class:!0});var g=le(e);l&&l.l(g),g.forEach(_),this.h()},h(){V(e,s)},m(a,g){d(a,e,g),l&&l.m(e,null),i=!0,r||(t=[Z(e,"mousedown",n[2]),Z(e,"touchstart",n[2],{passive:!1})],r=!0)},p(a,[g]){l&&l.p&&(!i||g&64)&&me(l,u,a,a[6],i?de(u,a[6],g,null):_e(a[6]),null),V(e,s=Oe(c,[g&8&&a[3],(!i||g&8&&o!==(o="draggable "+(a[3].class||"")))&&{class:o}]))},i(a){i||(z(l,a),i=!0)},o(a){y(l,a),i=!1},d(a){a&&_(e),l&&l.d(a),r=!1,be(t)}}}function Ne(n,e,o){const i=["pos","size"];let r=F(e,i),t,u,{$$slots:l={},$$scope:c}=e,{pos:s}=e,{size:a}=e;const g=ze(),k=H("board");Q(n,k,f=>o(10,u=f));const p=H("settings");Q(n,p,f=>o(9,t=f));let m={init:{x:0,y:0},curr:{x:0,y:0},offset:{x:0,y:0}};function G(f,b){return{x:f-u.viewPort.x,y:b-u.viewPort.y+window.scrollY}}function ge(f){var v,O,w,N,P,B;const b=((O=(v=f.targetTouches)==null?void 0:v.item(0))==null?void 0:O.target)||f.target,{x:h,y:D}=G(((N=(w=f.targetTouches)==null?void 0:w.item(0))==null?void 0:N.clientX)||f.clientX,((B=(P=f.targetTouches)==null?void 0:P.item(0))==null?void 0:B.clientY)||f.clientY);if($e(b,"tela-ignore"))return;f.stopPropagation(),document.body.classList.add("dragging");const S=t.SNAP_TO_GRID?W(h,t.GRID_SIZE):h,$=t.SNAP_TO_GRID?W(D,t.GRID_SIZE):D;m.init={x:S,y:$},m.curr={x:S,y:$},document.addEventListener("mousemove",I),document.addEventListener("mouseup",R,{once:!0}),document.addEventListener("touchmove",I),document.addEventListener("touchend",R,{once:!0}),g("dragStart",{pos:s})}function I(f){var $,v,O,w,N,P,B,A;const{x:b,y:h}=G(((v=($=f.targetTouches)==null?void 0:$.item(0))==null?void 0:v.clientX)||f.clientX,((w=(O=f.targetTouches)==null?void 0:O.item(0))==null?void 0:w.clientY)||f.clientY);m.offset={x:(b-m.curr.x)/u.zoom,y:(h-m.curr.y)/u.zoom},m.curr={x:b,y:h};const D=s.x+m.offset.x,S=s.y+m.offset.y;((N=t.BOUNDS)==null?void 0:N.minX)!==null&&D<t.BOUNDS.minX?o(4,s.x=t.BOUNDS.minX,s):((P=t.BOUNDS)==null?void 0:P.maxX)!==null&&D+a.x>t.BOUNDS.maxX?o(4,s.x=t.BOUNDS.maxX-a.x,s):o(4,s.x+=m.offset.x,s),((B=t.BOUNDS)==null?void 0:B.minY)!==null&&S<t.BOUNDS.minY?o(4,s.y=t.BOUNDS.minY,s):((A=t.BOUNDS)==null?void 0:A.maxY)!==null&&S+a.y>t.BOUNDS.maxY?o(4,s.y=t.BOUNDS.maxY-a.y,s):o(4,s.y+=m.offset.y,s),g("dragMove",{pos:s,offset:m.offset})}function R(f){document.body.classList.remove("dragging"),document.removeEventListener("mousemove",I),document.removeEventListener("touchmove",I),g("dragEnd",{pos:s})}return n.$$set=f=>{e=q(q({},e),ye(f)),o(3,r=F(e,i)),"pos"in f&&o(4,s=f.pos),"size"in f&&o(5,a=f.size),"$$scope"in f&&o(6,c=f.$$scope)},[k,p,ge,r,s,a,c,l]}class ue extends oe{constructor(e){super(),ne(this,e,Ne,we,ae,{pos:4,size:5})}}function Pe(n){let e;return{c(){e=C("drag here.")},l(o){e=M(o,"drag here.")},m(o,i){d(o,e,i)},d(o){o&&_(e)}}}function Be(n){let e,o,i,r,t;function u(s){n[6](s)}function l(s){n[7](s)}let c={$$slots:{default:[Pe]},$$scope:{ctx:n}};return n[0].pos!==void 0&&(c.pos=n[0].pos),n[0].size!==void 0&&(c.size=n[0].size),e=new ue({props:c}),L.push(()=>x(e,"pos",u)),L.push(()=>x(e,"size",l)),{c(){U(e.$$.fragment),r=C(`
 2 |       Positionable`)},l(s){Y(e.$$.fragment,s),r=M(s,`
 3 |       Positionable`)},m(s,a){T(e,s,a),d(s,r,a),t=!0},p(s,a){const g={};a&1024&&(g.$$scope={dirty:a,ctx:s}),!o&&a&1&&(o=!0,g.pos=s[0].pos,j(()=>o=!1)),!i&&a&1&&(i=!0,g.size=s[0].size,j(()=>i=!1)),e.$set(g)},i(s){t||(z(e.$$.fragment,s),t=!0)},o(s){y(e.$$.fragment,s),t=!1},d(s){s&&_(r),X(e,s)}}}function Ee(n){let e;return{c(){e=C("drag here.")},l(o){e=M(o,"drag here.")},m(o,i){d(o,e,i)},d(o){o&&_(e)}}}function Ue(n){let e,o,i,r,t;function u(s){n[8](s)}function l(s){n[9](s)}let c={$$slots:{default:[Ee]},$$scope:{ctx:n}};return n[1].pos!==void 0&&(c.pos=n[1].pos),n[1].size!==void 0&&(c.size=n[1].size),e=new ue({props:c}),L.push(()=>x(e,"pos",u)),L.push(()=>x(e,"size",l)),{c(){U(e.$$.fragment),r=C(`
 4 |       Positionable`)},l(s){Y(e.$$.fragment,s),r=M(s,`
 5 |       Positionable`)},m(s,a){T(e,s,a),d(s,r,a),t=!0},p(s,a){const g={};a&1024&&(g.$$scope={dirty:a,ctx:s}),!o&&a&2&&(o=!0,g.pos=s[1].pos,j(()=>o=!1)),!i&&a&2&&(i=!0,g.size=s[1].size,j(()=>i=!1)),e.$set(g)},i(s){t||(z(e.$$.fragment,s),t=!0)},o(s){y(e.$$.fragment,s),t=!1},d(s){s&&_(r),X(e,s)}}}function Ye(n){let e,o,i,r;return e=new J({props:{pos:n[0].pos,size:n[0].size,z:1,$$slots:{default:[Be]},$$scope:{ctx:n}}}),i=new J({props:{pos:n[1].pos,size:n[1].size,z:1,$$slots:{default:[Ue]},$$scope:{ctx:n}}}),{c(){U(e.$$.fragment),o=De(),U(i.$$.fragment)},l(t){Y(e.$$.fragment,t),o=Se(t),Y(i.$$.fragment,t)},m(t,u){T(e,t,u),d(t,o,u),T(i,t,u),r=!0},p(t,u){const l={};u&1&&(l.pos=t[0].pos),u&1&&(l.size=t[0].size),u&1025&&(l.$$scope={dirty:u,ctx:t}),e.$set(l);const c={};u&2&&(c.pos=t[1].pos),u&2&&(c.size=t[1].size),u&1026&&(c.$$scope={dirty:u,ctx:t}),i.$set(c)},i(t){r||(z(e.$$.fragment,t),z(i.$$.fragment,t),r=!0)},o(t){y(e.$$.fragment,t),y(i.$$.fragment,t),r=!1},d(t){t&&_(o),X(e,t),X(i,t)}}}function Te(n){let e,o,i;return o=new ve({props:{settings:n[2],board:n[3],$$slots:{default:[Ye]},$$scope:{ctx:n}}}),{c(){e=ie("main"),U(o.$$.fragment),this.h()},l(r){e=re(r,"MAIN",{class:!0});var t=le(e);Y(o.$$.fragment,t),t.forEach(_),this.h()},h(){he(e,"class","draggableStory svelte-17w1y40")},m(r,t){d(r,e,t),T(o,e,null),i=!0},p(r,[t]){const u={};t&1027&&(u.$$scope={dirty:t,ctx:r}),o.$set(u)},i(r){i||(z(o.$$.fragment,r),i=!0)},o(r){y(o.$$.fragment,r),i=!1},d(r){r&&_(e),X(o)}}}function Xe(n,e,o){let{pos:i={x:0,y:0}}=e,{size:r={x:100,y:100}}=e;const t=K({}),u=K({viewOffset:{x:0,y:0},zoom:1}),l={pos:i,size:r},c={pos:{x:200,y:200},size:{x:100,y:100}};function s(p){n.$$.not_equal(l.pos,p)&&(l.pos=p,o(0,l))}function a(p){n.$$.not_equal(l.size,p)&&(l.size=p,o(0,l))}function g(p){n.$$.not_equal(c.pos,p)&&(c.pos=p,o(1,c))}function k(p){n.$$.not_equal(c.size,p)&&(c.size=p,o(1,c))}return n.$$set=p=>{"pos"in p&&o(4,i=p.pos),"size"in p&&o(5,r=p.size)},[l,c,t,u,i,r,s,a,g,k]}class ce extends oe{constructor(e){super(),ne(this,e,Xe,Te,ae,{pos:4,size:5})}}const fe=ce;ce.__docgen={version:3,name:"DraggableStory.svelte",data:[{visibility:"public",description:null,keywords:[],name:"pos",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"object",type:"object"}},{visibility:"public",description:null,keywords:[],name:"size",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"object",type:"object"}}],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const ke={component:fe,title:"Components/Draggable",tags:["autodocs"],argTypes:{pos:{x:{control:"number"},y:{control:"number"}},size:{x:{control:"number"},y:{control:"number"}}},args:{pos:{x:0,y:0},size:{x:200,y:200}}},Ie=n=>({Component:fe,props:n}),E=Ie.bind({});var ee,se,te;E.parameters={...E.parameters,docs:{...(ee=E.parameters)==null?void 0:ee.docs,source:{originalSource:`args => ({
 6 |   Component: DraggableStory,
 7 |   props: args
 8 | })`,...(te=(se=E.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};const Le=["Default"],Me=Object.freeze(Object.defineProperty({__proto__:null,Default:E,__namedExportsOrder:Le,default:ke},Symbol.toStringTag,{value:"Module"}));export{Me as D};
 9 | //# sourceMappingURL=Draggable.stories-a0a02e29.js.map
10 | 


--------------------------------------------------------------------------------
/docs/assets/Draggable.stories-a0a02e29.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"Draggable.stories-a0a02e29.js","sources":["../../src/lib/Draggable.svelte","../../src/stories/DraggableStory.svelte"],"sourcesContent":["<script lang=\"ts\">\n  import { createEventDispatcher, getContext } from \"svelte\";\n  import type { Vec2 } from \"./types/Utils.type.js\";\n  import type { Writable } from \"svelte/store\";\n  import type { TBoard, TBoardSettings } from \"./types/Board.type.js\";\n  import { hasClassOrParentWithClass, snapToGrid } from \"./utils.js\";\n\n  export let pos: Vec2;\n  export let size: Vec2;\n\n  const dispatch = createEventDispatcher();\n\n  const board = getContext<Writable<TBoard>>(\"board\");\n  const settings = getContext<Writable<TBoardSettings>>(\"settings\");\n\n  let dragState = {\n    init: { x: 0, y: 0 },\n    curr: { x: 0, y: 0 },\n    offset: { x: 0, y: 0 }\n  };\n\n  // Utils\n  function posToViewportPos(x: number, y: number) {\n    return {\n      x: x - $board.viewPort.x,\n      y: y - $board.viewPort.y + window.scrollY\n    };\n  }\n\n  // UI Handlers\n  function onMouseDown(e: MouseEvent | TouchEvent) {\n    const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;\n    const { x: clientX, y: clientY } = posToViewportPos(\n      (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,\n      (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY\n    );\n\n    if (hasClassOrParentWithClass(target as HTMLElement, \"tela-ignore\")) return;\n    e.stopPropagation();\n    document.body.classList.add(\"dragging\");\n    // let cX = e.clientX;\n    // let cY = e.clientY;\n    // todo: handle touch\n\n    const x = $settings.SNAP_TO_GRID ? snapToGrid(clientX, $settings.GRID_SIZE!) : clientX;\n    const y = $settings.SNAP_TO_GRID ? snapToGrid(clientY, $settings.GRID_SIZE!) : clientY;\n\n    dragState.init = { x, y };\n    dragState.curr = { x, y };\n\n    document.addEventListener(\"mousemove\", onMouseMove);\n    document.addEventListener(\"mouseup\", onMouseUp, { once: true });\n    document.addEventListener(\"touchmove\", onMouseMove);\n    document.addEventListener(\"touchend\", onMouseUp, { once: true });\n\n    dispatch(\"dragStart\", { pos });\n  }\n\n  function onMouseMove(e: MouseEvent | TouchEvent) {\n    const { x: clientX, y: clientY } = posToViewportPos(\n      (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,\n      (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY\n    );\n\n    dragState.offset = {\n      x: (clientX - dragState.curr.x) / $board.zoom,\n      y: (clientY - dragState.curr.y) / $board.zoom\n    };\n\n    dragState.curr = { x: clientX, y: clientY };\n\n    // todo: optimize setting pos?\n\n    const newX = pos.x + dragState.offset.x;\n    const newY = pos.y + dragState.offset.y;\n\n    if ($settings.BOUNDS?.minX !== null && newX < $settings.BOUNDS!.minX) {\n      pos.x = $settings.BOUNDS!.minX;\n    } else if ($settings.BOUNDS?.maxX !== null && newX + size.x > $settings.BOUNDS!.maxX) {\n      pos.x = $settings.BOUNDS!.maxX - size.x;\n    } else {\n      pos.x += dragState.offset.x;\n    }\n\n    if ($settings.BOUNDS?.minY !== null && newY < $settings.BOUNDS!.minY) {\n      pos.y = $settings.BOUNDS!.minY;\n    } else if ($settings.BOUNDS?.maxY !== null && newY + size.y > $settings.BOUNDS!.maxY) {\n      pos.y = $settings.BOUNDS!.maxY - size.y;\n    } else {\n      pos.y += dragState.offset.y;\n    }\n\n    dispatch(\"dragMove\", { pos, offset: dragState.offset });\n  }\n\n  function onMouseUp(e: MouseEvent | TouchEvent) {\n    document.body.classList.remove(\"dragging\");\n    document.removeEventListener(\"mousemove\", onMouseMove);\n    document.removeEventListener(\"touchmove\", onMouseMove);\n    dispatch(\"dragEnd\", { pos });\n  }\n</script>\n\n<svelte:element\n  this=\"div\"\n  {...$$restProps}\n  class=\"draggable {$$restProps.class || ''}\"\n  on:mousedown={onMouseDown}\n  on:touchstart|nonpassive={onMouseDown}\n>\n  <slot />\n</svelte:element>\n","<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import Draggable from \"$lib/Draggable.svelte\";\n  import type { TBoard, TBoardSettings, Vec2 } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  export let pos: Vec2 = { x: 0, y: 0 };\n  export let size: Vec2 = { x: 100, y: 100 };\n\n  const settings = writable({} satisfies TBoardSettings);\n\n  const board = writable({\n    viewOffset: { x: 0, y: 0 },\n    zoom: 1\n  } satisfies TBoard);\n\n  const element = { pos, size };\n  const el2 = { pos: { x: 200, y: 200 }, size: { x: 100, y: 100 } };\n</script>\n\n<main class=\"draggableStory\">\n  <Board {settings} {board}>\n    <Positionable pos={element.pos} size={element.size} z={1}>\n      <Draggable bind:pos={element.pos} bind:size={element.size}>\n      drag here.\n      </Draggable>\n      Positionable\n    </Positionable>\n    <Positionable pos={el2.pos} size={el2.size} z={1}>\n      <Draggable bind:pos={el2.pos} bind:size={el2.size}>\n      drag here.\n      </Draggable>\n      Positionable\n    </Positionable>\n  </Board>\n</main>\n\n<style>\n  main {\n    height: 500px;\n  }\n  :global(.draggableStory .draggable) {\n    background: lightgray;\n  }\n</style>"],"names":["ctx","insert_hydration","target","div","anchor","div_class_value","pos","$$props","size","dispatch","createEventDispatcher","board","getContext","settings","dragState","posToViewportPos","x","y","$board","onMouseDown","e","_b","_a","clientX","clientY","_d","_c","_f","_e","hasClassOrParentWithClass","$settings","snapToGrid","onMouseMove","onMouseUp","newX","newY","$$invalidate","_g","_h","draggable_props","draggable_changes","dirty","positionable0_changes","positionable1_changes","main","writable","element","el2","$$self","value"],"mappings":"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"}


--------------------------------------------------------------------------------
/docs/assets/Grid-1a07993f.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"Grid-1a07993f.js","sources":["../../src/lib/Grid.svelte"],"sourcesContent":["<script lang=\"ts\">\n  import { getContext } from \"svelte\";\n  import type { Writable } from \"svelte/store\";\n  import type { TBoard, TBoardSettings } from \"./types/Board.type.js\";\n\n  export let dotColor = \"black\";\n  export let dotOpacity = 30;\n  export let dotSize = 1;\n\n  const board = getContext<Writable<TBoard>>(\"board\");\n  const settings = getContext<Writable<TBoardSettings>>(\"settings\");\n\n  // $: transformCss = `transform: translate(${$board.viewOffset.x}px, ${$board.viewOffset.y}px);`;\n  $: transformCss = `width: ${100 / $board.zoom}%; height: ${\n    100 / $board.zoom\n  }%; transform: translate3d(-${dotSize}px, -${dotSize}px, 0) translate3d(${\n    $board.viewOffset.x - ($board.viewOffset.x % $settings.GRID_SIZE!)\n  }px, ${$board.viewOffset.y - ($board.viewOffset.y % $settings.GRID_SIZE!)}px, 0);`;\n\n  $: svgShiftCss = `transform: translate3d(-${$board.viewOffset.x % $settings.GRID_SIZE!}px, 0px, 0);`;\n</script>\n\n<div class=\"grid\" style={transformCss}>\n  <svg width=\"100%\" height=\"100%\"  xmlns=\"http://www.w3.org/2000/svg\">\n    <pattern\n      id=\"dotGrid\"\n      x=\"0\"\n      y=\"0\"\n      width={$settings.GRID_SIZE}\n      height={$settings.GRID_SIZE}\n      patternUnits=\"userSpaceOnUse\"\n    >\n      <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} fill-opacity=\"{dotOpacity}%\" />\n    </pattern>\n\n    <!-- Left square with user space tiles -->\n    <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#dotGrid)\" />\n  </svg>\n</div>\n\n<style>\n  .grid {\n    position: relative;\n    min-height: 100%;\n    z-index: 0;\n  }\n  .grid > svg {\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n</style>\n"],"names":["ctx","attr","pattern","pattern_width_value","pattern_height_value","insert_hydration","target","div","anchor","append_hydration","svg","circle","rect","dirty","dotColor","$$props","dotOpacity","dotSize","board","getContext","settings","$$invalidate","transformCss","$board","$settings"],"mappings":"ipBAgCkBA,EAAO,CAAA,CAAA,WAAMA,EAAO,CAAA,CAAA,UAAKA,EAAO,CAAA,CAAA,aAAQA,EAAQ,CAAA,CAAA,uBAAiBA,EAAU,CAAA,EAAA,GAAA,gDAJhFC,EAAAC,EAAA,QAAAC,EAAAH,KAAU,SAAS,EAClBC,EAAAC,EAAA,SAAAE,EAAAJ,KAAU,SAAS,sSAPRA,EAAY,CAAA,CAAA,UAArCK,EAgBKC,EAAAC,EAAAC,CAAA,EAfHC,EAcKF,EAAAG,CAAA,EAbHD,EASSC,EAAAR,CAAA,EADPO,EAA4FP,EAAAS,CAAA,EAI9FF,EAAmEC,EAAAE,CAAA,0BAJrDZ,EAAO,CAAA,CAAA,gBAAMA,EAAO,CAAA,CAAA,eAAKA,EAAO,CAAA,CAAA,kBAAQA,EAAQ,CAAA,CAAA,cAAiBA,EAAU,CAAA,EAAA,4BAJhFa,EAAA,GAAAV,KAAAA,EAAAH,KAAU,2BACTa,EAAA,GAAAT,KAAAA,EAAAJ,KAAU,8CAPCA,EAAY,CAAA,CAAA,uDAjBxB,SAAAc,EAAW,OAAA,EAAAC,GACX,WAAAC,EAAa,EAAA,EAAAD,GACb,QAAAE,EAAU,CAAA,EAAAF,EAEf,MAAAG,EAAQC,EAA6B,OAAO,qBAC5C,MAAAC,EAAWD,EAAqC,UAAU,kLAGhEE,EAAA,EAAGC,EAAyB,UAAA,IAAMC,EAAO,IAAI,cAC3C,IAAMA,EAAO,IACf,8BAA8BN,CAAO,QAAQA,CAAO,sBAClDM,EAAO,WAAW,EAAKA,EAAO,WAAW,EAAIC,EAAU,SACzD,OAAOD,EAAO,WAAW,EAAKA,EAAO,WAAW,EAAIC,EAAU,SAAW,SAAA,kBAE7BD,EAAO,WAAW,EAAIC,EAAU"}


--------------------------------------------------------------------------------
/docs/assets/Header.stories-00558764.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"Header.stories-00558764.js","sources":[],"sourcesContent":[],"names":[],"mappings":";;;;;;"}


--------------------------------------------------------------------------------
/docs/assets/Positionable-6a060a99.js:
--------------------------------------------------------------------------------
1 | import{u as A,s as fe,S as Se,i as Ee,F as Me,a as se,e as B,d as ne,c as C,b as T,f as w,h as N,j as Y,k as U,z as R,G as Le,H as ke,I as Ne,m as W,t as J,P as Te,n as Ge,V as k,W as ee,E as oe,K as Re,X as E,w as q,x as F,y as ie,Y as ye,L as Ve,J as pe,o as Ae,l as We,Q as _e,D as he,N as le,R as He,O as be,Z as ge}from"./index-76d2f1d2.js";import{g as Ze}from"./spread-8a54911c.js";const Ke=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global,G=[];function je(i,s=A){let e;const n=new Set;function r(c){if(fe(i,c)&&(i=c,e)){const a=!G.length;for(const l of n)l[1](),G.push(l,i);if(a){for(let l=0;l<G.length;l+=2)G[l][0](G[l+1]);G.length=0}}}function m(c){r(c(i))}function o(c,a=A){const l=[c,a];return n.add(l),n.size===1&&(e=s(r,m)||A),c(i),()=>{n.delete(l),n.size===0&&e&&(e(),e=null)}}return{set:r,update:m,subscribe:o}}const V=(i,s=0,e=1)=>Math.min(e,Math.max(s,i));function re(i,s){return i?i.classList.contains(s)?!0:i.parentElement?re(i.parentElement,s):!1:!1}function j(i,s){return Math.round(i/s)*s}const te=new Map;function qe(i,s,e){te.has(i)&&clearTimeout(te.get(i));const n=setTimeout(e,s);te.set(i,n)}function Fe(){return typeof window<"u"}const{window:xe}=Ke;function we(i){var m,o;let s,e,n=((m=i[8].DEV)==null?void 0:m.SHOW_POS)&&ze(i),r=((o=i[8].DEV)==null?void 0:o.SHOW_MODE)&&ve(i);return{c(){s=B("div"),n&&n.c(),e=se(),r&&r.c(),this.h()},l(c){s=C(c,"DIV",{style:!0});var a=T(s);n&&n.l(a),e=ne(a),r&&r.l(a),a.forEach(w),this.h()},h(){E(s,"position","absolute"),E(s,"right","1ch"),E(s,"top","1ch"),E(s,"background","darkblue"),E(s,"z-index","200"),E(s,"color","#fff"),E(s,"padding","4px"),E(s,"display","flex"),E(s,"gap","2ch"),E(s,"user-select","none"),E(s,"pointer-events","none")},m(c,a){Y(c,s,a),n&&n.m(s,null),U(s,e),r&&r.m(s,null)},p(c,a){var l,u;(l=c[8].DEV)!=null&&l.SHOW_POS?n?n.p(c,a):(n=ze(c),n.c(),n.m(s,e)):n&&(n.d(1),n=null),(u=c[8].DEV)!=null&&u.SHOW_MODE?r?r.p(c,a):(r=ve(c),r.c(),r.m(s,null)):r&&(r.d(1),r=null)},d(c){c&&w(s),n&&n.d(),r&&r.d()}}}function ze(i){let s,e=i[2].viewOffset.x+"",n,r,m=i[2].viewOffset.y+"",o;return{c(){s=B("span"),n=q(e),r=q(" - "),o=q(m)},l(c){s=C(c,"SPAN",{});var a=T(s);n=F(a,e),r=F(a," - "),o=F(a,m),a.forEach(w)},m(c,a){Y(c,s,a),U(s,n),U(s,r),U(s,o)},p(c,a){a&4&&e!==(e=c[2].viewOffset.x+"")&&ie(n,e),a&4&&m!==(m=c[2].viewOffset.y+"")&&ie(o,m)},d(c){c&&w(s)}}}function ve(i){let s,e;return{c(){s=B("span"),e=q(i[3])},l(n){s=C(n,"SPAN",{});var r=T(s);e=F(r,i[3]),r.forEach(w)},m(n,r){Y(n,s,r),U(s,e)},p(n,r){r&8&&ie(e,n[3])},d(n){n&&w(s)}}}function Oe(i){let s;return{c(){s=B("div"),this.h()},l(e){s=C(e,"DIV",{class:!0,style:!0}),T(s).forEach(w),this.h()},h(){N(s,"class","selection-rect svelte-xlkx4x"),N(s,"style",i[6])},m(e,n){Y(e,s,n)},p(e,n){n&64&&N(s,"style",e[6])},d(e){e&&w(s)}}}function Je(i){let s=Object.values(i[8].DEV).includes(!0),e,n,r,m,o,c,a,l=s&&we(i),u=(i[3]==="select"||i[3]==="draw")&&Oe(i);const g=i[16].default,p=Me(g,i,i[15],null);return{c(){l&&l.c(),e=se(),n=B("div"),r=B("div"),u&&u.c(),m=se(),p&&p.c(),this.h()},l(d){l&&l.l(d),e=ne(d),n=C(d,"DIV",{class:!0,style:!0});var _=T(n);r=C(_,"DIV",{class:!0,style:!0});var z=T(r);u&&u.l(z),m=ne(z),p&&p.l(z),z.forEach(w),_.forEach(w),this.h()},h(){N(r,"class","board svelte-xlkx4x"),N(r,"style",i[7]),N(n,"class","container svelte-xlkx4x"),N(n,"style",i[5])},m(d,_){l&&l.m(d,_),Y(d,e,_),Y(d,n,_),U(n,r),u&&u.m(r,null),U(r,m),p&&p.m(r,null),i[17](n),o=!0,c||(a=[R(xe,"keydown",i[11]),R(xe,"keyup",i[12]),R(n,"mousedown",i[13]),R(n,"touchstart",i[13],{passive:!1}),R(n,"wheel",i[10],{passive:!1})],c=!0)},p(d,[_]){_&256&&(s=Object.values(d[8].DEV).includes(!0)),s?l?l.p(d,_):(l=we(d),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null),d[3]==="select"||d[3]==="draw"?u?u.p(d,_):(u=Oe(d),u.c(),u.m(r,m)):u&&(u.d(1),u=null),p&&p.p&&(!o||_&32768)&&Le(p,g,d,d[15],o?Ne(g,d[15],_,null):ke(d[15]),null),(!o||_&128)&&N(r,"style",d[7]),(!o||_&32)&&N(n,"style",d[5])},i(d){o||(W(p,d),o=!0)},o(d){J(p,d),o=!1},d(d){d&&(w(e),w(n)),l&&l.d(d),u&&u.d(),p&&p.d(d),i[17](null),c=!1,Te(a)}}}function Qe(){document.body.classList.add("panning")}function $e(i,s,e){let n,r,m,o,c=A,a=()=>(c(),c=ye(v,f=>e(2,o=f)),v),l,u,g=A,p=()=>(g(),g=ye(z,f=>e(8,u=f)),z);i.$$.on_destroy.push(()=>c()),i.$$.on_destroy.push(()=>g());let{$$slots:d={},$$scope:_}=s,{settings:z}=s;p();let{board:v}=s;a();const M=Ge();k(z,u={CAN_ZOOM:!0,SNAP_TO_GRID:!1,GRID_SIZE:20,CULL:!0,CULL_MARGIN:400,DEV:{SHOW_POS:!1,SHOW_MODE:!1},...u,BOUNDS:{minX:null,maxX:null,minY:null,maxY:null,maxZoom:3,minZoom:0,limit:"hard",...u.BOUNDS}},u),k(v,o={zoom:1,viewOffset:{x:0,y:0},viewSize:{x:1280,y:720},viewPort:{x:0,y:0,w:0,h:0},...o},o),ee("board",v),ee("settings",z);let y=je("draw");oe(i,y,f=>e(3,l=f)),ee("mode",y);let L,I={init:{x:0,y:0},curr:{x:0,y:0},offset:{x:0,y:0}},t={init:{x:0,y:0},curr:{x:0,y:0},offset:{x:0,y:0},pos:{x:0,y:0},size:{x:0,y:0}};function H(f,O){return{x:f-o.viewPort.x,y:O-o.viewPort.y+window.scrollY}}function Ie(){document.body.classList.add("drawing"),M("drawStart")}function ue(){document.body.classList.remove("drawing"),document.removeEventListener("mousemove",$),document.removeEventListener("touchmove",$),e(14,t={init:{x:0,y:0},curr:{x:0,y:0},offset:{x:0,y:0},pos:{x:0,y:0},size:{x:0,y:0}})}function ae(){document.body.classList.remove("panning"),document.removeEventListener("mousemove",Z),document.removeEventListener("touchmove",Z),M("panEnd",{offset:o.viewOffset})}function Ye(){M("selectStart"),document.body.classList.add("selecting"),document.addEventListener("mousemove",Q)}function ce(){document.body.classList.remove("selecting"),document.removeEventListener("mousemove",Q)}function Xe(f){if(f.ctrlKey){if(f.preventDefault(),f.stopPropagation(),!u.CAN_ZOOM)return;k(y,l="zoom",l);const O=o.viewOffset.x+f.clientX/o.zoom,b=o.viewOffset.y+f.clientY/o.zoom,h=f.deltaY,x=V(o.zoom-h/500,.1,1.9);k(v,o.zoom=x,o);const D=o.viewOffset.x+f.clientX/x,S=o.viewOffset.y+f.clientY/x,X=O-D,P=b-S;k(v,o.viewOffset={x:o.viewOffset.x+X,y:o.viewOffset.y+P},o)}else{if(re(f.target,"tela-ignore"))return;f.preventDefault(),f.stopPropagation();const O=f.deltaX,b=f.deltaY,h=V(o.viewOffset.x+O,u.BOUNDS.minX!==null?u.BOUNDS.minX:-1/0,u.BOUNDS.maxX!==null?u.BOUNDS.maxX-window.innerWidth:1/0),x=V(o.viewOffset.y+b,u.BOUNDS.minY!==null?u.BOUNDS.minY:-1/0,u.BOUNDS.maxY!==null?u.BOUNDS.maxY-window.innerHeight:1/0);k(v,o.viewOffset={x:h,y:x},o),qe("remove_trackpad_panning",100,()=>document.body.classList.remove("panning"))}M("zoomEnd",{zoom:o.zoom})}function Pe(f){f.shiftKey?y.set("select"):f.metaKey&&y.set("pan")}function Ue(f){!f.shiftKey&&!f.metaKey&&(l==="draw"&&ue(),(l==="pan"||l==="panning")&&ae(),l==="select"&&ce(),y.set("draw"))}function Be(f){var x,D,S,X,P,de,me;const O=((D=(x=f.targetTouches)==null?void 0:x.item(0))==null?void 0:D.target)||f.target,{x:b,y:h}=H(((X=(S=f.targetTouches)==null?void 0:S.item(0))==null?void 0:X.clientX)||f.clientX,((de=(P=f.targetTouches)==null?void 0:P.item(0))==null?void 0:de.clientY)||f.clientY);re(O,"tela-ignore")||((l==="pan"||((me=f.targetTouches)==null?void 0:me.length)===1)&&y.set("panning"),l==="draw"?(f.stopPropagation(),Ie(),e(14,t.init={x:b,y:h},t),e(14,t.curr={x:b,y:h},t),e(14,t.pos={x:b,y:h},t),e(14,t.size={x:0,y:0},t),document.addEventListener("mousemove",$),document.addEventListener("mouseup",K,{once:!0})):l==="panning"?(f.stopPropagation(),Qe(),I.init={x:b,y:h},I.curr={x:b,y:h},document.addEventListener("mousemove",Z),document.addEventListener("mouseup",K,{once:!0}),document.addEventListener("touchmove",Z),document.addEventListener("touchend",K,{once:!0})):l==="select"&&(f.stopPropagation(),Ye(),e(14,t.init={x:b,y:h},t),e(14,t.curr={x:b,y:h},t),e(14,t.pos={x:b,y:h},t),e(14,t.size={x:0,y:0},t),document.addEventListener("mousemove",Q),document.addEventListener("mouseup",K,{once:!0})))}function Z(f){var D,S,X,P;const{x:O,y:b}=H(((S=(D=f.targetTouches)==null?void 0:D.item(0))==null?void 0:S.clientX)||f.clientX,((P=(X=f.targetTouches)==null?void 0:X.item(0))==null?void 0:P.clientY)||f.clientY);I.offset={x:Math.floor(O-I.curr.x),y:Math.floor(b-I.curr.y)},I.curr={x:O,y:b};const h=V(o.viewOffset.x-I.offset.x,u.BOUNDS.minX!==null?u.BOUNDS.minX:-1/0,u.BOUNDS.maxX!==null?u.BOUNDS.maxX-window.innerWidth:1/0),x=V(o.viewOffset.y-I.offset.y,u.BOUNDS.minY!==null?u.BOUNDS.minY:-1/0,u.BOUNDS.maxY!==null?u.BOUNDS.maxY-window.innerHeight:1/0);k(v,o.viewOffset={x:h,y:x},o)}function Q(f){var h,x,D,S;const{x:O,y:b}=H(((x=(h=f.targetTouches)==null?void 0:h.item(0))==null?void 0:x.clientX)||f.clientX,((S=(D=f.targetTouches)==null?void 0:D.item(0))==null?void 0:S.clientY)||f.clientY);e(14,t.offset={x:-Math.floor(t.init.x-t.curr.x),y:-Math.floor(t.init.y-t.curr.y)},t),e(14,t.pos.x=t.init.x,t),e(14,t.pos.y=t.init.y,t),e(14,t.size.x=t.offset.x/o.zoom,t),e(14,t.size.y=t.offset.y/o.zoom,t),t.size.x<0&&(e(14,t.size.x=Math.abs(t.offset.x/o.zoom),t),e(14,t.pos.x=t.init.x-t.size.x*o.zoom,t)),t.size.y<0&&(e(14,t.size.y=Math.abs(t.offset.y/o.zoom),t),e(14,t.pos.y=t.init.y-t.size.y*o.zoom,t)),e(14,t.curr={x:O,y:b},t),M("selectMove",{selectState:t})}function $(f){var h,x,D,S;const{x:O,y:b}=H(((x=(h=f.targetTouches)==null?void 0:h.item(0))==null?void 0:x.clientX)||f.clientX,((S=(D=f.targetTouches)==null?void 0:D.item(0))==null?void 0:S.clientY)||f.clientY);e(14,t.offset={x:-Math.floor(t.init.x-t.curr.x),y:-Math.floor(t.init.y-t.curr.y)},t),e(14,t.pos.x=t.init.x,t),e(14,t.pos.y=t.init.y,t),e(14,t.size.x=t.offset.x/o.zoom,t),e(14,t.size.y=t.offset.y/o.zoom,t),t.size.x<0&&(e(14,t.size.x=Math.abs(t.offset.x/o.zoom),t),e(14,t.pos.x=t.init.x-t.size.x*o.zoom,t)),t.size.y<0&&(e(14,t.size.y=Math.abs(t.offset.y/o.zoom),t),e(14,t.pos.y=t.init.y-t.size.y*o.zoom,t)),e(14,t.curr={x:O,y:b},t)}function K(f){l==="draw"?(M("drawEnd",{selection:{pos:t.pos,size:t.size}}),ue()):l==="panning"?(k(y,l="pan",l),ae()):l==="select"&&(ce(),M("selectEnd",{selectState:t}),e(14,t={init:{x:0,y:0},curr:{x:0,y:0},offset:{x:0,y:0},pos:{x:0,y:0},size:{x:0,y:0}}))}Re(()=>{const f=L.getBoundingClientRect();k(v,o.viewPort={x:f.x,y:f.y,w:f.right-f.left,h:f.bottom-f.top},o)});function Ce(f){Ve[f?"unshift":"push"](()=>{L=f,e(4,L)})}return i.$$set=f=>{"settings"in f&&p(e(0,z=f.settings)),"board"in f&&a(e(1,v=f.board)),"$$scope"in f&&e(15,_=f.$$scope)},i.$$.update=()=>{i.$$.dirty&4&&e(7,n=`transform-origin: top left; transform: scale(${o.zoom}) translate(${-o.viewOffset.x}px, ${-o.viewOffset.y}px);`),i.$$.dirty&16388&&e(6,r=`transform: translate(${o.viewOffset.x+t.pos.x/o.zoom}px, ${o.viewOffset.y+t.pos.y/o.zoom}px); width: ${Math.round(t.size.x)}px; height: ${Math.round(t.size.y)}px;`),i.$$.dirty&8&&e(5,m=`cursor: ${l==="draw"?"crosshair":l==="select"?"default":l==="pan"?"grab":l==="panning"?"grabbing":"crosshair"};`)},[z,v,o,l,L,m,r,n,u,y,Xe,Pe,Ue,Be,t,_,d,Ce]}class it extends Se{constructor(s){super(),Ee(this,s,$e,Je,fe,{settings:0,board:1})}}function De(i){let s,e,n,r;const m=i[12].default,o=Me(m,i,i[11],null);let c=[i[6],{class:e="positionable "+(i[6].class||"")},{style:n=i[3]+" "+(i[6].style||"")}],a={};for(let l=0;l<c.length;l+=1)a=le(a,c[l]);return{c(){s=B("div"),o&&o.c(),this.h()},l(l){s=C(l,"DIV",{class:!0,style:!0});var u=T(s);o&&o.l(u),u.forEach(w),this.h()},h(){be(s,a),ge(s,"svelte-1p7nrv8",!0)},m(l,u){Y(l,s,u),o&&o.m(s,null),r=!0},p(l,u){o&&o.p&&(!r||u&2048)&&Le(o,m,l,l[11],r?Ne(m,l[11],u,null):ke(l[11]),null),be(s,a=Ze(c,[u&64&&l[6],(!r||u&64&&e!==(e="positionable "+(l[6].class||"")))&&{class:e},(!r||u&72&&n!==(n=l[3]+" "+(l[6].style||"")))&&{style:n}])),ge(s,"svelte-1p7nrv8",!0)},i(l){r||(W(o,l),r=!0)},o(l){J(o,l),r=!1},d(l){l&&w(s),o&&o.d(l)}}}function et(i){let s,e,n=(i[0]===void 0?!i[1].CULL||i[2]:!i[0]||i[2])&&De(i);return{c(){n&&n.c(),s=pe()},l(r){n&&n.l(r),s=pe()},m(r,m){n&&n.m(r,m),Y(r,s,m),e=!0},p(r,[m]){(r[0]===void 0?!r[1].CULL||r[2]:!r[0]||r[2])?n?(n.p(r,m),m&7&&W(n,1)):(n=De(r),n.c(),W(n,1),n.m(s.parentNode,s)):n&&(Ae(),J(n,1,1,()=>{n=null}),We())},i(r){e||(W(n),e=!0)},o(r){J(n),e=!1},d(r){r&&w(s),n&&n.d(r)}}}function tt(i,s,e){let n,r;const m=["pos","size","z","cull"];let o=_e(s,m),c,a,{$$slots:l={},$$scope:u}=s,{pos:g}=s,{size:p}=s,{z:d=1}=s,{cull:_=void 0}=s;const z=he("board");oe(i,z,y=>e(10,c=y));const v=he("settings");oe(i,v,y=>e(1,a=y));function M(y,L={x:620,y:340}){return Fe()&&(L.x=window.innerWidth,L.y=window.innerHeight),g.x>y.x-a.CULL_MARGIN&&g.y>y.y-a.CULL_MARGIN&&g.x+p.x<y.x+a.CULL_MARGIN+L.x/c.zoom&&g.y+p.y<y.y+a.CULL_MARGIN+L.y/c.zoom}return i.$$set=y=>{s=le(le({},s),He(y)),e(6,o=_e(s,m)),"pos"in y&&e(7,g=y.pos),"size"in y&&e(8,p=y.size),"z"in y&&e(9,d=y.z),"cull"in y&&e(0,_=y.cull),"$$scope"in y&&e(11,u=y.$$scope)},i.$$.update=()=>{i.$$.dirty&898&&e(3,n=`transform: translate3d(${a.SNAP_TO_GRID?j(g.x,a.GRID_SIZE):g.x}px, ${a.SNAP_TO_GRID?j(g.y,a.GRID_SIZE):g.y}px, 0); width: ${a.SNAP_TO_GRID?j(p.x,a.GRID_SIZE):p.x}px; height: ${a.SNAP_TO_GRID?j(p.y,a.GRID_SIZE):p.y}px; z-index: ${d};`),i.$$.dirty&1024&&e(2,r=M(c.viewOffset))},[_,a,r,n,z,v,o,g,p,d,c,u,l]}class st extends Se{constructor(s){super(),Ee(this,s,tt,et,fe,{pos:7,size:8,z:9,cull:0})}}st.__docgen={version:3,name:"Positionable.svelte",data:[{visibility:"public",description:null,keywords:[],name:"pos",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"any",type:"any"}},{visibility:"public",description:null,keywords:[],name:"size",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"any",type:"any"}},{visibility:"public",description:null,keywords:[],name:"z",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"number",type:"number"},defaultValue:1},{visibility:"public",description:null,keywords:[],name:"cull",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"any",type:"any"}}],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};export{it as B,st as P,re as h,j as s,je as w};
2 | //# sourceMappingURL=Positionable-6a060a99.js.map
3 | 


--------------------------------------------------------------------------------
/docs/assets/WithTooltip-J57HCPYA-92c5e8bc.js:
--------------------------------------------------------------------------------
1 | import{W as T,W as e,a as h}from"./index-284f7455.js";import"./iframe-4aada8c6.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-de833af9.js";import"./index-d37d4223.js";import"./index-e04ae519.js";import"./index-356e4a49.js";export{T as WithToolTipState,e as WithTooltip,h as WithTooltipPure};
2 | //# sourceMappingURL=WithTooltip-J57HCPYA-92c5e8bc.js.map
3 | 


--------------------------------------------------------------------------------
/docs/assets/WithTooltip-J57HCPYA-92c5e8bc.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"WithTooltip-J57HCPYA-92c5e8bc.js","sources":[],"sourcesContent":[],"names":[],"mappings":""}


--------------------------------------------------------------------------------
/docs/assets/index-cd3423c8.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"index-cd3423c8.js","sources":[],"sourcesContent":[],"names":[],"mappings":""}


--------------------------------------------------------------------------------
/docs/assets/preview-15573006.js:
--------------------------------------------------------------------------------
1 | import{_ as e}from"./iframe-4aada8c6.js";import"../sb-preview/runtime.js";var a={docs:{renderer:async()=>{let{DocsRenderer:r}=await e(()=>import("./DocsRenderer-3PUGWF3O-20913e3a.js"),["./DocsRenderer-3PUGWF3O-20913e3a.js","./iframe-4aada8c6.js","./index-284f7455.js","./_commonjsHelpers-de833af9.js","./index-d37d4223.js","./index-e04ae519.js","./index-356e4a49.js"],import.meta.url);return new r}}};export{a as parameters};
2 | //# sourceMappingURL=preview-15573006.js.map
3 | 


--------------------------------------------------------------------------------
/docs/assets/syntaxhighlighter-PONEFOSF-e9522a55.js:
--------------------------------------------------------------------------------
1 | import{S as s,c,s as l}from"./index-284f7455.js";import"./iframe-4aada8c6.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-de833af9.js";import"./index-d37d4223.js";import"./index-e04ae519.js";import"./index-356e4a49.js";export{s as SyntaxHighlighter,c as createCopyToClipboardFunction,l as default};
2 | //# sourceMappingURL=syntaxhighlighter-PONEFOSF-e9522a55.js.map
3 | 


--------------------------------------------------------------------------------
/docs/assets/syntaxhighlighter-PONEFOSF-e9522a55.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"syntaxhighlighter-PONEFOSF-e9522a55.js","sources":[],"sourcesContent":[],"names":[],"mappings":""}


--------------------------------------------------------------------------------
/docs/assets/tela-c608b082.js.map:
--------------------------------------------------------------------------------
1 | {"version":3,"file":"tela-c608b082.js","sources":["../../src/stories/tela.mdx"],"sourcesContent":["import { Meta, Source, ArgTypes, Canvas, Story } from \"@storybook/blocks\";\n\n<Meta title=\"Tela\" />\n\n<p align=\"center\">\n  <a href=\"https://github.com/deta/tela\">\n    <img src=\"https://github.com/deta/tela/blob/main/dingo.png?raw=true\" alt=\"Tela Logo\" width=\"80\" height=\"80\" />\n  </a>\n\n\n<h1 align=\"center\"><i>Tela</i></h1>\n\n<p align=\"center\">\n    A declarative, easy to use, infinite canvas library for svelte using native DOM elements.\n</p>\n</p>\n<br/>\n<br/>\n\n\n\n## ⚡️ TL;DR\n\nTela is a declarative svelte library for creating infinite canvases, positioning elements on them, and handling all canvas related logic like moving elements, dragging, panning etc.\nThis is achieved using only native DOM elements so that you can use any existing HTML, CSS, JS component inside a canvas.\n\nTo get started, follow the steps below or checkout the [examples](src/routes/examples) under `/src/routes/examples` to see how tela integrates in a real app.\n\n## Getting Started\n\nAdd the package to your project using the package manager of your choice:\n\n> **❗️ Currently, don't forget to manually build tela as installing it from github does only ship the source files. Also, if you are using `npm` the installation might take a very long time for some reason.**\n\n<Source language=\"bash\" code={`\nbun i deta/tela && cd ./node_modules/@deta/tela && bun i && bun run package\n\npnpm i deta/tela && cd ./node_modules/@deta/tela && pnpm i --no-optional && pnpm run package\n\nyarn add deta/tela && cd ./node_modules/@deta/tela && yarn install --ignore-optional && yarn run package\n\nnpm i deta/tela && cd ./node_modules/@deta/tela && npm i --no-optional && npm run package\n`} />\n\nImport the components & setup the board data:\n\n<Source language=\"html\" code={`\n<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import type { TBoard, TBoardSettings } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  const settings = writable({} satisfies TBoardSettings);\n  const board = writable({} satisfies TBoard);\n</script>\n`} />\n\nCreate a fullscreen board & place some items on it:\n\n<Source language=\"html\" code={`\n<main>\n  <Board {settings} {board}>\n    <Positionable pos={{ x: 10, y: 10 }} size={{ x: 400, y: 300 }} z={1}>\n      Hello, I am tela.\n    </Positionable>\n\n    <Positionable pos={{ x: 200, y: 150 }} size={{ x: 400, y: 300 }} z={1}>\n      Try moving the canvas around with the trackpad or by using META + Left Mouse.\n    </Positionable>\n  </Board>\n</main>\n\n<style>\n  main {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n</style>\n`} />\n\n## Components\n\n### Board\n\nThe board is the main component of tela. It is the container for all other components and handles all the logic for panning, zooming etc. It can be configured using the settings prop, and exposes a board prop, which contains all the information about the current state of the board like the zoom factor or the view offset.\n\nTo get a board up and running you need to create two writable stores which will be passed into the board. They can be empty to use the defaults or already provide a state to the board. This can be used to save the state of the board to local storage or in a database so that the user can continue where they left off.\n\nIn this example we also wrap the board in an element that takes up the whole screen, but it would also be possible to just embedd the board in the normal flow of a html page.\n\n> 💡 The board itself does not have a set dimensions. It tries to take up 100% of the available height & width. If you don't see your board, try setting a specific height on its container element.\n\n<Source language=\"html\" code={`\n<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import type { TBoard, TBoardSettings } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  const settings = writable({} satisfies TBoardSettings); // <- used to configure the board\n  const board = writable({ viewOffset: { x: 0, y: 0 }, zoom: 1 } satisfies TBoard); // <- determines the initial state of the board\n</script>\n\n<main>\n  <Board {settings} {board}> </Board>\n</main>\n\n<style>\n  main {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n</style>\n`} />\n\n#### Board Props\n\n##### `settings`\n\n<Source language=\"typescript\" code={`\n{\n  // Whether users can draw on the board.\n  CAN_DRAW?: boolean;\n  // Whether users can select on the board.\n  CAN_SELECT?: boolean;\n  // Whether users can pan the board manually.\n  CAN_PAN?: boolean;\n  // Whether users can zoom.\n  CAN_ZOOM?: boolean;\n\n  // Whether Positionables should snap to the grid.\n  SNAP_TO_GRID?: boolean;\n  // Grid size for snapping\n  GRID_SIZE?: number;\n\n  BOUNDS?: {\n    // null: no boundary | n: boundary at n\n    minX: number | null;\n    // null: no boundary | n: boundary at n\n    maxX: number | null;\n    // null: no boundary | n: boundary at n\n    minY: number | null;\n    // null: no boundary | n: boundary at n\n    maxY: number | null;\n    // null: minZoom = 0 | n: minZoom at n\n    minZoom: number | null;\n    // null: maxZoom = 0 | n: maxZoom at n\n    maxZoom: number | null;\n    // hard: movement will be blocked past boundary | soft: movement will be allowed past boundary, but position will be snapped to boundary on end of drag\n    limit: \"hard\" | \"soft\";\n  };\n\n  // Whether to only render positionables in viewport (set to false if you have issue with component lifecycle)\n  CULL?: boolean;\n  // Margin around viewport to make panning smooth\n  CULL_MARGIN?: number;\n\n  // Dev / debug overlays\n  DEV: {\n    SHOW_POS: boolean;\n    SHOW_MODE: boolean;\n  };\n}\n`} />\n\n##### `board`\n\nInitial state of the board.\n\n<Source language=\"typescript\" code={`\n{\n  // X, Y offset on the board\n  viewOffset: Vec2;\n  // Size -> Currently mostly irreleant\n  viewSize: Vec2;\n  // Store viewport position in case container el is not full window\n  viewPort: Vec4;\n  // Current zoom factor\n  zoom: number;\n}\n`} />\n\n### Positionable\n\nAny element placed on the board must be wrapped in a Positionable component. This component handles the positioning of the element on the board whilst panning and zooming.\n\nThe example below illustrates how a Positionable component can be used to place an element on the board:\n\n<Source language=\"html\" code={`\n<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import type { TBoard, TBoardSettings } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  const settings = writable({} satisfies TBoardSettings); // <- used to configure the board\n  const board = writable({ viewOffset: { x: 0, y: 0 }, zoom: 1 } satisfies TBoard); // <- determines the initial state of the board\n</script>\n\n<main>\n  <Board {settings} {board}>\n    <Positionable pos={{ x: 0, y: 0 }} size={{ x: 0, y: 0}} z={1}>\n      I am a positionable element.\n    </Positionable>\n  </Board>\n</main>\n\n<style>\n  main {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n</style>\n`} />\n\nIf you want to dynamically render multiple elements on the board, you can simply store their state in some array and use svelte's each directive:\n\n<Source language=\"html\" code={`\n<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import type { TBoard, TBoardSettings } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  const settings = writable({} satisfies TBoardSettings); // <- used to configure the board\n  const board = writable({ viewOffset: { x: 0, y: 0 }, zoom: 1 } satisfies TBoard); // <- determines the initial state of the board\n\n  const elements: { pos: { x: number, y: number }, size: { x: number, y: number} }[] = [\n    { pos: { x: 0, y: 0 }, size: { x: 150, y: 150} },\n    { pos: { x: 400, y: 400 }, size: { x: 400, y: 300} }\n  ];\n</script>\n\n<main>\n  <Board {settings} {board}>\n    {#each elements as element}\n      <Positionable pos={element.pos} size={element.size} z={1}>\n        I am a positionable element.\n      </Positionable>\n    {/each}\n  </Board>\n</main>\n\n<style>\n  main {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n</style>\n`} />\n\n### Draggable\n\nA draggable element can be used inside of a Positionable element to enable moving it around the board:\n\n> 💡 Notice, that we need to use the bind: directive for the pos & size props, as the changes handled inside the Draggable component need to be applied to the state of the Positionable component as well.\n\n<Source language=\"html\" code={`\n<script lang=\"ts\">\n  import Board from \"$lib/Board.svelte\";\n  import Positionable from \"$lib/Positionable.svelte\";\n  import Draggable from \"$lib/Draggable.svelte\";\n  import type { TBoard, TBoardSettings } from \"$lib/index.js\";\n  import { writable } from \"svelte/store\";\n\n  const settings = writable({} satisfies TBoardSettings); // <- used to configure the board\n  const board = writable({ viewOffset: { x: 0, y: 0 }, zoom: 1 } satisfies TBoard); // <- determines the initial state of the board\n\n  const element = { pos: { x: 0, y: 0 }, size: { x: 150, y: 150} };\n</script>\n\n<main>\n  <Board {settings} {board}>\n    <Positionable pos={element.pos} size={element.size} z={1}>\n      <Draggable bind:pos={element.pos} bind:size={element.size}>\n      drag here.\n      </Draggable>\n      I am a positionable element.\n    </Positionable>\n  </Board>\n</main>\n\n<style>\n  main {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n</style>\n`} />\n\n### Resizable\n\ntodo\n\n### Grid\n\nThe Grid component can be placed inside a board to display an infinite background grid. Just place the Grid component inside a Board component and use the props to adjust the stlying.\n\n> 💡 The grid gap itself is derived from the board's GRID_SIZE setting.\n\n<Source language=\"html\" code={`\n...\n<Board ...>\n  <Grid dotColor=\"black\" dotOpacity={30} dotSize={1}/>\n</Board>\n...\n`} />\n\n#### Grid Props\n- `dotColor`: string    | css color for dots.\n- `dotOpacity`: number  | opacity (0-100)\n- `dotSize`: number     | size\n\n## Styling\n\nStyling tela components can be done in 3 different ways (example code below):\n\n1. Style the default tela class (e.g. `.positionable` for positionable elements).\n2. Add a custom class to the element and style it in the css style block.\n3. Add inline styles to the element.\n\n> 💡 If you are using classes for styling, make sure to either use the `:global(.yourClassName) {}` selector or an external stylesheet. Otherwise, the styles will be scoped to your component and will not be applied to the actual tela element underneath.\n\nTela also provides a default stylesheet which you can import into your project. This stylesheet contains some sensible default like mouse cursors indicating the current mode, or the selection rectangle.\nYou can use this stylesheet by importing it into your svelte file (todo: adjust path):\n\n<Source language=\"html\" code={`\n<script>\n  import \"@deta/tela/dist/tela.css\";\n  ...\n</script>\n`} />\n\n### Global classes\n\nTela adds a few default classes to its elements, so you can start styling them right away. These classes are:\n\n- `tela-container`: The container element of a board.\n- `board`: The board element inside the container.\n- `positionable`: A positionable element inside the board.\n- `draggable`: A draggable element inside the board.\n- `resizable`: A resizable element inside the board.\n\n- `selection-rect`: the rectangle beeing drawn whilst dragging in the `draw` or `selecting` mode.\n\nSome additional classes are added to the body, which can be used to apply styling depending on the current state (e.g. mouse cursor). These are:\n\n- `body.drawing`\n- `body.panning`\n- `body.selecting`\n\nView the [Styling example](/todo) for a complete example.\n"],"names":["_createMdxContent","props","_components","_provideComponents","_jsxs","_Fragment","_jsx","Meta","Source","MDXContent","MDXLayout"],"mappings":"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"}


--------------------------------------------------------------------------------
/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@deta/tela",
 3 |   "version": "3.1.0",
 4 |   "author": {
 5 |     "name": "Maximilian Heidenreich"
 6 |   },
 7 |   "homepage": "http://deta.github.io/tela",
 8 |   "license": "MIT",
 9 |   "scripts": {
10 |     "dev": "vite dev",
11 |     "build": "vite build && npm run package",
12 |     "preview": "vite preview",
13 |     "package": "svelte-kit sync && svelte-package",
14 |     "watch:package": "svelte-kit sync && svelte-package --watch",
15 |     "prepublishOnly": "npm run package",
16 |     "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
17 |     "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
18 |     "lint": "prettier --plugin-search-dir . --check .",
19 |     "format": "prettier --plugin-search-dir . --write .",
20 |     "pub": "pnpm publish --no-git-checks --access public"
21 |   },
22 |   "exports": {
23 |     ".": "./dist/index.js"
24 |   },
25 |   "files": [
26 |     "dist",
27 |     "!dist/**/*.test.*",
28 |     "!dist/**/*.spec.*"
29 |   ],
30 |   "peerDependencies": {
31 |     "svelte": "^4.0.0"
32 |   },
33 |   "devDependencies": {
34 |     "gh-pages": "^6.0.0",
35 |     "prettier": "^2.8.0",
36 |     "prettier-plugin-svelte": "^2.10.1",
37 |     "@sveltejs/adapter-node": "^1.3.1",
38 |     "@sveltejs/kit": "^1.20.4",
39 |     "@sveltejs/package": "^2.0.0",
40 |     "svelte": "^4.2.2",
41 |     "svelte-check": "^3.4.3",
42 |     "typescript": "^5.0.0",
43 |     "publint": "^0.1.9",
44 |     "vite": "^4.4.2"
45 |   },
46 |   "svelte": "./dist/index.js",
47 |   "types": "./dist/index.d.ts",
48 |   "type": "module"
49 | }
50 | 


--------------------------------------------------------------------------------
/src/app.css:
--------------------------------------------------------------------------------
1 | * {
2 |   box-sizing: border-box;
3 | }
4 | 
5 | html, body {
6 |   margin: 0;
7 |   padding: 0;
8 |   font-family: "system-ui", sans-serif;
9 | }


--------------------------------------------------------------------------------
/src/app.d.ts:
--------------------------------------------------------------------------------
 1 | // See https://kit.svelte.dev/docs/types#app
 2 | // for information about these interfaces
 3 | declare global {
 4 | 	namespace App {
 5 | 		// interface Error {}
 6 | 		// interface Locals {}
 7 | 		// interface PageData {}
 8 | 		// interface Platform {}
 9 | 	}
10 | }
11 | 
12 | export {};
13 | 


--------------------------------------------------------------------------------
/src/app.html:
--------------------------------------------------------------------------------
 1 | <!DOCTYPE html>
 2 | <html lang="en">
 3 |   <head>
 4 |     <meta charset="utf-8" />
 5 |     <link rel="icon" href="%sveltekit.assets%/favicon.png" />
 6 |     <meta name="viewport" content="width=device-width, initial-scale=1" />
 7 |     %sveltekit.head%
 8 |   </head>
 9 |   <body data-sveltekit-preload-data="hover">
10 |     <div style="display: contents">%sveltekit.body%</div>
11 |   </body>
12 | </html>
13 | 


--------------------------------------------------------------------------------
/src/lib/ChunkOverlay.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import { randomCssColor } from "./utils.js";
 3 |   import type { IBoardSettings } from "./types/Board.type.js";
 4 |   import { getContext } from "svelte";
 5 |   import type { Writable } from "svelte/store";
 6 | 
 7 |   export let chunkX: number;
 8 |   export let chunkY: number;
 9 | 
10 |   const settings = getContext<Writable<IBoardSettings>>("settings");
11 |   const CHUNK_WIDTH = $settings.CHUNK_WIDTH;
12 |   const CHUNK_HEIGHT = $settings.CHUNK_HEIGHT;
13 | 
14 |   const transformCss = `left: ${chunkX * CHUNK_WIDTH}px; top: ${
15 |     chunkY * CHUNK_HEIGHT
16 |   }px; width: ${CHUNK_WIDTH}px; height: ${CHUNK_HEIGHT}px; background: ${randomCssColor(0.5)}; pointer-events:none; z-index: -1;`;
17 | </script>
18 | 
19 | <svelte:options immutable={true} />
20 | 
21 | <div class="chunk" style={transformCss}>
22 |   <pre>{chunkX} : {chunkY}</pre>
23 | </div>
24 | 
25 | <style>
26 |   .chunk {
27 |     position: absolute;
28 |     pointer-events: none;
29 |     transform: translateZ(0);
30 |     backface-visibility: hidden;
31 |     contain: strict;
32 |   }
33 | </style>
34 | 


--------------------------------------------------------------------------------
/src/lib/DebugPanel.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import { onDestroy, onMount } from "svelte";
  3 |   import type { Writable } from "svelte/store";
  4 | 
  5 |   export let name: string;
  6 |   export let fg: string;
  7 |   export let bg: string;
  8 |   export let value: Writable<{ value: number; maxValue: number }>;
  9 | 
 10 |   let canvasEl: HTMLCanvasElement;
 11 |   let context: CanvasRenderingContext2D;
 12 | 
 13 |   let min = Infinity,
 14 |     max = 0,
 15 |     round = Math.round;
 16 |   let PR: number;
 17 | 
 18 |   let WIDTH: number;
 19 |   let HEIGHT: number;
 20 |   let TEXT_X: number;
 21 |   let TEXT_Y: number;
 22 |   let GRAPH_X: number;
 23 |   let GRAPH_Y: number;
 24 |   let GRAPH_WIDTH: number;
 25 |   let GRAPH_HEIGHT: number;
 26 | 
 27 |   function update(value: number, maxValue: number) {
 28 |     min = Math.min(min, value);
 29 |     max = Math.max(max, value);
 30 | 
 31 |     context.fillStyle = bg;
 32 |     context.globalAlpha = 1;
 33 |     context.fillRect(0, 0, WIDTH, GRAPH_Y);
 34 |     context.fillStyle = fg;
 35 |     context.fillText(
 36 |       round(value) + " " + name + " (" + round(min) + "-" + round(max) + ")",
 37 |       TEXT_X,
 38 |       TEXT_Y
 39 |     );
 40 | 
 41 |     context.drawImage(
 42 |       canvasEl,
 43 |       GRAPH_X + PR,
 44 |       GRAPH_Y,
 45 |       GRAPH_WIDTH - PR,
 46 |       GRAPH_HEIGHT,
 47 |       GRAPH_X,
 48 |       GRAPH_Y,
 49 |       GRAPH_WIDTH - PR,
 50 |       GRAPH_HEIGHT
 51 |     );
 52 | 
 53 |     context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
 54 | 
 55 |     context.fillStyle = bg;
 56 |     context.globalAlpha = 0.9;
 57 |     context.fillRect(
 58 |       GRAPH_X + GRAPH_WIDTH - PR,
 59 |       GRAPH_Y,
 60 |       PR,
 61 |       round((1 - value / maxValue) * GRAPH_HEIGHT)
 62 |     );
 63 |   }
 64 |   onDestroy(value.subscribe((v) => {
 65 |     if (canvasEl) update(v.value, v.maxValue)
 66 |   }));
 67 | 
 68 |   onMount(() => {
 69 |     PR = round(window.devicePixelRatio || 1);
 70 |     WIDTH = 80 * PR;
 71 |     HEIGHT = 48 * PR;
 72 |     TEXT_X = 3 * PR;
 73 |     TEXT_Y = 2 * PR;
 74 |     GRAPH_X = 3 * PR;
 75 |     GRAPH_Y = 15 * PR;
 76 |     GRAPH_WIDTH = 74 * PR;
 77 |     GRAPH_HEIGHT = 30 * PR;
 78 | 
 79 |     canvasEl.width = WIDTH;
 80 |     canvasEl.height = HEIGHT;
 81 |     canvasEl.style.cssText = "width:80px;height:48px";
 82 |     context = canvasEl.getContext("2d")!;
 83 |     context.font = "bold " + 9 * PR + "px Helvetica,Arial,sans-serif";
 84 |     context.textBaseline = "top";
 85 | 
 86 |     context.fillStyle = bg;
 87 |     context.fillRect(0, 0, WIDTH, HEIGHT);
 88 | 
 89 |     context.fillStyle = fg;
 90 |     context.fillText(name, TEXT_X, TEXT_Y);
 91 |     context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
 92 | 
 93 |     context.fillStyle = bg;
 94 |     context.globalAlpha = 0.9;
 95 |     context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
 96 | 
 97 |     // setInterval(() => {
 98 |     //   update(Math.random(), 1);
 99 |     // }, 100)
100 |   });
101 | </script>
102 | 
103 | <canvas bind:this={canvasEl}/>
104 | 


--------------------------------------------------------------------------------
/src/lib/DebugPanels.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import { writable } from "svelte/store";
  3 |   import DebugPanel from "./DebugPanel.svelte";
  4 |   import { onDestroy, onMount } from "svelte";
  5 |   import { fps, memory } from "./debugUtils.js";
  6 | 
  7 |   let vFPS = writable({ value: 0, maxValue: 0 });
  8 |   let vMS = writable({ value: 0, maxValue: 0 });
  9 |   let vMB = writable({ value: 0, maxValue: 0 });
 10 | 
 11 |   let beginTime: number;
 12 |   let prevTime: number;
 13 |   let frames = 0;
 14 | 
 15 |   const _fps = fps();
 16 |   const { supported, result: _mem } = memory()
 17 | 
 18 |   function begin() {
 19 |     beginTime = (performance || Date).now();
 20 |   }
 21 |   function end(): number {
 22 |     frames++;
 23 |     const time = (performance || Date).now();
 24 | 
 25 |     vMS.update((v) => {
 26 |       v.value = time - beginTime;
 27 |       v.maxValue = 200;
 28 |       return v;
 29 |     });
 30 | 
 31 |     if (time >= prevTime + 1000) {
 32 |       vFPS.update((v) => {
 33 |         v.value = (frames * 1000) / (time - prevTime);
 34 |         v.maxValue = 100;
 35 |         return v;
 36 |       });
 37 | 
 38 |       prevTime = time;
 39 |       frames = 0;
 40 | 
 41 |       let memory = performance.memory;
 42 |       vFPS.update((v) => {
 43 |         v.value = memory.usedJSHeapSize / 1048576;
 44 |         v.maxValue = memory.jsHeapSizeLimit / 1048576;
 45 |         return v;
 46 |       });
 47 |     }
 48 | 
 49 |     return time;
 50 |   }
 51 |   function update() {
 52 |     frames++;
 53 |     beginTime = end();
 54 |   }
 55 | 
 56 |   function f() {
 57 |     // begin();
 58 |     // end();
 59 |     // end()
 60 | 
 61 |     requestAnimationFrame(f);
 62 |   }
 63 | 
 64 |   onMount(() => {
 65 |     beginTime = (performance || Date).now();
 66 |     prevTime = beginTime;
 67 |     // f();
 68 |   });
 69 |   onDestroy(
 70 |     _fps.subscribe((val) => {
 71 |       vFPS.update((v) => {
 72 |         v.value = val;
 73 |         v.maxValue = 125;
 74 |         return v;
 75 |       });
 76 |     })
 77 |   );
 78 |   onDestroy(
 79 |     _mem.subscribe((val) => {
 80 |       vMB.update((v) => {
 81 |         v.value = val?.usedJSHeapSize / 1048576;
 82 |         v.maxValue = 100//val?.jsHeapSizeLimit / 1048576;
 83 |         return v;
 84 |       });
 85 |     })
 86 |   );
 87 | </script>
 88 | 
 89 | <svelte:options immutable={true} />
 90 | 
 91 | <li style="display: flex; justify-content: end;">
 92 |   <DebugPanel name="FPS" fg="#0ff" bg="#002" value={vFPS} />
 93 |   <!-- <DebugPanel name="MS" fg="#0f0" bg="#020" value={vMS} /> -->
 94 |   <DebugPanel name="MB" fg="#f08" bg="#201" value={vMB} />
 95 | </li>
 96 | <!-- <li style="display: flex; justify-content: end;">
 97 |   <DebugPanel name="MB" fg="#f08" bg="#201" value={vMB} />
 98 |   <!-- <DebugPanel name="MS" fg="#0ff" bg="#002"/>
 99 | </li> -->
100 | 


--------------------------------------------------------------------------------
/src/lib/Draggable.svelte:
--------------------------------------------------------------------------------
  1 | <svelte:options immutable={true} />
  2 | 
  3 | <script lang="ts">
  4 |   import { isTagsOrParentWithTags } from "./utils.js";
  5 |   import type { Writable } from "svelte/store";
  6 |   import type { IPositionable } from "./Positionable.svelte";
  7 |   import { createEventDispatcher } from "svelte";
  8 | 
  9 |   const dispatch = createEventDispatcher();
 10 | 
 11 |   export let positionable: Writable<IPositionable<any>>;
 12 | 
 13 |   let el: HTMLDivElement;
 14 |   let dragging = false;
 15 |   let holdTimer: number | null = null;
 16 |   // const dragInit = { x: 0, y: 0 };
 17 |   // const dragOffset = { x: 0, y: 0 };
 18 | 
 19 |   // TODO: ignore input, button, textarea, select, option, a, iframe
 20 | 
 21 |   // UI Handlers
 22 |   function onMouseDown(e: MouseEvent | TouchEvent) {
 23 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
 24 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
 25 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
 26 | 
 27 |     if (isTagsOrParentWithTags(target as HTMLElement, [
 28 |       "INPUT",
 29 |       "BUTTON",
 30 |       "TEXTAREA",
 31 |       "SELECT",
 32 |       "OPTION",
 33 |       "A",
 34 |       "IFRAME"
 35 |     ])) return;
 36 | 
 37 |     // dragInit.x = clientX;
 38 |     // dragInit.y = clientY;
 39 | 
 40 |     document.addEventListener("mouseup", onMouseUp, { once: true });
 41 |     document.addEventListener("touchend", onMouseUp, { once: true });
 42 |     document.addEventListener("mousemove", onMouseMove);
 43 |     document.addEventListener("touchmove", onMouseMove);
 44 | 
 45 |     holdTimer = setTimeout(() => {
 46 |       e.preventDefault();
 47 |       e.stopPropagation();
 48 | 
 49 |       // TODO: Combine these events
 50 |       el.dispatchEvent(new CustomEvent("draggable_onMouseDown", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 51 |       el.dispatchEvent(new CustomEvent("draggable_start", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 52 |       // TODO: check if event canceled, if not:
 53 |       dragging = true;
 54 |     }, 100);
 55 |   }
 56 | 
 57 |   function onMouseMove(e: MouseEvent | TouchEvent) {
 58 |     // dragOffset.x += e.clientX - dragInit.x;
 59 |     // dragOffset.y += e.clientY - dragInit.y;
 60 |     // if (dragOffset.x >= 9 || dragOffset.y >= 9) {
 61 |     //   if (holdTimer) clearTimeout(holdTimer);
 62 |     //   holdTimer = null;
 63 |     // }
 64 |     if (!dragging) return;
 65 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
 66 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
 67 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
 68 |     el.dispatchEvent(new CustomEvent("draggable_onMouseMove", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 69 |     el.dispatchEvent(new CustomEvent("draggable_move", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 70 |   }
 71 | 
 72 |   function onMouseUp(e: MouseEvent | TouchEvent) {
 73 |     // dragOffset.x = 0;
 74 |     // dragOffset.y = 0;
 75 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
 76 | 
 77 |     if (holdTimer !== null) {
 78 |       clearTimeout(holdTimer);
 79 |       holdTimer = null;
 80 |       e.stopImmediatePropagation();
 81 |       e.preventDefault();
 82 |     }
 83 | 
 84 |     if (!dragging) return;
 85 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
 86 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
 87 | 
 88 |     el.dispatchEvent(new CustomEvent("draggable_onMouseUp", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 89 |     el.dispatchEvent(new CustomEvent("draggable_end", { bubbles: true, detail: { event: e, positionable, clientX, clientY } }));
 90 | 
 91 |     dragging = false;
 92 |     document.removeEventListener("mousemove", onMouseMove);
 93 |     document.removeEventListener("mouseup", onMouseUp);
 94 |     document.removeEventListener("touchmove", onMouseMove);
 95 |     document.removeEventListener("touchend", onMouseUp);
 96 |   }
 97 | 
 98 |   // function onMouseDown(e: MouseEvent | TouchEvent) {
 99 |   //   const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
100 |   //   const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
101 |   //   const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
102 | 
103 |   //   if (
104 |   //     isTagsOrParentWithTags(target as HTMLElement, [
105 |   //       "INPUT",
106 |   //       "BUTTON",
107 |   //       "TEXTAREA",
108 |   //       "SELECT",
109 |   //       "OPTION",
110 |   //       "A",
111 |   //       "IFRAME"
112 |   //     ])
113 |   //   )
114 |   //     return;
115 | 
116 |   //   document.addEventListener("mouseup", onMouseUp, { once: true });
117 |   //   document.addEventListener("touchend", onMouseUp, { once: true });
118 |   //   document.addEventListener("mousemove", onMouseMove);
119 |   //   document.addEventListener("touchmove", onMouseMove);
120 | 
121 |   //   e.preventDefault();
122 |   //   e.stopPropagation();
123 | 
124 |   //   // TODO: Combine these events
125 |   //   el.dispatchEvent(
126 |   //     new CustomEvent("draggable_onMouseDown", {
127 |   //       bubbles: true,
128 |   //       detail: { event: e, positionable, clientX, clientY }
129 |   //     })
130 |   //   );
131 |   //   el.dispatchEvent(
132 |   //     new CustomEvent("draggable_start", {
133 |   //       bubbles: true,
134 |   //       detail: { event: e, positionable, clientX, clientY }
135 |   //     })
136 |   //   );
137 |   //   // TODO: check if event canceled, if not:
138 |   // }
139 | 
140 |   // function onMouseMove(e: MouseEvent | TouchEvent) {
141 |   //   const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
142 |   //   const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
143 |   //   const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
144 |   //   el.dispatchEvent(
145 |   //     new CustomEvent("draggable_onMouseMove", {
146 |   //       bubbles: true,
147 |   //       detail: { event: e, positionable, clientX, clientY }
148 |   //     })
149 |   //   );
150 |   // }
151 | 
152 |   // function onMouseUp(e: MouseEvent | TouchEvent) {
153 |   //   const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
154 |   //   const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
155 |   //   const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
156 | 
157 |   //   el.dispatchEvent(
158 |   //     new CustomEvent("draggable_onMouseUp", {
159 |   //       bubbles: true,
160 |   //       detail: { event: e, positionable, clientX, clientY }
161 |   //     })
162 |   //   );
163 |   //   el.dispatchEvent(
164 |   //     new CustomEvent("draggable_end", {
165 |   //       bubbles: true,
166 |   //       detail: { event: e, positionable, clientX, clientY }
167 |   //     })
168 |   //   );
169 | 
170 |   //   document.removeEventListener("mousemove", onMouseMove);
171 |   //   document.removeEventListener("mouseup", onMouseUp);
172 |   //   document.removeEventListener("touchmove", onMouseMove);
173 |   //   document.removeEventListener("touchend", onMouseUp);
174 |   // }
175 | </script>
176 | 
177 | <div
178 |   class="draggable {$$restProps.class || ''}"
179 |   on:mousedown|capture={onMouseDown}
180 |   on:touchstart={onMouseDown}
181 |   bind:this={el}
182 |   on:click
183 | >
184 |   <slot />
185 | </div>
186 | 


--------------------------------------------------------------------------------
/src/lib/Grid.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import { getContext } from "svelte";
 3 |   import type { Writable } from "svelte/store";
 4 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
 5 | 
 6 |   export let dotColor = "black";
 7 |   export let dotOpacity = 30;
 8 |   export let dotSize = 1;
 9 | 
10 |   const board = getContext<IBoard<any, any>>("board");
11 |   const settings = getContext<Writable<IBoardSettings>>("settings");
12 |   const GRID_SIZE = $settings.GRID_SIZE;
13 | 
14 |   const state = board.state;
15 |   const viewport = $state.viewPort;
16 |   const viewOffset = $state.viewOffset;
17 |   const zoom = $state.zoom;
18 | 
19 |   $: transformCss = `width: ${$viewport.w / $zoom}px; height: ${
20 |     $viewport.h / $zoom
21 |   }px; transform: translate3d(-${dotSize}px, -${dotSize}px, 0) translate3d(${
22 |     $viewOffset.x - ($viewOffset.x % GRID_SIZE)
23 |   }px, ${$viewOffset.y - ($viewOffset.y % GRID_SIZE)}px, 0);`;
24 | 
25 |   // $: svgShiftCss = `transform: translate3d(-${$viewX % GRID_SIZE}px, 0px, 0);`;
26 | </script>
27 | 
28 | <div class="grid" style={transformCss}>
29 |   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
30 |     <pattern
31 |       id="dotGrid"
32 |       x="0"
33 |       y="0"
34 |       width={$settings.GRID_SIZE}
35 |       height={$settings.GRID_SIZE}
36 |       patternUnits="userSpaceOnUse"
37 |     >
38 |       <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} fill-opacity="{dotOpacity}%" />
39 |     </pattern>
40 | 
41 |     <!-- Left square with user space tiles -->
42 |     <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
43 |   </svg>
44 | </div>
45 | 
46 | <style>
47 |   .grid {
48 |     position: relative;
49 |     z-index: -1; /* we dont set it -1 intentionally so that elements not in the stacking order are not clickable -> TODO: maybe this is not wanted */
50 |     will-change: transform;
51 |     contain: strict;
52 |     pointer-events: none;
53 |   }
54 |   .grid > svg {
55 |     position: absolute;
56 |     top: 0;
57 |     left: 0;
58 |   }
59 | </style>
60 | 


--------------------------------------------------------------------------------
/src/lib/ImmutablePositionable.svelte:
--------------------------------------------------------------------------------
1 | <script lang="ts">
2 |   import Positionable from "./Positionable.svelte";
3 | </script>
4 | 
5 | <svelte:options immutable={true} />
6 | 
7 | <Positionable {...$$restProps} />


--------------------------------------------------------------------------------
/src/lib/LazyComponent.svelte:
--------------------------------------------------------------------------------
 1 | <script>
 2 |   let loadComponent;
 3 |   export { loadComponent as this };
 4 | 
 5 |   let componentPromise = loadComponent();
 6 | </script>
 7 | 
 8 | <!-- Does not seem to improve stuff: -->
 9 | <svelte:options immutable={true} />
10 | 
11 | {#await componentPromise}
12 | {:then { default: Component }}
13 |   <slot name="component" {Component} />
14 | {/await}
15 | 


--------------------------------------------------------------------------------
/src/lib/Positionable.svelte:
--------------------------------------------------------------------------------
 1 | <script context="module" lang="ts">
 2 |   export type IPositionable<KeyName extends string> = {
 3 |     x: number;
 4 |     y: number;
 5 |     width: number;
 6 |     height: number;
 7 |     z?: number;
 8 |     readonly hoisted?: boolean;
 9 |   } & { [P in KeyName]: string };
10 | </script>
11 | 
12 | <script lang="ts">
13 |   import { getContext, onDestroy, onMount } from "svelte";
14 |   import { derived, type Writable } from "svelte/store";
15 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
16 |   import { scale } from "svelte/transition";
17 |   import { cubicInOut } from "svelte/easing";
18 | 
19 |   type T = $$Generic<IPositionable<any>>;
20 |   export let positionable: Writable<T>;
21 |   /**
22 |    * Sets the `contain: strict;` property, resulting in better performance for a large number of elements,
23 |    * but prevents card content overflowing the card.
24 |    */
25 |   export let contained: boolean = true;
26 |   export let el: HTMLElement;
27 | 
28 |   const board = getContext<IBoard<any, any>>("board");
29 |   const settings = getContext<Writable<IBoardSettings>>("settings");
30 |   const POSITIONABLE_KEY = $settings.POSITIONABLE_KEY;
31 | 
32 |   const state = board.state;
33 |   const selection = $state.selection;
34 |   const stackingOrder = $state.stackingOrder;
35 | 
36 |   let dragging = false;
37 | 
38 |   const transformCss = derived(positionable, (p) => {
39 |     return `left: ${p.x}px; top: ${p.y}px; width: ${p.width}px; height: ${p.height}px; contain-intrinsic-size: ${p.width}px ${p.height}px; z-index: ${$positionable.z !== undefined ? $positionable.z : $stackingOrder.indexOf($positionable[POSITIONABLE_KEY])};`;
40 |   });
41 |   // const transformCss = derived(positionable, (p) => {
42 |   //   return `transform: translate(${p.x}px, ${p.y}px); width: ${p.width}px; height: ${p.height}px; contain-intrinsic-size: ${p.width}px ${p.height}px; z-index: ${$positionable.z !== undefined ? $positionable.z : $stackingOrder.indexOf($positionable[POSITIONABLE_KEY])};`;
43 |   // });
44 |   // $: transformCss = `left: ${$positionable.x}px; top: ${$positionable.y}px; width: ${$positionable.width}px; height: ${$positionable.height}px; z-index: ${$positionable.z !== undefined ? $positionable.z : $stackingOrder.indexOf($positionable[POSITIONABLE_KEY])}; contain-intrinsic-size: ${$positionable.width}px ${$positionable.height}px; ${contained ? 'contain: strict;' : ''}`;
45 |   // $: transformCss = `left: ${$positionable.x - (Math.floor($positionable.x / CHUNK_WIDTH) * CHUNK_WIDTH)}px; top: ${$positionable.y  - (Math.floor($positionable.y / CHUNK_HEIGHT) * CHUNK_HEIGHT)}px; width: ${$positionable.width}px; height: ${$positionable.height}px; z-index: ${$positionable.key !== undefined ? $positionable.key : 0};`; // ${!visible ? 'display: none;' : ''} ${!visible ? 'content-visibility: hidden;' : ''}
46 |   // $: transformCss = `left: 0; top: 0;transform: translate3d(${$positionable.x}px, ${$positionable.y}px, 0) scale(${$state.zoom}); width: ${$positionable.width}px; height: ${$positionable.height}px; z-index: ${$positionable.key !== undefined ? $positionable.key : 0};`;
47 | 
48 |   function onDraggableStart() { dragging = true; }
49 |   function onDraggableEnd() { dragging = false; }
50 | 
51 |   onMount(() => {
52 |     el.addEventListener("draggable_start", onDraggableStart);
53 |     el.addEventListener("draggable_end", onDraggableEnd);
54 |   })
55 |   onDestroy(() => {
56 |     el && el.removeEventListener("draggable_start", onDraggableStart);
57 |     el && el.removeEventListener("draggable_end", onDraggableEnd);
58 |   })
59 | </script>
60 | 
61 | <!-- TODO: For Readonly mode, custom immutable version of this cmp -->
62 | <svelte:options immutable={true} />
63 | 
64 | <!-- transition:scale={{ duration: 100, opacity: 0, start: 0.8, easing: cubicInOut }} -->
65 | <div
66 |   data-key={$positionable[POSITIONABLE_KEY]}
67 |   {...$$restProps}
68 |   style="{$transformCss} {contained ? 'contain: strict;' : ''} {$$restProps.style || ''}"
69 |   class="positionable {$$restProps.class || ''}"
70 |   class:selected={$selection.has($positionable[POSITIONABLE_KEY])}
71 |   class:hoisted={$positionable.hoisted}
72 |   class:dragging
73 |   transition:scale={{ duration: 70, opacity: 0, start: 0.8, easing: cubicInOut }}
74 |   bind:this={el}
75 | >
76 |   <slot />
77 | </div>
78 | 
79 | <style>
80 |   div {
81 |     position: absolute;
82 |     top: 0;
83 |     left: 0;
84 |     /* will-change: left, top, width, height; */
85 |     will-change: transform;
86 |     /* transform: translateZ(0); */
87 |     backface-visibility: hidden;
88 |     /* content-visibility: auto; */
89 |     /* contain: style layout paint; */
90 |     /* contain: strict; */ /* TODO: This should maybe be a cfg, for perf needs, but not reuired */
91 |   }
92 | </style>
93 | 


--------------------------------------------------------------------------------
/src/lib/Resizable.svelte:
--------------------------------------------------------------------------------
 1 | <script context="module" lang="ts">
 2 |   export type TResizeDirection =
 3 |     | "top"
 4 |     | "right"
 5 |     | "bottom"
 6 |     | "left"
 7 |     | "top-right"
 8 |     | "top-left"
 9 |     | "bottom-right"
10 |     | "bottom-left";
11 | </script>
12 | 
13 | <script lang="ts">
14 |   import type { IPositionable } from "./Positionable.svelte.js";
15 |   import type { Vec2 } from "./types/Utils.type.js";
16 |   import type { Writable } from "svelte/store";
17 | 
18 |   export let positionable: Writable<IPositionable<any>>;
19 |   export let direction: TResizeDirection;
20 |   export let minSize: Vec2<number> = { x: 0, y: 0 };
21 |   export let maxSize: Vec2<number> = { x: Infinity, y: Infinity };
22 | 
23 |   let el: HTMLDivElement;
24 |   let resizing = false;
25 | 
26 |   function onMouseDown(e: MouseEvent | TouchEvent) {
27 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
28 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
29 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
30 | 
31 |     el.dispatchEvent(
32 |       new CustomEvent("resizable_onMouseDown", {
33 |         bubbles: true,
34 |         detail: { event: e, positionable, clientX, clientY }
35 |       })
36 |     );
37 |     resizing = true;
38 | 
39 |     document.addEventListener("mousemove", onMouseMove);
40 |     document.addEventListener("mouseup", onMouseUp, { once: true });
41 |     document.addEventListener("touchmove", onMouseMove);
42 |     document.addEventListener("touchend", onMouseUp, { once: true });
43 |   }
44 |   function onMouseMove(e: MouseEvent | TouchEvent) {
45 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
46 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
47 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
48 | 
49 |     el.dispatchEvent(
50 |       new CustomEvent("resizable_onMouseMove", {
51 |         bubbles: true,
52 |         detail: { event: e, positionable, clientX, clientY, direction, minSize, maxSize }
53 |       })
54 |     );
55 |   }
56 |   function onMouseUp(e: MouseEvent | TouchEvent) {
57 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
58 |     const clientX = (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX;
59 |     const clientY = (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY;
60 | 
61 |     el.dispatchEvent(
62 |       new CustomEvent("resizable_onMouseUp", {
63 |         bubbles: true,
64 |         detail: { event: e, positionable, clientX, clientY }
65 |       })
66 |     );
67 |     el.dispatchEvent(
68 |       new CustomEvent("resizable_end", {
69 |         bubbles: true,
70 |         detail: { event: e, positionable, clientX, clientY }
71 |       })
72 |     );
73 | 
74 |     resizing = false;
75 |     document.removeEventListener("mousemove", onMouseMove);
76 |     document.removeEventListener("mouseup", onMouseUp);
77 |     document.removeEventListener("touchmove", onMouseMove);
78 |     document.removeEventListener("touchend", onMouseUp);
79 |   }
80 | </script>
81 | 
82 | <svelte:options immutable={true} />
83 | 
84 | <div
85 |   class="resizable {direction} {$$restProps.class || ''}"
86 |   class:resizing
87 |   on:mousedown={onMouseDown}
88 |   on:touchstart={onMouseDown}
89 |   bind:this={el}
90 | >
91 |   <slot />
92 | </div>
93 | 


--------------------------------------------------------------------------------
/src/lib/index.ts:
--------------------------------------------------------------------------------
 1 | // import Board from "./Board.svelte";
 2 | // export default { Board };
 3 | 
 4 | export { default as Board } from "./Board.svelte";
 5 | export { createBoard, createSettings, moveToStackingTop } from "./Board.svelte";
 6 | 
 7 | // export { default as Chunked } from "./Chunked.svelte";
 8 | // export { default as Chunk } from "./Chunk.svelte";
 9 | // export { positionableInView } from "./Chunk.svelte";
10 | 
11 | export { default as Positionable } from "./Positionable.svelte";
12 | export type { IPositionable } from "./Positionable.svelte";
13 | export { default as Draggable } from "./Draggable.svelte";
14 | export { default as Resizable } from "./Resizable.svelte";
15 | export { default as Grid } from "./Grid.svelte";
16 | // export { default as Gradient } from "./Gradient.svelte";
17 | export { default as LazyComponent } from "./LazyComponent.svelte";
18 | 
19 | export {
20 |   rectsIntersect,
21 |   lerp,
22 |   clamp,
23 |   invlerp,
24 |   map,
25 |   hasClassOrParentWithClass,
26 |   debounce,
27 |   snapToGrid,
28 |   isInsidePositionable,
29 |   posToAbsolute,
30 |   hoistPositionable,
31 |   unHoistPositionable
32 | } from "./utils.js";
33 | export type { IBoard, IBoardSettings, IBoardState, TBoardMode } from "./types/Board.type.js";
34 | export type { Vec2, DeepPartial, Vec4 } from "./types/Utils.type.js";
35 | 
36 | 
37 | // Reexport your entry components here
38 | 
39 | // export default {
40 | //   Board,
41 | //   Positionable,
42 | //   Draggable,
43 | //   Resizable,
44 | //   Grid
45 | // };
46 | 
47 | // export type {
48 | //   IBoardSettings,
49 | //   TBoard,
50 | //   Vec2
51 | // }
52 | 


--------------------------------------------------------------------------------
/src/lib/old/board/Board.svelte:
--------------------------------------------------------------------------------
  1 | <script context="module" lang="ts">
  2 | 	export function calcViewBounds(viewOffset: Vec2, zoom: number, viewportSize: Vec2): Vec4 {
  3 | 		const viewSize = {
  4 | 			x: viewportSize.x / zoom,
  5 | 			y: viewportSize.y / zoom
  6 | 		};
  7 | 
  8 | 		const viewBounds = {
  9 | 			x: viewOffset.x - viewSize.x / 2,
 10 | 			y: viewOffset.y - viewSize.y / 2,
 11 | 			w: viewSize.x,
 12 | 			h: viewSize.y
 13 | 		};
 14 | 
 15 | 		return viewBounds;
 16 | 	}
 17 | 
 18 |   export function isInsideViewBounds(rec: Vec4, view: Vec4, zoom: number): boolean {
 19 |     return (
 20 |       rec.x >= view.x &&
 21 |       rec.y >= view.y &&
 22 |       rec.x + rec.w <= view.x + view.w &&
 23 |       rec.y + rec.h <= view.y + view.h
 24 |     );
 25 |   }
 26 | 
 27 | </script>
 28 | 
 29 | <script lang="ts">
 30 | 	import type { TBoard } from '$lib/types/Board.type.js';
 31 | 	import type { Vec2, Vec4 } from '$lib/types/Utils.type.js';
 32 | 	import { clamp, hasClassOrParentWithClass, twoDecimalTrunc } from '$lib/utils.js';
 33 |   import { createEventDispatcher } from 'svelte';
 34 | 	  import type { writable, Writable } from 'svelte/store';
 35 | 
 36 | 	export let activeBoard: Writable<TBoard>;
 37 | 
 38 |     const dispatch = createEventDispatcher();
 39 | 
 40 | 	// activeBoard.set({
 41 | 	// 	key: '234',
 42 | 	// 	zoom: 1,
 43 | 	// 	viewOffset: { x: 0, y: 0 },
 44 |   //   positionables: writable([]),
 45 |   //   inView: writable([])
 46 | 	// });
 47 | 
 48 |   let dragState = {
 49 |     init: { x: 0, y: 0 },
 50 |     curr: { x: 0, y: 0 },
 51 |     offset: { x: 0, y: 0 }
 52 |   }
 53 | 
 54 |   $: fooX = 20 + $activeBoard.viewOffset.x;
 55 |   $: fooY = 20 + $activeBoard.viewOffset.y;
 56 | 
 57 |   $: checkerX = (x: number) => (x * 200) + $activeBoard.viewOffset.x;
 58 |   $: checkerY= (y: number) => (y * 200) + $activeBoard.viewOffset.y;
 59 | 
 60 |   let checkers = [];
 61 |   const num = 20;
 62 |   // for (let x = -num; x < num; x++) {
 63 |   //   for (let y = -num; y < num; y++) {
 64 |   //     checkers.push({ x, y });
 65 |   //   }
 66 |   // }
 67 | 
 68 |   // UI Handlers
 69 |   function onMouseWheel(e: WheelEvent) {
 70 |     if (e.ctrlKey) {
 71 |       e.preventDefault();
 72 |       e.stopPropagation();
 73 | 
 74 |       const delta = e.deltaY;
 75 |       //const zoom = clamp(twoDecimalTrunc(($activeBoard.zoom + delta / 500)), 0.1, 1.9);
 76 |       const zoom = clamp($activeBoard.zoom + delta / 500, 0.1, 1.9);
 77 |       console.log("zoom", zoom, 2- zoom)
 78 |       $activeBoard.zoom = zoom;
 79 |     }
 80 |     else {
 81 |       e.preventDefault();
 82 |       e.stopPropagation();
 83 |       const deltaX = e.deltaX;
 84 |       const deltaY = e.deltaY;
 85 |       $activeBoard.viewOffset = {
 86 |         x: $activeBoard.viewOffset.x + deltaX / $activeBoard.zoom,
 87 |         y: $activeBoard.viewOffset.y + deltaY / $activeBoard.zoom
 88 |       };
 89 |     }
 90 |   }
 91 | 
 92 |   function onMouseDown(e: MouseEvent) {
 93 |     if (hasClassOrParentWithClass(e.target as HTMLElement, 'no-pan')) return;
 94 |     dragState.init = { x: e.clientX, y: e.clientY };
 95 |     dragState.curr = { x: e.clientX, y: e.clientY };
 96 | 
 97 |     window.addEventListener('mousemove', onMouseMove);
 98 |     window.addEventListener('mouseup', onMouseUp);
 99 |   }
100 | 
101 |   function onMouseMove(e: MouseEvent) {
102 |     dragState.offset = {
103 |       x: Math.floor((e.clientX - dragState.curr.x) / $activeBoard.zoom),
104 |       y: Math.floor((e.clientY - dragState.curr.y) / $activeBoard.zoom)
105 |     };
106 | 
107 |     dragState.curr = { x: e.clientX, y: e.clientY };
108 | 
109 |     $activeBoard.viewOffset = {
110 |       x: $activeBoard.viewOffset.x - dragState.offset.x,
111 |       y: $activeBoard.viewOffset.y - dragState.offset.y
112 |     };
113 |   }
114 | 
115 |   function onMouseUp(e: MouseEvent) {
116 |     window.removeEventListener('mousemove', onMouseMove);
117 |     dispatch('dragEnd', { pos: $activeBoard.viewOffset })
118 |   }
119 | 
120 | </script>
121 | 
122 | <svelte:body
123 |   on:mousedown={onMouseDown}
124 |   on:wheel|nonpassive={onMouseWheel}/>
125 | 
126 | <section id="board"
127 |   style="transform-origin: top left; transform: scale({2- $activeBoard.zoom});"
128 |   > <!-- trunc -->
129 |   <slot/>
130 | </section>
131 | 
132 | <style>
133 |   #board {
134 |     position: relative;
135 |     cursor: grab;
136 |     overscroll-behavior-x: contain;
137 |   }
138 | </style>
139 | 


--------------------------------------------------------------------------------
/src/lib/old/board/Draggable.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import type { TBoard } from "$lib/types/Board.type.js";
 3 |   import type { Vec2 } from "$lib/types/Utils.type.js";
 4 |   import { createEventDispatcher } from "svelte";
 5 |   import type { Writable } from "svelte/store";
 6 | 
 7 |   export let pos: Vec2, board: Writable<TBoard>, wc: boolean;
 8 | 
 9 |   const dispatch = createEventDispatcher();
10 |   let el: HTMLElement;
11 | 
12 |   let dragState = {
13 |     init: { x: 0, y: 0 },
14 |     curr: { x: 0, y: 0 },
15 |     offset: { x: 0, y: 0 }
16 |   };
17 | 
18 |   function onMouseDown(e: MouseEvent) {
19 |     wc = true;
20 |     dragState.init = { x: e.clientX, y: e.clientY };
21 |     dragState.curr = { x: e.clientX, y: e.clientY };
22 | 
23 |     window.addEventListener("mousemove", onMouseMove);
24 |     window.addEventListener("mouseup", onMouseUp);
25 |   }
26 | 
27 |   function onMouseMove(e: MouseEvent) {
28 |     dragState.offset = {
29 |       x: (e.clientX - dragState.curr.x) / $board.zoom,
30 |       y: (e.clientY - dragState.curr.y) / $board.zoom
31 |     };
32 | 
33 |     dragState.curr = { x: e.clientX, y: e.clientY };
34 | 
35 |     pos.x += dragState.offset.x;
36 |     pos.y += dragState.offset.y;
37 | 
38 |     // $activeBoard.viewOffset = {
39 |     //   x: $activeBoard.viewOffset.x + dragState.offset.x,
40 |     //   y: $activeBoard.viewOffset.y + dragState.offset.y
41 |     // };
42 |   }
43 | 
44 |   function onMouseUp(e: MouseEvent) {
45 |     wc = false;
46 |     window.removeEventListener("mousemove", onMouseMove);
47 |     window.removeEventListener("mouseup", onMouseUp);
48 |     dispatch("dragEnd", { pos });
49 |   }
50 | </script>
51 | 
52 | <svelte:element
53 |   this="div"
54 |   bind:this={el}
55 |   on:mousedown={onMouseDown}
56 |   {...$$restProps}
57 |   class="draggable {$$restProps.class}"
58 | >
59 |   <slot />
60 | </svelte:element>
61 | 
62 | <style>
63 |   div.draggable {
64 |   }
65 | </style>
66 | 


--------------------------------------------------------------------------------
/src/lib/old/board/Positionable.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 | 	import type { TBoard } from '$lib/types/Board.type.js';
 3 | 	import type { TPositionable } from '$lib/types/Positionable.type.js';
 4 | 	import { onMount } from 'svelte';
 5 | 	import type { Writable } from 'svelte/store';
 6 | 
 7 | 	export let board: Writable<TBoard>,
 8 |     bounds: TPositionable,
 9 |     stackingOrder: string[],
10 |     wc: boolean;
11 | 
12 |     let el: HTMLElement;
13 | 
14 |     $: transformCss = `transfrom: translate3d(${$board.viewOffset.x + bounds.pos.x}px, ${$board.viewOffset.y + bounds.pos.y}px, 0); width: ${bounds.size.x}px; height: ${bounds.size.y}px;`;
15 | 
16 | 	/*$: positionCss = `left: ${$board.viewOffset.x + bounds.pos.x}px; top: ${
17 | 		$board.viewOffset.y + bounds.pos.y
18 | 	}px; width: ${bounds.size.x}px; height: ${bounds.size.y}px; z-index: ${stackingOrder.indexOf(bounds.key) >= 0 ? stackingOrder.indexOf(bounds.key) : 0}`;
19 | */
20 |   // TODO: render / update only when within bounds
21 | 	/*$: asf = isInsideViewBounds(
22 | 		{ x: draggable.pos.x, y: draggable.pos.y, w: draggable.size.x, h: draggable.size.y },
23 | 		{ x: $board.viewOffset.x, y: $board.viewOffset.y, w: window.innerWidth, h: window.innerHeight },
24 | 		$board.zoom
25 | 	);*/
26 | 
27 | 	onMount(() => {
28 |     //el.style.transform = `translate(${bounds.pos.x}px, ${bounds.pos.y}px)`;
29 | 	});
30 | </script>
31 | 
32 | <!-- <div class="positionable" style="{positionCss}">
33 | 	{bounds.key}
34 | </div> -->
35 | <svelte:element this="div"
36 |   {...$$restProps}
37 |   class="positionable {$$restProps.class}"
38 |   style="width: {bounds.size.x}px; height: {bounds.size.y}px; transform: translate3d({bounds.pos.x - $board.viewOffset.x}px, {bounds.pos.y - $board.viewOffset.y}px, 0); {wc ? 'background: lime !important;' : ''}">
39 |   <slot/>
40 | </svelte:element>
41 | 
42 | <style>
43 | 	div.positionable {
44 | 		position: absolute;
45 |     top: 0;
46 |     left: 0;
47 |     transform-origin: top left;
48 | 	}
49 | </style>
50 | 


--------------------------------------------------------------------------------
/src/lib/old/board/Resizable.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import type { TBoard } from "$lib/types/Board.type.js";
 3 |   import type { Vec2 } from "$lib/types/Utils.type.js";
 4 |   import { createEventDispatcher } from "svelte";
 5 |   import type { Writable } from "svelte/store";
 6 | 
 7 |   export let pos: Vec2, size: Vec2, board: Writable<TBoard>;
 8 | 
 9 |   const dispatch = createEventDispatcher();
10 | 
11 |   let dragState = {
12 |     init: { x: 0, y: 0 },
13 |     curr: { x: 0, y: 0 },
14 |     offset: { x: 0, y: 0 }
15 |   };
16 | 
17 |   function onMouseDown(e: MouseEvent) {
18 |     dragState.init = { x: e.clientX, y: e.clientY };
19 |     dragState.curr = { x: e.clientX, y: e.clientY };
20 | 
21 |     window.addEventListener("mousemove", onMouseMove);
22 |     window.addEventListener("mouseup", onMouseUp);
23 |   }
24 | 
25 |   function onMouseMove(e: MouseEvent) {
26 |     dragState.offset = {
27 |       x: (e.clientX - dragState.curr.x) / $board.zoom,
28 |       y: (e.clientY - dragState.curr.y) / $board.zoom
29 |     };
30 | 
31 |     dragState.curr = { x: e.clientX, y: e.clientY };
32 | 
33 |     size.x += dragState.offset.x;
34 |     size.y += dragState.offset.y;
35 | 
36 |     // $activeBoard.viewOffset = {
37 |     //   x: $activeBoard.viewOffset.x + dragState.offset.x,
38 |     //   y: $activeBoard.viewOffset.y + dragState.offset.y
39 |     // };
40 |   }
41 | 
42 |   function onMouseUp(e: MouseEvent) {
43 |     window.removeEventListener("mousemove", onMouseMove);
44 |     window.removeEventListener("mouseup", onMouseUp);
45 |     dispatch("resizeEnd", { pos });
46 |   }
47 | </script>
48 | 
49 | <svelte:element
50 |   this="div"
51 |   on:mousedown={onMouseDown}
52 |   {...$$restProps}
53 |   class="resizable {$$restProps.class}"
54 | />
55 | 
56 | <style>
57 |   .resizable {
58 |     position: absolute;
59 |     bottom: 0;
60 |     right: 0;
61 |     width: 15px;
62 |     height: 15px;
63 |     cursor: nwse-resize;
64 |   }
65 | </style>
66 | 


--------------------------------------------------------------------------------
/src/lib/old/types/Board.type.ts:
--------------------------------------------------------------------------------
 1 | import type { Writable } from "svelte/store";
 2 | import type { TPositionable } from "./Positionable.type.js";
 3 | import type { Vec2 } from "./Utils.type.js";
 4 | 
 5 | export interface TBoard {
 6 |   key: string;
 7 | 
 8 |   // Rendering
 9 |   viewOffset: Vec2;
10 |   zoom: number;
11 |   positionables: Writable<TPositionable[]>;
12 |   inView: Writable<string[]>;   // Stores keys of draggables in view
13 | }


--------------------------------------------------------------------------------
/src/lib/old/types/Positionable.type.ts:
--------------------------------------------------------------------------------
1 | import type { Vec2 } from "./Utils.type.js";
2 | 
3 | export interface TPositionable {
4 |   key: string;
5 | 
6 |   // Rendering
7 |   pos: Vec2;
8 |   size: Vec2;
9 | }


--------------------------------------------------------------------------------
/src/lib/old/utils.ts:
--------------------------------------------------------------------------------
 1 | export const twoDecimalTrunc = (num: number) => Math.trunc(num * 100) / 100;
 2 | 
 3 | export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
 4 | export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
 5 | export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
 6 | export const map = (x1: number, y1: number, x2: number, y2: number, a: number) =>
 7 |   lerp(x2, y2, invlerp(x1, y1, a));
 8 | 
 9 | export function hasClassOrParentWithClass(element: HTMLElement, className: string): boolean {
10 |   if (!element) {
11 |     return false;
12 |   }
13 | 
14 |   if (element.classList.contains(className)) {
15 |     return true;
16 |   }
17 | 
18 |   if (element.parentElement) return hasClassOrParentWithClass(element.parentElement, className);
19 |   else return false;
20 | }
21 | 


--------------------------------------------------------------------------------
/src/lib/old2/Board.svelte:
--------------------------------------------------------------------------------
  1 | <script context="module" lang="ts">
  2 |   /**
  3 |    * Creates a board settings store with given values or defaults as fallback.
  4 |    * @param settings The settings to override.
  5 |    */
  6 |   export function createSettings(settings: DeepPartial<IBoardSettings>): Writable<IBoardSettings> {
  7 |     return writable({
  8 |       CAN_PAN: true,
  9 |       PAN_DIRECTION: "xy",
 10 | 
 11 |       CAN_DRAW: true,
 12 |       CAN_ZOOM: true,
 13 |       CAN_SELECT: true,
 14 |       SNAP_TO_GRID: false,
 15 |       GRID_SIZE: 20,
 16 | 
 17 |       CULL: true,
 18 |       CULL_MARGIN: 200,
 19 | 
 20 |       CHUNK_SIZE: 2000,
 21 |       CHUNK_CULL_MARGIN: 2000,
 22 |       CHUNK_WARM_MARGIN: 1,
 23 | 
 24 |       POSITIONABLE_KEY: "key",
 25 | 
 26 |       ...settings,
 27 |       BOUNDS: {
 28 |         minX: null,
 29 |         maxX: null,
 30 |         minY: null,
 31 |         maxY: null,
 32 |         minZoom: 0.3,
 33 |         maxZoom: 1,
 34 |         limit: "soft",
 35 |         ...settings.BOUNDS
 36 |       },
 37 |       DEV: {
 38 |         SHOW_POS: false,
 39 |         SHOW_MODE: false,
 40 |         CHUNK_DBG: false,
 41 |         ...settings.DEV
 42 |       }
 43 |     } as IBoardSettings); // hack: fixs optional types
 44 |   }
 45 | 
 46 |   /**
 47 |    * Pan the board to the given position.
 48 |    * @param viewOffset
 49 |    * @param x
 50 |    * @param y
 51 |    * @param duration
 52 |    * @param delay
 53 |    */
 54 |   export function panTo(
 55 |     viewOffset: Vec2<Tweened<number>>,
 56 |     x: number,
 57 |     y: number,
 58 |     duration: number = 400,
 59 |     delay: number = 0,
 60 |     bounds: { minX: number | null, maxX: number | null, minY: number | null, maxY: number | null } = {
 61 |       minX: null,
 62 |       maxX: null,
 63 |       minY: null,
 64 |       maxY: null
 65 |     }
 66 |   ) {
 67 |     // todo: add gta pan mode
 68 |     const boundX = clamp(
 69 |         x,
 70 |         bounds.minX !== null ? bounds.minX : -Infinity,
 71 |         bounds.maxX !== null ? bounds.maxX - window.innerWidth : Infinity // todo: use bounding rect
 72 |       );
 73 |       const boundY = clamp(
 74 |         y,
 75 |         bounds.minY !== null ? bounds.minY : -Infinity,
 76 |         bounds.maxY !== null ? bounds.maxY! - window.innerHeight : Infinity
 77 |       );
 78 |     return Promise.all([
 79 |       viewOffset.x.set(boundX, { duration, delay }),
 80 |       viewOffset.y.set(boundY, { duration, delay })
 81 |     ]);
 82 |   }
 83 | 
 84 |   /**
 85 |    * Zoom the board to a given zoom factor.
 86 |    * @param state
 87 |    * @param zoom
 88 |    * @param duration
 89 |    * @param delay
 90 |    */
 91 |   export function zoomTo(
 92 |     state: IBoardState,
 93 |     zoom: number,
 94 |     duration: number = 400,
 95 |     delay: number = 0
 96 |   ) {
 97 |     return state.zoom.set(zoom, { duration, delay });
 98 |   }
 99 | 
100 |   export function createBoard(
101 |     initialState: DeepPartial<{
102 |       viewOffset: Vec2<number>;
103 |       viewPort: Vec4;
104 |       zoom: number;
105 |       mode: TBoardMode;
106 |       selection: Writable<Set<string>>;
107 |     }>,
108 |     settings: Writable<IBoardSettings>,
109 |     handlers: {
110 |       onChunksChanged?: (chunks: Writable<Map<string, Writable<IPositionable[]>>>, changed: Set<string>) => void;
111 |     } = {}
112 |   ): IBoard {
113 |     initialState.viewOffset = {
114 |       // @ts-ignore we just override to not create a new object
115 |       x: tweened(initialState.viewOffset?.x === undefined ? 0 : initialState.viewOffset?.x, {
116 |         duration: 0,
117 |         easing: cubicOut
118 |       }),
119 |       // @ts-ignore we just override to not create a new object
120 |       y: tweened(initialState.viewOffset?.y === undefined ? 0 : initialState.viewOffset?.y, {
121 |         duration: 0,
122 |         easing: cubicOut
123 |       })
124 |     };
125 |     initialState.viewPort = {
126 |       // todo
127 |       x: 0,
128 |       y: 0,
129 |       w: 0,
130 |       h: 0
131 |     };
132 |     // @ts-ignore we just override
133 |     initialState.zoom = tweened(initialState.zoom === undefined ? 1 : initialState.zoom, {
134 |       duration: 0,
135 |       easing: cubicOut
136 |     });
137 |     initialState.mode = initialState.mode !== undefined ? initialState.mode : "draw";
138 |     initialState.selection = initialState.selection !== undefined ? initialState.selection : writable(new Set());
139 | 
140 |     const state = writable<IBoardState>(initialState as unknown as IBoardState); // hack: types
141 | 
142 |     return {
143 |       state,
144 | 
145 |       // Handlers
146 |       onChunksChanged: (chunks: Writable<Map<string, Writable<IPositionable[]>>>, changed: Set<string>) => {
147 |         handlers.onChunksChanged && handlers.onChunksChanged(chunks, changed);
148 |       },
149 | 
150 |       // Commands
151 |       setMode: (mode: TBoardMode) => {
152 |         state.update((s) => {
153 |           s.mode = mode;
154 |           return s;
155 |         });
156 |       },
157 |       panTo: (x: number, y: number, duration = 400, delay = 0) => {
158 |         state.update(s => {
159 |           s.mode = "auto-panning";
160 |           return s;
161 |         })
162 |         const p = panTo(get(state).viewOffset, x, y, duration, delay, get(settings).BOUNDS);
163 |         p.then(() => {
164 |           state.update(s => {
165 |             s.mode = "draw";
166 |             return s;
167 |           })
168 |         })
169 |         return p;
170 |       },
171 |       zoomTo: (zoom: number, duration = 400, delay = 0) => {
172 |         state.update(s => {
173 |           s.mode = "auto-zooming";
174 |           return s;
175 |         })
176 |         const p = zoomTo(get(state), zoom, duration, delay);
177 |         p.then(() => {
178 |           state.update(s => {
179 |             s.mode = "draw";
180 |             return s;
181 |           })
182 |         })
183 |         return p;
184 |       }
185 |     };
186 |   }
187 | 
188 |   export function moveToStackingTop(stack: Writable<string[]>, key: string) {
189 |     const l = get(stack).length;
190 |     // console.time(`[StackingOrder-update :: n = ${l}]`); // todo: make debug only
191 |     stack.update(s => {
192 |       const i = s.indexOf(key);
193 |       s.push(key);
194 |       if (i === -1) return s;
195 |       s.splice(i, 1);
196 |       return s;
197 |     });
198 |     // console.timeEnd(`[StackingOrder-update :: n = ${l}]`);
199 |   }
200 | </script>
201 | 
202 | <script lang="ts">
203 |   import { derived, get, writable, type Writable } from "svelte/store";
204 |   import type { IBoard, IBoardState, TBoardMode, IBoardSettings } from "./types/Board.type.ts";
205 |   import type { DeepPartial, Vec2, Vec4 } from "./types/Utils.type.ts";
206 |   import { clamp, debounce, hasClassOrParentWithClass } from "./utils.js";
207 |   import { createEventDispatcher, onMount, setContext } from "svelte";
208 |   import { tweened, type Tweened } from "svelte/motion";
209 |   import { cubicOut } from "svelte/easing";
210 |   import type { IPositionable } from "./Positionable.svelte";
211 | 
212 |   export let settings: Writable<IBoardSettings>;
213 |   export let board: IBoard; // "exported" with custom properties
214 |   //export let chunks: Writable<Map<string, Writable<IPositionable[]>>> = writable(new Map());
215 |   export let stackingOrder: Writable<string[]>;
216 |   export let preTransform: string | null = null;
217 |   export let postTransform: string | null = null;
218 | 
219 |   const dispatch = createEventDispatcher();
220 | 
221 |   setContext("board", board);
222 |   setContext("settings", settings);
223 |   setContext("stackingOrder", stackingOrder);
224 | 
225 |   let state = board.state;
226 |   let mode = derived(state, (e) => e.mode);
227 |   $: ({ x: viewX, y: viewY } = $state.viewOffset);
228 |   $: ({ viewPort } = $state);
229 |   $: ({ zoom } = $state);
230 | 
231 |   let containerEl: HTMLDivElement;
232 |   let dragState = {
233 |     init: { x: 0, y: 0 },
234 |     curr: { x: 0, y: 0 },
235 |     offset: { x: 0, y: 0 }
236 |   };
237 | 
238 |   let selectState = {
239 |     init: { x: 0, y: 0 },
240 |     curr: { x: 0, y: 0 },
241 |     offset: { x: 0, y: 0 },
242 |     pos: { x: 0, y: 0 },
243 |     size: { x: 0, y: 0 }
244 |   };
245 | 
246 |   $: transformCss = `transform-origin: top left; transform: ${preTransform || ''} ${$zoom !== 1 ? `scale(${$zoom})` : ''} translate3d(${-$viewX}px, ${-$viewY}px, 0) ${postTransform || ''};`;
247 | 
248 |   // $: selectionCss = `transform: translate(${
249 |   //   $settings.SNAP_TO_GRID ? snapToGrid(Math.floor($viewX + (selectState.pos.x - 0.5) / $zoom), $settings.GRID_SIZE!) : $viewX + selectState.pos.x / $zoom
250 |   // }px, ${
251 |   //   $settings.SNAP_TO_GRID ? snapToGrid(Math.floor($viewY + (selectState.pos.y - 0.5) / $zoom), $settings.GRID_SIZE!) : $viewY + selectState.pos.y / $zoom
252 |   // }px); width: ${
253 |   //   $settings.SNAP_TO_GRID ? snapToGrid(Math.round(selectState.size.x + 0.5), $settings.GRID_SIZE!) : Math.round(selectState.size.x)
254 |   // }px; height: ${
255 |   //   $settings.SNAP_TO_GRID ? snapToGrid(Math.round(selectState.size.y + 0.5), $settings.GRID_SIZE!) : Math.round(selectState.size.y)
256 |   // }px;`;
257 | 
258 |   $: selectionCss = `transform: translate(${selectState.pos.x}px, ${
259 |     selectState.pos.y
260 |   }px); width: ${Math.round(selectState.size.x)}px; height: ${Math.round(
261 |     selectState.size.y
262 |   )}px;`;
263 | 
264 |   // if ($settings.BOUNDS?.minX !== null && $viewX < $settings.BOUNDS!.minX) {
265 |   //   $viewX = $settings.BOUNDS!.minX;
266 |   // }
267 |   // if ($settings.BOUNDS?.minY !== null && $viewY < $settings.BOUNDS!.minY) {
268 |   //   $viewY = $settings.BOUNDS!.minY;
269 |   // }
270 |   // if ($settings.BOUNDS?.maxX !== null && $viewX > $settings.BOUNDS!.maxX - window.innerWidth) {
271 |   //   $viewX = $settings.BOUNDS!.maxX - window.innerWidth;
272 |   // }
273 |   // if ($settings.BOUNDS?.maxY !== null && $viewY > $settings.BOUNDS!.maxY - window.innerHeight) {
274 |   //   $viewY = $settings.BOUNDS!.maxY - window.innerHeight;
275 |   // }
276 | 
277 |   // Utils
278 |   function posToViewportPos(x: number, y: number) {
279 |     return {
280 |       x: $viewX + x / $zoom,
281 |       y: $viewY + y / $zoom//y - $viewY + window.scrollY // todo: fix
282 |     };
283 |   }
284 |   function stopDrawing() {
285 |     document.removeEventListener("mousemove", onMouseMoveDraw);
286 |   }
287 |   function stopPanning() {
288 |     document.removeEventListener("mousemove", onMouseMovePan);
289 |     document.removeEventListener("touchmove", onMouseMovePan);
290 |     dispatch("panEnd", { offset: $state.viewOffset });
291 |   }
292 | 
293 |   function startSelect() {
294 |     dispatch("selectStart");
295 |     document.addEventListener("mousemove", onMouseMoveSelect);
296 |     // document.removeEventListener("touchmove", onMouseMoveSelect);
297 |   }
298 |   function stopSelect() {
299 |     document.removeEventListener("mousemove", onMouseMoveSelect);
300 |     // document.removeEventListener("touchmove", onMouseMoveSelect);
301 |   }
302 | 
303 |   // UI Handlers
304 |   function onWheel(e: WheelEvent) {
305 |     if (!hasClassOrParentWithClass(e.target as HTMLElement, "tela-container")) return;
306 |     if (e.ctrlKey) {
307 |       e.preventDefault();
308 |       e.stopPropagation();
309 |       if (!$settings.CAN_ZOOM) return;
310 | 
311 |       $state.mode = "zoom";
312 | 
313 |       // todo: fix relative to bounding element box not screen pos
314 |       const absoluteMouseXOld = $viewX + e.clientX / $zoom;
315 |       const absoluteMouseYOld = $viewY + e.clientY / $zoom;
316 | 
317 |       const delta = e.deltaY;
318 |       const newZoom = clamp($zoom - delta / 500, $settings.BOUNDS?.minZoom!, $settings.BOUNDS?.maxZoom!);
319 | 
320 |       const absoluteMouseXNew = $viewX + e.clientX / newZoom;
321 |       const absoluteMouseYNew = $viewY + e.clientY / newZoom;
322 | 
323 |       const offsetX = absoluteMouseXOld - absoluteMouseXNew;
324 |       const offsetY = absoluteMouseYOld - absoluteMouseYNew;
325 | 
326 |       $state.viewOffset.x.set($viewX + offsetX, { duration: 0 });
327 |       $state.viewOffset.y.set($viewY + offsetY, { duration: 0 });
328 |       $state.zoom.set(newZoom, { duration: 0 });
329 | 
330 |       debounce("tela_zoomModeReset", 50, () => $state.mode = "draw");
331 |     } else {
332 |       if (!$settings.CAN_PAN || hasClassOrParentWithClass(e.target as HTMLElement, "tela-ignore")) return;
333 |       e.preventDefault();
334 |       e.stopPropagation();
335 | 
336 |       $state.mode = "panning";
337 | 
338 |       const deltaX = ($settings.PAN_DIRECTION === "xy" || $settings.PAN_DIRECTION === "x") ? e.deltaX / $zoom : 0;
339 |       const deltaY = ($settings.PAN_DIRECTION === "xy" || $settings.PAN_DIRECTION === "y") ? e.deltaY / $zoom : 0;
340 | 
341 |       const boundX = clamp(
342 |         $viewX + deltaX,
343 |         $settings.BOUNDS!.minX !== null ? $settings.BOUNDS!.minX : -Infinity,
344 |         $settings.BOUNDS!.maxX !== null ? $settings.BOUNDS!.maxX - window.innerWidth : Infinity // todo: use bounding rect
345 |       );
346 |       const boundY = clamp(
347 |         $viewY + deltaY,
348 |         $settings.BOUNDS!.minY !== null ? $settings.BOUNDS!.minY : -Infinity,
349 |         $settings.BOUNDS!.maxY !== null ? $settings.BOUNDS!.maxY - window.innerHeight : Infinity
350 |       );
351 | 
352 |       $state.viewOffset.x.set(boundX, { duration: 0 });
353 |       $state.viewOffset.y.set(boundY, { duration: 0 });
354 | 
355 |       if (boundX % 3 === 0) { // todo: not only x !!
356 |         debounce("tela_board_pan_done", 250, () => dispatch("panDone", { offset: $state.viewOffset }));
357 |       }
358 | 
359 |       debounce("tela_trackpadPanModeReset", 60, () => $state.mode = "draw");
360 |     }
361 |   }
362 | 
363 |   function onKeyDown(e: KeyboardEvent) {
364 |     if (e.shiftKey) {
365 |       $state.mode = "select";
366 |     } else if (e.metaKey) {
367 |       $state.mode = "pan";
368 |     }
369 |   }
370 | 
371 |   function onKeyUp(e: KeyboardEvent) {
372 |     if (!e.shiftKey && !e.metaKey) {
373 |       $mode === "draw" && stopDrawing();
374 |       ($mode === "pan" || $mode === "panning") && stopPanning();
375 |       $mode === "select" && stopSelect();
376 |       $state.mode = "draw";
377 |     }
378 |   }
379 | 
380 |   function onMouseDown(e: MouseEvent | TouchEvent) {
381 |     if (hasClassOrParentWithClass(e.target as HTMLElement, "tela-ignore")) return;
382 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
383 |     const { x: clientX, y: clientY } = posToViewportPos(
384 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
385 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
386 |     );
387 | 
388 |     if (hasClassOrParentWithClass(target as HTMLElement, "tela-ignore")) return;
389 |     if ($mode === "pan" || (e as TouchEvent).targetTouches?.length === 1) {
390 |       $state.mode = "panning";
391 |       // todo: look into
392 |     }
393 | 
394 |     if ($mode === "draw") {
395 |       e.stopPropagation();
396 |       $state.mode = "drawing";
397 | 
398 |       selectState.init = { x: clientX, y: clientY };
399 |       selectState.curr = { x: clientX, y: clientY };
400 |       selectState.pos = { x: clientX, y: clientY };
401 |       selectState.size = { x: 0, y: 0 };
402 | 
403 |       document.addEventListener("mousemove", onMouseMoveDraw);
404 |       document.addEventListener("mouseup", onMouseUp, { once: true });
405 |     } else if ($mode === "panning") { // Todo: fix panning
406 |       e.stopPropagation();
407 | 
408 |       dragState.init = { x: clientX, y: clientY };
409 |       dragState.curr = { x: clientX, y: clientY };
410 | 
411 |       document.addEventListener("mousemove", onMouseMovePan);
412 |       document.addEventListener("mouseup", onMouseUp, { once: true });
413 |       document.addEventListener("touchmove", onMouseMovePan);
414 |       document.addEventListener("touchend", onMouseUp, { once: true });
415 |     } else if ($mode === "select") {
416 |       e.stopPropagation();
417 |       startSelect();
418 | 
419 |       selectState.init = { x: clientX, y: clientY };
420 |       selectState.curr = { x: clientX, y: clientY };
421 |       selectState.pos = { x: clientX, y: clientY };
422 |       selectState.size = { x: 0, y: 0 };
423 | 
424 |       document.addEventListener("mousemove", onMouseMoveSelect);
425 |       document.addEventListener("mouseup", onMouseUp, { once: true });
426 |     }
427 |   }
428 | 
429 |   function onBoardMouseDown(e: MouseEvent) {
430 |     $state.selection.update(_selection => {
431 |       _selection.clear();
432 |       return _selection;
433 |     })
434 |   }
435 | 
436 |   function onMouseMovePan(e: MouseEvent | TouchEvent) {
437 |     const { x: clientX, y: clientY } = posToViewportPos(
438 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
439 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
440 |     );
441 | 
442 |     dragState.offset = {
443 |       x: Math.floor(clientX - dragState.curr.x),
444 |       y: Math.floor(clientY - dragState.curr.y)
445 |     };
446 | 
447 |     dragState.curr = { x: clientX, y: clientY };
448 | 
449 |     const boundX = clamp(
450 |       $viewX - dragState.offset.x,
451 |       $settings.BOUNDS!.minX !== null ? $settings.BOUNDS!.minX : -Infinity,
452 |       $settings.BOUNDS!.maxX !== null ? $settings.BOUNDS!.maxX - window.innerWidth : Infinity
453 |     );
454 |     const boundY = clamp(
455 |       $viewY - dragState.offset.y,
456 |       $settings.BOUNDS!.minY !== null ? $settings.BOUNDS!.minY : -Infinity,
457 |       $settings.BOUNDS!.maxY !== null ? $settings.BOUNDS!.maxY - window.innerHeight : Infinity
458 |     );
459 | 
460 |     $state.viewOffset.x.set(boundX, { duration: 0 });
461 |     $state.viewOffset.y.set(boundY, { duration: 0 });
462 |   }
463 | 
464 |   function onMouseMoveSelect(e: MouseEvent) {
465 |     const { x: clientX, y: clientY } = posToViewportPos(
466 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
467 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
468 |     );
469 | 
470 |     selectState.offset = {
471 |       x: -Math.floor(selectState.init.x - selectState.curr.x),
472 |       y: -Math.floor(selectState.init.y - selectState.curr.y)
473 |     };
474 | 
475 |     selectState.pos.x = selectState.init.x;
476 |     selectState.pos.y = selectState.init.y;
477 | 
478 |     selectState.size.x = selectState.offset.x;
479 |     selectState.size.y = selectState.offset.y;
480 | 
481 |     if (selectState.size.x < 0) {
482 |       selectState.size.x = Math.abs(selectState.offset.x);
483 |       selectState.pos.x = selectState.init.x - selectState.size.x;
484 |     }
485 |     if (selectState.size.y < 0) {
486 |       selectState.size.y = Math.abs(selectState.offset.y);
487 |       selectState.pos.y = selectState.init.y - selectState.size.y;
488 |     }
489 | 
490 |     // todo: optimize if snapToGrid
491 |     // todo: calc chunkes
492 | 
493 |     selectState.curr = { x: clientX, y: clientY };
494 |     dispatch("selectMove", { selectState });
495 |   }
496 | 
497 |   function onMouseMoveDraw(e: MouseEvent | TouchEvent) {
498 |     const { x: clientX, y: clientY } = posToViewportPos(
499 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
500 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
501 |     );
502 | 
503 |     selectState.offset = {
504 |       x: -Math.floor(selectState.init.x - selectState.curr.x),
505 |       y: -Math.floor(selectState.init.y - selectState.curr.y)
506 |     };
507 | 
508 |     selectState.pos.x = selectState.init.x;
509 |     selectState.pos.y = selectState.init.y;
510 | 
511 |     selectState.size.x = selectState.offset.x;
512 |     selectState.size.y = selectState.offset.y;
513 | 
514 |     if (selectState.size.x < 0) {
515 |       selectState.size.x = Math.abs(selectState.offset.x);
516 |       selectState.pos.x = selectState.init.x - selectState.size.x;
517 |     }
518 |     if (selectState.size.y < 0) {
519 |       selectState.size.y = Math.abs(selectState.offset.y);
520 |       selectState.pos.y = selectState.init.y - selectState.size.y;
521 |     }
522 | 
523 |     selectState.curr = { x: clientX, y: clientY };
524 |   }
525 | 
526 |   function onMouseUp(e: MouseEvent | TouchEvent) {
527 |     if ($mode === "drawing") {
528 |       document.removeEventListener("mousemove", onMouseMoveDraw);
529 |       document.removeEventListener("touchmove", onMouseMoveDraw);
530 |       dispatch("drawEnd", { selection: { pos: selectState.pos, size: selectState.size } });
531 |     } else if ($mode === "panning") {
532 |       stopPanning();
533 |     } else if ($mode === "select") {
534 |       stopSelect();
535 |       dispatch("selectEnd", { selectionArea: { pos: selectState.pos, size: selectState.size } }); // todo: copy object to prevent nulling
536 |     }
537 |     $state.mode = "draw";
538 |     selectState = {
539 |         init: { x: 0, y: 0 },
540 |         curr: { x: 0, y: 0 },
541 |         offset: { x: 0, y: 0 },
542 |         pos: { x: 0, y: 0 },
543 |         size: { x: 0, y: 0 }
544 |       };
545 |   }
546 | 
547 |   //console.debug("Handling n positionables:", Array.from($chunks.values()).reduce((a, b) => a + b.length, 0));
548 |   //console.debug("Handling n chunks:", $chunks.size);
549 | 
550 |   onMount(() => {
551 |     const rec = containerEl.getBoundingClientRect();
552 |     console.log("rec", rec)
553 |     $state.viewPort = {
554 |       x: rec.x,
555 |       y: rec.y,
556 |       w: window.innerWidth,//rec.right - rec.left,
557 |       h: window.innerHeight//rec.bottom - rec.top
558 |     };
559 |   });
560 | </script>
561 | 
562 | {#if Object.values($settings.DEV).includes(true)}
563 |   <!-- todo: add dev toggle -->
564 |   <div
565 |     style="position: absolute; right: 1ch; top: 1ch; background: darkblue; z-index: 200; color: #fff; padding: 4px; display: flex; gap: 2ch; user-select: none; pointer-events: none;"
566 |   >
567 |     {#if $settings.DEV?.SHOW_POS}
568 |       <span>{Math.floor($viewX / $settings.CHUNK_SIZE)} // {Math.floor($viewY / $settings.CHUNK_SIZE)}</span>
569 |       <span>{$viewX} // {$viewY} // {$zoom}x</span>
570 |     {/if}
571 |     {#if $settings.DEV?.SHOW_MODE}
572 |       <span>{$mode}</span>
573 |     {/if}
574 |   </div>
575 | {/if}
576 | 
577 | <svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} on:wheel|nonpassive={onWheel}/>
578 | 
579 | <div
580 |   class="tela-container"
581 |   on:mousedown={onMouseDown}
582 |   on:touchstart|nonpassive={onMouseDown}
583 |   bind:this={containerEl}
584 | >
585 |   <div class="board mode-{$mode}" style="{transformCss} {$$restProps.style || ''}" on:mousedown={onBoardMouseDown}>
586 |     <!-- {#if ["select", "zoom", "pan", "panning"].includes($mode)}
587 |     <div class="dragIntercept"></div>
588 |   {/if} -->
589 |     {#if $mode === "select" || $mode === "drawing"}
590 |       <div class="selection-rect" style={selectionCss} />
591 |       <!-- <div id="dragIntercept">
592 |         <div id="selectionRect" style={selectionCss} bind:this={selectionRectEl} />
593 |       </div> -->
594 |     {/if}
595 | 
596 |     <slot name="meta" />
597 | 
598 |     <slot/>
599 |     </div>
600 | </div>
601 | 
602 | <style>
603 |   .tela-container {
604 |     width: 100%;
605 |     height: 100%;
606 | 
607 |     overflow: hidden;
608 |     /* overscroll-behavior: contain; */
609 |   }
610 |   .board {
611 |     position: relative;
612 |     height: 100%;
613 |     overflow: visible;
614 | 
615 |     will-change: transform;
616 |     isolation: isolate;
617 | 
618 |     /* transform-style: preserve-3d;
619 |     backface-visibility: hidden; */
620 |   }
621 | 
622 |   .dragIntercept {
623 |     background-color: transparent;
624 |     position: fixed;
625 |     z-index: 99999;
626 |     top: 0;
627 |     left: 0;
628 |     bottom: 0;
629 |     right: 0;
630 |   }
631 | 
632 |   .selection-rect {
633 |     position: absolute;
634 |     top: 0;
635 |     left: 0;
636 |     z-index: 99999;
637 |   }
638 | </style>
639 | 


--------------------------------------------------------------------------------
/src/lib/old2/Chunk.svelte:
--------------------------------------------------------------------------------
  1 | <script context="module" lang="ts">
  2 |   // /**
  3 |   //  * Bit merge two numbers together.
  4 |   //  * @param x
  5 |   //  * @param y
  6 |   //  */
  7 |   // export function makeCompositChunkPos(x: number, y: number) {
  8 |   //   return (x << 4) | y;
  9 |   // }
 10 |   // /**
 11 |   //  * Bit mask to get x component.
 12 |   //  * @param pos
 13 |   //  */
 14 |   // export function compositChunkPosX(pos: number) {
 15 |   //   return ((pos & 0b11110000) >> 4);
 16 |   // }
 17 |   // /**
 18 |   //  * Bit mask to get y component.
 19 |   //  * @param pos
 20 |   //  */
 21 |   // export function compositChunkPosY(pos: number) {
 22 |   //   return (pos & 0b00001111);
 23 |   // }
 24 |   // export function absToChunkIndex(x: number, y: number, chunkSize: number) {
 25 |   //   return makeCompositChunkPos(
 26 |   //     Math.floor(x / chunkSize),
 27 |   //     Math.floor(y / chunkSize)
 28 |   //   )
 29 |   // }
 30 |   export function absToChunkIndex(x: number, y: number, chunkSize: number) {
 31 |     return [Math.floor(x / chunkSize), Math.floor(y / chunkSize)];
 32 |   }
 33 |   export function positionableInView(
 34 |       posX: number,
 35 |       posY: number,
 36 |       width: number,
 37 |       height: number,
 38 |       vX: number,
 39 |       vY: number,
 40 |       CULL_MARGIN: number,
 41 |       viewPort: Vec2<number>,
 42 |       zoom: number
 43 |     ) {
 44 |       return (
 45 |         posX + width + CULL_MARGIN >= vX &&
 46 |         posY + height + CULL_MARGIN >= vY &&
 47 |         posX - CULL_MARGIN <= vX + viewPort.x / (zoom * 0.5) &&
 48 |         posY - CULL_MARGIN <= vY + viewPort.y / (zoom * 0.5)
 49 |       );
 50 |     }
 51 | </script>
 52 | 
 53 | <script lang="ts">
 54 |   import { getContext } from "svelte";
 55 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
 56 |   import type { Writable } from "svelte/store";
 57 |   import type { IPositionable } from "./Positionable.svelte";
 58 |   import { randomCssColor } from "./utils.js";
 59 | 
 60 |   export let positionables: Writable<IPositionable[]>;
 61 | 
 62 |   export let chunkX: number;
 63 |   export let chunkY: number;
 64 |   export let board: IBoard;
 65 |   const settings = getContext<Writable<IBoardSettings>>("settings");
 66 |   const state = board.state;
 67 |   $: ({ viewPort } = $state);
 68 |   $: ({ x: viewX, y: viewY } = $state.viewOffset);
 69 |   $: ({ zoom } = $state);
 70 | 
 71 |   $: cssStyle = `transform: translate3d(${chunkX * $settings.CHUNK_SIZE}px, ${
 72 |     chunkY * $settings.CHUNK_SIZE
 73 |   }px, 0); width: ${$settings.CHUNK_SIZE}px; height: ${$settings.CHUNK_SIZE}px; ${
 74 |     $settings.DEV.CHUNK_DBG ? `background-color: ${randomCssColor(0.5)};` : ""
 75 |   }`;
 76 | 
 77 |   function positionableInView(
 78 |     posX: number,
 79 |     posY: number,
 80 |     width: number,
 81 |     height: number,
 82 |     vX: number,
 83 |     vY: number
 84 |   ) {
 85 |     return (
 86 |       posX + width + $settings.CULL_MARGIN >= vX &&
 87 |       posY + height + $settings.CULL_MARGIN >= vY &&
 88 |       posX - $settings.CULL_MARGIN <= vX + viewPort.w / $zoom  &&
 89 |       posY - $settings.CULL_MARGIN <= vY + viewPort.h / $zoom
 90 |     );
 91 |   }
 92 | </script>
 93 | 
 94 | <div class="chunk" style={cssStyle}>
 95 |   {#if $settings.DEV.CHUNK_DBG}
 96 |     <span style="font-size: 4rem;">{`${chunkX} : ${chunkY}`}</span>
 97 |   {/if}
 98 | </div>
 99 | {#if $zoom > 0.2} <!-- todo: make cfg val -->
100 |     {#each $positionables as positionable, i (positionable.key)}
101 |       {#if positionableInView(positionable.posX, positionable.posY, positionable.width, positionable.height, $viewX, $viewY)}
102 |         <slot
103 |           item={positionable}
104 |           key={positionable.key}
105 |           x={positionable.posX}
106 |           y={positionable.posY}
107 |           width={positionable.width}
108 |           height={positionable.height}
109 |         />
110 |       {/if}
111 |     {/each}
112 |   {/if}
113 | 
114 | <style>
115 |   .chunk {
116 |     position: absolute;
117 |     top: 0;
118 |     left: 0;
119 |     z-index: -1;
120 |     backface-visibility: hidden;
121 |     /* will-change: transform; */
122 | 
123 |     /* transform-style: preserve-3d;
124 |     backface-visibility: hidden;
125 |     -webkit-transform-style: preserve-3d;
126 | -webkit-backface-visibility: hidden; */
127 |   }
128 | </style>
129 | 


--------------------------------------------------------------------------------
/src/lib/old2/Chunked.svelte:
--------------------------------------------------------------------------------
  1 | <script context="module" lang="ts">
  2 |   export function posToChunkPos(posX: number, posY: number, settings: IBoardSettings) {
  3 |     return {
  4 |       chunkX: Math.floor(posX / settings.CHUNK_SIZE),
  5 |       chunkY: Math.floor(posY / settings.CHUNK_SIZE)
  6 |     };
  7 |   }
  8 | </script>
  9 | <script lang="ts">
 10 |   import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
 11 |   import Chunk from "./Chunk.svelte";
 12 |   import { derived, get, writable, type Writable } from "svelte/store";
 13 |   import type { IPositionable } from "./Positionable.svelte";
 14 |   import type { IBoard, IBoardSettings, Vec2 } from "./index.ts";
 15 | 
 16 |   export let chunks: Writable<Map<string, Writable<IPositionable[]>>>;
 17 |   export let lazy = true;
 18 | 
 19 |   let htmlEl: HTMLDivElement;
 20 |   const dispatch = createEventDispatcher();
 21 | 
 22 |   const board = getContext<IBoard>("board");
 23 |   const settings = getContext<Writable<IBoardSettings>>("settings");
 24 | 
 25 |   const chunkComponent = import("./Chunk.svelte");
 26 | 
 27 |   let state = board.state;
 28 |   $: ({ viewPort } = $state);
 29 |   $: viewX = $state.viewOffset.x;
 30 |   $: viewY = $state.viewOffset.y;
 31 |   $: ({ zoom } = $state);
 32 | 
 33 |   let prevViewChunkX = 0;
 34 |   let prevViewChunkY = 0;
 35 |   let viewChunkX = writable(0);
 36 |   let viewChunkY = writable(0);
 37 | 
 38 |   // overcomplicated perf optimization -> todo: extract to custom "remembering" store
 39 |   let _viewChunkX = derived($state.viewOffset.x, (e) => Math.floor($viewX / $settings.CHUNK_SIZE));
 40 |   let _viewChunkY = derived($state.viewOffset.y, (e) => Math.floor($viewY / $settings.CHUNK_SIZE));
 41 |   _viewChunkX.subscribe((v) => {
 42 |     if (prevViewChunkX !== v) {
 43 |       prevViewChunkX = v;
 44 |       viewChunkX.set(v);
 45 |     }
 46 |   });
 47 |   _viewChunkY.subscribe((v) => {
 48 |     if (prevViewChunkY !== v) {
 49 |       prevViewChunkY = v;
 50 |       viewChunkY.set(v);
 51 |     }
 52 |   });
 53 | 
 54 |   $: {
 55 |     ($viewChunkX || $viewChunkY);
 56 |     dispatch("warmChunksChanged", { warmChunks: calcWarmChunks() });
 57 |   }
 58 | 
 59 |   // Utils
 60 |   /**
 61 |    * Calculated all chunks which are "warm" based on the loading settings.
 62 |    * Warm chunks should be loaded in the client app to be ready for display.
 63 |    */
 64 |   function calcWarmChunks() {
 65 |     const warmChunks = new Set<string>();
 66 |     const viewChunkW = Math.ceil(viewPort.w / $settings.CHUNK_SIZE / $zoom);
 67 |     const viewChunkH = Math.ceil(viewPort.h / $settings.CHUNK_SIZE / $zoom);
 68 | 
 69 |     for (let x = $viewChunkX - $settings.CHUNK_WARM_MARGIN; x < $viewChunkX + viewChunkW + $settings.CHUNK_WARM_MARGIN; x++) {
 70 |       for (let y = $viewChunkY - $settings.CHUNK_WARM_MARGIN; y < $viewChunkY + viewChunkH + $settings.CHUNK_WARM_MARGIN; y++) {
 71 |         warmChunks.add(`${x}:${y}`);
 72 |       }
 73 |     }
 74 | 
 75 |     return warmChunks;
 76 |   }
 77 | 
 78 |   function chunkInView(xChunk: number, yChunk: number, viewChunkX: number, viewChunkY: number) {
 79 |     return (
 80 |       xChunk + 1 + $settings.CHUNK_CULL_MARGIN / $settings.CHUNK_SIZE >= viewChunkX &&
 81 |       yChunk + 1 + $settings.CHUNK_CULL_MARGIN / $settings.CHUNK_SIZE >= viewChunkY &&
 82 |       xChunk * $settings.CHUNK_SIZE - $settings.CHUNK_SIZE - $settings.CHUNK_CULL_MARGIN <=
 83 |         $viewX + viewPort.w / $zoom &&
 84 |       yChunk * $settings.CHUNK_SIZE - $settings.CHUNK_SIZE - $settings.CHUNK_CULL_MARGIN <=
 85 |         $viewY + viewPort.h / $zoom
 86 |     );
 87 |   }
 88 | 
 89 |   // Handlers
 90 |   function onDraggableMoveEnd(e: CustomEvent<{ key: string, initChunk: Vec2<number>, newPos: Vec2<number> }>) {
 91 |     e.stopPropagation();
 92 |     const changed = new Set<string>();
 93 |     changed.add(`${e.detail.initChunk.x}:${e.detail.initChunk.y}`);
 94 | 
 95 |     // Handle chunk move
 96 |     const { chunkX: newChunkX, chunkY: newChunkY } = posToChunkPos(e.detail.newPos.x, e.detail.newPos.y, $settings);
 97 | 
 98 |     if (newChunkX !== e.detail.initChunk.x || newChunkY !== e.detail.initChunk.y) {
 99 |       changed.add(`${newChunkX}:${newChunkY}`);
100 |       chunks.update(_chunks => {
101 |         const initChunk = _chunks.get(`${e.detail.initChunk.x}:${e.detail.initChunk.y}`);
102 |         let positionable: IPositionable | undefined;
103 |         if (initChunk) {
104 |           const _positionable = get(initChunk).find(p => p.key === e.detail.key);
105 |           if (_positionable) {
106 |             positionable = _positionable;
107 |           }
108 |           initChunk.update(ck => {
109 |             ck = ck.filter(p => p.key !== e.detail.key);
110 |             return ck;
111 |           });
112 |         }
113 |         if (!positionable) {
114 |           alert("Positionable not found in chunk");
115 |           return _chunks; // todo: warn? dont rly need cuz if !chunked positionable should be fine.
116 |         }
117 |         const newChunk = _chunks.get(`${newChunkX}:${newChunkY}`);
118 |         if (!newChunk) {
119 |           _chunks.set(`${newChunkX}:${newChunkY}`, writable([positionable]));
120 |         }
121 |         else {
122 |           newChunk.update(ck => {
123 |             ck.push(positionable!);
124 |             return ck;
125 |           });
126 |         }
127 | 
128 |         return _chunks;
129 |       })
130 |     }
131 | 
132 |     // Sync chunk & page
133 |     board.onChunksChanged(chunks, changed);
134 |   }
135 |   function onPositionableChunkChanged(e: CustomEvent<{ key: string, initChunk: { x: number, y: number }, newChunk: { x: number, y: number }, newPos: { x: number, y: number } }>) {
136 |     const { key, initChunk, currChunk, newPos } = e.detail;
137 | 
138 |     chunks.update(cks => {
139 |       const initCk = cks.get(`${initChunk.x}:${initChunk.y}`);
140 |       if (!initCk) return cks; // todo: warn? dont rly need cuz if !chunked positionable should be fine.
141 | 
142 |       // Extract positionable & remove init chunk if empty.
143 |       let positionable: IPositionable | undefined;
144 |       initCk.update(ck => {
145 |         positionable = ck.find(p => p.key === key);
146 |         if (positionable) ck = ck.filter(p => p.key !== positionable!.key);
147 |         return ck;
148 |       });
149 |       if (!positionable) return cks; // todo: warn? dont rly need cuz if !chunked positionable should be fine.
150 |       if (get(initCk).length <= 0) {
151 |         cks.delete(`${initChunk.x}:${initChunk.y}`);
152 |       }
153 | 
154 |       // Update positionable.
155 |       positionable.posX = newPos.x;
156 |       positionable.posY = newPos.y;
157 | 
158 |       // Add positionable to new chunk.
159 |       if (!cks.has(`${currChunk.x}:${currChunk.y}`)) {
160 |         cks.set(`${currChunk.x}:${currChunk.y}`, writable([]));
161 |       }
162 |       cks.get(`${currChunk.x}:${currChunk.y}`)!.update(s => {
163 |         s.push(positionable!);
164 |         return s;
165 |       });
166 | 
167 |       return cks;
168 |     });
169 |   }
170 | 
171 |   onMount(() => {
172 |     htmlEl.addEventListener("draggable_move_end", onPositionableChunkChanged);
173 |   })
174 |   onMount(() => {
175 |     dispatch("warmChunksChanged", { warmChunks: calcWarmChunks() });
176 |   });
177 |   onDestroy(() => {
178 |     htmlEl && htmlEl.removeEventListener("draggable_move_end", onPositionableChunkChanged);
179 |   });
180 | </script>
181 | 
182 | <div class="chunked" bind:this={htmlEl}>
183 | <!-- {#key $chunksUpdate} -->
184 |   {#each $chunks.entries() as [k, v] (k)}
185 |     {@const cX = parseInt(k.split(":")[0])}
186 |     {@const cY = parseInt(k.split(":")[1])}
187 |     {#if chunkInView(cX, cY, $viewChunkX, $viewChunkY)}
188 |       {#if lazy}
189 |       {#await chunkComponent then c}
190 |         <svelte:component
191 |           this={c.default}
192 |           {board}
193 |           positionables={v}
194 |           chunkX={cX}
195 |           chunkY={cY}
196 |           let:item
197 |         >
198 |           <slot {item}/>
199 |         </svelte:component>
200 |       {/await}
201 |       {:else}
202 |       <Chunk
203 |           {board}
204 |             positionables={v}
205 |             chunkX={cX}
206 |             chunkY={cY}
207 |             let:item
208 |           >
209 |             <slot {item}/>
210 |           </Chunk>
211 |       {/if}
212 |     {/if}
213 |   {/each}
214 | <!-- {/key} -->
215 | </div>
216 | 
217 | <style>
218 |   .chunked {
219 |     display: contents;
220 |   }
221 | </style>


--------------------------------------------------------------------------------
/src/lib/old2/Draggable.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import { createEventDispatcher, getContext } from "svelte";
  3 |   import type { Vec2 } from "./types/Utils.type.js";
  4 |   import type { Writable } from "svelte/store";
  5 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
  6 |   import { hasClassOrParentWithClass, snapToGrid } from "./utils.js";
  7 |   import { moveToStackingTop } from "./Board.svelte";
  8 | 
  9 |   /**
 10 |    * Events:
 11 |    * - draggable_move
 12 |    * - draggable_move_end
 13 |    * - positionableChunkChanged<key, initChunk: dragState.initChunk, newChunk: { x: currChunkX, y: currChunkY }>
 14 |    */
 15 | 
 16 |   export let key: string;
 17 |   export let x: number;
 18 |   export let y: number;
 19 |   export let width: number;
 20 |   export let height: number;
 21 | 
 22 |   const dispatch = createEventDispatcher();
 23 | 
 24 |   const board = getContext<IBoard>("board");
 25 |   const settings = getContext<Writable<IBoardSettings>>("settings");
 26 |   const stackingOrder = getContext<Writable<string[]>>("stackingOrder");
 27 | 
 28 |   let htmlEl: HTMLDivElement;
 29 |   let state = board.state;
 30 |   $: ({ viewPort, selection } = $state);
 31 |   $: ({ x: viewX, y: viewY } = $state.viewOffset);
 32 |   $: ({ zoom } = $state);
 33 | 
 34 |   let dragState = {
 35 |     init: { x: 0, y: 0 },
 36 |     curr: { x: 0, y: 0 },
 37 |     offset: { x: 0, y: 0 },
 38 |     autoPanOffset : { x: 0, y: 0 },
 39 |     initChunk: { x: 0, y: 0 }
 40 |   };
 41 | 
 42 |   // Utils
 43 |   /**
 44 |    * Converts window position to board position.
 45 |    * @param x
 46 |    * @param y
 47 |    */
 48 |   function posToViewportPos(x: number, y: number) {
 49 |     return {
 50 |       x: x - $viewX - viewPort.x,
 51 |       y: y - $viewY + window.scrollY - viewPort.y
 52 |     };
 53 |   }
 54 | 
 55 |   // UI Handlers
 56 |   function onMouseDown(e: MouseEvent | TouchEvent) {
 57 |     const target = (e as TouchEvent).targetTouches?.item(0)?.target || (e as MouseEvent).target;
 58 |     const { x: clientX, y: clientY } = posToViewportPos(
 59 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
 60 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
 61 |     );
 62 | 
 63 |     if (hasClassOrParentWithClass(target as HTMLElement, "tela-ignore")) return;
 64 |     e.stopPropagation();
 65 | 
 66 |     // Reset selection to prevent remaining selection when moving sth. elese
 67 |     if (!$selection.has(key)) {
 68 |       $selection.clear();
 69 |     }
 70 | 
 71 |     //document.body.classList.add("dragging");
 72 |     // todo: handle touch
 73 | 
 74 |     // const sX = $settings.SNAP_TO_GRID ? snapToGrid(clientX, $settings.GRID_SIZE!) : clientX;
 75 |     // const sY = $settings.SNAP_TO_GRID ? snapToGrid(clientY, $settings.GRID_SIZE!) : clientY;
 76 | 
 77 |     dragState.init = { x: clientX, y: clientY };
 78 |     dragState.curr = { x: clientX, y: clientY };
 79 |     dragState.initChunk = {
 80 |       x: Math.floor(x / $settings.CHUNK_SIZE),
 81 |       y: Math.floor(y / $settings.CHUNK_SIZE)
 82 |     };
 83 | 
 84 |     document.addEventListener("mousemove", onMouseMove);
 85 |     document.addEventListener("mouseup", onMouseUp, { once: true });
 86 |     document.addEventListener("touchmove", onMouseMove);
 87 |     document.addEventListener("touchend", onMouseUp, { once: true });
 88 | 
 89 |     // Move to stack top.
 90 |     moveToStackingTop(stackingOrder, key);
 91 |     $state.mode = "dragging";
 92 | 
 93 |     dispatch("dragStart", { x, y });
 94 |     htmlEl.dispatchEvent(
 95 |       new CustomEvent("draggable_move_start", {
 96 |         detail: { key, x, y },
 97 |         bubbles: true
 98 |       })
 99 |     );
100 |   }
101 | 
102 |   let autoPanInterval: NodeJS.Timer | null = null;
103 |   function onMouseMove(e: MouseEvent | TouchEvent) {
104 |     const { x: clientX, y: clientY } = posToViewportPos(
105 |       (e as TouchEvent).targetTouches?.item(0)?.clientX || (e as MouseEvent).clientX,
106 |       (e as TouchEvent).targetTouches?.item(0)?.clientY || (e as MouseEvent).clientY
107 |     );
108 | 
109 |     dragState.offset = {
110 |       x: ((clientX - dragState.curr.x) / $zoom),
111 |       y: (clientY - dragState.curr.y) / $zoom
112 |     };
113 | 
114 |     dragState.curr = { x: clientX, y: clientY };
115 | 
116 |     // Auto Pan
117 |     // if (e.clientX < 200) {
118 |     //   if (autoPanInterval === null) {
119 |     //     autoPanInterval = setInterval(() => {
120 |     //       dragState.autoPanOffset.x -= 1;
121 |     //       // x -= 1;
122 |     //       $state.viewOffset.x.update((_x) => (_x -= 1), { duration: 0 });
123 |     //     }, 10);
124 |     //   }
125 |     // } else if (e.clientX > window.innerWidth - 200) {
126 |     //   if (autoPanInterval === null) {
127 |     //     autoPanInterval = setInterval(() => {
128 |     //       dragState.autoPanOffset.x += 1;
129 |     //       // x += 1;
130 |     //       $state.viewOffset.x.update((_x) => (_x += 1), { duration: 0 });
131 |     //     }, 10);
132 |     //   }
133 |     // }
134 |     // else {
135 |     //   if (autoPanInterval !== null) clearInterval(autoPanInterval);
136 |     //   autoPanInterval = null;
137 |     // }
138 | 
139 |     // todo: optimize setting pos?
140 | 
141 |     const newX = x + dragState.offset.x;
142 |     const newY = y + dragState.offset.y;
143 |     // const vpInit = posToViewportPos(dragState.init.x, dragState.init.y)
144 |     // const vpOffset
145 |     // const newX = vpInit.x + dragState.offset.x + dragState.autoPanOffset.x;
146 |     // const newY = vpInit.y + dragState.offset.y + dragState.autoPanOffset.y;
147 | 
148 |     // x = newX
149 |     // y = newY
150 | 
151 |     if ($settings.BOUNDS?.minX !== null && newX < $settings.BOUNDS!.minX) {
152 |       x = $settings.BOUNDS!.minX;
153 |     } else if ($settings.BOUNDS?.maxX !== null && newX + width > $settings.BOUNDS!.maxX) {
154 |       x = $settings.BOUNDS!.maxX - width;
155 |     } else {
156 |       x += dragState.offset.x;
157 |     }
158 | 
159 |     if ($settings.BOUNDS?.minY !== null && newY < $settings.BOUNDS!.minY) {
160 |       y = $settings.BOUNDS!.minY;
161 |     } else if ($settings.BOUNDS?.maxY !== null && newY + height > $settings.BOUNDS!.maxY) {
162 |       y = $settings.BOUNDS!.maxY - height;
163 |     } else {
164 |       y += dragState.offset.y;
165 |     }
166 | 
167 |     dispatch("dragMove", { key, x, y, offset: dragState.offset });
168 |     htmlEl.dispatchEvent(
169 |       new CustomEvent("draggable_move", {
170 |         detail: { key, x, y, offset: dragState.offset },
171 |         bubbles: true
172 |       })
173 |     );
174 |   }
175 | 
176 |   function onMouseUp(e: MouseEvent | TouchEvent) {
177 |     if (autoPanInterval !== null) clearInterval(autoPanInterval);
178 |     autoPanInterval = null;
179 |     $state.mode = "draw";
180 |     const currChunkX = Math.floor(x / $settings.CHUNK_SIZE);
181 |     const currChunkY = Math.floor(y / $settings.CHUNK_SIZE);
182 | 
183 |     x = $settings.SNAP_TO_GRID ? snapToGrid(x, $settings.GRID_SIZE!) : x;
184 |     y = $settings.SNAP_TO_GRID ? snapToGrid(y, $settings.GRID_SIZE!) : y;
185 |     width = $settings.SNAP_TO_GRID ? snapToGrid(width, $settings.GRID_SIZE!) : width;
186 |     height = $settings.SNAP_TO_GRID ? snapToGrid(height, $settings.GRID_SIZE!) : height;
187 | 
188 |     htmlEl.dispatchEvent(
189 |       new CustomEvent("draggable_move_end", {
190 |         detail: {
191 |           key,
192 |           initChunk: dragState.initChunk,
193 |           currChunk: { x: currChunkX, y: currChunkY },
194 |           newPos: { x, y }
195 |         },
196 |         bubbles: true
197 |       })
198 |     );
199 | 
200 |     document.removeEventListener("mousemove", onMouseMove);
201 |     document.removeEventListener("touchmove", onMouseMove);
202 |     dispatch("dragEnd", { x, y });
203 |   }
204 | </script>
205 | 
206 | <svelte:element
207 |   this="div"
208 |   {...$$restProps}
209 |   class="draggable {$$restProps.class || ''}"
210 |   on:mousedown={onMouseDown}
211 |   on:touchstart|nonpassive={onMouseDown}
212 |   bind:this={htmlEl}
213 | >
214 |   <slot />
215 | </svelte:element>
216 | 


--------------------------------------------------------------------------------
/src/lib/old2/Gradient.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import { getContext } from "svelte";
 3 |   import type { Writable } from "svelte/store";
 4 |   import type { TBoard } from "./types/Board.type.js";
 5 | 
 6 |   const board = getContext<Writable<TBoard>>("board");
 7 | 
 8 |     // todo: FIX
 9 | 
10 |   $: transformCss = `width: ${100 / $board.zoom}%; height: ${
11 |     100 / $board.zoom
12 |   }%; transform: translate(${
13 |     $board.viewOffset.x
14 |   }px, ${$board.viewOffset.y}px);`;
15 | 
16 |   $: backgroundCss = `background: repeating-linear-gradient(90deg, red, lime, red, lime); background-size: ${50 / $board.zoom}% ${50 / $board.zoom}%; background-position: ${Math.abs($board.viewOffset.x % 100)}% ${Math.abs($board.viewOffset.y % 100)}%;`;
17 | </script>
18 | 
19 | <div style="{transformCss} {backgroundCss}">
20 |   {Math.abs($board.viewOffset.x % 100)}
21 |   </div>
22 | 
23 | <style>
24 |   div {
25 |     position: absolute;
26 |     top: 0;
27 |     left: 0;
28 |     z-index: 1;
29 |   }
30 | </style>
31 | 


--------------------------------------------------------------------------------
/src/lib/old2/Grid.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import { getContext } from "svelte";
 3 |   import type { Writable } from "svelte/store";
 4 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
 5 | 
 6 |   export let dotColor = "black";
 7 |   export let dotOpacity = 30;
 8 |   export let dotSize = 1;
 9 | 
10 |   const board = getContext<IBoard>("board");
11 |   const settings = getContext<Writable<IBoardSettings>>("settings");
12 | 
13 |   const state = board.state;
14 |   let viewX = $state.viewOffset.x;
15 |   let viewY = $state.viewOffset.y;
16 |   let zoom = $state.zoom;
17 | 
18 |   // $: transformCss = `transform: translate(${$board.viewOffset.x}px, ${$board.viewOffset.y}px);`;
19 |   $: transformCss = `width: ${100 / $zoom}%; height: ${
20 |     100 / $zoom
21 |   }%; transform: translate3d(-${dotSize}px, -${dotSize}px, 0) translate3d(${
22 |     $viewX - ($viewX % $settings.GRID_SIZE!)
23 |   }px, ${$viewY - ($viewY % $settings.GRID_SIZE!)}px, 0);`;
24 | 
25 |   $: svgShiftCss = `transform: translate3d(-${
26 |     $viewX % $settings.GRID_SIZE!
27 |   }px, 0px, 0);`;
28 | </script>
29 | 
30 | <div class="grid" style={transformCss}>
31 |   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
32 |     <pattern
33 |       id="dotGrid"
34 |       x="0"
35 |       y="0"
36 |       width={$settings.GRID_SIZE}
37 |       height={$settings.GRID_SIZE}
38 |       patternUnits="userSpaceOnUse"
39 |     >
40 |       <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} fill-opacity="{dotOpacity}%" />
41 |     </pattern>
42 | 
43 |     <!-- Left square with user space tiles -->
44 |     <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
45 |   </svg>
46 | </div>
47 | 
48 | <style>
49 |   .grid {
50 |     position: relative;
51 |     min-height: 100%;
52 |     z-index: -1; /* we dont set it -1 intentionally so that elements not in the stacking order are not clickable -> todo: maybe this is not wanted */
53 |   }
54 |   .grid > svg {
55 |     position: absolute;
56 |     top: 0;
57 |     left: 0;
58 |   }
59 | </style>
60 | 


--------------------------------------------------------------------------------
/src/lib/old2/Positionable.svelte:
--------------------------------------------------------------------------------
  1 | <script context="module" lang="ts">
  2 |   export type IPositionable<KeyName extends string> = {
  3 |     pos_x: number;
  4 |     pos_y: number;
  5 |     width: number;
  6 |     height: number;
  7 |   } & {[P in KeyName]: string};
  8 | </script>
  9 | 
 10 | <script lang="ts">
 11 |   import { getContext, onDestroy, onMount, setContext } from "svelte";
 12 |   import type { Writable } from "svelte/store";
 13 |   import type { Vec2, Vec4 } from "./types/Utils.type.js";
 14 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
 15 |   import { isBrowser, snapToGrid } from "./utils.js";
 16 |   import type { Tweened } from "svelte/motion";
 17 |   import { scale } from "svelte/transition";
 18 |   import { cubicInOut } from "svelte/easing";
 19 | 
 20 |   // export let positionable: IPositionable;
 21 |   export let key: string;
 22 |   export let x: number;
 23 |   export let y: number;
 24 |   export let width: number;
 25 |   export let height: number;
 26 |   export let zIndex: number | undefined = undefined;
 27 |   export let preTransform: string | null = null;
 28 |   export let postTransform: string | null = null;
 29 | 
 30 |   let htmlEl: HTMLDivElement;
 31 |   const board = getContext<IBoard>("board");
 32 |   const settings = getContext<Writable<IBoardSettings>>("settings");
 33 |   const stackingOrder = getContext<Writable<string>>("stackingOrder");
 34 | 
 35 |   // $: ({ posX, posY, width, height } = positionable);
 36 |   // $: key = positionable[$settings.POSITIONABLE_KEY]; // todo: fix dis type
 37 | 
 38 |   let state = board.state;
 39 |   $: ({ viewPort, selection } = $state);
 40 |   $: ({ x: viewX, y: viewY } = $state.viewOffset);
 41 |   $: ({ zoom } = $state);
 42 |   $: z =
 43 |     zIndex !== undefined
 44 |       ? zIndex
 45 |       : $stackingOrder.indexOf(key) === -1
 46 |       ? 0
 47 |       : $stackingOrder.indexOf(key);
 48 | 
 49 |   $: transformCss = `transform: ${preTransform || ""} translate3d(${x}px, ${y}px, 0) ${
 50 |     postTransform || ""
 51 |   }; width: ${width}px; height: ${height}px; z-index: ${z};`;
 52 | 
 53 |   let dragging = false;
 54 | 
 55 |   // Handlers
 56 |   function onDraggableMove(e: CustomEvent<{ key: string, x: number, y: number, width: number, height: number }>) {
 57 |     //e.stopPropagation();
 58 |     // const { key, x: newPosX, y: newPosY } = e.detail;
 59 |     // x = newPosX;
 60 |     // x = newPosY; // todo: prob from chunk stuff -> use context to figure if in chunked mode
 61 |   }
 62 |   function onResizableChanged(e: CustomEvent<{ key: string, x: number, y: number, width: number, height: number }>) {
 63 |     e.stopPropagation();
 64 |     x = e.detail.x;
 65 |     y = e.detail.y;
 66 |     width = e.detail.width;
 67 |     height = e.detail.height;
 68 |   }
 69 |   // function onDraggableMoveEnd(e: CustomEvent<{ key: string, initChunk: Vec2<number>, newPos: Vec2<number> }>) {
 70 |   //   const { newPos } = e.detail;
 71 |   //   posX = newPos.x;
 72 |   //   posY = newPos.y;
 73 |   // }
 74 | 
 75 |   function onDraggableMoveStart(e: CustomEvent) {
 76 |     dragging = true;
 77 |   }
 78 |   function onDraggableMoveEnd(e: CustomEvent) {
 79 |     dragging = false;
 80 |     x = $settings.SNAP_TO_GRID ? snapToGrid(x, $settings.GRID_SIZE!) : x;
 81 |     y = $settings.SNAP_TO_GRID ? snapToGrid(y, $settings.GRID_SIZE!) : y;
 82 |     width = $settings.SNAP_TO_GRID ? snapToGrid(width, $settings.GRID_SIZE!) : width;
 83 |     height = $settings.SNAP_TO_GRID ? snapToGrid(height, $settings.GRID_SIZE!) : height;
 84 |   }
 85 |   function onResizableMoveEnd(e: CustomEvent) {
 86 |     width = $settings.SNAP_TO_GRID ? snapToGrid(width, $settings.GRID_SIZE!) : width;
 87 |     height = $settings.SNAP_TO_GRID ? snapToGrid(height, $settings.GRID_SIZE!) : height;
 88 |   }
 89 | 
 90 |   onMount(() => {
 91 |     htmlEl.addEventListener("draggable_move_start", onDraggableMoveStart);
 92 |     htmlEl.addEventListener("draggable_move_end", onDraggableMoveEnd);
 93 |     htmlEl.addEventListener("draggable_move", onDraggableMove);
 94 |     htmlEl.addEventListener("resizable_change", onResizableChanged);
 95 |     htmlEl.addEventListener("resizable_move_end", onResizableMoveEnd);
 96 |     // htmlEl.addEventListener("draggable_move_end", onDraggableMoveEnd);
 97 |   });
 98 |   onDestroy(() => {
 99 |     htmlEl && htmlEl.removeEventListener("draggable_move_start", onDraggableMoveStart);
100 |     htmlEl && htmlEl.removeEventListener("draggable_move_end", onDraggableMoveEnd);
101 |     htmlEl && htmlEl.removeEventListener("draggable_move", onDraggableMove);
102 |     htmlEl && htmlEl.removeEventListener("resizable_change", onResizableChanged);
103 |     htmlEl && htmlEl.removeEventListener("resizable_move_end", onResizableMoveEnd);
104 |   });
105 | </script>
106 | 
107 | <!-- transition:scale={{ duration: 120, opacity: 0, start: 0.8, easing: cubicInOut}} -->
108 | <svelte:element
109 |   this="div"
110 |   {...$$restProps}
111 |   class="positionable {$selection.has(key) ? 'selected' : ''} {$$restProps.class || ''}"
112 |   class:dragging
113 |   style="{transformCss} {$$restProps.style || ''}"
114 |   bind:this={htmlEl}
115 | >
116 |   <!-- {#if $zoom > 0.6} -->
117 |   <slot />
118 |   <!-- {/if} -->
119 | </svelte:element>
120 | 
121 | <style>
122 |   .positionable {
123 |     position: absolute;
124 |     top: 0;
125 |     left: 0;
126 |     transform-origin: top left;
127 | 
128 |     /* transform-style: preserve-3d;
129 |     backface-visibility: hidden; */
130 |   }
131 | </style>
132 | 


--------------------------------------------------------------------------------
/src/lib/old2/Resizable.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import { createEventDispatcher, getContext } from "svelte";
  3 |   import { clamp, hasClassOrParentWithClass, snapToGrid } from "./utils.js";
  4 |   import type { Writable } from "svelte/store";
  5 |   import type { IBoard, IBoardSettings } from "./types/Board.type.js";
  6 |   import type { IPositionable } from "./Positionable.svelte";
  7 |   import type { Vec2 } from "./index.js";
  8 | 
  9 |   // export let positionable: IPositionable;
 10 |   export let key: string;
 11 |   export let x: number;
 12 |   export let y: number;
 13 |   export let width: number;
 14 |   export let height: number;
 15 |   export let direction: "wn" | "ne" | "es" | "sw";
 16 |   export let minSize: Vec2<number> = { x: 0, y: 0 };
 17 |   export let maxSize: Vec2<number> = { x: Infinity, y: Infinity };
 18 |   // todo: aspect-ratio css override? (height unset)
 19 | 
 20 |   const board = getContext<IBoard>("board");
 21 |   const settings = getContext<Writable<IBoardSettings>>("settings");
 22 |   let state = board.state;
 23 |   $: ({ zoom } = $state);
 24 | 
 25 |   const dispatch = createEventDispatcher();
 26 |   let htmlEl: HTMLDivElement;
 27 | 
 28 |   let resizeState = {
 29 |     init: { x: 0, y: 0 },
 30 |     curr: { x: 0, y: 0 },
 31 |     offset: { x: 0, y: 0 }
 32 |   };
 33 | 
 34 |   // Utils
 35 |   function clampSize(size: Vec2<number>) {
 36 |     return {
 37 |       x: clamp(size.x, minSize.x, maxSize.x),
 38 |       y: clamp(size.y, minSize.y, maxSize.y)
 39 |     };
 40 |   }
 41 | 
 42 |   // UI Handlers
 43 |   function onMouseDown(e: MouseEvent) {
 44 |     if (hasClassOrParentWithClass(e.target as HTMLElement, "tela-ignore")) return;
 45 |     e.stopPropagation();
 46 | 
 47 |     let cX = e.clientX;
 48 |     let cY = e.clientY;
 49 |     // todo: handle touch
 50 | 
 51 |     const sX = cX//$settings.SNAP_TO_GRID ? snapToGrid(cX, $settings.GRID_SIZE!) : cX;
 52 |     const sY = cY//$settings.SNAP_TO_GRID ? snapToGrid(cY, $settings.GRID_SIZE!) : cY;
 53 | 
 54 |     resizeState.init = { x: sX, y: sY };
 55 |     resizeState.curr = { x: sX, y: sY };
 56 | 
 57 |     document.addEventListener("mousemove", onMouseMove);
 58 |     document.addEventListener("mouseup", onMouseUp, { once: true });
 59 | 
 60 |     $state.mode = "resizing";
 61 | 
 62 |     dispatch("resizeStart", { key, x, y, width, height });
 63 |   }
 64 | 
 65 |   function onMouseMove(e: MouseEvent) {
 66 |     let cX = e.clientX;
 67 |     let cY = e.clientY;
 68 | 
 69 |     resizeState.offset = {
 70 |       x: (cX - resizeState.curr.x) / $zoom,
 71 |       y: (cY - resizeState.curr.y) / $zoom
 72 |     };
 73 | 
 74 |     resizeState.curr = { x: e.clientX, y: e.clientY };
 75 | 
 76 |     if (direction === "wn") {
 77 |       // todo: optimize setting pos?
 78 |       width += resizeState.offset.x;
 79 |       height += resizeState.offset.y;
 80 |     }
 81 |     else if (direction === "ne") {
 82 |       width -= resizeState.offset.x;
 83 |       height += resizeState.offset.y;
 84 |       x += resizeState.offset.x;
 85 |     }
 86 |     else if (direction === "es") {
 87 |       width -= resizeState.offset.x;
 88 |       height -= resizeState.offset.y;
 89 |       y += resizeState.offset.y;
 90 |       x += resizeState.offset.x;
 91 |     }
 92 |     else if (direction === "sw") {
 93 |       width += resizeState.offset.x;
 94 |       height -= resizeState.offset.y;
 95 |       y += resizeState.offset.y;
 96 |     }
 97 | 
 98 |     const clamped = clampSize({ x: width, y: height });
 99 |     width = clamped.x;
100 |     height = clamped.y;
101 | 
102 |       htmlEl.dispatchEvent(
103 |         new CustomEvent("resizable_change", {
104 |           detail: { key, x, y, width, height },
105 |           bubbles: true
106 |         })
107 |       );
108 |       dispatch("resize", { key, x, y, width, height });
109 |     }
110 | 
111 |   function onMouseUp(e: MouseEvent) {
112 |     $state.mode = "draw"; // todo: fix
113 | 
114 |     const clamped = clampSize({ x: width, y: height });
115 |     x = $settings.SNAP_TO_GRID ? snapToGrid(x, $settings.GRID_SIZE!) : x;
116 |     y = $settings.SNAP_TO_GRID ? snapToGrid(y, $settings.GRID_SIZE!) : y;
117 |     width = $settings.SNAP_TO_GRID ? snapToGrid(clamped.x, $settings.GRID_SIZE!) : clamped.x;
118 |     height = $settings.SNAP_TO_GRID ? snapToGrid(clamped.y, $settings.GRID_SIZE!) : clamped.y;
119 | 
120 |     // positionable.width = clamped.x;
121 |     // positionable.height = clamped.y;
122 | 
123 |     htmlEl.dispatchEvent(
124 |         new CustomEvent("resizable_move_end", {
125 |           detail: { key, x, y, width, height },
126 |           bubbles: true
127 |         })
128 |       );
129 |     document.removeEventListener("mousemove", onMouseMove);
130 |     htmlEl.dispatchEvent(
131 |         new CustomEvent("resizable_change", {
132 |           detail: { key, x, y, width, height },
133 |           bubbles: true
134 |         })
135 |       );
136 |     dispatch("resizeEnd", { key, x, y, width, height });
137 |   }
138 | </script>
139 | 
140 | <svelte:element
141 |   this="div"
142 |   {...$$restProps}
143 |   class="resizable {$$restProps.class || ''}"
144 |   on:mousedown={onMouseDown}
145 |     bind:this={htmlEl}
146 | >
147 |   <slot />
148 | </svelte:element>
149 | 


--------------------------------------------------------------------------------
/src/lib/old2/index.ts:
--------------------------------------------------------------------------------
 1 | // import Board from "./Board.svelte";
 2 | // export default { Board };
 3 | 
 4 | export { default as Board } from "./Board.svelte";
 5 | export { createBoard, createSettings, moveToStackingTop } from "./Board.svelte";
 6 | 
 7 | export { default as Chunked } from "./Chunked.svelte";
 8 | export { default as Chunk } from "./Chunk.svelte";
 9 | export { positionableInView } from "./Chunk.svelte";
10 | 
11 | export { default as Positionable } from "./Positionable.svelte";
12 | export type { IPositionable } from "./Positionable.svelte";
13 | export { default as Draggable } from "./Draggable.svelte";
14 | export { default as Resizable } from "./Resizable.svelte";
15 | export { default as Grid } from "./Grid.svelte";
16 | // export { default as Gradient } from "./Gradient.svelte";
17 | 
18 | export { rectsIntersect, lerp, clamp, invlerp, map, hasClassOrParentWithClass, debounce } from "./utils.js";
19 | export type { IBoard, IBoardSettings, IBoardState, TBoardMode } from "./types/Board.type.js";
20 | export type { Vec2, DeepPartial, Vec4 } from "./types/Utils.type.js";
21 | 
22 | 
23 | // Reexport your entry components here
24 | 
25 | // export default {
26 | //   Board,
27 | //   Positionable,
28 | //   Draggable,
29 | //   Resizable,
30 | //   Grid
31 | // };
32 | 
33 | // export type {
34 | //   IBoardSettings,
35 | //   TBoard,
36 | //   Vec2
37 | // }
38 | 


--------------------------------------------------------------------------------
/src/lib/old2/tela.css:
--------------------------------------------------------------------------------
1 | 
2 | /* Mode Cursors */
3 | .board {
4 |   cursor: crosshair;
5 | }
6 | .board.mode-drawing {}


--------------------------------------------------------------------------------
/src/lib/old2/types/Board.type.ts:
--------------------------------------------------------------------------------
 1 | import type { Tweened } from "svelte/motion";
 2 | import type { Vec2, Vec4 } from "./Utils.type.js";
 3 | import type { Writable } from "svelte/store";
 4 | import type { IPositionable } from "$lib/Positionable.svelte";
 5 | 
 6 | export interface IBoardSettings {
 7 |   CAN_PAN: boolean;
 8 |   PAN_DIRECTION: "xy" | "x" | "y";
 9 | 
10 |   CAN_DRAW: boolean;
11 |   CAN_ZOOM: boolean;
12 |   CAN_SELECT: boolean;
13 | 
14 |   SNAP_TO_GRID: boolean;
15 |   GRID_SIZE: number;
16 | 
17 |   BOUNDS: {
18 |     minX: number | null;
19 |     maxX: number | null;
20 |     minY: number | null;
21 |     maxY: number | null;
22 |     minZoom: number | null;
23 |     maxZoom: number | null;
24 |     limit: "soft" | "hard";
25 |   };
26 | 
27 |   // mostly internal stuff
28 |   CULL: boolean;
29 |   CULL_MARGIN: number;
30 | 
31 |   // Chunking
32 |   CHUNK_SIZE: number;
33 |   CHUNK_CULL_MARGIN: number;
34 |   CHUNK_WARM_MARGIN: number;
35 | 
36 |   // Key property name used for positionable
37 |   POSITIONABLE_KEY: string;
38 | 
39 |   // dev stuff
40 |   DEV: {
41 |     SHOW_POS: boolean;
42 |     SHOW_MODE: boolean;
43 | 
44 |     // Display chunks as colored boxed
45 |     CHUNK_DBG: boolean;
46 |   };
47 | }
48 | export interface IBoardState {
49 |   viewOffset: { x: Tweened<number>, y: Tweened<number> };
50 |   viewPort: Vec4; // Store viewport position in case container el is not full window
51 |   zoom: Tweened<number>;
52 |   mode: TBoardMode;
53 |   selection: Writable<Set<string>>;
54 | }
55 | export interface IBoard {
56 |   state: Writable<IBoardState>;
57 | 
58 |   // Commands
59 |   setMode: (mode: TBoardMode) => void;
60 |   panTo: (x: number, y: number, duration?: number, delay?: number) => Promise<any>;
61 |   zoomTo: (zoom: number, duration?: number, delay?: number) => Promise<void>;
62 | 
63 |   // Handlers, called from inside tela. Can also be called from outside to extend functionality.
64 |   /**
65 |    * Called when positionable
66 |    */
67 |   onChunksChanged: (
68 |     chunks: Writable<Map<string, Writable<IPositionable[]>>>,
69 |     changed: Set<string>
70 |   ) => void;
71 | }
72 | 
73 | export type TBoardMode =
74 |   // Default mode
75 |   | "draw"
76 |   // Used when drawing with only left click
77 |   | "drawing"
78 |   // Used when select key is held down
79 |   | "select"
80 |   // Used when pan key is held down
81 |   | "pan"
82 |   // Used when panning
83 |   | "panning"
84 |   // Used when panTo is invoked
85 |   | "auto-panning"
86 |   // Used when zoom key is held down
87 |   | "zoom"
88 |   // Used when zoomTo is invoked
89 |   | "auto-zooming"
90 |   // Used when positionable is dragged around
91 |   | "dragging"
92 |   // Used when positionable is being resized
93 |   | "resizing";
94 | export interface TIBoardState { // todo; kill?
95 |   mode: TBoardMode;
96 | }


--------------------------------------------------------------------------------
/src/lib/old2/types/Utils.type.ts:
--------------------------------------------------------------------------------
1 | export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
2 | 
3 | // export type Vec2 = { x: number; y: number };
4 | export type Vec2<T> = { x: T; y: T };
5 | export type Vec4 = { x: number; y: number; w: number; h: number };
6 | 


--------------------------------------------------------------------------------
/src/lib/old2/utils.ts:
--------------------------------------------------------------------------------
 1 | import type { Writable } from "svelte/store";
 2 | import type { TBoardMode } from "./types/Board.type.ts";
 3 | import type { Vec2, Vec4 } from "./types/Utils.type.ts";
 4 | 
 5 | export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
 6 | export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
 7 | export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
 8 | export const map = (x1: number, y1: number, x2: number, y2: number, a: number) =>
 9 |   lerp(x2, y2, invlerp(x1, y1, a));
10 | 
11 | export function hasClassOrParentWithClass(element: HTMLElement, className: string): boolean {
12 |   if (!element) {
13 |     return false;
14 |   }
15 | 
16 |   if (element.classList.contains(className)) {
17 |     return true;
18 |   }
19 | 
20 |   if (element.parentElement) return hasClassOrParentWithClass(element.parentElement, className);
21 |   else return false;
22 | }
23 | 
24 | export function snapToGrid(value: number, snap: number): number {
25 |   return Math.floor(Math.round(value / snap) * snap);
26 | }
27 | 
28 | export function rectsIntersect(a: Vec4, b: Vec4) {
29 |   return (
30 |     a.x < b.x + b.w &&
31 |     a.x + a.w > b.x &&
32 |     a.y < b.y + b.h &&
33 |     a.y + a.h > b.y
34 |   );
35 | }
36 | 
37 | const debounceMap = new Map();
38 | export function debounce(id: string, ms: number, callback: () => void) {
39 |   if (debounceMap.has(id)) clearTimeout(debounceMap.get(id));
40 |   const timer = setTimeout(callback, ms);
41 |   debounceMap.set(id, timer);
42 | }
43 | 
44 | export function isBrowser() {
45 |   return typeof window !== "undefined";
46 | }
47 | 
48 | export function randomCssColor(alpha = 1) {
49 |   return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${alpha})`;
50 | }


--------------------------------------------------------------------------------
/src/lib/state-machine/fsm.ts:
--------------------------------------------------------------------------------
  1 | export type BaseState = string | symbol;
  2 | 
  3 | export type BaseAction = string;
  4 | 
  5 | export type BaseStates<State extends BaseState = BaseState> = Record<State, BaseActions>;
  6 | 
  7 | type Args = any[];
  8 | 
  9 | type LifecycleAction = (arg: {
 10 |   from: BaseState | null;
 11 |   to: BaseState;
 12 |   event: BaseAction | null;
 13 |   args: Args;
 14 | }) => void;
 15 | 
 16 | type AllArgsAction = (...args: Args) => BaseState;
 17 | 
 18 | type VoidFunction = (...args: Args) => void;
 19 | 
 20 | type ActionFunction = BaseState | AllArgsAction | VoidFunction;
 21 | 
 22 | export type BaseActions = {
 23 |   _enter?: LifecycleAction;
 24 |   _exit?: LifecycleAction;
 25 |   [key: BaseAction]: ActionFunction;
 26 | };
 27 | 
 28 | type DetectFallBackState<State extends BaseState> = State extends "*" ? string : State;
 29 | 
 30 | type ExtractStates<States extends BaseStates> = DetectFallBackState<Exclude<keyof States, number>>;
 31 | 
 32 | type ExtractObjectValues<Object> = Object[keyof Object];
 33 | 
 34 | type GetActionFunctionMapping<Actions extends BaseActions> = {
 35 |   [Key in Exclude<keyof Actions, "_enter" | "_exit">]: Actions[Key] extends BaseState
 36 |     ? () => Actions[Key] extends void ? BaseState : Actions[Key]
 37 |     : Actions[Key] extends VoidFunction
 38 |     ? (...args: Parameters<Actions[Key]>) => BaseState
 39 |     : Actions[Key];
 40 | };
 41 | 
 42 | type GetActionMapping<States extends BaseStates> = ExtractObjectValues<{
 43 |   [Key in keyof States]: GetActionFunctionMapping<States[Key]>;
 44 | }>;
 45 | 
 46 | type ExtractActions<States extends BaseStates> = GetActionMapping<States>;
 47 | 
 48 | type Unsubscribe = () => void;
 49 | 
 50 | type Subscribe<S extends BaseState> = (callback: (state: S) => void) => Unsubscribe;
 51 | 
 52 | export type StateMachine<State extends BaseState, Actions> = {
 53 |   [Key in keyof Actions]: Actions[Key] | AllArgsAction;
 54 | } & {
 55 |   subscribe: Subscribe<State>;
 56 | };
 57 | 
 58 | type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
 59 |   ? I
 60 |   : never;
 61 | 
 62 | declare const svelteFsm: <Sts extends Readonly<BaseStates>, S extends ExtractStates<Sts>>(
 63 |   state: S,
 64 |   states: Sts
 65 | ) => StateMachine<ExtractStates<Sts>, UnionToIntersection<ExtractActions<Sts>>>;
 66 | 
 67 | // export type svelteFsm;
 68 | // export default {
 69 | //   svelteFsm,
 70 | //   fsm
 71 | // };
 72 | 
 73 | export default function (state, states = {}) {
 74 |   /*
 75 |    * Core Finite State Machine functionality
 76 |    * - adheres to Svelte store contract (https://svelte.dev/docs#Store_contract)
 77 |    * - invoked events are dispatched to handler of current state
 78 |    * - transitions to returned state (or value if static property)
 79 |    * - calls _exit() and _enter() methods if they are defined on exited/entered state
 80 |    */
 81 |   const subscribers = new Set();
 82 |   let proxy;
 83 | 
 84 |   function subscribe(callback) {
 85 |     if (!(callback instanceof Function)) {
 86 |       throw new TypeError("callback is not a function");
 87 |     }
 88 |     subscribers.add(callback);
 89 |     callback(state);
 90 |     return () => subscribers.delete(callback);
 91 |   }
 92 | 
 93 |   function transition(newState, event, args) {
 94 |     const metadata = { from: state, to: newState, event, args };
 95 |     dispatch("_exit", metadata);
 96 |     state = newState;
 97 |     subscribers.forEach((callback) => callback(state));
 98 |     dispatch("_enter", metadata);
 99 |   }
100 | 
101 |   function dispatch(event, ...args) {
102 |     const action = states[state]?.[event] ?? states["*"]?.[event];
103 |     return action instanceof Function ? action.apply(proxy, args) : action;
104 |   }
105 | 
106 |   function invoke(event, ...args) {
107 |     const newState = dispatch(event, ...args)?.valueOf();
108 |     if (["string", "symbol"].includes(typeof newState) && newState !== state) {
109 |       transition(newState, event, args);
110 |     }
111 |     return state;
112 |   }
113 | 
114 |   /*
115 |    * Debounce functionality
116 |    * - `debounce` is lazily bound to dynamic event invoker methods (see Proxy section below)
117 |    * - `event.debounce(wait, ...args)` calls event with args after wait (unless called again first)
118 |    * - cancels all prior invocations made for the same event
119 |    * - cancels entirely when called with `wait` of `null`
120 |    */
121 |   const timeout = {};
122 | 
123 |   async function debounce(event, wait = 100, ...args) {
124 |     clearTimeout(timeout[event]);
125 |     if (wait === null) {
126 |       return state;
127 |     } else {
128 |       await new Promise((resolve) => (timeout[event] = setTimeout(resolve, wait)));
129 |       delete timeout[event];
130 |       return invoke(event, ...args);
131 |     }
132 |   }
133 | 
134 |   /*
135 |    * Proxy-based event invocation API:
136 |    * - return a proxy object with single native subscribe method
137 |    * - all other properties act as dynamic event invocation methods
138 |    * - event invokers also respond to .debounce(wait, ...args) (see above)
139 |    */
140 |   proxy = new Proxy(
141 |     { subscribe },
142 |     {
143 |       get(target, property) {
144 |         if (!Reflect.has(target, property)) {
145 |           target[property] = invoke.bind(null, property);
146 |           target[property].debounce = debounce.bind(null, property);
147 |         }
148 |         return Reflect.get(target, property);
149 |       }
150 |     }
151 |   );
152 | 
153 |   /*
154 |    * `_enter` initial state and return the proxy object
155 |    */
156 |   dispatch("_enter", { from: null, to: state, event: null, args: [] });
157 |   return proxy;
158 | }
159 | 


--------------------------------------------------------------------------------
/src/lib/stores/ChunkMap.ts:
--------------------------------------------------------------------------------
  1 | import type { IPositionable } from "$lib/Positionable.svelte";
  2 | import type { IBoard, IBoardSettings } from "$lib/index.js";
  3 | import { fastFilter, isInsideViewport } from "$lib/utils.js";
  4 | import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
  5 | import type { Readable } from "svelte/motion";
  6 | import { derived, get, writable, type Writable } from "svelte/store";
  7 | 
  8 | export function chunksStore(elements: Writable<Writable<IPositionable<any>>[]>, chunkOffset: Readable <{x: number, y: number}>) {
  9 |   const BOARD = getContext<IBoard<any, any>>("board");
 10 |   const SETTINGS = getContext<Writable<IBoardSettings>>("settings");
 11 |   const POSITIONABLE_KEY = get(SETTINGS).POSITIONABLE_KEY;
 12 |   const STATE = BOARD.state;
 13 |   const viewOffset = get(STATE).viewOffset;
 14 |   const viewPort = get(STATE).viewPort;
 15 |   const zoom = get(STATE).zoom;
 16 |   const dispatch = createEventDispatcher();
 17 | 
 18 |   const positionables = elements; //writable<Writable<IPositionable<any>>[]>([]);
 19 | 
 20 |   const hoisted = writable<Writable<IPositionable<any>>[]>([]);
 21 |   const chunks = writable(new Map<string, Writable<Writable<IPositionable<any>>[]>>());
 22 | 
 23 |   const visibleChunks = derived(
 24 |     [chunks, chunkOffset, viewPort, zoom],
 25 |     ([_chunks, _chunkOffset, _viewPort, _zoom]) => {
 26 |       const CHUNK_WIDTH = get(SETTINGS).CHUNK_WIDTH;
 27 |       const CHUNK_HEIGHT = get(SETTINGS).CHUNK_HEIGHT;
 28 | 
 29 |       return fastFilter(
 30 |         ([id, _]) => {
 31 |           const chunkX = parseInt(id.split(":")[0]);
 32 |           const chunkY = parseInt(id.split(":")[1]);
 33 |           return isInsideViewport(
 34 |             chunkX * CHUNK_WIDTH,
 35 |             chunkY * CHUNK_HEIGHT,
 36 |             CHUNK_WIDTH,
 37 |             CHUNK_HEIGHT,
 38 |             //$chunkOffset.x * CHUNK_WIDTH,
 39 |             //$chunkOffset.y * CHUNK_HEIGHT,
 40 |             _chunkOffset.x * CHUNK_WIDTH,
 41 |             _chunkOffset.y * CHUNK_HEIGHT,
 42 |             _viewPort,
 43 |             _zoom,
 44 |             CHUNK_WIDTH,
 45 |             CHUNK_HEIGHT
 46 |           );
 47 |         },
 48 |         [..._chunks.entries()]
 49 |       );
 50 |     },
 51 |     []
 52 |   );
 53 | 
 54 |   let oldVisiblePositionableIDs: string[] = [];
 55 |   const visiblePositionables = derived([positionables, hoisted, visibleChunks, viewOffset, viewPort, zoom], ([_positionables, _hoisted, _visibleChunks, _viewOffset, _viewPort, _zoom]) => {
 56 |     const visible = [
 57 |       ..._hoisted,
 58 |       ...fastFilter(
 59 |         (positionable) => {
 60 |           const p = get(positionable);
 61 |           return isInsideViewport(
 62 |             p.x,
 63 |             p.y,
 64 |             p.width,
 65 |             p.height,
 66 |             _viewOffset.x,
 67 |             _viewOffset.y,
 68 |             _viewPort,
 69 |             _zoom,
 70 |             0,
 71 |             0
 72 |           );
 73 |         },
 74 |         [..._visibleChunks.flatMap((e) => get(e[1]))]
 75 |       )
 76 |     ];
 77 | 
 78 |     const visibleIds = visible.map((e) => get(e)[POSITIONABLE_KEY]);
 79 |     //Leave events.
 80 |       for (let i = 0; i < oldVisiblePositionableIDs.length; i++) {
 81 |         const id = oldVisiblePositionableIDs[i];
 82 |         if (!visibleIds.includes(id)) {
 83 |           dispatch("positionableLeave", id);
 84 |         }
 85 |       }
 86 | 
 87 |       // Enter events.
 88 |       for (let i = 0; i < visibleIds.length; i++) {
 89 |         const id = visibleIds[i];
 90 |         if (!oldVisiblePositionableIDs.includes(id)) {
 91 |           dispatch("positionableEnter", id);
 92 |         }
 93 |       }
 94 |       oldVisiblePositionableIDs = visibleIds;
 95 | 
 96 |       return visible;
 97 |   });
 98 | 
 99 |   // UTILS
100 |   function findChunkContaining(positionable: Writable<IPositionable<any>>): [string, Writable<Writable<IPositionable<any>>[]>] | null {
101 |     for (const chunk of get(chunks).entries()) {
102 |       const [chunkId, chunkContents] = chunk;
103 |       if (get(chunkContents).includes(positionable)) {
104 |         return chunk;
105 |       }
106 |     }
107 |     return null;
108 |   }
109 | 
110 |   /**
111 |    * Removes all positionables that are no longer in the positionables store.
112 |    */
113 |   function updateExisting() {
114 |     const CHUNK_WIDTH = get(SETTINGS).CHUNK_WIDTH;
115 |     const CHUNK_HEIGHT = get(SETTINGS).CHUNK_HEIGHT;
116 | 
117 |     hoisted.update(_hoisted => {
118 |       _hoisted.forEach((_positionable, i) => {
119 |         const p = get(_positionable);
120 |         if (!get(positionables).includes(_positionable) || p.hoisted !== true) {
121 |           _hoisted.splice(i, 1);
122 |         }
123 |       })
124 |       return _hoisted;
125 |     });
126 | 
127 |     for (const chunk of get(chunks).entries()) {
128 |       const [chunkId, chunkContents] = chunk;
129 |       let empty = false;
130 |       chunkContents.update(_contents => {
131 |         _contents.forEach((_positionable, i) => {
132 |           const p = get(_positionable);
133 |           const pChunkId = `${Math.floor(p.x / CHUNK_WIDTH)}:${Math.floor(p.y / CHUNK_HEIGHT)}`;
134 |           if (!get(positionables).includes(_positionable) || pChunkId !== chunkId || p.hoisted === true) {
135 |             _contents.splice(i, 1);
136 |             if (_contents.length <= 0) empty = true;
137 |           }
138 |         });
139 |         // TODO: test, check all positions matching chunk it is inside?
140 |         return _contents;
141 |       })
142 |       if (empty) {
143 |         chunks.update(_chunks => {
144 |           _chunks.delete(chunkId);
145 |           return _chunks;
146 |         })
147 |       }
148 |     }
149 |   }
150 | 
151 |   /**
152 |    * Updates the chunk / hoisted map from the current positionables array.
153 |    */
154 |   function updateFromPositionables() {
155 |     const CHUNK_WIDTH = get(SETTINGS).CHUNK_WIDTH;
156 |     const CHUNK_HEIGHT = get(SETTINGS).CHUNK_HEIGHT;
157 |     chunks.update(_chunks => {
158 |       const _positionables = get(positionables);
159 |       for (let i = 0; i < _positionables.length; i++) {
160 |         const p = _positionables[i];
161 |         const _p = get(p);
162 |         const pChunkId = `${Math.floor(_p.x / CHUNK_WIDTH)}:${Math.floor(_p.y / CHUNK_HEIGHT)}`;
163 | 
164 |         // TODO: Hoised
165 |         if (_p.hoisted === true) {
166 |           hoisted.update(_hoisted => {
167 |             if (!_hoisted.includes(p)) {
168 |               _hoisted.push(p);
169 |             }
170 |             return _hoisted;
171 |           })
172 |         }
173 |         else {
174 |           if (!_chunks.has(pChunkId)) {
175 |             _chunks.set(pChunkId, writable<Writable<IPositionable<any>>[]>([p]));
176 |           }
177 |           else {
178 |             _chunks.get(pChunkId)!.update(_chunk => {
179 |               if (!_chunk.includes(p)) {
180 |                 _chunk.push(p);
181 |               }
182 |               return _chunk;
183 |             });
184 |           }
185 |         }
186 |       }
187 | 
188 |       return _chunks;
189 |     });
190 |   }
191 | 
192 |   function updatePositionable(positionable: Writable<IPositionable<any>>) {
193 |     const chunk = findChunkContaining(positionable);
194 |     if (chunk === null) return; // todo: hoisted
195 |     const [chunkId, chunkContents] = chunk;
196 |     console.warn(chunkId)
197 | 
198 |     let empty = false;
199 |     chunkContents.update(_contents => {
200 |       _contents.splice(_contents.indexOf(positionable), 1);
201 |       if (_contents.length <= 0) empty = true;
202 |       return _contents;
203 |     })
204 |     if (empty) {
205 |       chunks.update(_chunks => {
206 |         _chunks.delete(chunkId);
207 |         return _chunks;
208 |       })
209 |     }
210 | 
211 |     const CHUNK_WIDTH = get(SETTINGS).CHUNK_WIDTH;
212 |     const CHUNK_HEIGHT = get(SETTINGS).CHUNK_HEIGHT;
213 |     chunks.update((_chunks) => {
214 |       const p = positionable;
215 |       const _p = get(p);
216 |       const pChunkId = `${Math.floor(_p.x / CHUNK_WIDTH)}:${Math.floor(_p.y / CHUNK_HEIGHT)}`;
217 | 
218 |       // TODO: Hoised
219 |       if (_p.hoisted === true) {
220 |         updateExisting();
221 |         hoisted.update((_hoisted) => {
222 |           if (!_hoisted.includes(p)) {
223 |             _hoisted.push(p);
224 |           }
225 |           return _hoisted;
226 |         });
227 |       } else {
228 |         if (!_chunks.has(pChunkId)) {
229 |           _chunks.set(pChunkId, writable<Writable<IPositionable<any>>[]>([p]));
230 |         } else {
231 |           _chunks.get(pChunkId)!.update((_chunk) => {
232 |             if (!_chunk.includes(p)) {
233 |               _chunk.push(p);
234 |             }
235 |             return _chunk;
236 |           });
237 |         }
238 |       }
239 | 
240 |       return _chunks;
241 |     });
242 | 
243 |     //updateExisting();
244 |     //updateFromPositionables();
245 |   }
246 | 
247 |   function reload() {
248 |     updateExisting();
249 |     updateFromPositionables();
250 |   }
251 | 
252 |   function hoist(positionable: Writable<IPositionable<any>>) {
253 |     const chunk = findChunkContaining(positionable);
254 |     if (chunk === null) return;
255 |     const [chunkId, chunkContents] = chunk;
256 |     let empty = false;
257 |     chunkContents.update(_contents => {
258 |       _contents.splice(_contents.indexOf(positionable), 1);
259 |       if (_contents.length <= 0) empty = true;
260 |       return _contents;
261 |     })
262 |     if (empty) {
263 |       chunks.update(_chunks => {
264 |         _chunks.delete(chunkId);
265 |         return _chunks;
266 |       })
267 |     }
268 |     hoisted.update(_hoisted => {
269 |       if (!_hoisted.includes(positionable)) {
270 |         _hoisted.push(positionable);
271 |       }
272 |       return _hoisted;
273 |     });
274 |     positionable.update(v => {
275 |       // @ts-ignore we want this!
276 |       v.hoisted = true;
277 |       return v;
278 |     });
279 |     updatePositionable(positionable);
280 |   }
281 |   function unHoist(positionable: Writable<IPositionable<any>>) {
282 |     hoisted.update(_hoisted => {
283 |       _hoisted.splice(_hoisted.indexOf(positionable), 1);
284 |       return _hoisted;
285 |     })
286 |     positionable.update((v) => {
287 |       // @ts-ignore we want this!
288 |       v.hoisted = false;
289 |       return v;
290 |     });
291 |     updateFromPositionables();
292 |   }
293 | 
294 |   updateFromPositionables();
295 |   //updateExisting();
296 | 
297 |   onDestroy(positionables.subscribe((_positionables) => {
298 |     reload();
299 |   }))
300 | 
301 | 
302 |   return {
303 |     positionables,
304 |     hoisted,
305 |     chunks,
306 |     visibleChunks,
307 |     visiblePositionables,
308 |     reload,
309 |     updatePositionable,
310 |     hoist,
311 |     unHoist
312 |     // set
313 |     // add
314 |     // remove
315 |     // addPositionable
316 |     // removePositionable
317 | 
318 |     // subscribe,
319 |     // set,
320 |     // update,
321 |     // add: (positionable: IPositionable<any>) => update((positionables) => [...positionables, positionable]),
322 |     // remove: (positionable: IPositionable<any>) => update((positionables) => positionables.filter((p) => p !== positionable)),
323 |   }
324 | }


--------------------------------------------------------------------------------
/src/lib/tela.css:
--------------------------------------------------------------------------------
 1 | .tela-board.mode-pan * {
 2 |   user-select: none;
 3 |   pointer-events: none;
 4 | }
 5 | .tela-board.mode-dragging * {
 6 |   user-select: none;
 7 |   pointer-events: none;
 8 | }
 9 | .tela-board.mode-resizing * {
10 |   user-select: none;
11 |   pointer-events: none;
12 | }
13 | 
14 | .draggable {
15 |   cursor: grab;
16 | }
17 | .tela-container:has(.draggable.dragging) {
18 |   cursor: grabbing;
19 | }
20 | 
21 | .resizable.top {
22 |   cursor: ns-resize;
23 | }
24 | .resizable.right {
25 |   cursor: ew-resize;
26 | }
27 | .resizable.bottom {
28 |   cursor: ns-resize;
29 | }
30 | .resizable.left {
31 |   cursor: ew-resize;
32 | }
33 | .resizable.top-left {
34 |   cursor: nwse-resize;
35 | }
36 | .resizable.top-right {
37 |   cursor: nesw-resize;
38 | }
39 | .resizable.bottom-right {
40 |   cursor: nwse-resize;
41 | }
42 | .resizable.bottom-left {
43 |   cursor: nesw-resize;
44 | }


--------------------------------------------------------------------------------
/src/lib/types/Board.type.ts:
--------------------------------------------------------------------------------
 1 | import type { Spring, Tweened } from "svelte/motion";
 2 | import type { Readable, Writable } from "svelte/store";
 3 | import type { Vec4 } from "./Utils.type.js";
 4 | import type { BaseState, StateMachine } from "$lib/state-machine/fsm.js";
 5 | 
 6 | export interface IBoardSettings {
 7 |   CAN_PAN: boolean;
 8 |   PAN_DIRECTION: "xy" | "x" | "y";
 9 | 
10 |   CAN_DRAW: boolean;
11 |   CAN_ZOOM: boolean;
12 |   CAN_SELECT: boolean;
13 | 
14 |   SNAP_TO_GRID: boolean;
15 |   GRID_SIZE: number;
16 | 
17 |   BOUNDS: {
18 |     minX: number;
19 |     maxX: number;
20 |     minY: number;
21 |     maxY: number;
22 |     minZoom: number;
23 |     maxZoom: number;
24 |     limit: "soft" | "hard";
25 |   };
26 | 
27 |   // CULL: boolean;
28 |   // CULL_MARGIN: number;
29 | 
30 |   // Chunking
31 |   CHUNK_WIDTH: number;
32 |   CHUNK_HEIGHT: number;
33 |   // CHUNK_CULL_MARGIN: number;
34 |   // CHUNK_WARM_MARGIN: number;
35 | 
36 |   // Key property name used for positionable
37 |   POSITIONABLE_KEY: string;
38 | 
39 |   // show dev stuff
40 |   DEV: boolean;
41 | }
42 | 
43 | export type TBoardMode =
44 |   // Default mode
45 |   | "default"
46 |   | "drawing"
47 |   | "select"
48 |   // Used when pan key is held down
49 |   | "pan"
50 |   // Used when panning
51 |   | "panning"
52 |   // Used when panTo is invoked
53 |   | "auto-panning"
54 |   // Used when zoom key is held down
55 |   | "zoom"
56 |   // Used when zoomTo is invoked
57 |   | "auto-zooming"
58 |   // Used when positionable is dragged around
59 |   | "dragging"
60 |   // Used when positionable is being resized
61 |   | "resizing";
62 | 
63 | export interface IBoardState<BaseSt extends BaseState, Actions> {
64 |   viewOffset: Tweened<{ x: number, y: number }> | Spring<{ x: number, y: number }>;
65 |   viewPort: Writable<Vec4>;
66 |   zoom: Tweened<number>;
67 |   mode: StateMachine<BaseSt, Actions>;
68 |   selectionRect: Writable<Vec4 | null>;
69 |   selectionCss: Readable<string>;
70 |   selection: Writable<Set<string>>;
71 |   stackingOrder: Writable<string[]>;
72 | }
73 | 
74 | export interface IBoard<BaseSt extends BaseState, Actions> {
75 |   state: Writable<IBoardState<BaseSt, Actions>>;
76 | 
77 |   panTo: (
78 |     x: number,
79 |     y: number,
80 |     opts: { delay?: number; duration?: number; hard?: boolean }
81 |   ) => void;
82 |   zoomTo: (zoom: number, opts?: { delay?: number; duration?: number; soft?: string | number | boolean }) => Promise<void>;
83 | }


--------------------------------------------------------------------------------
/src/lib/types/Utils.type.ts:
--------------------------------------------------------------------------------
1 | export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
2 | 
3 | export type Vec2<T> = { x: T; y: T };
4 | export type Vec4 = { x: number; y: number; w: number; h: number };
5 | 


--------------------------------------------------------------------------------
/src/lib/utils.ts:
--------------------------------------------------------------------------------
  1 | import type { Vec4 } from "./types/Utils.type.js";
  2 | 
  3 | export function getDevicePixelRatio() {
  4 |   return window?.devicePixelRatio || 1;
  5 | }
  6 | 
  7 | const _debounceMap = new Map();
  8 | export function debounce(id: string, ms: number, callback: () => void) {
  9 |   if (_debounceMap.has(id)) clearTimeout(_debounceMap.get(id));
 10 |   const timer = setTimeout(callback, ms);
 11 |   _debounceMap.set(id, timer);
 12 | }
 13 | 
 14 | export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
 15 | export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
 16 | export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
 17 | export const map = (x1: number, y1: number, x2: number, y2: number, a: number) =>
 18 |   lerp(x2, y2, invlerp(x1, y1, a));
 19 | 
 20 | export function posToAbsolute(
 21 |   x: number,
 22 |   y: number,
 23 |   viewX: number,
 24 |   viewY: number,
 25 |   viewPort: Vec4,
 26 |   zoom: number
 27 | ) {
 28 |   // TODO: page scroll?
 29 |   // TODO: zoom?
 30 |   return {
 31 |     x: x / zoom + viewX - viewPort.x,
 32 |     y: y / zoom + viewY - viewPort.y
 33 |   };
 34 | }
 35 | 
 36 | /**
 37 |    * @param x
 38 |    * @param y
 39 |    * @param width
 40 |    * @param height
 41 |    * @param viewX
 42 |    * @param viewY
 43 |    * @param viewPort
 44 |    * @param zoom
 45 |    * @param CULL_MARGIN_WIDHT
 46 |    * @param CULL_MARGIN_HEIGHT
 47 |    */
 48 |   export function isInsideViewport(x: number, y: number, width: number, height: number, viewX: number, viewY: number, viewPort: Vec4, zoom: number, marginWidth = 0, marginHeight = 0) {
 49 |     return x + width + marginWidth >= viewX && y + height + marginHeight >= viewY && x - marginWidth <= viewX + viewPort.w / (zoom * 1) && y - marginHeight <= viewY + viewPort.h / (zoom * 1);
 50 |   }
 51 | 
 52 | export function hasClassOrParentWithClass(element: HTMLElement, className: string): boolean {
 53 |   if (!element) {
 54 |     return false;
 55 |   }
 56 | 
 57 |   if (element.classList.contains(className)) {
 58 |     return true;
 59 |   }
 60 | 
 61 |   if (element.parentElement) return hasClassOrParentWithClass(element.parentElement, className);
 62 |   else return false;
 63 | }
 64 | export function isTagOrParentWithTag(element: HTMLElement, tagName: string): boolean {
 65 |   if (!element) {
 66 |     return false;
 67 |   }
 68 | 
 69 |   if (element.tagName === tagName) {
 70 |     return true;
 71 |   }
 72 | 
 73 |   if (element.parentElement) return isTagOrParentWithTag(element.parentElement, tagName);
 74 |   else return false;
 75 | }
 76 | export function isTagsOrParentWithTags(element: HTMLElement, tagNames: string[]): boolean {
 77 |   if (!element) {
 78 |     return false;
 79 |   }
 80 | 
 81 |   if (tagNames.includes(element.tagName)) {
 82 |     return true;
 83 |   }
 84 | 
 85 |   if (element.parentElement) return isTagsOrParentWithTags(element.parentElement, tagNames);
 86 |   else return false;
 87 | }
 88 | 
 89 | export function isInsidePositionable(e: HTMLElement) {
 90 |   if (!e) {
 91 |     return false;
 92 |   }
 93 | 
 94 |   if (e.classList.contains("positionable")) {
 95 |     return e.dataset.id || false;
 96 |   }
 97 | 
 98 |   if (e.parentElement) return isInsidePositionable(e.parentElement);
 99 |   else return false;
100 | }
101 | 
102 | export function snapToGrid(value: number, snap: number): number {
103 |   return Math.floor(Math.round(value / snap) * snap);
104 | }
105 | 
106 | export function rectsIntersect(a: Vec4, b: Vec4) {
107 |   return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
108 | }
109 | 
110 | export function randomCssColor(alpha = 1) {
111 |   return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
112 |     Math.random() * 255
113 |   )}, ${alpha})`;
114 | }
115 | 
116 | /**
117 |  * Use raw for loop for performance increase.
118 |  */
119 | export const fastFilter = <T>(fn: (e: T) => boolean, arr: T[]) => {
120 |   const f = new Array<T>();
121 |   for (let i = 0; i < arr.length; i++) {
122 |     if (fn(arr[i])) {
123 |       f.push(arr[i]);
124 |     }
125 |   }
126 |   return f;
127 | };
128 | 
129 | export function hoistPositionable(key: string, el: HTMLElement) {
130 |   if (el) el.dispatchEvent(new CustomEvent("tela_hoist", { detail: key, bubbles: true }));
131 | }
132 | export function unHoistPositionable(key: string, el: HTMLElement) {
133 |   if (el) el.dispatchEvent(new CustomEvent("tela_unhoist", { detail: key, bubbles: true }));
134 | }


--------------------------------------------------------------------------------
/src/routes/+layout.svelte:
--------------------------------------------------------------------------------
1 | <script>
2 |   import "../app.css";
3 | </script>
4 | 
5 | <slot />


--------------------------------------------------------------------------------
/src/routes/+layout.ts:
--------------------------------------------------------------------------------
1 | export const ssr = false;
2 | export const prerender = false;


--------------------------------------------------------------------------------
/src/routes/+page.svelte:
--------------------------------------------------------------------------------
 1 | <h1>Tela</h1>
 2 | 
 3 | <h2>examples</h2>
 4 | 
 5 | 1. Basic Canvas setup with sth positioned on screen
 6 | 2. Canvas Interactivity
 7 |   - Draggable
 8 |   - Resizable
 9 | 2. Basic Canvas configuration
10 |   - zoom
11 |   - BOUNDS
12 |   - culling
13 |   - dev
14 |   - snap_to_grid & Grid size
15 | 2. Advanced customization
16 |   - Background grid


--------------------------------------------------------------------------------
/src/routes/dev/+page.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import { derived, get, writable, type Writable } from "svelte/store";
  3 |   import LazyComponent from "../v3/test/LazyComponent.svelte";
  4 |   import type { IPositionable } from "$lib/Positionable.svelte";
  5 |   import { fastFilter, isInsideViewport } from "$lib/utils.js";
  6 | 
  7 |   let cards: Writable<Writable<IPositionable<"key">>[]> = writable(
  8 |     Array.from({ length: 4500 }, (_, i) => {
  9 |       let x = {
 10 |         key: crypto.randomUUID() + i,
 11 |         x: Math.random() * 12000,
 12 |         y: Math.random() * 12000,
 13 |         width: 240,
 14 |         height: 100
 15 |       };
 16 |       let p = writable(x);
 17 |       return p;
 18 |     })
 19 |   );
 20 | 
 21 |   const offset = writable({ x: 0, y: 0 });
 22 |   const zoom = writable(0.6);
 23 | 
 24 |   let targetOffsetX = 0;
 25 |   let targetOffsetY = 0;
 26 | 
 27 |   const transformCSS = derived(offset, (_offset) => {
 28 |     return `transform-origin: top left; transform: scale(${$zoom * 100}%) translate3d(${
 29 |       _offset.x
 30 |     }px, ${_offset.y}px, 0px);`;
 31 |   });
 32 | 
 33 |   const visibleCards = derived([cards, offset, zoom], ([_cards, _offset, _zoom]) => {
 34 |     return fastFilter((_card) => {
 35 |       const card = get(_card);
 36 |       return isInsideViewport(
 37 |         card.x,
 38 |         card.y,
 39 |         card.width,
 40 |         card.height,
 41 |         -_offset.x,
 42 |         -_offset.y,
 43 |         { w: window.innerWidth, h: window.innerHeight, x: 0, y: 0 },
 44 |         _zoom,
 45 |         0,
 46 |         0
 47 |       );
 48 |     }, _cards);
 49 |   });
 50 | 
 51 |   let animationFrame: number | null = null;
 52 | 
 53 |   function onWheel(e: WheelEvent) {
 54 |     if (e.ctrlKey) {
 55 |       e.preventDefault();
 56 |       zoom.update((_zoom) => {
 57 |         _zoom += e.deltaY * -0.01;
 58 |         if (_zoom < 0.1) _zoom = 0.1;
 59 |         if (_zoom > 10) _zoom = 10;
 60 |         return _zoom;
 61 |       });
 62 |     } else {
 63 |       e.preventDefault();
 64 |       targetOffsetX -= e.deltaX;
 65 |       targetOffsetY -= e.deltaY;
 66 |       // offset.update((_offset) => {
 67 |       //   _offset.x = targetOffsetX;
 68 |       //   _offset.y = targetOffsetY;
 69 |       //   return _offset;
 70 |       // });
 71 | 
 72 |       if (animationFrame === null) {
 73 |         animationFrame = requestAnimationFrame(() => {
 74 |           $offset = { x: targetOffsetX, y: targetOffsetY };
 75 |           // offset.update((_offset) => {
 76 |           //   _offset.x = targetOffsetX;
 77 |           //   _offset.y = targetOffsetY;
 78 |           //   return _offset;
 79 |           // });
 80 |           animationFrame = null;
 81 |         });
 82 |       }
 83 |     }
 84 |   }
 85 | </script>
 86 | 
 87 | <div style="position: fixed; top: 0; right: 0;z-index: 200;">
 88 |   <ul>
 89 |     <li><small>visible P: {$visibleCards.length}</small></li>
 90 |   </ul>
 91 | </div>
 92 | 
 93 | <main on:wheel={onWheel}>
 94 |   <div class="board" style={$transformCSS}>
 95 |     {#each $visibleCards as card (get(card).key)}
 96 |       <LazyComponent this={() => import("./Card.svelte")}>
 97 |         <svelte:fragment slot="component" let:Component>
 98 |           <Component {card} />
 99 |         </svelte:fragment>
100 |       </LazyComponent>
101 |     {/each}
102 |   </div>
103 | </main>
104 | 
105 | <style>
106 |   :global(body) {
107 |     overflow: hidden;
108 |   }
109 |   main {
110 |     overflow: hidden;
111 |     width: 100vw;
112 |     height: 100vh;
113 |   }
114 |   .board {
115 |     backface-visibility: hidden;
116 |     /* will-change: transform; */
117 |   }
118 | </style>
119 | 


--------------------------------------------------------------------------------
/src/routes/dev/Card.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import type { IPositionable } from "$lib/Positionable.svelte";
 3 |   import { randomCssColor } from "$lib/utils.js";
 4 |   import { derived, type Writable } from "svelte/store";
 5 | 
 6 |   export let card: Writable<IPositionable<"key">>;
 7 | 
 8 |   const transformCss = derived(card, (_card) => {
 9 |     return `left: ${_card.x}px; top: ${_card.y}px; width: ${_card.width}px; height: ${_card.height}px; contain-intrinsic-size: ${_card.width}px ${_card.height}px;`;
10 |   });
11 |   // const transformCss = derived(card, (_card) => {
12 |   //   return `transform: translate(${_card.x}px, ${_card.y}px); width: ${_card.width}px; height: ${_card.height}px; contain-intrinsic-size: ${_card.width}px ${_card.height}px;`;
13 |   // });
14 | </script>
15 | 
16 | <div style="{$transformCss} --bg: {randomCssColor()};">
17 |   <!--<slot/>-->
18 |   foo bar
19 | </div>
20 | 
21 | <style>
22 |   div {
23 |     position: absolute;
24 |     top: 0;
25 |     left: 0;
26 |     backface-visibility: hidden;
27 |     background: var(--bg);
28 |     border: 1px solid rgba(52, 34, 132, 0.793);
29 |   }
30 | </style>
31 | 


--------------------------------------------------------------------------------
/src/routes/examples/README.md:
--------------------------------------------------------------------------------
1 | # Examples
2 | 
3 | ## `/notes`
4 | An example bare bones note-taking app. It allows you to create new notes by dragging on the board, moving and editing them.
5 | 
6 | 


--------------------------------------------------------------------------------
/src/routes/v3/test/+page.svelte:
--------------------------------------------------------------------------------
  1 | <script lang="ts">
  2 |   import Board, { createBoard, createSettings } from "$lib/Board.svelte";
  3 |   import type { Vec4 } from "$lib/types/Utils.type.js";
  4 |   import { rectsIntersect } from "$lib/utils.js";
  5 |   import { get, writable, type Writable } from "svelte/store";
  6 |   import "$lib/tela.css";
  7 |   import LazyComponent from "./LazyComponent.svelte";
  8 |   import type { IPositionable } from "$lib/Positionable.svelte";
  9 |   import Grid from "$lib/Grid.svelte";
 10 |   import Card from "./Card.svelte";
 11 | 
 12 |   interface ICard {
 13 |     key: string;
 14 |     pos_x: number;
 15 |     pos_y: number;
 16 |     width: number;
 17 |     height: number;
 18 |     positionable: Writable<IPositionable<"key">>;
 19 |   }
 20 | 
 21 |   let stackingOrder = writable<string[]>([]);
 22 |   let cards: Writable<Writable<IPositionable<"key">>[]> = writable(
 23 |     Array.from({ length: 8000 }, (_, i) => {
 24 |       let x = {
 25 |         key: crypto.randomUUID() + i,
 26 |         x: Math.random() * 22000,
 27 |         y: Math.random() * 22000,
 28 |         // x: i * 510,
 29 |         // y: 250,
 30 |         // y: 20,
 31 |         width: 240,
 32 |         height: 100,
 33 |         hoisted: false
 34 |       };
 35 |       let p = writable(x);
 36 |       // return {
 37 |       //   ...x, positionable: p
 38 |       // }
 39 |       return p;
 40 |     })
 41 |   );
 42 |   stackingOrder.update((_o) => {
 43 |     get(cards).forEach((c) => {
 44 |       let _c = get(c);
 45 |       _o.push(_c.key);
 46 |     });
 47 |     return _o;
 48 |   });
 49 | 
 50 |   // Tela Handlers
 51 |   function onMetaSelectEnd(e: CustomEvent<{ rect: Vec4 }>) {
 52 |     const { rect } = e.detail;
 53 |     cards.update((_cards) => {
 54 |       _cards.push(
 55 |         writable({
 56 |           key: crypto.randomUUID(),
 57 |           x: rect.x,
 58 |           y: rect.y,
 59 |           width: rect.w,
 60 |           height: rect.h,
 61 |           z: 0
 62 |         })
 63 |       );
 64 |       return _cards;
 65 |     });
 66 |   }
 67 | 
 68 |   const settings = createSettings({
 69 |     // PAN_DIRECTION: "x",
 70 |     DEV: true,
 71 |     SNAP_TO_GRID: true,
 72 |     GRID_SIZE: 30,
 73 |     CHUNK_WIDTH: 300,
 74 |     CHUNK_HEIGHT: 300,
 75 |   });
 76 |   const board = createBoard(settings, stackingOrder, {}, "idle", {
 77 |     idle: { select: "select", pan: "pan" },
 78 |     pan: { idle: "idle" },
 79 |     select: { idle: "idle" },
 80 |     metaSelect: { idle: "idle" }
 81 |   });
 82 | 
 83 |   let state = board.state;
 84 |   $: ({ selectionCss } = $state);
 85 |   state.update(v => {
 86 |     v.stackingOrder.set(get(stackingOrder));
 87 |     return v;
 88 |   })
 89 | 
 90 |   function onDelete(e: any) {
 91 |     const key = e.detail;
 92 |     cards.update(_cards => {
 93 |         const index = _cards.findIndex(e => get(e).key === key)
 94 |         if (index !== -1) {
 95 |           _cards.splice(index, 1)
 96 |         }
 97 |         return _cards
 98 |       })
 99 |   }
100 | 
101 |   // let lazyCard = () => import("./Card.svelte").then((m) => m.default);
102 | </script>
103 | 
104 | <!--
105 |   on:draggableChanged={() => console.log("draggableChanged")}
106 |     on:resizableChanged={() => console.log("resizableChanged")}
107 |     on:positionableLeave={(e) => console.log("positionableLeave", e.detail)}
108 |     on:positionableEnter={(e) => console.log("positionableEnter", e.detail)}
109 | -->
110 | <main>
111 |   <Board
112 |     {board}
113 |     {settings}
114 |     {stackingOrder}
115 |     positionables={cards}
116 |     let:positionable
117 |     on:metaSelectChange={() => {}}
118 |     on:metaSelectEnd={onMetaSelectEnd}
119 | 
120 |   >
121 |     <svelte:fragment slot="selectRect">
122 |       <div class="selectionRect" style={$selectionCss} />
123 |     </svelte:fragment>
124 | 
125 |     <svelte:fragment slot="raw">
126 |       <Grid />
127 |     </svelte:fragment>
128 | 
129 |     <LazyComponent this={() => import("./Card.svelte")}>
130 |       <svelte:fragment slot="component" let:Component>
131 |         <Component card={positionable} on:delete={onDelete}/>
132 |       </svelte:fragment>
133 |     </LazyComponent>
134 | 
135 |     <!-- <svelte:fragment> -->
136 |     <!-- <Positionable {positionable}> -->
137 |     <!-- card {get(positionable).key}
138 |         <input type="range" min="0" max="2000" />
139 |         <textarea rows="3"></textarea>
140 |         <br>
141 |         <div contenteditable="true">fio bar test asf</div>-->
142 |     <!-- </Positionable> -->
143 |     <!-- </svelte:fragment> -->
144 | 
145 |     <!-- {#each visibleCards as card, i (get(card).key)}
146 |       <LazyComponent this={() => import("./Card.svelte")}>
147 |         <svelte:fragment slot="component" let:Component>
148 |           <Component {card} />
149 |         </svelte:fragment>
150 |       </LazyComponent> -->
151 | 
152 |     <!-- visible={isInsideViewport(card.pos_x, card.pos_y, card.width, card.height, $viewX, $viewY, viewPort, $zoom, 0)} -->
153 |     <!-- <Positionable key={card.key} x={card.pos_x} y={card.pos_y} width={card.width} height={card.height}>
154 |       <Draggable key={card.key} bind:x={card.pos_x} bind:y={card.pos_y} width={card.width} height={card.height}/>
155 |       card {i}
156 |       <input type="range" min="0" max="2000" />
157 |     </Positionable> -->
158 |     <!-- {@const c = get(card)} -->
159 |     <!-- <svelte:component this={lazyCard} positionable={card}> -->
160 |     <!-- <Resizable
161 |           positionable={card}
162 |           direction="top"
163 |           on:mousedown={onDragMouseDown}
164 |           on:mousemove={onDragMouseUp}
165 |         />
166 |         <Resizable
167 |           positionable={card}
168 |           direction="right"
169 |           on:mousedown={onDragMouseDown}
170 |           on:mousemove={onDragMouseUp}
171 |         />
172 |         <Resizable
173 |           positionable={card}
174 |           direction="bottom"
175 |           on:mousedown={onDragMouseDown}
176 |           on:mousemove={onDragMouseUp}
177 |         />
178 |         <Resizable
179 |           positionable={card}
180 |           direction="left"
181 |           on:mousedown={onDragMouseDown}
182 |           on:mousemove={onDragMouseUp}
183 |         />
184 |         <Resizable
185 |           positionable={card}
186 |           direction="top-right"
187 |           on:mousedown={onDragMouseDown}
188 |           on:mousemove={onDragMouseUp}
189 |         />
190 |         <Resizable
191 |           positionable={card}
192 |           direction="top-left"
193 |           on:mousedown={onDragMouseDown}
194 |           on:mousemove={onDragMouseUp}
195 |         />
196 |         <Resizable
197 |           positionable={card}
198 |           direction="bottom-right"
199 |           on:mousedown={onDragMouseDown}
200 |           on:mousemove={onDragMouseUp}
201 |         />
202 |         <Resizable
203 |           positionable={card}
204 |           direction="bottom-left"
205 |           on:mousedown={onDragMouseDown}
206 |           on:mousemove={onDragMouseUp}
207 |         /> -->
208 |     <!-- <Draggable positionable={card}>
209 |           card {i}
210 |           <input type="range" min="0" max="2000" />
211 |           <textarea rows="3" />
212 |           <br />
213 |           <div contenteditable="true">fio bar test asf</div>
214 |         </Draggable>
215 |       </svelte:component> -->
216 |     <!-- <Positionable positionable={card}>
217 |         card {i}
218 |         <input type="range" min="0" max="2000" />
219 |         <textarea rows="3"></textarea>
220 |         <br>
221 |         <div contenteditable="true">fio bar test asf</div>
222 |     </Positionable> -->
223 |     <!-- <LazyCard component={Positionable} positionable={card}>
224 |         card {i}
225 |         <input type="range" min="0" max="2000" />
226 |         <textarea rows="3"></textarea>
227 |         <br>
228 |         <div contenteditable="true">fio bar test asf</div>
229 |     </LazyCard>-->
230 |     <!-- {/each} -->
231 |   </Board>
232 | </main>
233 | 
234 | <style>
235 |   main {
236 |     width: 100%;
237 |     height: 100vh;
238 |   }
239 |   :global(*) {
240 |     user-select: none;
241 |   }
242 |   :global(.positionable) {
243 |     background: rgb(98, 95, 112);
244 |     background: var(--bg);
245 |     border: 1px solid rgba(52, 34, 132, 0.793);
246 |   }
247 |   :global(.draggable) {
248 |     background: rgba(54, 93, 221, 0.2);
249 |     padding: 10px;
250 |     width: 100%;
251 |     height: 100%;
252 |     /*position: absolute;
253 |     top: 0;
254 |     left: 0; */
255 |   }
256 |   .selectionRect {
257 |     position: absolute;
258 |     background: rgba(46, 96, 234, 0.372);
259 |   }
260 |   :global(.positionable) {
261 |     border: 4px solid green;
262 |   }
263 |   :global(.positionable.selected) {
264 |     border: 4px solid red;
265 |   }
266 |   :global(.resizable) {
267 |     /* background: lime; */
268 |     width: 25px;
269 |     height: 25px;
270 |     position: absolute;
271 |     z-index: 300;
272 |   }
273 |   :global(.resizable.top-right) {
274 |     top: -10px;
275 |     right: -10px;
276 |   }
277 |   :global(.resizable.top-left) {
278 |     top: -10px;
279 |     left: -10px;
280 |   }
281 |   :global(.resizable.bottom-right) {
282 |     bottom: -10px;
283 |     right: -10px;
284 |   }
285 |   :global(.resizable.bottom-left) {
286 |     bottom: -10px;
287 |     left: -10px;
288 |   }
289 |   :global(.resizable.top) {
290 |     top: -10px;
291 |     left: 50%;
292 |     transform: translateX(-50%);
293 |   }
294 |   :global(.resizable.right) {
295 |     top: 50%;
296 |     right: -10px;
297 |     transform: translateY(-50%);
298 |   }
299 |   :global(.resizable.bottom) {
300 |     bottom: -10px;
301 |     left: 50%;
302 |     transform: translateX(-50%);
303 |   }
304 |   :global(.resizable.left) {
305 |     top: 50%;
306 |     left: -10px;
307 |     transform: translateY(-50%);
308 |   }
309 | </style>
310 | 


--------------------------------------------------------------------------------
/src/routes/v3/test/Card.svelte:
--------------------------------------------------------------------------------
 1 | <script lang="ts">
 2 |   import Draggable from "$lib/Draggable.svelte";
 3 |   import Positionable from "$lib/Positionable.svelte";
 4 |   import type { IPositionable } from "$lib/Positionable.svelte";
 5 |   import Resizable from "$lib/Resizable.svelte";
 6 |   import { hoistPositionable, randomCssColor, unHoistPositionable } from "$lib/utils.js";
 7 |   import { createEventDispatcher } from "svelte";
 8 |   import type { Writable } from "svelte/store";
 9 | 
10 |   export let card: Writable<IPositionable<"key">>;
11 |   let el: HTMLElement;
12 |   const dispatch = createEventDispatcher();
13 | 
14 |   function clickHoist() {
15 |     if ($card.hoisted) {
16 |       unHoistPositionable($card.key, el);
17 |     }
18 |     else {
19 |       hoistPositionable($card.key, el);
20 |     }
21 |   }
22 | 
23 |   function onDelete() {
24 |     dispatch("delete", $card.key);
25 |   }
26 | </script>
27 | 
28 | <svelte:options immutable={true} />
29 | 
30 | <Positionable positionable={card} bind:el style="--bg: {randomCssColor()};">
31 |   <!-- TODO: Switch to mouse logic only -->
32 |   <!-- <Resizable positionable={card} direction="top"/>
33 |   <Resizable positionable={card} direction="right" />
34 |   <Resizable positionable={card} direction="bottom" />
35 |   <Resizable positionable={card} direction="left" />
36 |   <Resizable positionable={card} direction="top-right" />
37 |   <Resizable positionable={card} direction="top-left" />
38 |   <Resizable positionable={card} direction="bottom-right" />
39 |   <Resizable positionable={card} direction="bottom-left" /> -->
40 |   <Draggable positionable={card}>
41 |     card
42 |     <button on:click={clickHoist}>{$card.hoisted ? 'unHoist' : 'hoist'}</button>
43 |     <button on:click={onDelete}>delete</button>
44 |     <br>
45 |     <br>
46 |     <input type="range" min="0" max="2000" />
47 |     <textarea rows="3" />
48 |     <br />
49 |     <div contenteditable="true">fio bar test asf</div>
50 |   </Draggable>
51 | </Positionable>
52 | 


--------------------------------------------------------------------------------
/src/routes/v3/test/LazyComponent.svelte:
--------------------------------------------------------------------------------
 1 | <script>
 2 |   let loadComponent;
 3 |   export { loadComponent as this };
 4 | 
 5 |   let componentPromise = loadComponent();
 6 | </script>
 7 | 
 8 | {#await componentPromise}
 9 | {:then { default: Component }}
10 |   <slot name="component" {Component} />
11 | {/await}
12 | 


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/deta/tela/main/static/favicon.png


--------------------------------------------------------------------------------
/svelte.config.js:
--------------------------------------------------------------------------------
 1 | import adapter from '@sveltejs/adapter-node';
 2 | import { vitePreprocess } from '@sveltejs/kit/vite';
 3 | 
 4 | /** @type {import('@sveltejs/kit').Config} */
 5 | const config = {
 6 |   // Consult https://kit.svelte.dev/docs/integrations#preprocessors
 7 |   // for more information about preprocessors
 8 |   preprocess: vitePreprocess(),
 9 | 
10 |   kit: {
11 |     // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
12 |     // If your environment is not supported or you settled on a specific environment, switch out the adapter.
13 |     // See https://kit.svelte.dev/docs/adapters for more information about adapters.
14 |     adapter: adapter()
15 |   }
16 | };
17 | 
18 | export default config;
19 | 


--------------------------------------------------------------------------------
/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 | 	"extends": "./.svelte-kit/tsconfig.json",
 3 | 	"compilerOptions": {
 4 | 		"allowJs": true,
 5 | 		"checkJs": true,
 6 | 		"esModuleInterop": true,
 7 | 		"forceConsistentCasingInFileNames": true,
 8 | 		"resolveJsonModule": true,
 9 | 		"skipLibCheck": true,
10 | 		"sourceMap": true,
11 | 		"strict": true,
12 | 		"moduleResolution": "NodeNext"
13 | 	}
14 | }
15 | 


--------------------------------------------------------------------------------
/vite.config.ts:
--------------------------------------------------------------------------------
1 | import { sveltekit } from '@sveltejs/kit/vite';
2 | import { defineConfig } from 'vite';
3 | 
4 | export default defineConfig({
5 | 	plugins: [sveltekit()]
6 | });
7 | 


---------------------------------------------------------