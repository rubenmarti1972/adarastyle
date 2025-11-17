const axios = require('axios');

module.exports = {
  async createPayment({ amount, phoneNumber, reference, description }) {
    const nequiClientId = process.env.NEQUI_CLIENT_ID;
    const nequiClientSecret = process.env.NEQUI_CLIENT_SECRET;
    const nequiApiKey = process.env.NEQUI_API_KEY;

    if (!nequiClientId || !nequiClientSecret || !nequiApiKey) {
      throw new Error('Nequi credentials not configured');
    }

    try {
      // Primero obtener el token de acceso
      const authResponse = await axios.post(
        'https://api.nequi.com.co/oauth/token',
        {
          grant_type: 'client_credentials',
          client_id: nequiClientId,
          client_secret: nequiClientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const accessToken = authResponse.data.access_token;

      // Crear solicitud de pago push
      const paymentResponse = await axios.post(
        'https://api.nequi.com.co/payments/v2/-services-paymentservice-unregisteredpayment',
        {
          RequestMessage: {
            RequestHeader: {
              Channel: 'MF-001',
              RequestDate: new Date().toISOString(),
              MessageID: reference,
              ClientID: nequiClientId,
              Destination: {
                ServiceName: 'PaymentsService',
                ServiceOperation: 'unregisteredPayment',
                ServiceRegion: 'C001',
                ServiceVersion: '1.0.0',
              },
            },
            RequestBody: {
              any: {
                unregisteredPaymentRQ: {
                  phoneNumber: phoneNumber,
                  code: 'NIT_1',
                  value: amount.toString(),
                  reference1: reference,
                  reference2: description,
                  reference3: '',
                },
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'x-api-key': nequiApiKey,
          },
        }
      );

      return {
        success: true,
        transactionId: paymentResponse.data.ResponseMessage?.ResponseBody?.any?.unregisteredPaymentRS?.transactionId,
        data: paymentResponse.data,
      };
    } catch (error) {
      strapi.log.error('Nequi error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  async checkStatus(transactionId) {
    const nequiClientId = process.env.NEQUI_CLIENT_ID;
    const nequiClientSecret = process.env.NEQUI_CLIENT_SECRET;
    const nequiApiKey = process.env.NEQUI_API_KEY;

    try {
      // Obtener token de acceso
      const authResponse = await axios.post(
        'https://api.nequi.com.co/oauth/token',
        {
          grant_type: 'client_credentials',
          client_id: nequiClientId,
          client_secret: nequiClientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const accessToken = authResponse.data.access_token;

      // Consultar estado de transacción
      const statusResponse = await axios.post(
        'https://api.nequi.com.co/payments/v2/-services-paymentservice-getstatuspayment',
        {
          RequestMessage: {
            RequestHeader: {
              Channel: 'MF-001',
              RequestDate: new Date().toISOString(),
              MessageID: `STATUS_${transactionId}`,
              ClientID: nequiClientId,
              Destination: {
                ServiceName: 'PaymentsService',
                ServiceOperation: 'getStatusPayment',
                ServiceRegion: 'C001',
                ServiceVersion: '1.0.0',
              },
            },
            RequestBody: {
              any: {
                getStatusPaymentRQ: {
                  transactionId: transactionId,
                },
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'x-api-key': nequiApiKey,
          },
        }
      );

      return {
        success: true,
        status: statusResponse.data.ResponseMessage?.ResponseBody?.any?.getStatusPaymentRS?.status,
        data: statusResponse.data,
      };
    } catch (error) {
      strapi.log.error('Nequi status check error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },
};
