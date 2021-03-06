//DECLARAR VARIÁVES 
var converterDe = document.getElementById("de");
var numInserido = document.getElementById("numero");
var resultadoBinario = document.getElementById("binario");
var resultadoDecimal = document.getElementById("decimal");
var resultadoOctal = document.getElementById("octal");
var resultadoHexa = document.getElementById("hexa");

//---------------------------------------------------------------

function limpar(){
	//BINÁRIO
	resultadoBinario.value = '0';

	//DECIMAL
	resultadoDecimal.value = '0';

	//OCTAL
	resultadoOctal.value = '0';

	//HEXADECIMAL
	resultadoHexa.value = '0';
}

//---------------------------------------------------------------

function conversaoBases(){

	switch(converterDe.value){
		case '':
			alert("Escolha o tipo de número que foi inserido.");
			break;
		case '1':
		//BINÁRIO
			
			//checa se o valor inserido contem numeros só numeros 0 ou 1 se falso avisa
			//regular expression (regex) = /^[0-1]+$/
			// simbolo ^ (fora das chaves)= pesquisa caracter no comeco do string ; 
			//	       $ = pesquisa no final do string; 
			//		   + = pelo menos um; 
			//	      // = pesquisa por um padrão
			//       [] = pesquisa qualquer caracter dentro das chaves
			if( /^[0-1]+$/.test(numInserido.value) === false){
				alert("Números binários só contém os caracteres 0 e 1.")
			}
			else{
				//BINÁRIO
				resultadoBinario.value = numInserido.value;

				//DECIMAL
				resultadoDecimal.value = binarioToDecimal(numInserido.value);

				//OCTAL
				resultadoOctal.value = binarioToOctal(numInserido.value);

				//HEXADECIMAL
				resultadoHexa.value = binarioToHexa(numInserido.value);
			}
		break;
		case '2':
			//DECIMAL
			if( /[a-zA-Z]/g.test(numInserido.value) === true){
				alert("Números decimais só contém números.")
			}
			else{
				//BINÁRIO
				resultadoBinario.value = decimalToBinario(numInserido.value);

				//DECIMAL
				resultadoDecimal.value = numInserido.value;

				//OCTAL
				resultadoOctal.value = decimalToOctal(numInserido.value);

				//HEXADECIMAL
				resultadoHexa.value = decimalToHexa(numInserido.value);
			}
		break;
		case '3':
			//OCTAL
			if( /^[0-7]+$/g.test(numInserido.value) === false){
				alert("Números octais só vão de 0 a 7.")
			}
			else{
				//BINÁRIO
				resultadoBinario.value = octalToBinario(numInserido.value);

				//DECIMAL
				resultadoDecimal.value = octalToDecimal(numInserido.value);

				//OCTAL
				resultadoOctal.value = numInserido.value;

				//HEXADECIMAL
				resultadoHexa.value = octalToHexa(numInserido.value);
			}
		break;
		case '4':
			if( /^[10-15g-z]+$/g.test(numInserido.value) === true){
				alert("Números hexadecimais só vão de 0 a 9 e de A a F.")
			} else{
				//HEXADECIMAL
					//BINÁRIO
					resultadoBinario.value = hexaToBinario(numInserido.value);

					//DECIMAL
					resultadoDecimal.value = hexaToDecimal(numInserido.value);

					//OCTAL
					resultadoOctal.value = hexaToOctal(numInserido.value);

					//HEXADECIMAL
					resultadoHexa.value = numInserido.value;
			}
		break;
	}
}

//---------------------------------------------------------------

//FUNÇÃO QUE TRANFORMA NÚMERO DE BINÁRIO PARA DECIMAL
// 		a função pega cada caracter do fim ao começo
// 		e verifica se é o numero 1
// 		se for verdadeiro ele irá potencializar 2 à posição do caracter 
// 		que é contada pela variavel posicaoDoCaracter
// 		e o resultado é armazenar na variável numResultado 
// 		e somado com o contéudo já presente nesta variável
//  
function binarioToDecimal(num){

	// remover espaços em branco da string
	num = num.replace(/ /g,'');

	//variavel onde será armazenado o resultado
	var numResultado = 0;

	//valor para saber em que posição do número está
	//esse valor será aumentando por 1 a cada loop 
	var posicaoDoCaracter = 0;

	//valor do comprimeto do numero/string -1 para começar do primero numero da direita
	//esse valor será diminuido por 1 a cada loop
	var comprimentoAoContrario = num.length - 1;


	//se o numero atual for 1
	//entrar e potenciar 2 pela posição do caracter
	//e armazenar na variavel numResultado
	//e somar com o contéudo desta variável
	for (var i = 0; i < num.length; i++) {

		if(num.charAt(comprimentoAoContrario) === '1'){
			numResultado = numResultado + (2 ** posicaoDoCaracter);
		}

		posicaoDoCaracter++;
		comprimentoAoContrario--;
	}

	return numResultado;
}


