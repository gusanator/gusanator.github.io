class Calculadora {
    constructor() {
        this.numeros = document.querySelectorAll(".number");
        this.operadores = document.querySelectorAll("li.opc");
        this.pantalla = document.querySelector("#pantalla");
        this.input = document.querySelector("#inputs");
        this.clear = document.querySelector("#clear");
        this.equal = document.querySelector("#result");
        this.calc = [];

        this.eventPressNum = (num) => {
            if(this.calc.length==1){
                console.log(this.calc)
                return this.pantalla.innerHTML="ERROR press operation";
            }

            this.pantalla.innerHTML = "";
            this.printCalc();
            return this.input.innerHTML += +num.target.innerHTML;
        }

        this.eventClear = () => {
            for (let i = 1; i = this.calc.length; i++) {
                this.calc.pop();
            }
            console.log(this.calc)
            return this.clearBoth();
        }

// esta mal
        // this.eventEqual = () =>{
        //     if(this.calc.length==1){
        //         console.log(this.calc)
        //         return this.printCalc();
        //     }
        //     if(this.checkInput()){

        //         return this.printCalc()
        //     }
        // }

        this.eventNew = () =>{
            if( this.checkInput()||this.calc.length!==1){
                return this.splitDoMath()
            }
            return this.printCalc();
        }

        this.eventOpera = opera =>{
            if(this.calc.length===1){
                this.calc.push(opera.target.innerHTML);
                return this.printCalc();
            } else if(this.checkInput()){
                this.calc.push(Number(this.input.innerHTML),opera.target.innerHTML);
                this.clearBoth();
                return this.printCalc();
            }

        }
    }//fin constructor

    splitDoMath(){
        this.calc.push(Number(this.input.innerHTML));
        const xCalc = this.calc.slice(0);
        let ans = this.calc.shift();

        while(this.calc.length>0){
            let next = this.calc.splice(0,2);
            ans = this.doMath(next,ans);
        }
        this.eventClear();
        this.calc.push(ans);
        this.printCalc();
        return true;
    }
    printCalc() {
        this.pantalla.innerHTML = "";
        return this.calc.forEach(x => {
            this.pantalla.innerHTML += x;
        });
    }

    clearBoth() {
        this.pantalla.innerHTML = "";
        return this.input.innerHTML = "";
    }

    checkInput() {
        if (this.input.innerHTML == "") {
            this.pantalla.innerHTML = "ERROR: press number";
            return false;
        }
        return true;
    }
    doMath(newArr, acc) {
        switch (newArr[0]) {
            case "+":
                return acc += newArr[1];
                break;
            case "-":
                return acc -= newArr[1];
                break;
            case "*":
                return acc *= newArr[1];
                break;
            case "/":
                return acc /= newArr[1];
                break;
            default:
                false;
                break;
        }
    }

    escucha() {
        this.numeros.forEach(numero => {
            numero.addEventListener("click", this.eventPressNum);
        });

        this.operadores.forEach(oper=>{
            oper.addEventListener("click",this.eventOpera);
        });

        this.clear.addEventListener("click",this.eventClear);

        this.equal.addEventListener("click",this.eventNew);
    }
}

const miCalc = new Calculadora;
miCalc.escucha();