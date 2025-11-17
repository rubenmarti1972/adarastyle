const wompiService = require('../../payment/services/wompi');
const nequiService = require('../../payment/services/nequi');

module.exports = {
  async create(ctx) {
    const { sessionId, customerData, shippingAddress, billingAddress, paymentMethod, paymentData } = ctx.request.body;

    if (!sessionId || !customerData || !shippingAddress || !paymentMethod) {
      return ctx.badRequest('Missing required fields');
    }

    try {
      // Obtener carrito
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { sessionId },
        populate: {
          items: {
            populate: ['product'],
          },
        },
      });

      if (!cart || !cart.items?.length) {
        return ctx.badRequest('Cart is empty');
      }

      // Crear o encontrar cliente
      let customer = await strapi.db.query('api::customer.customer').findOne({
        where: { email: customerData.email },
      });

      if (!customer) {
        customer = await strapi.db.query('api::customer.customer').create({
          data: {
            email: customerData.email,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            phone: customerData.phone,
            documentType: customerData.documentType,
            documentNumber: customerData.documentNumber,
          },
        });
      }

      // Generar número de orden
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Crear orden
      const order = await strapi.db.query('api::order.order').create({
        data: {
          orderNumber,
          customer: customer.id,
          customerEmail: customerData.email,
          customerName: `${customerData.firstName} ${customerData.lastName}`,
          customerPhone: customerData.phone,
          subtotal: cart.subtotal,
          tax: cart.tax,
          shipping: cart.shipping,
          discount: cart.discount,
          total: cart.total,
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod,
          shippingAddress: shippingAddress || billingAddress,
          billingAddress,
        },
      });

      // Crear items de la orden
      for (const cartItem of cart.items) {
        await strapi.db.query('api::order-item.order-item').create({
          data: {
            order: order.id,
            product: cartItem.product.id,
            productName: cartItem.product.name,
            productSku: cartItem.product.sku,
            quantity: cartItem.quantity,
            price: cartItem.price,
            subtotal: cartItem.subtotal,
            productSnapshot: {
              name: cartItem.product.name,
              description: cartItem.product.description,
              images: cartItem.product.images,
            },
          },
        });

        // Actualizar inventario
        if (cartItem.product.trackInventory) {
          await strapi.db.query('api::product.product').update({
            where: { id: cartItem.product.id },
            data: {
              stockQuantity: cartItem.product.stockQuantity - cartItem.quantity,
              inStock: cartItem.product.stockQuantity - cartItem.quantity > 0,
            },
          });
        }
      }

      // Procesar pago según el método
      let paymentResult = null;

      if (paymentMethod === 'wompi') {
        paymentResult = await wompiService.createTransaction({
          amount: cart.total,
          currency: 'COP',
          reference: orderNumber,
          customerEmail: customerData.email,
          description: `Orden ${orderNumber}`,
        });

        if (paymentResult.success) {
          await strapi.db.query('api::order.order').update({
            where: { id: order.id },
            data: {
              paymentDetails: {
                transactionId: paymentResult.transactionId,
                paymentUrl: paymentResult.paymentUrl,
              },
            },
          });
        }
      } else if (paymentMethod === 'nequi') {
        paymentResult = await nequiService.createPayment({
          amount: cart.total,
          phoneNumber: paymentData?.phoneNumber || customerData.phone,
          reference: orderNumber,
          description: `Orden ${orderNumber}`,
        });

        if (paymentResult.success) {
          await strapi.db.query('api::order.order').update({
            where: { id: order.id },
            data: {
              paymentDetails: {
                transactionId: paymentResult.transactionId,
              },
            },
          });
        }
      }

      // Limpiar carrito
      if (cart.items?.length) {
        for (const item of cart.items) {
          await strapi.db.query('api::cart-item.cart-item').delete({
            where: { id: item.id },
          });
        }
      }

      await strapi.db.query('api::cart.cart').update({
        where: { id: cart.id },
        data: {
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        },
      });

      // Generar factura
      const invoice = await strapi.service('api::invoice.invoice').generateInvoice(order.id);

      // Obtener orden completa
      const completeOrder = await strapi.db.query('api::order.order').findOne({
        where: { id: order.id },
        populate: {
          items: {
            populate: ['product'],
          },
          invoice: true,
        },
      });

      return {
        order: completeOrder,
        payment: paymentResult,
      };
    } catch (error) {
      strapi.log.error('Error creating order:', error);
      return ctx.internalServerError('Error creating order');
    }
  },

  async findOne(ctx) {
    const { orderNumber } = ctx.params;

    try {
      const order = await strapi.db.query('api::order.order').findOne({
        where: { orderNumber },
        populate: {
          items: {
            populate: ['product'],
          },
          invoice: true,
        },
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      return order;
    } catch (error) {
      strapi.log.error('Error finding order:', error);
      return ctx.internalServerError('Error finding order');
    }
  },

  async updateStatus(ctx) {
    const { orderNumber } = ctx.params;
    const { status, paymentStatus } = ctx.request.body;

    try {
      const order = await strapi.db.query('api::order.order').findOne({
        where: { orderNumber },
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      const updatedOrder = await strapi.db.query('api::order.order').update({
        where: { id: order.id },
        data: {
          ...(status && { status }),
          ...(paymentStatus && { paymentStatus }),
        },
        populate: {
          items: {
            populate: ['product'],
          },
          invoice: true,
        },
      });

      return updatedOrder;
    } catch (error) {
      strapi.log.error('Error updating order status:', error);
      return ctx.internalServerError('Error updating order status');
    }
  },
};
