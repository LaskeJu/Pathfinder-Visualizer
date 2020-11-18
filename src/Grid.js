import React, {Component} from 'react'
import Cell from './Cell';
import './grid.css';

class Grid extends Component {
    state = {
        rows: [],
        isMouseDown: false,
    }

    componentDidMount() {
        const rows = getGrid();
        this.setState({rows});
    }

    handleClick = (row, col) => {
        if (this.state.isMouseDown) {
            let newRows = this.state.rows;
            let cell = newRows[row][col];
            let newCell = {
                ...cell,
                isWall: !cell.isWall,
            }
            newRows[row][col] = newCell;
            this.setState({rows: newRows});
        }
    }

    handleMouseDown = () => {
        this.setState({isMouseDown: true});
    }

    handleMouseUp = () => {
        this.setState({isMouseDown: false});
    }

    render() {
        const {rows} = this.state;
        console.log('redner');
        return (
            <div className="grid">
                {rows.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="row">
                            {row.map((cell, cellIndex) => {
                                return (
                                    <Cell key={`row${rowIndex}col${cellIndex}`}
                                          row={cell.row}
                                          col={cell.col}
                                          isWall={cell.isWall}
                                          handleClick={(row, col) => this.handleClick(row, col)}
                                          handleMouseDown={() => this.handleMouseDown()}
                                          handleMouseUp={() => this.handleMouseUp()}>
                                    </Cell>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const getGrid = () => {
    let rows = [];
    for (let row = 0; row < 30; row++) {
        let cols = [];
        for (let col = 0; col < 45; col++) {
            cols.push(createCell(col, row))
        }
        rows.push(cols);
    }
    return rows;
}

const createCell = (col, row) => {
    return {
        col,
        row,
        isWall: false,
    };
}

export default Grid
