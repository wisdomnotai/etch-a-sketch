//selecting the squares container
const container = document.querySelector(".container");

//generating divs
for (let i=0; i<16; i++){
    const row = document.createElement("div");
    row.classList.add("row");
    for(let j=0; j<16; j++){
        const square = document.createElement("div");
        square.classList.add("grid-square");
        row.appendChild(square);
    }
    container.appendChild(row);  
}


