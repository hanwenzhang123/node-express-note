//Browser HTTP Requests with Fetch
fetch("URL").then() - fetch data from URL then do something
response.json().then() - once JSON data has arrived then do something

//public/js/app.js
console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})


//Creating a Search Form

//public/js/app.jspublic/js/app.js
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})


//templaates/views/index.hbs
<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.png">
    <link rel="stylesheet" href="/css/styles.css">
</head>

<body>
    <div class="main-content">
        {{>header}}

        <p>Use this site to get your weather!</p>

        <form>
            <input placeholder="Location">
            <button>Search</button>
        </form>

        <p id="message-1"></p>
        <p id="message-2"></p>
    </div>

    {{>footer}}

    <script src="/js/app.js"></script>
</body>

</html>
