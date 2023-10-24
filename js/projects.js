const proyectos = document.querySelectorAll(".liProjects");
proyectos.forEach(li=>{
    li.addEventListener("click",()=>{
        const divX = li.querySelector('div');     
        divX.style.display!=""?divX.style.display="":divX.style.display="block";
    })
})