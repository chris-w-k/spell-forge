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
const ANIMAL_WORDS="bull,bulls,rant,runt,burn,burnt,turn,tuna,bran,brunt,brat,brats,tuba,tubas,abut,stag,stags,gates,gear,gears,rage,rages,rant,rants,rest,stare,tears,great,grade,grades,trend,tarts,darts,stags,drag,drags,rags,rats,tars,arts,dart,stard,grandest,gaunter,granted,strange,gander,ganders,garden,gardens,dragnet,husky,husks,rash,rush,rushy,hark,shark,hunks,sunk,hush,harsh,nuns,shun,harks,sharks,shush,husked,huskier,yank,yanks,khan,khans,hand,hands,wolf,wolfs,flow,flows,owls,slow,slows,fowl,fowls,woofs,woof,wolves,slowly,flown,flowing,slowing,fowling,narrows,narrow,nasal,snarls,snarl,deer,deeds,reed,reeds,seed,seeds,does,dose,redeem,deed,deeds,darts,darns,darn,drats,strand,stands,stand,nards,nerds,render,renders,tender,tenders,stander,standard,horse,horses,shore,shores,shoe,shoes,rose,roses,sore,hoser,shoer,heros,hones,shorter,shorten,shorn,horned,horns,shoehorn,hornets,another,shibainu,shib,inu,shin,bash,basin,habs,bias,banish,cabin,banishes,airbus,auburn,urbans,burins,bruin,bruins,donkey,donkeys,keyed,dykes,yoked,nosed,dyes,keys,doze,noes,nodes,donkeys,keyboards,keyed,keyhole,keyholes,monkeys,monkey,donkeys,cow,cows,crown,corn,horn,horns,snow,worn,worry,crowns,crowning,crowner,acorns,acorn,scorn,scorns,cranes,crane,canoes,canoe,racoons,racoon,fox,foxes,foxy,oxen,hornbeam,hornet,foxier,foxiest,toxin,toxins,foxing,orphan,orphans,pony,ponies,alpaca,alpacas,apple,lapse,clasp,claps,pasta,pals,heron,herons,hook,alpacas,capsule,lapsed,apples,sparse,carpal,carpals,rascal,rascals,palaces,palace,appears,appear,captures,capture,animal,animals,animate,animator,creature,creatures,wildlife,wildcat,wildcats,stampede,stampedes,stampeded,gallops,gallop,galloped,canter,canters,cantered,cantering,slapping,slapped,slapper,slappers,whacking,whacked,whack,whacks,smacking,smacked,smack,smacks,bonk,bonks,bonked,bonking,thump,thumps,thumped,thumping";
// Add 7-letter and 8-letter common words for super slaps
const SEVENEIGHT="ability,absence,academy,account,achieve,acquire,address,advance,advised,adviser,against,airline,airport,alcohol,alleged,already,amongst,amateur,ancient,another,anxiety,anxious,anybody,anymore,anyways,apparel,applied,approve,arising,arrival,article,artists,aspects,athlete,attempt,attends,auction,average,awarded,awesome,awkward,bandage,baseball,bathtub,battery,beaches,because,becomes,bedroom,believe,benefit,besides,between,billion,binding,biology,blanket,blessed,brother,brought,builder,burning,cabinet,cameras,camping,capable,capital,captain,capture,carbons,careers,carried,carries,carrots,casters,casting,casual,catches,caution,ceiling,central,century,certain,chamber,changed,changes,channel,chapter,charges,charity,charter,chasing,chatter,cheaper,checked,cheered,chemist,chicken,choices,chooses,chopped,circles,circuit,citizen,classes,climate,climbed,closely,closing,clothes,collect,college,colored,colored,comfort,command,comment,company,compare,compete,complex,concept,concern,concert,conduct,confirm,confuse,connect,contact,contain,content,contest,context,control,convert,cooking,cooling,copying,correct,cottage,counted,counter,country,courage,courses,crashes,crashed,creates,created,creator,criminal,crossed,cruiser,crystal,culture,current,cutting,damaged,damages,dancers,dancing,dealers,dealing,decides,decline,default,defense,deficit,defines,degrees,delayed,deliver,density,deposit,despite,destroy,details,detects,develop,devices,devoted,diamond,diapers,differ,digital,dilemma,dinners,diploma,diseases,display,disposal,dispute,divided,divides,doctors,doctrine,dollars,domains,doorway,dormant,doubled,doubles,drawing,dreaded,dropped,drought,dubious,dungeon,durable,dynamic,eastern,eastward,economy,edition,editors,educate,elderly,element,elephant,empires,empower,enabled,enables,enclose,endless,endorse,energy,engaged,engines,english,enhance,enjoyed,enough,ensures,entered,entires,entire,envelope,envious,episode,equally,equipped,erosion,escaped,espouse,essence,estates,eternal,ethical,euphoric,evening,everyday,evident,exactly,example,exceeds,excited,exclude,excuses,executed,exhibit,exiting,expands,expects,experts,expired,explain,explore,exposed,express,extends,extreme,factory,failing,fallen,falling,familiar,famous,fantasy,fashion,fastest,fathers,faulty,favored,feather,featured,federal,feeling,fellows,fencing,fermented,fictional,fighter,figured,figures,filling,filters,finally,finance,finding,findings,finished,firearm,fishing,fitness,flashes,flavors,flights,flipped,flooded,flowers,flowing,focused,foliage,follows,forbids,forcing,foreign,forests,formats,formula,fortune,forward,fought,founded,founder,fourth,fragile,freedom,freezer,frequent,freshly,fridges,fringes,frontal,fulfill,further,fusion,gallons,gambled,gardens,garlic,garnish,general,generic,genuine,gentle,gently,genuine,getting,ginger,giraffe,golfers,grabbed,gracious,gradual,granted,grasped,greater,greeted,grocery,grounds,grouped,growing,guessed,guests,guidance,guiding,guilty,hampered,handled,handles,hanging,harbors,hardest,harmony,harvest,haunted,healing,healthy,hearing,heaters,heating,heavens,heavier,heights,helpers,helping,herbals,heroes,heroic,hexagon,hiccup,highest,highway,hinging,history,hobbies,holders,holding,holiday,honesty,honored,hopeful,horizon,hosting,hostile,hottest,however,hundred,hungry,hunters,hunting,husband,hygiene,hymnals,ideally,imagery,imagine,imitate,impacts,improve,includes,income,indulge,indoors,infancy,infects,inflamed,informed,ingest,initial,initiate,injured,injures,innings,inquire,inserted,insight,inspire,install,instant,instead,integer,intends,interior,intimate,intoned,invests,invited,ireland,islands,isolate,issuing,italian,jackets,janitor,january,jealous,jerkier,jogging,joining,journal,journey,judging,jumpers,jumping,justice,justify,keeping,keyhole,kickoff,kicking,kinetic,kingdom,kitchen,knights,knocked,knocker,lacking,lantern,largely,largest,lasting,lateral,lathers,laundry,leading,learned,learner,leather,leaving,lecture,leftist,legally,legends,leisure,letting,liaison,liberty,library,license,lifting,lighter,limited,limping,lineage,linking,lioness,liquids,listing,literal,liveset,loaders,loading,lobbies,located,locator,locking,logical,longest,longing,looking,looping,loosely,lottery,lounges,lowered,lowland,loyalty,luckily,luggage,lurking,machine,madness,magical,magnets,magnify,mailbox,mailing,mainstay,majesty,mammoth,manager,manages,mandate,mankind,manners,mansion,mapping,marched,markers,markets,marshal,martial,martyrs,massage,masters,matched,matches,matters,maximum,meaning,measure,mechanic,medical,meeting,members,memoirs,mending,mention,merchant,mercury,merging,message,metaphor,methane,midnight,mightly,migrate,military,million,mineral,miracle,missing,mission,mistake,mixture,mocking,mocking,modeled,moderate,modesty,molding,molting,moments,monitor,monster,monthly,morning,morphine,mortgage,motions,mountain,mourned,movable,movement,mundane,murders,musical,mustache,mutters,myriads,mystery,namings,napkins,narrows,nasally,nations,natural,nearest,nearing,necklaces,neither,nervous,network,neutral,neutron,newborns,newness,nitrogen,nodding,nominal,noodles,normal,notable,noticed,nothing,noticed,nuclear,numbers,nursing,obesity,objects,observe,obscure,obvious,occupied,ocean,oceans,offered,offices,offline,offsets,offside,oldest,omitted,onwards,opening,operate,opinion,opposed,oppress,optical,optimal,options,oranges,ordered,organic,oriented,origins,outburst,outcome,outdoor,outings,outlets,outlook,outlying,outpost,outputs,outside,outward,outweigh,overall,overcome,oxidize,package,packers,packing,paddles,painted,painter,palaces,palette,panicked,parades,pardons,parents,parking,partial,parties,partner,passage,passing,passion,password,pasture,patched,patches,pathway,patient,patriot,patrons,patterns,payable,payment,peasant,peculiar,pedaling,pending,penguin,pennant,pensions,peoples,percent,perfect,perform,perhaps,periods,perkier,perking,persons,persuade,pharmacy,pharaoh,phasing,philosophy,phonics,phrased,phrases,physics,pianists,picnics,picture,piercing,pigment,pilgrim,pillars,pimples,pioneer,piously,piracy,pirates,pitcher,placebo,placing,plagues,plainly,plaintiff,planets,planned,planner,plaster,plastic,platters,players,playing,pleasant,pleased,pleases,plowing,plucked,plunder,plunged,poached,poached,pockets,pointed,pointer,poisons,polices,policies,polished,politely,pollute,polymer,popcorn,popular,portals,portion,portray,posters,pouring,poverty,powered,praises,prances,precede,precious,predict,prefers,prepare,prepay,prescribe,present,preside,presidents,presser,presses,pressure,presumed,pretend,prevail,prevent,previous,pricing,primary,primate,primed,princes,printed,printer,prisons,private,problem,process,produce,product,profile,profits,profound,program,project,prolong,promise,promote,prompts,pronoun,proofed,propose,prosper,protect,protest,protons,prouder,proudly,proverb,provide,provoke,psychic,publicly,publish,pudding,pulling,pulsate,pumping,punched,puncher,punches,punish,puppets,puppies,purpose,pursued,pushing,pyramid,quality,quarter,quicken,quicker,quickly,quieter,quietly,quitter,rabbits,radiant,rafters,raiders,raiding,railings,rainbow,rainier,raising,rallies,ramping,rancher,rancheros,ranging,rapidly,rarely,rarefied,rascals,rascally,rational,ratings,rattle,ravaged,reached,readily,reading,readout,readying,realism,realist,reality,realize,rebuild,recalls,receded,receipt,receive,recent,recipes,recited,reckon,reclaim,recoils,recorded,recover,recruit,rectify,recycle,redeem,redness,redoing,reduced,referee,reflect,reforms,refresh,refused,regards,regimen,regions,related,relates,relaxed,release,relieve,remains,remarks,remedies,remind,removal,removed,removes,renamed,renders,renewed,rentals,renting,repairs,repaying,repeats,replace,replied,replies,reports,reposed,rescued,rescues,reserve,resets,resided,resigned,resist,resolve,respect,respond,restore,restful,resting,results,resumed,retails,retains,retired,retorts,retract,retreat,returns,reunite,reveals,revenge,reverse,reviews,revived,revival,rewards,rhetoric,rhyming,rhythm,ribbon,riddance,riddled,ridicule,riflery,rigging,rightly,rigidly,rigorous,ripples,risking,rituals,roadway,roamed,roaring,robbers,rockers,rocking,rodeos,rolling,rolypoly,romance,roofing,rookery,rookies,roomier,rooster,rotation,rotted,rotting,roughly,rounded,rousing,routine,rowboats,royalty,ruining,rulings,rumbles,rummage,rupture,rushing,rustic,rusty,sacking,sacred,saddled,sadness,safely,safety,sailors,salmons,samples,sampling,sanction,sanders,sanding,sanity,sapient,sappy,satchel,satisfy,savings,sawdust,saying,scaling,scalped,scamper,scandal,scanned,scanners,scarcely,scenery,scenic,scheme,schemes,scholar,schools,sciatic,scissors,scooter,scooped,scorned,scoring,scouted,scowled,scrappy,scratch,scrawny,screens,screwed,scripts,scrolls,scrubbing,scuffle,seafloor,seafood,seaport,seaside,seasons,seating,seceded,seclude,secrete,section,secular,secured,secures,sedated,seedings,seeking,seemed,seepage,seizing,seldom,selects,selling,senator,sending,seniors,sensing,sensor,sensory,sentence,sequels,sequin,serials,serving,setting,settled,settler,seventy,several,severely,sewage,sewers,shabby,shacked,shackles,shadier,shading,shadow,shadows,shakier,shaking,shallow,shamans,shaming,shampoo,shandy,shapely,shaping,shards,sharers,sharing,sharper,sharply,shatter,shaving,shawls,sheaves,shedding,shelled,shelter,shelves,shepherd,sherry,shields,shifted,shilling,shimmer,shining,shinier,shiners,shiniest,shipper,shiver,shocked,shocking,shoelace,shooter,shopped,shopper,shortage,shortened,shortens,shoulder,shouted,shouter,shoved,shoving,showing,showman,shown,shreds,shrieks,shrines,shrinks,shrivel,shrouds,shuffle,shunted,shutters,shutting,siamese,sickly,signals,silence,silicon,similar,simmer,simplify,simulate,sincere,singers,singing,singled,singles,sinking,sinners,sipping,sisters,sitcoms,sitting,situate,sizably,skaters,skating,skeptic,sketched,sketchy,skidded,skilled,skilled,skinned,skipped,skipper,skulls,slacker,slacks,slammed,slapped,slapper,slashed,slashes,slather,slating,slavery,sleeper,sleeves,sleighs,slender,slicing,slicker,slightly,slipped,slither,slivers,slobber,sloping,sloppy,sloshed,slowing,slumber,smacked,smaller,smarmy,smasher,smashing,smelled,smiling,smokers,smoking,smoother,smoothly,smoothy,smudged,snappy,snarled,snatch,sneaker,sneaking,sneezes,sniffed,sniffer,sniffle,snipped,snooker,snoopers,snooze,snorkel,snotted,snowier,snowing,snuggle,soaring,society,socket,softest,software,soggier,soldier,solemn,solidly,solving,someone,someday,somehow,somewhat,sonnets,soothed,soothes,sorcery,sorting,soulful,soundly,sourced,sources,souring,souring,southern,spacing,spanish,spanked,spanner,sparkly,spartan,spatial,spatter,speaker,species,specify,spectra,speech,speeches,spelled,speller,spender,spent,spheres,sphinx,spicier,spicing,spigot,spilled,spindle,spiffed,spiking,spikily,spinach,spindle,spinner,spirits,spirit,splashy,splayed,splendid,splices,splinter,spoiled,spokes,sponsor,sporadic,sported,spotted,sprawled,sprayed,sprees,sprightly,springs,sprinkle,sprinting,sprints,sprouts,spunky,spurred,spurted,squabble,squadron,squalor,squander,squared,squeaks,squeaky,squealed,squeezed,squelch,squinted,squirmed,squirrel,squirted,stabbed,stables,stacked,staffed,staffer,stagers,staging,stained,staining,stairway,stalemate,staling,stalked,stalker,stammer,stamped,standard,stander,standing,standoff,staplers,starched,stardom,staring,starred,starter,started,startle,startled,startles,starving,stashed,stasis,stated,statement,states,statics,station,stature,stayed,staying,steadier,steadily,stealer,stealing,steaming,steered,steering,stellar,stemmed,stemmy,stenches,stencil,stepped,stepping,sterile,sterling,stewards,sticker,sticking,stiffen,stiffer,stifled,stilted,stinger,stinking,stinking,stipend,stirred,stirrer,stirrup,stitched,stitches,stocked,stocker,stocking,stockpile,stodgy,stoked,stomach,stomped,stomper,stoneware,stoning,stooped,stopgap,stopped,stopper,storage,stories,storing,stormed,stormy,stouter,straddles,strafed,straggler,straight,straining,strained,strapping,strappy,strategy,strands,stretch,strewing,striding,striker,striking,stringer,strings,stripes,striped,stripped,stripper,striving,strode,strollers,stroller,strolling,stronger,strongly,struck,structure,struggle,strutted,stubborn,stuccoed,studded,studier,studies,studying,stuffing,stumbled,stumped,stumper,stunner,stunned,stunned,stunted,sturdy,styling,stylish,subside,subsists,subtitle,subtle,subtler,subway,succeed,success,suckers,sucking,suction,sudden,suffered,suffers,suffice,suggest,summary,summoned,summons,sumptuous,sundial,sunflower,sunnily,sunrise,sunscreen,sunsets,sunshine,sunshine,superbly,support,suppose,supreme,surefire,surfaced,surfaces,surgeon,surging,surpass,surplus,surprise,surrogate,surround,survey,survival,survived,suspect,suspend,suspense,sustain,swagger,swallow,swamped,swanky,swapped,swarmed,swearing,sweated,sweatpants,sweaty,sweeper,sweeping,sweeter,swelled,swiftly,swiftest,swimmer,swinger,swings,swipes,swirled,swirly,swishing,swollen,swooshed,syllable,symbolic,symmetry,sympathy,symptom,syringes,system,systems,tablets,tackled,tackles,tacking,tactful,tactical,tactics,tadpole,tagging,tailors,takings,talented,talking,tallied,tampered,tangent,tangled,tankers,tantrum,tapered,tapestry,tapping,tardier,tarnish,tastier,tasting,tattoos,taverns,teaches,teachers,teaming,teamster,teardrop,tearful,tearing,teasers,teasing,technical,technique,teenagers,teething,telegram,telephone,temperature,temple,tempted,tempting,tenants,tendency,tender,tending,tennis,tension,terminal,terrible,terribly,terrific,terrified,testable,testers,testing,textbook,texting,texture,thanked,thawed,theater,theology,theory,therapy,thereby,therefore,thermal,thermos,thicken,thicker,thickest,thickly,thieves,thimbles,thinking,thinner,thirties,thirty,thither,thorax,thorough,thought,thousand,thrashed,threaded,threats,thrilled,thrills,thriving,throats,thrones,through,throw,thrown,thrust,thumbs,thumped,thumping,thunder,thunk,tickets,tickled,ticking,tidbits,tidiest,tiebreaker,tigers,tighten,tighter,tighter,tilings,timbers,timeless,timeline,timely,timings,tingling,tinkered,tiptoed,tiredly,tissues,titular,toasted,toaster,tobacco,toddler,tombs,tombstone,tonight,toolbar,toolbox,tooling,topsoil,torched,tornado,torture,tossing,totally,totaled,totalled,touched,toughen,toughie,tourism,tourist,towards,toweled,towered,township,townspeople,toxicity,tracked,tracker,tracts,tracing,trading,traffic,tragedy,trailer,trained,trainee,trainees,trainer,traitor,tramped,trampled,tranquil,transom,trapped,trappers,trashed,trashed,traumas,traveled,travels,treated,treatment,treaties,trellis,trembled,trembles,trendier,triceps,tricked,trickery,tricks,tricky,trident,trifled,trifles,trigger,trilled,trilogy,trinkets,trio,triplet,tripled,triples,tripods,triumph,trivial,trolleys,trooper,tropics,trotted,trotter,trouble,trounced,troupes,trowels,truckled,trudged,trueness,truffle,trumpets,trumpet,trunked,trusted,trustee,trusting,trusts,trying,tryout,tsunami,tubing,tubular,tuition,tumbled,tumbler,tumbles,tundra,tunnels,turbans,turbine,turkeys,turmoil,turnaround,turning,turnip,turrets,turtle,tutored,twangy,tweaked,tweeted,tweeters,twelve,twelfth,twenty,twentieth,twiddle,twigged,twilight,twinge,twinges,twinkle,twirled,twirler,twisted,twister,twitch,typical,tyranny,ulcers,ultra,unacceptable,unaware,unblock,uncle,uncles,unclothed,uncovered,uncommon,undoes,undying,unearth,unequal,unerring,uneven,unexpected,unfairly,unfeeling,unfolds,unfound,unfurls,ungodly,unhappy,unhinged,unicorn,uniform,unionize,unique,uniquely,uniting,unitary,universe,unknown,unlace,unlock,unleash,unlevel,unlisted,unloaded,unlucky,unmade,unmarked,unmasked,unmoved,unnamed,unnerved,unoiled,unopened,unopposed,unquote,unrated,unread,unreal,unreceived,unrecognized,unseated,unseen,unskilled,unsmoked,unsnap,unsold,unsound,unspoken,unstable,unsteady,unstinting,unsure,unsuspected,untamed,untidy,untied,untimely,untiring,unused,unusual,unusually,unveiled,unveils,unwaged,unwanted,unwary,unwashed,unwelcome,unwilling,unwittingly,unwomanly,unwon,unworthy,unyielding,upbeat,upcoming,updated,upfront,upgrade,upheaval,upheld,uphold,uplift,uplink,uploaded,uppers,upraise,uprate,upright,uprising,uproar,uproot,upsetting,upshot,upstairs,upstream,uptight,uptown,upturned,upward,uranium,urbanity,urbanize,urchins,urgency,urgently,urinary,usable,usages,userland,username,ushered,usually,utensils,uterine,utility,utilize,utmost,uttered,utterly,vacancy,vacated,vaccines,vacuums,vagabonds,vaginas,valance,valence,valences,validly,vanilla,vanishes,vantage,vaporized,varicose,variety,various,varnish,varsity,vaulted,vaulted,veering,vehicle,velcro,velvets,vendors,veneers,vengeful,venting,verbose,verdict,vermin,versions,vertexed,vertigos,vessels,vestments,veteran,veteran,vexatious,vexedly,viaduct,vibrant,vibrate,vicinity,victims,victors,victory,viewers,viewing,vigilante,vigorous,vikings,village,villain,vintage,violate,violent,violets,violins,viperous,virgins,virtual,virtuous,viscount,visible,visibly,visions,visited,visitor,vistaed,visuals,vitally,vitamin,vitamins,vividly,vivified,vixens,vocalist,voicing,volcanic,volcano,volleys,voltages,voltaic,volumes,voluted,voluntarily,volunteered,volvoxes,vomited,vomiting,vortexed,vortical,vouching,voucher,vouchers,vowed,voyaged,voyages,voyeurs,wackier,wadding,waddled,wadded,wafers,waffled,waffles,waggles,waggish,wagging,waifish,waifs,wailed,wailing,waistband,waistcoat,wakened,walkers,walking,walkout,walkway,wallaby,wallabies,wallets,walling,walloped,walloping,wallops,wallow,walnuts,waltzes,waltzed,wampum,wanderer,wanders,wangled,wangles,wanning,wanted,wanting,wardens,warfare,warhead,warily,warlord,warmers,warmest,warning,warpath,warrant,warrior,warship,wartime,washers,washing,wasp,wassail,wasted,wasting,watched,watcher,watches,watered,waterier,wateriness,watery,wattage,watts,wattles,wavelet,wavering,wavers,waviness,wavy,waxen,waxing,waxwing,wayward,weakest,weakens,weakly,weakness,wealthy,weaning,weapons,wearer,wearied,wearing,wearisome,weasels,weather,weaving,webbing,webcast,webcasts,webinar,webinars,weddings,wedging,weedy,weekday,weekdays,weekend,weeklong,weekly,weepers,weepier,weeping,weevils,weighed,weigher,weighing,weights,weighty,weirder,weirdest,weirdly,weirdness,wellness,welshed,welshing,welters,wenches,western,wetness,wetlands,wettable,whacked,whacker,whackier,whacking,whaled,whaler,whales,whaling,wharfs,whatnot,whatsit,whatsoever,wheat,wheaten,wheedle,wheedled,wheeled,wheelers,wheeler,wheelie,wheelies,wheeling,wheelman,wheels,wheezed,wheezes,whelp,whelped,whelping,whence,whenever,whereabouts,whereby,wherefore,wherein,whereupon,wherever,whetted,whetting,whiffed,whiffing,whiled,whiles,whiling,whimper,whimpers,whimsy,whined,whiner,whiners,whines,whinier,whining,whinnied,whinnies,whinny,whipped,whipper,whippet,whippets,whipping,whippy,whirled,whirligig,whirling,whirls,whisk,whiskers,whiskey,whiskeys,whisks,whisper,whispers,whispered,whisting,whistled,whistler,whistles,whitecap,whitefish,whiten,whitened,whitener,whiteness,whitens,whitest,whites,whither,whiting,whitish,whittle,whittled,whittler,whittles,whizzed,whizzes,whizzing,whoa,whoever,wholes,wholly,whoopee,whooped,whooper,whooping,whoosh,whooshed,whooshes,whoppers,whored,whores,whoring,whorl,whorled,whorls,whose,whosoever,whys,wickedly,wickedness,wicker,wickets,widened,widener,widener,widening,widens,widest,widow,widowed,widower,widowers,widowhood,widowing,widows,width,widths,wielded,wielder,wielding,wields,wifeliness,wifely,wifey,wiggle,wiggled,wiggler,wiggles,wigglier,wiggling,wigwam,wigwams,wildcard,wildcat,wildcats,wilderness,wildest,wildfire,wildlife,wildly,wildness,wildwood,wiles,wilier,wiliest,wiliness,willful,willfully,willies,willing,willingly,willingness,willow,willowy,willpower,wilted,wilting,wimp,wimped,wimpier,wimping,wimple,wimples,wimpy,winch,winched,winches,winching,winded,winder,windfall,winding,windmill,window,windowed,windowing,windowless,windows,windpipe,winds,windshield,windsock,windstorm,windsurfed,windsurfer,windsurfing,windswept,windup,windy,winery,winning,winnings,winnow,winnowed,winnowing,winos,winter,wintered,winters,wintertime,winterized,wintry,wiped,wipeout,wipeouts,wiper,wipers,wipes,wiping,wire,wired,wireless,wires,wiretap,wiretapped,wiriness,wiring,wiry,wisdom,wisdoms,wised,wisely,wisest,wishbone,wished,wisher,wishers,wishes,wishing,wisp,wisps,wispy,wistful,wistfully,wistfulness,witch,witchcraft,witchery,witches,witchier,witchiest,witching,with,withal,withdraw,withdrawing,withdrawn,withdraws,withdrew,withering,withers,withheld,withhold,withholding,withholds,within,without,withstand,withstands,withstood,witless,witness,witnessed,witnesses,witnessing,wits,witted,witter,wittiness,witting,wittingly,witty,wives,wizard,wizardry,wizards,wizened,wizes,woes,wok,woke,woken,woks,wold,wolf,wolfed,wolfhound,wolfing,wolfish,wolves,woman,womanhood,womanish,womanizer,womankind,womanliness,womanly,womb,wombat,wombats,wombs,women,womenfolk,won,wonder,wondered,wonderful,wonderfully,wondering,wonderland,wonderment,wonders,wonderwork,wondrous,wondrously,wonky,wont,woodcraft,wooded,wooden,woodenly,woodiness,woodland,woodlands,woodpecker,woods,woodshed,woodsman,woodsy,woodwind,woodwork,woodworker,woody,wooer,wooers,woof,woofer,woofers,woofs,wool,woolen,woolens,woolie,woolies,woolier,wooliest,wooly,woos,wooshed,wooziness,woozy,word,worded,wording,wordlessly,wordplay,words,wordy,wore,work,workable,workaday,workaholic,workaround,workbench,workbook,workday,worked,worker,workers,workforce,workhorse,working,workings,workload,workman,workmanlike,workmanship,workmen,workout,workouts,workplace,works,workshop,workshops,workstation,world,worlded,worldliness,worldly,worldwide,worm,wormed,wormhole,wormier,worming,worms,wormwood,wormy,worn,wornout,worried,worriedly,worrier,worriers,worries,worrisome,worry,worrying,worsen,worsened,worsening,worsens,worse,worship,worshiped,worshiper,worshiping,worshipped,worshipper,worshipping,worships,worst,worsted,worth,worthier,worthiest,worthily,worthiness,worthless,worthlessly,worthlessness,worthwhile,worthy,would,wouldest,wouldst,wound,wounded,wounding,wounds,wove,woven,wow,wowed,wowing,wows,wrack,wracked,wracking,wracks,wraith,wraiths,wrangle,wrangled,wrangler,wranglers,wrangles,wrangling,wrap,wrapped,wrapper,wrappers,wrapping,wraps,wrath,wrathful,wreak,wreaked,wreaking,wreaks,wreath,wreathe,wreathed,wreathes,wreathing,wreaths,wreck,wreckage,wrecked,wrecker,wreckers,wrecking,wrecks,wren,wrench,wrenched,wrenches,wrenching,wrens,wrest,wrested,wrester,wresting,wrestle,wrestled,wrestler,wrestlers,wrestles,wrestling,wrestlings,wrests,wretch,wretched,wretchedly,wretchedness,wretches,wrier,wriest,wriggle,wriggled,wriggler,wrigglers,wriggles,wrigglier,wriggliest,wriggling,wriggly,wring,wringer,wringers,wringing,wrings,wrinkle,wrinkled,wrinkles,wrinklier,wrinkliest,wrinkling,wrinkly,wrist,wristband,wristbands,wrists,wristwatch,wristwatches,writ,writable,write,writer,writers,writes,writhe,writhed,writhes,writhing,writing,writings,writs,written,wrong,wronged,wronger,wrongful,wrongfully,wronging,wrongly,wrongs,wrote,wroth,wrought,wrung,wry,wryly,wryness";
// ═══ SUPER SLAP WORDS ═══ 8-letter words enabled by animal tile sets
const SUPERSLAP="training,starling,teaching,cheating,readings,ingrates,rangiest,angriest,granites,horniest,keyboard,crownies,holidays,tropical,painters,repaints,pertains,draining,regained,breathing,shortens,shortage,horseman,standing,watering,drawings,trailers,retainer,straddle,ranting,learning,draining,railroads,ordering,reasoning,treading,restrain,stranger,strangle,marching,searches,matches,stranded,retrying,burnings,flamings,hearings,wearings,learners,yearners,preheats,raveling,retained,detainer,teardrop,teardrops";
// Extra common short words that were missing
const EXTRA4="cart,mint,tint,pint,lint,hint,flint,print,grunt,blunt,stint,carts,mints,tints,pints,lints,prints,stints,ache,cake,bake,fake,fate,gate,late,hate,date,mate,rate,sake,tape,wave,cave,dive,five,give,hive,live,dive,love,move,nope,rope,cope,dope,hope,mope,pope,rope,tope,wipe,ripe,pipe,type,corn,darn,born,worn,morn,torn,yarn,fern,bawl,call,fall,hall,ball,gall,mall,pall,tall,wall,bell,cell,dell,fell,hell,sell,tell,well,bill,dill,fill,gill,hill,kill,mill,pill,rill,sill,till,will,doll,poll,roll,toll,bull,dull,full,gull,hull,lull,mull,null,pull,bowl,fowl,howl,jowl,cowl,owl,acme,acorn,acre,afar,aftmost,agog,aide,aisle,ajar,ally,aloe,amid,ample,anew,angst,antsy,apex,aria,arid,army,aura,avid,awed,awry,axed,axel,axis,babe,badge,baggy,baler,balk,bard,bark,barn,bash,bask,bass,beak,beam,bead,beat,beau,beck,beep,beet,bevy,bias,bide,bile,birch,bilk,bind,bipod,bite,blab,blah,bleak,blimp,blip,blob,boar,bog,boon,boor,boot,bowl,brag,bray,briar,brim,brio,broth,buck,buff,bulb,burr,bust,byte,cane,cant,carp,cask,cede,chafe,chap,char,chary,chic,chide,chime,chin,chirp,chit,chop,chub,cider,cinch,cite,civet,clad,clamp,clang,clasp,cleat,cleft,clime,cling,clink,clip,clique,cloak,clod,clog,clomp,cloth,clout,clove,club,clue,cold,colt,coma,comb,comp,coo,coop,cord,corp,cost,coup,cove,cowl,cozy,crack,craft,cramp,crate,crib,crick,crisp,croak,crock,crony,crumb,crush,cub,cuff,cull,cult,cup,curd,dale,dame,damp,dandy,deed,deft,deke,dell,delve,dent,dine,dingy,dingo,ditch,dive,dock,doff,dogma,dole,dome,doom,dope,dote,doth,doze,draft,drat,dual,dual,duct,dude,duel,duet,duff,duke,dumb,dumbo,dump,dune,dung,dup,duplex,dust,dwarf,dye,eagle,ear,earn,easel,ebony,eddy,edict,edify,edit,egg,egg,eject,elate,elect,elide,elite,elope,embed,ember,emit,empty,enact,enemy,enjoy,ennui,epic,ergo,ethic,evade,even,event,every,evict,exalt,exempt,exert,exile,exist,expel,extra,fade,fag,faint,faker,fancy,fang,fare,faucet,fawn,feat,feast,feed,feint,fence,ferry,feud,fewer,fib,fiber,fief,fig,fill,flail,flair,flake,flap,flare,flash,flaw,flax,fled,fleet,flex,flexibility,flinch,fling,flint,flip,flit,float,flock,flog,flop,floss,flour,flue,fluff,flush,flux,foal,foci,foe,fog,foggy,foist,fold,food,fool,foot,forge,forgot,fork,form,fort,forth,foul,foxy,fray,fresh,fret,frieze,frisk,frog,froth,fuji,full,fume,fuss,gable,gaffe,gaff,gaggle,gainsay,gala,gall,gamble,game,gamey,gander,gape,garb,garage,gash,gasp,gate,gaudy,gaunt,gauze,gazebo,gaze,gazebo,gear,gecko,gel,gelid,gene,gent,gentle,genus,ghoul,gigs,gild,gin,gird,girdle,gist,glade,glaze,glean,glib,glide,gloat,glob,globe,gloom,glum,glut,gnash,gnaw,gnu,goad,goal,goat,gobble,god,goes,goggles,going,gone,gong,good,goof,goose,gore,gosh,gouge,gown,graft,grail,grasp,grate,graze,grimy,grin,gripe,grist,gritty,groan,grocer,groin,groom,grope,gross,group,grout,gruel,gruff,grump,grunt,guano,guide,guilt,gulch,gullet,gulp,gun,gust,gutter,guzzle,gym,gypsy,habit,hack,hag,hale,half,halt,hamper,handy,harem,harm,harp,hart,hash,hasp,hatch,haul,haven,havoc,hay,hazel,hazy,heady,heal,heap,heart,hectic,hedge,heed,heft,heifer,helm,hem,herald,herd,herbs,hew,hex,hide,hinge,hire,hiss,hive,hoard,hoarse,hoary,hob,hock,hoe,hog,hoist,hold,hole,hollow,holly,holster,home,homily,hone,honk,honor,hood,hoof,hook,hoop,hoot,hope,horde,horn,horror,hors,host,hotel,hound,hour,house,hover,howl,hub,huck,huddle,hull,humdrum,hump,humus,hunch,hunger,hunk,hunt,hurdle,hurl,hurrah,hurry,husk,hustle,hutch,hybrid,hydra,hymn,hyper,ice,icon,icy,idea,idiom,idle,idol,igloo,ilk,ill,illegal,imam,imbibe,imp,impel,inapt,inch,incur,ingot,inept,infer,input,inset,intend,irate,iris,irk,iron,isle,item,itemize,ivory,ivy,jab,jack,jail,jam,jape,jar,jay,jazz,jean,jeer,jelly,jerky,jest,jib,jig,jinx,jitney,jive,jog,john,join,joker,jolt,jot,joust,jovial,joy,judge,juice,julep,jumbo,jump,junk,junta,junto,juror,juxtapose,kale,kapok,karat,karate,kayak,keel,keen,keep,keg,kennel,ken,kenning,kernel,kettle,key,khaki,kick,kid,kill,kiln,kilt,kind,kindle,king,kink,kiss,kit,kite,knave,knee,kneel,knell,knew,knife,knit,knob,knock,knoll,knot,know,knur,koala,kooks,kudos,laced,ladle,lady,lag,lair,lake,lama,lamb,lame,lamp,lance,land,lane,lanky,lapel,larder,large,lariat,larva,lash,lass,lasso,late,lath,laud,lava,lawn,lax,layaway,lazy,leach,lead,leaf,leak,lean,leap,lease,leash,least,leave,ledge,leer,lees,left,leg,legal,lemur,lend,lent,less,lesson,letter,levee,lever,levy,liar,lice,lichen,licit,lick,lied,lief,lien,lieu,life,lift,light,likable,like,lilt,lily,limb,lime,limp,limpet,line,linen,linger,lingo,link,lint,lion,lip,liquid,liquor,lira,lisle,lisp,list,liter,lithe,litmus,live,lizard,llama,load,loaf,loam,loan,lob,lobe,lobby,local,lock,loco,lodge,loft,loftiness,log,loge,loin,loiter,lone,loner,long,look,loom,loon,loop,loose,loot,lop,loper,lope,loss,lost,lot,lotus,loud,lounge,louse,lout,love,low,loyal,lubricant,lube,luce,lucid,luck,ludo,luff,luge,lug,lull,lumber,lump,lunacy,lunar,lunch,lune,lung,lunge,lupine,lurch,lure,lurk,lush,lust,lute,lynx,lyric,mace,macho,mad,madam,made,madness,magic,magma,maid,mail,main,make,malice,mall,malt,mama,man,manage,mane,manga,manger,mania,manic,manifest,manly,manor,mantle,maple,mar,marsh,mart,marvel,mash,mask,masquerade,mast,matron,matter,mauve,maxim,maximal,maze,mead,meal,mean,measure,meat,meddle,medic,meek,meet,mellow,melt,member,memo,menace,mend,menial,mentor,mercy,merge,merit,merry,mesh,mess,metric,mettle,mew,mice,midget,midst,might,mikado,mild,mildew,mile,milk,mill,mime,mimic,mince,mind,mine,mingle,minion,mink,minor,minstrel,mint,minus,mire,mirth,miser,miss,mist,mite,mitt,mix,mob,mobile,mock,mode,model,modern,modish,mogul,mohair,moist,mole,momma,money,mongrel,monk,monkey,monumental,moo,mood,moody,moon,moor,moose,moot,mope,moral,more,morgue,morn,moron,morrow,morsel,mortar,mosque,moss,moth,motor,mottled,motto,mould,mound,mount,mourn,mouse,mouth,move,movie,mow,mown,much,muck,mud,muddle,muff,mug,muggy,mulch,mule,mull,multi,mum,munch,mural,muscle,muse,mushy,muskox,muslin,muss,must,musty,mute,mutiny,mutt,mutter,mutual,muzzy,myna,myopic,myriad,myrrh,myself,mystery,myth,nabob,nadir,nag,nah,naiad,nail,naive,naked,name,nap,napalm,nape,narc,narrate,nasal,nasty,natal,native,natty,nausea,naval,nave,navvy,navy,nay,near,neat,nebula,neck,nectar,need,needless,needy,negate,neglect,neigh,neither,nephew,nerd,nerve,nest,net,nether,nettle,never,newborn,news,newton,next,nib,nibble,nice,niece,nifty,niggle,night,nil,nimble,nimbus,nine,niner,ninny,nip,nit,nix,nobble,noble,nocturn,nod,nodal,node,noise,noisome,nomad,nominal,none,nonfat,nonstop,noodle,nook,noon,noose,no,norm,north,nose,nosy,notable,notably,note,noted,nothing,notify,notion,nougat,noun,nourish,novella,novice,now,nowhere,nub,nubby,nudge,nudism,nudity,nugget,nuke,null,nullify,numb,number,numeral,numinous,nunnery,nuptial,nurse,nursery,nursing,nut,nutria,nutty,nylon,nymph,oak,oar,oasis,oat,oath,obelisk,obese,obey,object,oblige,oblique,oblivion,oblong,obnoxious,oboe,obscene,obscure,observe,obsess,obsolete,obstacle,obstinate,obstruct,obtain,obvious,occasion,occult,occupy,occur,ocean,octave,octopus,ocular,odd,odds,odium,odor,off,offal,offend,offer,office,often,ogle,ogre,oh,ohm,oily,oink,okay,okra,old,olden,olive,omega,omelet,omen,ominous,omit,omnibus,once,one,onerous,ongoing,onion,onset,onus,onward,oops,ooze,opal,opaque,open,opera,operate,opine,opinion,opium,opossum,opponent,oppose,optical,optimism,option,opus,or,oral,orange,orate,orator,orb,orbit,orchard,orchid,ordain,ordeal,order,ordinal,ore,organ,orgasm,orgy,orient,origami,origin,oriole,orison,ornate,orphan,orthodox,oscar,osmosis,osprey,otter,ought,ounce,our,oust,out,outer,outgrow,outlook,outpost,output,outside,outward,oval,ovary,oven,over,overt,owe,owing,owl,own,ownership,oxen,oxide,oxygen,oyster,ozone,pace,pacific,pack,pad,padlock,pagan,page,pageant,pagoda,paid,pail,pain,paint,pair,pale,palette,pall,palladium,pallid,pallor,palm,palmer,palpable,palsy,paltry,pampa,pamphlet,pan,panacea,panda,pane,panel,pang,panic,panoply,panorama,pant,pantomime,papa,papacy,paper,papoose,parable,parade,paradigm,paradise,paragraph,parakeet,parallel,paramount,paranoid,parapet,parasite,parcel,parch,pardon,parental,parish,park,parka,parlance,parley,parrot,parry,part,partial,particle,parting,partition,partly,partner,party,pasha,pass,passage,passion,past,pasture,pat,patch,path,pathology,pathway,patience,patient,patio,patriot,patron,patter,pattern,patty,paucity,paunch,pauper,pause,pave,paw,pawn,pay,payday,payee,payload,payment,payoff,payroll,pea,peace,peach,peak,pear,pearl,peas,peasant,peat,pebble,pecan,peck,pedal,peddle,pedigree,peek,peel,peep,peer,peeve,peevish,pelican,pellet,pelt,pelvis,pen,penal,pencil,pending,pennant,penny,pent,peon,peony,people,pepper,per,percale,percent,percept,perch,perdition,perennial,perfect,perfidy,perforate,perform,perfume,peril,period,periphery,peripheral,perish,perjury,perk,perm,permit,perseverance,persist,person,persona,personal,personnel,persuade,pert,pertain,peru,pervade,perverse,pesky,peso,pest,pester,pet,petal,petit,petition,petrify,petrol,petty,pew,pewter,phantom,pharmacy,phase,pheasant,phenom,philosopher,phlox,phobia,phone,phonic,phosphate,photo,phrase,phylum,physic,piano,piccolo,pick,picket,pickle,picky,picnic,piddle,piece,pier,pierce,piety,pig,pigeon,piggy,pigskin,pike,pile,pilfer,pilgrim,pill,pillar,pillow,pilot,pimp,pin,pinch,pine,pineal,ping,pink,pinkish,pinky,pint,pion,pioneer,pious,pip,pipe,pique,piranha,pirate,pistol,piston,pit,pitch,pitchy,pith,pithy,pity,pivot,pixel,pixie,pizzazz,place,placebo,placid,plague,plaid,plain,plan,planet,plank,plant,plaque,plasma,plaster,plastic,plate,plateau,platen,platform,platinum,platoon,platter,platypus,plausible,play,plaza,plea,plead,please,pleat,pledge,plenary,plentiful,plenty,plight,plod,plot,plow,ploy,pluck,plug,plum,plumage,plumb,plume,plump,plunder,plunge,plural,plus,plush,plutonium,ply,pneumatic,pod,podium,poem,poet,point,poise,poison,poke,poker,polar,pole,police,policy,polish,polite,polka,poll,polo,pomp,poncho,pond,ponder,pony,pool,poop,poor,pop,pope,poppy,popular,porcupine,pore,pork,porpoise,porridge,port,portable,portend,portent,porter,portico,portly,portrait,pose,posh,posit,position,positive,posse,possess,possible,post,postage,poster,posture,posy,pot,potato,potent,potential,pothole,potion,potpourri,pouch,pound,pour,pout,poverty,powder,power,powerful,powwow,practice,prairie,praise,prance,prank,prattle,pray,prayer,preach,preamble,precede,precept,precinct,precious,precise,predator,predict,preempt,preface,prefer,pregnant,premier,premise,premium,prep,prepare,preposterous,present,preserve,preside,president,press,pressure,prestige,presume,pretend,pretty,prevail,prevent,previous,prey,price,pride,priest,prim,prima,primary,prime,primer,primitive,primp,primrose,prince,princess,print,prior,priory,prison,pristine,privacy,private,privet,privy,prize,pro,probate,probe,problem,proceed,process,proclaim,procure,prod,prodigal,prodigy,produce,product,profane,profess,profession,professor,proffer,proficient,profile,profit,profound,profuse,prognosis,program,progress,prohibit,project,projection,proletariat,proliferate,prolific,prologue,prolong,promenade,prominent,promise,promote,prompt,prone,prong,pronoun,pronto,proof,prop,propaganda,propel,proper,property,prophecy,prophesy,prophet,proponent,proportion,propose,proposition,propound,proprietary,proprietor,propriety,prorate,prosaic,proscribe,prose,prosecute,prospect,prosper,prosperity,protect,protein,protest,protestant,protocol,proton,protract,proud,prove,proven,provender,provide,province,provision,provoke,prow,prowess,prowl,prowler,proximity,proxy,prude,prudent,prune,pry,psalm,pseudonym,psyche,ptomaine,pub,puberty,public,publicity,publish,puck,pucker,pudding,puddle,pudgy,puerile,puff,puffy,pug,pugilism,puke,pulley,pullet,pulmonary,pulp,pulpit,pulsate,pulse,pumice,pummel,pump,pumpkin,pun,punch,punctual,punctuate,punctuation,puncture,pundit,pungent,punish,punishment,punitive,punjabi,punk,punster,punt,puny,pup,pupil,puppet,puppy,purchase,pure,puree,purely,purge,purify,purist,puritan,purity,purl,purple,purport,purpose,purr,purse,pursue,pursuit,purvey,pus,push,pusher,pussy,pussycat,pustule,put,putrefy,putrid,putsch,putter,putty,puzzle,pygmy,pyre,pyromania,python,qua,quack,quad,quadrangle,quadrant,quadratic,quadrilateral,quadruped,quadruple,quaff,quagmire,quail,quaint,quake,qualification,qualify,quality,qualm,quandary,quantify,quantity,quantum,quarantine,quarrel,quarry,quart,quarter,quartermaster,quartet,quartz,quasar,quash,quasi,quatrain,quaver,quay,queasy,queen,queer,quell,quench,querulous,query,quest,question,questionable,questionnaire,queue,quibble,quick,quicken,quickly,quicksand,quicksilver,quickstep,quiet,quill,quilt,quince,quinine,quintessence,quintet,quip,quirk,quit,quite,quiver,quixotic,quiz,quizmaster,quota,quotation,quote,quotient";

