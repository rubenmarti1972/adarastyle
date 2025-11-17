module.exports = {
  async generateInvoice(orderId) {
    try {
      const order = await strapi.db.query('api::order.order').findOne({
        where: { id: orderId },
        populate: {
          items: {
            populate: ['product'],
          },
          customer: true,
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Verificar si ya existe una factura
      const existingInvoice = await strapi.db.query('api::invoice.invoice').findOne({
        where: { order: orderId },
      });

      if (existingInvoice) {
        return existingInvoice;
      }

      // Generar número de factura único
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`;

      // Preparar información del cliente
      const customerInfo = {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        documentType: order.customer?.documentType,
        documentNumber: order.customer?.documentNumber,
        address: order.billingAddress,
      };

      // Preparar items
      const items = order.items.map((item) => ({
        productName: item.productName,
        productSku: item.productSku,
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.subtotal),
      }));

      // Crear factura
      const invoice = await strapi.db.query('api::invoice.invoice').create({
        data: {
          invoiceNumber,
          order: orderId,
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          customerInfo,
          items,
          subtotal: order.subtotal,
          tax: order.tax,
          taxRate: 19,
          shipping: order.shipping,
          discount: order.discount,
          total: order.total,
          status: 'sent',
        },
      });

      // Actualizar orden con la factura
      await strapi.db.query('api::order.order').update({
        where: { id: orderId },
        data: {
          invoice: invoice.id,
        },
      });

      return invoice;
    } catch (error) {
      strapi.log.error('Error generating invoice:', error);
      throw error;
    }
  },

  async generatePDF(invoiceId) {
    // Esta función se puede implementar usando una librería como PDFKit
    // Por ahora retornamos un objeto básico
    const invoice = await strapi.db.query('api::invoice.invoice').findOne({
      where: { id: invoiceId },
      populate: {
        order: {
          populate: ['items'],
        },
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // TODO: Implementar generación de PDF
    // const pdfUrl = await generatePDFDocument(invoice);

    return invoice;
  },
};
