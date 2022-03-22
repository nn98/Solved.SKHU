import logo from './logo.svg'
import './App.css'
import Footer from './footer'
import MainMeue from './mainMenu'

function App() {
  return (
    <div className="App">
      <MainMeue />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Footer />
    </div>
  )
}

export default App
