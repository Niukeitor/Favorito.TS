
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { login } from './actions'
import { createUser, getPeople, getPeopleById, getPlanets, getPlanetById } from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/users', safe(createUser));
router.post('/login',safe(login));
router.get('/people', safe(getPeople));
router.get('/people/:id', safe(getPeopleById));
router.get('/planets', safe(getPlanets));
router.get('/planets/:id', safe(getPlanetById));

export default router;
