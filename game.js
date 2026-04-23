// ═══════════════════════════════════════════════════════════════
// WORDSLAP — Word RPG
// Infinite survival mode. Each round a random animal appears.
// Exponential difficulty, accelerating music, slap-hand combat.
// ═══════════════════════════════════════════════════════════════
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ══════════ Dictionary ══════════
const BASIC="the,and,for,are,but,not,you,all,can,had,her,was,one,our,out,day,get,has,him,his,how,man,new,now,old,see,two,way,who,boy,did,its,let,put,say,she,too,use,bag,end,fed,set,sit,ten,win,yet,bed,big,box,bus,buy,cat,cup,cut,dad,dog,ear,eat,egg,eye,fan,far,fat,fit,fly,fun,gas,god,got,gun,hat,hit,hot,job,kid,law,lot,low,may,men,met,mix,mom,mud,nut,pan,pay,pet,pig,pop,red,run,sad,sat,sea,six,son,sun,tax,tea,toe,top,toy,try,war,wet,why,yes,zoo";
const COMMON4="able,acid,aged,also,area,army,away,baby,back,ball,band,bank,base,bath,bear,beat,been,beer,bell,belt,best,bike,bill,bird,blow,blue,boat,body,bomb,bond,bone,book,boom,born,boss,both,bowl,bulk,burn,bush,busy,call,calm,came,camp,card,care,case,cash,cast,cell,chat,chip,city,club,coal,coat,code,cold,come,cook,cool,cope,copy,core,cost,crew,crop,dark,data,date,dawn,days,dead,deal,dean,dear,debt,deep,deny,desk,dial,diet,dirt,disc,disk,does,done,door,dose,down,draw,drew,drop,drug,dual,duck,dude,duke,dust,duty,each,earn,ease,east,easy,edge,else,even,ever,evil,exit,face,fact,fail,fair,fall,farm,fast,fate,fear,feed,feel,feet,fell,felt,file,fill,film,find,fine,fire,firm,fish,five,flag,flat,flee,flew,flex,flip,flow,food,foot,ford,form,fort,four,free,from,fuel,full,fund,gain,game,gang,gate,gave,gear,gene,gift,girl,give,glad,goal,goes,gold,golf,gone,good,gray,grew,grip,grow,gulf,hair,half,hall,hand,hang,hard,harm,hate,have,head,hear,heat,held,hell,help,here,hero,hide,high,hill,hint,hire,hold,hole,holy,home,hope,hose,host,hour,huge,hung,hunt,hurt,idea,inch,info,into,iron,item,join,joke,jump,just,keen,keep,kept,kick,kill,kind,king,knee,knew,know,lack,lady,laid,lake,land,lane,last,late,lava,lawn,laws,lazy,lead,leaf,lean,left,legs,lens,less,lest,life,lift,like,limb,line,link,lips,list,live,load,loan,lock,long,look,lord,lose,loss,lost,loud,love,luck,made,mail,main,make,male,mall,many,mark,mass,mate,math,meal,mean,meat,meet,menu,mere,mess,mild,mile,milk,mill,mind,mine,miss,mist,mode,mold,mole,mood,moon,more,most,move,much,must,name,near,neck,need,news,next,nice,nine,none,noon,nose,note,noun,oath,obey,odds,once,ones,only,onto,open,oral,over,pace,pack,page,paid,pain,pair,pale,palm,park,part,pass,past,path,peak,pick,pile,pill,pine,pink,pipe,plan,play,plot,plug,plus,poem,poet,pole,poll,pool,poor,port,pose,post,pour,pray,prey,pull,pump,pure,push,quit,race,rack,rage,rail,rain,rank,rare,rate,read,real,rely,rent,rest,rice,rich,ride,ring,riot,rise,risk,road,rock,role,roll,roof,room,root,rope,rose,rule,runs,rush,sack,safe,said,sail,sake,sale,salt,same,sand,sang,sank,save,scan,scar,seal,seat,seed,seek,seem,seen,self,sell,sent,shed,ship,shoe,shop,shot,show,shut,sick,side,sign,silk,sing,sink,site,size,skin,slip,slot,slow,snap,snow,soft,soil,sold,sole,some,song,sons,soon,sore,sort,soul,soup,span,spin,spot,star,stay,step,stew,stop,suit,sure,swim,tail,take,tale,talk,tall,tank,tape,task,team,tear,teen,tell,tend,term,test,text,than,that,them,then,they,thin,this,thus,tide,tied,ties,tile,till,time,tiny,tips,tire,toad,toes,told,toll,tone,tons,took,tool,tops,torn,tour,town,trap,tray,tree,trim,trip,true,tube,tuna,tune,turf,turn,twin,type,ugly,undo,unit,upon,urge,used,user,uses,vase,vast,very,view,vine,vote,wage,wait,wake,walk,wall,want,ward,warm,warn,wash,wave,ways,weak,wear,week,well,went,were,west,what,when,whom,wide,wife,wild,will,wind,wine,wing,wire,wise,wish,with,wolf,wood,wool,word,wore,work,worm,worn,wrap,yard,year,yell,your,zero,zone";
const COMMON5="about,above,actor,admit,adopt,adult,after,again,agent,agree,ahead,alarm,album,alert,alike,alive,allow,alone,along,alter,among,anger,angle,angry,ankle,apart,apple,apply,arena,argue,arise,armed,array,arrow,aside,asset,avoid,awake,award,aware,baker,bases,basic,basis,beach,began,begin,begun,being,below,bench,birth,black,blade,blame,blank,blast,blaze,bleed,blend,bless,blind,block,blood,bloom,blown,blues,board,boast,bones,bonus,boost,booth,bored,bound,brain,brand,brass,brave,bread,break,breed,brick,bride,brief,bring,brink,brisk,broad,broke,brown,brush,build,built,bunch,burnt,burst,cable,cargo,carry,catch,cause,chain,chair,chant,chaos,charm,chart,chase,cheap,cheat,check,cheek,cheer,chess,chest,chief,child,chill,chose,civil,claim,clash,class,clean,clear,clerk,click,cliff,climb,cling,clock,close,cloth,cloud,clown,coach,coast,could,count,court,cover,crack,craft,crash,crazy,cream,creek,crime,crisp,cross,crowd,crown,crude,cruel,crush,curve,cycle,daily,dance,death,debut,decay,delay,delta,dense,depth,diary,dirty,dodge,doing,doubt,dough,dozen,draft,drain,drama,drank,drawn,dread,dream,dress,dried,drift,drink,drive,drone,drove,drown,drunk,eager,early,earth,eaten,elbow,elder,elect,elite,email,empty,enemy,enjoy,enter,entry,equal,error,essay,event,every,exact,exile,exist,extra,faint,faith,false,fancy,fatal,fault,favor,feast,fence,fever,field,fifth,fifty,fight,final,first,fixed,flame,flash,fleet,flesh,float,flood,floor,flour,flown,fluid,flush,focus,force,forge,forth,forty,forum,found,frame,fresh,front,frost,fruit,fully,funny,ghost,giant,given,glade,glare,glass,glide,globe,gloom,glory,glove,going,grace,grade,grain,grand,grant,grape,graph,grasp,grass,grave,great,green,greet,grief,grill,grind,gross,group,grove,grown,guard,guess,guest,guide,guild,happy,harsh,haste,hatch,haunt,haven,heard,heart,heavy,hedge,hence,hills,hobby,honey,honor,horns,horse,hotel,hound,house,human,humor,hurry,ideal,image,imply,index,inner,input,issue,ivory,jewel,joint,judge,juice,knife,knock,known,label,labor,laden,lance,lands,large,laser,later,laugh,layer,learn,lease,least,leave,legal,lemon,level,lever,light,liked,limit,lined,lines,lists,lives,lobby,local,lodge,logic,loose,lords,loser,lover,lower,loyal,lucky,lunch,magic,major,maker,manor,march,marks,match,maybe,mayor,meals,means,meant,medal,media,merge,merit,metal,meter,metro,might,minor,minus,mixed,model,moist,month,moral,motor,mount,mouse,mouth,moved,movie,music,named,nasal,needs,nerve,never,newly,night,ninth,noble,noise,north,noted,notes,novel,nurse,ocean,offer,often,olive,opens,opera,orbit,order,organ,ought,outer,owned,owner,pages,paint,panel,panic,paper,parts,party,paste,patch,paths,pause,peace,peach,pearl,pedal,penny,perch,phase,phone,photo,piano,piece,pilot,pinch,pitch,place,plain,plane,plant,plate,plays,plaza,plead,point,pound,power,press,price,pride,prime,print,prior,prize,probe,proof,proud,prove,pulse,punch,pupil,puppy,purse,queen,quest,queue,quick,quiet,quilt,quite,quota,quote,radar,radio,raise,ranch,range,rapid,ratio,reach,react,ready,realm,rebel,refer,reign,relax,relay,reply,reset,rifle,right,rigid,risen,risky,rival,river,roast,robin,robot,rocky,rodeo,rogue,roles,roman,roots,rough,round,route,royal,ruins,ruled,ruler,rules,rumor,rural,saint,salad,sales,salon,sauce,saved,scale,scare,scene,scent,scope,score,scorn,scout,screw,sense,serve,setup,seven,shade,shaft,shake,shall,shame,shape,share,shark,sharp,sheep,sheer,sheet,shelf,shell,shift,shine,shiny,ships,shirt,shock,shoes,shoot,shops,shore,short,shout,shove,shown,sight,since,sixty,sized,skate,skies,skill,skirt,skull,slate,sleep,slept,slice,slide,sling,slope,slots,smash,smell,smile,smoke,snack,snail,snake,sneak,snore,solid,solve,sorry,sorts,sound,south,space,spare,spark,spawn,speak,spear,speed,spell,spend,spent,spice,spike,spill,spine,split,spoil,spoke,spoon,sport,spray,squad,stack,staff,stage,stain,stair,stake,stale,stalk,stamp,stand,stare,stark,start,state,steal,steam,steel,steep,steer,stems,steps,stern,stick,stiff,still,sting,stock,stole,stone,stood,stool,stops,store,storm,story,stout,stove,strap,straw,stray,strip,study,stuff,style,super,swear,sweat,sweep,sweet,swept,swift,swing,swirl,sword,table,teach,teams,tears,teeth,tempo,tense,terms,tests,texts,thank,theft,their,theme,there,these,thick,thief,thing,think,third,thorn,those,three,threw,throw,thumb,tidal,tides,tiger,tight,tiles,timer,times,timid,tired,title,toast,today,token,tools,tooth,topic,torch,total,touch,tough,tower,toxic,trace,track,trade,trail,train,trait,trash,tread,treat,trees,trend,trial,tribe,trick,tried,tries,trips,troop,truck,truly,trump,trunk,trust,truth,twist,types,ulcer,ultra,uncle,under,union,unite,unity,until,upper,upset,urban,usage,users,using,usual,value,valve,vapor,verse,video,views,villa,vines,vinyl,viral,virus,visit,vital,vivid,vocal,voice,vowel,wages,wagon,waist,walks,walls,waltz,wants,waste,watch,water,waved,weary,weave,wedge,weeds,weeks,weigh,weird,wharf,wheat,wheel,where,which,while,whine,whirl,whisk,white,whole,whose,widen,wider,winds,wines,wings,wipes,wired,wires,witch,woken,woman,women,woods,words,world,worms,worry,worse,worst,worth,would,wound,woven,wrath,wreck,wrist,write,wrong,wrote,yacht,yards,years,yeast,yield,young,yours,youth,zebra,zeros";
const MONSTER_WORDS="ace,act,add,ado,aft,age,ago,aid,ail,aim,air,ale,and,ant,any,ape,apt,arc,are,ark,arm,art,ash,ask,asp,ate,ave,awe,awl,bad,bag,bah,ban,bar,bat,bay,bed,bee,beg,bet,bib,bid,big,bin,bio,bit,boa,bob,bod,bog,boo,bop,bot,bow,box,boy,bra,bud,bug,bum,bun,bur,bus,but,buy,bye,cab,cad,cam,can,cap,car,cat,caw,cay,cel,chi,cob,cod,cog,con,coo,cop,cor,cot,cow,coy,cry,cub,cud,cue,cup,cur,cut,dab,dad,dam,dan,day,deb,def,den,dew,did,die,dig,dim,din,dip,doc,doe,dog,don,dos,dot,dry,dub,dud,due,dug,duh,duo,dye,ear,eat,ebb,eel,egg,ego,elf,elk,elm,els,end,era,ere,erg,err,eta,eve,ewe,eye,fan,far,fat,fax,fay,fed,fee,fen,few,fey,fib,fig,fin,fir,fit,fix,flu,fly,foe,fog,fop,for,fox,fro,fry,fun,fur,gab,gad,gal,gap,gas,gay,gee,gel,gem,get,gin,gob,god,goo,got,gum,gun,gut,gym,gyp,had,hag,hah,ham,has,hat,haw,hay,her,hew,hex,hey,hid,him,hip,his,hit,hob,hod,hoe,hog,hop,hot,how,hub,hue,hug,huh,hum,hut,ice,icy,ilk,ill,imp,ink,inn,ion,ire,irk,its,ivy,jab,jag,jam,jar,jaw,jay,jet,jig,job,jog,jot,joy,jug,jut,kat,kay,keg,ken,key,kid,kin,kip,kit,lab,lad,lag,lap,lav,law,lax,lay,lea,led,lee,leg,let,lid,lie,lip,lit,lob,log,loo,lop,lot,low,lug,lye,mac,mad,mag,man,map,mar,mat,maw,may,med,men,met,mew,mid,mix,mob,mod,mom,moo,mop,mow,mud,mug,mum,nab,nag,nap,nay,neb,net,new,nil,nip,nit,nix,nod,nor,not,now,nub,nun,nut,oaf,oak,oar,oat,odd,ode,off,oft,oho,ohm,oil,old,one,opt,orb,ore,our,out,ova,owe,owl,own,pad,pal,pan,par,pat,paw,pay,pea,pee,peg,pen,pep,per,pet,pew,pie,pig,pin,pit,ply,pod,poi,pop,pot,pow,pox,pre,pro,pry,pub,pug,pun,pup,pus,put,rag,rah,ram,ran,rap,rat,raw,ray,red,ref,rev,rex,rib,rid,rig,rim,rip,rob,rod,roe,rot,row,rub,rue,rug,rum,run,rut,rye,sad,sag,sap,sat,saw,say,sea,sec,see,set,sew,sex,she,sic,sin,sip,sir,sit,six,ski,sky,sly,sob,sod,son,sop,sot,sow,soy,spa,spy,sub,sue,sum,sun,sup,tab,tad,tag,tan,tap,tar,tax,tea,ted,tee,ten,the,thy,tic,tie,tin,tip,toe,ton,too,top,tor,tot,tow,toy,try,tub,tug,tux,two,ugh,use,van,vas,vat,vex,via,vie,vim,voe,vow,wad,wag,wan,war,was,wax,way,web,wed,wee,wet,who,why,wig,win,wit,woe,wok,won,woo,wot,wow,wry,yak,yam,yap,yaw,yay,yea,yen,yep,yes,yet,yew,yip,yon,you,yow,zap,zed,zig,zip,zit,zoo";
// Animal names plus many anagram/subword variants
const ANIMAL_WORDS="bull,bulls,rant,runt,burn,burnt,turn,tuna,bran,brunt,stag,stags,gates,gear,gears,rage,rages,rant,rants,rest,stare,tears,great,grade,grades,trend,husky,husks,rash,rush,rushy,hark,shark,hunks,sunk,hush,harsh,nuns,shun,wolf,wolfs,flow,flows,owls,slow,slows,folw,fowl,fowls,woofs,woof,deer,deeds,reed,reeds,seed,seeds,deer,does,dose,reeds,redeem,deed,deeds,horse,horses,shore,shores,shoe,shoes,rose,roses,horse,sore,hoser,shoer,heros,shibainu,shib,inu,shin,bash,basin,bash,habs,bias,banish,cabin,donkey,donkeys,keyed,donkey,dykes,yoked,nosed,dyes,keys,doze,noes,nodes,cow,cows,crown,corn,horn,horns,snow,worn,worry,fox,foxes,foxy,oxen,oxyn,hors,horse,horses,pony,ponies,alpaca,alpacas,apple,lapse,clasp,claps,pasta,pals,lapse,heron,herons,hook,noop";
const W=new Set((BASIC+","+COMMON4+","+COMMON5+","+MONSTER_WORDS+","+ANIMAL_WORDS).split(","));

