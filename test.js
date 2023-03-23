function calc(n){
    return ((99/100)**n) * (1/100) * (1-(23/24)**n)
}

function calc10(n){
    return ((99/100)**n) * (1-(23/24)**n)
}

function sum(){
    let ans = 0
    for ( let i = 0; i < 10; i++) {
        ans += calc(i)
    }
    ans += calc10(10)

    return ans
}

console.log(sum())