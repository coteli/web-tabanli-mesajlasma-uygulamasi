import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch ] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login /> //Giriş sayfası bileşenidir.
      ) : (
        <div className="app__body">
          <Router> {/* Router, Switch ve Route sayfalar arasıda gezinmeyi sağlayan react bileşenleridir*/}
            <Sidebar /> {/* Kenar barı bileşenleridir*/}
            <Switch> 
              <Route path="/rooms/:roomId"> 
                <Chat /> {/* Sohbet odası bileşenidir*/}
              </Route>
              <Route path="/">
                <Chat /> 
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

// App dosyası Uygulmanın ana dosyasıdır. Diğer bileşenler bu dosya altında toplanarak uygulamayı oluşturur.