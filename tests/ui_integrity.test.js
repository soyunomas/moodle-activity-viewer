/* Ejecutar: node tests/ui_integrity.test.js (sin dependencias de npm). */
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const a=read('visor_actividad_moodle.html');
const b=read('visor_actividad_moodle-2.html');
assert.equal(a,b,'Los dos HTML deben estar sincronizados');
const ids=[...a.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'Los ID HTML deben ser únicos');
assert.match(a,/id="trackingDashboard"/);
assert.match(a,/Chart\.defaults\.font\.family = "'DM Sans', system-ui, sans-serif"/,'Los gráficos deben usar la tipografía del producto');
assert.match(a,/id="trackingHeatmap"/);
assert.match(a,/id="trackingContinuityTable"/);
assert.match(a,/id="trackingProgressCanvas"/);
assert.match(a,/id="filtersPanel"/);
assert.match(a,/src="learning_analytics.js"/);
assert.match(a,/src="learning_analytics_ui.js"/);
assert.doesNotMatch(a,/class="btn btn-outline-secondary btn-sm rounded-circle help-button" data-bs-toggle="modal"/);
const inline=[...a.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
inline.forEach(js=>new vm.Script(js));
['learning_analytics.js','learning_analytics_ui.js','help_content.js'].forEach(path=>new vm.Script(read(path)));
const legacy=vm.runInNewContext(read('help_content.js')+'; helpContent;');
const sandbox={window:{}};
vm.runInNewContext(read('learning_analytics_ui.js'),sandbox);
const types=[...a.matchAll(/data-chart-help-type="([^"]+)"/g)].map(x=>x[1]);
assert.equal(types.length,28,'Deben existir 20 ayudas originales y 8 nuevas');
for(const type of types){
    const help=sandbox.window.MoodleTrackingUI.helpFor(type,legacy);
    assert.ok(help && help.title && help.content.includes('Ejemplo'), 'Ayuda completa: '+type);
}
const readme=read('README.md');
assert.ok(readme.indexOf('https://soyunomas.github.io/moodle-activity-viewer/')<readme.indexOf('## ✨ Características Principales'));
assert.match(read('index.html'),/url=\.\/visor_actividad_moodle\.html/);
console.log('UI: IDs, ayudas, scripts, README y redirección correctos');
