class Calculadora {
    constructor() {
        this._numeros = document.querySelectorAll("li.number");
        this._operaciones = document.querySelectorAll("li.opc");
        this._clear = document.querySelector("#clear");
        this._equal = document.querySelector("#result");
        this._pantalla = document.querySelector("#pantalla");
        this._input = document.querySelector("#inputs");
        this._calc = [];
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
    clearBoth() {
        this._pantalla.innerHTML = "";
        return this._input.innerHTML = "";
    }
    clearAll() {
        for (let i = 1; i = this._calc.length; i++) {
            this._calc.pop();
        }
        console.log(this._calc)
        return this.clearBoth();
    }
    checkInput() {
        if (this._input.innerHTML == "") {
            this._pantalla.innerHTML = "ERROR: press number";
            return false;
        }
        return true;
    }

    printCalc() {
        this._pantalla.innerHTML = "";
        return this._calc.forEach(x => {
            this._pantalla.innerHTML += x;
        });
    }
    pressNum(num) {
        this._pantalla.innerHTML = "";
        this.printCalc();
        return this._input.innerHTML += num;
    }
    pressOper(oper) {
        if (this.checkInput()) {
            this._calc.push(Number(this._input.innerHTML), oper);
            this.clearBoth();
            return this.printCalc();
        }
        return false;
    }
    pressClear() {
        return this.clearAll();
    };
    pressEqual() {
        if (this.checkInput()) {
            this._calc.push(Number(this._input.innerHTML));
            const xcalc = this._calc.slice(0);
            let ans = this._calc.shift();
            while (this._calc.length > 0) {
                let next = this._calc.splice(0, 2);
                ans = this.doMath(next, ans);
            }
            this.clearAll();
            this._pantalla.innerHTML=xcalc.join("")+"="+ans;
            return console.log(ans)
        }
    }



    static turnOn(obj) {
        obj._numeros.forEach(keyNum => {
            keyNum.addEventListener("click", () => {
                obj.pressNum(keyNum.innerHTML);
            });
        });
        obj._clear.addEventListener("click", () => {
            obj.clearAll();
        })

        obj._operaciones.forEach(key => {
            key.addEventListener("click", () => {
                obj.pressOper(key.innerHTML);
            });
        })

        obj._equal.addEventListener("click",()=>{
            obj.pressEqual();
        })
    }

    // static turnOff(obj){
    //     obj._numeros.forEach(keyNum => {
    //         keyNum.removeEventListener("click",obj.pressOper(keyNum.innerHTML));
    //     })

    //     obj._clear.removeEventListener("click",obj.clearAll)

    //     obj._operaciones.forEach(key => {
    //         key.removeEventListener("click",obj.pressOper(key.innerHTML))
    //     })

    //     obj._equal.removeEventListener("click",()=>{
    //         obj.pressEqual();
    //     })
    // }
}

const xx = new Calculadora();
Calculadora.turnOn(xx);
// Calculadora.turnOff(xx);