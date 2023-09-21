// Defualt grid size is 16x16
function generateGrid(gridSize = 16) {
    const grid = document.querySelector('.grid');
    gridSize = Math.floor(gridSize);
    grid.style.display = 'flex';
    grid.style.flex = '1';
    grid.style.flexDirection = 'column';

    // Loop over the number of rows in the grid
    for (let i = 0; i < gridSize; i++) {
        // Create a new row
        const newRow = document.createElement("div");
        newRow.style.display = 'flex';
        newRow.style.flex = '1';

        // Loop over the number of columns in the grid
        for (let j = 0; j < gridSize; j++) {
            const newDiv = document.createElement("div");
            newDiv.style.width = `${512 / gridSize}px`;
            newDiv.style.background = 'lightgray';

            // Mouse over makes the square change to a random RGB color
            newDiv.addEventListener("mouseover", (e) => {
                if (mouseDown) {
                    e.target.style.background = `rgb(${getRandomColor()}, 
                        ${getRandomColor()}, ${getRandomColor()})`;
                }
                
                // Returns to original color after 2 seconds
                setTimeout(() => {
                    if (document.querySelector('.checkbox').checked) {
                        e.target.style.background = 'lightgray';
                    }
                }, 2000)
            });
            newRow.appendChild(newDiv);
        }

        // Add the new row to the grid
        grid.appendChild(newRow);
    }
}

// Returns a random value between 0 and 255
function getRandomColor() {
    return Math.floor(Math.random() * 256);
}

// Deletes all children in the grid
function deleteGrid() {
    const grid = document.querySelector('.grid');
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}

// Resets the grid
function resetGrid() {
    deleteGrid();
    generateGrid();
}

// Event listener for gridSize button, max value 1000
const gridSizeButton = document.querySelector('#grid-size');
gridSizeButton.addEventListener('click', () => {
    let newGridSize = Math.floor(
        parseInt(prompt("Enter a new grid size, up to 100")));
    newGridSize = newGridSize <= 100 ? newGridSize : 100;
    deleteGrid();
    generateGrid(newGridSize);
})

// Event listener for reset button
const resetGridButton = document.querySelector('#reset');
resetGridButton.addEventListener('click', () => {
    resetGrid();
})

// Keep track of mouse button being held down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

generateGrid();