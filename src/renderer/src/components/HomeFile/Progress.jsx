import React from 'react'
import refresh from '../../assets/refresh.svg'
import start from '../../assets/start.png' 


export default function Progress() {
  return (
    <div className="flex-col flex items-center justify-center p-2">
      <div
        className="p-5 m-3 rounded-lg bg-gray-400 focus:outline-none"
        style={{ width: '280px', height: '150px' }}
      >
        <div className="flex text-lg">
          <h2 className="text-green-400">Current balance: </h2>
          <h2>100.0000</h2>
        </div>
        <div className="flex text-sm pt-5 mt-5">
          <h2 className="">Timer:</h2>
          <h2 className="">12:00</h2>
        </div>
      </div>
      <div className="rounded-xl m-2 flex-grow flex items-center justify-center">
        <button
          id="start"
          className="bg-green-400 hover:bg-emerald-900 p-2 mr-4 rounded-lg shadow-lg focus:outline-none"
          onClick={() => {
            console.log('Start button clicked')
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
    </div>
  )
}
