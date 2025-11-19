import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      href="https://wa.me/c/573202614823" 
      target="_blank" 
      rel="noopener noreferrer"
      class="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      <svg class="whatsapp-icon" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.957 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62-6.11 13.62-13.62 13.62z"/>
        <path d="M23.305 19.44c-0.294-0.147-1.731-0.855-1.999-0.952s-0.463-0.147-0.658 0.147c-0.195 0.294-0.755 0.952-0.926 1.147s-0.341 0.221-0.635 0.074c-0.294-0.147-1.241-0.457-2.363-1.457-0.874-0.779-1.464-1.741-1.636-2.035s-0.018-0.453 0.129-0.6c0.132-0.132 0.294-0.343 0.441-0.515s0.195-0.294 0.293-0.489c0.098-0.195 0.049-0.367-0.025-0.514s-0.658-1.587-0.902-2.173c-0.238-0.571-0.479-0.494-0.658-0.502-0.171-0.008-0.366-0.010-0.561-0.010s-0.512 0.074-0.781 0.367c-0.269 0.294-1.025 1.002-1.025 2.442s1.050 2.832 1.196 3.027c0.147 0.195 2.065 3.152 5.002 4.42 0.699 0.302 1.245 0.482 1.671 0.617 0.703 0.22 1.342 0.189 1.848 0.115 0.564-0.084 1.731-0.708 1.975-1.391s0.244-1.27 0.171-1.391c-0.074-0.122-0.269-0.195-0.562-0.343z"/>
      </svg>
      <span class="whatsapp-text">¿Necesitas ayuda?</span>
    </a>
  `,
  styles: [`
    .whatsapp-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      z-index: 999;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: pulse-whatsapp 2s infinite, bounce-in 0.6s ease-out;
      overflow: hidden;
    }

    .whatsapp-button:hover {
      width: 200px;
      border-radius: 30px;
      background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
      box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
      transform: translateY(-4px) scale(1.05);
    }

    .whatsapp-icon {
      width: 32px;
      height: 32px;
      transition: all 0.3s ease;
    }

    .whatsapp-button:hover .whatsapp-icon {
      transform: scale(0.9);
    }

    .whatsapp-text {
      position: absolute;
      right: 20px;
      opacity: 0;
      white-space: nowrap;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .whatsapp-button:hover .whatsapp-text {
      opacity: 1;
      right: 60px;
    }

    @keyframes pulse-whatsapp {
      0%, 100% {
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      }
      50% {
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.8), 0 0 0 15px rgba(37, 211, 102, 0);
      }
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0) translateY(100px);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) translateY(0);
      }
      100% {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    /* Tema Luxury */
    :host-context([data-theme="luxury"]) .whatsapp-button {
      background: var(--gradient-secondary);
      box-shadow: var(--shadow-lg), var(--glow-gold);
    }

    :host-context([data-theme="luxury"]) .whatsapp-button:hover {
      background: var(--gradient-primary);
      box-shadow: var(--shadow-xl), var(--glow-wine);
    }

    @media (max-width: 768px) {
      .whatsapp-button {
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
      }

      .whatsapp-button:hover {
        width: 56px;
        border-radius: 50%;
      }

      .whatsapp-text {
        display: none;
      }
    }
  `]
})
export class WhatsappButtonComponent {}
