const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {     //result value is above [1, 4, 7], and error would be undefined
    if (error) {
        return console.log(error)
    }

    console.log(result)
})
