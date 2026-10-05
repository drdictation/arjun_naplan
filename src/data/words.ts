export interface SpellingWord {
  id: string;
  word: string;
  displayWord?: string;
  phoneticHint: string;
  category:
    | "Silent Letters"
    | "Tricky Vowels"
    | "Double Consonants"
    | "Suffixes & Endings"
    | "Prefixes & Plurals"
    | "Homophones"
    | "High-Frequency Essentials"
    | "Australian & Nature";
  difficulty: 1 | 2 | 3; // 1: Starter, 2: Year 3 Core, 3: Band 6 Challenge
  sentence: string; // Used for audio dictation
  proofreadSentence: string; // Used for NAPLAN proofreading question
  misspelledWord: string; // Deliberate misspelling in proofreadSentence
  ruleExplanation: string; // Feedback tip shown when practicing
}

export const YEAR_3_NAPLAN_WORDS: SpellingWord[] = [
  // --- High-Frequency Essentials (Tricky Sight Words) ---
  {
    id: "hfe-01",
    word: "because",
    phoneticHint: "Big Elephants Can Always Understand Small Elephants",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "We stayed inside because it began to pour rain.",
    proofreadSentence: "We went indoors becoz it was raining heavily.",
    misspelledWord: "becoz",
    ruleExplanation: "'Because' ends with -ause, not -oz."
  },
  {
    id: "hfe-02",
    word: "friend",
    phoneticHint: "A friend is there until the 'end'",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Lucas is my best friend at school.",
    proofreadSentence: "My best freind sat next to me on the bus.",
    misspelledWord: "freind",
    ruleExplanation: "'i' before 'e' in friend! Remember: fri-END."
  },
  {
    id: "hfe-03",
    word: "people",
    phoneticHint: "P-E-O-P-L-E: People eat omelettes, pancakes, lemons everyday",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "There were many people waiting at the train station.",
    proofreadSentence: "A lot of peeple watched the football game.",
    misspelledWord: "peeple",
    ruleExplanation: "'People' uses 'eo', not 'ee'."
  },
  {
    id: "hfe-04",
    word: "beautiful",
    phoneticHint: "B-E-A-utiful: Big Elephants Are United...",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "The sunset over the beach was beautiful.",
    proofreadSentence: "The garden was filled with beautifull roses.",
    misspelledWord: "beautifull",
    ruleExplanation: "Suffix '-ful' only has one 'l', like in beautiful."
  },
  {
    id: "hfe-05",
    word: "could",
    phoneticHint: "O-U-Lucky-Duck: C-O-U-L-D",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Arjun asked if he could borrow the library book.",
    proofreadSentence: "I wish I cood fly like a bird in the sky.",
    misspelledWord: "cood",
    ruleExplanation: "'Could', 'would', and 'should' all share the -ould pattern."
  },
  {
    id: "hfe-06",
    word: "would",
    phoneticHint: "W-O-U-L-D rhymes with could",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Would you like an apple or a banana for lunch?",
    proofreadSentence: "Who wood like another slice of watermelon?",
    misspelledWord: "wood",
    ruleExplanation: "'Would' is for choices. 'Wood' comes from a tree!"
  },
  {
    id: "hfe-07",
    word: "should",
    phoneticHint: "S-H + O-U-L-D",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "You should wash your hands before eating dinner.",
    proofreadSentence: "Children shud get plenty of sleep every night.",
    misspelledWord: "shud",
    ruleExplanation: "'Should' has silent 'l' and uses -ould."
  },
  {
    id: "hfe-08",
    word: "caught",
    phoneticHint: "C-A-U-G-H-T with -aught",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "The goalkeeper caught the soccer ball with both hands.",
    proofreadSentence: "The quick cat cot the toy mouse under the sofa.",
    misspelledWord: "cot",
    ruleExplanation: "'Caught' uses the -aught pattern for past tense of catch."
  },
  {
    id: "hfe-09",
    word: "bought",
    phoneticHint: "B-O-U-G-H-T with -ought",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Mum bought fresh bread and milk from the bakery.",
    proofreadSentence: "Dad bot a new helmet for my bicycle.",
    misspelledWord: "bot",
    ruleExplanation: "'Bought' is the past tense of buy, spelled with -ought."
  },
  {
    id: "hfe-10",
    word: "thought",
    phoneticHint: "T-H + O-U-G-H-T",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "I thought the maths puzzle was very interesting.",
    proofreadSentence: "Arjun thort he heard footsteps in the hallway.",
    misspelledWord: "thort",
    ruleExplanation: "'Thought' has the silent -gh- in -ought."
  },
  {
    id: "hfe-11",
    word: "laugh",
    phoneticHint: "L-A-U-G-H: Laugh And U Get Happy",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "The funny clown made everyone in the circus laugh.",
    proofreadSentence: "The comedy show made the whole audience laff loudly.",
    misspelledWord: "laff",
    ruleExplanation: "'Laugh' has a 'gh' that sounds like 'f'."
  },
  {
    id: "hfe-12",
    word: "enough",
    phoneticHint: "E-N-O-U-G-H ('gh' makes the 'f' sound)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Do we have enough pencils for every student?",
    proofreadSentence: "We have enuff chairs for all the visitors.",
    misspelledWord: "enuff",
    ruleExplanation: "'Enough' ends in -ough, making an 'uff' sound."
  },
  {
    id: "hfe-13",
    word: "trouble",
    phoneticHint: "T-R-O-U-B-L-E with -le ending",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "The playful puppy got into trouble by chewing a slipper.",
    proofreadSentence: "He did not want to cause any truble at school.",
    misspelledWord: "truble",
    ruleExplanation: "'Trouble' has 'ou' making the short 'u' sound."
  },
  {
    id: "hfe-14",
    word: "country",
    phoneticHint: "C-O-U-N-T-R-Y: Australia is our country",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Australia is a very large and sunny country.",
    proofreadSentence: "We drove out to the cuntry to see the farm animals.",
    misspelledWord: "cuntry",
    ruleExplanation: "'Country' begins with c-o-u-n."
  },
  {
    id: "hfe-15",
    word: "surprise",
    phoneticHint: "SUR + PRISE (don't forget the first 'r'!)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "We planned a surprise birthday party for Grandma.",
    proofreadSentence: "Opening the present was a wonderful suprise.",
    misspelledWord: "suprise",
    ruleExplanation: "'Surprise' has an 'r' in the first syllable: sur-prise."
  },
  {
    id: "hfe-16",
    word: "calendar",
    phoneticHint: "C-A-L-E-N-D-A-R (ends in -ar)",
    category: "High-Frequency Essentials",
    difficulty: 3,
    sentence: "I marked the school holidays on the wall calendar.",
    proofreadSentence: "Look at the calender to check what day Friday is.",
    misspelledWord: "calender",
    ruleExplanation: "'Calendar' ends with -ar, not -er."
  },

  // --- Silent Letters ---
  {
    id: "sil-01",
    word: "knight",
    phoneticHint: "Silent 'k' and silent 'gh'",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "The brave knight wore shiny silver armour.",
    proofreadSentence: "The medieval nite rode his horse into the castle.",
    misspelledWord: "nite",
    ruleExplanation: "A knight in armour starts with a silent 'k' and has -ight."
  },
  {
    id: "sil-02",
    word: "knife",
    phoneticHint: "Silent 'k' at the beginning",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Please use a butter knife to spread the jam.",
    proofreadSentence: "Be careful when using a sharp nife in the kitchen.",
    misspelledWord: "nife",
    ruleExplanation: "'Knife' starts with a silent 'k'."
  },
  {
    id: "sil-03",
    word: "knee",
    phoneticHint: "Silent 'k' before 'n'",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Arjun scraped his knee when he tripped on the grass.",
    proofreadSentence: "I put a bandage over the scrape on my nee.",
    misspelledWord: "nee",
    ruleExplanation: "Your 'knee' has a silent 'k' at the front."
  },
  {
    id: "sil-04",
    word: "know",
    phoneticHint: "Silent 'k' - knowledge in your mind",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Do you know the answer to the quiz question?",
    proofreadSentence: "I no how to ride a two-wheel bicycle without training wheels.",
    misspelledWord: "no",
    ruleExplanation: "'Know' (having information) starts with silent 'k'."
  },
  {
    id: "sil-05",
    word: "knock",
    phoneticHint: "Silent 'k' at the start and -ck at the end",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Always knock on the bedroom door before entering.",
    proofreadSentence: "We heard a loud nock at the front gate.",
    misspelledWord: "nock",
    ruleExplanation: "'Knock' starts with a silent 'k' and ends with 'ck'."
  },
  {
    id: "sil-06",
    word: "wrist",
    phoneticHint: "Silent 'w' before 'r'",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "He wore his brand new digital watch around his wrist.",
    proofreadSentence: "She twisted her rist while swinging on the monkey bars.",
    misspelledWord: "rist",
    ruleExplanation: "'Wrist' begins with a silent 'w'."
  },
  {
    id: "sil-07",
    word: "write",
    phoneticHint: "Silent 'w' - writing with a pencil",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Use your neatest handwriting to write the story.",
    proofreadSentence: "Please rite your full name at the top of the worksheet.",
    misspelledWord: "rite",
    ruleExplanation: "To 'write' words with a pen starts with silent 'w'."
  },
  {
    id: "sil-08",
    word: "wrong",
    phoneticHint: "Silent 'w' before 'r'",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "If you take a wrong turn, check the street map.",
    proofreadSentence: "It is okay to make a rong answer when learning something new.",
    misspelledWord: "rong",
    ruleExplanation: "'Wrong' starts with a silent 'w'."
  },
  {
    id: "sil-09",
    word: "wrap",
    phoneticHint: "Silent 'w' - wrapping a gift",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Let us wrap the present in colourful paper and ribbon.",
    proofreadSentence: "We need to rap the lunch sandwiches in foil.",
    misspelledWord: "rap",
    ruleExplanation: "To 'wrap' a parcel has a silent 'w'. 'Rap' is music or tapping!"
  },
  {
    id: "sil-10",
    word: "lamb",
    phoneticHint: "Silent 'b' at the end",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "The fluffy little lamb skipped across the green meadow.",
    proofreadSentence: "The farmer fed milk to the young lam in the paddock.",
    misspelledWord: "lam",
    ruleExplanation: "'Lamb' has a silent 'b' at the end."
  },
  {
    id: "sil-11",
    word: "climb",
    phoneticHint: "Silent 'b' at the end",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "The koala will climb up the tall eucalyptus tree.",
    proofreadSentence: "The little monkey climed up the tree trunk.",
    misspelledWord: "climed",
    ruleExplanation: "'Climb' has a silent 'b' at the end (climbed, climbing)."
  },
  {
    id: "sil-12",
    word: "comb",
    phoneticHint: "Silent 'b' after 'm'",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Use a wide plastic comb to untangle your wet hair.",
    proofreadSentence: "He used a yellow coam to brush his curls.",
    misspelledWord: "coam",
    ruleExplanation: "'Comb' is spelled c-o-m-b with a silent 'b'."
  },
  {
    id: "sil-13",
    word: "thumb",
    phoneticHint: "Silent 'b' at the end",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Give a thumbs-up sign if you are ready to begin.",
    proofreadSentence: "He bruised his thum when the tennis ball hit his hand.",
    misspelledWord: "thum",
    ruleExplanation: "'Thumb' has a silent 'b' at the end."
  },
  {
    id: "sil-14",
    word: "crumb",
    phoneticHint: "Silent 'b' after 'm'",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "The tiny bird pecked at a bread crumb on the patio.",
    proofreadSentence: "Not a single crum was left on the cake plate.",
    misspelledWord: "crum",
    ruleExplanation: "'Crumb' ends with a silent 'b'."
  },
  {
    id: "sil-15",
    word: "island",
    phoneticHint: "Silent 's' - IS + LAND",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "We took a ferry across the bay to Rottnest Island.",
    proofreadSentence: "The pirates buried their treasure chest on a remote iland.",
    misspelledWord: "iland",
    ruleExplanation: "'Island' has a silent 's': is-land."
  },
  {
    id: "sil-16",
    word: "whistle",
    phoneticHint: "Silent 't' in the middle and 'wh' at start",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "The soccer referee blew his loud whistle to stop play.",
    proofreadSentence: "The coach blew his silver wissle at half time.",
    misspelledWord: "wissle",
    ruleExplanation: "'Whistle' has 'wh' at the start and a silent 't' in -stle."
  },
  {
    id: "sil-17",
    word: "listen",
    phoneticHint: "Silent 't' in the middle",
    category: "Silent Letters",
    difficulty: 1,
    sentence: "Please listen carefully to the teacher's instructions.",
    proofreadSentence: "Sit quietly and lisen to the story book.",
    misspelledWord: "lisen",
    ruleExplanation: "'Listen' has a silent 't': lis-ten."
  },
  {
    id: "sil-18",
    word: "autumn",
    phoneticHint: "Silent 'n' after 'm'",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "In autumn, the golden leaves fall from the branches.",
    proofreadSentence: "The weather turns cooler when autum arrives in March.",
    misspelledWord: "autum",
    ruleExplanation: "'Autumn' ends in -mn with a silent 'n'."
  },
  {
    id: "sil-19",
    word: "gnome",
    phoneticHint: "Silent 'g' before 'n'",
    category: "Silent Letters",
    difficulty: 2,
    sentence: "A cheerful garden gnome sat under the rose bush.",
    proofreadSentence: "Grandma placed a tiny painted nome near the flower pot.",
    misspelledWord: "nome",
    ruleExplanation: "'Gnome' starts with a silent 'g'."
  },

  // --- Tricky Vowels & Digraphs ---
  {
    id: "vow-01",
    word: "straight",
    phoneticHint: "S-T-R + A-I-G-H-T with -aight",
    category: "Tricky Vowels",
    difficulty: 3,
    sentence: "Use a long wooden ruler to draw a straight pencil line.",
    proofreadSentence: "Walk strate down the corridor to find the school library.",
    misspelledWord: "strate",
    ruleExplanation: "'Straight' uses -aight (like straight ahead)."
  },
  {
    id: "vow-02",
    word: "weight",
    phoneticHint: "W-E-I-G-H-T ('e' before 'i' sounding like 'ay')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The nurse checked my height and weight during the check-up.",
    proofreadSentence: "He lifted the heavy wait using both hands.",
    misspelledWord: "wait",
    ruleExplanation: "'Weight' (how heavy something is) is spelled with -eigh-."
  },
  {
    id: "vow-03",
    word: "neighbour",
    phoneticHint: "N-E-I-G-H-B-O-U-R (Australian spelling with -our)",
    category: "Tricky Vowels",
    difficulty: 3,
    sentence: "Our friendly neighbour waved hello over the garden fence.",
    proofreadSentence: "Our nabor helped us water the plants while we were away.",
    misspelledWord: "nabor",
    ruleExplanation: "'Neighbour' has -eigh- and ends in -our in Australian English."
  },
  {
    id: "vow-04",
    word: "piece",
    phoneticHint: "A piece of PIE (p-i-e-c-e)",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "Would you like another piece of birthday cake?",
    proofreadSentence: "Can I have a peice of fruit after swimming practice?",
    misspelledWord: "peice",
    ruleExplanation: "'Piece' starts with PIE: p-i-e-c-e. 'i' before 'e'."
  },
  {
    id: "vow-05",
    word: "believe",
    phoneticHint: "Never believe a LIE (b-e-l-i-e-v-e)",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "I believe our school team will win the championship.",
    proofreadSentence: "Do you beleive in mythical dragons and unicorns?",
    misspelledWord: "beleive",
    ruleExplanation: "'Believe' contains the word 'lie' (l-i-e): be-LIE-ve."
  },
  {
    id: "vow-06",
    word: "receive",
    phoneticHint: "'i' before 'e' except after 'c'",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "Did you receive the invitation letter in the mail?",
    proofreadSentence: "I hope to recieve a postcard from my pen pal.",
    misspelledWord: "recieve",
    ruleExplanation: "After 'c', it is 'ei': re-c-e-i-v-e."
  },
  {
    id: "vow-07",
    word: "ceiling",
    phoneticHint: "C-E-I-L-I-N-G ('e' before 'i' after 'c')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "A colourful paper lantern hung from the high ceiling.",
    proofreadSentence: "A spider spun its web near the high cieling in the corner.",
    misspelledWord: "cieling",
    ruleExplanation: "'Ceiling' follows 'e' before 'i' after 'c'."
  },
  {
    id: "vow-08",
    word: "chief",
    phoneticHint: "C-H-I-E-F ('i' before 'e')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The fire chief gave an informative talk on bushfire safety.",
    proofreadSentence: "The cheif officer explained the emergency plan to everyone.",
    misspelledWord: "cheif",
    ruleExplanation: "'Chief' is spelled with 'ie'."
  },
  {
    id: "vow-09",
    word: "thief",
    phoneticHint: "T-H-I-E-F ('i' before 'e')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The clever police officer caught the jewel thief.",
    proofreadSentence: "The masked theif dropped the bag as he ran away.",
    misspelledWord: "theif",
    ruleExplanation: "'Thief' uses 'ie': t-h-i-e-f."
  },
  {
    id: "vow-10",
    word: "shield",
    phoneticHint: "S-H-I-E-L-D ('i' before 'e')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The warrior raised his heavy bronze shield for protection.",
    proofreadSentence: "Wear sunglasses to sheild your eyes from strong sunlight.",
    misspelledWord: "sheild",
    ruleExplanation: "'Shield' uses 'ie': s-h-i-e-l-d."
  },
  {
    id: "vow-11",
    word: "field",
    phoneticHint: "F-I-E-L-D ('i' before 'e')",
    category: "Tricky Vowels",
    difficulty: 1,
    sentence: "We ran across the grassy oval field during lunchtime.",
    proofreadSentence: "The cows grazed happily in the green feild.",
    misspelledWord: "feild",
    ruleExplanation: "'Field' uses 'ie': f-i-e-l-d."
  },
  {
    id: "vow-12",
    word: "fruit",
    phoneticHint: "F-R-U-I-T with 'ui'",
    category: "Tricky Vowels",
    difficulty: 1,
    sentence: "Eating fresh fruit every day keeps you healthy.",
    proofreadSentence: "Apples and mangoes are my favourite kind of froot.",
    misspelledWord: "froot",
    ruleExplanation: "'Fruit' is spelled with -uit, not -oot."
  },
  {
    id: "vow-13",
    word: "juice",
    phoneticHint: "J-U-I-C-E with 'ui' and soft 'c'",
    category: "Tricky Vowels",
    difficulty: 1,
    sentence: "I drank a cold glass of freshly squeezed orange juice.",
    proofreadSentence: "Pour some apple joose into the cup for breakfast.",
    misspelledWord: "joose",
    ruleExplanation: "'Juice' is spelled j-u-i-c-e."
  },
  {
    id: "vow-14",
    word: "bruise",
    phoneticHint: "B-R-U-I-S-E with 'ui'",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "He developed a purple bruise on his shin after soccer.",
    proofreadSentence: "The bump on my elbow left a dark broose.",
    misspelledWord: "broose",
    ruleExplanation: "'Bruise' uses the 'ui' spelling."
  },
  {
    id: "vow-15",
    word: "suit",
    phoneticHint: "S-U-I-T with 'ui'",
    category: "Tricky Vowels",
    difficulty: 1,
    sentence: "Uncle David wore a smart black suit to the wedding.",
    proofreadSentence: "Put on your warm swim soote before jumping in the pool.",
    misspelledWord: "soote",
    ruleExplanation: "'Suit' is spelled s-u-i-t."
  },
  {
    id: "vow-16",
    word: "guide",
    phoneticHint: "G-U-I-D-E ('u' after 'g')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The tour guide showed us prehistoric fossils at the museum.",
    proofreadSentence: "Follow the trail gide so we do not get lost in the forest.",
    misspelledWord: "gide",
    ruleExplanation: "'Guide' starts with 'gui'."
  },
  {
    id: "vow-17",
    word: "guitar",
    phoneticHint: "G-U-I-T-A-R ('gui' + 'tar')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "Arjun enjoys strumming happy chords on his acoustic guitar.",
    proofreadSentence: "She practiced playing chords on her six-string gitar.",
    misspelledWord: "gitar",
    ruleExplanation: "'Guitar' begins with 'gui' and ends with -ar."
  },
  {
    id: "vow-18",
    word: "guard",
    phoneticHint: "G-U-A-R-D ('u' comes before 'a')",
    category: "Tricky Vowels",
    difficulty: 2,
    sentence: "The security guard checked our tickets at the museum gate.",
    proofreadSentence: "A strong stone wall helped to gaurd the ancient city.",
    misspelledWord: "gaurd",
    ruleExplanation: "'Guard' has 'ua', not 'au'."
  },

  // --- Double Consonants ---
  {
    id: "dbl-01",
    word: "happen",
    phoneticHint: "Double 'p' in hap-pen",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "What will happen next in the adventure story?",
    proofreadSentence: "Did you see what did hapen during the science experiment?",
    misspelledWord: "hapen",
    ruleExplanation: "Short 'a' sound followed by double 'p': hap-pen."
  },
  {
    id: "dbl-02",
    word: "rabbit",
    phoneticHint: "Double 'b' in rab-bit",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The white rabbit hopped into the vegetable patch.",
    proofreadSentence: "A fluffy rabit nibbled a fresh carrot on the lawn.",
    misspelledWord: "rabit",
    ruleExplanation: "'Rabbit' has double 'b'."
  },
  {
    id: "dbl-03",
    word: "sudden",
    phoneticHint: "Double 'd' in sud-den",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "A sudden clap of thunder echoed across the dark sky.",
    proofreadSentence: "All of a suden, the classroom lights went completely dark.",
    misspelledWord: "suden",
    ruleExplanation: "'Sudden' has double 'd'."
  },
  {
    id: "dbl-04",
    word: "dinner",
    phoneticHint: "Double 'n' (one 'n' makes diner)",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "We had pasta and salad for dinner tonight.",
    proofreadSentence: "Dad cooked tasty homemade spaghetti for diner.",
    misspelledWord: "diner",
    ruleExplanation: "'Dinner' (the evening meal) has double 'n'. 'Diner' is a restaurant!"
  },
  {
    id: "dbl-05",
    word: "summer",
    phoneticHint: "Double 'm' in sum-mer",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "We go to the ocean beach almost every day in summer.",
    proofreadSentence: "December is the first warm month of sumer in Australia.",
    misspelledWord: "sumer",
    ruleExplanation: "'Summer' has double 'm'."
  },
  {
    id: "dbl-06",
    word: "yellow",
    phoneticHint: "Double 'l' in yel-low",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The bright yellow sunflower followed the midday sun.",
    proofreadSentence: "She painted a sunny yelow smiley face on the card.",
    misspelledWord: "yelow",
    ruleExplanation: "'Yellow' has double 'l'."
  },
  {
    id: "dbl-07",
    word: "ladder",
    phoneticHint: "Double 'd' in lad-der",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The firefighter climbed the tall ladder to reach the roof.",
    proofreadSentence: "Dad used a sturdy aluminum lader to clean the gutters.",
    misspelledWord: "lader",
    ruleExplanation: "'Ladder' has double 'd'."
  },
  {
    id: "dbl-08",
    word: "puppy",
    phoneticHint: "Double 'p' and ends in 'y'",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The excited puppy wagged its tail and barked happily.",
    proofreadSentence: "Our golden pupy loves fetching rubber balls in the park.",
    misspelledWord: "pupy",
    ruleExplanation: "'Puppy' has double 'p'."
  },
  {
    id: "dbl-09",
    word: "kitten",
    phoneticHint: "Double 't' in kit-ten",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The sleepy kitten curled up comfortably on my lap.",
    proofreadSentence: "The little kiten chased a ball of wool across the rug.",
    misspelledWord: "kiten",
    ruleExplanation: "'Kitten' has double 't'."
  },
  {
    id: "dbl-10",
    word: "bottle",
    phoneticHint: "Double 't' and ends in -le",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "Remember to bring a reusable water bottle to school.",
    proofreadSentence: "I dropped my plastic water botle on the playground.",
    misspelledWord: "botle",
    ruleExplanation: "'Bottle' has double 't' and ends in -le."
  },
  {
    id: "dbl-11",
    word: "middle",
    phoneticHint: "Double 'd' in mid-dle",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "The referee placed the ball in the middle of the field.",
    proofreadSentence: "Stand right in the midle of the circle for the group photo.",
    misspelledWord: "midle",
    ruleExplanation: "'Middle' has double 'd' and -le."
  },
  {
    id: "dbl-12",
    word: "apple",
    phoneticHint: "Double 'p' and -le",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "I ate a crunchy red apple during fruit break.",
    proofreadSentence: "She picked a sweet green aple from the branch.",
    misspelledWord: "aple",
    ruleExplanation: "'Apple' has double 'p'."
  },
  {
    id: "dbl-13",
    word: "puddle",
    phoneticHint: "Double 'd' in pud-dle",
    category: "Double Consonants",
    difficulty: 1,
    sentence: "Arjun jumped right into the big muddy puddle.",
    proofreadSentence: "Rainwater formed a deep pudle on the footpath.",
    misspelledWord: "pudle",
    ruleExplanation: "'Puddle' has double 'd'."
  },
  {
    id: "dbl-14",
    word: "different",
    phoneticHint: "Double 'f' in dif-fer-ent",
    category: "Double Consonants",
    difficulty: 2,
    sentence: "Each snowflake has a unique and different pattern.",
    proofreadSentence: "We compared three diferent kinds of leaves in science class.",
    misspelledWord: "diferent",
    ruleExplanation: "'Different' has double 'f' and ends in -ent."
  },
  {
    id: "dbl-15",
    word: "difficult",
    phoneticHint: "Double 'f' in dif-fi-cult",
    category: "Double Consonants",
    difficulty: 2,
    sentence: "The spelling challenge was difficult, but Arjun persevered.",
    proofreadSentence: "Solving the mystery maze was quite dificut for the team.",
    misspelledWord: "dificut",
    ruleExplanation: "'Difficult' has double 'f' and ends in -cult."
  },
  {
    id: "dbl-16",
    word: "disappear",
    phoneticHint: "One 's', double 'p': dis-ap-pear",
    category: "Double Consonants",
    difficulty: 3,
    sentence: "The magician made the coin disappear into thin air.",
    proofreadSentence: "Watch the magician make the white rabbit dissapear!",
    misspelledWord: "dissapear",
    ruleExplanation: "Prefix 'dis-' + 'appear'. Only one 's' and two 'p's."
  },
  {
    id: "dbl-17",
    word: "address",
    phoneticHint: "Double 'd' and double 's': ad-dress",
    category: "Double Consonants",
    difficulty: 2,
    sentence: "Write your home address on the return envelope.",
    proofreadSentence: "Do you know your postal adress including the postcode?",
    misspelledWord: "adress",
    ruleExplanation: "'Address' has double 'd' and double 's'."
  },

  // --- Suffixes & Endings ---
  {
    id: "suf-01",
    word: "happiness",
    phoneticHint: "Change 'y' to 'i' before -ness",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "Winning the sports trophy brought great happiness to our class.",
    proofreadSentence: "Her smiling face was full of joyful happyness.",
    misspelledWord: "happyness",
    ruleExplanation: "Happy ends with 'y', so change 'y' to 'i' before adding -ness: happiness."
  },
  {
    id: "suf-02",
    word: "careful",
    phoneticHint: "Care + ful (only one 'l')",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "Be careful when crossing the busy road.",
    proofreadSentence: "Please be carefull not to spill the glass of milk.",
    misspelledWord: "carefull",
    ruleExplanation: "The suffix '-ful' always has just one 'l'."
  },
  {
    id: "suf-03",
    word: "playful",
    phoneticHint: "Play + ful (only one 'l')",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "The playful kitten bounced after the rolling ball.",
    proofreadSentence: "The young seal was feeling very playfull today.",
    misspelledWord: "playfull",
    ruleExplanation: "The suffix '-ful' only has a single 'l'."
  },
  {
    id: "suf-04",
    word: "hoping",
    phoneticHint: "Drop the 'e' before -ing (hope -> hoping)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "We are hoping for sunny weather on sports day.",
    proofreadSentence: "I am hopeing to visit the zoo this weekend.",
    misspelledWord: "hopeing",
    ruleExplanation: "Drop the silent 'e' from 'hope' before adding '-ing': hoping."
  },
  {
    id: "suf-05",
    word: "hopping",
    phoneticHint: "Double the 'p' before -ing (hop -> hopping)",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "The kangaroo was hopping swiftly across the open plain.",
    proofreadSentence: "The energetic frog was hoplng from lily pad to lily pad.",
    misspelledWord: "hoplng",
    ruleExplanation: "For short vowel words like 'hop', double the consonant: hopping."
  },
  {
    id: "suf-06",
    word: "safely",
    phoneticHint: "Safe + ly (keep the 'e')",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "The school bus arrived safely at the campsite.",
    proofreadSentence: "Always cross the pedestrian street safly at the zebra crossing.",
    misspelledWord: "safly",
    ruleExplanation: "Keep the 'e' in safe when adding -ly: safe-ly."
  },
  {
    id: "suf-07",
    word: "quickly",
    phoneticHint: "Quick + ly",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "The cheetah ran quickly to catch up with its pack.",
    proofreadSentence: "He packed his backpack quickley before the bell rang.",
    misspelledWord: "quickley",
    ruleExplanation: "Add '-ly' directly to 'quick': quickly."
  },
  {
    id: "suf-08",
    word: "finally",
    phoneticHint: "Final + ly (two 'l's)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "After hours of waiting, the train finally pulled into the station.",
    proofreadSentence: "We finaly finished building our LEGO castle.",
    misspelledWord: "finaly",
    ruleExplanation: "'Final' ends in 'l', so adding '-ly' makes two 'l's: finally."
  },
  {
    id: "suf-09",
    word: "heavily",
    phoneticHint: "Change 'y' to 'i' before -ly (heavy -> heavily)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "It began raining heavily during the final soccer quarter.",
    proofreadSentence: "The winter rain fell heavyly against the windowpane.",
    misspelledWord: "heavyly",
    ruleExplanation: "Heavy ends in 'y', so change 'y' to 'i' before adding -ly: heavily."
  },
  {
    id: "suf-10",
    word: "easily",
    phoneticHint: "Change 'y' to 'i' before -ly (easy -> easily)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "Arjun easily solved the mental arithmetic challenge.",
    proofreadSentence: "She solved the crossword puzzle easyly in five minutes.",
    misspelledWord: "easyly",
    ruleExplanation: "Easy ends in 'y', so change 'y' to 'i' before adding -ly: easily."
  },
  {
    id: "suf-11",
    word: "lonely",
    phoneticHint: "Lone + ly (keep the 'e')",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "The lonely penguin stood on the icy shore.",
    proofreadSentence: "The little puppy felt lonly without its mother.",
    misspelledWord: "lonly",
    ruleExplanation: "Keep the 'e' from lone: lone-ly."
  },
  {
    id: "suf-12",
    word: "action",
    phoneticHint: "-tion sounds like 'shun'",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "The superhero movie was full of thrilling action.",
    proofreadSentence: "The referee whistled for immediate acshun on the field.",
    misspelledWord: "acshun",
    ruleExplanation: "The 'shun' sound at the end of root words is usually spelled -tion."
  },
  {
    id: "suf-13",
    word: "station",
    phoneticHint: "-tion at the end",
    category: "Suffixes & Endings",
    difficulty: 1,
    sentence: "We caught the express train from Central Station.",
    proofreadSentence: "The fire stasion doors opened for the emergency truck.",
    misspelledWord: "stasion",
    ruleExplanation: "'Station' uses the -tion ending."
  },
  {
    id: "suf-14",
    word: "question",
    phoneticHint: "Q-U-E-S-T-I-O-N (ends in -tion)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "Raise your hand if you have a question about the assignment.",
    proofreadSentence: "Can I ask a quick kwestion about our science project?",
    misspelledWord: "kwestion",
    ruleExplanation: "'Question' begins with 'qu-' and ends with -tion."
  },
  {
    id: "suf-15",
    word: "direction",
    phoneticHint: "Direct + ion (-tion)",
    category: "Suffixes & Endings",
    difficulty: 2,
    sentence: "The compass needle pointed in a northerly direction.",
    proofreadSentence: "Which direcshun should we head to reach the beach?",
    misspelledWord: "direcshun",
    ruleExplanation: "'Direction' ends in -tion."
  },
  {
    id: "suf-16",
    word: "celebration",
    phoneticHint: "C-E-L-E-B-R-A-T-I-O-N",
    category: "Suffixes & Endings",
    difficulty: 3,
    sentence: "We had a joyous celebration for the end of term.",
    proofreadSentence: "The school held a huge celebrasion after sports carnival.",
    misspelledWord: "celebrasion",
    ruleExplanation: "'Celebration' ends with -tion."
  },

  // --- Prefixes & Plurals ---
  {
    id: "pre-01",
    word: "disappear",
    phoneticHint: "Prefix 'dis-' + appear",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "The clouds will disappear once the sun rises higher.",
    proofreadSentence: "I watched the smoke dissapear into the blue sky.",
    misspelledWord: "dissapear",
    ruleExplanation: "Prefix 'dis-' + 'appear'. Only one 's'."
  },
  {
    id: "pre-02",
    word: "disagree",
    phoneticHint: "Prefix 'dis-' + agree",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "It is okay to disagree politely during a debate.",
    proofreadSentence: "The two brothers often dissagree on which game to play.",
    misspelledWord: "dissagree",
    ruleExplanation: "'Dis-' + 'agree' has only one 's'."
  },
  {
    id: "pre-03",
    word: "unhappy",
    phoneticHint: "Prefix 'un-' + happy",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "The baby was unhappy when she dropped her rattle.",
    proofreadSentence: "He looked very unhapy when his ice cream melted.",
    misspelledWord: "unhapy",
    ruleExplanation: "'Unhappy' retains the double 'p' from happy."
  },
  {
    id: "pre-04",
    word: "untie",
    phoneticHint: "Prefix 'un-' + tie",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "Please untie the tight knot on my shoelaces.",
    proofreadSentence: "Help me untye this tangled piece of string.",
    misspelledWord: "untye",
    ruleExplanation: "'Tie' is spelled t-i-e, so 'untie' is u-n-t-i-e."
  },
  {
    id: "pre-05",
    word: "reappear",
    phoneticHint: "Prefix 're-' + appear",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "The dolphin will reappear above the water to breathe.",
    proofreadSentence: "The shy possum did not reapear until twilight.",
    misspelledWord: "reapear",
    ruleExplanation: "'Reappear' keeps the double 'p' from 'appear'."
  },
  {
    id: "pre-06",
    word: "rewrite",
    phoneticHint: "Prefix 're-' + write",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "You may need to rewrite the sentence if it has mistakes.",
    proofreadSentence: "The teacher asked him to rerite his paragraph neatly.",
    misspelledWord: "rerite",
    ruleExplanation: "'Rewrite' keeps the silent 'w' from write: re-write."
  },
  {
    id: "pre-07",
    word: "babies",
    phoneticHint: "Change 'y' to 'ies' (baby -> babies)",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "The mother kangaroo carried two tiny joeys and babies.",
    proofreadSentence: "The twin babys slept soundly in their cribs.",
    misspelledWord: "babys",
    ruleExplanation: "Words ending in consonant + 'y' change to -ies: babies."
  },
  {
    id: "pre-08",
    word: "parties",
    phoneticHint: "Change 'y' to 'ies' (party -> parties)",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "We went to three birthday parties during the holidays.",
    proofreadSentence: "Both birthday partys were celebrated at the park.",
    misspelledWord: "partys",
    ruleExplanation: "Party becomes parties: change 'y' to -ies."
  },
  {
    id: "pre-09",
    word: "strawberries",
    phoneticHint: "Strawberry -> strawberries (-ies)",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "We picked delicious fresh strawberries at the berry farm.",
    proofreadSentence: "We topped the vanilla ice cream with ripe strawberrys.",
    misspelledWord: "strawberrys",
    ruleExplanation: "Plural of strawberry changes -y to -ies: strawberries."
  },
  {
    id: "pre-10",
    word: "leaves",
    phoneticHint: "Change 'f' to 'ves' (leaf -> leaves)",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "Dry brown leaves rustled in the cool breeze.",
    proofreadSentence: "The eucalyptus tree shed its green leafs in summer.",
    misspelledWord: "leafs",
    ruleExplanation: "Plural of leaf changes 'f' to 'ves': leaves."
  },
  {
    id: "pre-11",
    word: "wolves",
    phoneticHint: "Change 'f' to 'ves' (wolf -> wolves)",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "A pack of grey wolves howled under the full moon.",
    proofreadSentence: "The wild wolfs hunted together across the snowy plains.",
    misspelledWord: "wolfs",
    ruleExplanation: "Plural of wolf changes 'f' to 'ves': wolves."
  },
  {
    id: "pre-12",
    word: "knives",
    phoneticHint: "Change 'fe' to 'ves' (knife -> knives)",
    category: "Prefixes & Plurals",
    difficulty: 2,
    sentence: "Set the forks and knives neatly on the dining table.",
    proofreadSentence: "The chef sharpened all of his kitchen knifes.",
    misspelledWord: "knifes",
    ruleExplanation: "Plural of knife is knives: change 'fe' to 'ves'."
  },
  {
    id: "pre-13",
    word: "children",
    phoneticHint: "Irregular plural: child -> children",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "The children played happily in the adventure playground.",
    proofreadSentence: "All the childs lined up quietly before entering class.",
    misspelledWord: "childs",
    ruleExplanation: "The plural of child is 'children', never childs."
  },
  {
    id: "pre-14",
    word: "mice",
    phoneticHint: "Irregular plural: mouse -> mice",
    category: "Prefixes & Plurals",
    difficulty: 1,
    sentence: "Three little mice scurried behind the pantry cupboard.",
    proofreadSentence: "The cat spotted two small mouses in the garden shed.",
    misspelledWord: "mouses",
    ruleExplanation: "The plural of mouse is 'mice', never mouses."
  },

  // --- Homophones ---
  {
    id: "hom-01",
    word: "their",
    phoneticHint: "T-H-E-I-R (belongs to them: has 'heir')",
    category: "Homophones",
    difficulty: 2,
    sentence: "The students put their hats on before going outside.",
    proofreadSentence: "The birds built there nest high up in the oak tree.",
    misspelledWord: "there",
    ruleExplanation: "'Their' means belonging to them. 'There' is a place."
  },
  {
    id: "hom-02",
    word: "there",
    phoneticHint: "T-H-E-R-E (points to a place: has 'here')",
    category: "Homophones",
    difficulty: 1,
    sentence: "Put the school bags over there by the bench.",
    proofreadSentence: "Look over their, you can see a rainbow in the sky!",
    misspelledWord: "their",
    ruleExplanation: "'There' points to a place: 't-HERE'."
  },
  {
    id: "hom-03",
    word: "they're",
    phoneticHint: "Contraction for 'they are' (they're)",
    category: "Homophones",
    difficulty: 2,
    sentence: "They're going to the Sydney Opera House tomorrow.",
    proofreadSentence: "Their planning to visit the museum this afternoon.",
    misspelledWord: "Their",
    ruleExplanation: "'They're' is short for 'they are' with an apostrophe."
  },
  {
    id: "hom-04",
    word: "weather",
    phoneticHint: "W-E-A-T-H-E-R (rain, wind, sun: has 'eat')",
    category: "Homophones",
    difficulty: 2,
    sentence: "The weather forecast said it would be sunny all day.",
    proofreadSentence: "I checked the whether report to see if it would rain.",
    misspelledWord: "whether",
    ruleExplanation: "'Weather' is the sunshine and rain. 'Whether' is choosing between options."
  },
  {
    id: "hom-05",
    word: "whether",
    phoneticHint: "W-H-E-T-H-E-R (whether or not)",
    category: "Homophones",
    difficulty: 3,
    sentence: "I am not sure whether we should take the bus or walk.",
    proofreadSentence: "We could not decide weather to go to the pool or beach.",
    misspelledWord: "weather",
    ruleExplanation: "'Whether' starts with 'wh' and is used for choices."
  },
  {
    id: "hom-06",
    word: "through",
    phoneticHint: "T-H-R-O-U-G-H (walking through a door)",
    category: "Homophones",
    difficulty: 2,
    sentence: "We walked through the garden gates into the park.",
    proofreadSentence: "The train passed threw the long dark tunnel in the mountain.",
    misspelledWord: "threw",
    ruleExplanation: "'Through' is passing inside something. 'Threw' is past tense of throw."
  },
  {
    id: "hom-07",
    word: "threw",
    phoneticHint: "T-H-R-E-W (past tense of throw)",
    category: "Homophones",
    difficulty: 1,
    sentence: "The bowler threw the cricket ball towards the wickets.",
    proofreadSentence: "The boy through the red frisbee to his golden retriever.",
    misspelledWord: "through",
    ruleExplanation: "'Threw' is tossing a ball. 'Through' is going into a tunnel."
  },
  {
    id: "hom-08",
    word: "whole",
    phoneticHint: "W-H-O-L-E (the entire thing: silent 'w')",
    category: "Homophones",
    difficulty: 2,
    sentence: "Arjun read the whole storybook in one afternoon.",
    proofreadSentence: "He ate the hole sandwich in three big bites.",
    misspelledWord: "hole",
    ruleExplanation: "'Whole' (entire) starts with 'w'. 'Hole' is a gap in the ground."
  },
  {
    id: "hom-09",
    word: "peace",
    phoneticHint: "P-E-A-C-E (calm and quiet: opposite of war)",
    category: "Homophones",
    difficulty: 2,
    sentence: "The library was full of calm and peace.",
    proofreadSentence: "I just want some peace and piece while reading my book.",
    misspelledWord: "piece",
    ruleExplanation: "'Peace' means calm and quiet. 'Piece' is a slice of pie."
  },
  {
    id: "hom-10",
    word: "stair",
    phoneticHint: "S-T-A-I-R (steps to climb)",
    category: "Homophones",
    difficulty: 2,
    sentence: "Be careful when stepping down the bottom stair.",
    proofreadSentence: "Do not stare down at the floor, look at the top stare.",
    misspelledWord: "stare",
    ruleExplanation: "'Stair' is a step. 'Stare' is looking with wide eyes."
  },
  {
    id: "hom-11",
    word: "stare",
    phoneticHint: "S-T-A-R-E (to look intently)",
    category: "Homophones",
    difficulty: 2,
    sentence: "It is impolite to stare at people in public.",
    proofreadSentence: "Try not to stair at the magic trick while it happens.",
    misspelledWord: "stair",
    ruleExplanation: "'Stare' is looking intently. 'Stair' is a physical step."
  },

  // --- Australian & Nature / Everyday Words ---
  {
    id: "aus-01",
    word: "kangaroo",
    phoneticHint: "K-A-N-G-A-R-O-O (ends in -oo)",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "A mother kangaroo bounded across the grassy bushland.",
    proofreadSentence: "The kangarou carried her joey inside her warm pouch.",
    misspelledWord: "kangarou",
    ruleExplanation: "'Kangaroo' ends with double 'o': k-a-n-g-a-r-o-o."
  },
  {
    id: "aus-02",
    word: "koala",
    phoneticHint: "K-O-A-L-A (o before a)",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "The cute koala rested on a fork in the gum tree.",
    proofreadSentence: "The sleepy kawala was munching on fresh gum leaves.",
    misspelledWord: "kawala",
    ruleExplanation: "'Koala' is spelled k-o-a-l-a."
  },
  {
    id: "aus-03",
    word: "platypus",
    phoneticHint: "P-L-A-T-Y-P-U-S ('y' in the middle)",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "A shy platypus swam along the quiet riverbank.",
    proofreadSentence: "The platapus has a bill like a duck and webbed feet.",
    misspelledWord: "platapus",
    ruleExplanation: "'Platypus' has a 'y' after 't': plat-y-pus."
  },
  {
    id: "aus-04",
    word: "echidna",
    phoneticHint: "E-C-H-I-D-N-A ('ch' sounds like 'k')",
    category: "Australian & Nature",
    difficulty: 3,
    sentence: "The spiky echidna dug its sharp claws into the dirt.",
    proofreadSentence: "The spiny eckidna curled up into a tight ball.",
    misspelledWord: "eckidna",
    ruleExplanation: "'Echidna' uses 'ch' for the 'k' sound: e-ch-i-d-n-a."
  },
  {
    id: "aus-05",
    word: "wombat",
    phoneticHint: "W-O-M-B-A-T (single 't')",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "The chubby wombat burrowed deep beneath the red soil.",
    proofreadSentence: "The wild wombatt grazed on grass near our tent.",
    misspelledWord: "wombatt",
    ruleExplanation: "'Wombat' ends with a single 't'."
  },
  {
    id: "aus-06",
    word: "possum",
    phoneticHint: "Double 's' in pos-sum",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "A brushtail possum scampered along the tin roof.",
    proofreadSentence: "A little posum peered down from the eucalyptus branches.",
    misspelledWord: "posum",
    ruleExplanation: "'Possum' has double 's': pos-sum."
  },
  {
    id: "aus-07",
    word: "dolphin",
    phoneticHint: "D-O-L-P-H-I-N ('ph' makes the 'f' sound)",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "A friendly dolphin leaped through the ocean waves.",
    proofreadSentence: "We watched the gray dolfin jump alongside the boat.",
    misspelledWord: "dolfin",
    ruleExplanation: "'Dolphin' uses 'ph' for the 'f' sound."
  },
  {
    id: "aus-08",
    word: "lizard",
    phoneticHint: "L-I-Z-A-R-D (ends in -ard)",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "A blue-tongue lizard sunbaked on the warm garden rock.",
    proofreadSentence: "The tiny lizurd darted behind the flower pot.",
    misspelledWord: "lizurd",
    ruleExplanation: "'Lizard' ends with -ard."
  },
  {
    id: "aus-09",
    word: "magpie",
    phoneticHint: "M-A-G-P-I-E (mag + pie)",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "The black and white magpie sang a melodious morning song.",
    proofreadSentence: "A curious magpy pecked for worms on the green oval.",
    misspelledWord: "magpy",
    ruleExplanation: "'Magpie' ends with 'pie', like a meat pie."
  },
  {
    id: "aus-10",
    word: "cockatoo",
    phoneticHint: "C-O-C-K-A-T-O-O (ends in -oo)",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "The sulfur-crested cockatoo screeched loudly from the tree.",
    proofreadSentence: "A white cockato perched on the school fence post.",
    misspelledWord: "cockato",
    ruleExplanation: "'Cockatoo' ends with double 'o': c-o-c-k-a-t-o-o."
  },
  {
    id: "aus-11",
    word: "dinosaur",
    phoneticHint: "D-I-N-O-S-A-U-R (ends in -saur)",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "We learned about the giant herbivore dinosaur at school.",
    proofreadSentence: "The museum had a massive dinosor skeleton on display.",
    misspelledWord: "dinosor",
    ruleExplanation: "'Dinosaur' ends with -saur (Greek for reptile)."
  },
  {
    id: "aus-12",
    word: "fossil",
    phoneticHint: "Double 's' and ends in -il",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "The archaeologist discovered a rare shell fossil in the cliff.",
    proofreadSentence: "We found an ancient ammonite fosil embedded in the stone.",
    misspelledWord: "fosil",
    ruleExplanation: "'Fossil' has double 's' and ends in -il."
  },
  {
    id: "aus-13",
    word: "mountain",
    phoneticHint: "M-O-U-N-T-A-I-N (ends in -ain)",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "Snow capped the peak of Mount Kosciuszko mountain.",
    proofreadSentence: "The hikers climbed to the top of the steep mounten.",
    misspelledWord: "mounten",
    ruleExplanation: "'Mountain' ends with -ain: mount-ain."
  },
  {
    id: "aus-14",
    word: "valley",
    phoneticHint: "Double 'l' and ends in -ey",
    category: "Australian & Nature",
    difficulty: 2,
    sentence: "A winding freshwater river flowed through the green valley.",
    proofreadSentence: "The misty vally looked breathtaking at sunrise.",
    misspelledWord: "vally",
    ruleExplanation: "'Valley' ends in -ey: val-ley."
  },
  {
    id: "aus-15",
    word: "ocean",
    phoneticHint: "O-C-E-A-N ('c' sounds like 'sh')",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "Waves crashed gently on the shore of the vast ocean.",
    proofreadSentence: "Many colourful fish swim in the Pacific oshun.",
    misspelledWord: "oshun",
    ruleExplanation: "'Ocean' is spelled o-c-e-a-n."
  },
  {
    id: "aus-16",
    word: "forest",
    phoneticHint: "F-O-R-E-S-T (single 'r', ends in -est)",
    category: "Australian & Nature",
    difficulty: 1,
    sentence: "Tall gum trees filled the quiet eucalyptus forest.",
    proofreadSentence: "We went on a bushwalk through the dense forrest.",
    misspelledWord: "forrest",
    ruleExplanation: "'Forest' has only one 'r': for-est."
  },

  // --- Everyday School & Compound Words ---
  {
    id: "sch-01",
    word: "pencil",
    phoneticHint: "P-E-N-C-I-L (soft 'c' sounds like 's')",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Sharpen your lead pencil before doing the spelling test.",
    proofreadSentence: "I dropped my yellow pensil on the classroom floor.",
    misspelledWord: "pensil",
    ruleExplanation: "'Pencil' uses a soft 'c': p-e-n-c-i-l."
  },
  {
    id: "sch-02",
    word: "scissors",
    phoneticHint: "S-C-I-S-S-O-R-S (starts with 'sc', double 's')",
    category: "High-Frequency Essentials",
    difficulty: 3,
    sentence: "Use round-nosed scissors to cut out the cardboard shapes.",
    proofreadSentence: "Be careful when carrying the sissors across the room.",
    misspelledWord: "sissors",
    ruleExplanation: "'Scissors' starts with 'sc' and has double 's': s-c-i-s-s-o-r-s."
  },
  {
    id: "sch-03",
    word: "library",
    phoneticHint: "L-I-B-R-A-R-Y (don't miss the first 'r': lib-ra-ry)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "We visit the school library every Wednesday morning.",
    proofreadSentence: "I borrowed two fun chapter books from the libary.",
    misspelledWord: "libary",
    ruleExplanation: "'Library' has two 'r's: lib-ra-ry."
  },
  {
    id: "sch-04",
    word: "playground",
    phoneticHint: "Compound word: play + ground",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Arjun played handball on the school playground.",
    proofreadSentence: "The children raced out to the playgrownd at recess.",
    misspelledWord: "playgrownd",
    ruleExplanation: "'Playground' is play + ground (-ound)."
  },
  {
    id: "sch-05",
    word: "backpack",
    phoneticHint: "Compound word: back + pack",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Zip up your backpack so your homework does not fall out.",
    proofreadSentence: "He slung his heavy bakpack over his right shoulder.",
    misspelledWord: "bakpack",
    ruleExplanation: "'Backpack' has 'ck' in both syllables: back-pack."
  },
  {
    id: "sch-06",
    word: "classroom",
    phoneticHint: "Compound word: class + room",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "We walked quietly into our bright classroom.",
    proofreadSentence: "Our clasroom has colourful posters on every wall.",
    misspelledWord: "clasroom",
    ruleExplanation: "'Classroom' keeps the double 's' from class: class-room."
  },
  {
    id: "sch-07",
    word: "computer",
    phoneticHint: "C-O-M-P-U-T-E-R (com-pu-ter)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "We practiced coding on the tablet and computer.",
    proofreadSentence: "The screen on the school computor flickered on.",
    misspelledWord: "computor",
    ruleExplanation: "'Computer' ends in -er: com-pu-ter."
  },
  {
    id: "sch-08",
    word: "exercise",
    phoneticHint: "E-X-E-R-C-I-S-E ('c' then 's')",
    category: "High-Frequency Essentials",
    difficulty: 3,
    sentence: "Daily physical exercise helps keep our bodies fit and strong.",
    proofreadSentence: "We did ten minutes of morning excercise in the hall.",
    misspelledWord: "excercise",
    ruleExplanation: "'Exercise' is e-x-e-r-c-i-s-e (no 'c' after 'x')."
  },
  {
    id: "sch-09",
    word: "favourite",
    phoneticHint: "F-A-V-O-U-R-I-T-E (Australian spelling with -our-)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Spelling and art are my favourite school subjects.",
    proofreadSentence: "What is your favrite ice cream flavor?",
    misspelledWord: "favrite",
    ruleExplanation: "'Favourite' in Australia has 'ou': fav-our-ite."
  },
  {
    id: "sch-10",
    word: "colour",
    phoneticHint: "C-O-L-O-U-R (Australian spelling with -our)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "My favourite colour is bright royal blue.",
    proofreadSentence: "The artist mixed blue and yellow to make the coler green.",
    misspelledWord: "coler",
    ruleExplanation: "Australian spelling is 'colour' with -our."
  },

  // --- Common Challenging NAPLAN Year 3 Words ---
  {
    id: "nap-01",
    word: "special",
    phoneticHint: "S-P-E-C-I-A-L ('cia' sounds like 'sha')",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Today is a very special day because it is Arjun's birthday.",
    proofreadSentence: "We baked a speshal cake to celebrate our victory.",
    misspelledWord: "speshal",
    ruleExplanation: "'Special' uses 'cia' for the 'sh' sound: spe-cial."
  },
  {
    id: "nap-02",
    word: "probably",
    phoneticHint: "P-R-O-B-A-B-L-Y (prob-a-bly)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "It will probably rain later this afternoon, so take an umbrella.",
    proofreadSentence: "We will probly go to the beach if the weather is warm.",
    misspelledWord: "probly",
    ruleExplanation: "'Probably' has three syllables: prob-a-bly."
  },
  {
    id: "nap-03",
    word: "centre",
    phoneticHint: "C-E-N-T-R-E (Australian spelling ends in -re)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "We met our friends at the shopping centre entrance.",
    proofreadSentence: "Stand right in the middle center of the soccer pitch.",
    misspelledWord: "center",
    ruleExplanation: "In Australia, we spell it 'centre' with -re at the end."
  },
  {
    id: "nap-04",
    word: "theatre",
    phoneticHint: "T-H-E-A-T-R-E (ends in -re in Australia)",
    category: "High-Frequency Essentials",
    difficulty: 3,
    sentence: "We went to the theatre to watch an exciting school play.",
    proofreadSentence: "The actors took a bow on the stage at the movie theater.",
    misspelledWord: "theater",
    ruleExplanation: "In Australia, we spell 'theatre' with -re."
  },
  {
    id: "nap-05",
    word: "quiet",
    phoneticHint: "Q-U-I-E-T (silent: keep quiet)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Please remain quiet while the teacher reads the chapter.",
    proofreadSentence: "The students were very quite during the silent reading time.",
    misspelledWord: "quite",
    ruleExplanation: "'Quiet' (silent) ends in -et. 'Quite' (very) ends in -te."
  },
  {
    id: "nap-06",
    word: "quite",
    phoneticHint: "Q-U-I-T-E (quite sure / completely)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "I am quite confident that I know this spelling word.",
    proofreadSentence: "The maths test was quiet easy once I understood the rules.",
    misspelledWord: "quiet",
    ruleExplanation: "'Quite' means fairly or very. 'Quiet' means making no noise."
  },
  {
    id: "nap-07",
    word: "decide",
    phoneticHint: "D-E-C-I-D-E (soft 'c' sounds like 's')",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "It took a while to decide which book to read next.",
    proofreadSentence: "I cannot deside whether to pick chocolate or vanilla.",
    misspelledWord: "deside",
    ruleExplanation: "'Decide' has a 'c' after 'e': de-cide."
  },
  {
    id: "nap-08",
    word: "decided",
    phoneticHint: "Decide + d",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "We decided to walk home through the botanic gardens.",
    proofreadSentence: "The family desided to adopt a rescued puppy from the shelter.",
    misspelledWord: "desided",
    ruleExplanation: "'Decided' uses 'c' for the 's' sound: de-ci-ded."
  },
  {
    id: "nap-09",
    word: "tomorrow",
    phoneticHint: "One 'm', double 'r': to-mor-row",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Tomorrow will be Friday, the best day of the week!",
    proofreadSentence: "Our school sports carnival is scheduled for tommorrow.",
    misspelledWord: "tommorrow",
    ruleExplanation: "'Tomorrow' has only one 'm' and double 'r': to-mor-row."
  },
  {
    id: "nap-10",
    word: "yesterday",
    phoneticHint: "Y-E-S-T-E-R-D-A-Y (yes + ter + day)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Yesterday it rained heavily all morning.",
    proofreadSentence: "We went swimming at the aquatic center yesterdey.",
    misspelledWord: "yesterdey",
    ruleExplanation: "'Yesterday' ends in -day: yes-ter-day."
  },
  {
    id: "nap-11",
    word: "minute",
    phoneticHint: "M-I-N-U-T-E (min-ute)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Wait one minute while I tie my shoelaces.",
    proofreadSentence: "There are sixty seconds in one singel minit.",
    misspelledWord: "minit",
    ruleExplanation: "'Minute' is spelled m-i-n-u-t-e."
  },
  {
    id: "nap-12",
    word: "second",
    phoneticHint: "S-E-C-O-N-D (ends in -ond)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Arjun crossed the finish line in second place.",
    proofreadSentence: "Wait just one secund while I grab my sunhat.",
    misspelledWord: "secund",
    ruleExplanation: "'Second' ends in -ond."
  },
  {
    id: "nap-13",
    word: "hour",
    phoneticHint: "Silent 'h' at the start (h-o-u-r)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "The movie lasted for two full hours.",
    proofreadSentence: "We waited for half an our at the dentist clinic.",
    misspelledWord: "our",
    ruleExplanation: "An 'hour' of time starts with a silent 'h'. 'Our' is belonging to us."
  },
  {
    id: "nap-14",
    word: "circle",
    phoneticHint: "Soft 'c' at start, hard 'c' before -le",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "Draw a neat circle around the correct multiple choice answer.",
    proofreadSentence: "The children sat in a big surcle on the soft carpet.",
    misspelledWord: "surcle",
    ruleExplanation: "'Circle' starts with 'ci' and ends with -cle."
  },
  {
    id: "nap-15",
    word: "square",
    phoneticHint: "S-Q-U-A-R-E (starts with 'squ')",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "A square has four equal sides and four right angles.",
    proofreadSentence: "Cut the coloured paper into a perfect skware.",
    misspelledWord: "skware",
    ruleExplanation: "'Square' begins with 'squ-': s-q-u-a-r-e."
  },
  {
    id: "nap-16",
    word: "triangle",
    phoneticHint: "Tri + angle (three angles)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "A triangle is a geometric shape with three straight sides.",
    proofreadSentence: "The musical insterment made a ringing sound when the tryangle was struck.",
    misspelledWord: "tryangle",
    ruleExplanation: "'Triangle' starts with 'tri-' (meaning three)."
  },
  {
    id: "nap-17",
    word: "bridge",
    phoneticHint: "B-R-I-D-G-E (-dge makes 'j' sound after short vowel)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Cars drove smoothly across the Sydney Harbour Bridge.",
    proofreadSentence: "The ducks swam beneath the wooden foot brij in the park.",
    misspelledWord: "brij",
    ruleExplanation: "After short 'i', use -dge: b-r-i-d-g-e."
  },
  {
    id: "nap-18",
    word: "badge",
    phoneticHint: "B-A-D-G-E (-dge)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Arjun pinned his shiny school captain badge to his shirt.",
    proofreadSentence: "He received a gold merit baje for great reading.",
    misspelledWord: "baje",
    ruleExplanation: "Short 'a' followed by -dge: b-a-d-g-e."
  },
  {
    id: "nap-19",
    word: "edge",
    phoneticHint: "E-D-G-E (-dge)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Do not stand too close to the edge of the pool.",
    proofreadSentence: "Carefully fold along the straight ej of the paper.",
    misspelledWord: "ej",
    ruleExplanation: "'Edge' is spelled e-d-g-e."
  },
  {
    id: "nap-20",
    word: "hedge",
    phoneticHint: "H-E-D-G-E (-dge)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Dad trimmed the tall green hedge along our driveway.",
    proofreadSentence: "Small sparrows nested in the bushy green hej.",
    misspelledWord: "hej",
    ruleExplanation: "'Hedge' is spelled h-e-d-g-e."
  },
  {
    id: "nap-21",
    word: "fudge",
    phoneticHint: "F-U-D-G-E (-dge)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "We tasted delicious homemade chocolate fudge at the market.",
    proofreadSentence: "Grandma made sweet creamy fuj for afternoon tea.",
    misspelledWord: "fuj",
    ruleExplanation: "'Fudge' ends in -dge."
  },
  {
    id: "nap-22",
    word: "dodge",
    phoneticHint: "D-O-D-G-E (-dge)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Arjun was quick to dodge the flying foam ball in PE class.",
    proofreadSentence: "The player managed to doje the tackle and score a goal.",
    misspelledWord: "doje",
    ruleExplanation: "'Dodge' ends in -dge: d-o-d-g-e."
  },
  {
    id: "nap-23",
    word: "catch",
    phoneticHint: "C-A-T-C-H (-tch after short vowel)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Run fast and catch the tennis ball in the air.",
    proofreadSentence: "Arjun tried to cach the frisbee before it touched the grass.",
    misspelledWord: "cach",
    ruleExplanation: "After a short vowel 'a', use -tch: c-a-t-c-h."
  },
  {
    id: "nap-24",
    word: "match",
    phoneticHint: "M-A-T-C-H (-tch)",
    category: "High-Frequency Essentials",
    difficulty: 1,
    sentence: "Our soccer match begins at ten o'clock on Saturday.",
    proofreadSentence: "Draw a line to mach each word with its meaning.",
    misspelledWord: "mach",
    ruleExplanation: "Short 'a' sound takes -tch: m-a-t-c-h."
  },
  {
    id: "nap-25",
    word: "scratch",
    phoneticHint: "S-C-R-A-T-C-H (-tch)",
    category: "High-Frequency Essentials",
    difficulty: 2,
    sentence: "The playful kitten gave my sleeve a gentle scratch.",
    proofreadSentence: "The bramble thorns made a small skrach on his arm.",
    misspelledWord: "skrach",
    ruleExplanation: "'Scratch' starts with 'scr-' and ends with -tch."
  }
];

export const TOTAL_WORDS_COUNT = YEAR_3_NAPLAN_WORDS.length;
