const cep = document.querySelector('#cep')
const adress = document.querySelector('#adress')
const cidade = document.querySelector('#cidade')
const bairro = document.querySelector('#bairro')
const message = document.querySelector('.message')

cep.addEventListener('focusout', async () =>{
    try {
        const apenasNumero = /^[0-9]+$/
    const cepValido = /^[0-9]{8}$/
    if(!apenasNumero.test(cep.value) || !cepValido.test(cep.value)){

        throw{cep_erro: 'Cep Inválido'}

    }

    const reponse = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

    if(!reponse.ok){
        throw await reponse.json()
    }
    
    const reponsecep = await reponse.json()
    adress.value = reponsecep.logradouro
    cidade.value = reponsecep.localidade
    bairro.value = reponsecep.bairro

    } catch (e) {
        if(e?.cep_erro){
            message.textContent= e.cep_erro
            setTimeout(() =>{
                message.textContent = ''
            }, 2000)
        }
    }
})

