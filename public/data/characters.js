class Character {
    constructor({ id, name, fatherId, motherId, childrenIDs, spouseIDs, descendentOf, description, nicknames, gender }) {
        this.id = id;
        this.name = name;
        this.fatherId = fatherId;
        this.motherId = motherId;
        this.childrenIDs = childrenIDs;
        this.spouseIDs = spouseIDs;
        this.descendentOf = descendentOf;
        this.description = description;
        this.nicknames = nicknames;
        this.gender = gender;
    }

    getCharacterById(id) {
        return characters.find(character => character.id === id);
    }
    getCharactersByIds(ids) {
        return characters.filter(character => ids.includes(character.id));
    }

    getSpouses() {
        const spouses = [];
        this.spouseIDs.forEach(spouseId => {
            const spouse = this.getCharacterById(spouseId);
            spouses.push(spouse);
        });
        return spouses;
    }
    getFather() {
        return this.getCharacterById(this.fatherId);
    }
    getMother() {
        return this.getCharacterById(this.motherId);
    }
    getChildren() {
        return this.childrenIDs.map(childId => this.getCharacterById(childId));
    }
    getSiblings() {
        const father = this.getFather();
        const mother = this.getMother();
        if (!father || !mother || !father.childrenIDs || !mother.childrenIDs) return null; // Incomplete or missing parent information
        const commonChildrenIDs = father.childrenIDs.filter(id => mother.childrenIDs.includes(id));
        return this.getCharactersByIds(commonChildrenIDs);
    }
    getDescendant() {
        return this.getCharacterById(this.descendentOf);
    }
    getGrandchildren() {
        const grandchildren = [];
        this.getChildren().forEach(child => {
            grandchildren.push(...child.getChildren());
        });
        return grandchildren;
    }
}

//book of mormon
/*const characterData = [
    { id: "<lehi>", name: "Lehi", fatherId: null, motherId: null, childrenIDs: ["<nephi>", "<laman>", "<lemuel>", "<sam>", "<jacobSonOfLehi>", "<josephSonOfLehi>"], spouseIDs: ["<sariah>"], descendentOf: "<josephOfOld> bur also manasses alma 10:3", description: "1 Nephi 1:4", nicknames: [], gender: 0 },
    { id: "<sariah>", name: "Sariah", fatherId: null, motherId: null, childrenIDs: ["<nephi>", "<laman>", "<lemuel>", "<sam>", "<jacobSonOfLehi>", "<josephSonOfLehi>"], spouseIDs: ["<lehi>"], descendentOf: "1 Nephi 2:5", description: "", nicknames: [], gender: 1 },
    { id: "<nephi>", name: "Nephi", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<nephisKids>"], spouseIDs: ["<daughterOfIshmael2>"], descendentOf: "", description: "1 Nephi 1:1, 16:7", nicknames: [], gender: 0 },
    { id: "<laman>", name: "Laman", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<lamansKids>"], spouseIDs: ["<daughterOfIshmael3>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<lemuel>", name: "Lemuel", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<lemuelsKids>"], spouseIDs: ["<daughterOfIshmael4>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<sam>", name: "Sam", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<samsKids>"], spouseIDs: ["<daughterOfIshmael5>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<jacobSonOfLehi>", name: "Jacob", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<enos>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 18:7", nicknames: [], gender: 0 },
    { id: "<josephSonOfLehi>", name: "Joseph", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 18:7", nicknames: [], gender: 0 },
    { id: "<laban>", name: "Laban", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 3:3", nicknames: [], gender: 0 },
    { id: "<zoram>", name: "Zoram", fatherId: null, motherId: "<oldestDaughterOfIshmael>", childrenIDs: ["<zoramAndOldestDaughterOfIshmaelsKids>"], spouseIDs: ["<oldestDaughterOfIshmael>"], descendentOf: "", description: "1 Nephi 4:20, 35", nicknames: [], gender: 0 },
    { id: "<ishmael>", name: "Ishmael", fatherId: null, motherId: "<ishmaelsWife>", childrenIDs: ["<oldestDaughterOfIshmael>", "<daughterOfIshmael2>", "<daughterOfIshmael3>", "<daughterOfIshmael4>", "<daughterOfIshmael5>", "<sonOfIshmael1>", "<sonOfIshmael2>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:2", nicknames: [], gender: 0 },
    { id: "<jacobOfOld>", name: "Jacob", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 5:14", nicknames: [], gender: 0 },
    { id: "<joseOfOld>", name: "Joseph", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 5:14", nicknames: [], gender: 0 },
    { id: "<zedekiah>", name: "Zedekiah", fatherId: null, motherId: null, childrenIDs: ["<mulek>"], spouseIDs: [], descendentOf: "<josephOfOld>", description: "1 Nephi 1:4", nicknames: [], gender: 0 },
    { id: "<mulek>", name: "Mulek", fatherId: "<zedekiah>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "Mosiah 25:2", nicknames: [], gender: 0 },
    { id: "<ishmaelsWife>", name: "Ishmaels Wife", fatherId: null, motherId: "<ishmael>", childrenIDs: ["<oldestDaughterOfIshmael>", "<daughterOfIshmael2>", "<daughterOfIshmael3>", "<daughterOfIshmael4>", "<daughterOfIshmael5>", "<sonOfIshmael1>", "<sonOfIshmael2>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6", nicknames: [], gender: 1 },
    { id: "<oldestDaughterOfIshmael>", name: "Oldest daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<zoramAndOldestDaughterOfIshmaelsKids>"], spouseIDs: ["<zoram>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael2>", name: "Other daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<nephisKids>"], spouseIDs: ["<nephi>"], descendentOf: "", description: "1 Nephi 7:6, 18:19, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael3>", name: "Other daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<lamansKids>"], spouseIDs: ["<laman>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael4>", name: "Other daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<lemuelsKids>"], spouseIDs: ["<lemuel>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael5>", name: "Other daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<samsKids>"], spouseIDs: ["<sam>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<sonOfIshmael1>", name: "Son of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 0 },
    { id: "<sonOfIshmael2>", name: "Other son of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 0 },
    { id: "<zoramAndOldestDaughterOfIshmaelsKids>", name: "", fatherId: "<zoram>", motherId: "<oldestDaughterOfIshmael>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<nephisKids>", name: "nephisKids", fatherId: "<nephi>", motherId: "<daughterOfIshmael2>", childrenIDs: [], spouseIDs: [], descendentOf: "1 Nephi 18:19", description: "", nicknames: [], gender: 0 },
    { id: "<lamansKids>", name: "lamansKids", fatherId: "<laman>", motherId: "<daughterOfIshmael3>", childrenIDs: [], spouseIDs: [], descendentOf: "2 Nephi 4:8", description: "", nicknames: [], gender: 0 },
    { id: "<lemuelsKids>", name: "lemuelsKids", fatherId: "<lemuel>", motherId: "<daughterOfIshmael4>", childrenIDs: [], spouseIDs: [], descendentOf: "2 Nephi 4:8", description: "", nicknames: [], gender: 0 },
    { id: "<samsKids>", name: "samsKids", fatherId: "<sam>", motherId: "<daughterOfIshmael5>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<enos>", name: "Enos", fatherId: "<jacobSonOfLehi>", motherId: null, childrenIDs: ["<jarom>"], spouseIDs: [], descendentOf: "", description: "Jacob 7:27", nicknames: [], gender: 0 },
    { id: "<jarom>", name: "Jarom", fatherId: "<enos>", motherId: null, childrenIDs: ["<omni>"], spouseIDs: [], descendentOf: "", description: "Jarom 1:1", nicknames: [], gender: 0 },
    { id: "<omni>", name: "Omni", fatherId: "<jarom>", motherId: null, childrenIDs: ["<amaron>", "<chemish>"], spouseIDs: [], descendentOf: "", description: "Jarom 1:15", nicknames: [], gender: 0 },
    { id: "<amaron>", name: "Amaron", fatherId: "<omni>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "Omni 1:3 im assuming theyre brothers by parte de padre", nicknames: [], gender: 0 },
    { id: "<chemish>", name: "Chemish", fatherId: "<omni>", motherId: null, childrenIDs: ["<abinadom>"], spouseIDs: [], descendentOf: "", description: "Omni 1:8", nicknames: [], gender: 0 },
    { id: "<abinadom>", name: "Abinadom", fatherId: "<chemish>", motherId: null, childrenIDs: ["<amaleki>"], spouseIDs: [], descendentOf: "", description: "had no kids omni 1:10", nicknames: [], gender: 0 },
    { id: "<amaleki>", name: "Amaleki", fatherId: "<abinadom>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:12", nicknames: [], gender: 0 },
    { id: "<amalekisBrother>", name: "Amalekis brother", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:30", nicknames: [], gender: 0 },
    { id: "<mosiahOlder>", name: "", fatherId: null, motherId: "<kingBenjamin>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:12", nicknames: [], gender: 0 },
    { id: "<kingBenjamin>", name: "King Benjamin", fatherId: null, motherId: "<mosiahOlder>", childrenIDs: ["<mosiahYounger>", "<Helorum>", "<HelamanSonOfKingBenjamin>"], spouseIDs: [], descendentOf: "", description: "omni 1:23", nicknames: [], gender: 0 },
    { id: "<mosiahYounger>", name: "", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<Helorum>", name: "", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<HelamanSonOfKingBenjamin>", name: "Helaman", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
];*/

