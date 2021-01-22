import React from 'react';
import Column from '../table/Column'


class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    offAllLight() {
        let event = new Event("offHints");
        window.dispatchEvent(event);
    }
    generateAverageValues(rows) {
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
            arrAverageValues.push(
                <th>{Math.round(value / rows.length)}</th>);
            value = 0;
        }
        return arrAverageValues;
    }

    render() {
        let tableRows = [];
        let average = this.generateAverageValues(this.props.rows);
        let counter = 0;
        for (let i = 0; i < this.props.rows.length; i++) {
            let tr = (<tr>
                <Column data={this.props.rows[i]} rows={this.props.rows} collIndex={counter++} />
            </tr>);
            tableRows.push(tr);
        }

        return (
            <table onMouseLeave={this.offAllLight}>
                <thead >
                    {tableRows}
                    <tr>{average}</tr>
                </thead>
            </table>
        )

    }
}

export default Table;