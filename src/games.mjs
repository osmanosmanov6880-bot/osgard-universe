import { games } from './games-data.mjs';
import { esc, t, read, write, productUrl, locale } from './core.mjs';
let query='',genre='all';
function listValue(name){const val=read(name,[]);return Array.isArray(val)?val.filter(x=>typeof x==='string'):[]}
export function selectGames(source,params={}){
 const q=String(params.query||'').toLocaleLowerCase().trim();
 const tag=params.genre||'all',view=params.view||'all';
 const favorites=new Set(params.favorites||[]),recent=params.recent||[];
 const selected=source.filter(g=>(tag==='all'||g.genre===tag) &&
 (view!=='favorites'||favorites.has(g.id)) && (view!=='recent'||recent.includes(g.id)) &&
 (!q||(g.title+' '+g.genre+' '+g.description+' '+g.searchTerms).toLocaleLowerCase().includes(q)));
 return view==='recent' ? selected.sort((a,b)=>recent.indexOf(a.id)-recent.indexOf(b.id)):selected;
}
const viewNow=()=>{const p=new URLSearchParams(location.search).get('view');return ['all','favorites','recent'].includes(p)?p:'all'};
function card(game,fav){
 return '<article class="game-card"><div class="game-art"><img alt="" width="1000" height="760" src="'+esc(game.image)+'" loading="lazy" decoding="async">'+
 '<div class="game-overline"><span>'+esc(game.genre)+'</span><span>'+esc(game.status)+'</span></div></div>'+
 '<div class="game-copy"><h3>'+esc(game.title)+'</h3><p>'+esc(game.description)+'</p>'+
 '<div class="game-meta">'+esc(game.platform)+'</div><div class="game-actions">'+
 '<button class="small-action" type="button" data-detail="'+esc(game.id)+'">'+esc(t('detail'))+' <span aria-hidden="true">↗</span></button>'+
 '<button class="icon-action'+(fav?' selected':'')+'" type="button" aria-label="'+esc(fav?t('favoriteRemove'):t('favoriteAdd'))+'" aria-pressed="'+fav+'" data-fav="'+esc(game.id)+'">'+(fav?'♥':'♡')+'</button>'+
 '<a class="small-action launch" data-launch="'+esc(game.id)+'" href="'+esc(productUrl(game.href))+'" target="_blank" rel="noopener noreferrer">'+esc(t('launch'))+' ↗</a></div></div></article>';
}
function details(game){
 if(!game)return '';
 return '<section class="game-detail" aria-labelledby="detail-title"><div class="game-detail-head"><div>'+
 '<p class="eyebrow">OSGARD / WORLD DETAIL</p><h2 id="detail-title">'+esc(game.title)+'</h2></div>'+
 '<button type="button" data-close-detail aria-label="'+esc(t('reset'))+'">×</button></div>'+
 '<p>'+esc(game.description)+'</p>'+
 '<dl><div><dt>'+esc(t('status'))+'</dt><dd>'+esc(game.status)+'</dd></div>'+
 '<div><dt>PLATFORM</dt><dd>'+esc(game.platform)+'</dd></div>'+
 '<div><dt>CONTROLS</dt><dd>'+esc(game.controls)+'</dd></div>'+
 '<div><dt>PROGRESS</dt><dd>'+esc(game.save)+'</dd></div></dl>'+
 '<p class="game-warning">'+esc(game.warning)+'</p>'+
 '<div class="detail-links"><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" data-launch="'+esc(game.id)+'" href="'+esc(productUrl(game.href))+'">'+esc(t('launch'))+' ↗</a>'+
 (game.alternate?'<a class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="'+esc(productUrl(game.alternate.href))+'">'+esc(game.alternate.label)+' ↗</a>':'')+'</div></section>';
}
export function gamesPage(){
 const favs=listValue('favorites'),recent=listValue('recent');
 const genres=[...new Set(games.map(g=>g.genre))].sort((a,b)=>a.localeCompare(b,'ru'));
 const shown=selectGames(games,{query,genre,view:viewNow(),favorites:favs,recent});
 const chosen=games.find(g=>g.id===new URLSearchParams(location.search).get('game'));
 const tabs=['all','favorites','recent'].map(k=>'<button type="button" role="tab" aria-selected="'+(viewNow()===k)+'" data-view="'+k+'">'+esc(t(k))+'</button>').join('');
 return '<main id="main" tabindex="-1" class="page game-page">'+
 '<div class="page-heading"><div><p class="eyebrow">OSGARD / INTERACTIVE WORLDS</p><h1>'+esc(t('play'))+'<span class="headline-dot">.</span></h1>'+
 '<p>'+esc(t('playDesc'))+' '+esc(t('original'))+'.</p></div><img src="/assets/omega-play.svg" alt="" width="800" height="500"></div>'+
 '<div class="game-spotlight"><div><span class="eyebrow">ORIGINAL WORLDS / 19</span><h2>CHOOSE YOUR <span>REALITY.</span></h2>'+
 '<p>19 / OSGARD GAME LINKS · ORIGINAL BUILD STATUS</p></div><img alt="" src="/assets/omega-play.svg" width="800" height="500"></div>'+
 '<section aria-label="'+esc(t('filters'))+'" class="game-filter-shell"><div class="game-tabs" role="tablist" aria-label="'+esc(t('filters'))+'">'+tabs+'</div>'+
 '<div class="game-filter-row"><label><span>'+esc(t('search'))+'</span><input id="game-search" type="search" value="'+esc(query)+'" placeholder="'+esc(t('search'))+'" autocomplete="off"></label>'+
 '<label><span>'+esc(t('genre'))+'</span><select id="game-genre"><option value="all">'+esc(t('all'))+'</option>'+
 genres.map(g=>'<option value="'+esc(g)+'"'+(genre===g?' selected':'')+'>'+esc(g)+'</option>').join('')+'</select></label>'+
 '<span class="game-count" aria-live="polite">'+shown.length+' / '+games.length+'</span></div></section>'+
 details(chosen)+
 '<section class="game-grid" id="catalog" aria-label="'+esc(t('play'))+'">'+
 (shown.length?shown.map(g=>card(g,favs.includes(g.id))).join(''):'<div class="empty-state">'+esc(t('nothing'))+' <button type="button" data-reset-filter>'+esc(t('reset'))+'</button></div>')+
 '</section><p class="catalog-disclaimer">'+esc(t('local'))+' '+esc(t('original'))+'. Описания и игровые названия — из исходного каталога.</p></main>';
}
export function gameClick(event,rerender){
 const favorite=event.target.closest('[data-fav]');
 if(favorite){const id=favorite.dataset.fav;const list=listValue('favorites');write('favorites',list.includes(id)?list.filter(x=>x!==id):[...list,id]);rerender({refocus:'[data-fav="'+id+'"]'});return true}
 const open=event.target.closest('[data-detail]');
 const close=event.target.closest('[data-close-detail]');
 if(open||close){const url=new URL(location.href);if(close)url.searchParams.delete('game');else url.searchParams.set('game',open.dataset.detail);
 history.replaceState(null,'',url.pathname+url.search+url.hash);rerender({focus:false,scrollDetails:!close});return true}
 const tab=event.target.closest('[data-view]');
 if(tab){const url=new URL(location.href);if(tab.dataset.view==='all')url.searchParams.delete('view');else url.searchParams.set('view',tab.dataset.view);
 url.searchParams.delete('game');history.replaceState(null,'',url.pathname+url.search);rerender({refocus:'[data-view="'+tab.dataset.view+'"]'});return true}
 if(event.target.closest('[data-reset-filter]')){query='';genre='all';const url=new URL(location.href);url.searchParams.delete('view');history.replaceState(null,'',url.pathname);rerender();return true}
 const launch=event.target.closest('[data-launch]');
 if(launch){const id=launch.dataset.launch;const old=listValue('recent');write('recent',[id,...old.filter(x=>x!==id)].slice(0,19));return false}
 return false;
}
export function gameField(event,rerender){
 if(event.target.id==='game-search'){const pos=event.target.selectionStart;query=event.target.value;
 rerender({refocus:'#game-search',selection:pos});return true}
 if(event.target.id==='game-genre'){genre=event.target.value;rerender({refocus:'#game-genre'});return true}
 return false;
}
