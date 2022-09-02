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

Con esto esta todo listo para hacer deploy a The Graph
