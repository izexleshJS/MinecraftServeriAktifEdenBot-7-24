var mineflayer = require("mineflayer");
var db = require("quick.db");

var ayar = {
  host: "Sunucusunuzun_İpsi", //Sunucu IPnizi Girmelisiniz!
  port: 44478, //Sunucu Portunuzu Girmelisiniz!
  username: "İzexJS", //Sunucuya Giriş Yapacak Bot İsminizi Girmelisiniz!
  version: false //Burayı Değiştirmeyiniz!
};

var kayit = {
  authme: "yok", //Eğer Sunucunuzda AuthMe Eklentisi Yoksa Bu Var Yazısını Yok Olrk Değiştirmelisiniz!
  sifre: "ADMIN" //Buraya AuthMe Varsa Botun Giriş Yapması İçin Şifrenizi Giriniz!
};

var automessage = true; //5 Dakika'da Bir Sunucuda Botun Mesaj Atmasını İstemiyorsan true Yazısını false Olarak Değiştirirsiniz!

var bot = mineflayer.createBot(ayar);

bot.on("chat", function(username, message) {
  if (username === bot.username) return;
  function intervalFunc() {
    bot.setControlState("sprint", true);
  }
  setInterval(intervalFunc, 7000);

  if (kayit.authme == "var") {
    let giris = db.fetch(`giris_${ayar.host}_${ayar.username}`);
    if (!giris) {
      bot.chat(`/register ${kayit.sifre} ${kayit.sifre}`); //Kayıt Olmasını Sağladık Mesajı!!
      console.log("Bot kayıt oldu!");
      db.set(`giris_${ayar.host}_${ayar.username}`, "tm");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("İzexJS : https://www.youtube.com/izexlesh"); // Değiştirmek Çok Basit "" Arasındaki Yazıyı Değiştirin Yeterlidir!
        }, 300000);
      }
    }
    if (giris) {
      bot.chat(`/login ${kayit.sifre}`); //Giriş Yapmasını Sağladık!
      console.log("Bot giriş yaptı!");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("İzexJS : https://www.youtube.com/izexlesh"); // Değiştirmek Çok Basit "" Arasındaki Yazıyı Değiştirin Yeterlidir!
        }, 300000);
      }
    }
  }
});

bindEvents(bot);
function bindEvents(bot) {
  bot.on("error", function(err) {
    console.log("Bir hata oluştu!");
  });

  bot.on("end", function() {
    console.log("Bot sunucudan atıldı!");
    setTimeout(relog, 5000);
  });

  function relog() {
    console.log("Sunucuya Tekrardan Baglaniliyor...");
    bot = mineflayer.createBot(ayar);
    bot.on("chat", function(username, message) {
      if (username === bot.username) return;

      console.log("Bot tekrardan oyuna giriş yaptı!");
      bot.chat(`/login ${kayit.sifre}`);

      bot.setControlState("sprint", true);
    });

    bindEvents(bot);
  }
}

//Yeni Kod:
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 150000);
