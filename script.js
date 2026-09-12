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





