export const ORIGIN = 'https://osgard.world';
export const LANGS = ['ru','en','zh'];
const prefix='osgard-universe:';
const dict={
ru:{
home:'Главная',play:'Игры',intelligence:'Интеллект',academy:'Академия',development:'Разработка',
locale:'Язык интерфейса',nav:'Разделы OSGARD',hero:'ОДНА ВСЕЛЕННАЯ.',hero2:'БЕСКОНЕЧНО ВОЗМОЖНОСТЕЙ.',
intro:'Играй, исследуй искусственный интеллект, учись новому и знакомься с цифровыми проектами. Всё начинается с одного шага.',
explore:'Исследовать вселенную',openPlay:'Открыть миры',areas:'Четыре направления. Одна вселенная.',
areasText:'Каждый раздел открывает самостоятельный опыт. Выбери, что интересно тебе сейчас.',
playDesc:'Настоящие игровые миры — от стратегии до научной фантастики.',
intelligenceDesc:'Учебная проверка утверждений, первоисточники и критическое мышление.',
academyDesc:'Практические уроки, проверки знаний и локальный прогресс.',
developmentDesc:'Доступные демо и реальные кейсы цифровых продуктов.',
enter:'Открыть раздел',back:'Вернуться в мир',soon:'Раздел готовится к запуску',
original:'Открыть оригинал на osgard.world',footer:'Самостоятельный портал. Игры, учётные записи и серверы остаются в исходной платформе osgard-world.',
learn:'Учиться',start:'Начать',continue:'Продолжить',status:'Статус',search:'Поиск игр',all:'Все',favorites:'Избранное',recent:'Недавние',
filters:'Фильтры',genre:'Жанр',nothing:'По этому запросу ничего не найдено.',reset:'Сбросить',
favoriteAdd:'Добавить в избранное',favoriteRemove:'Убрать из избранного',launch:'Открыть оригинальную игру',detail:'Подробнее',
local:'Данные хранятся только на этом устройстве.',mark:'Отметить',sources:'Первоисточники',check:'Проверить',progress:'Прогресс',
lessons:'Уроки',answer:'Проверить ответ',correct:'Верно!',incorrect:'Попробуй снова',result:'Результат',complete:'Пройдено',
demo:'Демо',concept:'Концепт',prototype:'Прототип',brief:'Бриф проекта',copy:'Копировать бриф',copied:'Бриф скопирован',
copyFail:'Скопировать автоматически не удалось. Выделите текст вручную.',reduceMotion:'Отключить анимации',restoreMotion:'Включить анимации',
offline:'Вы офлайн. Внешние продукты могут быть недоступны.'
},
en:{
home:'Home',play:'Games',intelligence:'Intelligence',academy:'Academy',development:'Development',
locale:'Interface language',nav:'OSGARD sections',hero:'ONE UNIVERSE.',hero2:'ENDLESS POSSIBILITIES.',
intro:'Play games, explore artificial intelligence, learn new skills, and discover real digital products. The journey begins here.',
explore:'Explore the universe',openPlay:'Explore games',areas:'Four destinations. One universe.',
areasText:'Every section is a separate experience. Choose what matters to you now.',
playDesc:'Real game worlds from strategy to science fiction.',
intelligenceDesc:'Evidence practice, original sources, and critical thinking.',
academyDesc:'Practical lessons, quizzes, and locally saved progress.',
developmentDesc:'Available demos and real digital product case studies.',
enter:'Open section',back:'Back to the universe',soon:'This section is being prepared',
original:'Open the original on osgard.world',footer:'Independent portal. Original games, accounts and servers remain in osgard-world.',
learn:'Learn',start:'Start',continue:'Continue',status:'Status',search:'Search games',all:'All',favorites:'Favorites',recent:'Recent',
filters:'Filters',genre:'Genre',nothing:'No results for this search.',reset:'Reset',
favoriteAdd:'Add to favorites',favoriteRemove:'Remove from favorites',launch:'Open original game',detail:'Details',
local:'Data is stored only on this device.',mark:'Mark',sources:'Primary sources',check:'Check',progress:'Progress',
lessons:'Lessons',answer:'Check answer',correct:'Correct!',incorrect:'Try again',result:'Result',complete:'Completed',
demo:'Demo',concept:'Concept',prototype:'Prototype',brief:'Project brief',copy:'Copy brief',copied:'Brief copied',
copyFail:'Could not copy automatically. Select the text to copy.',reduceMotion:'Reduce motion',restoreMotion:'Enable motion',
offline:'You are offline. External products may not open.'
},
zh:{
home:'首页',play:'游戏',intelligence:'智能',academy:'学院',development:'开发',
locale:'界面语言',nav:'OSGARD 导航',hero:'一个宇宙。',hero2:'无限可能。',
intro:'体验游戏、探索人工智能、学习新技能并了解真实数字产品。从这里开启旅程。',
explore:'探索宇宙',openPlay:'探索游戏',areas:'四个方向，同一个宇宙。',
areasText:'每个专区都有不同体验。选择你感兴趣的方向。',
playDesc:'从策略到科幻的真实游戏世界。',
intelligenceDesc:'检查论断、查看原始来源、练习批判性思维。',
academyDesc:'实践课程、知识问答和本地进度。',
developmentDesc:'真实数字产品案例与可用演示。',
enter:'进入专区',back:'返回宇宙',soon:'专区正在准备中',
original:'在 osgard.world 打开原版',footer:'独立门户。原有游戏、账户及服务器仍在 osgard-world。',
learn:'学习',start:'开始',continue:'继续',status:'状态',search:'搜索游戏',all:'全部',favorites:'收藏',recent:'最近',
filters:'筛选',genre:'类型',nothing:'没有找到结果。',reset:'重置',
favoriteAdd:'添加收藏',favoriteRemove:'取消收藏',launch:'打开原版游戏',detail:'详情',
local:'数据只保存在此设备。',mark:'标记',sources:'原始来源',check:'验证',progress:'进度',
lessons:'课程',answer:'检查答案',correct:'正确！',incorrect:'请重试',result:'结果',complete:'已完成',
demo:'演示',concept:'概念',prototype:'原型',brief:'项目需求',copy:'复制需求',copied:'已复制',
copyFail:'无法自动复制，请手动选择文本。',reduceMotion:'减少动画',restoreMotion:'开启动画',
offline:'离线状态，外部产品可能无法打开。'
}
};
export function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function read(key,fallback){try{const raw=localStorage.getItem(prefix+key);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}}
export function write(key,value){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch{return false}}
export function locale(){const value=read('lang','ru');return LANGS.includes(value)?value:'ru'}
export function setLocale(value){if(LANGS.includes(value))write('lang',value)}
export function t(key){return dict[locale()][key]||dict.ru[key]||key}
export function productUrl(path){
 if(typeof path!=='string'||!/^\/[A-Za-z0-9._~/?#=&%-]*$/.test(path)||path.startsWith('//'))throw new Error('Invalid product route');
 return ORIGIN+path;
}
export const AREAS=[
 {path:'/intelligence',key:'intelligence',image:'/assets/omega-osa.svg',id:'01',tone:'violet'},
 {path:'/play',key:'play',image:'/assets/omega-play.svg',id:'02',tone:'cyan'},
 {path:'/academy',key:'academy',image:'/assets/omega-osa.svg',id:'03',tone:'blue'},
 {path:'/development',key:'development',image:'/assets/omega-development.svg',id:'04',tone:'gold'}
];
