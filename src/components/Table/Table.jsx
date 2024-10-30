'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const TableContent = () => (
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="text-xs uppercase bg-[#9b59b6] text-white">
      <tr>
        <th scope="col" className="px-6 py-3">Ads</th>
        <th scope="col" className="px-6 py-3">January</th>
        <th scope="col" className="px-6 py-3">February</th>
        <th scope="col" className="px-6 py-3">March</th>
        <th scope="col" className="px-6 py-3">April</th>
        <th scope="col" className="px-6 py-3">May</th>
        <th scope="col" className="px-6 py-3">June</th>
        <th scope="col" className="px-6 py-3">July</th>
        <th scope="col" className="px-6 py-3">August</th>
        <th scope="col" className="px-6 py-3">September</th>
        <th scope="col" className="px-6 py-3">October</th>
        <th scope="col" className="px-6 py-3">November</th>
        <th scope="col" className="px-6 py-3">December</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(9)].map((_, rowIndex) => (
        <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <a href="#" className="font-medium text-[#9b59b6] hover:underline">
              Ad {rowIndex + 1}
            </a>
          </td>
          {[...Array(12)].map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
              <a href="#" className="font-medium text-[#9b59b6] hover:underline">
                Slot {rowIndex + 1}-{colIndex + 1}
              </a>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md max-h-full bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Available Slots
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 w-full bg-[#9b59b6] text-white rounded-md hover:bg-[#8e44ad] transition-colors mt-2"
          >
            Available Slots
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="overflow-x-auto">
              <TableContent />
            </div>
          </Modal>
        </>
      ) : (
        <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
          <TableContent />
        </div>
      )}
    </div>
  )
}

export default Table