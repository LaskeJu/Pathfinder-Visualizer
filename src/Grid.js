import React, {Component} from 'react'
import Cell from './Cell';
import Navigation from "./Navigation";
import './grid.css';
import {dijkstra, getShortestWay} from './algorithm/dijkstra';

const START_ACTION = 0;
const END_ACTION = 1;
const WALL_ACTION = 2;

class Grid extends Component {
    state = {
        rows: [],
        isMouseDown: false,
        selectedAction: START_ACTION,
        startCell: null,
        endCell: null,
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
                this.setState({startCell: cell});
            } else if(this.state.selectedAction === END_ACTION) {
                cell.isEnd = !cell.isEnd;
                this.setState({endCell: cell});
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

    animate = (cells, className, time, timeOffset = 0) => {
        cells.forEach((cell, index) => {
            if (cell.isVisited && !cell.isWall) {
                let ele = document.getElementById('row' + cell.row + 'col' + cell.col);
                if (ele) {
                    console.log('a');
                    setTimeout(() => {
                        ele.classList.add(className);
                    }, index * time + timeOffset);
                }
            }
        });
    }

    getVisitedCellsForAnimation = (rows) => {
        let visitedCells = [];
        rows.forEach((row) => {
            row.forEach((col) => {
                visitedCells.push(col);
            })
        })
        visitedCells = visitedCells.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        visitedCells = visitedCells.slice(0, visitedCells.indexOf(this.state.endCell));
        return visitedCells;
    }

    visualizeAlgorithm = () => {
        let {rows} = this.state;
        dijkstra(rows, this.state.startCell, this.state.endCell);
        let visitedCells = this.getVisitedCellsForAnimation(rows);
        let shortestWay = getShortestWay(this.state.startCell, this.state.endCell);

        this.animate(visitedCells, 'isVisited', 5);
        this.animate(shortestWay, 'isShortestWay', 10, 5*visitedCells.length);

    }

    render() {
        const {rows, selectedAction} = this.state;

        return (
            <div>
                <h2 className="text-center">Pathfinder Visualization</h2>
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
                <Navigation selectedAction={selectedAction}
                            updateSelectedActionHandler={this.updateSelectedActionHandler}
                            startVisualize={() => this.visualizeAlgorithm()} />
            </div>
        )
    }
}

const getGrid = () => {
    let rows = [];
    for (let row = 0; row < 32; row++) {
        let cols = [];
        for (let col = 0; col < 55; col++) {
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
        prevCel: null,
        distance: Infinity,
        isVisited: false,
    };
}

export default Grid
