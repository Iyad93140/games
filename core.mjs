export const WORDS = ['ARBRE','AVION','BRUIT','CADRE','CHIEN','FLEUR','LIVRE','MONDE','NEIGE','PLAGE','PORTE','ROUGE','TABLE','TERRE','VERRE'];
export function normalize(value) {
  return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
}
export function scoreGuess(secret, guess) {
  if (!/^[A-Z]{5}$/.test(secret) || !/^[A-Z]{5}$/.test(guess)) throw new Error('Deux mots de cinq lettres sont requis.');
  const result = Array(5).fill('absent');
  const remaining = {};
  for (let i=0;i<5;i++) {
    if (guess[i] === secret[i]) result[i]='correct';
    else remaining[secret[i]]=(remaining[secret[i]]||0)+1;
  }
  for (let i=0;i<5;i++) {
    if (result[i]==='correct') continue;
    if (remaining[guess[i]]>0) { result[i]='present'; remaining[guess[i]]--; }
  }
  return result;
}
export function attempt(state, rawGuess) {
  if (state.finished) throw new Error('Partie terminée. Lance une nouvelle partie.');
  const guess=normalize(rawGuess);
  if (!/^[A-Z]{5}$/.test(guess)) throw new Error('Entre exactement cinq lettres.');
  const row={guess, marks:scoreGuess(state.secret,guess)};
  const rows=[...state.rows,row];
  const won=guess===state.secret;
  return {...state,rows,won,finished:won||rows.length>=6};
}
