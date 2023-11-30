let hrefStyle =  document.head.querySelector("link");
let actualVersion = 1;
const v1= "../estilos/jStyle.css";
const v2="../estilos/iStyle.css";

const targetLogo = document.querySelector("#icon");

targetLogo.addEventListener("click",()=>{
    console.log("click");
    if(actualVersion==1){
        hrefStyle.href = v2;
        console.log("era v1 ahora es v2");
        actualVersion=2;
    }else if(actualVersion==2){
        hrefStyle.href=v1;
        console.log("era v2 ahora es v1")
        actualVersion=1;
    }
    else{
        return false;
    };
});

