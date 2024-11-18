import Navbar from "./components/Navbar.tsx";
import TodoPage from "./pages/TodoPage.tsx";

function App() {

  return (<div className="max-w-[1000px] mx-auto">
    <Navbar />
    <TodoPage />
  </div>);
}

export default App;
