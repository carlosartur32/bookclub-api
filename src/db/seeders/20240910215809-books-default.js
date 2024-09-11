"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Books", [
      {
        author_id: 1,
        category_id: 1,
        name: "Harry Potter and the Philosopher's Stone",
        cover_url:
          "https://m.media-amazon.com/images/I/81m9fP+LIPL._SY466_.jpg",
        release_date: "2024-09-10",
        pages: 345,
        synopsis:
          "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
        highlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        category_id: 1,
        name: "A Feast for Crows",
        cover_url:
          "https://m.media-amazon.com/images/I/91Tpg6BX00L._SY522_.jpg",
        release_date: "2024-09-10",
        pages: 1106,
        synopsis:
          "After centuries of bitter strife, the seven powers dividing the land have beaten one another into an uneasy truce. But it’s not long before the survivors, outlaws, renegades, and carrion eaters of the Seven Kingdoms gather. Now, as the human crows assemble over a banquet of ashes, daring new plots and dangerous new alliances are formed while surprising faces—some familiar, others only just appearing—emerge from an ominous twilight of past struggles and chaos to take up the challenges of the terrible times ahead. Nobles and commoners, soldiers and sorcerers, assassins and sages, are coming together to stake their fortunes . . . and their lives. For at a feast for crows, many are the guests—but only a few are the survivors.",
        highlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        category_id: 2,
        name: "The Lord of the Rings: The classic fantasy masterpiece",
        cover_url:
          "https://m.media-amazon.com/images/I/91mMbE4XPkL._SY466_.jpg",
        release_date: "2024-09-10",
        pages: 1209,
        synopsis:
          "All three parts of the epic masterpiece The Lord of the Rings – The Fellowship of the Ring, The Two Towers & The Return of the King – available as one download, featuring the definitive edition of the text, hyperlinked footnotes and page references, and 3 maps including a detailed map of Middle-earth.",
        highlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 4,
        category_id: 7,
        name: "Think and Grow Rich",
        cover_url:
          "https://m.media-amazon.com/images/I/51b9-iLktJL._SY522_.jpg",
        release_date: "2024-09-10",
        pages: 240,
        synopsis:
          "Think and Grow Rich is a book written by Napoleon Hill released in 1937 and promoted as a personal development and self-improvement book. He claimed to be inspired by a suggestion from business magnate and later-philanthropist Andrew Carnegie. However there is no evidence that the two ever met.",
        highlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
