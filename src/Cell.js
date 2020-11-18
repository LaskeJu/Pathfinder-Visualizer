import React, {Component} from 'react'

import './cell.css';

class Cell extends Component {

    render() {
        const {
            row,
            col,
            isWall,
            handleClick,
            handleMouseDown,
            handleMouseUp,
        } = this.props;
        const extraClassName = isWall ? 'isWall' : '';
        return (
            <div className={`cell ${extraClassName}`}
                 onMouseEnter={() => handleClick(row, col)}
                 onMouseDown={() => handleMouseDown()}
                 onMouseUp={() => handleMouseUp()}>
            </div>
        )
    }
}

export default Cell
