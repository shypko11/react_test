import React from "react";
import { convetID, findClosest, randomNumber } from "./general";
import Table from "./table/Table";
import style from "./styles/App.module.css"

type Data = {
  x: number;
  y: number;
  closest: number;
  tableData?: CellType[][] | undefined;
};
type MyProps = {
  data?: Data;
};

type MyState = {
  rows: CellType[][] | undefined;
  oldRows: CellType[][];
  closest: number;
  x?: number;
  y?: number;
};

type Cords = {
  x: number;
  y: number;
};
export type CellType = {
  readonly amount: number;
  readonly id: number;
  readonly lighted: boolean;
  readonly percent: string;
  readonly showPercent: boolean;
  readonly x: number;
  readonly y: number;
};

type Data_attributes = {
  collumnindex?: number;
  index?: number;
};

class Matrix extends React.Component<MyProps, MyState> {
  lightingCells: number[];
  constructor(props: MyProps) {
    super(props);
    if (props.data) {
      this.state = {
        rows: props.data.tableData,
        oldRows: [],
        closest: props.data.closest,
        x: props.data.x,
        y: props.data.y,
      };
    } else {
      this.state = { rows: [], oldRows: [], closest: 0, x: 0, y: 0 };
    }
    this.lightingCells = [];
    this.handleChange = this.handleChange.bind(this);
    this.createMatrix = this.createMatrix.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.addLine = this.addLine.bind(this);
    this.handleTableEvent = this.handleTableEvent.bind(this);
    this.toggleHints = this.toggleHints.bind(this);
  }

  handleTableEvent(event: React.MouseEvent): void {
    if (this.state.rows) {
      let collumnindex: number;
      let index: number;
      let data_attributes: Data_attributes;
      let target = event.target as HTMLElement;
      if (target && target.tagName === "TH") {
        data_attributes = target.dataset;
        collumnindex = data_attributes.collumnindex
          ? (data_attributes.collumnindex -0)
          : -1;
        index = data_attributes.index ? (data_attributes.index -0) : -1;
        if (index >= 0) {
          if (event.type === "click") {
            this.increaseCell.call(this, index);
          } else if (event.type === "mouseover") {
            let closest = findClosest.call(
              this,
              index,
              this.state.rows,
              this.state.closest
            );
            if (closest) {
              this.toggleHints.call(this, closest);
            }
          }
        } else if (collumnindex >= 0) {
          let stateRows = this.state.rows;
          let table;
          if (stateRows) {
            table = stateRows?.map((row, i) => {
              return row.map((cell, j) => {
                if (i === collumnindex) {
                  cell = {
                    ...cell,
                    lighted: false,
                    showPercent: true,
                  };
                } else if (cell.lighted || cell.showPercent) {
                  cell = {
                    ...cell,
                    lighted: false,
                    showPercent: false,
                  };
                }
                return cell;
              });
            });
            this.setState({ rows: table });
          }
        }
      }
    }
  }

  toggleHints(arr?: CellType[]): void {
    let cordsY = arr?.map((elem) => {
      return elem.y;
    });
    let offCords = this.lightingCells?.length > 0 ? this.lightingCells?.slice() : [];
    this.lightingCells = [];
    let table;
    if (this.state.rows) {
      let stateRows: CellType[][] = this.state.rows;
      table = stateRows.map((row, i) => {
        if (cordsY?.indexOf(i) !== -1 || offCords?.indexOf(i) !== -1) {
          return row.map((cell, j) => {
            if (arr && arr.indexOf(cell) !== -1) {
              cell && this.lightingCells.push(cell.y);
              cell = {
                ...cell,
                lighted: true,
                showPercent: false,
              };
            } else if (cell.lighted || cell.showPercent) {
              cell = {
                ...cell,
                lighted: false,
                showPercent: false,
              };
            } else {
              cell = stateRows[i][j];
            }
            return cell;
          });
        } else {
          return stateRows[i];
        }
      });
      this.setState({ rows: table });
    }
  }



