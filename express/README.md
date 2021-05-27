# express error handling
Express Error Handling

```javascript
//ExpressError.js

class ExpressError extends Error { 
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode
    }
}
module.exports = ExpressError;
```
