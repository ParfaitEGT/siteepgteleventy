const { DateTime } = require("luxon");
const fr = require('./locales/fr.json');
const en = require('./locales/en.json');

module.exports = function(eleventyConfig) {
  // Copier les fichiers statiques
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("articles");
  eleventyConfig.addPassthroughCopy("content");

  // Collection des articles
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getFilteredByGlob("articles/*.md").reverse();
  });

  // Filtre date avec luxon
  eleventyConfig.addFilter("date", (dateObj, format = "dd/LL/yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Données globales pour la traduction
  eleventyConfig.addGlobalData("i18n", { fr, en });

  // Shortcode de traduction
  eleventyConfig.addShortcode("translate", function(lang, key) {
    return this.ctx.i18n[lang][key] || key;
  });

  // Langue par défaut
  eleventyConfig.addGlobalData("lang", "fr");

  return {
    dir: {
      input: ".",
      includes: "_includes",
    }
  };
};
