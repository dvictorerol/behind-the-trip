import './App.css'
import Navigation from './components/Navigation'
import GlobeComponent from './components/GlobeComponent';


function App() {

  return (
    <>
      <div className='title'>
          <img src={`${import.meta.env.BASE_URL}title.gif`} />
      </div>
      <div className="container">
        <div><Navigation /></div>
        <div><GlobeComponent /></div>
      </div>
    </>
  )
}

export default App