// ══════════ Animals ══════════
// 12 animals from Quaternius Ultimate Animated Animal Pack.
// Each has an 8-tile set designed to spell its name + many words.
// Base stats are used for ROUND 1; difficulty scales exponentially.
const ANIMALS=[
  {name:"Bull",     type:"Bull",       baseHp:100, baseAtk:10, baseIv:5000, tiles:["B","U","L","L","R","N","T","A"], acc:"#8b4513", color:"#d2691e"},
  {name:"Stag",     type:"Stag",       baseHp:95,  baseAtk:9,  baseIv:5100, tiles:["S","T","A","G","R","E","N","D"], acc:"#8b7355", color:"#deb887"},
  {name:"Husky",    type:"Husky",      baseHp:90,  baseAtk:11, baseIv:4900, tiles:["H","U","S","K","Y","R","A","N"], acc:"#e0e7ff", color:"#b0c4de"},
  {name:"Wolf",     type:"Wolf",       baseHp:100, baseAtk:12, baseIv:4700, tiles:["W","O","L","F","S","N","A","R"], acc:"#9ca3af", color:"#6b7280"},
  {name:"Deer",     type:"Deer",       baseHp:80,  baseAtk:8,  baseIv:5200, tiles:["D","E","E","R","S","N","A","T"], acc:"#a67c52", color:"#d2b48c"},
  {name:"Horse",    type:"Horse",      baseHp:110, baseAtk:10, baseIv:5000, tiles:["H","O","R","S","E","N","A","T"], acc:"#a0522d", color:"#cd853f"},
  {name:"Shiba",    type:"Shibalnu",   baseHp:85,  baseAtk:10, baseIv:4900, tiles:["S","H","I","B","A","N","U","R"], acc:"#f4a460", color:"#ffa500"},
  {name:"Donkey",   type:"Donkey",     baseHp:100, baseAtk:9,  baseIv:5100, tiles:["D","O","N","K","E","Y","R","S"], acc:"#808080", color:"#a9a9a9"},
  {name:"Cow",      type:"Cow",        baseHp:110, baseAtk:9,  baseIv:5100, tiles:["C","O","W","N","R","S","E","A"], acc:"#f5f5dc", color:"#ffffff"},
  {name:"Ghost Horse",type:"Horse_White",baseHp:105,baseAtk:11,baseIv:4800, tiles:["H","O","R","S","E","W","N","A"], acc:"#f5f5ff", color:"#f0f8ff"},
  {name:"Fox",      type:"Fox",        baseHp:80,  baseAtk:12, baseIv:4600, tiles:["F","O","X","E","S","N","R","A"], acc:"#ff8c00", color:"#ff7f50"},
  {name:"Alpaca",   type:"Alpaca",     baseHp:95,  baseAtk:9,  baseIv:5000, tiles:["A","L","P","A","C","S","E","R"], acc:"#f0e68c", color:"#fff8dc"}
];

