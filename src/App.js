import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Category from "./pages/category";
import Home from "./pages/home";
import Product from "./pages/product";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="product">
            <Route path=":slug" element={<Product />} />
          </Route>
          <Route path="category">
            <Route path=":slug" element={<Category />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
