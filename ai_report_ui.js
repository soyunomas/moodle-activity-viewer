/* Controles del informe seudonimizado: no almacena ni envía datos personales. */
(function(root){
  'use strict';
  const $=id=>document.getElementById(id);
  let dataset=null;
  let ready=false;
  const setText=(id,text)=>{const el=$(id);if(el)el.textContent=String(text);};
  function clearPreview(reason){
    const preview=$('aiReportPreview'),copy=$('aiReportCopy');
    if(preview)preview.value='';
    if(copy)copy.disabled=true;
    setText('aiReportCharacters','');
    setText('aiReportMessage',reason||'');
  }
  function rebuildOptions(el,items,previous){
    if(!el)return;
    el.replaceChildren();
    items.forEach(item=>{
      const option=document.createElement('option');
      option.value=item.value;
      option.textContent=item.label;
      el.appendChild(option);
    });
    if(items.some(item=>item.value===previous))el.value=previous;
  }
  function toggleMode(){
    const isBatch=$('aiReportMode')?.value==='batch';
    const forSingle=$('aiReportSingleControls'),forBatch=$('aiReportBatchControls');
    if(forSingle)forSingle.hidden=isBatch;
    if(forBatch)forBatch.hidden=!isBatch;
    clearPreview('Selecciona «Generar informe» para preparar un texto actualizado.');
  }
  function renderLocalMapping(){
    const body=$('aiReportMappingTable');
    if(!body)return;
    body.replaceChildren();
    if(!dataset)return;
    const fragment=document.createDocumentFragment();
    dataset.aliasMap.forEach(row=>{
      const tr=document.createElement('tr');
      [row.id,row.name].forEach(value=>{
        const td=document.createElement('td');
        td.textContent=value;
        tr.appendChild(td);
      });
      fragment.appendChild(tr);
    });
    body.appendChild(fragment);
    setText('aiReportMappingCount',dataset.aliasMap.length+' correspondencias del CSV (solo en esta pantalla)');
  }
  function update(currentRows,allRows,tracking,options){
    if(!root.MoodleAiReport)return;
    const prevStudent=$('aiReportStudent')?.value||'';
    const prevBatch=$('aiReportBatch')?.value||'0';
    dataset=root.MoodleAiReport.makeReportData(currentRows,allRows,tracking,options);
    const choices=dataset.profiles.map(p=>({value:p.id,label:p.id}));
    rebuildOptions($('aiReportStudent'),choices,prevStudent);
    const batchCount=Math.max(1,Math.ceil(dataset.profiles.length/root.MoodleAiReport.MAX_BATCH));
    const batches=Array.from({length:batchCount},(_,i)=>{
      const from=i*root.MoodleAiReport.MAX_BATCH+1;
      const to=Math.min(dataset.profiles.length,(i+1)*root.MoodleAiReport.MAX_BATCH);
      return {value:String(i),label:'Lote '+(i+1)+' · alumnos '+from+'–'+to};
    });
    rebuildOptions($('aiReportBatch'),batches,prevBatch);
    if($('aiReportGenerate'))$('aiReportGenerate').disabled=dataset.profiles.length===0;
    if($('aiReportStudent'))$('aiReportStudent').disabled=dataset.profiles.length===0;
    if($('aiReportBatch'))$('aiReportBatch').disabled=dataset.profiles.length===0;
    if($('aiReportMappingDetails'))$('aiReportMappingDetails').open=false;
    renderLocalMapping();
    setText('aiReportAvailable',dataset.profiles.length+' alumnos disponibles según los filtros · '+dataset.aliasMap.length+' identificados en el CSV');
    clearPreview(dataset.profiles.length?'El texto se genera únicamente al pulsar «Generar informe».':'No hay alumnos que cumplan los filtros actuales.');
    toggleMode();
  }
  function generate(){
    if(!dataset||!root.MoodleAiReport)return;
    const selection={
      mode:$('aiReportMode')?.value||'single',
      studentId:$('aiReportStudent')?.value||'',
      batchIndex:Number($('aiReportBatch')?.value||0),
      focus:$('aiReportFocus')?.value||'general'
    };
    const report=root.MoodleAiReport.makePrompt(dataset,selection);
    const preview=$('aiReportPreview');
    if(!preview)return;
    preview.value=report.text;
    $('aiReportCopy').disabled=!report.selectedIds.length;
    setText('aiReportCharacters',report.selectedIds.length+' alumnos · '+report.text.length.toLocaleString('es-ES')+' caracteres');
    setText('aiReportMessage','Revisa el texto. Copiarlo no envía datos a ninguna IA.');
  }
  async function copy(){
    const preview=$('aiReportPreview');
    if(!preview||!preview.value)return;
    try {
      if(navigator.clipboard && typeof navigator.clipboard.writeText==='function'){
        await navigator.clipboard.writeText(preview.value);
      }else{
        preview.focus();preview.select();
        if(!document.execCommand || !document.execCommand('copy'))throw new Error('Copia manual necesaria');
      }
      setText('aiReportMessage','Texto seudonimizado copiado. Pégalo en la IA aprobada por tu centro.');
    }catch(error){
      preview.focus();preview.select();
      setText('aiReportMessage','El navegador ha bloqueado el portapapeles. El texto está seleccionado: cópialo manualmente.');
    }
  }
  function fromProfile(){
    if(!dataset)return;
    const name=$('trackingStudentSelect')?.value;
    const match=dataset.aliasMap.find(item=>item.name===name);
    if(!match||!dataset.profiles.some(p=>p.id===match.id)){
      setText('aiReportMessage','El alumno seleccionado no aparece con los filtros actuales.');
      return;
    }
    $('aiReportMode').value='single';
    toggleMode();
    $('aiReportStudent').value=match.id;
    generate();
    $('aiReportPanel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function reset(){
    dataset=null;
    const preview=$('aiReportPreview');
    if(preview)preview.value='';
    for(const id of ['aiReportStudent','aiReportBatch','aiReportMappingTable']){
      const el=$(id);if(el)el.replaceChildren();
    }
    if($('aiReportGenerate'))$('aiReportGenerate').disabled=true;
    if($('aiReportCopy'))$('aiReportCopy').disabled=true;
    if($('aiReportMappingDetails'))$('aiReportMappingDetails').open=false;
    setText('aiReportAvailable','Carga un CSV para preparar informes.');
    setText('aiReportMappingCount','');
    clearPreview('');
  }
  function init(){
    if(ready||!$('aiReportPanel'))return;
    ready=true;
    for(const id of ['aiReportMode','aiReportStudent','aiReportBatch','aiReportFocus']){
      const el=$(id);
      if(el)el.addEventListener('change',id==='aiReportMode'?toggleMode:()=>clearPreview('Las opciones han cambiado. Vuelve a generar el texto.'));
    }
    $('aiReportGenerate')?.addEventListener('click',generate);
    $('aiReportCopy')?.addEventListener('click',copy);
    $('aiReportFromProfile')?.addEventListener('click',fromProfile);
    reset();
    toggleMode();
  }
  root.MoodleAiReportUI={init,update,reset,generate,copy};
})(typeof window!=='undefined'?window:globalThis);
