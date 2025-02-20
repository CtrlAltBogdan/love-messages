const utils = {
  compress: function (data) {
    if (!data || typeof data !== "object") {
      console.error("Invalid data format for compression");
      return null;
    }
    try {
      const jsonData = JSON.stringify(data);
      return LZString.compressToEncodedURIComponent(jsonData);
    } catch (e) {
      console.error("Compression error:", e);
      return null;
    }
  },

  decompress: function (compressed) {
    if (!compressed || typeof compressed !== "string") return null;
    try {
      const decompressedJson =
        LZString.decompressFromEncodedURIComponent(compressed);
      if (!decompressedJson) return null;
      return JSON.parse(decompressedJson);
    } catch (e) {
      console.error("Decompression error:", e);
      return null;
    }
  },

  escapeHTML: function (str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\//g, "&#x2F;");
  },

  copyToClipboard: async function (text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return this.fallbackCopyToClipboard(text);
    } catch (err) {
      console.error("Copy error:", err);
      return false;
    }
  },

  fallbackCopyToClipboard: function (text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText =
      "position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;boxShadow:none;background:transparent;";
    document.body.appendChild(textArea);

    try {
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      textArea.remove();
      return success;
    } catch (err) {
      console.error("Fallback copy error:", err);
      textArea.remove();
      return false;
    }
  },

  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

window.addEventListener("pageshow", function (event) {
  const form = document.getElementById("createForm");
  if (
    form &&
    (event.persisted ||
      performance.getEntriesByType("navigation")[0].type === "back_forward")
  ) {
    form.reset();
  }
});
