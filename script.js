// Defualt grid size is 16x16
function generateGrid(gridSize = 256) {
    const grid = document.querySelector('.grid');
    const numCol = Math.floor(Math.sqrt(gridSize));
    grid.style.display = 'flex';
    grid.style.flex = '1';
    grid.style.flexDirection = 'column';

    // Loop over the number of rows in the grid
    for (let i = 0; i < numCol; i++) {
        // Create a new row
        const newRow = document.createElement("div");
        newRow.style.display = 'flex';
        newRow.style.flex = '1';

        // Loop over the number of columns in the grid
        for (let j = 0; j < numCol; j++) {
            const newDiv = document.createElement("div");
            newDiv.style.width = `${1024 / Math.floor(Math.sqrt(gridSize))}px`;
            newDiv.style.background = 'green';
            newDiv.style.border = 'solid black 1px';

            // Mouse over makes the square change to a random RGB color
            newDiv.addEventListener("mouseover", (e) => {
                e.target.style.background = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;

                // Returns to original color after 2 seconds
                setTimeout(() => {e.target.style.background = 'green';}, 2000)
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

function deleteGrid() {
    const grid = document.querySelector('.grid');
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}

// Event listener for gridSize button, max value 1000
const gridSizeButton = document.querySelector('#grid-size');
gridSizeButton.addEventListener('click', () => {
    let newGridSize = Math.floor(
        parseInt(prompt("Enter a new grid size (for best results it should be a square)")));
    newGridSize = newGridSize <= 1000 ? newGridSize : 1000;
    deleteGrid();
    generateGrid(newGridSize);
})

generateGrid();