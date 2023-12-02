const REPORTE = document.querySelectorAll('form');
const PUNTO = [];
const BOTONES_NEXT = document.querySelectorAll("input.nextButton");
const PRINT_PUNTOS = document.querySelectorAll("li.punto");
const MENSAJE = document.querySelector("#mensaje");
const BOTON_MENSAJE = document.querySelector("#btnMensaje");
//hidden hojas
for (let z = 1; z < REPORTE.length; z++) {
    REPORTE[z].hidden = true;
};
//return arrayValores del FORM actual
function getArrayValores(objElements) {
    const ans = [];
    for (let y = 0; y < objElements.length - 2; y++) {
        ans.push(objElements[y].value)
    }
    return ans;
}
function selectFocus() {
    for (let x = 0; x < PRINT_PUNTOS.length; x++) {
        const activo = REPORTE[x].hidden == false ? true : false;

        if (activo) {
            PRINT_PUNTOS[x].style.fontSize = "2rem";
            PRINT_PUNTOS[x].style.color = "black";
        } else {
            PRINT_PUNTOS[x].style.fontSize = "";
            PRINT_PUNTOS[x].style.color = "";

        }
    };
}
selectFocus();

// EVENTs LISTENER
function escuchaSpans() {
    const inputActas = document.querySelectorAll(".inputActa");
    const inputSpans = document.querySelectorAll(".spanNumber");

    for (let i = 0; i < inputActas.length; i++) {
        inputActas[i].addEventListener("input", () => {
            inputSpans[i].innerHTML = inputActas[i].value;
            inputSpans[i].style.color = "rgb(98, 8, 8)";
        });
    }
    return true;
}
escuchaSpans();

for (let j = 0; j < REPORTE.length; j++) {
    REPORTE[j].addEventListener("submit", (event) => {
        event.preventDefault();
        const hoja = new ReporteHoja(getArrayValores(REPORTE[j].elements));

        console.log(hoja.check());
        // if check()
        hoja.check() ? PUNTO[j] = hoja : alert("REVISA TUS VALORES");

        // --------------PRINT_PUNTOS
        for (let i = 0; i < PRINT_PUNTOS.length; i++) {
            if (PUNTO[i] !== undefined) {
                PRINT_PUNTOS[i].style.backgroundColor = "green";
            } else {
                PRINT_PUNTOS[i].style.backgroundColor = "rgb(98, 8, 8)";
            }
        }
        // -------------------FIN PRINT_PUNTOS

        console.log(PUNTO)
    });
};

for (let z = 0; z < BOTONES_NEXT.length; z++) {
    BOTONES_NEXT[z].addEventListener("click", () => {
        if (REPORTE[z + 1] == undefined) {
            REPORTE[z].hidden = true;//.style.display="none";
            REPORTE[0].hidden = false;
        } else {
            REPORTE[z].hidden = true;
            REPORTE[z + 1].hidden = false;
        }
        selectFocus();
    });


};

BOTON_MENSAJE.addEventListener("click", () => {
    ReporteHoja.pirntMensaje(PUNTO)
});
//FIN EVENTs LISTENER

class ReporteHoja {
    constructor(arrayValores) {
        this._actas = [];
        this._atenciones = [];
        for (let x = 0; x < arrayValores.length; x++) {
            if (x >= 4) {
                this._atenciones.push(+arrayValores[x])
            } else {
                this._actas.push(+arrayValores[x]);
            }
        }
    }//fin constructor

    get actas() {
        return this._actas
    }
    get atenciones() {
        return this._atenciones
    }
    check() {
        let sumaActas = 0;
        let sumNaMaDe = 0;
        let sumaAtenciones = 0;
        for (let x of this._actas) {
            sumaActas += x;
        }
        for (let x = 0; x < this._actas.length - 1; x++) {
            sumNaMaDe += this._actas[x];
        }
        for (let y of this._atenciones) {
            sumaAtenciones += y
        }
        if (sumNaMaDe == sumaAtenciones && sumaActas <= 25 && sumaAtenciones <= 25) {
            return true;
        } else {
            return false;
        }
    }

    static pirntMensaje(ArrayPunto) {
        function sumaTodo() {
            let TOTAL_ACTAS = 0;
            let TOTAL_ATENCIONES = 0;
            let SOBRAN = 0;

            for (let hoja of ArrayPunto) {
                for (let acta of hoja.actas) {
                    TOTAL_ACTAS += acta;
                }
                for (let persona of hoja.atenciones) {
                    TOTAL_ATENCIONES += persona;
                }
            }
            SOBRAN = 200 - TOTAL_ACTAS;
            return [TOTAL_ACTAS, TOTAL_ATENCIONES, SOBRAN];
        }

        function sumaActas() {
            let na = 0;
            let ma = 0;
            let de = 0;
            let su = 0;
            let fem = 0;
            let boy = 0;
            for (let hoja of PUNTO) {
                na += hoja.actas[0];
                ma += hoja.actas[1];
                de += hoja.actas[2];
                su += hoja.actas[3];

                fem += hoja.atenciones[0];
                boy += hoja.atenciones[1];
            }
            return [na, ma, de, su, fem, boy];
        }

        const total_actas = sumaActas();
        const total_total = sumaTodo();
        MENSAJE.innerHTML =
`*ACTAS*
    Nacimiento:${total_actas[0]}
    Matrimonio:${total_actas[1]}
    Defunción:${total_actas[2]}
    Sucias:${total_actas[3]}
*ATENCIÓNES*
    Femenino:${total_actas[4]}
    Masculino:${total_actas[5]}
*TOTAL ACTAS:*${total_total[0]}
*TOTAL ATENCIÓNES:*${total_total[1]}
*SOBRAN:*${total_total[2]}`
    }
}//fin clase
