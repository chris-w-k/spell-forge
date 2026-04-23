// Spell Forge v5 — title screen, preload, keyboard input, material fix
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const BASIC="the,and,for,are,but,not,you,all,can,had,her,was,one,our,out,day,get,has,him,his,how,man,new,now,old,see,two,way,who,boy,did,its,let,put,say,she,too,use,bag,end,fed,set,sit,ten,win,yet,bed,big,box,bus,buy,cat,cup,cut,dad,dog,ear,eat,egg,eye,fan,far,fat,fit,fly,fun,gas,god,got,gun,hat,hit,hot,job,kid,law,lot,low,may,men,met,mix,mom,mud,nut,pan,pay,pet,pig,pop,red,run,sad,sat,sea,sex,six,son,sun,tax,tea,toe,top,toy,try,war,wet,why,yes,zoo";
const COMMON4="able,acid,aged,also,area,army,away,baby,back,ball,band,bank,base,bath,bear,beat,been,beer,bell,belt,best,bike,bill,bird,blow,blue,boat,body,bomb,bond,bone,book,boom,born,boss,both,bowl,bulk,burn,bush,busy,call,calm,came,camp,card,care,case,cash,cast,cell,chat,chip,city,club,coal,coat,code,cold,come,cook,cool,cope,copy,core,cost,crew,crop,dark,data,date,dawn,days,dead,deal,dean,dear,debt,deep,deny,desk,dial,diet,dirt,disc,disk,does,done,door,dose,down,draw,drew,drop,drug,dual,duck,dude,duke,dust,duty,each,earn,ease,east,easy,edge,else,even,ever,evil,exit,face,fact,fail,fair,fall,farm,fast,fate,fear,feed,feel,feet,fell,felt,file,fill,film,find,fine,fire,firm,fish,five,flag,flat,flee,flew,flex,flip,flow,food,foot,ford,form,fort,four,free,from,fuel,full,fund,gain,game,gang,gate,gave,gear,gene,gift,girl,give,glad,goal,goes,gold,golf,gone,good,gray,grew,grip,grow,gulf,hair,half,hall,hand,hang,hard,harm,hate,have,head,hear,heat,held,hell,help,here,hero,hide,high,hill,hint,hire,hold,hole,holy,home,hope,hose,host,hour,huge,hung,hunt,hurt,idea,inch,info,into,iron,item,join,joke,jump,just,keen,keep,kept,kick,kill,kind,king,knee,knew,know,lack,lady,laid,lake,land,lane,last,late,lava,lawn,laws,lazy,lead,leaf,lean,left,legs,lens,less,lest,life,lift,like,limb,line,link,lips,list,live,load,loan,lock,long,look,lord,lose,loss,lost,loud,love,luck,made,mail,main,make,male,mall,many,mark,mass,mate,math,meal,mean,meat,meet,menu,mere,mess,mild,mile,milk,mill,mind,mine,miss,mist,mode,mold,mole,mood,moon,more,most,move,much,must,name,near,neck,need,news,next,nice,nine,none,noon,nose,note,noun,oath,obey,odds,once,ones,only,onto,open,oral,over,pace,pack,page,paid,pain,pair,pale,palm,park,part,pass,past,path,peak,pick,pile,pill,pine,pink,pipe,plan,play,plot,plug,plus,poem,poet,pole,poll,pool,poor,port,pose,post,pour,pray,prey,pull,pump,pure,push,quit,race,rack,rage,rail,rain,rank,rare,rate,read,real,rely,rent,rest,rice,rich,ride,ring,riot,rise,risk,road,rock,role,roll,roof,room,root,rope,rose,rule,runs,rush,sack,safe,said,sail,sake,sale,salt,same,sand,sang,sank,save,scan,scar,seal,seat,seed,seek,seem,seen,self,sell,sent,shed,ship,shoe,shop,shot,show,shut,sick,side,sign,silk,sing,sink,site,size,skin,slip,slot,slow,snap,snow,soft,soil,sold,sole,some,song,sons,soon,sore,sort,soul,soup,span,spin,spot,star,stay,step,stew,stop,suit,sure,swim,tail,take,tale,talk,tall,tank,tape,task,team,tear,teen,tell,tend,term,test,text,than,that,them,then,they,thin,this,thus,tide,tied,ties,tile,till,time,tiny,tips,tire,toad,toes,told,toll,tone,tons,took,tool,tops,torn,tour,town,trap,tray,tree,trim,trip,true,tube,tuna,tune,turf,turn,twin,type,ugly,undo,unit,upon,urge,used,user,uses,vase,vast,very,view,vine,vote,wage,wait,wake,walk,wall,want,ward,warm,warn,wash,wave,ways,weak,wear,week,well,went,were,west,what,when,whom,wide,wife,wild,will,wind,wine,wing,wire,wise,wish,with,wolf,wood,wool,word,wore,work,worm,worn,wrap,yard,year,yell,your,zero,zone";
const COMMON5="about,above,actor,admit,adopt,adult,after,again,agent,agree,ahead,alarm,album,alert,alike,alive,allow,alone,along,alter,among,anger,angle,angry,ankle,apart,apple,apply,arena,argue,arise,armed,array,arrow,aside,asset,avoid,awake,award,aware,baker,bases,basic,basis,beach,began,begin,begun,being,below,bench,birth,black,blade,blame,blank,blast,blaze,bleed,blend,bless,blind,block,blood,bloom,blown,blues,board,boast,bones,bonus,boost,booth,bored,bound,brain,brand,brass,brave,bread,break,breed,brick,bride,brief,bring,brink,brisk,broad,broke,brown,brush,build,built,bunch,burnt,burst,cable,cargo,carry,catch,cause,chain,chair,chant,chaos,charm,chart,chase,cheap,cheat,check,cheek,cheer,chess,chest,chief,child,chill,chose,civil,claim,clash,class,clean,clear,clerk,click,cliff,climb,cling,clock,close,cloth,cloud,clown,coach,coast,could,count,court,cover,crack,craft,crash,crazy,cream,creek,crime,crisp,cross,crowd,crown,crude,cruel,crush,curve,cycle,daily,dance,death,debut,decay,delay,delta,demon,dense,depth,diary,dirty,dodge,doing,doubt,dough,dozen,draft,drain,drama,drank,drawn,dread,dream,dress,dried,drift,drink,drive,drone,drove,drown,drunk,eager,early,earth,eaten,elbow,elder,elect,elite,email,empty,enemy,enjoy,enter,entry,equal,error,essay,event,every,exact,exile,exist,extra,faint,faith,false,fancy,fatal,fault,favor,feast,fence,fever,field,fifth,fifty,fight,final,first,fixed,flame,flash,fleet,flesh,float,flood,floor,flour,flown,fluid,flush,focus,force,forge,forth,forty,forum,found,frame,fresh,front,frost,fruit,fully,funny,ghost,giant,given,glade,glare,glass,glide,globe,gloom,glory,glove,going,grace,grade,grain,grand,grant,grape,graph,grasp,grass,grave,great,green,greet,grief,grill,grind,gross,group,grove,grown,guard,guess,guest,guide,guild,happy,harsh,haste,hatch,haunt,haven,heard,heart,heavy,hedge,hence,hills,hobby,honey,honor,horns,horse,hotel,hound,house,human,humor,hurry,ideal,image,imply,index,inner,input,issue,ivory,jewel,joint,judge,juice,knife,knock,known,label,labor,laden,lance,lands,large,laser,later,laugh,layer,learn,lease,least,leave,legal,lemon,level,lever,light,liked,limit,lined,lines,lists,lives,lobby,local,lodge,logic,loose,lords,loser,lover,lower,loyal,lucky,lunch,magic,major,maker,manor,march,marks,match,maybe,mayor,meals,means,meant,medal,media,merge,merit,metal,meter,metro,might,minor,minus,mixed,model,moist,month,moral,motor,mount,mouse,mouth,moved,movie,music,named,nasal,needs,nerve,never,newly,night,ninth,noble,noise,north,noted,notes,novel,nurse,ocean,offer,often,olive,opens,opera,orbit,order,organ,ought,outer,owned,owner,pages,paint,panel,panic,paper,parts,party,paste,patch,paths,pause,peace,peach,pearl,pedal,penny,perch,phase,phone,photo,piano,piece,pilot,pinch,pitch,place,plain,plane,plant,plate,plays,plaza,plead,point,pound,power,press,price,pride,prime,print,prior,prize,probe,proof,proud,prove,pulse,punch,pupil,puppy,purse,queen,quest,queue,quick,quiet,quilt,quite,quota,quote,radar,radio,raise,ranch,range,rapid,ratio,reach,react,ready,realm,rebel,refer,reign,relax,relay,reply,reset,rifle,right,rigid,risen,risky,rival,river,roast,robin,robot,rocky,rodeo,rogue,roles,roman,roots,rough,round,route,royal,ruins,ruled,ruler,rules,rumor,rural,saint,salad,sales,salon,sauce,saved,scale,scare,scene,scent,scope,score,scorn,scout,screw,sense,serve,setup,seven,shade,shaft,shake,shall,shame,shape,share,shark,sharp,sheep,sheer,sheet,shelf,shell,shift,shine,shiny,ships,shirt,shock,shoes,shoot,shops,shore,short,shout,shove,shown,sight,since,sixty,sized,skate,skies,skill,skirt,skull,slate,sleep,slept,slice,slide,sling,slope,slots,smash,smell,smile,smoke,snack,snail,snake,sneak,snore,solid,solve,sorry,sorts,sound,south,space,spare,spark,spawn,speak,spear,speed,spell,spend,spent,spice,spike,spill,spine,split,spoil,spoke,spoon,sport,spray,squad,stack,staff,stage,stain,stair,stake,stale,stalk,stamp,stand,stare,stark,start,state,steal,steam,steel,steep,steer,stems,steps,stern,stick,stiff,still,sting,stock,stole,stone,stood,stool,stops,store,storm,story,stout,stove,strap,straw,stray,strip,study,stuff,style,super,swear,sweat,sweep,sweet,swept,swift,swing,swirl,sword,table,teach,teams,tears,teeth,tempo,tense,terms,tests,texts,thank,theft,their,theme,there,these,thick,thief,thing,think,third,thorn,those,three,threw,throw,thumb,tidal,tides,tiger,tight,tiles,timer,times,timid,tired,title,toast,today,token,tools,tooth,topic,torch,total,touch,tough,tower,toxic,trace,track,trade,trail,train,trait,trash,tread,treat,trees,trend,trial,tribe,trick,tried,tries,trips,troop,truck,truly,trump,trunk,trust,truth,twist,types,ulcer,ultra,uncle,under,union,unite,unity,until,upper,upset,urban,usage,users,using,usual,value,valve,vapor,verse,video,views,villa,vines,vinyl,viral,virus,visit,vital,vivid,vocal,voice,vowel,wages,wagon,waist,walks,walls,waltz,wants,waste,watch,water,waved,weary,weave,wedge,weeds,weeks,weigh,weird,wharf,wheat,wheel,where,which,while,whine,whirl,whisk,white,whole,whose,widen,wider,winds,wines,wings,wipes,wired,wires,witch,woken,woman,women,woods,words,world,worms,worry,worse,worst,worth,would,wound,woven,wrath,wreck,wrist,write,wrong,wrote,yacht,yards,years,yeast,yield,young,yours,youth,zebra,zeros";
const MONSTER_WORDS="ace,act,add,ado,aft,age,ago,aid,ail,aim,air,ale,and,ant,any,ape,apt,arc,are,ark,arm,art,ash,ask,asp,ate,ave,awe,awl,bad,bag,bah,ban,bar,bat,bay,bed,bee,beg,bet,bib,bid,big,bin,bio,bit,boa,bob,bod,bog,boo,bop,bot,bow,box,boy,bra,bud,bug,bum,bun,bur,bus,but,buy,bye,cab,cad,cam,can,cap,car,cat,caw,cay,cel,chi,cob,cod,cog,con,coo,cop,cor,cot,cow,coy,cry,cub,cud,cue,cup,cur,cut,dab,dad,dam,dan,day,deb,def,den,dew,did,die,dig,dim,din,dip,doc,doe,dog,don,dos,dot,dry,dub,dud,due,dug,duh,duo,dye,ear,eat,ebb,eel,egg,ego,elf,elk,elm,els,end,era,ere,erg,err,eta,eve,ewe,eye,fan,far,fat,fax,fay,fed,fee,fen,few,fey,fib,fig,fin,fir,fit,fix,flu,fly,foe,fog,fop,for,fox,fro,fry,fun,fur,gab,gad,gal,gap,gas,gay,gee,gel,gem,get,gin,gob,god,goo,got,gum,gun,gut,gym,gyp,had,hag,hah,ham,has,hat,haw,hay,her,hew,hex,hey,hid,him,hip,his,hit,hob,hod,hoe,hog,hop,hot,how,hub,hue,hug,huh,hum,hut,ice,icy,ilk,ill,imp,ink,inn,ion,ire,irk,its,ivy,jab,jag,jam,jar,jaw,jay,jet,jig,job,jog,jot,joy,jug,jut,kat,kay,keg,ken,key,kid,kin,kip,kit,lab,lad,lag,lap,lav,law,lax,lay,lea,led,lee,leg,let,lid,lie,lip,lit,lob,log,loo,lop,lot,low,lug,lye,mac,mad,mag,man,map,mar,mat,maw,may,med,men,met,mew,mid,mix,mob,mod,mom,moo,mop,mow,mud,mug,mum,nab,nag,nap,nay,neb,net,new,nil,nip,nit,nix,nod,nor,not,now,nub,nun,nut,oaf,oak,oar,oat,odd,ode,off,oft,oho,ohm,oil,old,one,opt,orb,ore,our,out,ova,owe,owl,own,pad,pal,pan,par,pat,paw,pay,pea,pee,peg,pen,pep,per,pet,pew,pie,pig,pin,pit,ply,pod,poi,pop,pot,pow,pox,pre,pro,pry,pub,pug,pun,pup,pus,put,rag,rah,ram,ran,rap,rat,raw,ray,red,ref,rev,rex,rib,rid,rig,rim,rip,rob,rod,roe,rot,row,rub,rue,rug,rum,run,rut,rye,sad,sag,sap,sat,saw,say,sea,sec,see,set,sew,sex,she,sic,sin,sip,sir,sit,six,ski,sky,sly,sob,sod,son,sop,sot,sow,soy,spa,spy,sub,sue,sum,sun,sup,tab,tad,tag,tan,tap,tar,tax,tea,ted,tee,ten,the,thy,tic,tie,tin,tip,toe,ton,too,top,tor,tot,tow,toy,try,tub,tug,tux,two,ugh,use,van,vas,vat,vex,via,vie,vim,voe,vow,wad,wag,wan,war,was,wax,way,web,wed,wee,wet,who,why,wig,win,wit,woe,wok,won,woo,wot,wow,wry,yak,yam,yap,yaw,yay,yea,yen,yep,yes,yet,yew,yip,yon,you,yow,zap,zed,zig,zip,zit,zoo";
const BOSS_WORDS="goblin,dragon,danger,stoner,boring,groaned,granted,baron,organ,groan,range,stone,store,anger,noted,grade,drone,donor,gander,grange,grant,roast,rants,snort,ornate,aboard,tango,regain,orange,adorn,adored,sorted,orated,targeted,dragged,skeleton,demon,demons,denote,enrage,steed,sneer,terse,nodes,drones,droned,dragons,sender,sensed,resent,street,tenors,stereo,retold,saner,snarl,ogre,ogres,ogled,leer,leers,tender,renders,grounded,ground,grounds,toad,goad,gods,road,rods,roads,dare,dear,read,dares,dears,reads,roar,roars,soar,soars,tore,rose,roses,note,tone,tones,near,ears,earn,earns,gear,gears,tear,tears,rear,rears,rang,sang,tang,gang,gangs,oranges,reason,reasons,dangers,steeds,teen,teens,teed,seed,seeds,need,needs,reed,reeds,deed,deeds";
const W=new Set((BASIC+","+COMMON4+","+COMMON5+","+MONSTER_WORDS+","+BOSS_WORDS).split(","));