const W=new Set((BASIC+","+COMMON4+","+COMMON5+","+MONSTER_WORDS+","+ANIMAL_WORDS+","+SEVENEIGHT+","+SUPERSLAP+","+EXTRA4).split(","));

// ══════════ Animals ══════════
// 12 animals from Quaternius Ultimate Animated Animal Pack.
// Each has an 8-tile set designed to spell its name + many words.
// Base stats are used for ROUND 1; difficulty scales exponentially.
// Each has an 8-tile set designed to spell its name + many words.
// Tile sets prioritize 2 vowels + common consonants + name letters for max word variety.
const ANIMALS=[
  // Tile sets designed so each enables at least one 8-letter word + many shorter words
  {name:"Bull",     type:"Bull",       baseHp:70, baseAtk:7, baseIv:5500, tiles:["T","R","A","I","N","I","N","G"], acc:"#8b4513", color:"#d2691e"}, // training
  {name:"Stag",     type:"Stag",       baseHp:70, baseAtk:7, baseIv:5500, tiles:["S","T","A","R","L","I","N","G"], acc:"#8b7355", color:"#deb887"}, // starling
  {name:"Husky",    type:"Husky",      baseHp:70, baseAtk:7, baseIv:5500, tiles:["T","E","A","C","H","I","N","G"], acc:"#e0e7ff", color:"#b0c4de"}, // teaching, cheating
  {name:"Wolf",     type:"Wolf",       baseHp:70, baseAtk:7, baseIv:5500, tiles:["R","E","A","D","I","N","G","S"], acc:"#9ca3af", color:"#6b7280"}, // readings
  {name:"Deer",     type:"Deer",       baseHp:70, baseAtk:7, baseIv:5500, tiles:["S","T","R","A","N","G","E","I"], acc:"#a67c52", color:"#d2b48c"}, // ingrates, rangiest, angriest, granites
  {name:"Horse",    type:"Horse",      baseHp:70, baseAtk:7, baseIv:5500, tiles:["H","O","R","N","I","E","S","T"], acc:"#a0522d", color:"#cd853f"}, // horniest, stoniness (partial)
  {name:"Shiba",    type:"Shibalnu",   baseHp:70, baseAtk:7, baseIv:5500, tiles:["S","H","O","R","T","A","G","E"], acc:"#f4a460", color:"#ffa500"}, // shortage
  {name:"Donkey",   type:"Donkey",     baseHp:70, baseAtk:7, baseIv:5500, tiles:["K","E","Y","B","O","A","R","D"], acc:"#808080", color:"#a9a9a9"}, // keyboard
  {name:"Cow",      type:"Cow",        baseHp:70, baseAtk:7, baseIv:5500, tiles:["C","R","O","W","N","I","E","S"], acc:"#f5f5dc", color:"#ffffff"}, // crownies
  {name:"Ghost Horse",type:"Horse_White",baseHp:70,baseAtk:7,baseIv:5500, tiles:["H","O","L","I","D","A","Y","S"], acc:"#f5f5ff", color:"#f0f8ff"}, // holidays
  {name:"Fox",      type:"Fox",        baseHp:70, baseAtk:7, baseIv:5500, tiles:["T","R","O","P","I","C","A","L"], acc:"#ff8c00", color:"#ff7f50"}, // tropical
  {name:"Alpaca",   type:"Alpaca",     baseHp:70, baseAtk:7, baseIv:5500, tiles:["P","A","I","N","T","E","R","S"], acc:"#f0e68c", color:"#fff8dc"}  // painters, repaints, pertains
];

