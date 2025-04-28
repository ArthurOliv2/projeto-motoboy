document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('abrirFormularioBtn').addEventListener('click', function() {
        document.getElementById('formulario-container').style.display = 'block';
    });

    document.getElementById('formularioContato').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        emailjs.init({ publicKey: "kZ-RV0S5qRiXROPCI" });

        emailjs.send('service_rpno6hg', 'template_tpsshxf', {
            title: "Link para o formulário",
            nome: nome,
            email: email,
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd4CG-p-lZvrjFbfMunwNsUnIJrg3eOdcm6CapyJgs2Qvnvlg/viewform?usp=sharing'
        })
        .then(function(response) {
            alert('E-mail enviado com sucesso!');
        }, function(error) {
            alert('Erro ao enviar o e-mail: ' + JSON.stringify(error));
        });
    });

    carregarDica();
    atualizarFavoritos();
});

function carregarDica() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const dicaTexto = document.getElementById('texto-dica');
            dicaTexto.textContent = data.slip.advice;
        })
        .catch(error => {
            console.error('Erro ao buscar a dica:', error);
            document.getElementById('texto-dica').textContent = "Não conseguimos carregar uma dica no momento.";
        });
}

function favoritarDica(dica) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.includes(dica)) {
        favoritos.push(dica);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        atualizarFavoritos();
    }
}

function atualizarFavoritos() {
    const favoritosContainer = document.getElementById('favoritos-container');
    favoritosContainer.innerHTML = '';

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos.forEach((dica, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'favorito-card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const texto = document.createElement('p');
        texto.textContent = dica;
        texto.classList.add('card-text');

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-excluir');

        btnExcluir.addEventListener('click', () => {
            excluirFavorito(index);
        });

        cardBody.appendChild(texto);
        cardBody.appendChild(btnExcluir);
        card.appendChild(cardBody);

        favoritosContainer.appendChild(card);
    });
}

function excluirFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.splice(index, 1); 
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    atualizarFavoritos(); 
}