import React from "react";
import type { CellType } from "../App";
import Cell from "./cell/Cell";

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
    console.log("th arr");
    let tableCol = [];
    let sum = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      let cellData: CellType = this.props.data[i];
      let keyUnic = "cell" + this.props.collIndex + i;
      sum += cellData.amount;
      let columns = <Cell key={keyUnic} data={cellData} />;
      tableCol.push(columns);
    }
    let keyUnic = "sum" + this.props.collIndex;
    tableCol.push(
      <th key={keyUnic}
        className="sum"
        data-collumnindex={this.props.collIndex}
        onMouseLeave={this.percentOff}
      >{sum}
      </th>
    );
    return tableCol;
  }
}

export default Column;