// Scene rotates through 3 backgrounds
const SCENES=["forest","ruins","volcano"];

// Per-animal GLTF tuning
const MODEL_CONFIG={
  Bull:        {scale:0.6, yOffset:-0.2, rotation:0},
  Stag:        {scale:0.6, yOffset:-0.2, rotation:0},
  Husky:       {scale:0.7, yOffset:-0.15, rotation:0},
  Wolf:        {scale:0.7, yOffset:-0.15, rotation:0},
  Deer:        {scale:0.6, yOffset:-0.2, rotation:0},
  Horse:       {scale:0.55, yOffset:-0.25, rotation:0},
  Shibalnu:    {scale:0.75, yOffset:-0.1, rotation:0},
  Donkey:      {scale:0.6, yOffset:-0.2, rotation:0},
  Cow:         {scale:0.6, yOffset:-0.2, rotation:0},
  Horse_White: {scale:0.55, yOffset:-0.25, rotation:0},
  Fox:         {scale:0.75, yOffset:-0.1, rotation:0},
  Alpaca:      {scale:0.6, yOffset:-0.2, rotation:0}
};

// ══════════ Difficulty Scaling ══════════
// Rounds 1-3: very easy (30-50% base stats, slow attacks)
// Rounds 3-6: linear ramp to normal difficulty (old R3 level = new R6)
// Rounds 6+: gentle exponential growth
function scaledStats(animal,round){
  let hpMult, atkMult, ivMult;
  if(round<=6){
    // Very gentle ramp: R1=30%, R2=40%, R3=55%, R4=70%, R5=85%, R6=100%
    const steps=[0.30, 0.40, 0.55, 0.70, 0.85, 1.00];
    const atkSteps=[0.35, 0.45, 0.60, 0.75, 0.88, 1.00];
    const ivSteps=[1.5, 1.35, 1.20, 1.10, 1.05, 1.00];
    hpMult = steps[round-1];
    atkMult = atkSteps[round-1];
    ivMult = ivSteps[round-1];
  } else {
    // After round 6, slow exponential scaling
    const r=round-6;
    hpMult = Math.pow(1.15,r);
    atkMult = Math.pow(1.08,r);
    ivMult = Math.max(0.5, Math.pow(0.96,r));
  }
  return {
    hp:Math.round(animal.baseHp*hpMult),
    atk:Math.max(3,Math.round(animal.baseAtk*atkMult)),
    iv:Math.max(2000,Math.round(animal.baseIv*ivMult))
  };
}

