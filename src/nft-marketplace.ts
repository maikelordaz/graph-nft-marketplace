// tipos de variables
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  // Escribo as Item***** para que sea un poco mas facil de leer despues
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import {ActiveItem, ItemListed, ItemBought, ItemCanceled} from "../generated/schema"

export function handleItemBought(event: ItemBoughtEvent): void {
  /*
  * Cada vez que listee un item necesito guardarlo en el graph
  * Actualizar ActiveItem
  * Tomar o crear el itemListed object
  * Cada item tiene un ID unico
  * 
  * ItemBoughtEvent -> el evento
  * ItemBoughtObject: Lo que guardo
  * 
  * ItemBoughtObject y ItemBoughtEvent son tipos distintos y son auto creados en schema y hay 
  * que importarlos
  * 
  * Necesito crear un ItemBoughtObject del ItemBought Event
  */

  // Con .load cargo el ID unico segun los parametros dados
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  // No importa que sea el mismo ID porque esta en tipos distintos. 
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  // Actualizo cada parametro de ItemBought
  itemBought.buyer = event.params.buyer
  itemBought.nftAddress = event.params.nftAddress
  itemBought.tokenId = event.params.tokenId
  // El ! significa que tendremos un activeItem. Si hay un comprador significa que lo compraron
  activeItem!.buyer = event.params.buyer

  itemBought.save()
  activeItem!.save()

}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  let itemCanceled = ItemCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  if(!itemCanceled) {
    itemCanceled = new ItemCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  itemCanceled.seller = event.params.seller
  itemCanceled.nftAddress = event.params.nftAddress
  itemCanceled.tokenId = event.params.tokenId
  // Actualizo mi activeItem con la direccion muerta. Si la tiene quiere decir que fue cancelado
  activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

  itemCanceled.save()
  activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
)
let activeItem = ActiveItem.load(
  getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
)
  if(!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  if(!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  itemListed.seller = event.params.seller
  activeItem.seller = event.params.seller

  itemListed.nftAddress = event.params.nftAddress
  activeItem.nftAddress = event.params.nftAddress

  itemListed.tokenId = event.params.tokenId
  activeItem.tokenId = event.params.tokenId

  itemListed.price = event.params.price
  activeItem.price = event.params.price

  // Si tiene la direccion 0 quiere decir que esta en el mercado y no ha sido comprado
  activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")
  
  itemListed.save()
  activeItem.save()
}

//function nombreFuncion(parametro: tipo de parametro): tipoDeRetorno {}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}
