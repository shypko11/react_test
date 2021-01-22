import React from 'react';

class Column extends React.Component {
    constructor(props) {
        super(props);

    }

    percentOff() {
        let event = new Event("offHints");
        window.dispatchEvent(event);
    }

    render() {
        let tableCol = [];
        let sum = 0;
        for (let i = 0; i < this.props.data.length; i++) {
            let cellData = this.props.data[i];
            let inner = cellData.showPercent ? cellData.percent : cellData.amount;
            let heightPercent = cellData.showPercent ? cellData.percent : 0;
            sum += cellData.amount;
            let columns = (<th index={cellData.id} className={cellData.lighted ? 'light' : 'base'}>
                {inner}
                <span className={'percent'} style={{ height: heightPercent }}></span>
            </th>);
            tableCol.push(columns);
        }
        tableCol.push((<th collumnIndex={this.props.collIndex} onMouseLeave={this.percentOff}>
            {sum}
        </th>))
        return tableCol;

    }
}

export default Column;