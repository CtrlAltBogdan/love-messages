document.getElementById("createForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.elements["name"].value.trim();
  const text = form.elements["text"].value.trim();
  const theme = form.elements["theme"].value;
  const sender = form.elements["sender"].value.trim();

  if (!name || name.length > 30) {
    alert("Ім'я отримувача має бути від 1 до 30 символів");
    return;
  }

  if (!text || text.length > 500) {
    alert("Текст повідомлення має бути від 1 до 500 символів");
    return;
  }

  if (!["stanislava", "yana"].includes(theme)) {
    alert("Будь ласка, виберіть персонажа");
    return;
  }

  const data = {
    n: utils.escapeHTML(name),
    text: utils.escapeHTML(text),
    theme,
    sender: utils.escapeHTML(sender || "Анонім"),
  };

  const compressed = utils.compress(data);
  if (!compressed) {
    alert("Помилка при створенні листівки. Спробуйте ще раз");
    return;
  }

  window.location.href = `../love/index.html?data=${compressed}`;
});

const textArea = document.getElementById("greetingText");
if (textArea) {
  textArea.addEventListener(
    "input",
    utils.debounce(function () {
      const maxLength = 500;
      if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
      }
    }, 300)
  );
}
