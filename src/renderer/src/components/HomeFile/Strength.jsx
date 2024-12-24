import React from 'react'
import reminder from '../../assets/reminder.svg'

export default function Strength() {
  return (
    <div>
       <div className="flex justify-center items-center my-10">
            <button
              className="flex items-center justify-center px-3 py-3 text-sm border-2
               border-white rounded-lg bg-emerald-900 hover:bg-emerald-300 transition"
              style={{ width: '280px' }}
            >
              <img src={reminder} alt="reminder" className="h-5" />
              <h2 className="mx-2">Check Network Strength</h2>
            </button>
          </div>
      <div className="p-2 m-5 bg-gray-100 border-white rounded-lg">
        <div className="flex text-sm px-2 my-2">
          <h2 className="">Network Strength: </h2>
          <h2 className="ml-5">45%</h2>
        </div>
      </div>
    </div>
  )
}
