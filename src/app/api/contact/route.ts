import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  formType: string; // Match the ContactModel which uses string, not union
  serviceName?: string;
  fileName?: string;
}

export async function POST(request: NextRequest) {
  console.log('🔍 Contact API route called');
  try {
    const body: ContactFormData = await request.json();
    console.log('📝 Form data received:', body);
    const { name, email, phone, message, formType, serviceName, fileName } = body;

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
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

    // Determine email subject based on form type
    const getSubject = () => {
      switch (formType) {
        case 'consultation':
          return `Nouvelle demande de consultation de ${name}`;
        case 'service':
          return `Nouvelle demande de service: ${serviceName || 'Service'} de ${name}`;
        case 'job':
          return `Nouvelle candidature de ${name}`;
        case 'partnership':
          return `Nouvelle demande de partenariat de ${name}`;
        default:
          return `Nouveau contact de ${name}`;
      }
    };

    // Email to you (the business owner)
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: getSubject(),
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
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
          <title>Nouvelle soumission de formulaire de contact - TCT Pro</title>
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
              background-color: #f59e0b; 
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
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(0,0,0,0.1)"/><circle cx="80" cy="80" r="1" fill="rgba(0,0,0,0.1)"/><circle cx="50" cy="50" r="0.5" fill="rgba(0,0,0,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
              opacity: 0.3;
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
            
            .content { 
              padding: 40px 30px; 
              background: #1e293b;
            }
            
            .urgent-banner { 
              background-color: #dc2626; 
              color: white; 
              padding: 16px 20px; 
              border-radius: 12px; 
              margin-bottom: 30px; 
              text-align: center;
              font-weight: 600;
              box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);
            }
            
            .form-type-badge { 
              background-color: #f59e0b; 
              color: #0f172a; 
              padding: 8px 20px; 
              border-radius: 25px; 
              font-size: 14px; 
              font-weight: 700; 
              text-transform: uppercase; 
              letter-spacing: 0.5px;
              display: inline-block;
              margin-bottom: 30px;
              box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
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
            
            .service-badge {
              background-color: #f59e0b;
              color: #0f172a;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 600;
              display: inline-block;
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
              background-color: #3b82f6; 
              color: white; 
              box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
            }
            
            .btn-primary:hover { 
              transform: translateY(-2px);
              box-shadow: 0 8px 15px rgba(59, 130, 246, 0.4);
            }
            
            .btn-secondary { 
              background-color: #10b981; 
              color: white; 
              box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
            }
            
            .btn-secondary:hover { 
              transform: translateY(-2px);
              box-shadow: 0 8px 15px rgba(16, 185, 129, 0.4);
            }
            
            .divider { 
              height: 2px; 
              background-color: rgba(245, 158, 11, 0.3); 
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
              
              .header p {
                font-size: 14px !important;
              }
              
              .content { 
                padding: 25px 15px !important; 
              }
              
              .urgent-banner {
                padding: 14px 15px !important;
                font-size: 14px !important;
                margin-bottom: 25px !important;
              }
              
              .form-type-badge {
                font-size: 12px !important;
                padding: 6px 16px !important;
              }
              
              .client-info {
                padding: 20px 15px !important;
                margin-bottom: 25px !important;
              }
              
              .client-info h2 {
                font-size: 18px !important;
                margin-bottom: 20px !important;
              }
              
              .info-grid { 
                grid-template-columns: 1fr !important; 
                gap: 20px !important;
              }
              
              .info-item {
                padding: 15px !important;
              }
              
              .info-label {
                font-size: 11px !important;
                margin-bottom: 6px !important;
              }
              
              .info-value {
                font-size: 15px !important;
              }
              
              .message-section {
                padding: 20px 15px !important;
                margin-top: 25px !important;
              }
              
              .message-section h3 {
                font-size: 16px !important;
                margin-bottom: 15px !important;
              }
              
              .message-content {
                padding: 15px !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
              }
              
              .action-buttons {
                flex-direction: column !important;
                align-items: center !important;
                gap: 15px !important;
                margin-top: 30px !important;
              }
              
              .btn {
                width: 100% !important;
                max-width: 280px !important;
                padding: 12px 20px !important;
                font-size: 14px !important;
                min-width: auto !important;
              }
              
              .footer {
                padding: 20px 15px !important;
                font-size: 13px !important;
              }
              
              .footer .company-name {
                font-size: 15px !important;
              }
            }
            
            /* Extra small screens */
            @media screen and (max-width: 480px) {
              .container {
                margin: 2px !important;
                width: calc(100% - 4px) !important;
              }
              
              .header {
                padding: 20px 12px !important;
              }
              
              .header h1 {
                font-size: 20px !important;
              }
              
              .content {
                padding: 20px 12px !important;
              }
              
              .client-info {
                padding: 15px 12px !important;
              }
              
              .message-section {
                padding: 15px 12px !important;
              }
              
              .footer {
                padding: 15px 12px !important;
              }
              
              .info-item {
                padding: 12px !important;
              }
              
              .message-content {
                padding: 12px !important;
              }
            }
            
            /* Large screens optimization */
            @media screen and (min-width: 768px) {
              .info-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 30px !important;
              }
              
              .action-buttons {
                flex-direction: row !important;
                justify-content: center !important;
                gap: 25px !important;
              }
              
              .btn {
                min-width: 160px !important;
              }
            }
            
            /* Very large screens */
            @media screen and (min-width: 1024px) {
              .container {
                max-width: 720px !important;
              }
              
              .content {
                padding: 50px 40px !important;
              }
              
              .header {
                padding: 50px 40px !important;
              }
              
              .client-info {
                padding: 35px !important;
              }
              
              .message-section {
                padding: 35px !important;
              }
            }
          </style>
        </head>
        <body>
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#0f172a;">
            <tr>
              <td>
          <![endif]-->
          
          <div class="container">
            <div class="header">
              <h1>${getSubject()}</h1>
              <p>TCT Pro - Formulaire de contact du site web</p>
            </div>
            
            <div class="content">
              <div class="urgent-banner">
                <strong>🔔 Nouvelle demande urgente</strong><br>
                Une personne s'intéresse à vos services et attend une réponse dans les 24 heures.
              </div>
              
              <div style="text-align: center; margin-bottom: 30px;">
                <span class="form-type-badge">${
                  formType ? formType.toUpperCase() : "CONTACT"
                }</span>
              </div>
              
              <div class="client-info">
                <h2>Informations du client</h2>
                
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                <![endif]-->
                
                <div class="info-grid">
                  <!--[if mso | IE]>
                    <td style="width:50%;padding:10px;">
                  <![endif]-->
                  <div class="info-item">
                    <div class="info-label">👤 Nom complet</div>
                    <div class="info-value"><strong>${name}</strong></div>
                  </div>
                  <!--[if mso | IE]>
                    </td>
                    <td style="width:50%;padding:10px;">
                  <![endif]-->
                  <div class="info-item">
                    <div class="info-label">📧 Adresse email</div>
                    <div class="info-value">
                      <a href="mailto:${email}" style="color: #fbbf24; text-decoration: none;">${email}</a>
                    </div>
                  </div>
                  <!--[if mso | IE]>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;padding:10px;">
                  <![endif]-->
                  <div class="info-item">
                    <div class="info-label">📱 Numéro de téléphone</div>
                    <div class="info-value">
                      <a href="tel:${phone}" style="color: #fbbf24; text-decoration: none;">${phone}</a>
                    </div>
                  </div>
                  <!--[if mso | IE]>
                    </td>
                  <![endif]-->
                  ${
                    serviceName
                      ? `
                  <!--[if mso | IE]>
                    <td style="width:50%;padding:10px;">
                  <![endif]-->
                  <div class="info-item">
                    <div class="info-label">🔧 Service demandé</div>
                    <div class="info-value">
                      <span class="service-badge">${serviceName}</span>
                    </div>
                  </div>
                  <!--[if mso | IE]>
                    </td>
                  <![endif]-->
                  `
                      : ""
                  }
                  ${
                    fileName
                      ? `
                  <!--[if mso | IE]>
                    <td style="width:50%;padding:10px;">
                  <![endif]-->
                  <div class="info-item">
                    <div class="info-label">📎 Fichier joint</div>
                    <div class="info-value">${fileName}</div>
                  </div>
                  <!--[if mso | IE]>
                    </td>
                  <![endif]-->
                  `
                      : ""
                  }
                </div>
                
                <!--[if mso | IE]>
                  </tr>
                </table>
                <![endif]-->
                
              </div>
              
              ${
                message && message.trim()
                  ? `
              <div class="divider"></div>
              
              <div class="message-section">
                <h3>${
                  formType === "job"
                    ? "Lettre de motivation"
                    : formType === "partnership"
                    ? "Proposition de partenariat"
                    : "Détails du projet & Message"
                }</h3>
                <div class="message-content">
                  "${message}"
                </div>
              </div>
              `
                  : ""
              }
              
              <div class="divider"></div>
              
              <div class="action-buttons">
                <a href="mailto:${email}" class="btn btn-primary" style="color: white; text-decoration: none; display: inline-block;">
                  📧 Répondre par email
                </a>
                <a href="tel:${phone}" class="btn btn-secondary" style="color: white; text-decoration: none; display: inline-block;">
                  📞 Appeler maintenant
                </a>
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
                Cet email a été généré automatiquement depuis le formulaire de contact de votre site web.
              </p>
            </div>
          </div>
          
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          <![endif]-->
        </body>
        </html>
      `,
      text: `
${getSubject()}
==============================

🔔 NOUVELLE DEMANDE URGENTE - Réponse attendue sous 24h

INFORMATIONS CLIENT:
• Nom: ${name}
• Email: ${email}
• Téléphone: ${phone}
• Type de demande: ${formType}
${serviceName ? `• Service: ${serviceName}` : ""}
${fileName ? `• Fichier joint: ${fileName}` : ""}

${
  message && message.trim()
    ? `MESSAGE:
${message}

`
    : ""
}PROCHAINES ÉTAPES:
• Répondre dans les 24 heures pour une meilleure conversion
• Email: ${email}
• Téléphone: ${phone}

---
TCT Pro
${process.env.CONTACT_EMAIL}
      `,
    };

    // Send business notification email
    console.log('📤 Sending business notification email...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Business notification email sent successfully');

    return NextResponse.json(
      { message: 'Email envoyé avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json(
      { error: 'Échec de l\'envoi de l\'email. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}
