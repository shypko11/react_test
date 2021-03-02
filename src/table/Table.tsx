import React from "react";
import Column from "../table/Column";
import type { Cell } from "../App";

type MyProps = {
  rows: Cell[][] | undefined;
};

class Table extends React.Component<MyProps, {}> {
  offAllLight(): void {
    let event = new Event("offHints");
    window.dispatchEvent(event);
  }

  generateAverageValues(rows: Cell[][]) {
    if (!rows || !rows.length) {
      return;
    }
    let cellsInRow = rows[0].length;
    let arrAverageValues = [];
    let value = 0;
    for (let j = 0; j < cellsInRow; j++) {
      for (let i = 0; i < rows.length; i++) {
        value += rows[i][j].amount;
      }
      arrAverageValues.push(<th key={Math.random().toString()} >{Math.round(value / rows.length)}</th>);
      value = 0;
    }
    return arrAverageValues;
  }

  render() {
    if( this.props.rows){
      let tableRows = [];
      let average = this.generateAverageValues(this.props.rows);
      let counter = 0;
      
      for (let i = 0; i < this.props.rows.length; i++) {
        let tr = (
          <tr key={Math.random().toString()}>
            <Column
              data={this.props.rows[i]}
              rows={this.props.rows}
              collIndex={counter++}
            />
          </tr>
        );
        tableRows.push(tr);
      }
  
      return (
        <table onMouseLeave={this.offAllLight}>
          <tbody>
            {tableRows}
            <tr key={"avarege"}>{average}</tr>
          </tbody>
        </table>
      );
    }else{
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
