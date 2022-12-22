import Stripe from 'stripe';
import { urlFor } from '../../lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log ( "stripe.js handler:" + req.body )
    try {
      const params =  {
        submit_type: 'pay',
        mode:'payment',        
        payment_method_types: ['card'],
        billing_address_collection: 'auto',

        // Product > Shipping Option menu @ dashboard.strip.com 에서 ID값을 넣는다.
        shipping_options: [
          { shipping_rate: 'shr_1MHevKHQZ052WxcTf1WZC19d'},  // free shipping
          { shipping_rate: 'shr_1MHewNHQZ052WxcTvngMMAv4'},  // fast shipping 20$
        ],

        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;          
          const img_url = urlFor( img ).url();   

          console.log('IMAGE-Sanity.io:', img_url);
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images:[img_url],              
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum:1,
            },
            quantity: item.quantity
          }
        }) ,         
        
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,

      }
      // Create Checkout Sessions from body params.            
      const session = await stripe.checkout.sessions.create( params );

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}