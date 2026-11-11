import {subjects} from './syllabus.js';
import {drawShape} from './shapes.js';

const app = document.querySelector('#app');
const decks = new Map();
const cards = new Map();
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
for (const subject of subjects) {
  subject.topics = subject.topics.map(([name, icon, rows]) => {
    const id = subject.id+'/'+slug(name);
    const topic = {id,name,icon,decks:[]};
    topic.decks = rows.map(([title,picture,items]) => {
      const deck = {id:id+'/'+slug(title),title,picture,subject,topic,cards:[]};
      deck.cards = items.map(([answer,art,prompt,detail,example,choices,order],i) => {
        const card = {id:deck.id+'/'+(i+1),answer,art,prompt,detail,example,choices,order,deck};
        cards.set(card.id,card);
        return card;
      });
      decks.set(deck.id,deck);
      return deck;
    });
    return topic;
  });
}

const storageKey = 'junior-olympiad-v1';
let saved;
try {saved = JSON.parse(localStorage.getItem(storageKey));} catch {}
const missed = new Set((Array.isArray(saved?.missed)?saved.missed:[]).filter(id=>cards.has(id)));
const completed = new Set((Array.isArray(saved?.completed)?saved.completed:[]).filter(id=>decks.has(id)));
function save() {
  try {localStorage.setItem(storageKey,JSON.stringify({missed:[...missed],completed:[...completed]}));} catch {}
  document.querySelector('#missed').textContent = missed.size ? '· '+missed.size : '';
}

const esc = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (path,label,cls='') => `<a class="${cls}" href="#${path}">${label}</a>`;
const icon = picture => `<span class="icon" aria-hidden="true">${esc(picture)}</span>`;
const heading = (name,picture) => `<div class="heading">${picture?icon(picture):''}<h1 tabindex="-1">${esc(name)}</h1></div>`;
const row = (path,name,picture,sub) => link(path,`${icon(picture)}<span>${esc(name)}<small>${esc(sub)}</small></span><span class="arrow" aria-hidden="true">›</span>`,'row');
const page = (back,body) => `<section class="page">${link(back,'‹ Back','back')}${body}</section>`;
const shuffle = values => {
  const result = [...values];
  for(let i=result.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [result[i],result[j]]=[result[j],result[i]];
  }
  return result;
};

