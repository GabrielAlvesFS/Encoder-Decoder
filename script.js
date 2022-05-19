let tipo = undefined
let incremento = 0
let metodo = undefined

// Function pra pegar entrada do usuário
userInput = function(){
    let input = document.querySelector('#user-input')
    input = input.value
    return input
}

/**
 * function pra escrever o resultado da codificação no output textarea
 * @param {string} answerOutput 
 * @returns {string} 
 */
function answerOutput(answerOutput) {
    let output = document.querySelector('#code-output')
    output = output.value = `${answerOutput}`
    return output
}

//function que verifica qual tipo de codificação e o incremento que o usuário deseja
function encodeType(){
    const options = document.querySelector('#method-option')
    const base64 = options.options[1]
    const caesar =  options.options[2]
    const caesarInput = document.querySelector('#hidden-input')

    //assim que uma das options for clicada, é verificada se ela é a de cesar, se não for o else é considerado base64
    options.onclick = function(){
        if (caesar.selected === true) {
            //se for cesar mostra a seleção de incrimento
            caesarInput.style.display = 'inline'
            tipo = 'caesar'
        
        } else if (base64.selected === true) {
            caesarInput.style.display = 'none'
            tipo = 'base64'

        }
    }

    //armazena o novo valor do input de incremento
    caesarInput.addEventListener('change', function(){
        incremento = caesarInput.value
        incremento = Number(incremento)

    })
}
encodeType()

/**
 * function caesar-cipher
 * @param {string} userInput 
 * @param {number} increment 
 * @returns {string}
 */
function caesarCipher(userInput, increment){
    let input = ''

    for (i = 0; i <= userInput.length; i++) {
        let caesar = userInput.charCodeAt(i)
        if (userInput.match(/[a-z]/i)) {
            if (caesar >= 97 && caesar <=122) {
                caesar = (caesar - 97 + increment) % 26 + 97
            } else if (caesar >= 65 && caesar <=90){
                caesar = (caesar - 65 + increment) % 26 + 65
            }
            input = input + String.fromCharCode(caesar)
        }
    }
    return input
}

/**
 * Encode - function que posso retornar o codigo codificado em methodSelected - param= base 64 ou cifra de cesar com incremento
 * @param {string} type 
 * @param {number} increment 
 * @param {string} userInput 
 */
function encode(type, increment, userInput) { 
    if (type === 'base64') {
        userInput = btoa(userInput)
        answerOutput(userInput)

        console.log('Aqui codifica pra base 64')
    } else if (type === 'caesar') {
        //verificar qual o incrimento e trabalhar em cima disso
        userInput = caesarCipher(userInput, increment)
        answerOutput(userInput)
        
    }
}

/**
 * decode
 * @param {string} type 
 * @param {number} increment 
 * @param {string} userInput 
 */
function decode(type, increment, userInput){
    increment = 26 - increment
    if (type === 'base64') {
        userInput = atob(userInput)
        answerOutput(userInput)
        console.log('Aqui decodifica pra base 64')

    } else if (type === 'caesar') {
        //verificar qual o incrimento e trabalhar em cima disso
        userInput = caesarCipher(userInput, increment)
        answerOutput(userInput)
    }
}


// function que verifica se o usuário quer codificar ou decodificar
function methodSelected(){
    const encoder = document.querySelector('#encoder')
    const decoder = document.querySelector('#decoder')    

    //se for pra codificar faz isso, senao se decodifica, senao deve retornar que o campo ta não foi selecionado
    if (encoder.checked){
        metodo = 'encode'
        //chamar function encode 
        encode(tipo, incremento, userInput())


    } else if (decoder.checked){
        metodo = 'decode'
        //chamar function decode 
        decode(tipo, incremento, userInput())
    }
}

//function que verifica se tem algum campo vazio - tipo de codificação, metodo, ?Entrada do usuário 
function verifyEmptyInputs(){
    if (tipo == undefined){
        alert(`--- Selecione o método de codificação ---\nBase64 ou Cifra de César`)
    } else if(metodo == undefined){
        alert(`--- Marque alguma opção! ---\nCodificar ou Decodificar`)
    }
}

const form = document.forms['form']

form.addEventListener('submit', function(event){
    event.preventDefault();
    methodSelected()
    verifyEmptyInputs()
})