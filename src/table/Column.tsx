import React from 'react';
interface MyProps {
    data:Array<any>,
    collIndex: number,
    rows:Array<any>
};


class Column extends React.Component<MyProps, {}> {
   

    percentOff():void {
        let event = new Event("offHints");
        window.dispatchEvent(event);
    }

    render() {
        let tableCol = [];
        let sum = 0;
        for (let i = 0; i < this.props.data.length; i++) {
           
            let cellData = this.props.data[i];
            let inner: number = cellData.showPercent ? cellData.percent : cellData.amount;
            let heightPercent: number = cellData.showPercent ? cellData.percent : 0;
            sum += cellData.amount;
            let columns = (<th data-index ={cellData.id} className={cellData.lighted ? 'light' : 'base'}>
                {inner}
                <span className={'percent'} style={{ height: heightPercent }}></span>
            </th>);
            tableCol.push(columns);
        }
        tableCol.push((<th data-collumnindex={this.props.collIndex} onMouseLeave={this.percentOff}>
            {sum}
        </th>))
        return tableCol;

    }
}

export default Column;