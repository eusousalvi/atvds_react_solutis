/**
 * Question 01
 * 
 * Crie um lista com 10 valores e escreva quantos
 * desses valores lidos estão no intervalo [10,20]
 * (inlcuindo os valores 10 e 20 no intervalo) e
 * quantos deles estão fora deste intervalo.
 */

const list = [10, 20, 25, 13, 15, 3, 12, 22, 11, 45];
const between10and20 = list.filter((number) => number >= 10 && number <= 20);
const outOfRange10and20 = list.filter((number) => number < 10 || number > 20);
console.log(`Existem ${between10and20.length} números entre 10 e 20, de forma inclusiva.`);
console.log(`Existem ${outOfRange10and20.length} números fora do intervalo entre 10 e 20.`);

//Console result:
// Existem 6 números entre 10 e 20, de forma inclusiva.
// Existem 4 números fora do intervalo entre 10 e 20.

//----------------------------------------------

/**
 * Question 02
 * 
 * Faça um programa que leia uma lista A e uma
 * lista B de inteiros de 10 posições. Depois gere
 * uma lista C que será o produto dos valores
 * correspondentes dos vetores A e B.
*/

const listA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const listB = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const listC = multiplyLists(listA, listB);
console.log(listC);

function multiplyLists(list1, list2){
  const list = listA.map((number, index) => (listB[index] * number));
  return list;
}

//Console result:
// [ 11, 24, 39, 56, 75, 96, 119, 144, 171, 200 ]

//----------------------------------------------

/**
 * Question 03
 * 
 * Crie duas listas de 10 posições e crie uma
 * terceira lista contendo, nas posições pares os
 * valores do primeira lista e nas posições
 * impares os valores do segunda lista.
 */

const evenOddList = createEvenOddList(listA, listB, 20);

function createEvenOddList(list1, list2, listLength){
  let list = [];
  let index = 0;
  for(let i = 0; i < listLength; i++){
    if((i % 2) === 0){
      list.push(list1[index]);
    }else{
      list.push(list2[index]);
      index++;
    }
  }

  return list;
}

console.log(evenOddList);

//Console result:
// [ 1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16, 7, 17, 8, 18, 9, 19, 10, 20 ]

//----------------------------------------------

/**
 * Question 03 trying another solution - recursivity
*/

const listRecursiveA = [12, 32, 44, 1, 6, 76, 5, 99, 43, 0];
const listRecursiveB = [101, 142, 133, 142, 135, 146, 157, 158, 197, 207];
const recursiveList = [];

const recursiveSolution = (length) => (index) => {
  if((length % 2) === 0){
    recursiveList.push(listRecursiveA[index]);
  }else{
    recursiveList.push(listRecursiveB[index]);
    index++;
  }
  if(length >= 20 || index >= 10){
    return;
  }else{
    recursiveSolution(++length)(index);
  }
}

recursiveSolution(0)(0);

console.log(recursiveList);

//Console result:
// [ 12, 101, 32, 142, 44, 133, 1, 142, 6, 135, 76, 146, 5, 157, 99, 158, 43, 197, 0, 207 ]