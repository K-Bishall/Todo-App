import Navbar from "./components/Navbar.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } } });

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-[1000px] mx-auto">
        <Navbar />
        <TodoPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
