const express = require('express');
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express();
app.use(cors());
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     console.log('Successfully Rendering Browser')
//     res.status(200).send('<h1>Express Rendering...</h1>')
// })

// app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', require('./routes/postsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Running... on port ${port}`)
})