let session;
let audioNotice = '';
function resetCard() {
  const card = session.items[session.index];
  const isMatching = session.mode==='practice' && ['Fruits','Vegetables','Domestic animals','Wild animals','Water animals','Birds'].includes(card.deck.title);
  session.state = {revealed:false,correct:false,feedback:'',order:[],selected:null,matched:new Set(),hadError:false};
  if(isMatching){
    const group=[card,...shuffle(card.deck.cards.filter(item=>item!==card)).slice(0,2)];
    session.state.match = {pictures:shuffle(group),names:shuffle(group)};
  } else if(session.mode!=='learn' && !card.order) {
    const alternatives = card.choices || (card.art.length===1 && /^[a-z]$/i.test(card.art) && /^[a-z]$/i.test(card.answer)
      ? [...(card.answer===card.answer.toUpperCase()?'ABCDEFGHIJKLMNOPQRSTUVWXYZ':'abcdefghijklmnopqrstuvwxyz')]
      : card.deck.cards.map(item=>item.answer));
    session.state.options = shuffle([...new Set([card.answer,...shuffle(alternatives.filter(value=>value!==card.answer)).slice(0,3)])]).map(value=>{
      const item=card.deck.cards.find(item=>item.answer===value);
      return {value,picture:card.deck.title.endsWith('transport')?item?.art:null};
    });
  }
  audioNotice='';
}
function start(mode,items,title,back,subject,deck) {
  session={mode,items,title,back,subject,deck,index:0,score:0,done:false,seen:new Set()};
  if(items.length) resetCard();
  renderSession();
}
function route() {
  window.speechSynthesis?.cancel();
  const path=location.hash.slice(1);
  const [id,topicSlug,deckSlug,mode]=path.split('/');
  const subject=subjects.find(item=>item.id===id);
  const topic=subject?.topics.find(item=>item.id===id+'/'+topicSlug);
  const deck=decks.get([id,topicSlug,deckSlug].join('/'));
  app.dataset.theme=subject?.id || '';
  session=null;
  if(path==='review'){
    start('review',[...missed].map(key=>cards.get(key)),'Try Again','');
  } else if(subject && topicSlug==='quiz'){
    const groups=shuffle(subject.topics);
    const items=[];
    for(let i=0;i<5;i++){
      const group=groups[i%groups.length];
      const eligible=group.decks.flatMap(deck=>deck.cards).filter(card=>!items.includes(card));
      items.push(shuffle(eligible)[0]);
    }
    start('quiz',items,subject.name+' Mixed Quiz',id,subject);
  } else if(deck){
    start(mode==='practice'?'practice':'learn',deck.cards,deck.title,topic.id,subject,deck);
  } else if(topic){
    app.innerHTML=page(id,heading(topic.name,topic.icon)+`<div class="rows">${topic.decks.map(item=>row(item.id,item.title,item.picture,item.cards.length+' cards'+(completed.has(item.id)?' · ✓ Complete':''))).join('')}</div>`);
  } else if(subject){
    app.innerHTML=page('',heading(subject.name,subject.icon)+link(id+'/quiz','★ Mixed Quiz · 5 questions','primary')+`<div class="rows">${subject.topics.map(item=>row(item.id,item.name,item.icon,item.decks.length===1?item.decks[0].cards.length+' cards':item.decks.length+' decks')).join('')}</div>`);
  } else {
    app.innerHTML=`<section class="hero"><div class="hero-art" aria-hidden="true">📚</div><h1 tabindex="-1">Junior Olympiad</h1><p>What shall we learn?</p></section><div class="tiles">${subjects.map(item=>`<a class="tile" href="#${item.id}" data-theme="${item.id}">${icon(item.icon)}<div><h2>${item.name}</h2><p>${item.subtitle}</p></div><span class="arrow" aria-hidden="true">→</span></a>`).join('')}</div>`;
  }
  window.scrollTo(0,0);
  app.querySelector('h1')?.focus({preventScroll:true});
}
function artMarkup(art) {
  if(art.startsWith('dots:')){
    const count=Number(art.slice(5));
    return `<div class="dots" aria-label="Dots to count">${'<i></i>'.repeat(count)}</div>`;
  }
  if(art.startsWith('shape:')) return '<canvas width="220" height="115" role="img" aria-label="Shape to identify"></canvas>';
  if(art==='glasses') return '<div class="glasses" role="img" aria-label="Two identical glasses, one with water and one without"><span class="glass full"></span><span class="glass"></span></div>';
  if(art==='near'||art==='far') return `<div class="distance" aria-hidden="true">${art==='near'?'🧒 🧸':'🧒 <span>···</span><span class="far-bear">🧸</span>'}</div>`;
  return esc(art);
}
const btn=(action,label,cls='',disabled=false)=>`<button type="button" class="${cls}" data-action="${action}" ${disabled?'disabled':''}>${label}</button>`;

