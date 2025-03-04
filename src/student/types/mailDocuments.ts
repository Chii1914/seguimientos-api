const solicitude = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitud de Documentos</title>
  <style>
    body {
      font-family: 'Swis721BT', sans-serif;
      background-color: #f5f5f5;
      color: #003c58;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #003c58;
      font-size: 24px;
      margin: 0;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
    }
    .content p {
      margin: 0 0 15px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #003c58;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #003c58;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #00243f;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Solicitud de Documentos</h1>
    </div>
    <div class="content">
      <p>Estimado/a <strong>{nombre}</strong>,</p>
      <p>Se le ha solicitado el siguiente documento para completar su trámite:</p>
      <ul>
        <li>Certificado de Nacimiento</li>
        <li>Certificado de Concentración de Notas</li>
      </ul>
      <p>Por favor, envíe estos documentos a la mayor brevedad posible.</p>
      <a href="#" class="button">Enviar Documentos</a>
    </div>
    <div class="footer">
      <p>Gracias por su atención.</p>
    </div>
  </div>

</body>
</html>
;`;
export default solicitude;