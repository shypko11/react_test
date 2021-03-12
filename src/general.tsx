import type { CellType } from "./App";

export function findClosest(_id: number, rows: CellType[][], closest: number): Array<CellType> | undefined {
  if (rows) {
    let data = rows.slice();
    let qty: number = closest;
    let arrGeneral: Array<CellType> = [];
    let result: Array<CellType> = [];
    if (!qty) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      arrGeneral = arrGeneral.concat(data[i]);
    }
    arrGeneral = arrGeneral.map((e) => {
      return e;
    });
    if (qty > arrGeneral.length) {
      qty = arrGeneral.length;
    }
    const currentValue = arrGeneral[_id].amount;
    sortByAmmount(arrGeneral);
    let currentCell = arrGeneral.find((elem, i)=>(elem.amount === currentValue ? true : false ));
    if(currentCell){
      let currentPos = currentCell && arrGeneral.indexOf(currentCell);
      const possibleClosestRange = arrGeneral
        .concat([])
        .slice(
          Math.max(currentPos - qty, 0),
          Math.min(currentPos + qty + 1, arrGeneral.length - 1)
        );
      result = possibleClosestRange
        .map((v, i) => ({ index: i, diff: Math.abs(currentValue - v.amount)  }))
        .sort((a, b) => a.diff - b.diff)
        .slice(0, qty + 1)
        .map((e) =>  possibleClosestRange[e.index]);
      return result;
     }
  }
  function sortByAmmount(arr: Array<CellType>) {
    arr.sort((a, b) => a.amount - b.amount);
  }
}

export function randomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convetID(num: number, len: number) {
  let x = num % len;
  let y = Math.floor(num / len);
  let result = {
    x,
    y,
  };
  return result;
}
