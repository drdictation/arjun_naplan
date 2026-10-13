export type ReadingGenre = "Narrative" | "Informational" | "Persuasive" | "Poem";

export type CognitiveSkill =
  | "Direct Retrieval"
  | "Inference"
  | "Vocabulary in Context"
  | "Author Craft"
  | "Main Idea";

export interface ParagraphBlock {
  id: number;
  text: string;
}

export interface ReadingQuestion {
  id: string;
  passageId: string;
  cognitiveSkill: CognitiveSkill;
  paragraphRef?: number; // 1-indexed paragraph number
  targetSentenceRef?: string;
  evidenceQuote: string; // Exact snippet from the text to highlight
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string; // Strategic feedback for mastery
}

export interface ReadingPassage {
  id: string;
  title: string;
  genre: ReadingGenre;
  subtitle: string;
  estimatedMinutes: number;
  introduction?: string;
  paragraphs: ParagraphBlock[];
  questions: ReadingQuestion[];
}

export const YEAR_3_READING_PASSAGES: ReadingPassage[] = [
  // =========================================================================
  // PASSAGE 1: NARRATIVE
  // =========================================================================
  {
    id: "passage-narrative-01",
    title: "The Secret of the Gully",
    genre: "Narrative",
    subtitle: "A discovery hidden along the rain-soaked creek bed",
    estimatedMinutes: 4,
    introduction: "Read the story below. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The afternoon storm had finally rolled away over the Blue Mountains, leaving the gum trees dripping with golden drops of rain. Down in the hollow, Stony Creek was roaring like an angry dragon. Liam pulled on his yellow rubber boots and sprinted down the slippery lawn, followed closely by Rusty, his bounding golden retriever."
      },
      {
        id: 2,
        text: "At the creek bank, the red clay had collapsed into the rushing water. Liam crouched beside an exposed tangle of tree roots. Suddenly, a sharp silver glint caught his eye through the damp ferns. Something metallic was wedged tightly beneath a shelf of wet sandstone."
      },
      {
        id: 3,
        text: "Rusty let out an eager whine and nudged forward, his wet nose twitching at the clay. 'Hold on, boy,' whispered Liam, firmly catching the dog's collar. He didn't want Rusty plunging into the churning current or disturbing whatever lay buried in the bank."
      },
      {
        id: 4,
        text: "Parting the tea-tree branches like a thick green curtain, Liam reached his arm into the shadowy crevice. His fingers grazed cold, rough metal. Working it gently back and forth so as not to snap the delicate object, he hauled it into the sunlight."
      },
      {
        id: 5,
        text: "It was an old brass whistle, shaped like a miniature steam locomotive, coated in decades of river silt. Liam wiped the mud away with his thumb. Underneath, faint letters were stamped: 'Katoomba Railway - 1923'. Liam's chest swelled with excitement. He had not just found an old trinket; he was holding a century of mountain history in his palm."
      }
    ],
    questions: [
      {
        id: "rq-nar-01",
        passageId: "passage-narrative-01",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "Stony Creek was roaring like an angry dragon.",
        prompt: "According to paragraph 1, what made Stony Creek roar like an angry dragon?",
        options: [
          "A dam bursting upstream",
          "The fierce afternoon rainstorm that had rolled over the mountains",
          "Rusty jumping into the swirling water",
          "A passing freight locomotive"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 1 explains the afternoon storm had just rolled away, causing the creek to roar and swell with rain."
      },
      {
        id: "rq-nar-02",
        passageId: "passage-narrative-01",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "Suddenly, a sharp silver glint caught his eye through the damp ferns.",
        prompt: "In paragraph 2, what does the word 'glint' mean?",
        options: [
          "A loud clanging noise",
          "A brief flash or sparkle of light",
          "A sticky patch of red clay",
          "A sharp edge that cuts"
        ],
        correctOptionIndex: 1,
        explanation: "A 'glint' is a quick flash of reflected light, like sunshine gleaming off wet metal."
      },
      {
        id: "rq-nar-03",
        passageId: "passage-narrative-01",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "He didn't want Rusty plunging into the churning current or disturbing whatever lay buried in the bank.",
        prompt: "Why did Liam grab Rusty's collar firmly in paragraph 3?",
        options: [
          "Rusty was barking at a snake in the tea-tree bushes",
          "Liam wanted to keep Rusty safe from the churning current and protect the find",
          "Rusty was running back toward the house",
          "Liam was angry with Rusty for splashing mud on his boots"
        ],
        correctOptionIndex: 1,
        explanation: "Liam held Rusty's collar because the creek was raging dangerously and he didn't want the dog falling in or spoiling the discovery."
      },
      {
        id: "rq-nar-04",
        passageId: "passage-narrative-01",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Parting the tea-tree branches like a thick green curtain",
        prompt: "Why does the author describe the tea-tree branches as 'like a thick green curtain'?",
        options: [
          "To show that someone had hung real curtains on the trees",
          "To show that the dense leaves concealed what was hidden behind them",
          "To explain that the creek was inside a theater",
          "To suggest that the branches were soft and artificial"
        ],
        correctOptionIndex: 1,
        explanation: "This simile compares the dense foliage to a curtain that conceals a secret stage until Liam pulls it aside."
      },
      {
        id: "rq-nar-05",
        passageId: "passage-narrative-01",
        cognitiveSkill: "Main Idea",
        paragraphRef: 5,
        evidenceQuote: "He had not just found an old trinket; he was holding a century of mountain history in his palm.",
        prompt: "At the end of the story, why does Liam feel his chest swell with excitement?",
        options: [
          "He realized he had uncovered an authentic historical railway relic from 1923",
          "He planned to sell the whistle for a huge sum of money",
          "He won a race against Rusty down the hill",
          "He could hear the steam train coming down the tracks"
        ],
        correctOptionIndex: 0,
        explanation: "Liam feels thrilled because the 1923 stamp shows he uncovered a real piece of mountain history, not just rubbish."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 2: INFORMATIONAL
  // =========================================================================
  {
    id: "passage-info-01",
    title: "The Greater Bilby: Desert Architect",
    genre: "Informational",
    subtitle: "How a rare marsupial transforms the arid Australian outback",
    estimatedMinutes: 4,
    introduction: "Read the informational report. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Across the shimmering red plains of central Australia, temperatures can soar beyond forty degrees Celsius. Most creatures flee or wilt under the blistering sun, but the greater bilby has mastered survival. With oversized, silky ears and strong clawed forepaws, this nocturnal marsupial is one of the desert's greatest engineers."
      },
      {
        id: 2,
        text: "Bilbies do not simply dig shallow scrapes. They construct extraordinary spiral burrows that plunge up to two metres beneath the desert surface. The spiral design prevents wind from blowing hot air straight to the bottom and confuses predators who try to dig them out. Underground, the air stays remarkably cool and humid, protecting the bilby from fatal dehydration."
      },
      {
        id: 3,
        text: "Because bilbies are strictly nocturnal, they emerge only after twilight blankets the spinifex dunes. Their enormous ears act like built-in radiators, releasing excess body heat into the chilly night breeze while tuning into the faintest scuttle of termites or witchetty grubs beneath the sand."
      },
      {
        id: 4,
        text: "Scientists classify the bilby as an 'ecosystem engineer'. A single bilby can dig over twenty tonnes of topsoil every year! As they excavate for seeds and tubers, their digging creates compost pits that trap dry leaves and raindrops. These pits become fertile nurseries where native grasses sprout, providing shelter for lizards, birds, and insects."
      }
    ],
    questions: [
      {
        id: "rq-inf-01",
        passageId: "passage-info-01",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "They construct extraordinary spiral burrows that plunge up to two metres beneath the desert surface.",
        prompt: "How deep into the ground can a bilby's spiral burrow reach?",
        options: [
          "Ten centimetres",
          "Up to two metres",
          "Over forty metres",
          "Only a few millimetres"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 2 directly states that bilby burrows plunge 'up to two metres beneath the desert surface'."
      },
      {
        id: "rq-inf-02",
        passageId: "passage-info-01",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "this nocturnal marsupial is one of the desert's greatest engineers.",
        prompt: "What does the word 'nocturnal' mean in paragraph 1?",
        options: [
          "Active primarily during the night rather than daytime",
          "Living exclusively in trees",
          "Eating only desert grasses and fruits",
          "Unable to hear soft sounds"
        ],
        correctOptionIndex: 0,
        explanation: "Nocturnal animals sleep during the day and come out at night, as confirmed in paragraph 3 ('emerge only after twilight')."
      },
      {
        id: "rq-inf-03",
        passageId: "passage-info-01",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "The spiral design prevents wind from blowing hot air straight to the bottom and confuses predators who try to dig them out.",
        prompt: "Why is a spiral burrow safer for the bilby than a straight burrow?",
        options: [
          "It allows rainwater to flood in rapidly",
          "It blocks scorching desert winds and makes it harder for predators to dig them out",
          "It lets in bright sunlight so the bilby can see",
          "It takes less energy to dig than a shallow hole"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 2 notes the spiral curves block hot wind and baffle digging predators."
      },
      {
        id: "rq-inf-04",
        passageId: "passage-info-01",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Scientists classify the bilby as an 'ecosystem engineer'.",
        prompt: "Why does the author call the bilby an 'ecosystem engineer' in paragraph 4?",
        options: [
          "Because bilbies wear miniature hard hats when working",
          "Because their extensive digging creates fertile spots that help other desert plants and animals thrive",
          "Because bilbies build human houses in the outback",
          "Because bilbies can fix broken machinery"
        ],
        correctOptionIndex: 1,
        explanation: "Bilbies reshape the environment: their compost pits trap water and seeds, rejuvenating the whole desert habitat."
      },
      {
        id: "rq-inf-05",
        passageId: "passage-info-01",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "A single bilby can dig over twenty tonnes of topsoil every year! As they excavate for seeds and tubers, their digging creates compost pits",
        prompt: "What is the central purpose of this article?",
        options: [
          "To warn people to avoid going near bilby burrows",
          "To explain how the bilby's unique adaptations help it survive and benefit the whole desert ecosystem",
          "To compare the bilby with the red kangaroo",
          "To explain why the Australian outback is getting hotter"
        ],
        correctOptionIndex: 1,
        explanation: "The article highlights the bilby's remarkable adaptations (ears, burrows) and its vital role as an ecosystem architect."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 3: PERSUASIVE
  // =========================================================================
  {
    id: "passage-persuasive-01",
    title: "Save Our School Nature Patch",
    genre: "Persuasive",
    subtitle: "A student letter arguing for the preservation of wild green spaces",
    estimatedMinutes: 3,
    introduction: "Read the letter written by Year 3 student Maya. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Dear Principal Davies,\n\nI am writing on behalf of Year 3 to urge you to reconsider the proposal to pave over our school Nature Patch to build extra concrete bicycle bays. While encouraging cycling to school is admirable, destroying our only living biodiversity garden is a mistake that cannot be undone."
      },
      {
        id: 2,
        text: "Firstly, the Nature Patch is teeming with native wildlife. Our flowering bottlebrush and wattle shrubs provide food for rainbow lorikeets, blue-banded bees, and delicate monarch butterflies. If concrete replaces these shrubs, where will these creatures go? They will vanish from our school grounds forever."
      },
      {
        id: 3,
        text: "Secondly, the Nature Patch is an irreplaceable outdoor science classroom. Last week, our class observed earthworms aerating rich soil and sketched seed pods during science. Learning from real living plants in the open air is a hundred times more memorable than staring at drawings inside a textbook."
      },
      {
        id: 4,
        text: "Finally, there is plenty of unused asphalt near the sports shed that could easily house fifty bicycle racks without cutting down a single branch. Please protect our green oasis. Once living nature is buried under grey concrete, it is lost forever.\n\nYours sincerely,\nMaya K. (Year 3 Class Representative)"
      }
    ],
    questions: [
      {
        id: "rq-per-01",
        passageId: "passage-persuasive-01",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "I am writing on behalf of Year 3 to urge you to reconsider the proposal to pave over our school Nature Patch",
        prompt: "What is Maya's primary intention in writing this letter?",
        options: [
          "To ask for new bicycles for the Year 3 students",
          "To persuade the principal to keep the Nature Patch instead of covering it in concrete",
          "To complain about too much science homework",
          "To invite the principal to a picnic in the school garden"
        ],
        correctOptionIndex: 1,
        explanation: "Maya's opening sentence clearly establishes her argument: convincing the principal to reconsider paving the Nature Patch."
      },
      {
        id: "rq-per-02",
        passageId: "passage-persuasive-01",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "provide food for rainbow lorikeets, blue-banded bees, and delicate monarch butterflies.",
        prompt: "According to paragraph 2, which animals rely on the bottlebrush and wattle shrubs for food?",
        options: [
          "Koalas and possums",
          "Rainbow lorikeets, blue-banded bees, and monarch butterflies",
          "Magpies and fruit bats",
          "Earthworms and wallabies"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 2 specifically names rainbow lorikeets, blue-banded bees, and monarch butterflies."
      },
      {
        id: "rq-per-03",
        passageId: "passage-persuasive-01",
        cognitiveSkill: "Inference",
        paragraphRef: 4,
        evidenceQuote: "Finally, there is plenty of unused asphalt near the sports shed that could easily house fifty bicycle racks without cutting down a single branch.",
        prompt: "Why does Maya mention the unused asphalt near the sports shed in paragraph 4?",
        options: [
          "To offer a practical alternative that solves the bike storage problem without hurting the garden",
          "To complain that the sports shed is messy and needs cleaning",
          "To propose building a second sports shed",
          "To prove that cars should park near the sports shed"
        ],
        correctOptionIndex: 0,
        explanation: "A strong persuasive argument presents a constructive solution: the bike racks can go on existing unused concrete."
      },
      {
        id: "rq-per-04",
        passageId: "passage-persuasive-01",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 3,
        evidenceQuote: "Secondly, the Nature Patch is an irreplaceable outdoor science classroom.",
        prompt: "In paragraph 3, what does the word 'irreplaceable' mean?",
        options: [
          "Easily bought from a hardware store",
          "Too expensive to repair",
          "So unique and valuable that it cannot be substituted or replaced if lost",
          "Dirty and untidy"
        ],
        correctOptionIndex: 2,
        explanation: "'Irreplaceable' means something so unique that if it is destroyed, nothing else can take its place."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 4: POEM
  // =========================================================================
  {
    id: "passage-poem-01",
    title: "Midnight at the Billabong",
    genre: "Poem",
    subtitle: "A lyrical glimpse into nocturnal waters under starlight",
    estimatedMinutes: 3,
    introduction: "Read the poem carefully. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The campfire embers fade to grey,\nThe noisy daytime fades away.\nAcross the mirror of the pool,\nThe midnight breeze blows crisp and cool,\nAnd bullfrogs start their hollow drone,\nLike brassy tubas played alone."
      },
      {
        id: 2,
        text: "High up upon a paperbark,\nA feathered shadow greets the dark:\nThe tawny frogmouth does not flinch,\nNor budge a single feathered inch,\nPerched stiff as splintered timber bark,\nA watchful statue in the park."
      },
      {
        id: 3,
        text: "A sudden splash! A ripple rings!\nAway the water-strider springs.\nA sleek duck-bill, a beaver tail,\nGlides silent as a ghost in mail.\nThe platypus dives down below,\nWhere silver river pebbles glow."
      },
      {
        id: 4,
        text: "The silver moon floats on the stream,\nA world half-waking, half in dream.\nUntil the golden eastern sky\nWakes up the cockatoo's shrill cry,\nAnd night slips softly out of sight,\nDissolving in the morning light."
      }
    ],
    questions: [
      {
        id: "rq-poe-01",
        passageId: "passage-poem-01",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "Perched stiff as splintered timber bark, / A watchful statue in the park.",
        prompt: "In stanza 2, the line 'Perched stiff as splintered timber bark' is used to show:",
        options: [
          "That the tawny frogmouth fell out of the nest and broke a branch",
          "How masterfully the bird camouflages itself by pretending to be part of the tree",
          "That the bird was frozen from the cold wind",
          "That the tree was cut down by loggers"
        ],
        correctOptionIndex: 1,
        explanation: "Tawny frogmouths sit completely motionless to blend in like dead tree bark to fool predators and prey."
      },
      {
        id: "rq-poe-02",
        passageId: "passage-poem-01",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "And bullfrogs start their hollow drone, / Like brassy tubas played alone.",
        prompt: "What sound does the poet compare to 'brassy tubas played alone' in stanza 1?",
        options: [
          "The crackle of the campfire embers",
          "The hollow croaking of the bullfrogs",
          "The scream of the white cockatoos",
          "The wind rushing through the tall reeds"
        ],
        correctOptionIndex: 1,
        explanation: "Stanza 1 explicitly states: 'And bullfrogs start their hollow drone, / Like brassy tubas played alone.'"
      },
      {
        id: "rq-poe-03",
        passageId: "passage-poem-01",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "A sleek duck-bill, a beaver tail, / Glides silent as a ghost in mail.",
        prompt: "Which Australian creature is described entering the billabong in stanza 3?",
        options: [
          "A freshwater crocodile",
          "A platypus",
          "An Australian fur seal",
          "A water rat"
        ],
        correctOptionIndex: 1,
        explanation: "The poem describes a 'duck-bill', 'beaver tail', and names 'The platypus dives down below'."
      },
      {
        id: "rq-poe-04",
        passageId: "passage-poem-01",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "A world half-waking, half in dream. / Until the golden eastern sky / Wakes up the cockatoo's shrill cry",
        prompt: "What overall mood does the poet create throughout the poem?",
        options: [
          "Frightening and dangerous",
          "Calm, peaceful, and mysterious",
          "Hasty and panicked",
          "Gloomy and sorrowful"
        ],
        correctOptionIndex: 1,
        explanation: "The poem uses soft, melodic rhythm and gentle imagery ('breeze blows cool', 'world half-dreaming') to evoke a serene, magical nocturnal world."
      }
    ]
  }
];
