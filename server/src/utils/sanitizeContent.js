const sanitizeHtml = require('sanitize-html');
module.exports = (html = '') => sanitizeHtml(String(html), {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2', 'h3', 'img'],
  allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'title', 'width', 'height'] },
  allowedSchemes: ['http', 'https', 'mailto'],
});
