import React from "react";
import type { Cell } from "../App";

interface MyProps {
  data: Cell[];
  collIndex: number;
  rows: Cell[][];
}

class Column extends React.Component<MyProps, {}> {
  percentOff(): void {
    let event = new Event("offHints");
    window.dispatchEvent(event);
  }

  render() {
    let tableCol = [];
    let sum = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      let cellData: Cell = this.props.data[i];
      let inner: number | string = cellData.showPercent ? cellData.percent : cellData.amount;
      let heightPercent: string = cellData.showPercent ? cellData.percent : "0";
      sum += cellData.amount;
      let keyUnic = "cell" + this.props.collIndex + i;
      let columns = (
        <th key={keyUnic}
          data-index={cellData.id}
          className={cellData.lighted ? "light" : "base"}
        >{inner}<span className={"percent"} style={{ height: heightPercent }}></span>
        </th>
      );
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
