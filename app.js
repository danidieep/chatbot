const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const {getCerdo, getListado, getOfertas, getPescado, getPollo, getVaca, getOfertasNames} = require('./functions.js')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

let total=0

const flowEfectivo = addKeyword(['efectivo']).addAnswer('Lo espero con los billetes!😃') 
const flowOnline = addKeyword(['online']).addAnswer(`Espero su comprobante! El monto es: ${total}, este es el link https://mpago.la/16AGQBt`)

const flowPago = addKeyword(['pago', 'pagar', 'ir a pagar']).addAnswer(
    'por que medio realizara el pago?', 
    {
        buttons: [{ body: 'efectivo' }, { body: 'online' }]
    },
    null,
    [flowEfectivo, flowOnline]
)

const flowSeguirComprando = addKeyword(['seguir', 'seguir comprando']).addAnswer(
    'que desea seguir viendo?',
    {
        buttons: [{ body: 'ofertas' }, { body: 'listado' }]
    },
    null,
    [flowOfertas, flowListado]
)

const flowOferta1 = addKeyword(['Pata muslo']).addAnswer(
    'a continuacion indica cuantas promociones quiere, solo caracteres numericos!:',
    {capture:true},
    (ctx)=>{
        if(typeof ctx.body !== 'number') return fallBack()
        total+= 1290*ctx.body
        return `Genial! tu precio total es ${1290*ctx.body}`
    },
)

const flowOferta2 = addKeyword(['8 medallones vacunos']).addAnswer(
    'a continuacion indica cuantas promociones quiere, solo caracteres numericos!:',
    {capture:true},
    (ctx)=>{
        if(typeof ctx.body !== 'number') return fallBack()
        total+= 849*ctx.body
        return `Genial! tu precio total es ${1290*ctx.body}`
    },
).addAnswer('desea seguir comprando o ir a pagar?',)

const flowOferta3 = addKeyword(['Bondiola']).addAnswer(
    'a continuacion indica cuantas promociones quiere, solo caracteres numericos!:',
    {capture:true},
    (ctx)=>{
        if(typeof ctx.body !== 'number') return fallBack()
        total+= 1399*ctx.body
        return `Genial! tu precio total es ${1399*ctx.body}`
    },
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [

    ],
    null,
    null,
    []
)

const flowOfertas = addKeyword(['pedir oferta', 'oferta']).addAnswer(
    'selecciona el nombre de la oferta que te interesa:', {
        buttons: [{ body: 'Pata muslo' }, { body: '8 medallones vacunos' }, { body: 'bondiola' }]
    },
    null,
    [flowOferta1, flowOferta2, flowOferta3]
)

const flowListado = addKeyword(['listado']).addAnswer(
    [''],
    null,
    null,
    []
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a *Carnave*')
    .addAnswer(
        getOfertas(),
        null,
        null,
        [flowOfertas, flowListado]
    ).addAnswer("Si desea comprar una de las ofertas escriba *oferta*\nPara solicitar el listado de precios escriba : Listado",null,null,[flowListado, flowOfertas])

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
