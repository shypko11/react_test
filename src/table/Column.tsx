import React from "react";
import type { CellType } from "../App";
import Cell from "./cell/Cell";
import style from "../styles/Column.module.css"

interface MyProps {
  data: CellType[];
  collIndex: number;
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
    let row = [];
    let sum = 0;
    row = this.props.data.map((cell, i) => {
      sum += cell.amount;
      return (<Cell key={"cell" + this.props.collIndex + i} data={cell} />);
    })
    let keyUnic = "sum" + this.props.collIndex;
    row.push(
      <th key={keyUnic}
        className={"sum " +  style.sum}
        data-collumnindex={this.props.collIndex}
        onMouseLeave={this.percentOff}
      >{sum}
      </th>
    );
    return row;
  }
}

export default Column;