// Tempo (BPM) scales with round — music gets faster and more frantic
function scaledTempoMs(round){
  const r=round-1;
  // Slower progression: 250ms/step in round 1 → 130ms/step by round 12
  return Math.max(120,Math.round(250-r*11));
}

// ══════════ Helpers ══════════
function dmg(l){return[0,0,0,10,26,55,90,140,999][Math.min(l,8)]||999}
function tier(l){if(l<=3)return{t:"Tap",c:"tier0"};if(l==4)return{t:"SMACK",c:"tier1"};if(l==5)return{t:"WHACK!",c:"tier2"};if(l==6)return{t:"MEGA SLAP!",c:"tier3"};if(l==7)return{t:"LEGENDARY!",c:"tier4"};return{t:"⭐ SUPER SLAP! ⭐",c:"tier5"}}
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
  camera.position.set(0,1.5,7);  // Moved back from 5.5 to 7, lowered from 1.7 to 1.5
  camera.lookAt(0,0.8,0);  // Look slightly lower
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
  // SKY LAUNCH: animal rockets up and shrinks into a twinkle
  if(mesh&&animState.mode==='skyLaunch'){
    animState.progress+=dt;
    const p=Math.min(animState.progress/1.8,1);
    // Ease out quad for launch velocity
    const eased=1-Math.pow(1-p,2);
    const config=MODEL_CONFIG[mesh.userData.type]||{scale:0.6,yOffset:-0.2};
    // Rise high and spin
    mesh.position.y=config.yOffset+eased*12;
    mesh.rotation.x+=dt*8;
    mesh.rotation.z+=dt*6;
    // Drift slightly backward
    mesh.position.z=-eased*3;
    // Shrink into a dot
    const scaleFactor=1-Math.pow(p,2)*0.95;
    mesh.scale.setScalar(config.scale*scaleFactor);
    // Fade out near end
    if(p>0.7){
      const fadeP=(p-0.7)/0.3;
      mesh.traverse(c=>{
        if(c.material){
          c.material.transparent=true;
          c.material.opacity=1-fadeP;
        }
      });
    }
    if(p>=1){
      // Spawn final twinkle at the vanishing point
      spawnTwinkle(mesh.position.clone());
    }
  }
  // Slap hand update
  updateSlapHand(dt);
  // Shake
  if(shakeAmount>0){
    camera.position.x=(Math.random()-.5)*shakeAmount;
    camera.position.y=1.5+(Math.random()-.5)*shakeAmount*.5;
    shakeAmount*=0.85;
    if(shakeAmount<0.01){shakeAmount=0;camera.position.x=0;camera.position.y=1.5}
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

// Twinkle effect when animal disappears into sky
function spawnTwinkle(pos){
  // Central bright flash
  const flash=new THREE.Mesh(
    new THREE.SphereGeometry(0.3,12,12),
    new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:1})
  );
  flash.position.copy(pos);scene.add(flash);
  particles.push({mesh:flash,vel:new THREE.Vector3(0,0,0),life:0.6,maxLife:0.6});
  // Star rays
  for(let i=0;i<8;i++){
    const ray=new THREE.Mesh(
      new THREE.BoxGeometry(0.05,0.8,0.05),
      new THREE.MeshBasicMaterial({color:0xffff00,transparent:true,opacity:1})
    );
    ray.position.copy(pos);
    ray.rotation.z=(i/8)*Math.PI*2;
    scene.add(ray);
    particles.push({mesh:ray,vel:new THREE.Vector3(0,0,0),life:0.5,maxLife:0.5});
  }
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
  sfxTrumpet(); // Use the new proper trumpet fanfare
}
function playDefeatSound(){
  stopMusic();
  // Sad trombone descent
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

// MEATIER slap: fleshy thud + sharp crack + body impact + whip sting
function sfxSlap(big){
  if(muted||!A)return;
  // Phase 1: Impact thud (body hit)
  tone(60,.18,'sine',.25);
  tone(90,.15,'sine',.2,.01);
  // Phase 2: Flesh smack (wet slap)
  noise(.12,.28,400,.01);   // low-mid thud
  noise(.08,.22,1800,.02);  // mid smack
  // Phase 3: Sharp crack
  tone(2200,.05,'square',.14,.03);
  tone(3500,.04,'triangle',.1,.04);
  // Phase 4: Aftermath ring
  tone(400,.2,'triangle',.08,.06);
  if(big){
    // Bigger slaps get extra OOMPH
    tone(45,.35,'sine',.3,.02);  // sub-bass rumble
    noise(.4,.2,1500,.04);
    tone(4000,.08,'square',.12,.08);
    tone(5000,.05,'square',.08,.12);
  }
}

// Animal attacks player
function sfxBonk(){
  tone(200,.1,'square',.12);
  tone(150,.15,'sine',.09,.02);
  noise(.08,.1,1500,.01);
}

// KO! Animal defeated - cartoon knockout sound
function sfxKO(){
  if(muted||!A)return;
  // Boing + thud combo
  tone(400,.08,'square',.12);
  tone(300,.1,'square',.1,.06);
  tone(200,.15,'triangle',.1,.14);
  // Whistle descent (pitch drop)
  const t0=A.currentTime;
  const o=A.createOscillator(),g=A.createGain();
  o.type='sine';
  o.frequency.setValueAtTime(1200,t0);
  o.frequency.exponentialRampToValueAtTime(180,t0+0.5);
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(.1,t0+.02);
  g.gain.exponentialRampToValueAtTime(.0001,t0+.5);
  o.connect(g).connect(A.destination);
  o.start(t0);o.stop(t0+.55);
  // Final thud
  tone(80,.3,'sine',.18,.5);
  noise(.2,.15,500,.5);
}

// Trumpet fanfare - victory!
function sfxTrumpet(){
  if(muted||!A)return;
  // Classic trumpet fanfare: da-da-da-DAAA
  // Using square waves for that brassy buzz
  const fanfare=[
    {f:523,d:.12,t:.00},  // C
    {f:523,d:.12,t:.14},  // C
    {f:523,d:.12,t:.28},  // C
    {f:659,d:.45,t:.44},  // E (held)
  ];
  fanfare.forEach(n=>{
    // Main trumpet tone (square = brassy)
    tone(n.f,n.d,'square',.12,n.t);
    // Harmonic
    tone(n.f*2,n.d,'square',.05,n.t);
    // Subtle underlying sawtooth for richness
    tone(n.f*0.5,n.d,'sawtooth',.04,n.t);
  });
  // Triumphant ascending run after the hold
  [659,784,988,1319].forEach((f,i)=>{
    tone(f,.15,'square',.09,.92+i*.09);
    tone(f*2,.15,'square',.04,.92+i*.09);
  });
  // Final chord
  [1047,1319,1568].forEach(f=>tone(f,.6,'square',.08,1.32));
}

// SUPER SLAP - massive cartoon impact
function sfxSuperSlap(){
  if(muted||!A)return;
  // Massive bass hit
  tone(40,.5,'sine',.35);
  tone(60,.4,'sine',.3,.02);
  // Huge body slam
  noise(.6,.35,800,.02);
  noise(.4,.25,2500,.05);
  // Cracks and sizzles
  tone(3000,.08,'square',.15,.05);
  tone(4500,.06,'triangle',.1,.08);
  tone(6000,.05,'square',.08,.12);
  // Ascending launch whistle (takes off)
  const t0=A.currentTime+.2;
  const o=A.createOscillator(),g=A.createGain();
  o.type='sine';
  o.frequency.setValueAtTime(200,t0);
  o.frequency.exponentialRampToValueAtTime(3500,t0+0.8);
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(.15,t0+.1);
  g.gain.exponentialRampToValueAtTime(.0001,t0+.8);
  o.connect(g).connect(A.destination);
  o.start(t0);o.stop(t0+.85);
  // Sparkle twinkle at end
  [1568,1976,2349,2637].forEach((f,i)=>{
    tone(f,.15,'triangle',.1,1.0+i*.08);
    tone(f*2,.1,'sine',.05,1.0+i*.08);
  });
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

  // ═══ SUPER SLAP: 8-letter words = instant KO ═══
  if(word.length>=8){
    S.used.add(word);S.sel=[];
    S.totalSlaps++;
    S.dying=true;
    const earned=Math.round((S.animal.baseHp+S.round*20)*2); // 2x points bonus
    S.totalScore+=earned;
    S.mhp=0;
    addLog(`⭐ SUPER SLAP! "${word.toUpperCase()}" — INSTANT KO!`);
    triggerSuperSlap(word,earned);
    renderBattle();
    return;
  }

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
      sfxKO(); // KO sound when animal is knocked out
      setTimeout(()=>{stopTimers();goRoundOver(earned)},1400);
    },600);
  }
  renderBattle();
}

