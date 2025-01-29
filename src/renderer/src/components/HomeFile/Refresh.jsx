/* eslint-disable prettier/prettier */
import refresh from '../../assets/refresh.svg'
import start from '../../assets/start.png'

export default function Refresh() {
  return (
    <div className="rounded-xl m-2 flex-grow flex items-center justify-center">
      <button
        id="refresh"
        className="bg-green-400 hover:bg-emerald-900 p-2 mr-4 rounded-lg shadow-lg focus:outline-none"
        onClick={() => {
          console.log('Refresh button clicked')
        }}
      >
        <img src={start} alt="start" className="h-5" />
      </button>
      <button
        id="refresh"
        className="bg-green-400 hover:bg-emerald-900 p-2 ml-4 rounded-lg shadow-lg focus:outline-none"
        onClick={() => {
          console.log('Refresh button clicked')
        }}
      >
        <img src={refresh} alt="refresh" className="h-5" />
      </button>
    </div>
  )
}
