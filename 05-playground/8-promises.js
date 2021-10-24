const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

//nested promises

add(1, 2).then((sum) => {
    console.log(sum)

    add(sum, 5).then((sum2) => {
        console.log(sum2)
    }).catch((e) => {
        console.log(e)
    })
}).catch((e) => {   
    console.log(e)
})

//promise chaining - you can return a promise from one of your then callbacks, allowing you to chain another then call on.

add(1, 1).then((sum) => {
    console.log(sum)        //2 - wait 2 seconds
    return add(sum, 4)      //return next promise from .then() callback
}).then((sum2) => {         //we chain the .then() using the return value
    console.log(sum2)       //6 - wait 2 seconds
}).catch((e) => {           //catch error
    console.log(e)
})
 
