(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[520],{69653:(e,t,s)=>{Promise.resolve().then(s.bind(s,27527))},27527:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var r=s(95155),n=s(12115),i=s(98133),l=s(95203),o=s(83414),a=s(84843),m=s(72570),u=s(55750),d=s(90954),c=s(76046),A=s(7110);function h(){let e=(0,c.useRouter)(),[t,s]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let t=document.getElementById("global-loading");t&&t.remove(),A.j.isAuthenticated()&&e.replace("/experiment-management/")},[e]);let h=async t=>{s(!0);try{await new Promise(e=>setTimeout(e,1e3)),"admin"===t.username&&"admin123"===t.password?(A.j.setToken("mock_token"),A.j.setUser({username:t.username}),i.Ay.success("登录成功"),e.replace("/experiment-management/")):i.Ay.error("用户名或密码错误")}finally{s(!1)}};return(0,r.jsx)("div",{style:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f0f2f5"},children:(0,r.jsxs)(l.A,{style:{width:400},children:[(0,r.jsx)("h2",{style:{textAlign:"center",marginBottom:30},children:"MediFlow 医疗数据分析平台"}),(0,r.jsxs)(o.A,{name:"login",onFinish:h,autoComplete:"off",children:[(0,r.jsx)(o.A.Item,{name:"username",rules:[{required:!0,message:"请输入用户名"}],children:(0,r.jsx)(a.A,{prefix:(0,r.jsx)(u.A,{}),placeholder:"用户名",autoComplete:"off"})}),(0,r.jsx)(o.A.Item,{name:"password",rules:[{required:!0,message:"请输入密码"}],children:(0,r.jsx)(a.A,{prefix:(0,r.jsx)(d.A,{}),type:"text",style:{WebkitTextSecurity:"disc"},placeholder:"密码"})}),(0,r.jsx)(o.A.Item,{children:(0,r.jsx)(m.Ay,{type:"primary",htmlType:"submit",loading:t,block:!0,children:"登录"})})]})]})})}},7110:(e,t,s)=>{"use strict";s.d(t,{j:()=>l});var r=s(89208);let n="mediflow_token",i="mediflow_user",l={setToken:e=>{r.A.set(n,e,{expires:7})},getToken:()=>r.A.get(n),removeToken:()=>{r.A.remove(n)},setUser:e=>{r.A.set(i,JSON.stringify(e),{expires:7})},getUser:()=>{let e=r.A.get(i);return e?JSON.parse(e):null},removeUser:()=>{r.A.remove(i)},isAuthenticated:()=>!!r.A.get(n),logout:()=>{r.A.remove(n),r.A.remove(i)}}}},e=>{var t=t=>e(e.s=t);e.O(0,[163,361,343,411,441,517,358],()=>t(69653)),_N_E=e.O()}]);