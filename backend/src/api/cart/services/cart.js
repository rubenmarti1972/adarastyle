module.exports = {
  async recalculateTotals(cartId) {
    const cart = await strapi.db.query('api::cart.cart').findOne({
      where: { id: cartId },
      populate: {
        items: {
          populate: ['product'],
        },
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Calcular subtotal
    const subtotal = cart.items?.reduce((sum, item) => sum + Number(item.subtotal), 0) || 0;

    // Calcular impuestos (19% IVA en Colombia)
    const tax = subtotal * 0.19;

    // Calcular envío (gratis por encima de $200.000)
    const shipping = subtotal >= 200000 ? 0 : 15000;

    // Aplicar descuento si hay cupón
    const discount = cart.discount || 0;

    // Calcular total
    const total = subtotal + tax + shipping - discount;

    // Actualizar carrito
    const updatedCart = await strapi.db.query('api::cart.cart').update({
      where: { id: cartId },
      data: {
        subtotal,
        tax,
        shipping,
        total,
      },
      populate: {
        items: {
          populate: {
            product: {
              populate: ['images'],
            },
          },
        },
      },
    });

    return updatedCart;
  },
};