// Scene rotates through 3 backgrounds
const SCENES=["forest","ruins","volcano"];

// Per-animal GLTF tuning
const MODEL_CONFIG={
  Bull:        {scale:0.9, yOffset:0, rotation:0},
  Stag:        {scale:0.9, yOffset:0, rotation:0},
  Husky:       {scale:1.1, yOffset:0, rotation:0},
  Wolf:        {scale:1.1, yOffset:0, rotation:0},
  Deer:        {scale:0.9, yOffset:0, rotation:0},
  Horse:       {scale:0.85, yOffset:0, rotation:0},
  Shibalnu:    {scale:1.2, yOffset:0, rotation:0},
  Donkey:      {scale:0.95, yOffset:0, rotation:0},
  Cow:         {scale:0.9, yOffset:0, rotation:0},
  Horse_White: {scale:0.85, yOffset:0, rotation:0},
  Fox:         {scale:1.2, yOffset:0, rotation:0},
  Alpaca:      {scale:0.9, yOffset:0, rotation:0}
};

// ══════════ Difficulty Scaling ══════════
// Exponential curves so rounds 1-5 feel easy, 6-10 challenging, 11+ brutal
function scaledStats(animal,round){
  const r=round-1; // round 1 = base
  const hpMult=Math.pow(1.22,r);      // 100 → 122 → 149 → 182 → 222 → 271...
  const atkMult=Math.pow(1.15,r);     // 10 → 11.5 → 13.2 → 15.2 → 17.5...
  const ivMult=Math.pow(0.94,r);      // 5000 → 4700 → 4418 → 4153...
  return {
    hp:Math.round(animal.baseHp*hpMult),
    atk:Math.round(animal.baseAtk*atkMult),
    iv:Math.max(1800,Math.round(animal.baseIv*ivMult))
  };
}

// Tempo (BPM) scales with round — music gets faster and more frantic
function scaledTempoMs(round){
  const r=round-1;
  // 230ms/step in round 1 → 120ms/step by round 10
  return Math.max(110,Math.round(230*Math.pow(0.92,r)));
}

// ══════════ Helpers ══════════
function dmg(l){return[0,0,0,10,26,55,90,140,200][Math.min(l,8)]||200}
function tier(l){if(l<=3)return{t:"Tap",c:"tier0"};if(l==4)return{t:"SMACK",c:"tier1"};if(l==5)return{t:"WHACK!",c:"tier2"};if(l==6)return{t:"MEGA SLAP!",c:"tier3"};return{t:"LEGENDARY!",c:"tier4"}}
function shuf(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=0|Math.random()*(i+1);[b[i],b[j]]=[b[j],b[i]]}return b}
function mkTiles(L){return shuf(L).map((l,i)=>({id:i,letter:l}))}
function hpCol(p){return p>55?"#22c55e":p>28?"#f59e0b":"#ef4444"}
function canMake(w,L){const a=[...L];for(const c of w.toUpperCase()){const i=a.indexOf(c);if(i<0)return false;a.splice(i,1)}return true}
function pickRandomAnimal(recentTypes){
  // Avoid immediate repeat
  const pool=ANIMALS.filter(a=>!recentTypes.includes(a.type));
  return (pool.length?pool:ANIMALS)[Math.floor(Math.random()*(pool.length?pool.length:ANIMALS.length))];
}

// ══════════ State ══════════
let S={
  phase:'title',
  round:1,
  animal:null,
  mhp:0,mmax:0,matk:0,miv:0,
  php:100,
  tiles:[],
  sel:[],
  used:new Set(),
  log:[],
  combo:0,
  phurt:false,
  totalScore:0,
  totalSlaps:0,
  recentTypes:[],
  dying:false,
  sceneIdx:0
};
let atkT=null,progT=null,atkElapsed=0;

// ══════════ Three.js ══════════
let scene,camera,renderer,animalGroup,sceneGroup,fxGroup,clock,particles=[];
let animState={mode:'idle'};
let handMesh=null;
let shakeAmount=0;
const gltfLoader=new GLTFLoader();
const modelCache={};
let currentMixer=null;
let currentActions={};

