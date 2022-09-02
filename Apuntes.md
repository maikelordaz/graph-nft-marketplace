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
escuchar los eventos. Esto lo hago en src/mapping.ts

Si en el terminal corro el comando

> graph codegen

me va a a tomar lo que este escrito en schema.grapgql y me va a generar un archivo en la carpeta generated
