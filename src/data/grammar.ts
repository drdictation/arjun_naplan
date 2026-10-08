export type GrammarCategory =
  | "Punctuation & Capitalisation"
  | "Parts of Speech"
  | "Tense & Verb Agreement"
  | "Sentence Structure & Conjunctions"
  | "Apostrophes & Contractions"
  | "Pronouns & Modifiers";

export interface GrammarQuestion {
  id: string;
  category: GrammarCategory;
  difficulty: 1 | 2 | 3; // 1: Core Grade 3, 2: Proficient, 3: Top 1% Band 6 Exceeding
  prompt: string;
  sentenceContext?: string; // Optional sentence with highlighted or missing element
  options: string[];
  correctOptionIndex: number;
  explanation: string; // Immediate child-friendly learning tip
  ruleTag: string; // e.g. "Proper Nouns", "Possessive Apostrophe", "Subordinating Conjunction"
}

export const YEAR_3_GRAMMAR_PRACTICE: GrammarQuestion[] = [
  // --- Punctuation & Capitalisation ---
  {
    id: "g-punc-01",
    category: "Punctuation & Capitalisation",
    difficulty: 1,
    prompt: "Which sentence uses capital letters correctly?",
    options: [
      "Last sunday, my brother went to sydney harbour.",
      "Last Sunday, my brother went to Sydney Harbour.",
      "Last Sunday, my Brother went to sydney Harbour.",
      "last Sunday, my brother went to Sydney harbour."
    ],
    correctOptionIndex: 1,
    explanation: "Days of the week (Sunday) and specific landmarks (Sydney Harbour) are proper nouns and need capital letters.",
    ruleTag: "Proper Nouns"
  },
  {
    id: "g-punc-02",
    category: "Punctuation & Capitalisation",
    difficulty: 2,
    prompt: "Which sentence needs a question mark at the end?",
    options: [
      "I wonder if the koala is sleeping in the eucalyptus tree",
      "Can we go to the museum after school today",
      "Please pass me the red pencil from your desk",
      "Look at that gigantic spider on the fence"
    ],
    correctOptionIndex: 1,
    explanation: "'Can we go...?' is an asking sentence (direct question). It must end with a question mark.",
    ruleTag: "Question Marks"
  },
  {
    id: "g-punc-03",
    category: "Punctuation & Capitalisation",
    difficulty: 2,
    prompt: "Where should the comma be placed in this sentence?",
    sentenceContext: "Before we left the house Mum reminded us to grab our hats.",
    options: [
      "After 'Before'",
      "After 'house'",
      "After 'reminded'",
      "After 'hats'"
    ],
    correctOptionIndex: 1,
    explanation: "'Before we left the house' is an introductory dependent clause. A comma separates it from the main clause.",
    ruleTag: "Introductory Commas"
  },
  {
    id: "g-punc-04",
    category: "Punctuation & Capitalisation",
    difficulty: 3,
    prompt: "Which sentence uses speech marks (quotation marks) correctly?",
    options: [
      '"Don\'t forget your sunscreen," shouted Coach Davies.',
      'Don\'t forget your sunscreen, "shouted Coach Davies."',
      '"Don\'t forget your sunscreen" shouted, Coach Davies.',
      '"Don\'t forget your sunscreen", shouted Coach Davies.'
    ],
    correctOptionIndex: 0,
    explanation: "In direct speech, the punctuation mark (comma or exclamation mark) stays INSIDE the closing quotation marks.",
    ruleTag: "Speech Marks"
  },
  {
    id: "g-punc-05",
    category: "Punctuation & Capitalisation",
    difficulty: 2,
    prompt: "Which sentence correctly uses commas in a list?",
    options: [
      "For lunch Arjun packed an apple, a sandwich, juice, and a cookie.",
      "For lunch Arjun packed an apple a sandwich, juice and, a cookie.",
      "For lunch, Arjun packed, an apple, a sandwich, and juice.",
      "For lunch Arjun packed an apple, a sandwich juice and a cookie."
    ],
    correctOptionIndex: 0,
    explanation: "Commas separate items in a list clearly so they don't blend together.",
    ruleTag: "Commas in Lists"
  },

  // --- Apostrophes & Contractions ---
  {
    id: "g-apos-01",
    category: "Apostrophes & Contractions",
    difficulty: 2,
    prompt: "Choose the correct contraction for 'does not'.",
    options: ["dosent", "does'nt", "doesn't", "dont"],
    correctOptionIndex: 2,
    explanation: "The apostrophe replaces the missing letter 'o' in 'not': does + not = doesn't.",
    ruleTag: "Contractions"
  },
  {
    id: "g-apos-02",
    category: "Apostrophes & Contractions",
    difficulty: 3,
    prompt: "Which sentence uses the possessive apostrophe correctly for ONE puppy?",
    options: [
      "The puppys tail was wagging excitedly.",
      "The puppy's tail was wagging excitedly.",
      "The puppies tail was wagging excitedly.",
      "The puppys' tail was wagging excitedly."
    ],
    correctOptionIndex: 1,
    explanation: "For a singular noun owning something, add 's: puppy -> puppy's tail.",
    ruleTag: "Singular Possession"
  },
  {
    id: "g-apos-03",
    category: "Apostrophes & Contractions",
    difficulty: 3,
    prompt: "Which word correctly completes this sentence?",
    sentenceContext: "The kangaroo carried _______ joey safely in its pouch.",
    options: ["it's", "its", "its'", "it"],
    correctOptionIndex: 1,
    explanation: "'Its' without an apostrophe shows possession (belonging to it). 'It's' means 'it is'.",
    ruleTag: "Its vs It's"
  },
  {
    id: "g-apos-04",
    category: "Apostrophes & Contractions",
    difficulty: 3,
    prompt: "Which sentence shows plural possession (belonging to MULTIPLE girls)?",
    options:
      [
        "The girls' soccer uniforms were washed and ready.",
        "The girl's soccer uniforms were washed and ready.",
        "The girls soccer uniforms were washed and ready.",
        "The girle's soccer uniforms were washed and ready."
      ],
    correctOptionIndex: 0,
    explanation: "For regular plural nouns ending in 's' (girls), place the apostrophe after the 's': girls'.",
    ruleTag: "Plural Possession"
  },

  // --- Parts of Speech ---
  {
    id: "g-pos-01",
    category: "Parts of Speech",
    difficulty: 1,
    prompt: "Which word in this sentence is an ADJECTIVE (describing word)?",
    sentenceContext: "The tiny green lizard darted across the warm sandstone rocks.",
    options: ["lizard", "darted", "tiny", "across"],
    correctOptionIndex: 2,
    explanation: "'Tiny' describes the lizard, so it is an adjective.",
    ruleTag: "Adjectives"
  },
  {
    id: "g-pos-02",
    category: "Parts of Speech",
    difficulty: 2,
    prompt: "Which word in this sentence is an ADVERB (tells how, when, or where)?",
    sentenceContext: "Arjun solved the tricky puzzle quickly during lunch.",
    options: ["solved", "tricky", "quickly", "lunch"],
    correctOptionIndex: 2,
    explanation: "'Quickly' describes HOW Arjun solved the puzzle (modifying the verb solved).",
    ruleTag: "Adverbs"
  },
  {
    id: "g-pos-03",
    category: "Parts of Speech",
    difficulty: 1,
    prompt: "Which word in this sentence is a PROPER NOUN?",
    sentenceContext: "In December, our family will camp along the Murray River.",
    options: ["family", "camp", "Murray River", "along"],
    correctOptionIndex: 2,
    explanation: "'Murray River' is the official name of a specific river, making it a proper noun.",
    ruleTag: "Proper Nouns"
  },
  {
    id: "g-pos-04",
    category: "Parts of Speech",
    difficulty: 2,
    prompt: "Which word in this sentence is a PREPOSITION (shows position/location)?",
    sentenceContext: "The adventurous cat squeezed under the wooden fence.",
    options: ["adventurous", "squeezed", "under", "wooden"],
    correctOptionIndex: 2,
    explanation: "'Under' indicates the spatial position relative to the fence.",
    ruleTag: "Prepositions"
  },
  {
    id: "g-pos-05",
    category: "Parts of Speech",
    difficulty: 2,
    prompt: "Which word is a NOUN in this sentence?",
    sentenceContext: "A flock of bright parrots flew over the trees.",
    options: ["bright", "flock", "flew", "over"],
    correctOptionIndex: 1,
    explanation: "'Flock' is a collective noun representing a group of birds.",
    ruleTag: "Collective Nouns"
  },

  // --- Tense & Verb Agreement ---
  {
    id: "g-verb-01",
    category: "Tense & Verb Agreement",
    difficulty: 2,
    prompt: "Which verb correctly completes this sentence?",
    sentenceContext: "Yesterday, the children _______ their bikes through the muddy puddle.",
    options: ["ride", "rided", "rode", "riding"],
    correctOptionIndex: 2,
    explanation: "'Rode' is the irregular past tense of 'ride'. 'Rided' is not a real English word.",
    ruleTag: "Irregular Past Tense"
  },
  {
    id: "g-verb-02",
    category: "Tense & Verb Agreement",
    difficulty: 2,
    prompt: "Select the sentence with correct subject-verb agreement:",
    options: [
      "The flock of cockatoos were noisy this morning.",
      "The flock of cockatoos was noisy this morning.",
      "The flock of cockatoos are noisy yesterday.",
      "The flock of cockatoos be noisy this morning."
    ],
    correctOptionIndex: 1,
    explanation: "The subject is 'The flock' (singular collective noun), so it takes the singular verb 'was'.",
    ruleTag: "Subject-Verb Agreement"
  },
  {
    id: "g-verb-03",
    category: "Tense & Verb Agreement",
    difficulty: 3,
    prompt: "Which sentence has consistent past tense throughout?",
    options: [
      "Liam opened the squeaky door and peeks inside the dark attic.",
      "Liam opens the squeaky door and peeked inside the dark attic.",
      "Liam opened the squeaky door and peeked inside the dark attic.",
      "Liam open the squeaky door and peeking inside the dark attic."
    ],
    correctOptionIndex: 2,
    explanation: "Both actions happened in the past, so both verbs must be in past tense: 'opened' and 'peeked'.",
    ruleTag: "Tense Consistency"
  },
  {
    id: "g-verb-04",
    category: "Tense & Verb Agreement",
    difficulty: 2,
    prompt: "Choose the correct irregular past tense verb:",
    sentenceContext: "Samantha _______ a wonderful story about a baby dragon.",
    options: ["writed", "wrote", "written", "writing"],
    correctOptionIndex: 1,
    explanation: "'Wrote' is the simple past tense of 'write'.",
    ruleTag: "Irregular Past Tense"
  },

  // --- Sentence Structure & Conjunctions ---
  {
    id: "g-sent-01",
    category: "Sentence Structure & Conjunctions",
    difficulty: 2,
    prompt: "Which conjunction best combines these two sentences?",
    sentenceContext: "We wanted to play cricket outdoors. It started pouring with rain.",
    options: ["so", "but", "because", "and"],
    correctOptionIndex: 1,
    explanation: "'But' shows contrast between wanting to play and the rain stopping it.",
    ruleTag: "Coordinating Conjunctions"
  },
  {
    id: "g-sent-02",
    category: "Sentence Structure & Conjunctions",
    difficulty: 3,
    prompt: "Which group of words is a COMPLETE sentence (not a fragment)?",
    options: [
      "Running down the steep grassy hill at top speed.",
      "Because the thunder shook the entire house.",
      "The curious dolphin leaped gracefully over the waves.",
      "When the bell rang for recess."
    ],
    correctOptionIndex: 2,
    explanation: "A complete sentence requires both a subject ('The curious dolphin') and a predicate verb ('leaped'). The others are fragments.",
    ruleTag: "Complete Sentences vs Fragments"
  },
  {
    id: "g-sent-03",
    category: "Sentence Structure & Conjunctions",
    difficulty: 3,
    prompt: "Which sentence is a RUN-ON sentence that needs to be fixed?",
    options: [
      "The bell rang, so the students packed their bags.",
      "The bell rang the students packed their bags quickly.",
      "When the bell rang, the students packed their bags.",
      "The bell rang. The students packed their bags."
    ],
    correctOptionIndex: 1,
    explanation: "Option 2 joins two independent clauses without any conjunction or punctuation (a run-on sentence).",
    ruleTag: "Run-On Sentences"
  },
  {
    id: "g-sent-04",
    category: "Sentence Structure & Conjunctions",
    difficulty: 2,
    prompt: "Choose the best subordinating conjunction to complete the sentence:",
    sentenceContext: "We put our umbrellas up _______ the raindrops began to fall.",
    options: ["although", "unless", "as soon as", "or"],
    correctOptionIndex: 2,
    explanation: "'As soon as' connects the timing of putting up umbrellas to when rain starts.",
    ruleTag: "Subordinating Conjunctions"
  },

  // --- Pronouns & Modifiers (Top 1% Traps) ---
  {
    id: "g-pro-01",
    category: "Pronouns & Modifiers",
    difficulty: 3,
    prompt: "Which pronoun correctly completes this sentence?",
    sentenceContext: "Dad gave new soccer boots to Maya and _______.",
    options: ["I", "me", "myself", "we"],
    correctOptionIndex: 1,
    explanation: "Tip: Remove 'Maya and' to test it: 'Dad gave new boots to me' (object pronoun), not 'to I'.",
    ruleTag: "Subject vs Object Pronouns"
  },
  {
    id: "g-pro-02",
    category: "Pronouns & Modifiers",
    difficulty: 2,
    prompt: "Which sentence uses the correct comparative adjective?",
    options: [
      "Kangaroo Island is more bigger than Rottnest Island.",
      "Kangaroo Island is bigger than Rottnest Island.",
      "Kangaroo Island is biggest than Rottnest Island.",
      "Kangaroo Island is more big than Rottnest Island."
    ],
    correctOptionIndex: 1,
    explanation: "Short adjectives add '-er' (bigger). Never double-up with 'more bigger'.",
    ruleTag: "Comparative Adjectives"
  },
  {
    id: "g-pro-03",
    category: "Pronouns & Modifiers",
    difficulty: 3,
    prompt: "Which sentence uses 'there', 'their', or 'they're' correctly?",
    options: [
      "The students left they're hats on the oval.",
      "Their going to Melbourne for the school holidays.",
      "The students left their hats over there.",
      "They're bags were placed under the shelter."
    ],
    correctOptionIndex: 2,
    explanation: "'Their' = belonging to them; 'there' = location; 'they're' = they are. Option 3 uses both correctly!",
    ruleTag: "There / Their / They're"
  },
  {
    id: "g-pro-04",
    category: "Pronouns & Modifiers",
    difficulty: 3,
    prompt: "Which pronoun correctly completes the sentence?",
    sentenceContext: "Neither of the boys forgot _______ lunchbox today.",
    options: ["their", "his", "they're", "its"],
    correctOptionIndex: 1,
    explanation: "'Neither' is singular, so the formal grammatical pronoun agreeing with 'boy' is 'his' (Band 6 excellence).",
    ruleTag: "Pronoun Agreement"
  }
];

export const TOTAL_GRAMMAR_COUNT = YEAR_3_GRAMMAR_PRACTICE.length;