  increaseCell(_id: number) {
    let arr = this.state.rows;
    if (arr) {
      let cords: Cords;
      let rowLen = arr[0].length;
      if (rowLen > _id) {
        cords = {
          x: _id,
          y: 0,
        };
      } else {
        cords = convetID(_id, rowLen);
      }
      let newArr = arr.map((row, i) => {
        if (i !== cords.y && arr) {
          return arr[i];
        } else {
          return row.map((cell, j) => {
            if (j !== cords.x && arr) {
              return arr[i][j];
            } else {
              cell = {
                ...cell,
                amount: cell.amount + 1
              };
              return cell;
            }
          });
        }
      });
      this.setState({ rows: newArr });
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
    if (this.state.rows) {
      let newArr = this.state.rows.slice(0, this.state.rows.length - 1);
      this.setState({ rows: newArr });
    }
  }

  addLine() {
    if (!this.state.rows || !this.state.rows.length) {
      return;
    }
    let newArr = this.state.rows.slice();
    let lastRow = newArr[newArr.length - 1];
    let lastCellId = lastRow[lastRow.length - 1].id;
    let newY = lastRow[lastRow.length - 1].y;
    let rowLength = newArr[0].length;
    let emptyRow = Array.from(new Array(rowLength));
    let newRow = emptyRow.map((e, i) => {
      let value = randomNumber(999, 100);
      return ({
        id: ++lastCellId,
        amount: value,
        lighted: false,
        percent: "",
        showPercent: false,
        y: newY,
        x: i
      });
    });
    newArr.push(newRow);
    this.setState({ rows: newArr });
  }

  createMatrix(event?: React.FormEvent) {
    event && event.preventDefault();
    if (!this.state.x && !this.state.y) {
      return;
    }
    const y = this.state.y;
    const x = this.state.x;
    let emptyRowsArr = Array.from(new Array(y));
    let emptycellsArr =  Array.from(new Array(x));
    let lastCellId = 0;

    let newRows = emptyRowsArr.map((e, i) => {
      let sum = 0;
      let cells =  emptycellsArr.map((el, j) => {
        let value = randomNumber(999, 100);
        sum += value;
        return ({
          id: lastCellId++,
          amount: value,
          lighted: false,
          percent: "",
          showPercent: false,
          y: i,
          x: j
        });
      });
     let cellsWithPersent =  cells.map(cell => {
        let perc: number = (cell.amount / sum) * 100;
        let percentValue: string = Math.round(perc) + "%";
        return {
          ...cell,
          percent: percentValue
        }
      })
      return cellsWithPersent;
    });
   
    this.setState({ rows: newRows });
  }

  render() {
    // (globalThis as any).addEventListener("toggleHints", () => {
    //   this.toggleHints();
    // });
    // if (this.state.rows && this.state.rows.length > 0){
    //   return(

    // );
    // } else {
    return (
      <div id="form_wrap" className={style.form_wrap}>
        <div className={style.startscreen}>
        <form id="formZ" className={style.form} onSubmit={this.createMatrix}>
          <label className={style.label}>
            <span className={style.label_span} style={{ display: "block" }}>Create Matrix</span>
            <span className={style.label_span}>Rows:</span>
            <input className={style.form_input} type="number" name="x" onChange={this.handleChange} />
            <span className={style.label_span}>Columns:</span>
            <input className={style.form_input} type="number" name="y" onChange={this.handleChange} />
            <span className={style.label_span}>Amount closest numbers:</span>
            <input className={style.form_input} type="number" name="closest" onChange={this.handleChange} />
          </label>
          <input className={style.button} type="submit" value="Create" />
        </form>
        <button onClick={this.removeLine} className={style.button} id="removeButton">
          Remove line
        </button>
        <button onClick={this.addLine} className={style.button} id="addButton">
          Add line
        </button>
        </div>
        <div
          className="table_wrap"
          onClick={this.handleTableEvent}
          onMouseOver={this.handleTableEvent}
        >
          <Table rows={this.state.rows} />
        </div>
      </div>
    );
  }

  // }
}

export default Matrix;
