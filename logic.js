
function getRandomArbitrary(max) {
    return parseInt(Math.random() * (max - 0) + 0)
  }
let cordObstacles = []
function varifyObstacle(cord,pp,pf) {
    for (let i = 0; i < cordObstacles.length; i++) {
        if(isEqual(cordObstacles[i],cord) || isEqual(cord,pp) || isEqual(cord,pf)){
            
            return true
        }
            
    }
    if (isEqual(cord,pp)) {
        return true
    }
    if (isEqual(cord,pf)) {
        return true
    }
    cordObstacles.push(cord)
    ////console.log(cord+" es diferente de "+pp+" y "+pf)
    return false
}
function isEqual(a, b)
{
    if (a instanceof Array && b instanceof Array)
    {
        if (a.length !== b.length) {
            return false;
        }
 
        for (var i = 0; i < a.length; i++)
        {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        }
 
        return true;
    }
 
    return a === b;
}
function exist(arr,val) {
    for (let i = 0; i < arr.length; i++) {
        
        if (isEqual(arr[i],val)) {
            return true
        }
    }
    return false
}
function actaulizePosition(after,before) {
    let celda = document.getElementById('laberint').rows[after[0]].cells;
    celda[after[1]].innerHTML = "<img class='void' src='images/pised.jpg' alt='' srcset=''>"
    
    celda = document.getElementById('laberint').rows[before[0]].cells;
    celda[before[1]].innerHTML = "<img class='void' src='images/player.png' alt='' srcset=''>"

}
/////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////

let Width=7
let Heignt=11
let posPlayer = [Width-1,0]//fila importante
let posFlag = [0,0]

function ok() {
    let c1,c2
    let laberint = "<table id='laberint'>"
    let obstacles = document.getElementById('Obstacles').value
    cordObstacles=[]
    Width = document.getElementById('Width').value
    Heignt = document.getElementById('Height').value

    c1 = getRandomArbitrary(Width)
    c2 = getRandomArbitrary(Heignt) 
    posPlayer = [c1,c2]
    let van =false
    while (!van) {
        c1 = getRandomArbitrary(Width)
        c2 = getRandomArbitrary(Heignt) 
        posFlag = [c1,c2]
        if (!isEqual(posPlayer,posFlag)) {
            van = true;
        }
    }
    ////console.log(posPlayer)
    ////console.log(posFlag)
    //console.log("\n----------------------------------------------------")
    
    //#region random
    for (let i = 0; i < obstacles; i++) {
        c1 = getRandomArbitrary(Width)
        c2 = getRandomArbitrary(Heignt)
        if (varifyObstacle([c1,c2],posPlayer,posFlag)) {
            i--
        }
    }
    for (let i = 0; i < obstacles; i++) {
        ////console.log(cordObstacles[i])
    }
    ////console.log("\n")
    let temp = []
    for (let i = 0; i < Width; i++) {
        laberint +="<tr>"
        for (let j = 0; j < Heignt; j++) {

            temp = [i,j]
            ////console.log(temp)
            laberint += "<td>"
            if (exist(cordObstacles,temp)) {
                laberint += "<img class='alert' src='images/alert.png' alt='' srcset=''></img>"
            }else
                if (isEqual(posPlayer,temp)) {
                    laberint += "<div id='player'>"
                    laberint += "<img id='backplayer' src='images/player.png' alt='' srcset=''>"
                    laberint += "</div>"
                } else if (isEqual(posFlag,temp)) {
                    laberint += "<img id='flag' src='images/flag.png' alt='' srcset=''></img>"
                }else{
                    ////console.log("normal")
                    laberint += "<img class='void' src='images/trrain.jpeg' alt='' srcset=''>"

                }
            laberint += "</td>"
        }
        laberint += "</tr>"
    }
    
    laberint += "</table>"
    document.getElementById('laberint').innerHTML = laberint

    //#endregion
    //execute(posPlayer,posFlag,Width,Heignt)
}
function execute(posPlayer,posFlag,Width,Heignt) {
    let option = document.getElementById('option').value
    let win=false
    let L,R,T,B
    let visited=[]
    let pending = []
    let iterations= 0
    while (!win) {
        if (iterations==(Width*Heignt)) {
            alert("No existe solucion")
            win = true
        }
        iterations++
        if (pending.length>0) {
            let opt = 0
            if (option == "profundidad") 
                opt = pending.length - 1
            
            actaulizePosition(posPlayer,pending[opt])
            //console.log("Actual: "+posPlayer+" Me muevo a: "+pending[0])
            posPlayer = pending[opt]         
            if (isEqual(posPlayer,posFlag)) {
                //alert("Llegaste a la meta")
                //console.log("Meta: "+posPlayer)
                win = true
            }
            if (option == "profundidad") 
                pending.pop()
            else
                pending.shift()

        }
        L = false
        R = false
        T = false
        B = false
        if(posPlayer[0]-1 >= 0 && !exist(cordObstacles,[posPlayer[0]-1,posPlayer[1]]) &&
            !exist(visited,[posPlayer[0]-1,posPlayer[1]])) {
                pending.push([posPlayer[0]-1,posPlayer[1]])
                visited.push([posPlayer[0]-1,posPlayer[1]])
                T = true;
        }
        if(posPlayer[0]+1 < Width  && !exist(cordObstacles,[posPlayer[0]+1,posPlayer[1]]) &&
            !exist(visited,[posPlayer[0]+1,posPlayer[1]])) {
                pending.push([posPlayer[0]+1,posPlayer[1]])
                visited.push([posPlayer[0]+1,posPlayer[1]])
                B = true;
        }
        if(posPlayer[1]-1 >= 0 && !exist(cordObstacles,[posPlayer[0],posPlayer[1]-1]) &&
        !exist(visited,[posPlayer[0],posPlayer[1]-1])) {
            pending.push([posPlayer[0],posPlayer[1]-1])
            visited.push([posPlayer[0],posPlayer[1]-1])
                L = true;
        }
        if(posPlayer[1]+1 < Heignt  && !exist(cordObstacles,[posPlayer[0],posPlayer[1]+1]) &&
            !exist(visited,[posPlayer[0],posPlayer[1]+1])) {
                pending.push([posPlayer[0],posPlayer[1]+1])
                visited.push([posPlayer[0],posPlayer[1]+1])
                R = true;
        }

        //console.log("L: "+L+"\nR: "+R+"\nT: "+T+"\nB: "+B)
    }
    //console.log("sali")
}
function run() {
    execute(posPlayer,posFlag,Width,Heignt)
}
ok() 
