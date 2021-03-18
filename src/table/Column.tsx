import React from "react";
import type { CellType } from "../App";
import Cell from "./cell/Cell";
import style from "../styles/Column.module.css"

interface MyProps {
  data: CellType[];
  collIndex: number;
}

type Row = {
  cells: JSX.Element[];
  sum: number;
}
class Column extends React.Component<MyProps, {}> {
  shouldComponentUpdate(nextProps: MyProps) {
    let newValues =nextProps.data;
    let oldValues = this.props.data;
    if(newValues === oldValues){
      return false;
    }
    return true;
  }

  percentOff(): void {
    let event = new Event("offHints");
    window.dispatchEvent(event);
  }

  render() {
    let row : Row  = this.props.data.reduce((acc, cur, i) => {
      let cell = <Cell key={"cell" + this.props.collIndex + i} data={cur} />
      acc.cells[i]= cell;
      acc.sum += cur.amount; 
      return (acc);
    }, {cells: [] as JSX.Element[], sum: 0});

    let keyUnic = "sum" + this.props.collIndex;
    row.cells.push(
      <th key={keyUnic}
        className={"sum " +  style.sum}
        data-collumnindex={this.props.collIndex}
        onMouseLeave={this.percentOff}
      >{row.sum}
      </th>
    );
    return row.cells;
  }
}

export default Column;