const MONSTERS=[
  {name:"Goblin Grunt",sub:"Forest Scavenger",maxHp:100,atk:10,iv:5000,tiles:["G","O","B","L","I","N","A","R"],acc:"#4ade80",hint:"Boss word: GOBLIN = 90 dmg!",xp:50,scene:"forest",type:"goblin"},
  {name:"Cursed Skeleton",sub:"Bone Sentinel",maxHp:160,atk:14,iv:5200,tiles:["S","T","O","N","E","R","A","D"],acc:"#e0dccc",hint:"Boss word: STONER = 90 dmg!",xp:120,scene:"ruins",type:"skeleton"},
  {name:"Ancient Demon",sub:"Void Harbinger",maxHp:230,atk:18,iv:5000,tiles:["D","R","A","G","O","N","T","E"],acc:"#fb923c",hint:"Boss word: DRAGON = 90 dmg!",xp:300,scene:"volcano",type:"demon"}
];

const MODEL_CONFIG={
  goblin:  {path:'./Models/Goblin.gltf',  scale:1.0, yOffset:0, rotation:0},
  skeleton:{path:'./Models/Skeleton.gltf',scale:1.0, yOffset:0, rotation:0},
  demon:   {path:'./Models/Demon.gltf',   scale:1.0, yOffset:0, rotation:0}
};

