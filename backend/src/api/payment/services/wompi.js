const axios = require('axios');

module.exports = {
  async createTransaction({ amount, currency, reference, customerEmail, description }) {
    const wompiPublicKey = process.env.WOMPI_PUBLIC_KEY;
    const wompiPrivateKey = process.env.WOMPI_PRIVATE_KEY;

    if (!wompiPublicKey || !wompiPrivateKey) {
      throw new Error('Wompi credentials not configured');
    }

    try {
      // Crear enlace de pago de Wompi
      const response = await axios.post(
        'https://production.wompi.co/v1/payment_links',
        {
          name: description,
          description: description,
          single_use: false,
          collect_shipping: false,
          currency: currency,
          amount_in_cents: Math.round(amount * 100), // Convertir a centavos
          redirect_url: `${process.env.FRONTEND_URL}/checkout/success`,
        },
        {
          headers: {
            Authorization: `Bearer ${wompiPrivateKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        transactionId: response.data.data.id,
        paymentUrl: response.data.data.permalink,
        data: response.data.data,
      };
    } catch (error) {
      strapi.log.error('Wompi error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  async verifyTransaction(transactionId) {
    const wompiPrivateKey = process.env.WOMPI_PRIVATE_KEY;

    try {
      const response = await axios.get(
        `https://production.wompi.co/v1/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${wompiPrivateKey}`,
          },
        }
      );

      return {
        success: true,
        status: response.data.data.status,
        data: response.data.data,
      };
    } catch (error) {
      strapi.log.error('Wompi verification error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },
};
