class Imagens{
	constructor(){
		this.fotos = [
			'foto-1',
			'foto-2',
			'foto-3',
			'foto-4',
			'foto-5'
		]
	}

	adicionarImagens(){
		let divFotos = document.getElementById('divFotos')

		for (var i = 0; i < this.fotos.length; i++) {
			let img = document.createElement('img')
			img.src = `img/${this.fotos[i]}.jpg`
			img.id = `foto-${i+1}`

			divFotos.appendChild(img)
		}

		this.adicionarBotoes()
		this.adicionarSetas()
	}

	adicionarSetas(){

		for (var i = 0; i < 2; i++) {
			let button = document.createElement('button')
			let container = document.getElementById('container')

			if(!i){
				button.id = 'setaEsquerda'
				button.innerHTML = '<i class="fas fa-chevron-left"></i>'
				button.setAttribute('onclick', "carousel.moverSeta('esquerda')")
			}else{
				button.id = 'setaDireita'
				button.innerHTML = '<i class="fas fa-chevron-right"></i>'
				button.setAttribute('onclick', "carousel.moverSeta('direita')")
			}

			button.className = 'seta'

			container.appendChild(button)

		}
	}

	adicionarBotoes(){
		let divBotoes = document.getElementById('divBotoes')

		for (var i = 0; i < this.fotos.length; i++) {
			let link = document.createElement('a')
			link.href = `#foto-${i+1}`
			link.id = `foto-${i+1}`
			if(i == 0) link.className = 'active'

			link.setAttribute('onclick', 'carousel.moverClick(this)')

			divBotoes.appendChild(link)
		}
	}
}

class Carousel extends Imagens{

	constructor(){
		super()
	}

	moverSeta(lado){
		let link = window.location
		if(!link.href.includes('#')) link.href = `#${this.fotos[0]}`

		for (var i = 0; i < this.fotos.length; i++) {
			let fotoAtual = `foto-${i+1}`
			if(link.href.includes(fotoAtual)){

				let divBotoes = document.getElementById('divBotoes')
				let botoes = divBotoes.children


				if (lado == 'direita') {
					var add = 1

					for (var a = 0; a < botoes.length; a++) {
						if(botoes[a].className == 'active') botoes[a].className = ''
						else if(botoes[a].id.includes((i+1)+add)){ 
							botoes[a].className = 'active'
						}		
					}

				}else if(lado == 'esquerda'){
					var add = 0

					for (var a = 0; a < botoes.length; a++) {
						if(botoes[a].className == 'active') botoes[a].className = ''
						else if(botoes[a].id.includes(i)){
							botoes[a].className = 'active'
						}		
					}
				}

				let imagem = `foto-${(i+1)+add}`
				let lastImagem = `foto-${this.fotos.length + 1}`
				let firstImagem = this.fotos[0]
				

				if(lado == 'direita'){
					if(imagem == lastImagem){
						link.href = `#${this.fotos[0]}`
						botoes[0].className = 'active'	
					}else {
						link.href = `#${imagem}`
					}
				}


				else if(lado == 'esquerda'){
					if(imagem == firstImagem){
						link.href = `#foto-${this.fotos.length}`
						botoes[botoes.length-1].className = 'active'
					}else{
						link.href = `#foto-${i}`
					}
				}

				break
			}
			
		}
	}

	moverClick(e){
		let divBotoes = document.getElementById('divBotoes')
		let links = divBotoes.children
		
		for (var i = 0; i < links.length; i++) {
			if(links[i].className = 'active'){
				links[i].className = ''
			}
		}

		e.className = 'active'
	}

	moverAutomatico(lado, tempo){
		setInterval(()=>{
			this.moverSeta(lado)
		}, tempo)
	}
}

imagens = new Imagens()
carousel = new Carousel()

imagens.adicionarImagens()
carousel.moverAutomatico('direita', 5000)