//-----------------------
	// FUNÇÃO QUE SEPARA O NÚMERO BINARIO PARA CONJUNTO DE N BITS
	//		separa os conjuntos de N bits
	//		e passa esse conjuntos para a funcao binarioToOctal e binario para Hexadecimal
	function conjuntosBinario(numero, numeroDeBits){
		// remover todos os espaços em branco da string
		numero = numero.replace(/ /g,'');

		// comeco e fim para usar na função substring
		var comeco = numero.length;
		var fim = numero.length - numeroDeBits;

		//array para guardar cada conjunto de N bits
		var arrayResultado = Array();

		for (var i = 0; i < numero.length; i++) {
			if(numero.substring(comeco, fim) == ''){
				//se não houver mais numeros ele irá sair do looop
				break;
			}

			//passa cada conjunto de N bits 
			// para a função de binario para decimal
		 	arrayResultado[i] = binarioToDecimal(numero.substring(comeco, fim));

		 	//fim e comeco somados com N 
		 	// para ir pegando cada N bits do numero
			fim = fim - numeroDeBits;
			comeco = comeco - numeroDeBits;
		}

		return arrayResultado;
	}


//--------------------------------------------------------------
//FUNÇÃO QUE TRANSFORMA DE BINÁRIO PARA OCTAL
//		separar conjuntos de 3 bits, do fim da da string para o começo 
//		(da direita para  esquerada)
//		colocar os numeros numa string para exibilos sem virgula
// 		e colocar os números na ordem correta

function  binarioToOctal(num){

	// array que guarda conjuntos de 3 bits
	var arrayResultado = conjuntosBinario(num, 3);

	//loop para colocar os numeros numa variavel para exibi-los sem as virgulas da array
	var resultadoContrario = arrayResultado.toString().replace(/,/g, '');
	var resultado = '';

	for(var i = resultadoContrario.length-1; i >= 0; i--){
		resultado = resultado + '' + resultadoContrario[i];
	}		

	return resultado;
}


//---------------------------------------------------------
// FUNÇÃO PRA CONVERTER DE BINÁRIO PARA HEXADECIMAL
//		separar conjuntos de 4 bits, do fim da da string para o começo 
//		(da direita para esquerada)
// 		e passa-los pela funcao que converte de binario para hexadecimal
//		e depois converter numeros de 10 a 15 para letra
// 		e colocar os números na ordem correta
function binarioToHexa(num){

	// array para guardar cada conjunto de 4 bits
	var arrayResultado = conjuntosBinario(num, 4);


	// loop para colocar os numeros 
	// numa variavel para exibi-los sem as virgulas da array
	// e modificar os números de 10 a 15 para A a F
	var resultado = '';
	var numeroEmOrdem = [];
	var indexContrario = arrayResultado.length-1;

	for(var i = 0; i < arrayResultado.length; i++){
		var numNormal = [10, 11, 12, 13, 14, 15];
		var numLetra = ['A', 'B', 'C', 'D', 'E', 'F'];

		for(var x = 0; x < numNormal.length; x++){
			if(arrayResultado[i] === numNormal[x]){
				// se for igual mudar para o mesmo index na array com letras
				arrayResultado[i] = numLetra[x];
				break;
			}
		}	
			numeroEmOrdem[indexContrario] = arrayResultado[i];
			indexContrario--;
	}

	resultado = numeroEmOrdem.toString().replace(/,/g,'');

	return resultado;
}


//----------------------------------------------------------------

// FUNÇÃO QUE CONVERTER DE HEXADECIMAL PARA BINÁRIO
// 		primeira a função colocar os números separados na array listaDeNumeros
//		depois tranformam o padrão alfabético em numérico, converte todos os numeros para int
//		e passa esses números para a função decimalToBinario 
//		e depois converte esse numero para string e retira as virgulas

function hexaToBinario(num){

	// remover espaços em branco da string
	num = num.replace(/ /g,'');

	// deixa todos os números em capitular
	num = num.toUpperCase();
	
	//colocar numeros na array
	var listaDeNumeros = Array();
	for(var i = 0; i < num.length; i++){
		listaDeNumeros[i] = num.charAt(i);
	}


	//transformar letras em numeros se houver
	for(var i = 0; i < listaDeNumeros.length; i++){
		var numNormal = [10, 11, 12, 13, 14, 15];
		var numLetra = ['A', 'B', 'C', 'D', 'E', 'F']; 

		for(var x = 0; x < numNormal.length; x++){
			if(listaDeNumeros[i] === numLetra[x]){
				listaDeNumeros[i] = numNormal[x];
				break;
			}
		}	
			if(!isNaN(listaDeNumeros[i])){
				listaDeNumeros[i] = parseInt(listaDeNumeros[i]);
			}
	}

	return listaPraBinario(listaDeNumeros, 4);

}

//-----------------------------------------------------

