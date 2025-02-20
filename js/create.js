document.getElementById("createForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    n: form.elements["name"].value.trim(),
    text: form.elements["text"].value.trim(),
    theme: form.elements["theme"].value,
    sender: form.elements["sender"].value.trim() || "Анонім",
  };

  if (!data.n || !data.text || !data.theme) {
    alert("Будь ласка, заповніть усі обов'язкові поля.");
    return;
  }

  const compressed = utils.compress(data);
  const url = `../love/index.html?data=${compressed}`;
  window.location.href = url;
});
