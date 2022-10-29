import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa'
import { TbBooks } from 'react-icons/tb'
import { CartContext, CartProvider } from './context/Cart'
import { UserProvider } from './context/User';
import { ItemsProvider } from './context/Items'
import Home from './components/Home';
import { ShowCart } from './components/ShowCart';
import { Routes, Route, Link } from 'react-router-dom';
import LoginTrial from './components/LoginTrial';
import Signup from './components/Signup'


function Providers({ children }) {
  return <UserProvider>
    <CartProvider>
      <ItemsProvider>
        {children}
      </ItemsProvider>
    </CartProvider>
  </UserProvider>
}

function App() {
  return (
    <Providers>
      <CartContext.Consumer>
        {
          ({ cart }) => {
            const uniqueItemCount = (new Set(cart)).size
            return (
              <Navbar style={{ padding: "1rem", backgroundColor: "darkslategray", color: "white" }}>
                <Link className='link' to="/" style={{ float: "left", fontSize: "25px" }}><TbBooks /></Link>
                <Link className='link' to="/cart" style={{ float: "right", fontSize: "15px" }}>{uniqueItemCount}<FaShoppingCart style={{ float: "right", fontSize: "25px" }}></FaShoppingCart ></Link>
                <Link className='link' to="/login" style={{ float: "right" }}>Log In</Link>
                <br />

              </Navbar>)
          }
        }
      </CartContext.Consumer>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShowCart />} />
          <Route path="/login" element={<LoginTrial />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>
    </Providers>
  );
}

export default App;