function dmg(l){return[0,0,0,10,26,55,90,140,200][Math.min(l,8)]||200}
function tier(l){if(l<=3)return{t:"Fizzle",c:"tier0"};if(l==4)return{t:"Minor bolt",c:"tier1"};if(l==5)return{t:"Power surge",c:"tier2"};if(l==6)return{t:"CRITICAL!",c:"tier3"};return{t:"LEGENDARY!",c:"tier4"}}
function shuf(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=0|Math.random()*(i+1);[b[i],b[j]]=[b[j],b[i]]}return b}
function mkTiles(L){return shuf(L).map((l,i)=>({id:i,letter:l}))}
function hpCol(p){return p>55?"#22c55e":p>28?"#f59e0b":"#ef4444"}
function canMake(w,L){const a=[...L];for(const c of w.toUpperCase()){const i=a.indexOf(c);if(i<0)return false;a.splice(i,1)}return true}

let S={phase:'title',mi:0,mhp:MONSTERS[0].maxHp,php:100,tiles:mkTiles(MONSTERS[0].tiles),sel:[],used:new Set(),log:["The dungeon stirs. Spell words to strike!"],combo:0,phurt:false,txp:0,dying:false};
let atkT=null,progT=null,atkElapsed=0;

let scene,camera,renderer,monsterGroup,sceneGroup,clock,particles=[];
let animState={mode:'idle',progress:0};
let hurtFlashTimer=0,shakeAmount=0;
const gltfLoader=new GLTFLoader();
const modelCache={};
const activeMixers=[];

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
  renderer.toneMappingExposure=1.15;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  clock=new THREE.Clock();
  sceneGroup=new THREE.Group();
  monsterGroup=new THREE.Group();
  scene.add(sceneGroup);scene.add(monsterGroup);
  animate();
}

