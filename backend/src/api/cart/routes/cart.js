module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cart',
      handler: 'cart.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/cart/add',
      handler: 'cart.addItem',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/cart/update',
      handler: 'cart.updateItem',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/cart/remove',
      handler: 'cart.removeItem',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/cart/clear',
      handler: 'cart.clear',
      config: {
        auth: false,
      },
    },
  ],
};
