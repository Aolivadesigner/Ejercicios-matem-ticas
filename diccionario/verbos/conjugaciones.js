import verbos from "./infinitivos.json" assert { type: "json" };
import participios from "./irregulares.json" assert { type: "json" };

// Verbos irregulares simples
const irregulares = {
  "ser": {presente:["soy","eres","es","somos","sois","son"], pasado:["fui","fuiste","fue","fuimos","fuisteis","fueron"]},
  "ir": {presente:["voy","vas","va","vamos","vais","van"], pasado:["fui","fuiste","fue","fuimos","fuisteis","fueron"]},
  "tener": {presente:["tengo","tienes","tiene","tenemos","tenéis","tienen"], pasado:["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"]}
};

// Reglas regulares
const reglas = {
  "ar": {presente:["o","as","a","amos","áis","an"], pasado:["é","aste","ó","amos","asteis","aron"], futuro:["aré","arás","ará","aremos","aréis","arán"], condicional:["aría","arías","aría","aríamos","aríais","arían"], subjuntivo:["e","es","e","emos","éis","en"]},
  "er": {presente:["o","es","e","emos","éis","en"], pasado:["í","iste","ió","imos","isteis","ieron"], futuro:["eré","erás","erá","eremos","eréis","erán"], condicional:["ería","erías","ería","eríamos","eríais","erían"], subjuntivo:["a","as","a","amos","áis","an"]},
  "ir": {presente:["o","es","e","imos","ís","en"], pasado:["í","iste","ió","imos","isteis","ieron"], futuro:["iré","irás","irá","iremos","iréis","irán"], condicional:["iría","irías","iría","iríamos","iríais","irían"], subjuntivo:["a","as","a","amos","áis","an"]}
};

// Conjugar verbo simple (regular o irregular)
export function conjugarSimple(verbo, tiempo="presente", persona=3) {
  if(irregulares[verbo] && irregulares[verbo][tiempo]) return irregulares[verbo][tiempo][persona-1];

  const raiz = verbo.slice(0,-2);
  const terminacion = verbo.slice(-2);

  if(!reglas[terminacion] || !reglas[terminacion][tiempo]) return verbo;

  return raiz + reglas[terminacion][tiempo][persona-1];
}

// Conjugar verbo compuesto (haber + participio)
export function conjugarCompuesto(verbo, tiempo="presente", persona=3, modo="indicativo") {
  let haber = {
    indicativo: {
      presente: ["he","has","ha","hemos","habéis","han"],
      pasado: ["hube","hubiste","hubo","hubimos","hubisteis","hubieron"],
      futuro: ["habré","habrás","habrá","habremos","habréis","habrán"],
      condicional: ["habría","habrías","habría","habríamos","habríais","habrían"]
    },
    subjuntivo: {
      presente: ["haya","hayas","haya","hayamos","hayáis","hayan"],
      pasado: ["hubiera","hubieras","hubiera","hubiéramos","hubierais","hubieran"],
      futuro: ["hubiere","hubieres","hubiere","hubiéremos","hubiereis","hubieren"]
    }
  };

  let aux = (haber[modo] && haber[modo][tiempo]) ? haber[modo][tiempo][persona-1] : "haber";
  let participio = participios[verbo] || verbo.slice(0,-2)+ (verbo.slice(-2) === "ar" ? "ado" : "ido");

  return `${aux} ${participio}`;
}

// Obtener verbo aleatorio por categoría
export function verboAleatorio(categoria=null) {
  let lista = categoria && verbos[categoria] ? verbos[categoria] : Object.values(verbos).flat();
  return lista[Math.floor(Math.random()*lista.length)];
}