function initThree(){
  const container=document.getElementById('three-container');
  const w=400,h=340;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(38,w/h,0.1,100);
  camera.position.set(0,1.7,5.5);
  camera.lookAt(0,1.0,0);
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(w,h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.2;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  clock=new THREE.Clock();
  sceneGroup=new THREE.Group();
  animalGroup=new THREE.Group();
  fxGroup=new THREE.Group();
  scene.add(sceneGroup);scene.add(animalGroup);scene.add(fxGroup);
  animate();
}

function convertMaterials(mesh){
  mesh.traverse(c=>{
    if(!c.isMesh||!c.material)return;
    const mats=Array.isArray(c.material)?c.material:[c.material];
    const newMats=mats.map(oldMat=>{
      const hasTexture=!!oldMat.map;
      const isBasic=oldMat.type==='MeshBasicMaterial'||oldMat.isMeshBasicMaterial;
      if(!isBasic&&oldMat.isMeshStandardMaterial)return oldMat;
      const newMat=new THREE.MeshStandardMaterial({
        color:hasTexture?new THREE.Color(0xffffff):(oldMat.color?oldMat.color.clone():new THREE.Color(0xffffff)),
        map:oldMat.map||null,
        transparent:oldMat.transparent||false,
        opacity:oldMat.opacity!==undefined?oldMat.opacity:1,
        side:oldMat.side||THREE.FrontSide,
        roughness:0.7,metalness:0.0,
        vertexColors:oldMat.vertexColors||false
      });
      if(newMat.map){
        newMat.map.magFilter=THREE.LinearFilter;
        newMat.map.minFilter=THREE.LinearMipmapLinearFilter;
        newMat.map.colorSpace=THREE.SRGBColorSpace;
        newMat.map.needsUpdate=true;
      }
      try{oldMat.dispose()}catch(e){}
      return newMat;
    });
    c.material=Array.isArray(c.material)?newMats:newMats[0];
  });
}

async function loadGLTF(type){
  // Don't cache - load fresh each time to avoid skeleton binding issues
  const path=`./Models/Animals/${type}.gltf`;
  const gltf=await gltfLoader.loadAsync(path);
  convertMaterials(gltf.scene);
  return {scene:gltf.scene,animations:gltf.animations};
}

async function getAnimal(type){
  const result=await loadGLTF(type);
  if(!result)return null;
  const {scene:mesh,animations}=result;
  const config=MODEL_CONFIG[type]||{scale:1,yOffset:0,rotation:0};
  mesh.scale.setScalar(config.scale);
  mesh.position.y=config.yOffset;
  mesh.rotation.y=config.rotation;
  convertMaterials(mesh);
  mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true}});
  // Set up animation mixer
  if(animations&&animations.length>0){
    const mixer=new THREE.AnimationMixer(mesh);
    mesh.userData.mixer=mixer;
    mesh.userData.clips={};
    mesh.userData.actions={};
    
    // Log available animations for debugging
    console.log(`[${type}] Available animations:`,animations.map(c=>c.name));
    
    animations.forEach(clip=>{
      const n=clip.name.toLowerCase();
      // Map Quaternius animal pack names to our states
      if(n.includes('walk')||n==='walk')mesh.userData.clips.walk=clip;
      if(n.includes('attack')||n==='attack')mesh.userData.clips.attack=clip;
      if(n.includes('jump')||n==='jump')mesh.userData.clips.jump=clip;
      if(n.includes('death')||n.includes('die'))mesh.userData.clips.death=clip;
      if(n.includes('gallop')||n==='gallop')mesh.userData.clips.gallop=clip;
      if(n.includes('idle')&&!mesh.userData.clips.idle)mesh.userData.clips.idle=clip;
    });
    
    // Fallback: if no walk, use idle, or first clip
    if(!mesh.userData.clips.walk)mesh.userData.clips.walk=mesh.userData.clips.idle||animations[0];
    if(!mesh.userData.clips.attack)mesh.userData.clips.attack=mesh.userData.clips.walk;
    if(!mesh.userData.clips.jump)mesh.userData.clips.jump=mesh.userData.clips.walk;
    if(!mesh.userData.clips.death)mesh.userData.clips.death=mesh.userData.clips.walk;
    if(!mesh.userData.clips.gallop)mesh.userData.clips.gallop=mesh.userData.clips.walk;
    
    console.log(`[${type}] Mapped clips:`,Object.keys(mesh.userData.clips));
  }
  mesh.userData.type=type;
  return mesh;
}

// ══════════ Animation state machine ══════════
function playAnimalAnim(name,loop=true,fade=0.2){
  const mesh=animalGroup.userData.mesh;
  if(!mesh){
    console.warn('[playAnimalAnim] No mesh in animalGroup');
    return null;
  }
  if(!mesh.userData.mixer){
    console.warn('[playAnimalAnim] Mesh has no mixer');
    return null;
  }
  if(!mesh.userData.clips[name]){
    console.warn(`[playAnimalAnim] No clip found for "${name}". Available:`,Object.keys(mesh.userData.clips));
    return null;
  }
  
  const mixer=mesh.userData.mixer;
  const clip=mesh.userData.clips[name];
  
  console.log(`[playAnimalAnim] Playing "${name}" (loop=${loop}, fade=${fade})`);
  
  // Stop current actions with fade
  Object.values(currentActions).forEach(a=>a.fadeOut(fade));
  const action=mixer.clipAction(clip);
  action.reset();
  action.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);
  action.clampWhenFinished=!loop;
  action.fadeIn(fade);
  action.play();
  currentActions={[name]:action};
  
  console.log(`[playAnimalAnim] Action started, isRunning=${action.isRunning()}`);
  return action;
}

function setMonsterState(newState){
  console.log('[setMonsterState] Switching to:',newState);
  animState.mode=newState;
  if(newState==='idle'){
    playAnimalAnim('walk',true);
  } else if(newState==='attack'){
    playAnimalAnim('attack',false);
  } else if(newState==='hurt'){
    playAnimalAnim('jump',false);
  } else if(newState==='die'){
    playAnimalAnim('death',false);
  } else if(newState==='gallop'){
    playAnimalAnim('gallop',true);
  }
}

// ══════════ Scenes ══════════
function buildScene(sceneType){
  while(sceneGroup.children.length)sceneGroup.remove(sceneGroup.children[0]);
  while(animalGroup.children.length){const c=animalGroup.children[0];animalGroup.remove(c);disposeObj(c)}
  if(sceneType==='forest'){scene.background=new THREE.Color(0x1a2d1a);scene.fog=new THREE.FogExp2(0x152a15,0.08);addLights(0x8fdd7a,0x2d5d1a,1.5);addForestScene()}
  else if(sceneType==='ruins'){scene.background=new THREE.Color(0x2a2a4a);scene.fog=new THREE.FogExp2(0x30304a,0.07);addLights(0xd1c9ff,0x4a448f,1.4);addRuinsScene()}
  else if(sceneType==='volcano'){scene.background=new THREE.Color(0x4a0a00);scene.fog=new THREE.FogExp2(0x6b1a00,0.07);addLights(0xffc96a,0xff5520,1.8);addVolcanoScene()}
}

function addLights(keyColor,fillColor,intensity){
  sceneGroup.add(new THREE.AmbientLight(fillColor,0.9));
  const key=new THREE.DirectionalLight(keyColor,intensity);
  key.position.set(3,6,4);key.castShadow=true;
  key.shadow.mapSize.width=1024;key.shadow.mapSize.height=1024;
  key.shadow.camera.near=0.5;key.shadow.camera.far=20;
  key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;
  sceneGroup.add(key);
  const rim=new THREE.DirectionalLight(0xffccaa,0.6);rim.position.set(-3,3,-4);sceneGroup.add(rim);
  const front=new THREE.PointLight(0xffffff,1.5,10);front.position.set(0,2.5,4);sceneGroup.add(front);
  sceneGroup.add(new THREE.HemisphereLight(0xffffff,0x443322,0.7));
}

function addForestScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x1a3d1a,roughness:.95}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  // Bright sun
  const sun=new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32),new THREE.MeshBasicMaterial({color:0xfff8a8}));
  sun.position.set(2.5,4.5,-9);sceneGroup.add(sun);
  const sunGlow=new THREE.Mesh(new THREE.SphereGeometry(1.8,32,32),new THREE.MeshBasicMaterial({color:0xffe966,transparent:true,opacity:0.25}));
  sunGlow.position.copy(sun.position);sceneGroup.add(sunGlow);
  // Cartoony trees
  for(let i=0;i<6;i++){
    const tree=createCartoonTree();
    tree.position.set(-4.5+i*1.8,0,-4.5-Math.random()*1.5);
    tree.rotation.y=Math.random()*Math.PI;
    tree.scale.setScalar(1+Math.random()*0.3);
    sceneGroup.add(tree);
  }
}
function createCartoonTree(){
  const g=new THREE.Group();
  const trunkMat=new THREE.MeshStandardMaterial({color:0x5c3317,roughness:.9});
  const leavesMat=new THREE.MeshStandardMaterial({color:0x228b22,roughness:.85});
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.18,1.4,8),trunkMat);trunk.position.y=0.7;trunk.castShadow=true;g.add(trunk);
  const foliage=new THREE.Mesh(new THREE.SphereGeometry(0.8,12,12),leavesMat);foliage.position.y=1.8;foliage.castShadow=true;g.add(foliage);
  const foliage2=new THREE.Mesh(new THREE.SphereGeometry(0.6,12,12),leavesMat);foliage2.position.set(0.3,1.6,0.2);foliage2.castShadow=true;g.add(foliage2);
  return g;
}

function addRuinsScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x4a4560,roughness:.9}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  const pillarMat=new THREE.MeshStandardMaterial({color:0x6a5d8a,roughness:.85});
  [[-3.5,-4],[3.5,-4],[-4.5,-3],[4.5,-3],[-4,-5.5],[4,-5.5]].forEach(([x,z])=>{
    const h=1.5+Math.random()*2;
    const pillar=new THREE.Mesh(new THREE.BoxGeometry(0.4,h,0.4),pillarMat);
    pillar.position.set(x,h/2,z);pillar.castShadow=true;sceneGroup.add(pillar);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.15,0.55),pillarMat);
    cap.position.set(x,h,z);cap.castShadow=true;sceneGroup.add(cap);
  });
  for(let i=0;i<5;i++){
    const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(0.12+Math.random()*0.1,0),new THREE.MeshStandardMaterial({color:0xf0a8ff,emissive:0xc870ff,emissiveIntensity:0.9,roughness:0}));
    crystal.position.set(-3+Math.random()*6,3+Math.random()*1.5,-4+Math.random()*2);
    crystal.userData.floatOffset=Math.random()*Math.PI*2;sceneGroup.add(crystal);
  }
}

function addVolcanoScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x2a0500,roughness:.9,emissive:0x501500,emissiveIntensity:.4}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  for(let i=0;i<3;i++){
    const lava=new THREE.Mesh(new THREE.CircleGeometry(0.8+Math.random()*0.5,16),new THREE.MeshBasicMaterial({color:0xffaa00}));
    lava.rotation.x=-Math.PI/2;lava.position.set(-3+i*3,0.01,-3-Math.random());sceneGroup.add(lava);
    const lavaLight=new THREE.PointLight(0xff6000,2.5,5);lavaLight.position.set(lava.position.x,0.3,lava.position.z);sceneGroup.add(lavaLight);
  }
  const rockMat=new THREE.MeshStandardMaterial({color:0x2a0800,roughness:1});
  for(let i=0;i<6;i++){
    const h=1+Math.random()*2.5;
    const spire=new THREE.Mesh(new THREE.ConeGeometry(0.3+Math.random()*0.3,h,5),rockMat);
    spire.position.set(-5+i*2,h/2,-4-Math.random()*1.5);spire.castShadow=true;sceneGroup.add(spire);
  }
  for(let i=0;i<30;i++){
    const ember=new THREE.Mesh(new THREE.SphereGeometry(0.03,6,6),new THREE.MeshBasicMaterial({color:0xffaa00}));
    ember.position.set((Math.random()-.5)*10,Math.random()*4,-3+Math.random()*-3);
    ember.userData.speed=0.3+Math.random()*0.5;ember.userData.sway=Math.random()*Math.PI*2;ember.userData.isEmber=true;
    sceneGroup.add(ember);
  }
}

function disposeObj(o){o.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material){if(Array.isArray(c.material))c.material.forEach(m=>m.dispose());else c.material.dispose()}})}

// ══════════ Slap Hand ══════════
function createSlapHand(){
  const hand=new THREE.Group();
  const skin=new THREE.MeshStandardMaterial({color:0xffd9b3,roughness:0.55,metalness:0});
  const skinDark=new THREE.MeshStandardMaterial({color:0xe8a885,roughness:0.6});
  // Palm
  const palm=new THREE.Mesh(new THREE.BoxGeometry(0.8,1.0,0.28),skin);
  palm.castShadow=true;hand.add(palm);
  // Back of hand darker
  const palmBack=new THREE.Mesh(new THREE.BoxGeometry(0.78,0.98,0.05),skinDark);
  palmBack.position.z=-0.12;hand.add(palmBack);
  // 4 fingers
  for(let i=0;i<4;i++){
    const finger=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.55,10),skin);
    finger.position.set(-0.28+i*0.19,0.75,0);
    finger.castShadow=true;hand.add(finger);
    // Fingertip
    const tip=new THREE.Mesh(new THREE.SphereGeometry(0.1,10,10),skin);
    tip.position.set(-0.28+i*0.19,1.03,0);hand.add(tip);
  }
  // Thumb
  const thumb=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.45,10),skin);
  thumb.position.set(-0.55,0.15,0.08);thumb.rotation.z=Math.PI/3;thumb.castShadow=true;hand.add(thumb);
  const thumbTip=new THREE.Mesh(new THREE.SphereGeometry(0.12,10,10),skin);
  thumbTip.position.set(-0.75,0.35,0.08);hand.add(thumbTip);
  // Wrist/cuff (dark sleeve)
  const cuff=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.35,0.4,12),new THREE.MeshStandardMaterial({color:0x6a40b8,roughness:.7}));
  cuff.position.y=-0.65;hand.add(cuff);
  // Accent stripe on cuff
  const stripe=new THREE.Mesh(new THREE.CylinderGeometry(0.41,0.41,0.08,12),new THREE.MeshStandardMaterial({color:0xfbbf24,roughness:.6}));
  stripe.position.y=-0.5;hand.add(stripe);
  return hand;
}

function spawnSlapHand(big){
  if(handMesh){fxGroup.remove(handMesh);disposeObj(handMesh)}
  handMesh=createSlapHand();
  // Start off-screen to the right
  handMesh.position.set(5,3.5,2);
  handMesh.rotation.z=-Math.PI/2.2;
  handMesh.rotation.y=-0.4;
  const scale=big?1.4:1.0;
  handMesh.userData.scale=scale;
  handMesh.scale.setScalar(scale);
  handMesh.userData.elapsed=0;
  handMesh.userData.life=0.85;
  handMesh.userData.big=big;
  fxGroup.add(handMesh);
}

function updateSlapHand(dt){
  if(!handMesh)return;
  handMesh.userData.elapsed+=dt;
  const p=handMesh.userData.elapsed/handMesh.userData.life;
  const scale=handMesh.userData.scale;
  if(p<0.35){
    // Swoop in from top-right
    const t=p/0.35;
    const eased=1-Math.pow(1-t,3);
    handMesh.position.x=5-eased*5.5;
    handMesh.position.y=3.5-eased*2.3;
    handMesh.position.z=2-eased*1;
    handMesh.rotation.z=-Math.PI/2.2+eased*0.6;
  } else if(p<0.45){
    // IMPACT - held frame, tilted
    handMesh.position.set(-0.5,1.2,1);
    handMesh.rotation.z=-Math.PI/4;
    handMesh.rotation.y=0;
    handMesh.scale.setScalar(scale*1.15);
  } else if(p<0.95){
    // Fly out bottom-left
    const t=(p-0.45)/0.5;
    const eased=Math.pow(t,2);
    handMesh.position.x=-0.5-eased*4;
    handMesh.position.y=1.2-eased*2.5;
    handMesh.rotation.z=-Math.PI/4-eased*Math.PI;
    handMesh.scale.setScalar(scale*(1.15-eased*0.5));
  } else {
    // Remove
    fxGroup.remove(handMesh);
    disposeObj(handMesh);
    handMesh=null;
  }
}

