/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'
import {createPeople, createPlanets, updatePeople, updatePlates} from '/actions'
import { StringDecoder } from 'string_decoder';

// declare a new router to include all the endpoints
const router = Router();


const verifyToken = (req: Request, res:Response, next:NextFunction)=>{
    const token = req.headers('Autorization');
    if(!token) return res.status(400).json('Access Denied');
    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string);
    req.user = decoded;
}



router.get('/user', safe(actions.getUsers));

export default router;