// ═══ SUPER SLAP: launch animal into sky with twinkle ═══
function triggerSuperSlap(word,earned){
  // Big flash
  flash('gold');
  sfxSuperSlap();
  // Huge slap hand (extra big, scale 2x)
  spawnSlapHand(true);
  if(handMesh)handMesh.userData.scale=2.2;
  // Freeze time feeling - screen flash white then gold
  setTimeout(()=>{
    const fx=document.getElementById('fxlayer');
    if(fx){
      // Giant "SUPER SLAP!" text
      const el=document.createElement('div');
      el.className='super-slap-text';
      el.textContent='SUPER SLAP!!';
      fx.appendChild(el);
      setTimeout(()=>el.remove(),2200);
    }
  },100);
  // Huge particle explosion
  setTimeout(()=>{
    spawnSuperSlapParticles();
    // Trigger the sky launch on the animal
    S.superSlapActive=true;
    animState.mode='skyLaunch';
    animState.progress=0;
  },350);
  // Multiple screen shakes
  shakeAmount=0.6;
  setTimeout(()=>{shakeAmount=0.5},200);
  setTimeout(()=>{shakeAmount=0.3},400);
  // Trumpet fanfare + round over after launch
  setTimeout(()=>{
    stopTimers();
    goRoundOver(earned);
  },2200);
}

