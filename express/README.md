# express error handling
Express Error Handling

```javascript
//ExpressError.js

class ExpressError extends Error { 
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;
```

```javascript
//catchAsync.js

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}
//use it to wrap our async function
```
