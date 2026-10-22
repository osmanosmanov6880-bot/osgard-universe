import { AREAS, setLocale, locale, t, esc, productUrl, read, write } from './core.mjs';
import { gamesPage, gameClick, gameField } from './games.mjs';
const app=document.getElementById('app');
const paths={'/':'home','/play':'play','/intelligence':'intelligence','/academy':'academy','/development':'development'};
function icon(){return '<span aria-hidden="true">↗</span>'}
function navLink(path,key,current){
 return '<a data-nav class="nav-link'+(current===path?' is-active':'')+'" href="'+path+'"'+(current===path?' aria-current="page"':'')+'>'+esc(t(key))+'</a>';
}
function header(path){
 return '<header class="site-header">'+
 '<a class="brand" data-nav href="/" aria-label="OSGARD Universe"><span class="brand-mark">✣</span><span>OSGARD <em>UNIVERSE</em></span></a>'+
 '<nav class="site-nav" aria-label="'+esc(t('nav'))+'">'+navLink('/','home',path)+AREAS.map(a=>navLink(a.path,a.key,path)).join('')+'</nav>'+
 '<div class="header-tools"><span class="portal-label">EXPLORE / CREATE</span>'+
 '<select aria-label="'+esc(t('locale'))+'" id="lang-select">'+[['ru','RU'],['en','EN'],['zh','中文']].map(x=>'<option value="'+x[0]+'"'+(locale()===x[0]?' selected':'')+'>'+x[1]+'</option>').join('')+'</select>'+
 '<button type="button" id="motion-toggle" title="'+esc(read('reduced',false)?t('restoreMotion'):t('reduceMotion'))+'" aria-label="'+esc(read('reduced',false)?t('restoreMotion'):t('reduceMotion'))+'" aria-pressed="'+String(read('reduced',false))+'">✺</button></div></header>';
}
function areaCard(area){
 const kicker=area.key==='play'?'INTERACTIVE WORLDS':area.key==='academy'?'LEARNING ENGINE':area.key==='intelligence'?'KNOWLEDGE ENGINE':'DIGITAL CRAFT';
 return '<a data-nav href="'+area.path+'" class="area-card tone-'+area.tone+'">'+
 '<img alt="" width="800" height="500" src="'+area.image+'" loading="lazy" decoding="async">'+
 '<span class="area-num">'+area.id+' / OSGARD</span>'+
 '<div class="area-body"><div><span class="eyebrow">'+kicker+'</span><h3>'+esc(t(area.key))+'</h3><p>'+esc(t(area.key+'Desc'))+'</p></div><span class="area-arrow" aria-hidden="true">↗</span></div></a>';
}
function home(){
 return '<main id="main" tabindex="-1"><section class="hero" aria-labelledby="hero-title">'+
 '<div class="hero-stars" aria-hidden="true"></div>'+
 '<div class="hero-space" aria-hidden="true"><div class="planet-glow"></div><img class="planet" src="/assets/planet.svg" width="850" height="850" alt=""><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div></div>'+
 '<div class="hero-content"><p class="eyebrow hero-eyebrow">OSGARD <span>/ DIGITAL UNIVERSE</span></p>'+
 '<h1 id="hero-title">'+esc(t('hero'))+'<br><span>'+esc(t('hero2'))+'</span></h1>'+
 '<p class="hero-lead">'+esc(t('intro'))+'</p>'+
 '<div class="hero-buttons"><a href="#areas" class="btn btn-primary">'+esc(t('explore'))+icon()+'</a>'+
 '<a data-nav href="/play" class="btn btn-secondary">'+esc(t('openPlay'))+icon()+'</a></div>'+
 '<p class="hero-scroll">SCROLL TO DISCOVER <span aria-hidden="true">↓</span> <span>01 — 04 / OSGARD</span></p></div></section>'+
 '<section class="areas" id="areas"><div class="section-top"><div><p class="eyebrow">FIND YOUR NEXT WORLD</p><h2>'+esc(t('areas'))+'</h2><p>'+esc(t('areasText'))+'</p></div><span>01 / 04</span></div>'+
 '<div class="area-grid">'+AREAS.map(areaCard).join('')+'</div></section>'+
 '<section class="manifesto"><p class="eyebrow">IMAGINE / EXPLORE / CREATE</p><h2>THE FUTURE IS A PLACE<br><span>YOU CAN ENTER.</span></h2><p>'+esc(t('footer'))+'</p></section></main>';
}
function placeholder(key){
 return '<main id="main" tabindex="-1" class="page"><p class="eyebrow">OSGARD / '+esc(key.toUpperCase())+'</p>'+
 '<h1>'+esc(t(key))+'</h1><p>'+esc(t('soon'))+'</p>'+
 '<a class="btn btn-primary" href="'+esc(productUrl('/'+key))+'" target="_blank" rel="noopener noreferrer">'+esc(t('original'))+icon()+'</a>'+
 '<p class="fine-print">'+esc(t('footer'))+'</p></main>';
}
function footer(){
 return '<footer class="footer"><strong>✣ OSGARD <em>UNIVERSE</em></strong><p>'+esc(t('footer'))+'</p>'+
 '<div><a href="https://osgard.world/" target="_blank" rel="noopener noreferrer">OSGARD.WORLD ↗</a>'+
 '<a href="https://github.com/osmanosmanov6880-bot/osgard-universe" target="_blank" rel="noopener noreferrer">GITHUB ↗</a></div></footer>';
}
export function render(options={}){
 const path=location.pathname.replace(/\/$/,'')||'/';
 const key=paths[path];
 document.documentElement.lang=locale()==='zh'?'zh-CN':locale();
 document.documentElement.dataset.motion=read('reduced',false)?'reduced':'full';
 document.title='OSGARD Universe · '+(key? t(key):'404');
 const page=path==='/'?home():path==='/play'?gamesPage():key?placeholder(key):'<main id="main" tabindex="-1" class="page"><h1>404</h1><a href="/" data-nav>'+esc(t('back'))+'</a></main>';
 app.innerHTML=header(path)+page+footer();
 if(options.refocus){const active=app.querySelector(options.refocus);active?.focus({preventScroll:true});if(typeof options.selection==='number'&&active?.setSelectionRange)active.setSelectionRange(options.selection,options.selection)}
 if(options.scrollDetails)app.querySelector('.game-detail')?.scrollIntoView({block:'start'});
 if(options.focus)document.getElementById('main')?.focus({preventScroll:true});
 if(options.hash&&location.hash)document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
}
document.addEventListener('click',event=>{
 if(location.pathname==='/play'&&gameClick(event,render))return;
 if(event.target.closest('#motion-toggle')){write('reduced',!read('reduced',false));render();return}
 const a=event.target.closest('a[data-nav]');
 if(!a||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.origin!==location.origin)return;
 event.preventDefault();
 const target=a.pathname+a.search+a.hash;
 if(target!==location.pathname+location.search+location.hash)history.pushState(null,'',target);
 render({focus:true,hash:true});
 if(!a.hash)scrollTo({top:0,behavior:'instant'});
});
document.addEventListener('input',event=>{if(location.pathname==='/play')gameField(event,render)});
document.addEventListener('change',event=>{if(event.target.id==='lang-select'){setLocale(event.target.value);render();return}if(location.pathname==='/play')gameField(event,render)});
window.addEventListener('popstate',()=>render({focus:true,hash:true}));
render({hash:true});
