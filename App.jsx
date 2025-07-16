import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AdsPage from './components/AdsPage'
import PopupAd from './components/PopupAd'
import { useEffect, useState } from 'react'

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Federex.fun</h1>
      <p className="mb-6">Watch Ads & Earn FDX Tokens</p>
      <Link to="/ads" className="bg-blue-500 text-white px-6 py-3 rounded-md">Start Earning</Link>
    </div>
  )
}

function App() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true)
    }, 24 * 60 * 1000) // هر 24 دقیقه یکبار
    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      {showPopup && <PopupAd onClose={() => setShowPopup(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<AdsPage />} />
      </Routes>
    </Router>
  )
}

export default App