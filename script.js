//selecting the squares container
const container = document.querySelector(".container");

//generating divs
for (i=0; i<256; i++){
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("style", "border:1px solid black; width:18px; height:18px;");
    container.appendChild(square);  
}


