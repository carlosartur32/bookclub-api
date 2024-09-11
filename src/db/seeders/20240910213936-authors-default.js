"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Authors", [
      {
        id: 1,
        name: "J.K. Rowling",
        avatar_url:
          "https://m.media-amazon.com/images/S/amzn-author-media-prod/8cigckin175jtpsk3gs361r4ss._SY450_CR0%2C0%2C450%2C450_.jpg",
        bio: "J.K. Rowling is the author of the enduringly popular, era-defining Harry Potter book series, as well as several stand-alone novels for adults and children, and a bestselling crime fiction series written under the pen name Robert Galbraith.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "George R. R. Martin",
        avatar_url:
          "https://m.media-amazon.com/images/S/amzn-author-media-prod/1u8p8qq9fr3eq2ocgma6j56s0g._SY208_CR53%2C0%2C208%2C208_.jpg",
        bio: "George R.R. Martin is the globally bestselling author of many fine novels, including A Game of Thrones, A Clash of Kings, A Storm of Swords, A Feast for Crows, and A Dance with Dragons, which together make up the series A Song of Ice and Fire, on which HBO based the world’s most-watched television series, Game of Thrones. Other works set in or about Westeros include The World of Ice and Fire, and A Knight of the Seven Kingdoms. His science fiction novella Nightflyers has also been adapted as a television series; and he is the creator of the shared-world Wild Cards universe, working with the finest writers in the genre. He lives in Santa Fe, New Mexico.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "J. R. R. Tolkien",
        avatar_url:
          "https://m.media-amazon.com/images/S/amzn-author-media-prod/hq6oari96tk6tlqvhqs9qqcvi8._SX305_CR0%2C0%2C305%2C305_.jpg",
        bio: "J.R.R. Tolkien was born on 3rd January 1892. After serving in the First World War, he became best known for The Hobbit and The Lord of the Rings, selling 150 million copies in more than 40 languages worldwide. Awarded the CBE and an honorary Doctorate of Letters from Oxford University, he died in 1973 at the age of 81.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Napoleon Hill",
        avatar_url:
          "https://m.media-amazon.com/images/I/517LznLEhnL._SX269_CR0%2C0%2C269%2C269_.jpg",
        bio: "Napoleon Hill was born in Wise County, Virginia. He began his writing career at age 13 as a mountain reporter for small town newspapers and went on to become America's most beloved motivational author. His work stands as a monument to individual achievement and is the cornerstone of modern motivation. His most famous work, Think and Grow Rich, is one of the best-selling books of all time. Hill established the Foundation as a nonprofit educational institution whose mission is to perpetuate his philosophy of leadership, self-motivation, and individual achievement.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
