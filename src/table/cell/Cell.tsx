import React from "react";
import type { CellType } from "../../App";
import style from "../../styles/Cell.module.css"

interface MyProps {
  data: CellType;
}

class Cell extends React.Component<MyProps, {}> {
  shouldComponentUpdate(nextProps: MyProps) {
    let newValues =nextProps.data;
    let oldValues = this.props.data;
    if(newValues === oldValues){
      return false;
    }
    return true;
  }

  render() {
    console.log("cell");
    let data = this.props.data;
    let inner: number | string = data.showPercent ? data.percent : data.amount;
    let heightPercent: string = data.showPercent ? data.percent : "0";
    return (
      <th data-index={data.id} className={(data.lighted ? style.light : style.base ) + " " + style.cell}>
        {inner}
        <span className={style.percent} style={{ height: heightPercent }}></span>
      </th>
    );
  }
}

export default Cell;
