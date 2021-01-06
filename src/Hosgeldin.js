//Uygulamanın ilk girişinde açılan hoşgeldin sayfasıdır.

import React from "react";

import "./Hosgeldin.css";

function Hosgeldin() {
  return (
    <div className="hosgeldin">
      <div className="hosgeldin__govde">
        <div className="hosgeldin__logo">
          <img src="/giris.png" alt="" />
        </div>
        <div className="hosgeldin__text">
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

export default Hosgeldin;
