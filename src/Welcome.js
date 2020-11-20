//Uygulamanın ilk girişinde açılan hoşgeldin sayfasıdır.

import React from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__body">
        <div className="welcome__logo">
          <img src="/giris.png" alt="" />
        </div>
        <div className="welcome__text">
          <h2>Web Tabanlı Mesajlaşma Uygulamasına Hoşgeldiniz</h2>
          <p>
            Oda ekleme seçeneğini kullanarak yeni bir Sohbet Odası ekleyebilir
            veya mevcut odalardan herhangi birini seçerek mesajlaşmaya
            başlayabilirsiniz!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
