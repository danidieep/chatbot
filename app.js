const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");
const {
  getCerdo,
  getListado,
  getOfertas,
  getPescado,
  getPollo,
  getVaca,
  getOfertasNames,
  getCerdoMsg,
} = require("./functions.js");
// const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require("@bot-whatsapp/database/json");
const mySqlAdapter = require("@bot-whatsapp/database/mysql");

let STATE_APP = { total: 0 };
let parcial = 0;
let productoBuscado = { name: "", price: 0 };


const flowCantidad = addKeyword(["genial"]).addAnswer(
  [
    `a continuacion indica cuantos kgs de ${productoBuscado.name} quiere solo caracteres numericos!:`,
  ],
  { capture: true },
  async (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = productoBuscado.price * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return await flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowCerdo = addKeyword("cerdo").addAnswer(
  [
    "a continuacion indica el nombre del producto que le interesa:",
    getCerdoMsg(),
  ],
  {capture:true},
  async (ctx,{flowDynamic, fallBack}) => {
    let productos = getCerdo();
    productoBuscado = productos.filter(
      (e) => e.name.toLowerCase() == ctx.body.toLowerCase()
    );
    if (!productoBuscado) return fallBack();
    console.log(productoBuscado)
     await flowDynamic('genial') 
  }
).addAnswer('asdadasdaddada', {delay:2500});

const flowVaca = addKeyword(["vaca"]).addAnswer(
  ["a continuacion indica el nombre del producto que le interesa:", getVaca()],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 1399 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowPollo = addKeyword(["pollo"]).addAnswer(
  ["a continuacion indica el nombre del producto que le interesa:", getPollo()],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 1399 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowPescado = addKeyword(["Pescado"]).addAnswer(
  ["a continuacion indica el nombre del producto que le interesa:", getPescado],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 1399 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowOferta1 = addKeyword(["Pata muslo"]).addAnswer(
  "a continuacion indica cuantas promociones quiere, solo caracteres numericos!:",
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 1290 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowOferta2 = addKeyword(["8 medallones vacunos"]).addAnswer(
  [
    "a continuacion indica cuantas promociones quiere, solo caracteres numericos!:",
  ],
  { capture: true },
  async (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 849 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };

    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowOferta3 = addKeyword(["Bondiola"]).addAnswer(
  "a continuacion indica cuantas promociones quiere, solo caracteres numericos!:",
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    let num = Number(ctx.body);
    if (isNaN(num)) return fallBack();
    parcial = 1399 * num;
    STATE_APP[ctx.from] = {
      ...STATE_APP[ctx.from],
      total: (STATE_APP.total += parcial),
    };
    return flowDynamic(
      `Genial! tu precio por este producto es ${parcial}, si desea continuar comprando escriba *continuar*, si quiere ir a pagar escriba *pagar*`
    );
  }
);

const flowOfertas = addKeyword(["pedir oferta", "oferta"]).addAnswer(
  "selecciona el nombre de la oferta que te interesa:",
  {
    buttons: [
      { body: "Pata muslo" },
      { body: "8 medallones vacunos" },
      { body: "bondiola" },
    ],
  },
  null,
  [flowOferta1, flowOferta2, flowOferta3]
);

const flowListado = addKeyword(["listado"]).addAnswer(
  [
    "A continuacion escriba que producto le interesa? *Cerdo*, *Pollo*, *Vaca* o *Pescado*",
  ],
  null,
  null,
  [flowCerdo, flowVaca, flowPollo, flowPescado]
);

const flowEfectivo = addKeyword(["efectivo"]).addAnswer(
  "Lo espero con los billetes!😃"
);
const flowOnline = addKeyword(["online"]).addAnswer(
  `Espero su comprobante! `,
  null,
  async (ctx, { flowDynamic }) => {
    flowDynamic(
      `El monto es:$${
        STATE_APP[ctx.from].total
      } , este es el link https://mpago.la/16AGQBt`
    );
  }
);

const flowPago = addKeyword(["pago", "pagar", "ir a pagar"])
  .addAnswer(["Tu total es:"], null, async (ctx, { flowDynamic }) => {
    console.log(STATE_APP, ctx);
    await flowDynamic(`$ ${STATE_APP[ctx.from].total}`);
  })
  .addAnswer(
    `por que medio quiere pagar?`,
    {
      buttons: [{ body: "efectivo" }, { body: "online" }],
    },
    { delay: 2000 },
    [flowEfectivo, flowOnline]
  );


const flowContinuar = addKeyword(["continuar"])
  .addAnswer("🙌 Seleccione que quiere ver:")
  .addAnswer(
    "Si desea comprar una de las ofertas escriba *oferta*\nPara solicitar el listado de precios escriba : *Listado*",
    null,
    null,
    [flowListado, flowOfertas]
  );

const flowPrincipal = addKeyword(["hola", "ole", "alo"])
  .addAnswer("🙌 Hola bienvenido a *Carnave*")
  .addAnswer(getOfertas(), null, null, [flowOfertas, flowListado])
  .addAnswer(
    "Si desea comprar una de las ofertas escriba *oferta*\nPara solicitar el listado de precios escriba : Listado",
    null,
    null,
    [flowListado, flowOfertas]
  );

const main = async () => {
  const adapterDB = new JsonFileAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowContinuar,
    flowPago,
    flowCantidad,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  // QRPortalWeb()
};

main();
