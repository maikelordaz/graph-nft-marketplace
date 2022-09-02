// tipos de variables
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  // Escribo as Item***** para que sea un poco mas facil de leer despues
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import {ActiveItem, ItemListed, ItemBought, ItemCanceled, ActiveItem} from "../generated/schema"

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

export function handleItemCanceled(event: ItemCanceledEvent): void {}

export function handleItemListed(event: ItemListedEvent): void {}

//function nombreFuncion(parametro: tipo de parametro): tipoDeRetorno {}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}
