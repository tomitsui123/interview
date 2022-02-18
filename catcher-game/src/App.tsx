import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Game from './components/Game'
import Header from './components/Header'
import Leaderboard from './components/Leaderboard'
import CreateNewRecordCanvas from './components/leaderboard/CreateNewRecordCanvas'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Game />} />
          <Route
            path='/leaderboard'
            element={<Leaderboard />}
          />
          <Route
            path='/leaderboard/:token'
            element={<Leaderboard />}
          />
          <Route
            path='/leaderboard/new/:token'
            element={<CreateNewRecordCanvas />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
