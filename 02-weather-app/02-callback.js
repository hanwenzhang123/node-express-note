//callback 
- a function we provide as an argument to another function with the intention of having it called later on.

//asynchronous - like setTimeout() is going to call its function at some point in the future
setTimeout(() => {
    console.log('Two seconds are up')
}, 2000)

//however, not all callbacks are asynchronous calls like map() filter() etc
const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => {
    return name.length <= 4
})


//synchronous code example
const geocode = (address, callback) => {
      const data = {
          latitude: 0,
          longitude: 0
      }
      
      return data
}
const data = geocode('Philadelphia')
console.log(data)
//{latitude: 0, longitude: 0}


//asynchronous code 
//example 1 - undefined
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        return data   //return is for the value in setTimeout() but not geocode()
    }, 2000)
}
const data = geocode('Philadelphia')
console.log(data)   //undefined

//example 2 - using callback
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data)    //just as the callback, we pass the data as the first argument that we return data
    }, 2000)
}

geocode('Philadelphia', (data) => {   //second args works as the callback above
    console.log(data)   //wait 2 seconds then {latitude: 0, longitude: 0}
})


//Challenge - add function
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})


