/* eslint-disable prettier/prettier */
import minimize from '../assets/minimize.png'

export default function MinMax() {

const handleMinimize = () => {
  window.electron.ipcRenderer.send('minimize-window')
}

  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  return (
    <div>
      <div
        className="bg-gray-400 w-screen h-5"
        style={{
          WebkitAppRegion: 'drag'
        }}
      ></div>
      <div className="bg-gray-400 w-screen h-3"></div>
      <div className="absolute top-1.5 right-4">
        {' '}
        <button id="min" onClick={handleMinimize} className="w-3 h-3 mr-5 hover:bg-gray-300">
          <img src={minimize} alt="min" />
        </button>
        <button id="exit" onClick={handleClose} className="w-5 hover:bg-red-400">
          &#x2715;
        </button>
      </div>
    </div>
  )
}