// Convert MeshBasicMaterial (unlit) to MeshStandardMaterial (lit).
// Quaternius pixel pack ships with basic materials; this makes monsters
// respond to scene lighting and cast/receive shadows.
function convertMaterials(mesh){
  mesh.traverse(c=>{
    if(!c.isMesh||!c.material)return;
    const mats=Array.isArray(c.material)?c.material:[c.material];
    const newMats=mats.map(oldMat=>{
      if(oldMat.type==='MeshBasicMaterial'||oldMat.isMeshBasicMaterial){
        const newMat=new THREE.MeshStandardMaterial({
          color:oldMat.color?oldMat.color.clone():new THREE.Color(0xffffff),
          map:oldMat.map||null,
          transparent:oldMat.transparent,opacity:oldMat.opacity,side:oldMat.side,
          roughness:0.85,metalness:0.0,vertexColors:oldMat.vertexColors||false
        });
        if(newMat.map){
          newMat.map.magFilter=THREE.NearestFilter;
          newMat.map.minFilter=THREE.NearestFilter;
          newMat.map.colorSpace=THREE.SRGBColorSpace;
        }
        oldMat.dispose();
        return newMat;
      }
      return oldMat;
    });
    c.material=Array.isArray(c.material)?newMats:newMats[0];
  });
}

async function loadGLTF(type){
  const config=MODEL_CONFIG[type];
  if(modelCache[type])return {scene:modelCache[type].scene.clone(true),animations:modelCache[type].animations,config};
  const gltf=await gltfLoader.loadAsync(config.path);
  convertMaterials(gltf.scene);
  modelCache[type]=gltf;
  return {scene:gltf.scene.clone(true),animations:gltf.animations,config};
}

async function getMonster(type){
  const result=await loadGLTF(type);
  if(!result)return null;
  const {scene:mesh,animations,config}=result;
  mesh.scale.setScalar(config.scale);
  mesh.position.y=config.yOffset;
  mesh.rotation.y=config.rotation;
  convertMaterials(mesh);
  mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true}});
  if(animations&&animations.length>0){
    const mixer=new THREE.AnimationMixer(mesh);
    mesh.userData.mixer=mixer;mesh.userData.clips={};
    animations.forEach(clip=>{
      const n=clip.name.toLowerCase();
      if(n.includes('idle'))mesh.userData.clips.idle=clip;
      else if(n.includes('attack'))mesh.userData.clips.attack=clip;
      else if(n.includes('hit')||n.includes('hurt')||n.includes('damage'))mesh.userData.clips.hurt=clip;
      else if(n.includes('die')||n.includes('death'))mesh.userData.clips.die=clip;
    });
    const startClip=mesh.userData.clips.idle||animations[0];
    if(startClip)mixer.clipAction(startClip).play();
    activeMixers.push(mixer);
  }
  mesh.userData.type=type;
  return mesh;
}

function buildScene(sceneType){
  while(sceneGroup.children.length)sceneGroup.remove(sceneGroup.children[0]);
  while(monsterGroup.children.length){const c=monsterGroup.children[0];monsterGroup.remove(c);disposeObj(c)}
  if(sceneType==='forest'){scene.background=new THREE.Color(0x1a0d2e);scene.fog=new THREE.FogExp2(0x1a0f33,0.09);addLights(0x6a5acd,0x4a148c,1.2);addForestScene()}
  else if(sceneType==='ruins'){scene.background=new THREE.Color(0x140c35);scene.fog=new THREE.FogExp2(0x20123d,0.08);addLights(0xb68eff,0x6a1b9a,1.3);addRuinsScene()}
  else if(sceneType==='volcano'){scene.background=new THREE.Color(0x4a0a00);scene.fog=new THREE.FogExp2(0x6b1a00,0.07);addLights(0xff6a00,0xaa2200,1.6);addVolcanoScene()}
}

function addLights(keyColor,fillColor,intensity){
  sceneGroup.add(new THREE.AmbientLight(fillColor,0.7));
  const key=new THREE.DirectionalLight(keyColor,intensity);
  key.position.set(3,6,4);key.castShadow=true;
  key.shadow.mapSize.width=1024;key.shadow.mapSize.height=1024;
  key.shadow.camera.near=0.5;key.shadow.camera.far=20;
  key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;
  sceneGroup.add(key);
  sceneGroup.add(new THREE.DirectionalLight(0xffaa55,0.5).translateX(-3).translateY(3).translateZ(-4));
  const front=new THREE.PointLight(0xffffff,1.2,10);front.position.set(0,2.5,4);sceneGroup.add(front);
  sceneGroup.add(new THREE.HemisphereLight(0xffffff,0x332233,0.6));
}

function addForestScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x0a0812,roughness:.9}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32),new THREE.MeshBasicMaterial({color:0xe9d5ff}));
  moon.position.set(2.5,4.5,-9);sceneGroup.add(moon);
  const moonGlow=new THREE.Mesh(new THREE.SphereGeometry(1.8,32,32),new THREE.MeshBasicMaterial({color:0xb891ff,transparent:true,opacity:0.2}));
  moonGlow.position.copy(moon.position);sceneGroup.add(moonGlow);
  for(let i=0;i<6;i++){
    const tree=createDeadTree();
    tree.position.set(-4.5+i*1.8,0,-4.5-Math.random()*1.5);
    tree.rotation.y=Math.random()*Math.PI;tree.scale.setScalar(1.2+Math.random()*0.4);
    sceneGroup.add(tree);
  }
}
function createDeadTree(){
  const g=new THREE.Group();
  const m=new THREE.MeshStandardMaterial({color:0x0a050a,roughness:.95});
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.15,2,6),m);trunk.position.y=1;trunk.castShadow=true;g.add(trunk);
  for(let i=0;i<4;i++){
    const branch=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.05,0.8,4),m);
    branch.position.y=1.3+i*0.25;branch.rotation.z=(i%2?1:-1)*(Math.PI/3+Math.random()*0.4);branch.position.x=(i%2?0.2:-0.2);
    g.add(branch);
  }
  return g;
}
function addRuinsScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x0c0820,roughness:.9}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  const pillarMat=new THREE.MeshStandardMaterial({color:0x1c1538,roughness:.85});
  [[-3.5,-4],[3.5,-4],[-4.5,-3],[4.5,-3],[-4,-5.5],[4,-5.5]].forEach(([x,z])=>{
    const h=1.5+Math.random()*2;
    const pillar=new THREE.Mesh(new THREE.BoxGeometry(0.4,h,0.4),pillarMat);
    pillar.position.set(x,h/2,z);pillar.castShadow=true;sceneGroup.add(pillar);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.15,0.55),pillarMat);
    cap.position.set(x,h,z);cap.castShadow=true;sceneGroup.add(cap);
  });
  for(let i=0;i<5;i++){
    const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(0.1+Math.random()*0.1,0),new THREE.MeshStandardMaterial({color:0xb891ff,emissive:0xb891ff,emissiveIntensity:0.8,roughness:0}));
    crystal.position.set(-3+Math.random()*6,3+Math.random()*1.5,-4+Math.random()*2);
    crystal.userData.floatOffset=Math.random()*Math.PI*2;sceneGroup.add(crystal);
  }
}
function addVolcanoScene(){
  const ground=new THREE.Mesh(new THREE.CircleGeometry(8,32),new THREE.MeshStandardMaterial({color:0x180300,roughness:.9,emissive:0x330800,emissiveIntensity:.3}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-0.01;ground.receiveShadow=true;sceneGroup.add(ground);
  for(let i=0;i<3;i++){
    const lava=new THREE.Mesh(new THREE.CircleGeometry(0.8+Math.random()*0.5,16),new THREE.MeshBasicMaterial({color:0xffaa00}));
    lava.rotation.x=-Math.PI/2;lava.position.set(-3+i*3,0.01,-3-Math.random());sceneGroup.add(lava);
    const lavaLight=new THREE.PointLight(0xff5500,2,4);lavaLight.position.set(lava.position.x,0.3,lava.position.z);sceneGroup.add(lavaLight);
  }
  const rockMat=new THREE.MeshStandardMaterial({color:0x1a0300,roughness:1});
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

async function spawnMonster(mi){
  const m=MONSTERS[mi];
  buildScene(m.scene);
  activeMixers.length=0;
  const mesh=await getMonster(m.type);
  if(!mesh)return;
  mesh.position.set(0,mesh.position.y,0);
  monsterGroup.add(mesh);monsterGroup.userData.mesh=mesh;
  animState={mode:'idle',progress:0};
}

function animate(){
  requestAnimationFrame(animate);
  const t=clock.getElapsedTime();const dt=clock.getDelta();
  activeMixers.forEach(mixer=>mixer.update(dt));
  const mesh=monsterGroup.userData.mesh;
  if(mesh){
    const baseY=MODEL_CONFIG[mesh.userData.type]?.yOffset||0;
    const hasClips=mesh.userData.clips&&Object.keys(mesh.userData.clips).length>0;
    if(animState.mode==='idle'&&!hasClips){mesh.position.y=baseY+Math.sin(t*1.8)*0.05;mesh.rotation.y=Math.sin(t*1.0)*0.18}
    else if(animState.mode==='windup'){animState.progress+=dt;const p=Math.min(animState.progress/0.3,1);mesh.position.z=-p*0.3;mesh.rotation.x=-p*0.2;mesh.scale.setScalar(MODEL_CONFIG[mesh.userData.type].scale*(1-p*0.08));if(p>=1){animState.mode='attack';animState.progress=0}}
    else if(animState.mode==='attack'){animState.progress+=dt;const p=Math.min(animState.progress/0.5,1);const eased=1-Math.pow(1-p,3);const baseScale=MODEL_CONFIG[mesh.userData.type].scale;if(p<0.45){mesh.position.z=-0.3+eased*2.8;mesh.scale.setScalar(baseScale*(0.92+eased*0.45));mesh.rotation.x=-0.2+eased*0.35}else{const rp=(p-0.45)/0.55;mesh.position.z=2.5-rp*2.5;mesh.scale.setScalar(baseScale*(1.37-rp*0.37));mesh.rotation.x=0.15-rp*0.15}if(p>=1){animState.mode='idle';animState.progress=0;mesh.position.z=0;mesh.rotation.x=0;mesh.scale.setScalar(baseScale)}}
    else if(animState.mode==='hurt'){animState.progress+=dt;const p=Math.min(animState.progress/0.5,1);mesh.position.x=Math.sin(p*Math.PI*8)*(1-p)*0.3;mesh.position.z=-Math.sin(p*Math.PI)*0.3;hurtFlashTimer=1-p;if(p>=1){animState.mode='idle';animState.progress=0;mesh.position.x=0;mesh.position.z=0;hurtFlashTimer=0}}
    else if(animState.mode==='die'){animState.progress+=dt;const p=Math.min(animState.progress/1.2,1);mesh.rotation.z=-p*0.9;mesh.position.y=baseY-p*1.5;mesh.scale.setScalar(MODEL_CONFIG[mesh.userData.type].scale*(1-p*0.5));mesh.traverse(c=>{if(c.material&&c.material.opacity!==undefined){c.material.transparent=true;c.material.opacity=1-p}})}
    if(hurtFlashTimer>0){mesh.traverse(c=>{if(c.material&&c.material.emissive){const base=c.userData.baseEmissive||(c.userData.baseEmissive=c.material.emissive.clone());c.material.emissive.setRGB(base.r+hurtFlashTimer,base.g+hurtFlashTimer*0.3,base.b+hurtFlashTimer*0.3)}})}
    if(shakeAmount>0){camera.position.x=(Math.random()-.5)*shakeAmount;camera.position.y=1.7+(Math.random()-.5)*shakeAmount*.5;shakeAmount*=0.85;if(shakeAmount<0.01){shakeAmount=0;camera.position.x=0;camera.position.y=1.7}}
  }
  sceneGroup.children.forEach(c=>{
    if(c.userData.isEmber){c.position.y+=c.userData.speed*dt;c.position.x+=Math.sin(t+c.userData.sway)*dt*.2;if(c.position.y>5)c.position.y=-0.5}
    if(c.geometry&&c.geometry.type==='OctahedronGeometry'){c.position.y+=Math.sin(t*1.5+c.userData.floatOffset)*dt*.3;c.rotation.y+=dt*.8;c.rotation.x+=dt*.5}
  });
  particles=particles.filter(p=>{p.life-=dt;if(p.life<=0){scene.remove(p.mesh);disposeObj(p.mesh);return false}p.mesh.position.add(p.vel.clone().multiplyScalar(dt));p.vel.y-=dt*2;p.mesh.material.opacity=p.life/p.maxLife;return true});
  if(renderer)renderer.render(scene,camera);
}

function spawnCastParticles(color,big){
  const count=big?30:14;
  const tp=monsterGroup.userData.mesh?monsterGroup.userData.mesh.position.clone().add(new THREE.Vector3(0,1.2,0)):new THREE.Vector3(0,1.5,0);
  for(let i=0;i<count;i++){
    const geo=new THREE.SphereGeometry(0.04+Math.random()*0.04,6,6);
    const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:1});
    const p=new THREE.Mesh(geo,mat);p.position.copy(tp);scene.add(p);
    const angle=Math.random()*Math.PI*2;const speed=1.5+Math.random()*2;
    particles.push({mesh:p,vel:new THREE.Vector3(Math.cos(angle)*speed,1+Math.random()*2,Math.sin(angle)*speed),life:0.8+Math.random()*0.4,maxLife:1.2});
  }
  if(big)shakeAmount=0.3;
}

let A=null,musicTimer=null,muted=false,musicStep=0,currentTheme=null;
function ensureAudio(){if(!A){try{A=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return false}}if(A.state==='suspended')A.resume();return true}
function tone(freq,dur,type='square',vol=.08,delay=0){if(muted||!A||freq<=0)return;const o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.value=freq;const t=A.currentTime+delay;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(A.destination);o.start(t);o.stop(t+dur+.02)}
function noise(dur,vol=.1,filter=1200,delay=0){if(muted||!A)return;const buf=A.createBuffer(1,A.sampleRate*dur,A.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,1.5);const s=A.createBufferSource(),g=A.createGain(),f=A.createBiquadFilter();f.type='lowpass';f.frequency.value=filter;s.buffer=buf;g.gain.value=vol;s.connect(f).connect(g).connect(A.destination);s.start(A.currentTime+delay)}
const BP=[[110,0,'k'],[0,0,null],[0,659,null],[0,0,null],[110,784,null],[0,0,null],[165,0,'s'],[0,659,null],[110,0,'k'],[0,587,null],[0,0,null],[0,659,null],[82,784,null],[0,0,null],[165,0,'s'],[0,1047,null]];
function startMusic(theme){stopMusic();if(muted||!ensureAudio())return;currentTheme=theme;
  if(theme==='battle'){musicStep=0;const play=()=>{if(muted||currentTheme!=='battle'){stopMusic();return}const[b,l,d]=BP[musicStep%BP.length];if(b>0)tone(b,.25,'triangle',.09);if(l>0)tone(l,.18,'square',.045);if(d==='k'){noise(.1,.12,180);tone(60,.1,'sine',.15)}if(d==='s')noise(.08,.08,5000);musicStep++};play();musicTimer=setInterval(play,230)}
  else if(theme==='victory'){[523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>{tone(f,.22,'square',.1,i*.11);tone(f/2,.22,'triangle',.08,i*.11)});[523,659,784,1047].forEach(f=>{tone(f,2,'square',.07,1.1)})}
  else if(theme==='defeat'){[440,392,349,330,294,220].forEach((f,i)=>{tone(f,.9,'sine',.11,i*.55);tone(f/2,.9,'triangle',.07,i*.55)})}
  else if(theme==='complete'){[261,329,392,523,659,784,1047].forEach((f,i)=>{tone(f,.3,'square',.11,i*.13);tone(f/2,.3,'triangle',.09,i*.13)});[523,659,784,1047,1319].forEach(f=>{tone(f,3,'square',.06,.95)})}
}
function stopMusic(){if(musicTimer)clearInterval(musicTimer);musicTimer=null;currentTheme=null}
function sfxTap(){tone(880,.04,'square',.05);tone(1760,.03,'square',.03,.01)}
function sfxDeselect(){tone(440,.04,'square',.04)}
function sfxCast(len){for(let i=0;i<Math.min(len,8);i++){tone(330+i*80,.09,'square',.07,i*.04);tone(660+i*160,.07,'triangle',.04,i*.04)}}
function sfxHit(big){if(big){tone(120,.3,'square',.13);tone(180,.3,'sawtooth',.09,.02);noise(.35,.2,1500);tone(880,.15,'square',.08,.05)}else{tone(160,.15,'square',.1);noise(.15,.13,1000)}}
function sfxPlayerHurt(){noise(.22,.15,2400);tone(200,.18,'sawtooth',.1);tone(150,.2,'square',.08,.02)}
function sfxInvalid(){tone(220,.08,'sawtooth',.07);tone(196,.12,'sawtooth',.06,.05)}

// Click delegation
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el)return;
  const a=el.dataset.a,p=el.dataset.p;
  if(a==='tile')tapTile(+p);else if(a==='cast')castSpell();else if(a==='clear')clearWord();else if(a==='next')nextMonster();else if(a==='restart')restartGame();else if(a==='sound')toggleSound();else if(a==='play')startGame();
});

