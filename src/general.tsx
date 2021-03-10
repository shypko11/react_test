import type { CellType } from "./App";

export function findClosest(_id: number, rows:CellType[][], closest: number): Array<CellType> | undefined {
    if(rows){
      let data =  rows.slice();
      let qty: number = closest;
      let arrGeneral: Array<CellType> = [];
      let result: Array<CellType> = [];
      if (!qty) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        arrGeneral = arrGeneral.concat(data[i]);
      }
      arrGeneral = arrGeneral.map(e => { return e});
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
    function sortByAmmount(arr: Array<CellType>) {
      arr.sort((a, b) => (a.amount-  b.amount ));
    }

  }

 export function randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export function  convetID(num: number, len: number) {
    let x = num % len;
    let y = Math.floor(num / len);
    let result = {
      x,
      y,
    };
    return result;
  }
