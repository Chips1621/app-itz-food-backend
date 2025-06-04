import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/users";

declare global{
  namespace Express{
    interface Request{
      userId: string,
      auth0Id: string
    }
  }
}//Fin de declare

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });
/*
  export const jwtParse = async (req: Request, res: Response, next: NextFunction)=>{
    const  { authorization } =   req.headers;

    if (!authorization || !authorization.startsWith('Bearer'))
      return res.sendStatus(401).json({ message: 'Authorización Denegada' })

    const token = authorization.split(" ")[1];
    console.log(token);

    try{
      const decoded = jwt.decode(token) as jwt.JwtPayload;

      const auth0Id = decoded.sub;

      const user = await User.findOne({ auth0Id })

      if (!user)
        return res.sendStatus(401).json({ message: 'Authorización Denegada' })

      req.auth0Id = auth0Id as string;
      req.userId = user._id.toString();
      next();
    
    }catch (error){
      return res.sendStatus(401).json({ message: 'Authorización Denegada' })
    }
  }*/

    export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Autorización denegada (no hay token)' });
  }

  const token = authorization.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded?.sub) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const auth0Id = decoded.sub;
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no registrado en la base de datos' });
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error('Error al parsear el token:', error);
    return res.status(401).json({ message: 'Autorización denegada (error interno)' });
  }
};
