$(document).ready(function(){
    // Mostrar el modal automáticamente después de 2 segundos
    setTimeout(function(){
        $('#suscripcionModal').modal('show');
    }, 2000);

    // Lógica para el botón de suscripción
    $('#enviar').click(function(){
        let email = $('#email').val();
        if (email) {
            alert('Gracias por suscribirte con el correo: ' + email);
            $('#suscripcionModal').modal('hide');
        } else {
            alert('Por favor, ingresa un correo electrónico válido.');
        }
    });
});