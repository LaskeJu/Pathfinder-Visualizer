import React, {Component} from 'react'
import { FaRunning } from 'react-icons/fa';
import { GiStairsGoal } from "react-icons/gi";

import './cell.css';

class Cell extends Component {

    render() {
        const {
            row,
            col,
            isWall,
            isStart,
            isEnd,
            handleClick,
            handleMouseEnter,
            handleMouseDown,
            handleMouseUp,
        } = this.props;
        const extraClassName = isWall ? 'isWall' : isStart ? 'isStart' : isEnd ? 'isEnd' : '';
        return (
            <div id={`row${row}col${col}`} className={`cell ${extraClassName}`}
                 onClick={() => handleClick(row, col)}
                 onMouseEnter={() => handleMouseEnter(row, col)}
                 onMouseDown={() => handleMouseDown()}
                 onMouseUp={() => handleMouseUp()}>
                {isStart && <FaRunning />}
                {isEnd && <GiStairsGoal />}
            </div>
        )
    }
}

export default Cell
