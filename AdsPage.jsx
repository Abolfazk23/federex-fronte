import { useState, useEffect } from 'react'

const adsList = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Ad ${i + 1}`,
  video: 'https://www.w3schools.com/html/mov_bbb.mp4'
}))

export default function AdsPage() {
  const [currentAd, setCurrentAd] = useState(null)
  const [timer, setTimer] = useState(0)
  const [fdxEarned, setFdxEarned] = useState(0)

  const startAd = (ad) => {
    setCurrentAd(ad)
    setTimer(60)
  }

  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const claimReward = () => {
    setFdxEarned(fdxEarned + 1)
    setCurrentAd(null)
    setTimer(0)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Watch Ads & Earn FDX</h2>
      <p className="mb-4">FDX Earned: {fdxEarned}</p>
      {!currentAd ? (
        <div className="grid grid-cols-2 gap-4">
          {adsList.map((ad) => (
            <div key={ad.id} className="border p-4 rounded-lg bg-white shadow">
              <h3 className="font-semibold mb-2">{ad.title}</h3>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => startAd(ad)}
              >
                Watch Ad
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl mb-4">{currentAd.title}</h3>
          <video src={currentAd.video} controls autoPlay className="w-full mb-4"></video>
          <p className="mb-2">Time remaining: {timer}s</p>
          <button
            disabled={timer > 0}
            onClick={claimReward}
            className={`px-4 py-2 rounded ${timer > 0 ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
          >
            {timer > 0 ? 'Wait...' : 'Claim Reward'}
          </button>
        </div>
      )}
    </div>
  )
}