<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Configura el correo a donde llegará el mensaje
    $destinatario = "tu-correo@puertolegal2026.cl"; // <--- CAMBIA ESTO
    $asunto = "Nueva consulta desde Puerto Legal";

    // 2. Recogemos los datos del formulario
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $mensaje = $_POST['mensaje'];

    // 3. Preparamos el cuerpo del email
    $cuerpo = "Has recibido una nueva consulta web:\n\n";
    $cuerpo .= "Teléfono: " . $telefono . "\n";
    $cuerpo .= "Correo: " . $correo . "\n";
    $cuerpo .= "Mensaje: " . $mensaje . "\n";

    // 4. Cabeceras del correo (para que llegue bien)
    $headers = "From: no-reply@puertolegal2026.cl" . "\r\n";
    $headers .= "Reply-To: " . $correo . "\r\n";

    // 5. Enviar el correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        // Si se envía con éxito, redirige a una página de gracias o al index con un mensaje
        echo "<script>alert('Mensaje enviado con éxito'); window.location.href='index.html';</script>";
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>