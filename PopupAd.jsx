import { useEffect, useState } from 'react'

export default function PopupAd({ onClose }) {
  const [timer, setTimer] = useState(5) // کاربر باید 5 ثانیه صبر کند

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) clearInterval(countdown)
        return t - 1
      })
    }, 1000)
    return () => clearInterval(countdown)
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md text-center">
        <h3 className="text-2xl font-bold mb-4">Sponsored Ad</h3>
        <p className="mb-4">You can close this ad after {timer > 0 ? timer : 0}s.</p>
        <img src="https://via.placeholder.com/300x150" alt="Ad" className="mx-auto mb-4" />
        <button
          onClick={onClose}
          disabled={timer > 0}
          className={`px-4 py-2 rounded ${timer > 0 ? 'bg-gray-400' : 'bg-red-500 text-white'}`}
        >
          {timer > 0 ? 'Please wait...' : 'Close Ad'}
        </button>
      </div>
    </div>
  )
}