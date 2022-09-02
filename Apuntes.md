En el schema.graphql defino lo que seria el equivalente a las tables en Moralis
Son los diferentes tipos en los que puedo crear y/o buscar. Por ejemplo
type ActiveItem @entity {
id: ID!
buyer: Bytes! # address
seller: Bytes! # address
nftAddress: Bytes! # address
tokenId: BigInt!
price: BigInt
}

Los ! significan que son obligatorios
digo
talCosa: tipoDeVariable de talCosa

Aqui definire que quiero que mantenga rastreado mi subgraph. Luego de estp le digo como va a
escuchar los eventos. Esto lo hago en src/\*\*\*.ts

Si en el terminal corro el comando

> graph codegen

me va a a tomar lo que este escrito en schema.grapgql y me va a generar un archivo en la carpeta generated

En src/\*\*\*.ts acomodo como quiero escuchar los eventos

Por ultimo en subgraph.yaml dice

    source:
        address: "0xB078A8978be3781eC4e71ba9116BdCe9ca423fED"
        abi: NFTMarketplace

Esto quiere decir que comience a indexar eventos desde el inicio de la blockchain. Para mejorar esto busco mi contrato en etherscan, veo en que bloque se creo y coloco ese bloque - 1 para que
comience a escuchar eventos justo antes de que se creara mi contrato. Esto lo escribo asi

    source:
      address: "0xB078A8978be3781eC4e71ba9116BdCe9ca423fED"
      abi: NFTMarketplace
      startBlock: 11301902

Con esto esta todo listo para hacer deploy a The Graph. Voy a mi dashboard en la pagina
y sigo las instrucciones y comandos que estan a la derecha en la seccion de AUTH & DEPLOY
Cuando corra el ultimo comando que es el deploy como tal

> graph deploy --studio nft-marketplace

Me va a pedir una version. Cuando hago el deploy incluso lo sube a IPFS y me da el CID donde dice

✔ Upload subgraph to IPFS

Build completed: QmUQSAaRsEGAVJRRRJpmD4S7BLC8heSTkZZe4Rc3SNZ2Y9

Luego si voy a mi dashboard voy a ver status deployed

En el dashboard en Logs puedo ver si algo sale mal. Y en playground puedo correr solicitudes o "Queries" donde puedo ver diferentes eventos y respuestas de mi graphql para probarlo corro
algun script en mi backend. En este caso que le hice deploy a rinkeby debo correr el script en
Rinkeby

> yarn hardhat run scripts/mint-and-list.js --network rinkeby

Una vez listeado el NFT deberia emitir un evento y deberia ver en mi dashboard un ItemListed
y un ActiveItem
