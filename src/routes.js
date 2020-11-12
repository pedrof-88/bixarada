const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/multer');

const ApoiadorController = require('./controllers/ApoiadorController');
const OngController = require('./controllers/OngController');
const AutenticacaoController = require('./controllers/AutenticacaoController');
const CasoController = require('./controllers/CasoController');
const DonateController = require('./controllers/DonateController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Sessão
routes.post ('/auth', AutenticacaoController.store);

//Apoiadores
routes.post ('/apoiadores',upload.single('userImage'), ApoiadorController.store);
routes.put ('/apoiadores/:userId', upload.single('userImage'), ApoiadorController.update);
routes.delete ('/apoiadores/:userId', ApoiadorController.destroy);

//Ongs
routes.post ('/ongs', OngController.store);
routes.get('/ongs', OngController.show);
routes.put ('/ongs/:ongId', OngController.update);
routes.delete ('/ongs/:ongId', OngController.destroy);

//Casos
routes.post ('/:ongId/casos', upload.single('incidentImage'), CasoController.store);
routes.get('/casos', CasoController.index);
routes.get('/:ongId/casos',CasoController.list);
routes.get('/casos/:incidentId', CasoController.show);
routes.get('/caso/:incidentId', CasoController.listDetail);
routes.put('/casos/:incidentId', CasoController.update);
//Doações
routes.post ('/:userId/casos/:incidentId/donate', DonateController.store);
routes.get('/donate', DonateController.index);




module.exports = routes; 