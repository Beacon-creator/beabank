import React from 'react'

export default function Strength() {
  return (
    <div className="p-2 m-5 bg-gray-100 border-white rounded-lg">
      <div className="flex text-sm px-2 my-2">
        <h2 className="">Network Strength: </h2>
        <h2 className="ml-5">45%</h2>
      </div>
      <div className="flex text-sm pt-5 mt-5">
        <h2 className="">Referral Strength:</h2>
        <div className="flex">
          <div className="ml-5">
            <h2 className="">Active</h2>
            <h2 className="items-center justify-center content-center">1</h2>
          </div>

          <hr className="bg-red-500 w-10" />
          <div>
            <h2 className="">Inactive</h2>
            <h2 className="">1</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
