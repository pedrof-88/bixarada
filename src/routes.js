const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/multer');

const UserController = require('./controllers/UserController');
const NgoController = require('./controllers/NgoController');
const AuthController = require('./controllers/AuthController');
const IncidentController = require('./controllers/IncidentController');
const DonateController = require('./controllers/DonateController');
const CheckoutController = require('./controllers/CheckoutController');

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
routes.post ('/incidents/:ngoId', upload.single('incidentImage'), IncidentController.store);
routes.get('/incidents', IncidentController.index);
routes.get('/profile',IncidentController.list);
routes.get('/incidents/:incidentId', IncidentController.show);
routes.get('/profile/:incidentId', IncidentController.listDetail);
routes.put('/incidents/:incidentId', upload.single('incidentImage'), IncidentController.update);
//Doações
routes.post ('/:userId/casos/:incidentId/donate', DonateController.store);
routes.get('/donate', DonateController.index);
//PAYDay
routes.get('/checkout/:id/:email/:description/:amount', CheckoutController.checkout);
routes.get('/success', (req, res) => {
  return res.render('success_screen')
});
routes.get('/pending', (req, res) => {
  return res.render('pending_screen')
});

routes.get('/failure', (req, res) => {
  return res.render('failure_screen')
});



module.exports = routes; 