// Keyboard input
document.addEventListener('keydown',e=>{
  if(S.phase==='title'){
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      const btn=document.getElementById('playBtn');
      if(btn&&!btn.disabled)startGame();
    }
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
    S.sel=[...S.sel,tile.id];sfxTap();
    const btn=document.querySelector(`[data-a="tile"][data-p="${tile.id}"]`);
    if(btn){btn.classList.add('keypress');setTimeout(()=>btn.classList.remove('keypress'),120)}
    renderBattle();
  } else sfxInvalid();
});

function toggleSound(){muted=!muted;const b=document.getElementById('sbtn');if(b)b.textContent=muted?'\u266A\u0338':'\u266A';if(muted)stopMusic();else{ensureAudio();if(S.phase==='battle')startMusic('battle')}}

function startTimers(){clearInterval(atkT);clearInterval(progT);atkElapsed=0;const m=MONSTERS[S.mi];
  progT=setInterval(()=>{if(S.phase!=='battle')return;atkElapsed+=100;const pct=Math.min(100,atkElapsed/m.iv*100);const bar=document.getElementById('atkb');if(bar)bar.style.width=pct+'%'},100);
  atkT=setInterval(()=>{if(S.phase!=='battle'||S.dying)return;atkElapsed=0;animState={mode:'windup',progress:0};
    setTimeout(()=>{if(S.phase!=='battle')return;S.php=Math.max(0,S.php-m.atk);S.phurt=true;flash('red');sfxPlayerHurt();addFloat(`-${m.atk}`,'#ef4444',22,25+Math.random()*40,140);addLog(`${m.name} lunges — ${m.atk} damage!`);setTimeout(()=>{S.phurt=false;const pb=document.getElementById('pbar');if(pb)pb.classList.remove('phurt')},380);if(S.php<=0){goDefeat();return}renderBattle()},400);
  },m.iv)}
