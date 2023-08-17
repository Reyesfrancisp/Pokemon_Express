const router = require('express').Router();

router.post('/payment', async (req, res) => {
    try {
      const { amount } = req.body; // Amount in cents
  
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', 
      });
  
      res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Unable to create payment intent' });
    }
  });

  module.exports = router;