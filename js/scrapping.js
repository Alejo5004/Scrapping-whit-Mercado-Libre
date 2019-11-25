class Scrapping
{
    constructor (){

    }
    traerHTML( url ){
        // --- servicio propio para superar restricciones CORS ... by jjyepez
        const cors   = "https://noesishosting.com/sw/cors/?a=cors&url=" + url
    
        // --- traer el HTML del sitio web
        fetch( cors )
        .then( rsp => rsp.text() )
        .then( rslt => {
            const jsonDatosExtraidos = this.procesarResultados( rslt )
            this.renderDatosExtraidos( jsonDatosExtraidos )
        })
        .catch( err => { console.log( err ) })
    }
    
    // --- procesar con RegExp
    procesarResultados( html ){
        const jsonDatos = []
        var   matches   = null
    
        // --- RegExp by jjyepez
        const expresionRegular = new RegExp( 
            "<img(?:.*?)alt=\'(.*?)\'(?:.*?)src=\'(.*?)\'(?:.*?)<a(?:.*?)href=\"(.*?)\"(?:.*?)<del>(.*?)</del>(?:.*?)fraction\">(.*?)</span>?(?:.*?)discount(?:.*?)>(.*?\%)", "g" )
    
        do {
            // --- extrayendo datos
            matches = expresionRegular.exec( html )
            jsonDatos.push( matches )
    
        }
        while ( matches !== null )
        return jsonDatos
    }
    
    renderDatosExtraidos( datos ){
        const $divResultados = document.getElementById('resultados')
            $divResultados.innerHTML = ''
                
        datos.forEach( reg => {
            if( reg ){
                const $card = document.createElement('div')
                    $card.classList.add('card', 'my-3', 'mx-1', 'col-md-3', 'text-center', 'border', 'border-success')
                    $card.addEventListener('click', ()=>{
                        window.open(reg[3])
                    })
                    $card.innerHTML = 
                    `
                        <h5>${reg[1]}</h5>
                        <div class="card-body">
                            <img src="${reg[2]}" class="card-img-top mb-2 cursor" alt="${reg[1]}"/>
                            <p class="card-text">
                                <small><s>${reg[4]}</s></small>
                                <div class="lead"><b>${reg[5]}</b> <small class="text-success">-${reg[6]} OFF</small></div>
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="reg[3]" class="btn btn-primary btn-block mt-3">Comprar</a>
                        </div>
                    `
                $divResultados.appendChild( $card )
            }
        })
    }
}

module.exports = Scrapping;