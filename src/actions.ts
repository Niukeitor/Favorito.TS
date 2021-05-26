import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { People } from './entities/People'
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'


export const createUser = async (req: Request, res:Response): Promise<Response> => { 

	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const user = await getRepository(User).find();
		return res.json(user);
}

export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
    const user = await getRepository(User).findOne(req.params.id);
	if(user) {
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }
	return res.status(404).json({msg: "No user found."});
}

export const deleteUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(User).findOne(req.params.id);
    if(!users) {
        return res.json({ msg :"This user doesn't exist."});
    }else {
    const users = await getRepository(User).delete(req.params.id);
		return res.json(users);
    }	
}

export const createPeople = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.height) throw new Exception("Please provide a height")
	if(!req.body.mass) throw new Exception("Please provide a mass")
    if(!req.body.hairColor) throw new Exception("Please provide a hair color")
    if(!req.body.skinColor) throw new Exception("Please provide a skin color")
    if(!req.body.eyeColor) throw new Exception("Please provide an eye color")
    if(!req.body.birthYear) throw new Exception("Please provide a birth year")
    if(!req.body.gender) throw new Exception("Please provide a gender")
    
	const newChar = getRepository(People).create(req.body);  
	const results = await getRepository(People).save(newChar);
	return res.json(results);
}

export const getPeople = async (req: Request, res: Response): Promise<Response> =>{
		const people = await getRepository(People).find();
		return res.json(people);
}

export const getPeopleById = async (req: Request, res: Response): Promise<Response> =>{
        const people = await getRepository(People).findOne(req.params.id);
        if(!people) throw new Exception("People with this Id doesn't exist.");
		return res.json(people);
}

export const updatePeople = async (req: Request, res:Response): Promise<Response> =>{
    const charRepo = getRepository(People) 
	const char = await charRepo.findOne(req.params.id);
	if(!char) throw new Exception("People with this id doesn't exist.");
	
	charRepo.merge(char, req.body); 
	const results = await charRepo.save(char);
	return res.json(results);
}

export const createPlanets = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.diameter) throw new Exception("Please provide a diameter")
	if(!req.body.rotationPeriod) throw new Exception("Please provide a rotation period")
    if(!req.body.orbitalPeriod) throw new Exception("Please provide an orbital period")
    if(!req.body.gravity) throw new Exception("Please provide gravity")
    if(!req.body.population) throw new Exception("Please provide population")
    if(!req.body.climate) throw new Exception("Please provide climate")
    if(!req.body.terrain) throw new Exception("Please provide terrain")
    if(!req.body.surfaceWater) throw new Exception("Please provide surface water")
    
	const newPlanet = getRepository(Planets).create(req.body);  
	const results = await getRepository(Planets).save(newPlanet);
	return res.json(results);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planetsPlanet = await getRepository(Planets).find();
		return res.json(planetsPlanet);
}

export const getPlanetById = async (req: Request, res: Response): Promise<Response> =>{
        const planetsPlanet = await getRepository(Planets).findOne(req.params.id);
        if(!planetsPlanet) throw new Exception("Planet with this Id doesn't exist.");
		return res.json(planetsPlanet);
}

export const updatePlanets = async (req: Request, res:Response): Promise<Response> =>{
    const planetsPlanetRepo = getRepository(Planets) 
	const planetsPlanet = await planetsPlanetRepo.findOne(req.params.id);
	if(!planetsPlanet) throw new Exception("Planet with this id doesn't exist.");
	
	planetsPlanetRepo.merge(planetsPlanet, req.body); 
	const results = await planetsPlanetRepo.save(planetsPlanet);
	return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(User)

	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
	
	return res.json({ user, token });
}

export const addFavPlanets = async (req: Request, res: Response): Promise<Response>=>{
const planetsRepo = getRepository(Planets)
const userRepo = getRepository(User)
const user = await userRepo.findOne(req.params.userid, {relations:["planet"]})
const planets = await planetsRepo.findOne(req.params.planetsid)
if (user && planets){
    user.planets = [...user.planets,planets]
    const results = await userRepo.save(user)
    return res.json(results)
}
return res.json("Fatal Error")
}