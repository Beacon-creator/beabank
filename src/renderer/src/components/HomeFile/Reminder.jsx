import React from 'react'
import reminder from '../../assets/reminder.svg'

export default function Reminder() {
  return (
    <div className="flex justify-center items-center my-10">
      <button
        className="flex items-center justify-center px-3 py-3 text-sm border-2
         border-white rounded-lg bg-emerald-900 hover:bg-emerald-300 transition"
        style={{ width: '280px' }}
      >
        <img src={reminder} alt="reminder" className="h-5" />
        <h2 className="mx-2">Send Reminder</h2>
      </button>
    </div>
  )
}
