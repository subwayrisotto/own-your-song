function renderSocialMediaBlock(url) {
  const socialMedia = {
    instagram: {
      name: "Instagram", 
      link: "https://www.instagram.com",
    },
    telegram: {
      name: "Telegram", 
      link: "https://web.telegram.org/k/",
    },
    youtube: {
      name: "YouTube", 
      link: "https://www.youtube.com/",
    }
  };

  return `
    <div class="block11">
      <p class="text">Follow us</p>
      <div class="socialMediaCtn">
        ${Object.values(socialMedia)
          .map(({ name, link }) => `
            <a href="${link}">
              <img src="${url}/emails/${name.toLowerCase()}.png" class="socialIconImage" />
            </a>
          `)
          .join("")}
      </div>
    </div>
  `;
}

module.exports = renderSocialMediaBlock;