function renderSession(focusAction) {
  const {mode,items,title,back,deck,index,state,score,done}=session;
  if(done || !items.length){
    const message=!items.length?'No questions to review yet.':mode==='quiz'?`You answered ${score} out of ${items.length} correctly on your first try.`:mode==='review'?'You finished this review round.':'You finished this deck!';
    app.innerHTML=page(back,heading(done?(mode==='quiz'?'Quiz results':title):title,'🌟')+`<div class="sheet results"><p>${message}</p><div class="controls">${link(back,mode==='review'?'Home':'Keep learning','primary')}${mode==='quiz'?btn('restart','Play again','listen'):''}${missed.size && mode!=='review'?link('review','Review missed questions','listen'):''}</div></div>`);
    if(focusAction) app.querySelector('h1').focus();
    return;
  }
  const card=items[index];
  const learn=mode==='learn';
  const final=index===items.length-1;
  const tabs=deck?`<nav class="tabs" aria-label="Deck mode">${['Learn','Practice'].map(name=>`<a href="#${deck.id}/${name.toLowerCase()}" ${name.toLowerCase()===mode?'aria-current="page"':''}>${name}</a>`).join('')}</nav>`:'';
  let activity='';
  const pictureChoice=!learn && card.deck.title.endsWith('transport');
  let prompt=pictureChoice?'Tap the picture of the '+card.answer.toLowerCase()+'.':card.prompt;
  if(state.match){
    prompt='Tap a picture, then tap its matching word.';
    const {pictures,names}=state.match;
    activity=`<div class="options">${pictures.map((item,i)=>btn('picture:'+i,esc(item.art),state.matched.has(item.id)?'matched':state.selected===item.id?'selected':'',state.matched.has(item.id))).join('')}</div><div class="options">${names.map((item,i)=>btn('name:'+i,esc(item.answer),state.matched.has(item.id)?'matched':'',state.matched.has(item.id))).join('')}</div>`;
  } else if(!learn && card.order){
    activity=`<p class="order" aria-live="polite">${state.order.join(' → ')||'Tap the numbers in order.'}</p><div class="options">${card.order.map((value,i)=>btn('order:'+i,value,'',state.order.includes(value)||state.correct)).join('')}</div>${!state.correct?btn('clear','Clear order','listen'):''}`;
  } else if(!learn){
    activity=`<div class="options">${state.options.map(({value,picture},i)=>btn('choice:'+i,picture?esc(picture):esc(value),'',state.correct)).join('')}</div>`;
  }
  app.innerHTML=page(back,heading(title,deck?.picture)+tabs+`
    <p>Card ${index+1} of ${items.length}</p>
    <div class="track" aria-hidden="true"><span style="width:${100*(index+1)/items.length}%"></span></div>
    <section class="sheet" aria-labelledby="prompt">
      <h2 class="question" id="prompt" tabindex="-1">${esc(prompt)}</h2>
      ${state.match?'':`<div class="art ${card.art.length>18?'words':''}">${pictureChoice?"🖼️":artMarkup(card.art)}</div>`}
      <div class="controls">${btn('listen','🔊 Listen','listen')}${learn&&!state.revealed?btn('reveal','Show Answer','primary'):''}</div>
      <p id="audio-notice" role="status">${esc(audioNotice)}</p>
      ${activity}
      ${state.revealed?`<div class="answer" tabindex="-1"><strong>${esc(card.answer)}</strong>${card.detail?`<p>${esc(card.detail)}</p>`:''}</div>`:''}
      ${state.feedback?`<p role="status" class="feedback ${state.correct?'':'retry'}">${esc(state.feedback)}</p>`:''}
    </section>
    <div class="nav">${learn?btn('previous','‹ Previous','',index===0):'<span></span>'}
    ${btn('next',final?'Finish':'Next ›','primary',learn?(final&&!state.revealed):!state.correct)}</div>`);
  const canvas=app.querySelector('canvas');
  if(canvas) drawShape(canvas,card.art.slice(6));
  if(focusAction==='card'){
    window.scrollTo(0,0);
    app.querySelector('#prompt').focus({preventScroll:true});
  } else if(focusAction){
    const focus=focusAction==='reveal'?app.querySelector('.answer'):
      [...app.querySelectorAll('button')].find(button=>button.dataset.action===focusAction&&!button.disabled);
    (focus || app.querySelector('[data-action="next"]:enabled') || app.querySelector('.options button:enabled'))?.focus({preventScroll:true});
  }
}
function assess(card,correct,reason,missedCard=card) {
  const {state,mode}=session;
  state.correct=correct;
  state.feedback=reason;
  if(!correct){
    missed.add(missedCard.id);
    state.hadError=true;
  } else {
    if(!state.hadError) session.score++;
    if(mode==='review') missed.delete(card.id);
  }
  save();
}
app.addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');
  if(!button||!session) return;
  const {items,index,state,mode,deck}=session;
  const card=items[index];
  const action=button.dataset.action;
  const [kind,number]=action.split(':');
  if(kind==='restart'){route();return;}
  if(kind==='listen'){
    const notify=message=>{
      audioNotice=message;
      const notice=document.querySelector('#audio-notice');
      if(notice) notice.textContent=message;
    };
    if(!window.speechSynthesis || !window.SpeechSynthesisUtterance){
      notify('Speech is unavailable in this browser.');
      return;
    }
    const revealed=state.revealed||state.correct;
    const spoken=state.match?'Tap a picture, then tap its matching word.':
      card.example ? (revealed?'Listen to '+card.example:card.prompt+' '+card.example) :
      revealed ? card.answer+'. '+(card.detail||'') :
      document.querySelector('#prompt').textContent+(card.order?' '+card.order.join(', '):/^[a-z]$/i.test(card.art)?' Letter name: '+card.art.toUpperCase():card.art.includes('___')?' '+card.art.replace('___','blank'):'');
    window.speechSynthesis.cancel();
    const speech=new SpeechSynthesisUtterance(spoken);
    const voices=window.speechSynthesis.getVoices();
    const voice=voices.find(item=>item.lang==='en-IN')||voices.find(item=>item.lang==='en-GB');
    if(voice) speech.voice=voice;
    speech.lang=voice?.lang||'en-GB';
    speech.rate=.82;
    speech.onerror=event=>{if(!['canceled','interrupted'].includes(event.error)) notify('Speech is unavailable right now.');};
    notify('');
    window.speechSynthesis.speak(speech);
    return;
  }
  if(kind==='reveal'){state.revealed=true;session.seen.add(card.id);}
  if(kind==='choice'){
    const correct=state.options[Number(number)].value===card.answer;
    assess(card,correct,correct?'Well done! '+(card.detail||'The answer is '+card.answer+'.'):'Good try! '+(card.detail||'Look at the clue and try another choice.'));
  }
  if(kind==='picture'){state.selected=state.match.pictures[Number(number)].id;state.feedback='Now tap the matching word.';}
  if(kind==='name'){
    const item=state.match.names[Number(number)];
    if(!state.selected) state.feedback='Tap a picture first.';
    else if(state.selected===item.id){
      state.matched.add(item.id);
      state.selected=null;
      if(state.matched.size===state.match.names.length) assess(card,true,'Well done! You matched all three pictures.');
      else state.feedback='Yes! That picture shows '+item.answer.toLowerCase()+'.';
    } else assess(card,false,'Good try! Look at the picture and choose its name.',cards.get(state.selected));
  }
  if(kind==='clear'){state.order=[];state.feedback='';}
  if(kind==='order'){
    state.order.push(card.order[Number(number)]);
    if(state.order.length===card.order.length){
      const correct=state.order.join(', ')===card.answer;
      assess(card,correct,(correct?'Well done! ':'Try again. ')+card.detail);
      if(!correct) state.order=[];
    }
  }
  if(kind==='previous'||kind==='next'){
    window.speechSynthesis?.cancel();
    if(kind==='next'&&index===items.length-1){
      if(deck&&(mode==='practice'||session.seen.size===items.length)){
        completed.add(deck.id);
        save();
      }
      session.done=true;
    } else {
      session.index+=kind==='previous'?-1:1;
      resetCard();
    }
    renderSession('card');
  } else renderSession(action);
});
window.addEventListener('hashchange',route);
save();
route();