function stopTimers(){clearInterval(atkT);clearInterval(progT)}
function flash(color){const f=document.getElementById('flash');if(!f)return;f.className='flash on '+(color||'');setTimeout(()=>{f.className='flash'},120)}
function addFloat(text,color,size,x,y){const fx=document.getElementById('fxlayer');if(!fx)return;const el=document.createElement('div');el.className='fdmg';el.style.cssText=`left:${x}%;bottom:${y||140}px;font-size:${size}px;color:${color}`;el.textContent=text;fx.appendChild(el);setTimeout(()=>el.remove(),1500)}
function addLog(t){S.log=[t,...S.log].slice(0,4)}

function tapTile(id){if(S.phase!=='battle')return;ensureAudio();if(S.sel.includes(id)){S.sel=S.sel.filter(x=>x!==id);sfxDeselect()}else{S.sel=[...S.sel,id];sfxTap()}renderBattle()}
function clearWord(){if(S.phase!=='battle')return;S.sel=[];sfxDeselect();renderBattle()}
function castSpell(){
  if(S.phase!=='battle'||S.dying)return;ensureAudio();
  const m=MONSTERS[S.mi];const word=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?t.letter:''}).join('').toLowerCase();
  if(word.length<3){addLog('Need at least 3 letters!');sfxInvalid();renderBattle();return}
  if(S.used.has(word)){addLog(`"${word.toUpperCase()}" already cast.`);S.sel=[];sfxInvalid();renderBattle();return}
  if(!W.has(word)){addLog(`"${word.toUpperCase()}" — not a valid word!`);S.sel=[];sfxInvalid();renderBattle();return}
  const d=dmg(word.length);const cb=S.combo>=2?Math.round(d*.25):0;const total=d+cb;
  S.combo++;S.used.add(word);S.sel=[];S.tiles=mkTiles(m.tiles);S.mhp=Math.max(0,S.mhp-total);
  const big=word.length>=6;sfxCast(word.length);
  setTimeout(()=>{
    sfxHit(big);if(big)flash('gold');
    const col=word.length>=7?0xa78bfa:word.length===6?0xf97316:word.length===5?0xfbbf24:0x60a5fa;
    spawnCastParticles(col,big);
    animState={mode:'hurt',progress:0};
    const hexCol=`#${col.toString(16).padStart(6,'0')}`;
    addFloat(`${big?'⚡ ':''}${total}`,hexCol,big?30:24,18+Math.random()*50,140);
    renderBattle();
  },word.length*40+50);
  const tv=tier(word.length);let msg=`${tv.t} "${word.toUpperCase()}" → ${total} dmg`;if(cb>0)msg+=` (×${S.combo} combo!)`;addLog(msg);
  if(S.mhp<=0){S.dying=true;S.txp+=m.xp;setTimeout(()=>{animState={mode:'die',progress:0};setTimeout(()=>{stopTimers();if(S.mi<MONSTERS.length-1)goTransition();else goComplete()},1200)},500)}
  renderBattle();
}

function goTransition(){S.phase='transition';stopMusic();showScreen('sTrans',renderTransition());startMusic('victory')}
function goComplete(){S.phase='complete';stopMusic();showScreen('sWin',renderComplete());startMusic('complete')}
function goDefeat(){S.phase='defeat';stopMusic();stopTimers();showScreen('sDefeat',renderDefeat());startMusic('defeat')}
async function nextMonster(){stopMusic();S.mi++;const m=MONSTERS[S.mi];S.mhp=m.maxHp;S.php=100;S.tiles=mkTiles(m.tiles);S.sel=[];S.used=new Set();S.combo=0;S.log=[`A ${m.name} emerges!`];S.phase='battle';S.dying=false;await spawnMonster(S.mi);hideScreens();renderBattle();startTimers();startMusic('battle')}
async function restartGame(){stopMusic();stopTimers();S={phase:'battle',mi:0,mhp:MONSTERS[0].maxHp,php:100,tiles:mkTiles(MONSTERS[0].tiles),sel:[],used:new Set(),log:['The dungeon awakens. Spell words to attack!'],combo:0,phurt:false,txp:0,dying:false};await spawnMonster(0);hideScreens();renderBattle();startTimers();startMusic('battle')}

function hideScreens(){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const t=document.getElementById('sTitle');if(t)t.classList.add('gone')}
function showScreen(id,html){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const el=document.getElementById(id);if(el){el.innerHTML=html;setTimeout(()=>el.classList.add('on'),20)}}

