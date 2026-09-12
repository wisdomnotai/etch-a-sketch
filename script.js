//selecting the squares container
const container = document.querySelector(".container");


//generating divs byb size
const createGrid = (size) => {
    for (let i=0; i<size; i++){
    const row = document.createElement("div");
    row.classList.add("row");
    for(let j=0; j<size; j++){
        const square = document.createElement("div");
        square.classList.add("grid-square");
        row.appendChild(square);
    }
    container.appendChild(row);  
}
}

//clearing previous grid
const clearGrid = () =>{
    container.innerHTML = ""
}

//selecting the button element
const button = document.querySelector(".popup");

button.addEventListener("click", () => {
    let size = prompt("How many squares per side? (max 100): ");
    size = Number(size);

    if (size>100){
        alert("Please enter a number below 100: ");
        return;
    }
    clearGrid();
    createGrid();
})
