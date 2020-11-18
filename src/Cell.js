import React, {Component} from 'react'

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
            <div className={`cell ${extraClassName}`}
                 onClick={() => handleClick(row, col)}
                 onMouseEnter={() => handleMouseEnter(row, col)}
                 onMouseDown={() => handleMouseDown()}
                 onMouseUp={() => handleMouseUp()}>
            </div>
        )
    }
}

export default Cell
