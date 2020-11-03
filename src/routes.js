const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/multer');


const ApoiadorController = require('./controllers/ApoiadorController');
const OngController = require('./controllers/OngController');
const AutenticacaoController = require('./controllers/AutenticacaoController');
const AutenticacaoOngController = require('./controllers/AutenticacaoOngController');
const CasoController = require('./controllers/CasoController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Apoiadores
routes.post ('/apoiadores', ApoiadorController.store);

//Ongs
routes.post ('/ongs', OngController.store);

//Casos
routes.post ('/:ongId/casos', upload.single('imagemCaso'), CasoController.store);
routes.get('/casos', CasoController.index);
routes.get('/:ongId/casos',CasoController.list);
routes.get('/casos/:casoId', CasoController.show);

//Sessão
 routes.post ('/auth', AutenticacaoController.store);
 routes.post ('/authong', AutenticacaoOngController.store);

module.exports = routes; 