// ══════════ Animate loop ══════════
async function spawnAnimal(type){
  activeReset();
  const mesh=await getAnimal(type);
  if(!mesh)return;
  mesh.position.set(0,mesh.position.y,0);
  animalGroup.add(mesh);
  animalGroup.userData.mesh=mesh;
  // Ensure mixer is set globally
  if(mesh.userData.mixer){
    currentMixer=mesh.userData.mixer;
  }
  // Start with walk loop
  setMonsterState('idle');
  console.log('[spawnAnimal] Started idle animation for',type);
}
function activeReset(){
  currentActions={};
  currentMixer=null;
}

function animate(){
  requestAnimationFrame(animate);
  const dt=clock?clock.getDelta():0;
  const t=clock?clock.getElapsedTime():0;
  // Update animation mixer
  const mesh=animalGroup.userData.mesh;
  if(mesh&&mesh.userData.mixer){
    mesh.userData.mixer.update(dt);
  }
  // Handle non-looping anim callbacks: return to idle after attack/hurt
  if(mesh&&animState.mode==='attack'){
    const a=currentActions.attack;
    if(a&&!a.isRunning()){setMonsterState('idle')}
  }
  if(mesh&&animState.mode==='hurt'){
    const a=currentActions.jump;
    if(a&&!a.isRunning()){setMonsterState('idle')}
  }
  // Subtle idle movement: slight rotation sway (the walk anim plays, but add gentle sway)
  if(mesh&&animState.mode==='idle'){
    const config=MODEL_CONFIG[mesh.userData.type]||{rotation:0};
    mesh.rotation.y=config.rotation+Math.sin(t*0.8)*0.12;
  }
  // Slap hand update
  updateSlapHand(dt);
  // Shake
  if(shakeAmount>0){
    camera.position.x=(Math.random()-.5)*shakeAmount;
    camera.position.y=1.7+(Math.random()-.5)*shakeAmount*.5;
    shakeAmount*=0.85;
    if(shakeAmount<0.01){shakeAmount=0;camera.position.x=0;camera.position.y=1.7}
  }
  // Scene particles
  sceneGroup.children.forEach(c=>{
    if(c.userData.isEmber){c.position.y+=c.userData.speed*dt;c.position.x+=Math.sin(t+c.userData.sway)*dt*.2;if(c.position.y>5)c.position.y=-0.5}
    if(c.geometry&&c.geometry.type==='OctahedronGeometry'){c.position.y+=Math.sin(t*1.5+c.userData.floatOffset)*dt*.3;c.rotation.y+=dt*.8;c.rotation.x+=dt*.5}
  });
  // FX particles
  particles=particles.filter(p=>{
    p.life-=dt;
    if(p.life<=0){scene.remove(p.mesh);disposeObj(p.mesh);return false}
    p.mesh.position.add(p.vel.clone().multiplyScalar(dt));p.vel.y-=dt*2;
    p.mesh.material.opacity=p.life/p.maxLife;
    return true;
  });
  if(renderer)renderer.render(scene,camera);
}

function spawnSlapParticles(color,big){
  const count=big?40:22;
  const targetMesh=animalGroup.userData.mesh;
  const tp=targetMesh?targetMesh.position.clone().add(new THREE.Vector3(0,1.0,0.2)):new THREE.Vector3(0,1.2,0);
  for(let i=0;i<count;i++){
    const geo=new THREE.SphereGeometry(0.05+Math.random()*0.05,6,6);
    const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:1});
    const p=new THREE.Mesh(geo,mat);p.position.copy(tp);scene.add(p);
    const angle=Math.random()*Math.PI*2;const speed=1.8+Math.random()*2.5;
    particles.push({mesh:p,vel:new THREE.Vector3(Math.cos(angle)*speed,0.5+Math.random()*2.5,Math.sin(angle)*speed),life:0.8+Math.random()*0.4,maxLife:1.2});
  }
  if(big)shakeAmount=0.4;
  else shakeAmount=0.2;
}

// ══════════ Audio ══════════
let A=null,musicTimer=null,muted=false,musicStep=0,currentTheme=null,currentTempo=230;
function ensureAudio(){if(!A){try{A=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return false}}if(A.state==='suspended')A.resume();return true}
function tone(freq,dur,type='square',vol=.08,delay=0){if(muted||!A||freq<=0)return;const o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.value=freq;const t=A.currentTime+delay;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(A.destination);o.start(t);o.stop(t+dur+.02)}
function noise(dur,vol=.1,filter=1200,delay=0){if(muted||!A)return;const buf=A.createBuffer(1,A.sampleRate*dur,A.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,1.5);const s=A.createBufferSource(),g=A.createGain(),f=A.createBiquadFilter();f.type='lowpass';f.frequency.value=filter;s.buffer=buf;g.gain.value=vol;s.connect(f).connect(g).connect(A.destination);s.start(A.currentTime+delay)}

// Upbeat comedy tune — bouncy major key with playful patterns
// Format: [bass, lead, drum]  drum: k=kick, s=snare, h=hihat
const COMEDY_LOOP=[
  [131,523,'k'],[0,659,'h'],[0,784,null],[0,0,'h'],
  [175,784,'s'],[0,880,'h'],[0,784,null],[0,659,'h'],
  [131,659,'k'],[0,784,'h'],[0,880,null],[0,0,'h'],
  [196,1047,'s'],[0,880,'h'],[0,784,null],[0,0,'h'],
  [175,784,'k'],[0,659,'h'],[0,523,null],[0,0,'h'],
  [147,659,'s'],[0,784,'h'],[0,659,null],[0,523,'h'],
  [131,523,'k'],[0,659,'h'],[0,784,null],[0,659,'h'],
  [175,784,'s'],[0,1047,'h'],[0,880,null],[0,784,'h']
];

function startComedyMusic(tempoMs){
  stopMusic();
  if(muted||!ensureAudio())return;
  currentTheme='battle';
  currentTempo=tempoMs;
  musicStep=0;
  const play=()=>{
    if(muted||currentTheme!=='battle'){stopMusic();return}
    const[b,l,d]=COMEDY_LOOP[musicStep%COMEDY_LOOP.length];
    if(b>0)tone(b,0.15,'triangle',.09);
    if(l>0)tone(l,0.1,'square',.05);
    if(d==='k'){noise(.06,.14,200);tone(70,.08,'sine',.12)}
    if(d==='s'){noise(.05,.09,4500)}
    if(d==='h'){noise(.02,.04,8000)}
    musicStep++;
  };
  play();
  musicTimer=setInterval(play,tempoMs);
}

// Update music speed between rounds
function updateMusicSpeed(round){
  const newTempo=scaledTempoMs(round);
  if(currentTheme==='battle'){startComedyMusic(newTempo)}
}

function playVictoryFanfare(){
  stopMusic();
  // Slide whistle + kazoo vibes
  [523,587,659,698,784,880,988,1047].forEach((f,i)=>{
    tone(f,0.18,'square',.09,i*0.09);
    tone(f*0.5,0.18,'triangle',.07,i*0.09);
  });
  [1047,1319,1568].forEach((f,i)=>tone(f,0.6,'square',.08,0.8+i*0.15));
  noise(.4,.1,4000,1.3);
}
function playDefeatSound(){
  stopMusic();
  // Sad trombone
  [392,370,349,330,311,294].forEach((f,i)=>{
    tone(f,0.5,'sawtooth',.1,i*0.25);
    tone(f*0.5,0.5,'triangle',.06,i*0.25);
  });
}

function stopMusic(){if(musicTimer)clearInterval(musicTimer);musicTimer=null;currentTheme=null}

// SFX
function sfxTap(){tone(880,.04,'square',.05);tone(1760,.03,'square',.03,.01)}
function sfxDeselect(){tone(440,.04,'square',.04)}
function sfxTypeLetter(){tone(1200,.03,'sine',.05);tone(1600,.02,'sine',.03,.01)}
function sfxSlap(big){
  // Comedy slap: low thud + high crack + sting
  tone(80,.12,'sine',.18);
  noise(.1,.18,600);
  tone(1800,.04,'square',.1,.02);
  tone(2400,.03,'square',.06,.04);
  if(big){tone(60,.3,'sine',.2,.05);noise(.35,.15,1200,.05);tone(3200,.06,'square',.08,.08)}
}
function sfxBonk(){
  // Animal attacks player: bonk sound
  tone(200,.1,'square',.12);
  tone(150,.15,'sine',.09,.02);
  noise(.08,.1,1500,.01);
}
function sfxInvalid(){tone(220,.08,'sawtooth',.07);tone(196,.12,'sawtooth',.06,.05)}
function sfxCombo(){tone(659,.08,'square',.08);tone(784,.08,'square',.07,.07);tone(988,.1,'square',.09,.14)}

