// Elemento div.salir 
const elementosSalir = document.querySelectorAll(".salir");
const footerDiv = document.querySelector("footer");
elementosSalir.forEach(salida=>{
    const padre = salida.parentNode;
    salida.addEventListener("click",()=>{
        padre.toggleAttribute("exit");
    });
});


footerDiv.addEventListener("click", () => {
    document.querySelector("#pelilista").toggleAttribute("exit");
});

// Elementos content 
function getSelectedGenre() {
    return document.querySelector("#genres").value;
};


function showPeli(title, poster) {  
    document.querySelector("#peliPoster").innerHTML = "";
    document.querySelector("#peliLetras").innerHTML = "";

    const imagen = document.createElement("img");
    imagen.alt = title;
    imagen.src = "https://image.tmdb.org/t/p/w500/"+poster;

    const titulo = document.createElement("h2");
    titulo.innerText = title;

    document.querySelector("#peliPoster").append(imagen);
    document.querySelector("#peliLetras").append(titulo);
    return true;
}

//pagina de peliculas
const globalUrl = "https://api.themoviedb.org/3/";
const AppKey = "?api_key=541b32a690bf48085876fc3c6173c24e";
const endPoint = "discover/movie";
const promesaPeliculas = async (x = 1) => {
    const params = `&with_genres=${getSelectedGenre()}&page=${x}`;
    try {
        const response = await fetch(globalUrl + endPoint + AppKey + params);
        if (response.ok) {
            return response.json(); // Retornar el JSON aquí
        } else {
            throw new Error("No hay conexión");
        }
    } catch (error) {
        throw error;
    };
};

async function recorrePagina(numPag = 1, vieneBack=false) {

    const objPagina = await promesaPeliculas(numPag);
    console.log(objPagina);
    const paginaActual = objPagina.page;
    const lista = objPagina.results;
     
    let indexLista;
    vieneBack ? indexLista = lista.length - 1 : indexLista = 0;

    function recorreListaNext() {
        if (indexLista + 1 < lista.length) {
            indexLista++;
            // console.log(lista[indexLista].title);
            showPeli(lista[indexLista].title,lista[indexLista].poster_path);
        } else {
            if (paginaActual === 101) {
                return console.log("fin fin");
            };
            document.querySelector("#nextPeli").removeEventListener("click", recorreListaNext);
            document.querySelector("#backPeli").removeEventListener("click", recorreListaBack);
            console.log("acaba pag");
            return recorrePagina(paginaActual + 1);
            // return document.querySelector("#nextPeli").removeEventListener("click", recorreListaNext);
        };
    };
    function recorreListaBack() {
        if (indexLista - 1 >= 0) {
            indexLista--;
            // console.log(lista[indexLista].title);
            showPeli(lista[indexLista].title,lista[indexLista].poster_path);
        } else {
            if (paginaActual === 1) {
                return console.log("fin fin");
            };
            document.querySelector("#nextPeli").removeEventListener("click", recorreListaNext);
            document.querySelector("#backPeli").removeEventListener("click", recorreListaBack);
            console.log("acaba pag");
            return recorrePagina(paginaActual - 1,true);
            // return document.querySelector("#backPeli").removeEventListener("click", recorreListaBack);
        };
    };

    // console.log(lista[indexLista].title);
    showPeli(lista[indexLista].title,lista[indexLista].poster_path);

    document.querySelector("#nextPeli").addEventListener("click", recorreListaNext);
    document.querySelector("#backPeli").addEventListener("click", recorreListaBack);
    return true;
};

recorrePagina(1);



document.querySelector("#genres").addEventListener("change", () => {
    const next = document.querySelector("#nextPeli");
    const back = document.querySelector("#backPeli");
    next.replaceWith(next.cloneNode(true));
    back.replaceWith(back.cloneNode(true));
    
    recorrePagina();
});

const endUrl = "genre/movie/list";
const getGenres = async () => {
    try {
        const respuesta_1 = await fetch(globalUrl + endUrl + AppKey);
        if (respuesta_1.ok) {
            const valor = await respuesta_1.json();
            valor.genres.forEach(genero => {
                const opc = document.createElement("option");
                opc.value = genero.id;
                opc.text = genero.name;
                document.querySelector("#genres").appendChild(opc);
            });
            return true;
        } throw new Error("peticion no hecha")
    } catch (error) { throw error }
};
getGenres();

document.querySelector("#peliPoster").addEventListener("click",(e)=>{
    const figura = document.createElement("figure");
    const caption = document.createElement("figcaption");

    caption.innerText = e.target.alt;
    figura.append(e.target);
    figura.append(caption);
    return document.querySelector(".lista").appendChild(figura);

});