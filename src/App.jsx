import './App.css'
import { Auth } from './components/Auth'
import Firestore from './components/Firestore_CRUD'

function App() {
  return (
    <div>
      <Auth/>
      <Firestore/>
    </div>
  )
}

export default App
