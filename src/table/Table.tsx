import React from "react";
import Column from "../table/Column";
import type { CellType } from "../App";
import style from "../styles/Table.module.css"


type MyProps = {
  rows: CellType[][] | undefined;
};

class Table extends React.Component<MyProps, {}> {
  offAllLight(): void {
    let event = new Event("offHints");
    window.dispatchEvent(event);
  }

  generateAverageValues(rows: CellType[][]) {
    if (!rows || !rows.length) {
      return;
    }
    let cellsInRow = rows[0].length;
    let arrAverageValues = [];
    let value = 0;
    for (let j = 0; j < cellsInRow; j++) {
      let keyUnic;
      for (let i = 0; i < rows.length; i++) {
        keyUnic = "average" + i + j;
        value += rows[i][j].amount;
      }
      arrAverageValues.push(
        <th className={style.cell} key={keyUnic}>{Math.round(value / rows.length)}</th>
      );
      value = 0;
    }
    return arrAverageValues;
  }

  render() {
    console.log("table2");
    if (this.props.rows) {
      let rows = this.props.rows; 
      let tableRows = [];
      let average = this.generateAverageValues(this.props.rows);
      let counter = 0;
      for (let i = 0; i < rows.length; i++) {
        let keyUnic = "row" + i;
        let tr = (
          <tr key={keyUnic}>
            <Column data={rows[i]} collIndex={counter++} />
          </tr>
        );
        tableRows.push(tr);
      }

      return (
        <table onMouseLeave={this.offAllLight} className={style.table}>
          <tbody>
            {tableRows}
            <tr key={"avaregeRow"}>{average}</tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      );
    }
  }
}

export default Table;
