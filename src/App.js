//App dosyası Uygulmanın ana dosyasıdır. Diğer bileşenler bu dosya altında toplanarak uygulamayı oluşturur.

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Giris from "./Giris";
import KenarBari from "./KenarBari";
import Sohbet from "./Sohbet";
import Hosgeldin from "./Hosgeldin";
import { useStateValue } from "./StateProvider";

import "./App.css";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue(); //Kullanıcı bilgilerinin bu bileşende set edilmesini sağlar.

  return (
    <div className="app">
      {!user ? (
        <Giris /> //Giriş sayfası bileşenidir.
      ) : (
        <div className="app__body">
          <Router>
            {" "}
            {/* Router, Switch ve Route sayfalar arasıda gezinmeyi sağlayan react bileşenleridir*/}
            <KenarBari /> {/* Kenar barı bileşenleridir*/}
            <Switch>
              <Route path="/rooms/:roomId">
                <Sohbet /> {/* Sohbet odası bileşenidir*/}
              </Route>
              <Route path="/">
                <Hosgeldin /> {/*Hoşgeldin sayfası bileşenidir */}
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
