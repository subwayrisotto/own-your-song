function renderButton(url, text) {
    return `
        <a target="_blank" href="${url}" class="button">${text}</a>
    `;
  }
  
module.exports = renderButton;