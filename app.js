const form=document.getElementById('chatForm');
const input=document.getElementById('prompt');
const messages=document.getElementById('messages');
const send=document.getElementById('send');
const newChat=document.getElementById('newChat');

function addMessage(text,who){
  const welcome=document.querySelector('.welcome');
  if(welcome) welcome.remove();
  const el=document.createElement('div');
  el.className='msg '+who;
  el.textContent=text;
  messages.appendChild(el);
  messages.scrollTop=messages.scrollHeight;
  return el;
}

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const text=input.value.trim();
  if(!text)return;
  addMessage(text,'user');
  input.value='';
  send.disabled=true;
  const thinking=addMessage('COPRA AI is thinking…','bot');

  try{
    const res=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text})
    });
    const data=await res.json();
    if(!res.ok) throw new Error(data.error||'Request failed');
    thinking.textContent=data.reply;
  }catch(err){
    thinking.textContent='Sorry machan, I could not connect to my AI brain yet. Check the Vercel API key and deployment settings.';
    console.error(err);
  }finally{
    send.disabled=false;
    input.focus();
  }
});

newChat.addEventListener('click',()=>{
  messages.innerHTML='<div class="welcome"><h2>Vanakkam 👋</h2><p>I\'m COPRA AI. Ask me anything.</p></div>';
  input.focus();
});

document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>{
  input.value=b.textContent;
  input.focus();
}));
