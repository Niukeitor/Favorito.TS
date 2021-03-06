"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.addFavPlanets = exports.login = exports.updatePlanets = exports.getPlanetById = exports.getPlanets = exports.createPlanets = exports.updatePeople = exports.getPeopleById = exports.getPeople = exports.createPeople = exports.deleteUsers = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var People_1 = require("./entities/People");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUsers = getUsers;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                typeorm_1.getRepository(User_1.User).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No user found." })];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, users_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!!users) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "This user doesn't exist." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"](req.params.id)];
            case 3:
                users_1 = _a.sent();
                return [2 /*return*/, res.json(users_1)];
        }
    });
}); };
exports.deleteUsers = deleteUsers;
var createPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newChar, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.height)
                    throw new utils_1.Exception("Please provide a height");
                if (!req.body.mass)
                    throw new utils_1.Exception("Please provide a mass");
                if (!req.body.hairColor)
                    throw new utils_1.Exception("Please provide a hair color");
                if (!req.body.skinColor)
                    throw new utils_1.Exception("Please provide a skin color");
                if (!req.body.eyeColor)
                    throw new utils_1.Exception("Please provide an eye color");
                if (!req.body.birthYear)
                    throw new utils_1.Exception("Please provide a birth year");
                if (!req.body.gender)
                    throw new utils_1.Exception("Please provide a gender");
                newChar = typeorm_1.getRepository(People_1.People).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newChar)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPeople = createPeople;
var getPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeople = getPeople;
var getPeopleById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.id)];
            case 1:
                people = _a.sent();
                if (!people)
                    throw new utils_1.Exception("People with this Id doesn't exist.");
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeopleById = getPeopleById;
var updatePeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charRepo, char, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                charRepo = typeorm_1.getRepository(People_1.People);
                return [4 /*yield*/, charRepo.findOne(req.params.id)];
            case 1:
                char = _a.sent();
                if (!char)
                    throw new utils_1.Exception("People with this id doesn't exist.");
                charRepo.merge(char, req.body);
                return [4 /*yield*/, charRepo.save(char)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updatePeople = updatePeople;
var createPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.diameter)
                    throw new utils_1.Exception("Please provide a diameter");
                if (!req.body.rotationPeriod)
                    throw new utils_1.Exception("Please provide a rotation period");
                if (!req.body.orbitalPeriod)
                    throw new utils_1.Exception("Please provide an orbital period");
                if (!req.body.gravity)
                    throw new utils_1.Exception("Please provide gravity");
                if (!req.body.population)
                    throw new utils_1.Exception("Please provide population");
                if (!req.body.climate)
                    throw new utils_1.Exception("Please provide climate");
                if (!req.body.terrain)
                    throw new utils_1.Exception("Please provide terrain");
                if (!req.body.surfaceWater)
                    throw new utils_1.Exception("Please provide surface water");
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanets = createPlanets;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsPlanet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planetsPlanet = _a.sent();
                return [2 /*return*/, res.json(planetsPlanet)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanetById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsPlanet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planetsPlanet = _a.sent();
                if (!planetsPlanet)
                    throw new utils_1.Exception("Planet with this Id doesn't exist.");
                return [2 /*return*/, res.json(planetsPlanet)];
        }
    });
}); };
exports.getPlanetById = getPlanetById;
var updatePlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsPlanetRepo, planetsPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetsPlanetRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetsPlanetRepo.findOne(req.params.id)];
            case 1:
                planetsPlanet = _a.sent();
                if (!planetsPlanet)
                    throw new utils_1.Exception("Planet with this id doesn't exist.");
                planetsPlanetRepo.merge(planetsPlanet, req.body);
                return [4 /*yield*/, planetsPlanetRepo.save(planetsPlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updatePlanets = updatePlanets;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var addFavPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsRepo, userRepo, user, planets, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetsRepo = typeorm_1.getRepository(Planets_1.Planets);
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.userid, { relations: ["planets"] })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, planetsRepo.findOne(req.params.planetsid)];
            case 2:
                planets = _a.sent();
                if (!(user && planets)) return [3 /*break*/, 4];
                user.planets = __spreadArray(__spreadArray([], user.planets), [planets]);
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 4: return [2 /*return*/, res.json("Fatal Error")];
        }
    });
}); };
exports.addFavPlanets = addFavPlanets;
