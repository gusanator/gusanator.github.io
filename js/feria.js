const boton = document.querySelector("#calcular");
const TOTAL = 200;
const actasInput = document.querySelectorAll(".actasInput");

const puntoObj = document.querySelector("#punto");
const puntoInputs = puntoObj.querySelectorAll("input"); 

const timeObj = document.querySelector("#time");
const timeInputs = timeObj.querySelectorAll("input");

// ----------
const atenciones = document.querySelectorAll(".atencionesInput");

const femeninos=[];
const masculinos=[];
const femBoy = [];

const acompleta = (input) =>{
    const total = 25;
    return Number(total-input);
};

for(let j=1;j<atenciones.length;j+=3){
    femeninos.push(atenciones[j]);
    femBoy.push(atenciones[j].value);
};
for(let j=0;j<atenciones.length;j+=3){
    masculinos.push(atenciones[j]);
    femBoy.push(atenciones[j].value);
};
// ----------


boton.addEventListener("click", () => {
    const pag1 = document.querySelector("#pagUno");
    const datos1 = [];
    const pag2 = document.querySelector("#pagDos");
    const datos2 = [];
    const pag3 = document.querySelector("#pagTres");
    const datos3 = [];
    const pag4 = document.querySelector("#pagCuatro");
    const datos4 = [];
    const pag5 = document.querySelector("#pagCinco");
    const datos5 = [];
    const pag6 = document.querySelector("#pagSeis");
    const datos6 = [];
    const pag7 = document.querySelector("#pagSiete");
    const datos7 = [];
    const pag8 = document.querySelector("#pagOcho");
    const datos8 = [];

    const maxSuma = [];

    for (let y = 0; y < 6; y++) {
        datos1.push(pag1[y].value);
        datos2.push(pag2[y].value);
        datos3.push(pag3[y].value);
        datos4.push(pag4[y].value);
        datos5.push(pag5[y].value);
        datos6.push(pag6[y].value);
        datos7.push(pag7[y].value);
        datos8.push(pag8[y].value);
    };

    function suma() {
        for (let x = 0; x < 6; x++) {
            maxSuma.push(Number(datos1[x]) + Number(datos2[x]) + Number(datos3[x]) + Number(datos4[x]) + Number(datos5[x]) + Number(datos6[x]) + Number(datos7[x]) + Number(datos8[x]));
        }
        return maxSuma;
    };
    suma();
    const maxAtenciones = maxSuma.splice(3);
    maxSuma.push(maxAtenciones.pop());

    // conso le.log(`Na: Ma:${maxSuma[1]} De:${maxSuma[2]} H:${maxAtenciones[0]} F:${maxAtenciones[1]} Su:${maxSuma[3]}`);


    function sumaActas(){
        let superSuma=0;
        maxSuma.forEach(actas=>{
            superSuma+=actas
        })
        return superSuma;
    }

    const punto = [];
    for(let z=0;z<3;z++){
        punto.push(puntoInputs[z].value);
    }
    const horas=[];
    for(let w=0;w<4;w++){
        horas.push(timeInputs[w].value)
    }
    const totalActas=sumaActas();


// --------atenciones
let sumFem=0;
let sumBoy=0;
femeninos.forEach(fem=>{
    sumFem+=Number(fem.value);
})
masculinos.forEach(boy=>{
    sumBoy+=Number(boy.value);
});

// fin atenciones

function check() {
    let checkUno = 0;
    let checkDos = 0;
    for (let i = 0; i < 4; i++) {
        checkUno += maxSuma[i]
    };
    for (let i = 0; i < 2; i++) {
        checkDos += maxAtenciones[i];
    };
    return checkUno <= totalActas && checkDos <= TOTAL && sumBoy+sumFem<=totalActas && totalActas<=TOTAL? true : false;
};
console.log(check())

    console.log(`
    Punto: ${puntoInputs[0].value}, ${puntoInputs[1].value}, ${puntoInputs[2].value}
    Hora de llegada: ${horas[0]}
    Hora de instalación: ${horas[1]}
    Hora Inicio: ${horas[2]}
    Hora Fin: ${horas[3]}
    *ACTAS*
    Nacimiento: ${maxSuma[0]}
    Matrimonio: ${maxSuma[1]}
    Defunción: ${maxSuma[2]}
    Sucias: ${maxSuma[3]}
    TOTAL: ${totalActas}
    *ATENCIÓNES*
    HOMBRES: ${sumBoy}
    MUJERES: ${sumFem}`);

    if(check()){
        const printAll = document.querySelector("#resultados");
        const ans = 
`Punto: ${puntoInputs[0].value}, ${puntoInputs[1].value}, ${puntoInputs[2].value}
Hora de llegada: ${horas[0]}
Hora de instalación: ${horas[1]}
Hora Inicio: ${horas[2]}
Hora Fin: ${horas[3]}
*ACTAS*
Nacimiento: ${maxSuma[0]}
Matrimonio: ${maxSuma[1]}
Defunción: ${maxSuma[2]}
Sucias: ${maxSuma[3]}
TOTAL: ${totalActas}
*ATENCIÓNES*
HOMBRES: ${sumBoy}
MUJERES: ${sumFem}`
        printAll.innerHTML = ans;
    }else{
        alert("CHECA TUS RESPUESTAS");
    }
});//fin de addEventListener

const spans = document.querySelectorAll(".spanActas")
actasInput.forEach((acta,index)=>{
    acta.addEventListener("input",()=>{
        spans[index].innerHTML = acta.value;
    });
});//fin de addEventListener


femeninos.forEach((fem,index)=>{
    fem.addEventListener("input",()=>{
        masculinos[index].value = acompleta(Number(fem.value))
    });
});//fin addEventListener