import puppeteer from "puppeteer";
import { writeFileSync, readFileSync, existsSync } from "fs";

const dataFile = "data.json";

// Configurations pour chaque catégorie
const categories = [
  {
    name: "champions",
    url: "https://www.wildriftfire.com/",
    cardSelector: ".wf-home__champions__champion",
    titleSelector: "span",
    imageSelector: "img",
    extraDataSelector: "data-role", // Récupère les rôles
    extraDataKey: "roles",
    isImageRelative: false
  },
  {
    name: "items",
    url: "https://www.wildriftfire.com/item-list",
    cardSelector: ".ico-holder",
    titleSelector: "span",
    imageSelector: "img",
    extraDataSelector: "data-sort", // Récupère le type
    extraDataKey: "type",
    isImageRelative: true,
    imageBaseUrl: "https://www.wildriftfire.com"
  }
];

async function scrapeCategory({ name, url, cardSelector, titleSelector, imageSelector, extraDataSelector, extraDataKey, isImageRelative, imageBaseUrl }) {
  console.log(`Scraping ${name} from ${url}...`);

  try {
    // Lancer Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Accéder à l'URL
    await page.goto(url);

    // Attendre que les éléments soient chargés
    await page.waitForSelector(cardSelector);

    // Extraire les données
    const data = await page.evaluate(({ cardSelector, titleSelector, imageSelector, extraDataSelector, extraDataKey, isImageRelative, imageBaseUrl }) => {
      return Array.from(document.querySelectorAll(cardSelector)).map(card => {
        const title = card.querySelector(titleSelector)?.innerText.trim();
        let image = card.querySelector(imageSelector)?.getAttribute("src");

        // Ajouter le préfixe si l'image est relative
        if (isImageRelative && imageBaseUrl) {
          image = image.startsWith("http") ? image : `${imageBaseUrl}${image}`;
        }

        const extraData = card.getAttribute(extraDataSelector)?.trim();
        const formattedExtraData = extraData ? extraData.split(" ") : []; // Transforme "Solo Jungle" en ["Solo", "Jungle"]
        return { name: title, image, [extraDataKey]: formattedExtraData };
      });
    }, { cardSelector, titleSelector, imageSelector, extraDataSelector, extraDataKey, isImageRelative, imageBaseUrl });

    // Fermer le navigateur
    await browser.close();

    // Charger les données existantes
    let existingData = { champions: [], items: [], boots: [], enchant: [] };
    if (existsSync(dataFile)) {
      existingData = JSON.parse(readFileSync(dataFile, "utf-8"));
    }

    // Tri pour les items
    if (name === "items") {
      data.forEach(item => {
        if (item.type.includes("Boots")) {
          existingData.boots.push(item);
        } else if (item.type.includes("Enchantment")) {
          existingData.enchant.push(item);
        } else {
          existingData.items.push(item);
        }
      });
    } else {
      // Mise à jour classique pour les autres catégories
      existingData[name] = data;
    }

    // Sauvegarder les données mises à jour
    writeFileSync(dataFile, JSON.stringify(existingData, null, 2));
    console.log(`Mis à jour ${name} avec ${data.length} entrées.`);
  } catch (error) {
    console.error(`Erreur lors du scraping de ${name}:`, error);
  }
}

(async () => {
  for (const category of categories) {
    await scrapeCategory(category);
  }
  console.log("Scraping terminé pour toutes les catégories !");
})();

