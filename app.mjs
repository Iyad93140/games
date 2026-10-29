import {WORDS,attempt} from './core.mjs';
const grid=document.querySelector('#grid');
const message=document.querySelector('#message');
const input=document.querySelector('#guess');
const form=document.querySelector('#guess-form');
let state;
const symbols={correct:'✓',present:'↔',absent:'×'};
const labels={correct:'bien placée',present:'présente ailleurs',absent:'absente'};
function render() {
  grid.replaceChildren();
  for(let rowIndex=0;rowIndex<6;rowIndex++) {
    const row=document.createElement('div');row.className='guess-row';
    const guess=state.rows[rowIndex];
    for(let i=0;i<5;i++) {
      const tile=document.createElement('div');tile.className='tile';
      if(guess) {
        tile.classList.add(guess.marks[i]);
        const letter=document.createElement('span');letter.textContent=guess.guess[i];
        const mark=document.createElement('small');mark.textContent=symbols[guess.marks[i]];
        tile.setAttribute('aria-label',`${guess.guess[i]} : ${labels[guess.marks[i]]}`);
        tile.append(letter,mark);
      } else tile.setAttribute('aria-label','Case vide');
      row.append(tile);
    }
    grid.append(row);
  }
  input.disabled=state.finished;
  document.querySelector('#submit').disabled=state.finished;
}
function start() {
  state={secret:WORDS[Math.floor(Math.random()*WORDS.length)],rows:[],finished:false,won:false};
  input.value='';message.textContent='La partie commence. À toi de jouer.';render();input.focus();
}
form.onsubmit=event=>{
  event.preventDefault();
  try {
    state=attempt(state,input.value);input.value='';
    message.textContent=state.won?`Bien joué ! Trouvé en ${state.rows.length} essai(s).`:state.finished?`Le mot était ${state.secret}.`:`Il reste ${6-state.rows.length} essai(s).`;
    render();if(!state.finished)input.focus();
  } catch(error){message.textContent=error.message;}
};
document.querySelector('#restart').onclick=start;
start();
