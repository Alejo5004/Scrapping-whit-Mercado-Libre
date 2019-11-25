class Dates
{
    constructor(){
        
    }
    actualizarFecha() {
        const hoy = new Date();
        const $fecha = document.getElementById('fecha');
        $fecha.innerHTML = `Actualizado al: ${('0' + hoy.getDate()).substr(-2)}/${('0' + (hoy.getMonth() + 1)).substr(-2)}/${hoy.getFullYear()}`;
    }                            
}
module.exports = Dates
