import React from 'react';
import Table from './table/Table';

type MyProps = {
};

type MyState = {
  rows:Cell[][],
  oldRows:Cell[][],
  closest: string | number,
  x?:number,
  y?:number
};

export type Cell = {
  amount: number,
  id:number,
  lighted:boolean,
  percent: string,
  showPercent: boolean
};
type Data_attributes = {
  collumnindex?:number,
  index?: number
}
class Matrix extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { rows: [], oldRows: [], closest: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.createMatrix = this.createMatrix.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.addLine = this.addLine.bind(this);
    this.handleTableEvent = this.handleTableEvent.bind(this);
    this.offHints = this.offHints.bind(this);
    //ffff
  }

  handleTableEvent(event: React.MouseEvent): void {
    let collumnindex:number;
    let index: number;
    let data_attributes: Data_attributes;
    let  target = event.target as HTMLElement;
    if (target && target.tagName  === 'TH' ) {
        data_attributes = target.dataset;
        collumnindex = data_attributes.collumnindex ? Number(data_attributes.collumnindex) : -1;
        index = data_attributes.index ?  Number(data_attributes.index) : -1;
      if (index >= 0) {
        if (event.type === 'click') {
          this.increaseCell.call(this, index);
        } else if (event.type === 'mouseover') {
          let closest = this.findClosest.call(this, index);          
          if(closest){
             this.highlightClosest.call(this, closest);
          };
        }
      } else if (collumnindex >= 0) {
        this.state.rows[collumnindex].forEach(function (elem:Cell) {
          elem.showPercent = true;
        });
        this.setState({ rows: this.state.rows })
      }
    }
  }

  findClosest(_id : number): Array<Cell> | undefined {
    let data = this.state.rows.slice();
    let qty: number = typeof  Number(this.state.closest) === "number" ?  Number(this.state.closest): 0;
    let arrGeneral: Array<Cell>= [];
    let  result:Array<Cell> = [];
    if (!qty) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      arrGeneral = arrGeneral.concat(data[i]);
    }
    if (qty > arrGeneral.length) {
      qty = arrGeneral.length;
    }
    function sortByAmmount(arr: Array<Cell>) {
      arr.sort((a, b) => a.amount > b.amount ? 1 : -1);
    }
    sortByAmmount(arrGeneral);

    arrGeneral.forEach(function (elem, index) {
      if (elem.id === _id) {
        let start = Math.floor(index - ((qty + 1) / 2));
        let end = Math.floor(index + ((qty + 1) / 2));
        if (start < 0) {
          do {
            start += 1;
            end += 1;
          } while (start < 0);
        } else if (end > (arrGeneral.length - 1)) {
          do {
            if (start === 0) {
              break;
            }
            start -= 1;
            end -= 1;
          } while (end > (arrGeneral.length - 1));
        }
        result = arrGeneral.slice(start, end);
      }
    })
    return result;
  }
 
  highlightClosest(closestArr:Array<Cell> | undefined) {
    if (closestArr) {
      let self = this;
      this.offHints(function () {
        let newArr = self.state.rows.slice();
        closestArr.forEach(function (elem) {
          for (let i = 0; i < newArr.length; i++) {
            newArr[i].forEach(function (cell: Cell) {
              if (!cell || !elem) {
                return;
              }
              if (cell.id === elem.id) {
                cell.lighted = true;
              }
            });
          }
        });
        self.setState({ rows: newArr });
      });
    }
  }

  offHints(callback?:(()=>void)):void {
    let table = this.state.rows;
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j].lighted = false;
        table[i][j].showPercent = false;
      }
    }
    this.setState({ rows: table });
    callback && callback();
  }

  increaseCell(_id: number) {
    let arr = this.state.rows.slice();
    arr.forEach(function (elem) {
      for (let i = 0; i < elem.length; i++) {
        if (elem[i].id === Number(_id)) {
          elem[i].amount++;
          elem[i].lighted = true;
          break;
        }
      }
    });
    this.setState({ rows: arr });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // let  target = event.target as HTMLInputElement;
    if (event.target.name === 'x') {
      this.setState({ x: Number(event.target.value) });
    } else if (event.target.name === 'y') {
      this.setState({ y: Number(event.target.value) });
    } else {
      this.setState({ closest: Number(event.target.value) });
    }
  }

  randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  removeLine() {
    let newArr = this.state.rows.slice(0, this.state.rows.length - 1);
    this.setState({ rows: newArr });
  }

  addLine() {
    if (!this.state.rows || !this.state.rows.length) {
      return;
    }
    let newArr = this.state.rows.slice();
    let column: Cell[] = [];
    let lastRow = newArr[newArr.length - 1];
    let lastCellId = lastRow[lastRow.length - 1].id;
    for (let i = 0; i < newArr[0].length; i++) {
      let value = this.randomNumber(999, 100);
      column[i] = {
        id: ++lastCellId,
        amount: value, 
        lighted:false,
        percent: '',
        showPercent: false
      };
    }
    newArr.push(column);
    this.setState({ rows: newArr });
  }

  createMatrix(event: React.FormEvent) {
    event.preventDefault();
    const y  = this.state.y;
    const x = this.state.x;
    let localRows = [];
    let counter = 0;
    if(x && y){
      for (let i = 0; i < x; i++) {
        let sum = 0;
        let column = [];
        for (let j = 0; j < y; j++) {
          let value = this.randomNumber(999, 100);
          column[j] = {
            id: counter++,
            amount: value,
            lighted: false,
            percent: '',
            showPercent: false
          };
          sum += value;
        }
        column.forEach(function (element) {
          let perc = element.amount / sum * 100;
          element.percent = Math.round(perc) + "%";
        })
        localRows.push(column);
      }
    }
   
    this.setState({ rows: localRows });
    window.addEventListener("offHints",  () => {
      this.offHints();
    });
  }


  render() {
    return (
      <div>
        <div id="form_wrap">

          <form onSubmit={this.createMatrix}>
            <label>
              <span style={{ display: "block" }}>Create Matrix</span>
              <span>Rows:</span>
              <input type="number" name="x" onChange={this.handleChange} />
              <span>Columns:</span>
              <input type="number" name="y" onChange={this.handleChange} />
              <span>Amount closest numbers:</span>
              <input type="number" name="closest" onChange={this.handleChange} />
            </label>
            <input className="button" type="submit" value="Create" />
          </form>
          <button onClick={this.removeLine} className="button">Remove line</button>
          <button onClick={this.addLine} className="button">Add line</button>
        </div>
        <div className="table_wrap" onClick={this.handleTableEvent} onMouseOver={this.handleTableEvent} >
          <Table rows={this.state.rows} />
        </div>
      </div>
    );
  }
}




export default Matrix;
