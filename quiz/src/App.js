import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz/Quiz';
import Introduce from './pages/introduce/introduce'; // Bu satırı doğru şekilde ekleyin

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/' element={<Introduce />} />
          <Route path='/quiz/:difficulty/:amount' element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
