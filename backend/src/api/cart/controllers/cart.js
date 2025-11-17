module.exports = {
  async find(ctx) {
    const { sessionId } = ctx.query;

    if (!sessionId) {
      return ctx.badRequest('Session ID is required');
    }

    try {
      let cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
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

      if (!cart) {
        // Crear nuevo carrito si no existe
        cart = await strapi.db.query('api::cart.cart').create({
          data: {
            sessionId,
            subtotal: 0,
            tax: 0,
            shipping: 0,
            discount: 0,
            total: 0,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
          },
        });

        cart.items = [];
      }

      return cart;
    } catch (error) {
      strapi.log.error('Error finding cart:', error);
      return ctx.internalServerError('Error finding cart');
    }
  },

  async addItem(ctx) {
    const { sessionId, productId, quantity = 1 } = ctx.request.body;

    if (!sessionId || !productId) {
      return ctx.badRequest('Session ID and Product ID are required');
    }

    try {
      // Buscar o crear carrito
      let cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
        populate: {
          items: {
            populate: ['product'],
          },
        },
      });

      if (!cart) {
        cart = await strapi.db.query('api::cart.cart').create({
          data: {
            sessionId,
            subtotal: 0,
            tax: 0,
            shipping: 0,
            discount: 0,
            total: 0,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
        cart.items = [];
      }

      // Buscar producto
      const product = await strapi.db.query('api::product.product').findOne({
        where: { id: productId },
      });

      if (!product) {
        return ctx.notFound('Product not found');
      }

      // Verificar si el producto ya está en el carrito
      const existingItem = cart.items?.find((item) => item.product?.id === productId);

      if (existingItem) {
        // Actualizar cantidad
        await strapi.db.query('api::cart-item.cart-item').update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
            subtotal: (existingItem.quantity + quantity) * product.price,
          },
        });
      } else {
        // Crear nuevo item
        await strapi.db.query('api::cart-item.cart-item').create({
          data: {
            cart: cart.id,
            product: productId,
            quantity,
            price: product.salePrice || product.price,
            subtotal: quantity * (product.salePrice || product.price),
          },
        });
      }

      // Recalcular totales
      const updatedCart = await strapi.service('api::cart.cart').recalculateTotals(cart.id);

      return updatedCart;
    } catch (error) {
      strapi.log.error('Error adding item to cart:', error);
      return ctx.internalServerError('Error adding item to cart');
    }
  },

  async updateItem(ctx) {
    const { sessionId, itemId, quantity } = ctx.request.body;

    if (!sessionId || !itemId || quantity === undefined) {
      return ctx.badRequest('Session ID, Item ID, and Quantity are required');
    }

    try {
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
      });

      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      const item = await strapi.db.query('api::cart-item.cart-item').findOne({
        where: { id: itemId, cart: cart.id },
        populate: ['product'],
      });

      if (!item) {
        return ctx.notFound('Item not found');
      }

      if (quantity <= 0) {
        // Eliminar item
        await strapi.db.query('api::cart-item.cart-item').delete({
          where: { id: itemId },
        });
      } else {
        // Actualizar cantidad
        await strapi.db.query('api::cart-item.cart-item').update({
          where: { id: itemId },
          data: {
            quantity,
            subtotal: quantity * item.price,
          },
        });
      }

      // Recalcular totales
      const updatedCart = await strapi.service('api::cart.cart').recalculateTotals(cart.id);

      return updatedCart;
    } catch (error) {
      strapi.log.error('Error updating cart item:', error);
      return ctx.internalServerError('Error updating cart item');
    }
  },

  async removeItem(ctx) {
    const { sessionId, itemId } = ctx.request.body;

    if (!sessionId || !itemId) {
      return ctx.badRequest('Session ID and Item ID are required');
    }

    try {
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
      });

      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      await strapi.db.query('api::cart-item.cart-item').delete({
        where: { id: itemId, cart: cart.id },
      });

      // Recalcular totales
      const updatedCart = await strapi.service('api::cart.cart').recalculateTotals(cart.id);

      return updatedCart;
    } catch (error) {
      strapi.log.error('Error removing cart item:', error);
      return ctx.internalServerError('Error removing cart item');
    }
  },

  async clear(ctx) {
    const { sessionId } = ctx.request.body;

    if (!sessionId) {
      return ctx.badRequest('Session ID is required');
    }

    try {
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
        populate: ['items'],
      });

      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      // Eliminar todos los items
      if (cart.items?.length) {
        for (const item of cart.items) {
          await strapi.db.query('api::cart-item.cart-item').delete({
            where: { id: item.id },
          });
        }
      }

      // Resetear totales
      const updatedCart = await strapi.db.query('api::cart.cart').update({
        where: { id: cart.id },
        data: {
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        },
      });

      return updatedCart;
    } catch (error) {
      strapi.log.error('Error clearing cart:', error);
      return ctx.internalServerError('Error clearing cart');
    }
  },
};
