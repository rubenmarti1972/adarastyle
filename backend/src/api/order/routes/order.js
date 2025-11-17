module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/orders',
      handler: 'order.create',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/orders/:orderNumber',
      handler: 'order.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/orders/:orderNumber/status',
      handler: 'order.updateStatus',
      config: {
        auth: false,
      },
    },
  ],
};
