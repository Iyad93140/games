import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreGuess,attempt,normalize} from './core.mjs';
test('lettres répétées : consommer seulement les occurrences restantes',()=>{
  assert.deepEqual(scoreGuess('ARBRE','RRRRR'),['absent','correct','absent','correct','absent']);
  assert.deepEqual(scoreGuess('TABLE','EPEEE'),['absent','absent','absent','absent','correct']);
  assert.deepEqual(scoreGuess('ARBRE','RARER'),['present','present','present','present','absent']);
});
test('normalisation et validation',()=>{
  assert.equal(normalize(' été  '),'ETE');
  assert.throws(()=>scoreGuess('AA','TABLE'));
  assert.throws(()=>attempt({finished:false,rows:[],secret:'TABLE'},'12abc'));
});
test('victoire et blocage après la fin',()=>{
  const initial={secret:'TABLE',rows:[],finished:false,won:false};
  const next=attempt(initial,'table');
  assert.equal(next.won,true);assert.equal(next.finished,true);assert.equal(initial.rows.length,0);
  assert.throws(()=>attempt(next,'TABLE'));
});
test('défaite après six essais',()=>{
  let state={secret:'TABLE',rows:[],finished:false,won:false};
  for(let i=0;i<6;i++)state=attempt(state,'ARBRE');
  assert.equal(state.finished,true);assert.equal(state.won,false);assert.equal(state.rows.length,6);
});
