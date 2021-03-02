import React from "react";
import { findClosest, randomNumber } from "./general";
import Table from "./table/Table";

type Data = {
  x: number;
  y: number;
  closest: number;
  tableData?: Cell[][] | undefined
};
type MyProps = {
 data?:Data;
};

type MyState = {
  rows: Cell[][] | undefined;
  oldRows: Cell[][];
  closest: number;
  x?: number;
  y?: number;
};

export type Cell = {
  readonly amount: number;
  readonly id: number;
  readonly lighted: boolean;
  readonly percent: string;
  readonly showPercent: boolean;
};

type Data_attributes = {
  collumnindex?: number;
  index?: number;
};
class Matrix extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    if(props.data){
      this.state = { rows: props.data.tableData, oldRows: [], closest: props.data.closest, x: props.data.x, y: props.data.y };
    }else{
      this.state = { rows: [], oldRows: [], closest: 0, x: 0, y: 0 };
    }
    this.handleChange = this.handleChange.bind(this);
    this.createMatrix = this.createMatrix.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.addLine = this.addLine.bind(this);
    this.handleTableEvent = this.handleTableEvent.bind(this);
    this.offHints = this.offHints.bind(this);    
  }

  handleTableEvent(event: React.MouseEvent): void {
    if(this.state.rows){
      let collumnindex: number;
      let index: number;
      let data_attributes: Data_attributes;
      let target = event.target as HTMLElement;
      if (target && target.tagName === "TH") {
        data_attributes = target.dataset;
        collumnindex = data_attributes.collumnindex ? Number(data_attributes.collumnindex) : -1;
        index = data_attributes.index ? Number(data_attributes.index) : -1;
        if (index >= 0) {
          if (event.type === "click") { 
            this.increaseCell.call(this, index);
          } else if (event.type === "mouseover") {
            let closest = findClosest.call(this, index, this.state.rows, this.state.closest);
            if (closest) { 
              this.highlightClosest.call(this, closest);
            }
          }
        } else if (collumnindex >= 0) {
          let newArr = this.state.rows;
          let row = this.state.rows[collumnindex]
          for(let i = 0; i < row.length; i++){
            row[i] = {
              ...row[i],
              showPercent: true
            }
          }
          this.setState({ rows: newArr });
        }
      }
    }
    
  }
  


  highlightClosest(closestArr: Array<Cell> | undefined) {
    if (closestArr) {
      let self = this;
      this.offHints(function () {
        let newArr = self.state.rows;
        closestArr.forEach(function (elem) {
          if(newArr){
            newArr.forEach(function (cellsArr) {
              for (let i = 0; i < cellsArr.length; i++) {
              
                if (cellsArr[i].id === elem.id) {
                  cellsArr[i] = {
                    ...cellsArr[i],
                    lighted: true
                  };
                }
              }
            });
          }
        });
        self.setState({ rows: newArr });
      });
    }
  }

  offHints(callback?: () => void): void {
    let table = this.state.rows;
    if(table){
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j] = {
            ...table[i][j],
            lighted: false,
            showPercent: false
          };
        }
      }
      this.setState({ rows: table });
      callback && callback();
    }
  }

  increaseCell(_id: number) {
    let arr = this.state.rows;
    if(arr){
      arr.forEach(function (elem) {
        for (let i = 0; i < elem.length; i++) {
          if (elem[i].id === Number(_id)) {
            elem[i] = {
              ...elem[i],
              amount: elem[i].amount + 1,
              lighted: true
            };
            break;
          }
        }
      });
      this.setState({ rows: arr });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // let  target = event.target as HTMLInputElement;
    if (event.target.name === "x") {
      this.setState({ x: Number(event.target.value) });
    } else if (event.target.name === "y") {
      this.setState({ y: Number(event.target.value) });
    } else {
      this.setState({ closest: Number(event.target.value) });
    }
  }

  removeLine() {
    if(this.state.rows){
      let newArr = this.state.rows.slice(0, this.state.rows.length - 1);
      this.setState({ rows: newArr });
    }
   
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
      let value = randomNumber(999, 100);
      column[i] = {
        id: ++lastCellId,
        amount: value,
        lighted: false,
        percent: "",
        showPercent: false
      };
    }
    newArr.push(column);
    this.setState({ rows: newArr });
  }

  createMatrix(event?: React.FormEvent) {
    event && event.preventDefault();
    if(!this.state.x && !this.state.y){
      return;
    }
    const y = this.state.y;
    const x = this.state.x;
    let localRows = [];
    let counter = 0;
    if (x && y) {
      for (let i = 0; i < x; i++) {
        let sum = 0;
        let column = [];
        for (let j = 0; j < y; j++) {
          let value = randomNumber(999, 100);
          column[j] = {
            id: counter++,
            amount: value,
            lighted: false,
            percent: "",
            showPercent: false
          };
          sum += value;
        }

        for(let k = 0; k < column.length; k++){
          let perc: number = (column[k].amount / sum) * 100;
          let percentValue: string = Math.round(perc) + "%";
          column[k] = {
            ...column[k],
            percent: percentValue
          }
        }
       
        localRows.push(column);
      }
    }

    this.setState({ rows: localRows });
   
  }

  render() {
    // (globalThis as any).addEventListener("offHints", () => {
    //   this.offHints();
    // });
    // if (this.state.rows && this.state.rows.length > 0){
    //   return(
     
    // );
    // } else {
      return (
        <div id="form_wrap">
          <form  id="formZ" onSubmit={this.createMatrix}>
            <label>
              <span style={{ display: "block" }}>Create Matrix</span>
              <span>Rows:</span>
              <input type="number" name="x" onChange={this.handleChange} />
              <span>Columns:</span>
              <input type="number" name="y" onChange={this.handleChange} />
              <span>Amount closest numbers:</span>
              <input
                type="number"
                name="closest"
                onChange={this.handleChange}
              />
            </label>
            <input className="button" type="submit" value="Create" />
          </form>
          <button onClick={this.removeLine} className="button" id="removeButton">
            Remove line
          </button>
          <button onClick={this.addLine} className="button" id="addButton">
            Add line
          </button>
          <div
            className="table_wrap"
            onClick={this.handleTableEvent}
            onMouseOver={this.handleTableEvent}
          >
            <Table rows={this.state.rows}/>
          </div>
        </div>
    );}
    
  // }
}

export default Matrix;
