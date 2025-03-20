document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('abrirFormularioBtn').addEventListener('click', function() {
        document.getElementById('formulario-container').style.display = 'block';
    });
});

document.getElementById('formularioContato').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    emailjs.send('service_rpno6hg', 'template_tpsshxf', {
        title: "Link para o formulario",
        nome: nome,
        email: email,
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd4CG-p-lZvrjFbfMunwNsUnIJrg3eOdcm6CapyJgs2Qvnvlg/viewform?usp=sharing'
    })
    .then(function(response) {
        alert('E-mail enviado com sucesso!' + response);
    }, function(error) {
        alert('Erro ao enviar o e-mail: ' + JSON.stringify(error));
    });
});
