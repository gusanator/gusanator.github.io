// funcion control -- despliega el contenido 
// const CONTROL = document.querySelector("#control")
function changeContent() {
    const BTNS = document.querySelectorAll(".control-btn");

    const switchActiveClass = (oldActive, newActive, nameClass) => {
        oldActive.classList.remove(nameClass);
        newActive.classList.add(nameClass);
    }

    BTNS.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // change active button 
            const CURRENT_ACTIVE_BTN = document.querySelector(".active-btn");
            const NEW_ACTIVE_BTN = e.target;
            switchActiveClass(CURRENT_ACTIVE_BTN, NEW_ACTIVE_BTN, "active-btn");

            // change active content
            const clickedBtn = e.target.dataset.id;
            const CURRENT_ACTIVE_CONTENT = document.querySelector(".active-content");
            const NEW_ACTIVE_CONTENT = document.getElementById(clickedBtn);
            switchActiveClass(CURRENT_ACTIVE_CONTENT, NEW_ACTIVE_CONTENT, "active-content");
        })
    })
};
changeContent();