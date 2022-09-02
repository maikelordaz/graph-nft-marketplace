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
