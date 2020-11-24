const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/multer');

const UserController = require('./controllers/UserController');
const NgoController = require('./controllers/NgoController');
const AuthController = require('./controllers/AuthController');
const CasoController = require('./controllers/CasoController');
const DonateController = require('./controllers/DonateController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Sessão
routes.post ('/auth', AuthController.store);

//Apoiadores
routes.post ('/users',upload.single('userImage'), UserController.store);
routes.get ('/user/:userId', UserController.show);
routes.put ('/users/:userId', upload.single('userImage'), UserController.update);
routes.delete ('/users/:userId', UserController.destroy);

//Ngos
routes.post ('/ngos', NgoController.store);
routes.get('/ngo/:ngoId', NgoController.show);
routes.put ('/ngos/:ngoId', NgoController.update);
routes.delete ('/ngos/:ngoId', NgoController.destroy);

//Casos
routes.post ('/casos', upload.single('incidentImage'), CasoController.store);
routes.get('/casos', CasoController.index);
routes.get('/perfil',CasoController.list);
routes.get('/casos/:incidentId', CasoController.show);
routes.get('/perfil/:incidentId', CasoController.listDetail);
routes.put('/casos/:incidentId', CasoController.update);
//Doações
routes.post ('/:userId/casos/:incidentId/donate', DonateController.store);
routes.get('/donate', DonateController.index);




module.exports = routes; 