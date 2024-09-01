import { saveSettingsDebounced } from '../../../../script.js';
import { extension_settings } from '../../../extensions.js';

if (!extension_settings.manEatingMonster) {
    extension_settings.manEatingMonster = {};
}
if (!extension_settings.manEatingMonster.didYouKnow) {
    extension_settings.manEatingMonster.didYouKnow = [];
}
const used = extension_settings.manEatingMonster.didYouKnow;

const didYou = [
    'Did you know that (?)',
    'Fun fact, ',
    'Get this, ',
    'Believe it or not,',
    'Little known fact, ',
    'It might surprise you to learn that ',
    'Not many people know that ',
    'Have you heard that (?)',
    'Bet you didn\'t know that ',
    'Incredible but true, ',
    'Check this out, ',
    'Want to hear something interesting? ',
    'Get a load of this, ',
];

const facts = [
    'in Greek mythology, Scylla was once a beautiful nymph before being transformed into a monster?',
    'according to mythology, Scylla was the daughter of Phorcys and Ceto, both sea deities?',
    'in Greek mythology, Scylla had a sister named Thoosa, who was the mother of the Cyclops Polyphemus?',
    'in some versions of the Greek myth, Scylla was transformed into a monster by the jealous enchantress Circe?',
    'in other versions of the Greek myth, Scylla was transformed into a monster by the sea god Poseidon?',
    'in Greek mythology, Scylla was said to have six long necks, each with a horrific head?',
    'in Greek mythology, each of Scylla\'s heads had three rows of sharp teeth?',
    'according to Greek mythology, Scylla would devour six sailors at a time, one for each of her monstrous heads?',
    'in Greek mythology, Scylla lived in a cave on one side of a narrow strait of water?',
    'the strait where Scylla lived is believed to be the real-life Strait of Messina between Italy and Sicily?',
    'in Greek mythology, on the other side of the strait where Scylla lived, lived another monster, Charybdis, who created whirlpools?',
    'according to Greek mythology, sailors had to navigate carefully between the monsters Scylla and Charybdis to avoid being destroyed?',
    'the phrase "between Scylla and Charybdis" means being between two dangers, in reference to the Greek myth?',
    'the monster Scylla was featured in Homer\'s "Odyssey" as one of the challenges Odysseus had to face on his journey home?',
    'in Homer\'s "Odyssey," Scylla snatched and devoured six of Odysseus\' crewmen?',
    'in Homer\'s "Odyssey," Odysseus and his crew had to sail close to Scylla\'s side of the strait to avoid the whirlpools of Charybdis?',
    'in some depictions of Greek mythology, Scylla is described as having a fish-like lower body?',
    'in some depictions of Greek mythology, Scylla has wolf-like heads instead of human ones?',
    'in Roman mythology, Scylla was sometimes associated with a real rock formation called "Scylla" in the Strait of Messina?',
    'the real rock formation associated with Scylla in Roman mythology was said to resemble a woman from afar?',
    'the name "Scylla" means "she who renders prey" in Greek?',
    'in Greek mythology, Scylla was sometimes considered a personification of the dangers of the sea?',
    'in Greek mythology, Scylla was said to bark like a dog?',
    'in some versions of Greek mythology, Scylla\'s mother was given as Lamia, a monster who preyed on children?',
    'in some versions of Greek mythology, the hero Heracles encountered and killed Scylla during his travels?',
    'the Greek philosopher Plato used the monster Scylla as a metaphor for the dangers of political life?',
    'the Roman poet Ovid wrote about the myth of Scylla in his work "Metamorphoses"?',
    'in Ovid\'s "Metamorphoses," Scylla was a nymph who was transformed by Circe out of jealousy over a man they both loved?',
    'in medieval times, the monster Scylla was sometimes depicted as a siren or mermaid who lured sailors to their deaths?',
    'the 17th-century Italian artist Guido Reni painted a famous depiction of the monster Scylla?',
    'the French composer Maurice Duruflé wrote a piece of music called "Prelude, Adagio, and Choral Variations on the Theme of Scylla" in 1952?',
    'there is a genus of swimming crabs named after the monster Scylla from Greek mythology?',
    'there is also a genus of prawns named after the monster Scylla from Greek mythology?',
    'the phrase "Scylla and Charybdis" is used to describe a situation where there are two equally unpleasant alternatives?',
    'in some versions of Greek mythology, the monster Scylla had a tail that ended in a serpent\'s head?',
    'in Greek mythology, Scylla was sometimes associated with the sea monster Echidna, who was half-woman and half-serpent?',
    'in some stories from Greek mythology, Scylla was the mother of the Crommyonian Sow, a monstrous pig that ravaged the countryside?',
    'the Greek historian Herodotus wrote about a dangerous reef near the Strait of Messina that was named after the monster Scylla?',
    'the ancient Greeks believed that the real Strait of Messina, associated with the mythical monsters Scylla and Charybdis, was the site of numerous shipwrecks and disasters?',
    'in some versions of Greek mythology, Scylla had a human upper body and a fish-like lower body with six dog heads sprouting from her waist?',
    'the Roman poet Virgil wrote about the monster Scylla in his epic poem, the "Aeneid"?',
    'in Virgil\'s "Aeneid," Scylla was a monster who guarded the entrance to the underworld?',
    'the Greek geographer Strabo described Scylla as a rocky promontory that caused whirlpools and shipwrecks in the real Strait of Messina?',
    'in some legends from Greek mythology, Scylla was said to have been a beautiful princess who was transformed into a monster as punishment for her pride?',
    'the Greek poet Apollonius of Rhodes wrote about the monster Scylla in his epic poem, the "Argonautica"?',
    'in Apollonius of Rhodes\' "Argonautica," the Argonauts had to navigate between the monsters Scylla and Charybdis on their quest for the Golden Fleece?',
    'the Roman historian Pliny the Elder described Scylla, the monster from Greek mythology, as a type of shark or dogfish?',
    'in some medieval bestiaries, the monster Scylla was depicted as a mermaid with six dog heads?',
    'the Renaissance artist Agnolo Bronzino painted a famous depiction of the monster Scylla in his work "The Crossing of the Red Sea"?',
    'the Italian poet Dante Alighieri included the monster Scylla in his epic poem, the "Divine Comedy," as one of the monsters guarding the eighth circle of Hell?',
];

/**
 *
 * @param {string[]} src
 * @returns {string}
 */
const pick = (src)=>{
    const list = [...src];
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list.at(0);
};
export const didYouKnow = ()=>{
    if (used.length == facts.length) {
        while (used.length > 5) used.shift();
    }
    let a = pick(didYou);
    const q = a.endsWith('(?)');
    if (q) a = a.slice(0, -3);
    const ucf = a.trim().endsWith('?');
    let b = pick(facts.filter(it=>!used.includes(it)));
    used.push(b);
    saveSettingsDebounced();
    if (ucf) b = `${b[0].toUpperCase()}${b.slice(1)}`;
    if (!q) b = `${b.slice(0, -1)}.`;
    return `${a}${b}`;
};