// Big rainbow particle burst for super slaps
function spawnSuperSlapParticles(){
  const targetMesh=animalGroup.userData.mesh;
  const tp=targetMesh?targetMesh.position.clone().add(new THREE.Vector3(0,1,0)):new THREE.Vector3(0,1,0);
  const colors=[0xff0000,0xff8800,0xffff00,0x00ff00,0x00ffff,0xff00ff,0xffffff];
  // Ring of particles
  for(let i=0;i<80;i++){
    const geo=new THREE.SphereGeometry(0.08+Math.random()*0.08,8,8);
    const mat=new THREE.MeshBasicMaterial({color:colors[i%colors.length],transparent:true,opacity:1});
    const p=new THREE.Mesh(geo,mat);p.position.copy(tp);scene.add(p);
    const angle=Math.random()*Math.PI*2;
    const elev=Math.random()*Math.PI*0.5;
    const speed=3+Math.random()*4;
    particles.push({
      mesh:p,
      vel:new THREE.Vector3(Math.cos(angle)*Math.cos(elev)*speed,Math.sin(elev)*speed+1,Math.sin(angle)*Math.cos(elev)*speed),
      life:1.5+Math.random()*0.8,
      maxLife:2.3
    });
  }
  // Twinkle stars
  for(let i=0;i<30;i++){
    const geo=new THREE.SphereGeometry(0.06,6,6);
    const mat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:1});
    const p=new THREE.Mesh(geo,mat);
    p.position.set(tp.x+(Math.random()-.5)*4,tp.y+Math.random()*3,tp.z+(Math.random()-.5)*2);
    scene.add(p);
    particles.push({
      mesh:p,
      vel:new THREE.Vector3((Math.random()-.5)*0.5,1+Math.random()*1.5,(Math.random()-.5)*0.5),
      life:1.8+Math.random()*0.5,
      maxLife:2.3
    });
  }
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
    <div style="color:#3a3560;font-size:10px;text-align:center;margin-bottom:6px;font-family:Cinzel,serif;letter-spacing:.4px">8-letter words = ⭐ SUPER SLAP INSTANT KO${comboTag}</div>
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
