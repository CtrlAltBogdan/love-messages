document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const compressedData = params.get("data");
  const data = utils.decompress(compressedData);

  const cardDiv = document.getElementById("card");

  if (!data || !data.n || !data.text || !data.theme) {
    cardDiv.innerHTML =
      '<p>Помилка: не передані необхідні дані. <a href="../create/index.html">Повернутися до створення листівки</a></p>';
    return;
  }

  let imgSrc = "";
  if (data.theme === "stanislava") {
    imgSrc = "../img/stanislava.png";
  } else if (data.theme === "yana") {
    imgSrc = "../img/yana.png";
  }

  const themeClass = data.theme === "yana" ? "theme-yana" : "theme-stanislava";

  cardDiv.innerHTML = `
    <div class="card-content ${themeClass}">
      <div class="card-header">
        <h1>Привіт, ${data.n}!</h1>
      </div>
      <div class="card-body">
        <div class="message">
          <p>${data.text}</p>
        </div>
        <div class="image-container">
          <img src="${imgSrc}" alt="Персонаж">
        </div>
      </div>
    </div>
    <p class="sender">Від: ${data.sender}</p>
  `;

  document
    .getElementById("shareBtn")
    .addEventListener("click", async function () {
      const url = window.location.href;

      const success = await utils.copyToClipboard(url);

      if (success) {
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = "Скопійовано!";
        btn.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = "";
        }, 2000);
      } else {
        const textToCopy = document.createElement("div");
        textToCopy.style.cssText =
          "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:1000;";
        textToCopy.innerHTML = `
        <p style="margin-bottom:10px;">Скопіюйте посилання вручну:</p>
        <input type="text" value="${url}" style="width:100%;padding:5px;" readonly onclick="this.select()">
        <button onclick="this.parentElement.remove()" style="margin-top:10px;padding:5px 10px;">Закрити</button>
      `;
        document.body.appendChild(textToCopy);
      }
    });
});
