import {Route,Routes} from 'react-router'
import './App.css'
import Home from './components/Home';
import Job from './components/Job';
import AddJob from './components/AddJob';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/job/:id" element={<Job/>}/>
      <Route path="/addJob" element={<AddJob/>}/>
      <Route path="/addJob/:id" element={<AddJob/>}/>
    </Routes>
    </>
  )
}

export default App
