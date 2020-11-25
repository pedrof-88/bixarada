const MercadoPago = require('mercadopago');

const getFullUrl = (req) =>{
  const url = req.protocol + '://' + req.get('host');
  //console.log(url)
  return url;
}

module.exports = {
  async checkout(req, res){

     // console.log(process.env)
      MercadoPago.configure({
        sandbox: true,
        public_key: 'TEST-bb7e5e78-e2d0-4be5-9471-0b175fbe0f6f',
        access_token: 'TEST-1120754379159940-112415-3ec615c84d9fcd6e7d08ef5e393edb57-156284924'
      });

      const { id, email, description, amount } = req.params;

      //Create purchase item object template
      const purchaseOrder = {
          items: [
            item = {
              id: id,
              title: description,
              description : description,
              quantity: 1,
              currency_id: 'BRL',
              unit_price: parseFloat(amount)
            }
          ],
          payer : {
            email: email
          },
          auto_return : "all",
          external_reference : id,
          back_urls : {
            success : getFullUrl(req) + "/success",
            pending : getFullUrl(req) + "/pending",
            failure : getFullUrl(req) + "/failure",
          }
        }
    
        //Generate init_point to checkout
        try {
          const preference = await MercadoPago.preferences.create(purchaseOrder);
          return res.redirect(`${preference.body.init_point}`);
        }catch(err){
          return res.send(err.message);
        }
  }
}