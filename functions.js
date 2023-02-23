const productos = require('./stock.json')

 const getOfertas = () =>{
    let ofertas = productos[0].Productos.ofertas
    let msg = ofertas.map((e)=>{return `*${e.name}* el precio es: $${e.price}\n`})
    return msg
}
 const getOfertasNames = () =>{
    let ofertas = productos[0].Productos.ofertas
    let msg = ofertas.map((e)=>{return `*${e.name}*`})
    return msg
}

 const getListado = () =>{
    let listado = productos[0].Productos.listado
    return listado
}

 const getPollo = ()=>{
    let lista = getListado()
    let pollo = lista.pollo.map((e)=>{return `*${e.name}* el precio es: $${e.price}\n`})
    return pollo
}

 const getVaca = ()=>{
    let lista = getListado()
    let vaca = lista.vaca.map((e)=>{return `*${e.name}* el precio es: $${e.price}\n`})
    return vaca
}

 const getCerdo = ()=>{
    let lista = getListado()
    let cerdo = lista.cerdo.map((e)=>{return `*${e.name}* el precio es: $${e.price}\n`})
    return cerdo
}

 const getPescado = ()=>{
    let lista = getListado()
    let pescado = lista.pescado.map((e)=>{return `*${e.name}* el precio es: $${e.price}\n`})
    return pescado
}

module.exports = {
    getCerdo,
    getListado,
    getOfertas,
    getOfertasNames, getPescado, getPollo, getVaca
}
