
export function dijkstra(rows, startCell, endCell) {
    startCell.distance = 0;
    startCell.isVisited = true;
    calculateNeighborsDistances(rows, startCell);
}

const calculateNeighborsDistances = (rows, cell) => {
    let neighbors = getNeighbors(rows, cell);
    neighbors.forEach((neighbor) => {
        neighbor.distance = cell.distance + 1;
        neighbor.prevCel = cell;
        neighbor.isVisited = true;
        calculateNeighborsDistances(rows, neighbor);
    });
}

const getNeighbors = (rows, cell) => {
    let neighbors = [];
    //get right neighbor
    if (cell) {
        if (typeof rows[cell.row] !== 'undefined' && typeof rows[cell.row][cell.col + 1] !== 'undefined') {
            let neighbor = rows[cell.row][cell.col + 1];
            if (cell.distance + 1 < neighbor.distance && !cell.isWall) {
                neighbors.push(neighbor);
            }
        }
        //get left neighbor
        if (typeof rows[cell.row] !== 'undefined' && typeof rows[cell.row][cell.col - 1] !== 'undefined') {
            let neighbor = rows[cell.row][cell.col - 1];
            if (cell.distance + 1 < neighbor.distance && !cell.isWall) {
                neighbors.push(neighbor);
            }
        }
        //get top neighbor
        if (typeof rows[cell.row - 1] !== 'undefined' && typeof rows[cell.row - 1][cell.col] !== 'undefined') {
            let neighbor = rows[cell.row - 1][cell.col];
            if (cell.distance + 1 < neighbor.distance && !cell.isWall) {
                neighbors.push(neighbor);
            }
        }
        //get bottom neighbor
        if (typeof rows[cell.row + 1] !== 'undefined' && typeof rows[cell.row + 1][cell.col] !== 'undefined') {
            let neighbor = rows[cell.row + 1][cell.col];
            if (cell.distance + 1 < neighbor.distance && !cell.isWall) {
                neighbors.push(neighbor);
            }
        }
    }
    return neighbors;
}

export function getShortestWay(startCell, endCell) {
    let cell = endCell;
    let path = [];
    do {
        if (!cell) {
            return path.reverse();
        }
        path.push(cell);
        cell = cell.prevCel;
    } while (cell !== startCell)
    return path.reverse();
}
