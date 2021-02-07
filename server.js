const express = require('express')
const connectDb = require('./config/db')
const app = express()

app.use(express.json({extended: false}))

connectDb()

app.use('/users', require('./routes/users'))
app.use('/contacts', require('./routes/contacts'))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
