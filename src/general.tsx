import { Cell } from "./App";

export function findClosest(_id: number, rows:Cell[][], closest: number): Array<Cell> | undefined {
    if(rows){
      let data =  rows.slice();
      let qty: number = closest;
      let arrGeneral: Array<Cell> = [];
      let result: Array<Cell> = [];
      if (!qty) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        arrGeneral = arrGeneral.concat(data[i]);
      }
      if (qty > arrGeneral.length) {
        qty = arrGeneral.length;
      }
      
      sortByAmmount(arrGeneral);
  
      arrGeneral.forEach(function (elem, index) {
        if (elem.id === _id) {
          let start = Math.floor(index - (qty + 1) / 2);
          let end = Math.floor(index + (qty + 1) / 2);
          if (start < 0) {
            do {
              start += 1;
              end += 1;
            } while (start < 0);
          } else if (end > arrGeneral.length - 1) {
            do {
              if (start === 0) {
                break;
              }
              start -= 1;
              end -= 1;
            } while (end > arrGeneral.length - 1);
          }
          result = arrGeneral.slice(start, end);
        }
      });
      return result;
    }
    function sortByAmmount(arr: Array<Cell>) {
      arr.sort((a, b) => (a.amount > b.amount ? 1 : -1));
    }
  }

 export function randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }