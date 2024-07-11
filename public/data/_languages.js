const myData = {
    english: {
        "book-of-mormon": "The Book of Mormon: Another Testament of Jesus Christ",
        "bookOfMormon": "The Book of Mormon",
        "english": "english",
        "french": "french",
        "spanish": "spanish",
        "german": "german", //end of langauges
        "1-nephi": "1 Nephi",
        "2-nephi": "2 Nephi",
        "jacob": "Jacob",
        "enos": "Enos",
        "jarom": "Jarom",
        "omni": "Omni",
        "words-of-mormon": "Words of Mormon",
        "mosiah": "Mosiah",
        "alma": "Alma",
        "helaman": "Helaman",
        "3-nephi": "3 Nephi",
        "4-nephi": "4 Nephi",
        "mormon": "Mormon",
        "ether": "Ether",
        "moroni": "Moroni", //end of books
        "chapter": "Chapter",
    },
    spanish: {
        "book-of-mormon": "El Libro de Mormón: Otro Testamento de Jesucristo",
        "bookOfMormon": "El Libro de Mormón",
        "english": "ingles",
        "french": "frances",
        "spanish": "espanol",
        "german": "aleman", //end of languages
        "1-nephi": "1 Nefi",
        "2-nephi": "2 Nefi",
        "jacob": "Jacob",
        "enos": "Enós",
        "jarom": "Jarom",
        "omni": "Omni",
        "words-of-mormon": "Palabras de Mormón",
        "mosiah": "Mosíah",
        "alma": "Alma",
        "helaman": "Helamán",
        "3-nephi": "3 Nefi",
        "4-nephi": "4 Nefi",
        "mormon": "Mormón",
        "ether": "Éter",
        "moroni": "Moroni", //end of books
        "chapter": "Capítulo",
    },
    french: {
        "book-of-mormon": "Le Livre de Mormon: Un Autre Témoignage de Jésus-Christ",
        "bookOfMormon": "Le Livre de Mormon",
        "english": "anglais",
        "french": "français",
        "spanish": "espagnol",
        "german": "allemand", //end of languages
        "1-nephi": "1 Néphi",
        "2-nephi": "2 Néphi",
        "jacob": "Jacob",
        "enos": "Énos",
        "jarom": "Jarom",
        "omni": "Omni",
        "words-of-mormon": "Paroles de Mormon",
        "mosiah": "Mosiah",
        "alma": "Alma",
        "helaman": "Hélaman",
        "3-nephi": "3 Néphi",
        "4-nephi": "4 Néphi",
        "mormon": "Mormon",
        "ether": "Éther",
        "moroni": "Moroni", //end of books
        "chapter": "Chapitre",
    },
    german: {
        "book-of-mormon": "Das Buch Mormon: Ein weiteres Zeugnis von Jesus Christus",
        "bookOfMormon": "Das Buch Mormon",
        "english": "englisch",
        "french": "französisch",
        "spanish": "spanisch",
        "german": "deutsch", //end of languages
        "1-nephi": "1 Nephi",
        "2-nephi": "2 Nephi",
        "jacob": "Jakob",
        "enos": "Enos",
        "jarom": "Jarom",
        "omni": "Omni",
        "words-of-mormon": "Worte von Mormon",
        "mosiah": "Mosiah",
        "alma": "Alma",
        "helaman": "Helaman",
        "3-nephi": "3 Nephi",
        "4-nephi": "4 Nephi",
        "mormon": "Mormon",
        "ether": "Ether",
        "moroni": "Moroni", //end of books
        "chapter": "Kapitel",
    },

};
export default myData;

export function theBookOfBOOKNAME(language, bookName) {
    switch (language) {
        case 'english':
            return `The Book of ${bookName}`;
        case 'spanish':
            return `El libro de ${bookName}`;
        case 'french':
            return `Le livre de ${bookName}`;
        case 'german':
            return `Das Buch von ${bookName}`;
        default:
            return `The Book of ${bookName}`; // Default to English
    }
}

export function theBookOfBOOKNAMEchapterX(language, bookName, chapter) {
    switch (language) {
        case 'english':
            return `The Book of ${bookName} Chapter ${chapter}`;
        case 'spanish':
            return `El libro de ${bookName} Capítulo ${chapter}`;
        case 'french':
            return `Le livre de ${bookName} Chapitre ${chapter}`;
        case 'german':
            return `Das Buch von ${bookName} Kapitel ${chapter}`;
        default:
            return `The Book of ${bookName} Chapter ${chapter}`; // Default to English
    }
}