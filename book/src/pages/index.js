import React from 'react';
export default function Home(){
  return (<div style={{padding:40}}>
    <h1>Calcu — Spec-Driven Book</h1>
    <p>This book includes an embedded RAG chatbot (ChatKit). The chat widget fetches a short-lived token from the backend: POST /api/chatkit/session</p>
    <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" async></script>
    <div id="chat-root"></div>
    <script dangerouslySetInnerHTML={{__html:`(async function(){ try{const res=await fetch('/api/chatkit/session',{method:'POST'}); const data=await res.json(); const token=data.client_secret; const el=document.createElement('openai-chatkit'); el.setAttribute('client-secret',token); document.getElementById('chat-root').appendChild(el);}catch(e){console.error(e);} })();`}}/>
  </div>)
}