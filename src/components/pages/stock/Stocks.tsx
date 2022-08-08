import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { stockState } from '../../../store/stockState'
import { Stock } from '../../../model/stock-model'


const Stocks = () => {
  const setStockInfo = useRecoilValue<Array<Stock>>(stockState)
  return (
    <>
      <h3 className='font-bold text-lg pb-1'>在庫一覧</h3>
      <table className='table-fixed border-collapse'>
        <thead>
          <tr>
            <th className='p-2 border border-solid border-gray-600'>No</th>
            <th className='p-2 border border-solid border-gray-600'>在庫名</th>
            <th className='p-2 border border-solid border-gray-600'>在庫数</th>
          </tr>
        </thead>
        {(setStockInfo || []).map((stock,index)=>( 
          <tbody key={stock.id}>
            <tr>
                <td className='p-2 border border-solid border-gray-600'>{index+1}</td>
                <td className='p-2 border border-solid border-gray-600 text-red-500 underline'><Link to={`/stock/${stock.id}`} state={{data:stock}}>{stock.name}</Link></td>
                <td className='p-2 border border-solid border-gray-600'>{stock.num}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

export default Stocks
