npm i multer
take the file, grab its binary data and send that off to the server.

//src/index.js
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')  //import multer
const upload = multer({
    dest: 'images',   //save to the image directory (destination)
    limits: {   //validation file size
        fileSize: 1000000   //number in bytes
    },
    fileFilter(req, file, cb) {   //restricting the file type
      //file.originalname.endsWidth(".pdf") - pdf files
        if (!file.originalname.match(/\.(doc|docx)$/)) {    //regular expression, here only accept word files
            return cb(new Error('Please upload a Word document')) //send back an error if something goes wrong
        }

        cb(undefined, true)   //callback function
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {  //add a middleware for upload, endpoint where the user can upload the image
    res.send()
}, (error, req, res, next) => {   //add function for express error handling 
    res.status(400).send({ error: error.message })
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


//router/user.js
const multer = require('multer') 

const upload = multer({
  //dest: "avatars",  //destination directory
    limits: { 
        fileSize: 1000000
    },
    fileFilter(req, file, cb) { //request being made, information about the file being uploaded, cb when we done filtering the file.
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {  //match files jpg|jpeg|png
            return cb(new Error('Please upload an image'))  //cd restart the function execution, if not macth, we return a error
        }

        cb(undefined, true) //when things goes well
      
      //callback tell multer when we done filtering the file
//         cb(new Error('Something wrong'))  //send an error back
//         cb(undefined, true) //accept the file
//         cb(undefined, false)  //silently reject the upload
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {  //make sure the user authenticated
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer    //req.user.avatar = req.file.buffer - set the avatar
    await req.user.save()   //save image to user profile
    res.send()    //send 200
}, (error, req, res, next) => {   //error handling
    res.status(400).send({ error: error.message })    //send the error message back
})

router.delete('/users/me/avatar', auth, async (req, res) => {   //delete the avatar that previously uploaded
    req.user.avatar = undefined   //set the user.avatar undefined
    await req.user.save()   //save the change
    res.send()    //send 200
})

router.get('/users/:id/avatar', async (req, res) => {   //fetching the avatar for the specific user
    try {
        const user = await User.findById(req.params.id)   //get the user

        if (!user || !user.avatar) {    //if no user or the user does not have an image
            throw new Error()   //throw the error
        }

        res.set('Content-Type', 'image/png')    //tell what kind of data to get back
        res.send(user.avatar)     //send the avatar for the user
    } catch (e) {
        res.status(404).send()    //send 404 if error
    }
})

//add to userSchema in the models
avatar: {
        type: Buffer
    }
