import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { QuizAppRouter } from "../components/router/router";

function App() {
  return (
    // <ErrorBoundary FallbackComponent={<MyErrorFallback />}>
    <BrowserRouter>
      <QuizAppRouter />
    </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default App;
