import { Statement } from "@prisma/client"

export function convertToSpecificDataStructure(data: Statement[]) {
  return data.map((d) => {
    return {
      EntryId: d.id,
      SourceCurrency: d.sourceCurrency,
      DestinationCurrency: d.destinationCurrency,
      SellPrice: d.sellPrice,
      BuyPrice: d.buyPrice,
      CapAmount: d.capAmount
    }
  })
}
