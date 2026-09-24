const form=document.getElementById('chatForm');const input=document.getElementById('prompt');const messages=document.getElementById('messages');const newChat=document.getElementById('newChat');

function addMessage(text,who){const welcome=document.querySelector('.welcome');if(welcome)welcome.remove();const el=document.createElement('div');el.className='msg '+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;}

form.addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(!text)return;addMessage(text,'user');input.value='';setTimeout(()=>addMessage('COPRA AI is ready. Connect your AI backend to enable real AI replies.','bot'),350);});

newChat.addEventListener('click',()=>{messages.innerHTML='<div class="welcome"><h2>Vanakkam 👋</h2><p>I\'m COPRA AI. Ask me anything.</p></div>';input.focus();});
document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>{input.value=b.textContent;input.focus();}));
