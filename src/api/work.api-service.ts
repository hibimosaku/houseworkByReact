export async function getAllWorksData(){
  const result = 
    await fetch("http://127.0.0.1:8000/api/list-work",{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const records = await result.json()
  return records
}
// export function creatRecord(){
//   const data = {

//   }
//   fetch("http://127.0.0.1:8000/api/record",{
//     method:"POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body:
//   })
//   return
// }

// export async function getRecordDetail(id:string){
//   const result = 
//     await fetch(`http://127.0.0.1:8000/api/record/${id}`,{
//       method:'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//   const records = await result.json()
//   return records
// }

// export async function getWorkDetail(id:string){
//   const result = 
//     await fetch(`http://127.0.0.1:8000/api/detail-work/${id}`,{
//       method:'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//   const records = await result.json()
//   return records

// }