import { Stock } from "../model/stock-model"

export async function getAllStocksData(){
  const result = 
    await fetch("http://127.0.0.1:8000/api/stock",{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const records = await result.json()
  return records
}


export async function addStock(targetStock:Stock,num:number){
  const updateStock = {
    name:targetStock.name,
    num:Number(targetStock.num) + Number(num),
    add_work: targetStock.add_work,
    decrease_work:targetStock.decrease_work,
  }
  fetch(`http://127.0.0.1:8000/api/stock/${targetStock.id}/`,{
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(updateStock)
  })
}

export async function decreaseStock(targetStock:Stock,num:number=1){
  const updateStock = {
    name:targetStock.name,
    num:Number(targetStock.num) - num,
    add_work: targetStock.add_work,
    decrease_work:targetStock.decrease_work,
  }

  fetch(`http://127.0.0.1:8000/api/stock/${targetStock.id}/`,{
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(updateStock)
  }).then((res)=>{})
  .catch((err)=>{console.log('失敗',err)})
}