//genesis - not complete and idk if its accurate
const characterData = [
    { id: "<godTheFather>", name: "God the Father", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<JesusChrist>", name: "Jesus Christ", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<HolyGhost>", name: "Holy Ghost", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<Satan>", name: "Satan", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<adam>", name: "Adam", fatherId: null, motherId: null, childrenIDs: ["<cain>", "<abel>", "<seth>"], spouseIDs: ["<eve>"] },
    { id: "<eve>", name: "Eve", fatherId: null, motherId: null, childrenIDs: ["<cain>", "<abel>", "<seth>"], spouseIDs: ["<adam>"] },
    { id: "<cain>", name: "Cain", fatherId: "<adam>", motherId: "<eve>", childrenIDs: ["<enochTheBadOne>"], spouseIDs: [] },
    { id: "<abel>", name: "Abel", fatherId: "<adam>", motherId: "<eve>", childrenIDs: [], spouseIDs: [] },
    { id: "<seth>", name: "Seth", fatherId: "<adam>", motherId: "<eve>", childrenIDs: ["<enosFromGenesis>"], spouseIDs: [] },
    { id: "<enochTheBadOne>", name: "Enoch", fatherId: "<cain>", motherId: null, childrenIDs: ["<irad>"], spouseIDs: [] },
    { id: "<irad>", name: "Irad", fatherId: "<enochTheBadOne>", motherId: null, childrenIDs: ["<mehujael>"], spouseIDs: [] },
    { id: "<mehujael>", name: "Mehujael", fatherId: "<irad>", motherId: null, childrenIDs: ["<methusael>"], spouseIDs: [] },
    { id: "<methusael>", name: "Methusael", fatherId: "<mehujael>", motherId: null, childrenIDs: ["<lamech>"], spouseIDs: [] },
    { id: "<lamech>", name: "Lamech", fatherId: "<methusael>", motherId: null, childrenIDs: ["<jabal>", "<jubal>", "<tubalcain>", "<naamah>"], spouseIDs: ["<adah>", "<zillah>"] },
    { id: "<adah>", name: "Adah", fatherId: null, motherId: null, childrenIDs: ["<jabal>", "<jubal>"], spouseIDs: ["<lamech>"] },
    { id: "<zillah>", name: "Zillah", fatherId: null, motherId: null, childrenIDs: ["<tubalcain>", "<naamah>"], spouseIDs: ["<lamech>"] },
    { id: "<jabal>", name: "Jabal", fatherId: "<lamech>", motherId: "<adah>", childrenIDs: [], spouseIDs: [] },
    { id: "<jubal>", name: "Jubal", fatherId: "<lamech>", motherId: "<adah>", childrenIDs: [], spouseIDs: [] },
    { id: "<tubalcain>", name: "Tubalcain", fatherId: "<lamech>", motherId: "<zillah>", childrenIDs: [], spouseIDs: [] },
    { id: "<naamah>", name: "Naamah", fatherId: "<lamech>", motherId: "<zillah>", childrenIDs: [], spouseIDs: [] },
    { id: "<enosFromGenesis>", name: "Enos", fatherId: "<seth>", motherId: null, childrenIDs: ["<cainan>"], spouseIDs: [] },
    { id: "<cainan>", name: "Cainan", fatherId: "<enosFromGenesis>", motherId: null, childrenIDs: ["<mahalaleel>"], spouseIDs: [] },
    { id: "<mahalaleel>", name: "Mahalaleel", fatherId: "<cainan>", motherId: null, childrenIDs: ["<jared>"], spouseIDs: [] },
    { id: "<jared>", name: "Jared", fatherId: "<mahalaleel>", motherId: null, childrenIDs: ["<enoch>"], spouseIDs: [] },
    { id: "<enoch>", name: "Enoch", fatherId: "<jared>", motherId: null, childrenIDs: ["<methuselah>"], spouseIDs: [] },
    { id: "<methuselah>", name: "Methuselah", fatherId: "<enoch>", motherId: null, childrenIDs: ["<lamech>"], spouseIDs: [] },
    { id: "<lamech>", name: "Lamech", fatherId: "<methuselah>", motherId: null, childrenIDs: ["<noah>"], spouseIDs: ["<adah>", "<zillah>"] },
    { id: "<noah>", name: "Noah", fatherId: "<lamech>", motherId: null, childrenIDs: ["<shem>", "<ham>", "<japheth>"], spouseIDs: ["<naamah>"] },
    { id: "<shem>", name: "Shem", fatherId: "<noah>", motherId: "<naamah>", childrenIDs: [], spouseIDs: [] },
    { id: "<ham>", name: "Ham", fatherId: "<noah>", motherId: "<naamah>", childrenIDs: [], spouseIDs: [] },
    { id: "<japheth>", name: "Japheth", fatherId: "<noah>", motherId: "<naamah>", childrenIDs: [], spouseIDs: [] },
    { id: "<canaan>", name: "Canaan", fatherId: "<ham>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<ninrod>", name: "Nimrod", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<cush>", name: "Cush", fatherId: "<ham>", motherId: null, childrenIDs: ["<seba>", "<havilah>", "<sabtah>", "<ramah>", "<sabtechah>"], spouseIDs: [] },
    { id: "<seba>", name: "Seba", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<havilah>", name: "Havilah", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<sabtah>", name: "Sabtah", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<ramah>", name: "Ramah", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<sabtechah>", name: "Sabtechah", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<raamah>", name: "Raamah", fatherId: "<cush>", motherId: null, childrenIDs: ["<sheba>", "<dedan>"], spouseIDs: [] },
    { id: "<sheba>", name: "Sheba", fatherId: "<raamah>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<dedan>", name: "Dedan", fatherId: "<raamah>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<nimrod>", name: "Nimrod", fatherId: "<cush>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<egyptus>", name: "Egyptus", fatherId: null, motherId: null, childrenIDs: ["<phut>", "<canaan>", "<mizraim>", "<cush>"], spouseIDs: [] },
    { id: "<phut>", name: "Phut", fatherId: "<egyptus>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<mizraim>", name: "Mizraim", fatherId: "<egyptus>", motherId: null, childrenIDs: ["<ludim>", "<anamim>", "<lehabim>", "<naphtuhim>", "<pathrusim>", "<casluhim>", "<caphtorim>"], spouseIDs: [] },
    { id: "<ludim>", name: "Ludim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<anamim>", name: "Anamim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<lehabim>", name: "Lehabim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<naphtuhim>", name: "Naphtuhim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<pathrusim>", name: "Pathrusim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<casluhim>", name: "Casluhim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<caphtorim>", name: "Caphtorim", fatherId: "<mizraim>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<gomer>", name: "Gomer", fatherId: "<japheth>", motherId: null, childrenIDs: ["<ashkenaz>", "<riphath>", "<togarmah>"], spouseIDs: [] },
    { id: "<ashkenaz>", name: "Ashkenaz", fatherId: "<gomer>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<riphath>", name: "Riphath", fatherId: "<gomer>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<togarmah>", name: "Togarmah", fatherId: "<gomer>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<madai>", name: "Madai", fatherId: "<japheth>", motherId: null, childrenIDs: ["<elam>", "<javan>", "<tubal>", "<meshech>", "<tidon>"], spouseIDs: [] },
    { id: "<elam>", name: "Elam", fatherId: "<madai>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<javan>", name: "Javan", fatherId: "<madai>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<tubal>", name: "Tubal", fatherId: "<madai>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<meshech>", name: "Meshech", fatherId: "<madai>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<tidon>", name: "Tidon", fatherId: "<madai>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<tarshish>", name: "Tarshish", fatherId: "<javan>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<kittim>", name: "Kittim", fatherId: "<javan>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<dodanim>", name: "Dodanim", fatherId: "<javan>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<peleg>", name: "Peleg", fatherId: "<eber>", motherId: null, childrenIDs: ["<reu>"], spouseIDs: [] },
    { id: "<reu>", name: "Reu", fatherId: "<peleg>", motherId: null, childrenIDs: ["<serug>"], spouseIDs: [] },
    { id: "<serug>", name: "Serug", fatherId: "<reu>", motherId: null, childrenIDs: ["<nahor>"], spouseIDs: [] },
    { id: "<nahor>", name: "Nahor", fatherId: "<serug>", motherId: null, childrenIDs: ["<terah>"], spouseIDs: ["<milcah>"] },
    { id: "<terah>", name: "Terah", fatherId: "<nahor>", motherId: null, childrenIDs: ["<abram>", "<nahor2>", "<haran>"], spouseIDs: ["<amthlah>"] },
    { id: "<haran>", name: "Haran", fatherId: "<terah>", motherId: "<amthlah>", childrenIDs: ["<lot>"], spouseIDs: [] },
    { id: "<nahor2>", name: "Nahor", fatherId: "<terah>", motherId: "<amthlah>", childrenIDs: ["<uz>", "<buz>", "<kemuel>", "<kesed>", "<hazo>", "<pildash>", "<jidlaph>"], spouseIDs: [] },
    { id: "<uz>", name: "Uz", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<buz>", name: "Buz", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<kemuel>", name: "Kemuel", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<kesed>", name: "Kesed", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<hazo>", name: "Hazo", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<pildash>", name: "Pildash", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<jidlaph>", name: "Jidlaph", fatherId: "<nahor2>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<lot>", name: "Lot", fatherId: "<haran>", motherId: null, childrenIDs: ["<moab>", "<benammi>"], spouseIDs: [] },
    { id: "<moab>", name: "Moab", fatherId: "<lot>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<benammi>", name: "Benammi", fatherId: "<lot>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<abram>", name: "Abram", fatherId: "<terah>", motherId: "<amthlah>", childrenIDs: ["<ishmael>", "<isaac>"], spouseIDs: ["<sarai>"] },
    { id: "<sarai>", name: "Sarai", fatherId: null, motherId: null, childrenIDs: ["<ishmael>", "<isaac>"], spouseIDs: ["<abram>"] },
    { id: "<ishmael>", name: "Ishmael", fatherId: "<abram>", motherId: "<sarai>", childrenIDs: [], spouseIDs: [] },
    { id: "<isaac>", name: "Isaac", fatherId: "<abram>", motherId: "<sarai>", childrenIDs: ["<esau>", "<jacob>"], spouseIDs: ["<rebekah>"] },
    { id: "<esau>", name: "Esau", fatherId: "<isaac>", motherId: "<rebekah>", childrenIDs: [], spouseIDs: [] },
    { id: "<jacob>", name: "Jacob", fatherId: "<isaac>", motherId: "<rebekah>", childrenIDs: ["<reuben>", "<simeon>", "<levi>", "<judah>", "<dan>", "<naphtali>", "<gad>", "<asher>", "<issachar>", "<zebulun>", "<dinah>"], spouseIDs: ["<leah>", "<rachel>"] },
    { id: "<rebekah>", name: "Rebekah", fatherId: null, motherId: null, childrenIDs: ["<esau>", "<jacob>"], spouseIDs: ["<isaac>"] },
    { id: "<leah>", name: "Leah", fatherId: null, motherId: null, childrenIDs: ["<reuben>", "<simeon>", "<levi>", "<judah>", "<dan>", "<naphtali>", "<gad>", "<asher>", "<issachar>", "<zebulun>", "<dinah>"], spouseIDs: ["<jacob>"] },
    { id: "<rachel>", name: "Rachel", fatherId: null, motherId: null, childrenIDs: ["<joseph>", "<benjamin>"], spouseIDs: ["<jacob>"] },
    { id: "<reuben>", name: "Reuben", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<simeon>", name: "Simeon", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<levi>", name: "Levi", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<judah>", name: "Judah", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: ["<perez>", "<zerah>"], spouseIDs: ["<shua>"] },
    { id: "<perez>", name: "Perez", fatherId: "<judah>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<zerah>", name: "Zerah", fatherId: "<judah>", motherId: null, childrenIDs: [], spouseIDs: [] },
    { id: "<dan>", name: "Dan", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<naphtali>", name: "Naphtali", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<gad>", name: "Gad", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<asher>", name: "Asher", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<issachar>", name: "Issachar", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<zebulun>", name: "Zebulun", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<dinah>", name: "Dinah", fatherId: "<jacob>", motherId: "<leah>", childrenIDs: [], spouseIDs: [] },
    { id: "<joseph>", name: "Joseph", fatherId: "<jacob>", motherId: "<rachel>", childrenIDs: ["<manasseh>", "<ephrain>"], spouseIDs: ["<asenath>"] },
    { id: "<asenath>", name: "Asenath", fatherId: null, motherId: null, childrenIDs: ["<manasseh>", "<ephrain>"], spouseIDs: ["<joseph>"] },
    { id: "<manasseh>", name: "Manasseh", fatherId: "<joseph>", motherId: "<asenath>", childrenIDs: [], spouseIDs: [] },
    { id: "<ephrain>", name: "Ephraim", fatherId: "<joseph>", motherId: "<asenath>", childrenIDs: [], spouseIDs: [] },


    { id: "<lehi>", name: "Lehi", fatherId: null, motherId: null, childrenIDs: ["<laman>", "<lemuel>", "<sam>", "<nephi>", "<jacobSonOfLehi>", "<josephSonOfLehi>"], spouseIDs: ["<sariah>"], descendentOf: "<josephOfOld> bur also manasses alma 10:3", description: "1 Nephi 1:4", nicknames: [], gender: 0 },
    { id: "<sariah>", name: "Sariah", fatherId: null, motherId: null, childrenIDs: ["<laman>", "<lemuel>", "<sam>", "<nephi>", "<jacobSonOfLehi>", "<josephSonOfLehi>"], spouseIDs: ["<lehi>"], descendentOf: "1 Nephi 2:5", description: "", nicknames: [], gender: 1 },
    { id: "<nephi>", name: "Nephi", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<nephisKids>"], spouseIDs: ["<daughterOfIshmael2>"], descendentOf: "", description: "1 Nephi 1:1, 16:7", nicknames: [], gender: 0 },
    { id: "<laman>", name: "Laman", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<lamansKids>"], spouseIDs: ["<daughterOfIshmael3>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<lemuel>", name: "Lemuel", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<lemuelsKids>"], spouseIDs: ["<daughterOfIshmael4>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<sam>", name: "Sam", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<samsKids>"], spouseIDs: ["<daughterOfIshmael5>"], descendentOf: "", description: "1 Nephi 2:5", nicknames: [], gender: 0 },
    { id: "<jacobSonOfLehi>", name: "Jacob", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: ["<enos>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 18:7", nicknames: [], gender: 0 },
    { id: "<josephSonOfLehi>", name: "Joseph", fatherId: "<lehi>", motherId: "<sariah>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 18:7", nicknames: [], gender: 0 },
    { id: "<laban>", name: "Laban", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 3:3", nicknames: [], gender: 0 },
    { id: "<zoram>", name: "Zoram", fatherId: null, motherId: "<oldestDaughterOfIshmael>", childrenIDs: ["<zoramAndOldestDaughterOfIshmaelsKids>"], spouseIDs: ["<oldestDaughterOfIshmael>"], descendentOf: "", description: "1 Nephi 4:20, 35", nicknames: [], gender: 0 },
    { id: "<ishmael>", name: "Ishmael", fatherId: null, motherId: "<ishmaelsWife>", childrenIDs: ["<oldestDaughterOfIshmael>", "<daughterOfIshmael2>", "<daughterOfIshmael3>", "<daughterOfIshmael4>", "<daughterOfIshmael5>", "<sonOfIshmael1>", "<sonOfIshmael2>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:2", nicknames: [], gender: 0 },
    { id: "<jacobOfOld>", name: "Jacob", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 5:14", nicknames: [], gender: 0 },
    { id: "<joseOfOld>", name: "Joseph", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 5:14", nicknames: [], gender: 0 },
    { id: "<zedekiah>", name: "Zedekiah", fatherId: null, motherId: null, childrenIDs: ["<mulek>"], spouseIDs: [], descendentOf: "<josephOfOld>", description: "1 Nephi 1:4", nicknames: [], gender: 0 },
    { id: "<mulek>", name: "Mulek", fatherId: "<zedekiah>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "Mosiah 25:2", nicknames: [], gender: 0 },
    { id: "<ishmaelsWife>", name: "Ishmaels Wife", fatherId: null, motherId: "<ishmael>", childrenIDs: ["<oldestDaughterOfIshmael>", "<daughterOfIshmael2>", "<daughterOfIshmael3>", "<daughterOfIshmael4>", "<daughterOfIshmael5>", "<sonOfIshmael1>", "<sonOfIshmael2>"], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6", nicknames: [], gender: 1 },
    { id: "<oldestDaughterOfIshmael>", name: "Oldest daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<zoramAndOldestDaughterOfIshmaelsKids>"], spouseIDs: ["<zoram>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael2>", name: "nephis daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<nephisKids>"], spouseIDs: ["<nephi>"], descendentOf: "", description: "1 Nephi 7:6, 18:19, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael3>", name: "lamans daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<lamansKids>"], spouseIDs: ["<laman>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael4>", name: "lemuels daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<lemuelsKids>"], spouseIDs: ["<lemuel>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<daughterOfIshmael5>", name: "sams daughter of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: ["<samsKids>"], spouseIDs: ["<sam>"], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 1 },
    { id: "<sonOfIshmael1>", name: "Son of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 0 },
    { id: "<sonOfIshmael2>", name: "Other son of Ishmael", fatherId: "<ishmael>", motherId: "<ishmaelsWife>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "1 Nephi 7:6, 16:7", nicknames: [], gender: 0 },
    { id: "<zoramAndOldestDaughterOfIshmaelsKids>", name: "", fatherId: "<zoram>", motherId: "<oldestDaughterOfIshmael>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<nephisKids>", name: "nephisKids", fatherId: "<nephi>", motherId: "<daughterOfIshmael2>", childrenIDs: [], spouseIDs: [], descendentOf: "1 Nephi 18:19", description: "", nicknames: [], gender: 0 },
    { id: "<lamansKids>", name: "lamansKids", fatherId: "<laman>", motherId: "<daughterOfIshmael3>", childrenIDs: [], spouseIDs: [], descendentOf: "2 Nephi 4:8", description: "", nicknames: [], gender: 0 },
    { id: "<lemuelsKids>", name: "lemuelsKids", fatherId: "<lemuel>", motherId: "<daughterOfIshmael4>", childrenIDs: [], spouseIDs: [], descendentOf: "2 Nephi 4:8", description: "", nicknames: [], gender: 0 },
    { id: "<samsKids>", name: "samsKids", fatherId: "<sam>", motherId: "<daughterOfIshmael5>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<enos>", name: "Enos", fatherId: "<jacobSonOfLehi>", motherId: null, childrenIDs: ["<jarom>"], spouseIDs: [], descendentOf: "", description: "Jacob 7:27", nicknames: [], gender: 0 },
    { id: "<jarom>", name: "Jarom", fatherId: "<enos>", motherId: null, childrenIDs: ["<omni>"], spouseIDs: [], descendentOf: "", description: "Jarom 1:1", nicknames: [], gender: 0 },
    { id: "<omni>", name: "Omni", fatherId: "<jarom>", motherId: null, childrenIDs: ["<amaron>", "<chemish>"], spouseIDs: [], descendentOf: "", description: "Jarom 1:15", nicknames: [], gender: 0 },
    { id: "<amaron>", name: "Amaron", fatherId: "<omni>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "Omni 1:3 im assuming theyre brothers by parte de padre", nicknames: [], gender: 0 },
    { id: "<chemish>", name: "Chemish", fatherId: "<omni>", motherId: null, childrenIDs: ["<abinadom>"], spouseIDs: [], descendentOf: "", description: "Omni 1:8", nicknames: [], gender: 0 },
    { id: "<abinadom>", name: "Abinadom", fatherId: "<chemish>", motherId: null, childrenIDs: ["<amaleki>"], spouseIDs: [], descendentOf: "", description: "had no kids omni 1:10", nicknames: [], gender: 0 },
    { id: "<amaleki>", name: "Amaleki", fatherId: "<abinadom>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:12", nicknames: [], gender: 0 },
    { id: "<amalekisBrother>", name: "Amalekis brother", fatherId: null, motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:30", nicknames: [], gender: 0 },
    { id: "<mosiahOlder>", name: "", fatherId: null, motherId: "<kingBenjamin>", childrenIDs: [], spouseIDs: [], descendentOf: "", description: "omni 1:12", nicknames: [], gender: 0 },
    { id: "<kingBenjamin>", name: "King Benjamin", fatherId: null, motherId: "<mosiahOlder>", childrenIDs: ["<mosiahYounger>", "<Helorum>", "<HelamanSonOfKingBenjamin>"], spouseIDs: [], descendentOf: "", description: "omni 1:23", nicknames: [], gender: 0 },
    { id: "<mosiahYounger>", name: "", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<Helorum>", name: "", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },
    { id: "<HelamanSonOfKingBenjamin>", name: "Helaman", fatherId: "<kingBenjamin>", motherId: null, childrenIDs: [], spouseIDs: [], descendentOf: "", description: "", nicknames: [], gender: 0 },



];



/*const characterData = [
    { id: "<jonny>", name: "jonny", fatherId: "<joe>", motherId: "<sarah>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<jessy>", name: "jessy", fatherId: "<joe>", motherId: "<sarah>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<jacob>", name: "jacob", fatherId: "<joe>", motherId: "<sarah>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<sarah>", name: "sarah", fatherId: "<raymond>", motherId: "<camila>", childrenIDs: ["<jonny>", "<jessy>", "<jacob>"], spouseIDs: ["<joe>"], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<joe>", name: "joe", fatherId: "<monte>", motherId: "<patricia>", childrenIDs: ["<jonny>", "<jessy>", "<jacob>"], spouseIDs: ["<sarah>"], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<camila>", name: "camila", fatherId: "<ben>", motherId: "<hazel>", childrenIDs: ["<sarah>", "<matt>", "<elisa>", "<jenni>"], spouseIDs: ["<raymond>"], descendentOf: null, description: null, nicknames: [], gender: 0 },

];*/

/*const characterData = [
    { id: "<john>", name: "John", fatherId: null, motherId: null, childrenIDs: ["<mary>", "<david>"], spouseIDs: ["<lisa>"], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<lisa>", name: "Lisa", fatherId: null, motherId: null, childrenIDs: ["<mary>", "<david>"], spouseIDs: ["<john>"], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<mary>", name: "Mary", fatherId: "<john>", motherId: "<lisa>", childrenIDs: ["<emma>", "<ethan>"], spouseIDs: ["<james>"], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<david>", name: "David", fatherId: "<john>", motherId: "<lisa>", childrenIDs: ["<joseph>", "<emma>"], spouseIDs: ["<sophia>"], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<emma>", name: "Emma", fatherId: "<mary>", motherId: "<james>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<ethan>", name: "Ethan", fatherId: "<mary>", motherId: "<james>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<james>", name: "James", fatherId: null, motherId: null, childrenIDs: ["<emma>", "<ethan>"], spouseIDs: ["<mary>"], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<joseph>", name: "Joseph", fatherId: "<david>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<sophia>", name: "Sophia", fatherId: null, motherId: null, childrenIDs: ["<joseph>", "<emma>"], spouseIDs: ["<david>"], descendentOf: null, description: null, nicknames: [], gender: 1 },
    // Additional entries
    { id: "<alex>", name: "Alex", fatherId: "<joseph>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<olivia>", name: "Olivia", fatherId: "<james>", motherId: "<mary>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<emily>", name: "Emily", fatherId: "<james>", motherId: "<mary>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<ryan>", name: "Ryan", fatherId: "<david>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<jack>", name: "Jack", fatherId: "<david>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<emma2>", name: "Emma", fatherId: "<james>", motherId: "<mary>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<ethan2>", name: "Ethan", fatherId: "<james>", motherId: "<mary>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<mia>", name: "Mia", fatherId: "<james>", motherId: "<mary>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
    { id: "<noah>", name: "Noah", fatherId: "<david>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 0 },
    { id: "<ava>", name: "Ava", fatherId: "<david>", motherId: "<sophia>", childrenIDs: [], spouseIDs: [], descendentOf: null, description: null, nicknames: [], gender: 1 },
];*/




const characters = characterData.map(data => new Character(data));
export default characters;
