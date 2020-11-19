import React, {Component} from 'react'
import { FaRunning } from 'react-icons/fa';
import { GiStairsGoal, GiBrickWall, GiInterstellarPath } from "react-icons/gi";
import { AiOutlineReload } from "react-icons/ai";

import './navigation.css';

class Navigation extends Component {

    refreshPage = () => {
        window.location.reload();
    }

    render() {
        const {
            selectedAction,
            updateSelectedActionHandler,
            startVisualize
        } = this.props;

        return (
            <div>
                <div className="navigation">
                    <button className={selectedAction === 0 ? 'button-start active' : 'button-start'} onClick={() => updateSelectedActionHandler(0)}>Start <FaRunning /></button>
                    <button className={selectedAction === 1 ? 'button-end active' : 'button-end'} onClick={() => updateSelectedActionHandler(1)}>End <GiStairsGoal /></button>
                    <button className={selectedAction === 2 ? 'button-wall active' : 'button-wall'} onClick={() => updateSelectedActionHandler(2)}>Wall <GiBrickWall /></button>
                    <button className="button-visualize" onClick={() => startVisualize()}>Visualize <GiInterstellarPath /></button>
                    <button className="button-refresh" onClick={this.refreshPage}>Reset <AiOutlineReload /></button>
                </div>
                <div className="text-center">
                    <span className="p">Visited Fields<span className="label visitedField" /></span>
                    <span className="p">Unvisited Fields<span className="label normalField" /></span>
                    <span className="p">Shortest Way Fields<span className="label pathField" /></span>
                </div>
            </div>
        )
    }
}


export default Navigation
