const express = require('express');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// const dotenv = require('dotenv');
const helmet = require('helmet')
const morgan = require('morgan');
const { AuthRouter } = require('./Routes/auth.route');
const { UserRouter } = require('./Routes/user.route');
const {PostRouter} = require('./Routes/post.route');
require('dotenv').config();
const app = express();

// middlewares
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

app.get('/',(req,res)=>
{
    res.send('Welcome to Home page of social app  Face-Book')
})





// All Routes
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))


app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)



// const port = 8080 || process.env.PORT 

app.listen(process.env.PORT,()=>
{
    console.log('listening on port',process.env.PORT)
})