// ══════════ Input ══════════
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el)return;
  const a=el.dataset.a;
  if(a==='tile')tapTile(+el.dataset.p);
  else if(a==='cast')castSpell();
  else if(a==='clear')clearWord();
  else if(a==='next')nextRound();
  else if(a==='restart')restartGame();
  else if(a==='sound')toggleSound();
  else if(a==='play')startGame();
});

document.addEventListener('keydown',e=>{
  if(S.phase==='title'){
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      const btn=document.getElementById('playBtn');
      if(btn&&!btn.disabled)startGame();
    }
    return;
  }
  if(S.phase==='roundover'){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();nextRound()}
    return;
  }
  if(S.phase==='defeat'){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();restartGame()}
    return;
  }
  if(S.phase!=='battle')return;
  if(e.key==='Backspace'){e.preventDefault();if(S.sel.length){S.sel.pop();sfxDeselect();renderBattle()}return}
  if(e.key==='Escape'){e.preventDefault();clearWord();return}
  if(e.key==='Enter'){e.preventDefault();castSpell();return}
  const key=e.key.toUpperCase();
  if(!/^[A-Z]$/.test(key))return;
  ensureAudio();
  const tile=S.tiles.find(t=>t.letter===key&&!S.sel.includes(t.id));
  if(tile){
    S.sel=[...S.sel,tile.id];sfxTypeLetter();
    const btn=document.querySelector(`[data-a="tile"][data-p="${tile.id}"]`);
    if(btn){btn.classList.add('keypress');setTimeout(()=>btn.classList.remove('keypress'),120)}
    renderBattle();
  } else sfxInvalid();
});

function toggleSound(){muted=!muted;const b=document.getElementById('sbtn');if(b)b.textContent=muted?'\u266A\u0338':'\u266A';if(muted)stopMusic();else{ensureAudio();if(S.phase==='battle')startComedyMusic(currentTempo)}}

// ══════════ Timers ══════════
function startTimers(){
  clearInterval(atkT);clearInterval(progT);atkElapsed=0;
  progT=setInterval(()=>{
    if(S.phase!=='battle')return;
    atkElapsed+=100;
    const pct=Math.min(100,atkElapsed/S.miv*100);
    const bar=document.getElementById('atkb');if(bar)bar.style.width=pct+'%';
  },100);
  atkT=setInterval(()=>{
    if(S.phase!=='battle'||S.dying)return;
    atkElapsed=0;
    // Animal attacks
    setMonsterState('attack');
    setTimeout(()=>{
      if(S.phase!=='battle')return;
      S.php=Math.max(0,S.php-S.matk);
      S.phurt=true;flash('red');sfxBonk();
      shakeAmount=0.3;
      addFloat(`-${S.matk}`,'#ef4444',22,25+Math.random()*40,140);
      addLog(`${S.animal.name} bonks you — ${S.matk} damage!`);
      setTimeout(()=>{S.phurt=false;const pb=document.getElementById('pbar');if(pb)pb.classList.remove('phurt')},380);
      if(S.php<=0){goDefeat();return}
      renderBattle();
    },500);
  },S.miv);
}
function stopTimers(){clearInterval(atkT);clearInterval(progT)}
function flash(color){const f=document.getElementById('flash');if(!f)return;f.className='flash on '+(color||'');setTimeout(()=>{f.className='flash'},120)}
function addFloat(text,color,size,x,y){const fx=document.getElementById('fxlayer');if(!fx)return;const el=document.createElement('div');el.className='fdmg';el.style.cssText=`left:${x}%;bottom:${y||140}px;font-size:${size}px;color:${color}`;el.textContent=text;fx.appendChild(el);setTimeout(()=>el.remove(),1500)}
function addLog(t){S.log=[t,...S.log].slice(0,4)}

// ══════════ Gameplay ══════════
function tapTile(id){
  if(S.phase!=='battle')return;ensureAudio();
  if(S.sel.includes(id)){S.sel=S.sel.filter(x=>x!==id);sfxDeselect()}
  else{S.sel=[...S.sel,id];sfxTap()}
  renderBattle();
}
function clearWord(){if(S.phase!=='battle')return;S.sel=[];sfxDeselect();renderBattle()}

function castSpell(){
  if(S.phase!=='battle'||S.dying)return;ensureAudio();
  const word=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?t.letter:''}).join('').toLowerCase();
  if(word.length<3){addLog('Need at least 3 letters!');sfxInvalid();renderBattle();return}
  if(S.used.has(word)){addLog(`"${word.toUpperCase()}" already used.`);S.sel=[];sfxInvalid();renderBattle();return}
  if(!W.has(word)){addLog(`"${word.toUpperCase()}" — not a valid word!`);S.sel=[];sfxInvalid();renderBattle();return}
  const d=dmg(word.length);
  const cb=S.combo>=2?Math.round(d*.25):0;
  const total=d+cb;
  S.combo++;
  S.used.add(word);S.sel=[];
  S.tiles=mkTiles(S.animal.tiles);
  S.mhp=Math.max(0,S.mhp-total);
  S.totalSlaps++;
  const big=word.length>=6;
  if(S.combo>=3)sfxCombo();
  // Trigger slap hand + particles + hurt anim
  setTimeout(()=>{
    sfxSlap(big);
    if(big)flash('gold');
    spawnSlapHand(big);
    // Particles slightly after impact frame
    setTimeout(()=>{
      const col=word.length>=7?0xa78bfa:word.length===6?0xf97316:word.length===5?0xfbbf24:0x60a5fa;
      spawnSlapParticles(col,big);
      setMonsterState('hurt');
    },280);
    const hexCol=word.length>=7?'#a78bfa':word.length===6?'#f97316':word.length===5?'#fbbf24':'#60a5fa';
    addFloat(`${big?'💥 ':''}${total}`,hexCol,big?32:24,18+Math.random()*50,140);
    renderBattle();
  },word.length*30+50);
  const tv=tier(word.length);
  let msg=`${tv.t} "${word.toUpperCase()}" → ${total} dmg`;
  if(cb>0)msg+=` (×${S.combo} combo!)`;
  addLog(msg);
  // Check kill
  if(S.mhp<=0){
    S.dying=true;
    const earned=Math.round((S.animal.baseHp+S.round*20)*1);
    S.totalScore+=earned;
    setTimeout(()=>{
      setMonsterState('die');
      setTimeout(()=>{stopTimers();goRoundOver(earned)},1400);
    },600);
  }
  renderBattle();
}

function goRoundOver(earned){
  S.phase='roundover';
  stopMusic();
  playVictoryFanfare();
  const html=`
    <div class="big-emoji" style="color:#4ade80">💥</div>
    <h2 style="color:#fbbf24">SLAPPED!</h2>
    <p style="color:#4ade80">${S.animal.name} defeated in round ${S.round}!</p>
    <p style="color:#fbbf24">+${earned} pts · Total: ${S.totalScore}</p>
    <p style="color:#8076a8;font-size:12px;margin-top:10px">Round ${S.round+1} incoming…</p>
    <button class="scbtn" data-a="next">Next Round →</button>`;
  showScreen('sTrans',html);
}

function goDefeat(){
  S.phase='defeat';
  stopMusic();stopTimers();
  playDefeatSound();
  // Animal runs off in victory (gallop)
  setMonsterState('gallop');
  const html=`
    <div class="big-emoji" style="color:#ef4444">😵</div>
    <h2 style="color:#ef4444">TRAMPLED</h2>
    <p>The ${S.animal.name} got the last laugh.</p>
    <p style="color:#4ade80">Rounds survived: <b>${S.round-1}</b></p>
    <p style="color:#fbbf24">Total slaps: <b>${S.totalSlaps}</b></p>
    <p style="color:#a78bfa">Final score: <b>${S.totalScore}</b></p>
    <button class="scbtn" data-a="restart">↺ Play Again</button>`;
  setTimeout(()=>showScreen('sDefeat',html),400);
}

