import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare var WidgetCheckout: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor() {}

  processWompiPayment(orderData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const checkout = new WidgetCheckout({
          currency: 'COP',
          amountInCents: Math.round(orderData.total * 100),
          reference: orderData.orderNumber,
          publicKey: environment.wompiPublicKey,
          customerData: {
            email: orderData.customerEmail,
            fullName: orderData.customerName,
            phoneNumber: orderData.customerPhone
          },
          redirectUrl: `${window.location.origin}/checkout/success`
        });

        checkout.open((result: any) => {
          const transaction = result.transaction;

          if (transaction.status === 'APPROVED') {
            resolve({
              success: true,
              transactionId: transaction.id,
              status: transaction.status
            });
          } else if (transaction.status === 'DECLINED') {
            reject({
              success: false,
              error: 'Transacción declinada'
            });
          } else {
            reject({
              success: false,
              error: 'Estado de transacción desconocido'
            });
          }
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Error al procesar el pago con Wompi'
        });
      }
    });
  }

  processNequiPayment(orderData: any, phoneNumber: string): Observable<any> {
    // La integración con Nequi se maneja desde el backend
    // Aquí solo se preparan los datos
    return new Observable(observer => {
      observer.next({
        paymentMethod: 'nequi',
        phoneNumber,
        amount: orderData.total,
        reference: orderData.orderNumber
      });
      observer.complete();
    });
  }

  loadWompiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof WidgetCheckout !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Wompi script'));
      document.head.appendChild(script);
    });
  }
}
