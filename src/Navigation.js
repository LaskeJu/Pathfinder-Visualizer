import React, {Component} from 'react'

class Navigation extends Component {

    render() {
        const {
            selectedAction,
            updateSelectedActionHandler,
            startVisualize
        } = this.props;

        return (
            <div>
                <button className={selectedAction === 0 ? 'active' : ''} onClick={() => updateSelectedActionHandler(0)}>Start</button>
                <button className={selectedAction === 1 ? 'active' : ''} onClick={() => updateSelectedActionHandler(1)}>End</button>
                <button className={selectedAction === 2 ? 'active' : ''} onClick={() => updateSelectedActionHandler(2)}>Wände</button>
                <button onClick={() => startVisualize()}>Visualizieren</button>
            </div>
        )
    }
}


export default Navigation
