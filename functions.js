const productos = require("./stock.json");

const getOfertas = () => {
  let ofertas = productos[0].Productos.ofertas;
  let msg = ofertas.map((e) => {
    return `*${e.name}* el precio es: $${e.price}\n`;
  });
  return msg;
};
const getOfertasNames = () => {
  let ofertas = productos[0].Productos.ofertas;
  let msg = ofertas.map((e) => {
    return `*${e.name}*`;
  });
  return msg;
};

const getListado = () => {
  let listado = productos[0].Productos.listado;
  return listado;
};

const getPollo = () => {
  let lista = getListado();
  let pollo = lista.pollo
  return pollo;
};

const getPolloMsg = () => {
  let lista = getListado();
  let pollo = lista.pollo.map((e) => {
    return `*${e.name}* el precio es: $${e.price}, por KILO\n`;
  });
  return pollo;
};

const getVaca = () => {
  let lista = getListado();
  let vaca = lista.vaca
  return vaca;
};

const getVacaMsg = () => {
  let lista = getListado();
  let vaca = lista.vaca.map((e) => {
    return `*${e.name}* el precio es: $${e.price}, por KILO\n`;
  });
  return vaca;
};

const getCerdo = () => {
  let lista = getListado();
  let cerdo = lista.cerdo;
  return cerdo;
};

const getCerdoMsg = () => {
  let cerdo = getCerdo();
  let msg = cerdo.map((e) => {
    return `*${e.name}* el precio es: $${e.price}, por KILO\n`;
  });
  return msg;
};

const getPescado = () => {
  let lista = getListado();
  let pescado = lista.pescado
  return pescado;
};

const getPescadoMsg = () => {
  let lista = getListado();
  let pescado = lista.pescado.map((e) => {
    return `*${e.name}* el precio es: $${e.price}, por KILO\n`;
  });
  return pescado;
};

module.exports = {
  getCerdo,
  getCerdoMsg,
  getListado,
  getOfertas,
  getOfertasNames,
  getPescado,
  getPescadoMsg,
  getPollo,
  getPolloMsg,
  getVaca,
  getVacaMsg
};
