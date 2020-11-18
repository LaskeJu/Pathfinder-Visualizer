import React, {Component} from 'react'
import Cell from './Cell';
import Navigation from "./Navigation";
import './grid.css';

const START_ACTION = 0;
const END_ACTION = 1;
const WALL_ACTION = 2;

class Grid extends Component {
    state = {
        rows: [],
        isMouseDown: false,
        selectedAction: START_ACTION,
    }

    componentDidMount() {
        const rows = getGrid();
        this.setState({rows});
    }

    handleMouseEnter = (row, col) => {
        if (this.state.isMouseDown && this.state.selectedAction === WALL_ACTION) {
            let newRows = this.state.rows;
            let cell = newRows[row][col];
            cell.isWall = !cell.isWall;
            this.setState({rows: newRows});
        }
    }

    handleClick = (row, col) => {
        if (this.state.selectedAction !== WALL_ACTION) {
            let newRows = this.state.rows;
            let cell = newRows[row][col];
            newRows.forEach((row, index) => {
                let newRow = row.map((col) => {
                    return {
                        ...col,
                        isStart: this.state.selectedAction === START_ACTION ? false : col.isStart,
                        isEnd: this.state.selectedAction === END_ACTION ? false : col.isEnd,
                    };
                });
                newRows[index] = newRow;
            });
            if (this.state.selectedAction === START_ACTION) {
                cell.isStart = !cell.isStart;
            } else if(this.state.selectedAction === END_ACTION) {
                cell.isEnd = !cell.isEnd;
            }
            newRows[row][col] = cell;
            this.setState({rows: newRows});
        }
    }

    handleMouseDown = () => {
        if (this.state.selectedAction === WALL_ACTION) {
            this.setState({isMouseDown: true});
        }
    }

    handleMouseUp = () => {
        this.setState({isMouseDown: false});
    }

    updateSelectedActionHandler = (actionType) => {
        this.setState({selectedAction: actionType});
    }

    render() {
        const {rows, selectedAction} = this.state;

        return (
            <div>
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
                                              isStart={cell.isStart}
                                              isEnd={cell.isEnd}
                                              handleClick={(row, col) => this.handleClick(row, col)}
                                              handleMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                              handleMouseDown={() => this.handleMouseDown()}
                                              handleMouseUp={() => this.handleMouseUp()}>
                                        </Cell>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <Navigation selectedAction={selectedAction} updateSelectedActionHandler={this.updateSelectedActionHandler} />
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
        isStart: false,
        isEnd: false,
    };
}

export default Grid
