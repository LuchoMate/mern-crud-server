import express from 'express'
import dotenv from 'dotenv'

//import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const app = express()//se inicia la app como un metodo de express
dotenv.config()
app.use(cors());

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' }));

app.get('/', (req,res) => {
    res.send('Hello to memories API');
});

app.use('/posts', postRoutes)//middleware, rutas posts comenzaran con ese prefijo

const CONNECTION_URL = "mongodb+srv://admin1:vbnm1914@cluster0.46hc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})//evitar warnings
.then(()=> app.listen(PORT, () => console.log(`Servidor en ${PORT}`)))
.catch((error) => console.log(error));

//mongoose.set('useFindAndModify', false); ya viene asi por defecto