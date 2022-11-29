import Card from "./components/Card";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";


function App() {
  return (
    <div className="wrapper clear">
        <CartDrawer />
        <Header />
        <div className="content">
           <div className="content-header">
               <h1>Все кроссовки</h1>
               <div className="search-block">
                   <img src="/img/search.svg" alt="Search"/>
                   <input type="text" placeholder="Поиск"/>
               </div>
           </div>

           <div className="sneakers">
               <Card />
               <Card />
               <Card />
               <Card />
           </div>
        </div>
    </div>
  );
}

export default App;
