import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface CarContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  carName: string;
  details?: string;
}

export async function POST(request: NextRequest) {
  console.log('🚗 Car Contact API route called');
  try {
    const body: CarContactFormData = await request.json();
    console.log('📝 Car inquiry data received:', body);
    const { name, email, phone, message, carName, details } = body;

    // Basic validation
    if (!name || !email || !phone || !carName) {
      return NextResponse.json(
        { error: 'Name, email, phone, and car name are required' },
        { status: 400 }
      );
    }

    // Create transporter with your configuration
    console.log('📧 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `Nouvelle demande d'information véhicule: ${carName} de ${name}`;

    // Email to you (the business owner)
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="format-detection" content="telephone=no">
          <meta name="format-detection" content="date=no">
          <meta name="format-detection" content="address=no">
          <meta name="format-detection" content="email=no">
          <meta name="x-apple-disable-message-reformatting">
          <title>Nouvelle demande d'information véhicule - TCT Pro</title>
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
            }
            
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #d1d5db; 
              background-color: #0f172a;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              margin: 0;
              padding: 0;
              width: 100% !important;
              min-width: 100%;
            }
            
            .container { 
              max-width: 680px; 
              margin: 20px auto; 
              background-color: #1e293b; 
              border-radius: 16px; 
              overflow: hidden; 
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              border: 1px solid rgba(245, 158, 11, 0.1);
              width: 100%;
            }
            
            .header { 
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: #0f172a; 
              padding: 40px 30px; 
              text-align: center; 
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="cars" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="2" fill="rgba(0,0,0,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23cars)"/></svg>');
              opacity: 0.2;
            }
            
            .header h1 { 
              font-size: 28px; 
              font-weight: 800; 
              margin-bottom: 8px; 
              position: relative;
              z-index: 1;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .header p { 
              font-size: 16px; 
              opacity: 0.8; 
              font-weight: 500;
              position: relative;
              z-index: 1;
            }
            
            .car-icon {
              font-size: 48px;
              margin-bottom: 15px;
              position: relative;
              z-index: 1;
            }
            
            .content { 
              padding: 40px 30px; 
              background: #1e293b;
            }
            
            .urgent-banner { 
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
              color: white; 
              padding: 20px; 
              border-radius: 12px; 
              margin-bottom: 30px; 
              text-align: center;
              font-weight: 600;
              box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
            }
            
            .car-info-badge { 
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: #0f172a; 
              padding: 12px 25px; 
              border-radius: 25px; 
              font-size: 16px; 
              font-weight: 700; 
              text-transform: uppercase; 
              letter-spacing: 0.5px;
              display: inline-block;
              margin-bottom: 30px;
              box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
            }
            
            .car-details {
              background: linear-gradient(135deg, #334155 0%, #475569 100%);
              border-radius: 16px; 
              padding: 30px; 
              margin-bottom: 30px; 
              border: 2px solid rgba(245, 158, 11, 0.2);
              position: relative;
              overflow: hidden;
            }
            
            .car-details::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
            }
            
            .car-name {
              font-size: 24px;
              font-weight: 800;
              color: #f59e0b;
              margin-bottom: 20px;
              text-align: center;
              padding: 15px;
              background: rgba(245, 158, 11, 0.1);
              border-radius: 12px;
              border: 1px solid rgba(245, 158, 11, 0.2);
            }
            
            .client-info { 
              background-color: #334155; 
              border-radius: 16px; 
              padding: 30px; 
              margin-bottom: 30px; 
              border: 2px solid rgba(245, 158, 11, 0.2);
              position: relative;
              overflow: hidden;
            }
            
            .client-info::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background-color: #f59e0b;
            }
            
            .client-info h2 { 
              color: #f59e0b; 
              margin-bottom: 25px; 
              font-size: 20px; 
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .client-info h2::before {
              content: '👤';
              font-size: 24px;
            }
            
            .info-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
              gap: 25px; 
              margin-bottom: 25px; 
            }
            
            .info-item { 
              background: rgba(15, 23, 42, 0.5); 
              border: 1px solid rgba(245, 158, 11, 0.15); 
              border-radius: 12px; 
              padding: 20px; 
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
            }
            
            .info-item:hover {
              transform: translateY(-2px);
              border-color: rgba(245, 158, 11, 0.3);
              box-shadow: 0 8px 15px rgba(245, 158, 11, 0.1);
            }
            
            .info-label { 
              font-weight: 600; 
              color: #9ca3af; 
              font-size: 12px; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
              margin-bottom: 8px; 
              display: flex;
              align-items: center;
              gap: 6px;
            }
            
            .info-value { 
              font-size: 16px; 
              color: #d1d5db; 
              font-weight: 500;
              word-break: break-word;
            }
            
            .info-value a {
              color: #fbbf24;
              text-decoration: none;
              transition: color 0.3s ease;
            }
            
            .info-value a:hover {
              color: #f59e0b;
              text-decoration: underline;
            }
            
            .message-section { 
              background-color: #374151; 
              border-radius: 16px; 
              padding: 30px; 
              margin-top: 30px; 
              border: 1px solid rgba(245, 158, 11, 0.2);
            }
            
            .message-section h3 { 
              color: #f59e0b; 
              margin-bottom: 20px; 
              font-size: 18px; 
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .message-section h3::before {
              content: '💬';
              font-size: 20px;
            }
            
            .message-content { 
              background: rgba(15, 23, 42, 0.6); 
              padding: 20px; 
              border-radius: 12px; 
              border-left: 4px solid #f59e0b; 
              font-style: italic; 
              color: #e5e7eb;
              line-height: 1.7;
              backdrop-filter: blur(5px);
            }
            
            .action-buttons { 
              display: flex; 
              gap: 20px; 
              justify-content: center; 
              margin-top: 40px; 
              flex-wrap: wrap;
            }
            
            .btn { 
              padding: 14px 28px; 
              text-decoration: none; 
              border-radius: 12px; 
              font-weight: 600; 
              display: inline-flex;
              align-items: center;
              gap: 8px;
              transition: all 0.3s ease; 
              font-size: 15px;
              min-width: 140px;
              justify-content: center;
              text-align: center;
            }
            
            .btn-primary { 
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              color: white; 
              box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
            }
            
            .btn-primary:hover { 
              transform: translateY(-2px);
              box-shadow: 0 8px 15px rgba(59, 130, 246, 0.4);
            }
            
            .btn-secondary { 
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white; 
              box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
            }
            
            .btn-secondary:hover { 
              transform: translateY(-2px);
              box-shadow: 0 8px 15px rgba(16, 185, 129, 0.4);
            }
            
            .divider { 
              height: 2px; 
              background: linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.3) 50%, transparent 100%);
              margin: 30px 0; 
              border-radius: 1px;
            }
            
            .footer { 
              background-color: #0f172a; 
              color: #9ca3af; 
              padding: 30px; 
              text-align: center; 
              font-size: 14px; 
              border-top: 1px solid rgba(245, 158, 11, 0.1);
            }
            
            .footer .company-name {
              color: #f59e0b;
              font-weight: 700;
              font-size: 16px;
              margin-bottom: 5px;
            }
            
            .footer a {
              color: #fbbf24;
              text-decoration: none;
            }
            
            .footer a:hover {
              color: #f59e0b;
            }
            
            /* Mobile Responsive */
            @media screen and (max-width: 640px) {
              body {
                margin: 0 !important;
                padding: 0 !important;
              }
              
              .container { 
                margin: 5px !important; 
                border-radius: 12px !important;
                width: calc(100% - 10px) !important;
                max-width: none !important;
              }
              
              .header {
                padding: 25px 15px !important;
              }
              
              .header h1 {
                font-size: 22px !important;
                line-height: 1.2 !important;
              }
              
              .content { 
                padding: 25px 15px !important; 
              }
              
              .car-name {
                font-size: 20px !important;
                padding: 12px !important;
              }
              
              .info-grid { 
                grid-template-columns: 1fr !important; 
                gap: 20px !important;
              }
              
              .action-buttons {
                flex-direction: column !important;
                align-items: center !important;
                gap: 15px !important;
              }
              
              .btn {
                width: 100% !important;
                max-width: 280px !important;
                padding: 12px 20px !important;
                font-size: 14px !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="car-icon">🚗</div>
              <h1>Demande d'Information Véhicule</h1>
              <p>TCT Pro - Demande de renseignements</p>
            </div>
            
            <div class="content">
              <div class="urgent-banner">
                <strong>🚨 Nouveau prospect intéressé par un véhicule!</strong><br>
                Un client potentiel souhaite obtenir plus d'informations sur un véhicule.
              </div>
              
              <div style="text-align: center; margin-bottom: 30px;">
                <span class="car-info-badge">🚗 DEMANDE VÉHICULE</span>
              </div>
              
              <div class="car-details">
                <div class="car-name">
                  🚗 ${carName}
                </div>
                <p style="text-align: center; color: #9ca3af; font-style: italic;">
                  Le client s'intéresse à ce véhicule et souhaite plus d'informations
                </p>
              </div>
              
              <div class="client-info">
                <h2>Informations du client</h2>
                
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">👤 Nom complet</div>
                    <div class="info-value"><strong>${name}</strong></div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">📧 Adresse email</div>
                    <div class="info-value">
                      <a href="mailto:${email}" style="color: #fbbf24; text-decoration: none;">${email}</a>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">📱 Numéro de téléphone</div>
                    <div class="info-value">
                      <a href="tel:${phone}" style="color: #fbbf24; text-decoration: none;">${phone}</a>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">🚗 Véhicule d'intérêt</div>
                    <div class="info-value">
                      <strong style="color: #f59e0b;">${carName}</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              ${
                (message && message.trim()) || (details && details.trim())
                  ? `
              <div class="divider"></div>
              
              <div class="message-section">
                <h3>Message du client</h3>
                <div class="message-content">
                  "${(message && message.trim()) || (details && details.trim()) || 'Aucun message spécifique'}"
                </div>
              </div>
              `
                  : ""
              }
              
              <div class="divider"></div>
              
              <div class="action-buttons">
                <a href="mailto:${email}?subject=Re: Information sur ${carName}" class="btn btn-primary" style="color: white; text-decoration: none; display: inline-block;">
                  📧 Répondre par email
                </a>
                <a href="tel:${phone}" class="btn btn-secondary" style="color: white; text-decoration: none; display: inline-block;">
                  📞 Appeler maintenant
                </a>
              </div>
              
              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; padding: 20px; margin-top: 30px; text-align: center;">
                <h4 style="color: #f59e0b; margin-bottom: 10px; font-size: 16px;">💡 Conseils de suivi</h4>
                <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">
                  • Répondez rapidement pour maximiser les chances de conversion<br>
                  • Préparez les informations détaillées sur le véhicule (prix, historique, état)<br>
                  • Proposez un rendez-vous pour une inspection ou un essai routier
                </p>
              </div>
            </div>
            
            <div class="footer">
              <div class="company-name">TCT Pro</div>
              <p><a href="mailto:${
                process.env.CONTACT_EMAIL
              }" style="color: #fbbf24; text-decoration: none;">${
        process.env.CONTACT_EMAIL
      }</a></p>
              <p style="margin-top: 15px; opacity: 0.8; font-size: 12px;">
                Cet email a été généré automatiquement depuis la section véhicules de votre site web.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
${subject}
==============================

🚨 NOUVEAU PROSPECT VÉHICULE

VÉHICULE D'INTÉRÊT: ${carName}

INFORMATIONS CLIENT:
• Nom: ${name}
• Email: ${email}
• Téléphone: ${phone}
• Véhicule: ${carName}

${
  (message && message.trim()) || (details && details.trim())
    ? `MESSAGE:
${(message && message.trim()) || (details && details.trim())}

`
    : ""
}PROCHAINES ÉTAPES:
• Répondre rapidement pour maximiser la conversion
• Préparer les informations détaillées sur le véhicule
• Proposer un rendez-vous pour inspection/essai routier
• Email: ${email}
• Téléphone: ${phone}

CONSEILS:
- Prix et historique du véhicule
- État mécanique et esthétique
- Possibilité de financement
- Garanties disponibles

---
TCT Pro
${process.env.CONTACT_EMAIL}
      `,
    };

    // Send business notification email
    console.log('📤 Sending car inquiry notification email...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Car inquiry notification email sent successfully');

    return NextResponse.json(
      { message: 'Demande d\'information envoyée avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error sending car inquiry email:', error);
    return NextResponse.json(
      { error: 'Échec de l\'envoi de la demande. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}