function renderBattle(){
  const m=MONSTERS[S.mi];
  const mpc=Math.max(0,S.mhp/m.maxHp*100),ppc=Math.max(0,S.php);
  const mc=hpCol(mpc),pc=hpCol(ppc);
  const word=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?t.letter:''}).join('');
  const wl=word.toLowerCase();
  const valid=word.length>=3&&W.has(wl)&&canMake(wl,m.tiles);
  const already=S.used.has(wl);
  const d=valid&&!already?dmg(word.length):0;
  const tv=word.length>=3?tier(word.length):null;
  const tiles=S.tiles.map(t=>{const sel=S.sel.includes(t.id);return`<button class="tile${sel?' sel':''}" data-a="tile" data-p="${t.id}">${t.letter}</button>`}).join('');
  const slots=S.sel.map(id=>{const t=S.tiles.find(t=>t.id===id);return t?`<span class="lslot">${t.letter}</span>`:''}).join('');
  let preview='';
  if(word.length>=3){
    if(already)preview=`<span style="margin-left:auto;font-size:11px;color:#ef4444;font-family:Cinzel,serif;font-weight:600">USED</span>`;
    else if(!W.has(wl))preview=`<span style="margin-left:auto;font-size:11px;color:#44405a;font-family:Cinzel,serif">?</span>`;
    else preview=`<span style="margin-left:auto;font-size:11px;font-family:Cinzel,serif;font-weight:700" class="${tv.c}">${tv.t} ${d}dmg</span>`;
  }
  const dots=MONSTERS.map((_,i)=>`<div class="dot" style="width:${i===S.mi?22:7}px;background:${i<S.mi?'#22c55e':i===S.mi?m.acc:'#2a2545'}"></div>`).join('');
  const logHTML=S.log.slice(0,2).map((l,i)=>`<div class="logline" style="color:${i===0?'#ddd6fe':'#4a4570'};font-size:${i===0?12:11}px">${l}</div>`).join('');
  const comboTag=S.combo>=2?`<span style="color:#f59e0b;font-family:Cinzel,serif;font-size:11px;margin-left:10px">🔥 ×${S.combo}</span>`:'';
  document.getElementById('topui').innerHTML=`
    <div class="title" style="color:${m.acc}">✦ SPELL FORGE ✦</div>
    <div class="mrow">
      <div><div class="mname" style="color:${m.acc}">${m.name}</div><div class="msub">${m.sub}</div></div>
      <div class="hplabel">HP ${S.mhp} / ${m.maxHp}</div>
    </div>
    <div class="hpt"><div class="hpf" style="width:${mpc}%;background:${mc};box-shadow:0 0 10px ${mc}"></div></div>
    <div class="atk-track"><div class="atk-fill" id="atkb" style="width:0%"></div></div>`;
  document.getElementById('bottomui').innerHTML=`
    <div class="dots">${dots}</div>
    <div id="pbar" class="card${S.phurt?' phurt':''}" style="margin-bottom:6px">
      <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px">
        <span style="color:#c4b5fd">⚔ Wizard</span><span style="color:${pc}">${S.php} / 100 HP</span>
      </div>
      <div class="hpt"><div class="hpf" style="width:${ppc}%;background:${pc};box-shadow:0 0 8px ${pc}"></div></div>
    </div>
    <div class="card" style="margin-bottom:6px;min-height:42px">${logHTML}</div>
    <div class="card wordzone${word.length>0?' active':''}" style="margin-bottom:6px">
      ${word.length===0?`<span style="color:#2d2a48;font-style:italic;font-size:12px">Tap or type letters…</span>`:slots}${preview}
    </div>
    <div class="tgrid">${tiles}</div>
    <div style="color:#3a3560;font-size:10px;text-align:center;margin-bottom:6px;font-family:Cinzel,serif;letter-spacing:.4px">${m.hint}${comboTag}</div>
    <div class="btn-row">
      <button class="btn-clear" data-a="clear">↩ Clear</button>
      <button class="btn-cast ${d>0?'ready':'off'}" data-a="cast">✦ Cast Spell</button>
    </div>`;
}
function renderTransition(){const done=MONSTERS[S.mi];return `<div class="big-emoji" style="color:#4ade80">⚔️</div><h2 style="color:#fbbf24">VICTORY!</h2><p style="color:#4ade80">${done.name} defeated!</p><p style="color:#fbbf24">+${done.xp} XP · Total: ${S.txp}</p><button class="scbtn" data-a="next">Next Battle →</button>`}
function renderComplete(){return `<div class="big-emoji" style="color:#fbbf24">🏆</div><h2 style="color:#fbbf24">DUNGEON CLEARED</h2><p>All 3 monsters defeated!</p><p style="color:#a78bfa">Final XP: ${S.txp}</p><button class="scbtn" data-a="restart">↺ Play Again</button>`}
function renderDefeat(){const m=MONSTERS[S.mi];return `<div class="big-emoji" style="color:#ef4444">💀</div><h2 style="color:#ef4444">DEFEATED</h2><p>The ${m.name} overwhelmed you.</p><p style="color:#4a4570">XP earned: ${S.txp}</p><button class="scbtn" data-a="restart">↺ Try Again</button>`}

// Preload all models up front
async function preloadAll(){
  const updateStatus=(txt)=>{const el=document.getElementById('ltext');if(el)el.textContent=txt};
  try{
    updateStatus('Summoning the goblin…');
    await loadGLTF('goblin');
    updateStatus('Awakening the skeleton…');
    await loadGLTF('skeleton');
    updateStatus('Binding the demon…');
    await loadGLTF('demon');
    updateStatus('Ready');
    const btn=document.getElementById('playBtn');
    if(btn){btn.disabled=false;btn.textContent='▶ PLAY'}
    const dots=document.getElementById('ldots');if(dots)dots.style.display='none';
  }catch(err){
    console.error('Preload failed:',err);
    const el=document.getElementById('ltext');if(el)el.textContent='Error loading assets — check console';
  }
}

async function startGame(){
  if(S.phase!=='title')return;
  ensureAudio();
  S.phase='battle';
  S.mi=0;S.mhp=MONSTERS[0].maxHp;S.php=100;S.tiles=mkTiles(MONSTERS[0].tiles);S.sel=[];S.used=new Set();S.combo=0;S.log=["The dungeon stirs. Spell words to strike!"];S.dying=false;
  document.getElementById('sTitle').classList.add('gone');
  await spawnMonster(0);
  renderBattle();
  startTimers();
  startMusic('battle');
}

// Boot
initThree();
preloadAll();
