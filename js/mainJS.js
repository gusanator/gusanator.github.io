const elementsAnchor = document.querySelectorAll(".proj");
const elementsH2 = document.querySelectorAll("li.projects h2");
const colores = ['#d1e8fa', '#051c2e', '#051c2eaa', '#9fa3f4', '#6e19d7'];

function getRandomColor() {
    const random = Math.floor(Math.random() * colores.length);
    return colores[random];
}
function pinta(antes, despues, actual, element) {
    element.innerHTML = antes;
    element.appendChild(actual);
    element.innerHTML += despues;

    return despues == "" ? true : false;
};// ejecuta
function doPinta(objDocument){
    objDocument.forEach(e => {
        let isTheEnd = false;
        function doString(string) {
            for (let x = 0; x < string.length; x++) {
                const antes = string.slice(0, x);
                const despues = string.slice(x + 1, x.length)
    
                const actual = document.createElement("span");
                actual.innerHTML = string[x];
                actual.style.color = getRandomColor();
                actual.style.fontSize = "6rem";
    
                setTimeout(() => {
                    isTheEnd = pinta(antes, despues, actual, e);
                    // console.log(isTheEnd);
                    // ---vuelve a llamar a doString
                    if (isTheEnd) {
                        setTimeout(() => {
                            doString(string);
                        }, 700);
                    }
                    // --
                }, (x * 800));
            }
            return string;
        };
        console.log(doString(e.innerHTML));
    });
}
doPinta(elementsH2)


// set eventListener li.projects
document.querySelectorAll("li.projects").forEach(h2 => {
    const anchor = h2.querySelector("a.proj");
    anchor.hidden = true;

    h2.addEventListener("click", () => {
        const anchor = h2.querySelector("a.proj");
        if (anchor.hidden) {
            anchor.hidden = false;
            anchor.style.color=getRandomColor();
        } else {
            // clearInterval(luces)
            anchor.hidden = true;
        };
    });
});