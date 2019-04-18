const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = pegaCartoesUsuario()

    function pegaCartoesUsuario(){
        let cartoesLocal = JSON.parse(localStorage.getItem(usuario))
        if(cartoesLocal){
            return cartoesLocal.map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo))
        }else{
            return []
        }
    }
    
    cartoes.forEach(cartao => {
        preparaCartao(cartao)
    });
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))
        ))
    }

    function preparaCartao(cartao) {
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvaCartoes()
            render()
        })
    }

    login.on("login", ()=>{
        cartoes = pegaCartoesUsuario()
        render()
    })

    login.on("logout", ()=>{
        cartoes = []
        render()
    })

    function adiciona(cartao){
        if (logado) {
            cartoes.push(cartao)
            cartao.on("mudanca.**", render)
            salvaCartoes()
            preparaCartao(cartao)
            render()
            return true
        }else{
            alert("Você não está logado.")
            return false
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
