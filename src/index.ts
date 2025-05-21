import express, {Request, Response}  from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';

//Importamos el archivo de ruta de usuarios
import userRoutes from './routes/userRoutes';

//Importamos la ruta de restaurantes
import restauranteRoutes from './routes/restauranteRoutes';

mongoose.connect(process.env.DB_CONNECTION_STRING as string)
    .then( ()=>{
        console.log("Base de datos conectada")
    })

    //Configuración del Cloudinary
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/health', async (req: Request, res: Response)=>{
    res.send({message: "¡servidor OK!"})
})

app.use('/api/user', userRoutes);
app.use("/api/restaurante", restauranteRoutes);

const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log("App corriendo en el puerto:" + port)
})
