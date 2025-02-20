const utils = {
  compress: function (data) {
    const jsonData = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonData);
  },

  decompress: function (compressed) {
    if (!compressed) return null;
    try {
      const decompressedJson =
        LZString.decompressFromEncodedURIComponent(compressed);
      return JSON.parse(decompressedJson);
    } catch (e) {
      console.error("Ошибка распаковки данных:", e);
      return null;
    }
  },

  copyToClipboard: async function (text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.cssText =
        "position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;boxShadow:none;background:transparent;";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        textArea.remove();
        return true;
      } catch (err) {
        textArea.remove();
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};

window.addEventListener("pageshow", function (event) {
  if (
    event.persisted ||
    performance.getEntriesByType("navigation")[0].type === "back_forward"
  ) {
    document.getElementById("createForm").reset();
  }
});
