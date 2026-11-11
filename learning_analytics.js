/* Cálculos docentes en el navegador. Los eventos no son una nota ni demuestran aprendizaje. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.MoodleTracking = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  const pad = n => String(n).padStart(2, '0');
  const dayKey = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const readDay = text => new Date(String(text) + 'T00:00:00');
  const dayNum = d => Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()) / 86400000;
  const addDays = (d,n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
  const weekStart = d => { const x = new Date(d.getFullYear(),d.getMonth(),d.getDate()); x.setDate(x.getDate()-(x.getDay()+6)%7); return dayKey(x); };
  const dateOf = r => { if(!r || !r.PARSED_TIME)return null;const d=r.PARSED_TIME instanceof Date?r.PARSED_TIME:new Date(r.PARSED_TIME);return Number.isFinite(d.getTime())?d:null; };
  const nameOf = r => String((r && r.FULL_NAME)||'Usuario desconocido').trim()||'Usuario desconocido';
  const val = (r,k,fallback) => String((r && r[k])||fallback);
  function matchesNonDate(row,selection) {
    const s=selection||{}, d=dateOf(row); if(!d)return false;
    if(s.user && s.user!=='ALL_USERS' && nameOf(row)!==s.user)return false;
    if(s.event && s.event!=='ALL_EVENTS' && val(row,'EVENT_NAME','Evento Desconocido')!==s.event)return false;
    if(s.component && s.component!=='ALL_COMPONENTS' && val(row,'COMPONENT','Componente Desconocido')!==s.component)return false;
    if(s.context && s.context!=='ALL_CONTEXTS' && val(row,'EVENT_CONTEXT','Contexto Desconocido')!==s.context)return false;
    if(s.ips && s.ips.length && !s.ips.includes(val(row,'IP_ADDRESS','IP Desconocida')))return false;
    const begin=String(s.startTime||'00:00').split(':').map(Number);
    const finish=String(s.endTime||'23:59').split(':').map(Number);
    const low=begin[0]*60+begin[1],high=finish[0]*60+finish[1],actual=d.getHours()*60+d.getMinutes();
    return low<=high?actual>=low&&actual<=high:actual>=low||actual<=high;
  }
  function classify(row,view,participation){
    const name=val(row,'EVENT_NAME','').toLowerCase();
    if(view.some(p=>p&&name.includes(String(p).toLowerCase())))return 'view';
    if(participation.some(p=>p&&name.includes(String(p).toLowerCase())))return 'participation';
    return 'other';
  }
  function median(arr){
    if(!arr.length)return 0;
    const a=arr.slice().sort((x,y)=>x-y),half=Math.floor(a.length/2);
    return a.length%2?a[half]:(a[half-1]+a[half])/2;
  }
  function compute(currentRows,allRows,options){
    const o=options||{},first=readDay(o.start),end=readDay(o.end);
    const valid=Number.isFinite(first.getTime())&&Number.isFinite(end.getTime())&&first<=end;
    const current=(currentRows||[]).filter(r=>dateOf(r));
    const history=(allRows||[]).filter(r=>dateOf(r));
    const comparable=history.filter(r=>matchesNonDate(r,o.selection));
    const currentNames=new Set(current.map(nameOf));
    let earliest=null,latest=null;
    for(const row of history){
      const date=dateOf(row);
      if(!earliest||date<earliest)earliest=date;
      if(!latest||date>latest)latest=date;
    }
    // Las fechas de comparación son las observadas en el CSV y las elegidas
    // en el filtro. No hacen falta registros fuera de esa exportación.
    // Se usan las dos ventanas consecutivas más recientes de igual duración
    // (máximo 14 días por ventana).
    const observedStart=valid&&earliest?(dayNum(first)>dayNum(earliest)?first:readDay(dayKey(earliest))):null;
    const observedEnd=valid&&latest?(dayNum(end)<dayNum(latest)?end:readDay(dayKey(latest))):null;
    const availableDays=observedStart&&observedEnd?Math.max(0,dayNum(observedEnd)-dayNum(observedStart)+1):0;
    const windowDays=Math.min(14,Math.floor(availableDays/2));
    const coverage=windowDays>0;
    const currentEnd=coverage?observedEnd:null;
    const currentStart=coverage?addDays(currentEnd,1-windowDays):null;
    const previousEnd=coverage?addDays(currentStart,-1):null;
    const previousStart=coverage?addDays(previousEnd,1-windowDays):null;
    const within=(rows,start,end)=>start&&end?rows.filter(r=>{
      const day=dayNum(dateOf(r));return day>=dayNum(start)&&day<=dayNum(end);
    }):[];
    const prior=coverage?within(comparable,previousStart,previousEnd):[];
    const recent=coverage?within(comparable,currentStart,currentEnd):[];
    const priorNames=new Set(prior.map(nameOf)),recentNames=new Set(recent.map(nameOf));
    const percentChange=coverage&&prior.length?Math.round((recent.length-prior.length)/prior.length*1000)/10:null;
    const reason=!valid?'invalid_dates':!history.length||availableDays===0?'no_events':windowDays===0?'not_enough_days':null;
    const comparison={
      available:coverage,reason,mode:'csv_recent_windows',windowDays,
      start:previousStart?dayKey(previousStart):null,end:previousEnd?dayKey(previousEnd):null,
      previousStart:previousStart?dayKey(previousStart):null,previousEnd:previousEnd?dayKey(previousEnd):null,
      currentStart:currentStart?dayKey(currentStart):null,currentEnd:currentEnd?dayKey(currentEnd):null,
      currentEvents:recent.length,previousEvents:prior.length,percentChange,
      currentStudents:recentNames.size,previousStudents:priorNames.size
    };
    const weeks=[];
    if(valid){for(let w=readDay(weekStart(first)),last=readDay(weekStart(end));w<=last;w=addDays(w,7))weeks.push(dayKey(w));}
    const shownWeeks=weeks.slice(-12),heatmap=Array.from({length:7},()=>Array(24).fill(0));
    const view=Array.isArray(o.viewPatterns)?o.viewPatterns:[],participation=Array.isArray(o.participationPatterns)?o.participationPatterns:[];
    const composition={view:0,participation:0,other:0};
    const map=new Map(),hourly=new Map();
    for(const row of current){
      const d=dateOf(row),student=nameOf(row),wd=(d.getDay()+6)%7;
      heatmap[wd][d.getHours()]++;
      composition[classify(row,view,participation)]++;
      if(!map.has(student))map.set(student,[]);
      map.get(student).push(row);
      const key=student+'\u0000'+dayKey(d)+'\u0000'+pad(d.getHours());
      hourly.set(key,(hourly.get(key)||0)+1);
    }
    const observed=valid?(o.asOf?readDay(o.asOf):(latest||end)):null;
    const asOf=observed&&valid?readDay(new Date(Math.min(dayNum(observed),dayNum(end))*86400000).toISOString().slice(0,10)):null;
    const known=new Set(comparable.map(nameOf)),users=[],profileByUser={},durations=[];
    for(const student of known){
      const events=(map.get(student)||[]).slice().sort((a,b)=>dateOf(a)-dateOf(b));
      const perWeek=new Map(),weeklyKinds=new Map(),activeDates=new Set();
      let last=null,startSession=null,previousEvent=null,sessions=0;
      for(const row of events){
        const d=dateOf(row),w=weekStart(d);
        perWeek.set(w,(perWeek.get(w)||0)+1);
        if(!weeklyKinds.has(w))weeklyKinds.set(w,{view:0,participation:0,other:0});
        weeklyKinds.get(w)[classify(row,view,participation)]++;
        activeDates.add(dayKey(d));
        last=d;
        if(!previousEvent || (d-previousEvent)>1800000){
          if(previousEvent&&startSession)durations.push((previousEvent-startSession)/60000);
          sessions++;
          startSession=d;
        }
        previousEvent=d;
      }
      if(previousEvent&&startSession)durations.push((previousEvent-startSession)/60000);
      const weekly=shownWeeks.map(w=>perWeek.get(w)||0);
      const inactiveDays=last&&asOf?Math.max(0,dayNum(asOf)-dayNum(last)):null;
      const u={name:student,events:events.length,activeDays:activeDates.size,activeWeeks:weekly.filter(Boolean).length,weekly,lastSeen:last?dayKey(last):null,inactiveDays,sessions,needsReview:inactiveDays!==null&&inactiveDays>=7};
      users.push(u);
      profileByUser[student]={...u,weeklyComposition:shownWeeks.map(w=>weeklyKinds.get(w)||{view:0,participation:0,other:0})};
    }
    users.sort((a,b)=>{
      if(a.inactiveDays===null&&b.inactiveDays!==null)return -1;
      if(b.inactiveDays===null&&a.inactiveDays!==null)return 1;
      if(a.inactiveDays!==b.inactiveDays)return (b.inactiveDays||0)-(a.inactiveDays||0);
      return a.name.localeCompare(b.name,'es');
    });
    const grouped=new Map();
    for(const [bucket,count] of hourly){
      const student=bucket.split('\u0000')[0];
      if(!grouped.has(student))grouped.set(student,[]);
      grouped.get(student).push({bucket,count});
    }
    const anomalies=[];
    for(const [student,hours] of grouped){
      if(hours.length<3)continue;
      const baseline=median(hours.map(h=>h.count));
      for(const h of hours)if(h.count>=25&&h.count>=baseline*3){
        const parts=h.bucket.split('\u0000');
        anomalies.push({name:student,day:parts[1],hour:parts[2],events:h.count,label:'Revisar concentración de eventos'});
      }
    }
    anomalies.sort((a,b)=>b.events-a.events);
    const quality={raw:Number(o.quality&&o.quality.raw)||0,processed:Number(o.quality&&o.quality.processed)||0,missingColumns:Array.isArray(o.quality&&o.quality.missingColumns)?o.quality.missingColumns:[],unknownUsers:Number(o.quality&&o.quality.unknownUsers)||0};
    quality.discarded=Math.max(0,quality.raw-quality.processed);
    return {users,weeks:shownWeeks,profileByUser,heatmap,composition,comparison,anomalies:anomalies.slice(0,12),quality,sessions:{total:durations.length,avgMinutes:durations.length?Math.round(durations.reduce((a,b)=>a+b,0)/durations.length*10)/10:0},summary:{students:currentNames.size,trackedStudents:known.size,events:current.length,noActivity:users.filter(u=>!u.events).length,recentNoEvents:users.filter(u=>u.needsReview).length,activeDays:new Set(current.map(r=>dayKey(dateOf(r)))).size,asOf:asOf?dayKey(asOf):null,weeksShown:shownWeeks.length}};
  }
  return {compute,matchesNonDate,weekStart,classify};
});