// FUNÇÃO QUE TRANSFORMA DECIMAL PARA BINÁRIO
//		a funcao pega o numero e entra em um loop
//		onde o numeros será divido e se o resto for igual a 1 guarda 1 e ao contrario guarda 0
//		depois o número é colocado na ordem correta e retornado como string
//		
function decimalToBinario(num){
	
	var numBinarioOrdenado = Array();
	var numeroDividido = 0;
	var indexInterno = 0;
	
	//var i = 0; 
	//do {
		//declarado aqui para ficar vazio depois
		var numBinario = [];

		numeroDividido = num;

		//é um loop do porque se for só um número ele entra direto no loop sem problema
		do{	
			//continua a dividir um número até ser 0
			if(numeroDividido % 2 === 1){
				numBinario[indexInterno] = 1;	
			}
			else{
				numBinario[indexInterno] = 0;
			}

			//divide o numero e o arredonda
			numeroDividido = Math.floor(numeroDividido / 2);

			//vai para proximo local na array
			indexInterno++;

		} while(numeroDividido > 0);
		
		
		//coloca o numero da ordem certa
		var indexNormal = numBinarioOrdenado.length;
		var indexContrario = numBinario.length - 1;

		for(var x = 0; x < numBinario.length; x++){
			// se for numero coloca na outra array
			// na orderm correta
			if(!isNaN(numBinario[indexContrario])){
				numBinarioOrdenado[indexNormal] = numBinario[indexContrario];

				indexContrario--;
				indexNormal++;
			}
		}

		//i++;	
	//}while (i < num.length)

	
	return numBinarioOrdenado.toString().replace(/,/g, '');
}

//------------------------------------------------------------

// FUNÇÃO DE HEXADECIMAL PARA DECIMAL
//	usa a funcao hexaToBinario para pegar o numero binario
// e depois usa outra funcao binarioToDecimal	
function hexaToDecimal(num){
	var numeroBinario = hexaToBinario(num);
	var numeroDecimal = binarioToDecimal(numeroBinario);

	return numeroDecimal;
}


//------------------------------------------------------------

	// FUNÇÃO DE HEXADECIMAL PARA OCTAL
	//		usa a funcao hexaToBinario para pegar o numero binario
	// 		e depois usa outra funcao binarioToDecimal	
	function hexaToOctal(num){
		var numeroBinario = hexaToBinario(num);
		return binarioToOctal(numeroBinario);
	}

//------------------------------------------------------------

	// FUNÇÃO DE OCTAL PARA BINÁRIO
	//		coloca numeros em uma lista/array e passa para a funcao listaPra binário
	// 
	function octalToBinario(num){

		// remover espaços em branco da string
		num = num.replace(/ /g,'');
		
		//colocar numeros na array e converte-los em int
		var listaDeNumeros = Array();
		for(var i = 0; i < num.length; i++){
			listaDeNumeros[i] = parseInt(num.charAt(i));
		}

		//Pega números convertidos para binario e coloca em string
		return listaPraBinario(listaDeNumeros, 3);

	}

//------------------------------------------------------------

	// FUNÇÃO DE OCTAL PARA DECIMAL
	//			
	function octalToDecimal(num){

		var numBinario = octalToBinario(num);

		return binarioToDecimal(numBinario);

	}

//------------------------------------------------------------

	// FUNÇÃO DE OCTAL PARA HEXADECIMAL
	//			
	function octalToHexa(num){

		var numBinario = octalToBinario(num);

		return binarioToHexa(numBinario);

	}

//------------------------------------------------------------

	// FUNÇÃO DE DECIMAL PARA OCTAL
	//			
	function decimalToOctal(num){

		var numBinario = decimalToBinario(num);

		return binarioToOctal(numBinario);

	}

//------------------------------------------------------------

	// FUNÇÃO DE DECIMAL PARA HEXADECIMAL
	//			
	function decimalToHexa(num){

		var numBinario = decimalToBinario(num);

		return binarioToHexa(numBinario);

	}

//-------------------------------------------------------

	// FUNÇÃO QUE PASSA UMA LISTA DE NUMEROS UM POR UM
	// DEPOIS VERIFICA SE CADA NÚMERO QUE RETORNA TEM A QUANTIDADE CORRETA DE BITS
	// SE NÃO ADICIONA OS ZEROS NECESSÁRIOS ANTES
	//		função usada nas funções de hexadecimal e octal para binário
	function listaPraBinario(lista, qtdBits){
		//passa cada numero individualmente pela funcao decimal para binário
		//e depois verifica se precisa de zeros para completar o conjunto de N bits
		var numerosBinarios = Array();
		for (var i = 0; i < lista.length; i++) {
			numerosBinarios[i] = decimalToBinario(lista[i]);
			
			if(numerosBinarios[i].length < qtdBits){
				var zerosQfaltam = qtdBits - numerosBinarios[i].length;			
				var index = 0;
				var zeros = '';

				while(index < zerosQfaltam){
					zeros = zeros + '0';
					index++;
				}

				numerosBinarios[i] = zeros + numerosBinarios[i];
			}	
		}
		
		return numerosBinarios.toString().replace(/,/g,'');
	}
	