async function nextRound(){
  stopMusic();
  S.round++;
  S.sceneIdx=(S.sceneIdx+1)%SCENES.length;
  S.animal=pickRandomAnimal(S.recentTypes);
  S.recentTypes=[S.animal.type,...S.recentTypes].slice(0,3);
  const stats=scaledStats(S.animal,S.round);
  S.mmax=stats.hp;S.mhp=stats.hp;S.matk=stats.atk;S.miv=stats.iv;
  S.php=Math.min(100,S.php+15); // small HP restore between rounds
  S.tiles=mkTiles(S.animal.tiles);S.sel=[];S.used=new Set();S.combo=0;
  S.log=[`Round ${S.round}: A ${S.animal.name} appears!`];
  S.phase='battle';S.dying=false;
  buildScene(SCENES[S.sceneIdx]);
  await spawnAnimal(S.animal.type);
  hideScreens();
  renderBattle();
  startTimers();
  updateMusicSpeed(S.round);
  startComedyMusic(scaledTempoMs(S.round));
}

async function restartGame(){
  stopMusic();stopTimers();
  S={phase:'battle',round:1,animal:null,mhp:0,mmax:0,matk:0,miv:0,php:100,tiles:[],sel:[],used:new Set(),log:[],combo:0,phurt:false,totalScore:0,totalSlaps:0,recentTypes:[],dying:false,sceneIdx:0};
  S.animal=pickRandomAnimal([]);
  S.recentTypes=[S.animal.type];
  const stats=scaledStats(S.animal,1);
  S.mmax=stats.hp;S.mhp=stats.hp;S.matk=stats.atk;S.miv=stats.iv;
  S.tiles=mkTiles(S.animal.tiles);
  S.log=[`Round 1: A ${S.animal.name} appears!`];
  buildScene(SCENES[0]);
  await spawnAnimal(S.animal.type);
  hideScreens();
  renderBattle();
  startTimers();
  startComedyMusic(scaledTempoMs(1));
}

function hideScreens(){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const t=document.getElementById('sTitle');if(t)t.classList.add('gone')}
function showScreen(id,html){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const el=document.getElementById(id);if(el){el.innerHTML=html;setTimeout(()=>el.classList.add('on'),20)}}

// ══════════ Render ══════════
function renderBattle(){
  const a=S.animal;if(!a)return;
  const mpc=Math.max(0,S.mhp/S.mmax*100),ppc=Math.max(0,S.php);
  const mc=hpCol(mpc),pc=hpCol(ppc);
  const word=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?t.letter:''}).join('');
  const wl=word.toLowerCase();
  const valid=word.length>=3&&W.has(wl)&&canMake(wl,a.tiles);
  const already=S.used.has(wl);
  const d=valid&&!already?dmg(word.length):0;
  const tv=word.length>=3?tier(word.length):null;
  const tilesHtml=S.tiles.map(t=>{const sel=S.sel.includes(t.id);return`<button class="tile${sel?' sel':''}" data-a="tile" data-p="${t.id}">${t.letter}</button>`}).join('');
  const slots=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?`<span class="lslot">${t.letter}</span>`:''}).join('');
  let preview='';
  if(word.length>=3){
    if(already)preview=`<span style="margin-left:auto;font-size:11px;color:#ef4444;font-family:Cinzel,serif;font-weight:600">USED</span>`;
    else if(!W.has(wl))preview=`<span style="margin-left:auto;font-size:11px;color:#44405a;font-family:Cinzel,serif">?</span>`;
    else preview=`<span style="margin-left:auto;font-size:11px;font-family:Cinzel,serif;font-weight:700" class="${tv.c}">${tv.t} ${d}dmg</span>`;
  }
  const logHTML=S.log.slice(0,2).map((l,i)=>`<div class="logline" style="color:${i===0?'#ddd6fe':'#4a4570'};font-size:${i===0?12:11}px">${l}</div>`).join('');
  const comboTag=S.combo>=2?`<span style="color:#f59e0b;font-family:Cinzel,serif;font-size:11px;margin-left:10px">🔥 ×${S.combo}</span>`:'';
  document.getElementById('topui').innerHTML=`
    <div class="title">✦ WORDSLAP · Round ${S.round} ✦</div>
    <div class="mrow">
      <div><div class="mname" style="color:${a.acc}">${a.name}</div><div class="msub">${S.mhp} / ${S.mmax} HP · ${S.matk} dmg</div></div>
      <div class="hplabel">Score: ${S.totalScore}</div>
    </div>
    <div class="hpt"><div class="hpf" style="width:${mpc}%;background:${mc};box-shadow:0 0 10px ${mc}"></div></div>
    <div class="atk-track"><div class="atk-fill" id="atkb" style="width:0%"></div></div>`;
  document.getElementById('bottomui').innerHTML=`
    <div style="text-align:center;font-family:Cinzel,serif;font-size:10px;color:#8076a8;margin:8px 0 6px;letter-spacing:2px">ROUND ${S.round}</div>
    <div id="pbar" class="card${S.phurt?' phurt':''}" style="margin-bottom:6px">
      <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px">
        <span style="color:#c4b5fd">✋ You</span><span style="color:${pc}">${S.php} / 100 HP</span>
      </div>
      <div class="hpt"><div class="hpf" style="width:${ppc}%;background:${pc};box-shadow:0 0 8px ${pc}"></div></div>
    </div>
    <div class="card" style="margin-bottom:6px;min-height:42px">${logHTML}</div>
    <div class="card wordzone${word.length>0?' active':''}" style="margin-bottom:6px">
      ${word.length===0?`<span style="color:#2d2a48;font-style:italic;font-size:12px">Tap or type letters to slap…</span>`:slots}${preview}
    </div>
    <div class="tgrid">${tilesHtml}</div>
    <div style="color:#3a3560;font-size:10px;text-align:center;margin-bottom:6px;font-family:Cinzel,serif;letter-spacing:.4px">Spell ${a.name.toUpperCase()} for a mega slap!${comboTag}</div>
    <div class="btn-row">
      <button class="btn-clear" data-a="clear">↩ Clear</button>
      <button class="btn-cast ${d>0?'ready':'off'}" data-a="cast">✋ SLAP!</button>
    </div>`;
}

// ══════════ Preload + Boot ══════════
async function preloadAll(){
  const updateStatus=(txt)=>{const el=document.getElementById('ltext');if(el)el.textContent=txt};
  
  try{
    // Just verify one animal loads to confirm the path is correct
    updateStatus('Testing animal models...');
    await loadGLTF('Bull');
    updateStatus('Ready to slap!');
    const btn=document.getElementById('playBtn');
    if(btn){btn.disabled=false;btn.textContent='▶ START SLAPPING'}
    const dots=document.getElementById('ldots');if(dots)dots.style.display='none';
  }catch(err){
    console.error('Preload failed:',err);
    updateStatus('Error loading assets — check console');
  }
}

async function startGame(){
  if(S.phase!=='title')return;
  ensureAudio();
  S.phase='battle';
  S.round=1;
  S.animal=pickRandomAnimal([]);
  S.recentTypes=[S.animal.type];
  const stats=scaledStats(S.animal,1);
  S.mmax=stats.hp;S.mhp=stats.hp;S.matk=stats.atk;S.miv=stats.iv;
  S.php=100;S.tiles=mkTiles(S.animal.tiles);S.sel=[];S.used=new Set();S.combo=0;
  S.totalScore=0;S.totalSlaps=0;S.dying=false;S.sceneIdx=0;
  S.log=[`A ${S.animal.name} approaches!`];
  document.getElementById('sTitle').classList.add('gone');
  buildScene(SCENES[0]);
  await spawnAnimal(S.animal.type);
  renderBattle();
  startTimers();
  startComedyMusic(scaledTempoMs(1));
}

// Boot
initThree();
preloadAll();