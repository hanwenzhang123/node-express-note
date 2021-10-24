//async always return a promise, promise is fulfilled with the value returned from the function

const doWork = async() => { }   
console.log(doWork())   //Promise { undefined }

const doWork = async() => { return "Andrew" }   
console.log(doWork())   //Promise { "Andrew" }

const doWork = async() => { 
    throw new Error("something went wrong")
    return "Andrew" 
}   
doWork().then((result) => {
    console.log("result", result)
}).catch(e) => {
    console.log("e", e)     //"something went wrong"
}

//async-await.js
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {   //not passing the if check, will trigger reject
                return reject('Numbers must be non-negative')   //stop function execution
            }

            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {        //async await, things happen one at a time 
    const sum = await add(1, 99)       //await works like return with the promise call from add()
    const sum2 = await add(sum, 50)     //we get value from sum, we can chain multiple await
    const sum3 = await add(sum2, 3)    //we can use the value we can from sum2 then chain another await for updated value
    return sum3         //return the value for 3 async action for doWork() function
}

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log('e', e)
})
 
