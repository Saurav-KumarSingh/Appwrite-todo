import { Route, Routes } from "react-router-dom"
import Notes from "./pages/Notes"
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route  path="/" element={<Notes/>}/>
      <Route  path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App;