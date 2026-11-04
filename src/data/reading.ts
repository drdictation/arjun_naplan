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
  },

  // =========================================================================
  // PASSAGE 5: NARRATIVE - THE MYSTERY OF SHIPWRECK COVE
  // =========================================================================
  {
    id: "passage-narrative-02",
    title: "The Mystery of Shipwreck Cove",
    genre: "Narrative",
    subtitle: "Two friends uncover a storm-tossed maritime relic along the limestone cliffs",
    estimatedMinutes: 4,
    introduction: "Read the story below. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Dawn was breaking over the Great Ocean Road, painting the limestone cliffs in hues of apricot and lavender. Anika and her younger brother Tariq scrambled down the damp wooden stairs that led to Shipwreck Cove. The previous night's ferocious king tide had scoured the shoreline, depositing tangled piles of kelp, sea-sponge, and smooth driftwood high above the normal waterline."
      },
      {
        id: 2,
        text: "Tariq suddenly stopped, pointing a sand-covered finger toward the base of a jagged rock pillar. Wedged tightly between two barnacle-crusted boulders was a dark, circular wooden box, bound securely with bands of tarnished brass."
      },
      {
        id: 3,
        text: "'Keep your eyes on the incoming swells, Tariq,' Anika cautioned as she stepped into the foamy, knee-deep surge. The icy ocean water sent shivers up her spine, but curiosity drove her forward. Working her boots into the slick sand, she grasped the casing with both hands and gave a determined heave."
      },
      {
        id: 4,
        text: "The box gave way with a wet sucking sound. Anika hurried up to the dry sand dunes, where Tariq was hovering with wide eyes. Gently, she pried open the corroded latch. Inside, resting in a water-resistant leather pocket, was a heavy brass maritime compass. Its needle floated gracefully in cloudy oil, trembling before pointing steadfastly toward magnetic north."
      },
      {
        id: 5,
        text: "On the polished underside of the lid, a tiny inscription caught the morning sun: 'Schooner Loch Ard - Melbourne, 1878'. Tariq gasped. They were not holding ordinary flotsam; they were cradling a lost piece of Australia's maritime past. Without hesitation, Anika snapped the lid shut. 'We have to show this to the park ranger,' she said firmly. 'This belongs in the museum for everyone to learn from.'"
      }
    ],
    questions: [
      {
        id: "rq-nar2-01",
        passageId: "passage-narrative-02",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "depositing tangled piles of kelp, sea-sponge, and smooth driftwood high above the normal waterline.",
        prompt: "According to paragraph 1, what did the ferocious king tide leave scattered across the beach?",
        options: [
          "Cracked seashells and modern plastic bottles",
          "Tangled piles of kelp, sea-sponge, and smooth driftwood",
          "A broken wooden rowing boat",
          "Golden coins half-buried in dry sand"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 1 lists precisely what was deposited: 'tangled piles of kelp, sea-sponge, and smooth driftwood'."
      },
      {
        id: "rq-nar2-02",
        passageId: "passage-narrative-02",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "bound securely with bands of tarnished brass.",
        prompt: "In paragraph 2, what does the word 'tarnished' tell us about the brass bands?",
        options: [
          "They were brightly polished and new",
          "They had lost their shine and discoloured after long exposure to salt and air",
          "They were razor sharp and dangerous to touch",
          "They were made of cheap plastic painted gold"
        ],
        correctOptionIndex: 1,
        explanation: "'Tarnished' describes metal that has darkened or dulled from being exposed to air and seawater over many years."
      },
      {
        id: "rq-nar2-03",
        passageId: "passage-narrative-02",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "'Keep your eyes on the incoming swells, Tariq,' Anika cautioned",
        prompt: "Why did Anika tell Tariq to watch the incoming swells while she retrieved the box?",
        options: [
          "She wanted to see if dolphins were swimming nearby",
          "Large, unpredictable ocean waves could knock them off their feet against the rocks",
          "She wanted Tariq to find a surfboard",
          "She thought Tariq was afraid of the dark"
        ],
        correctOptionIndex: 1,
        explanation: "At a rocky cove, 'swells' are large ocean waves that can sweep in suddenly, posing a severe safety risk on slippery rocks."
      },
      {
        id: "rq-nar2-04",
        passageId: "passage-narrative-02",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Its needle floated gracefully in cloudy oil, trembling before pointing steadfastly toward magnetic north.",
        prompt: "Why does the author mention that the compass needle still pointed 'steadfastly toward magnetic north'?",
        options: [
          "To show that despite decades in the ocean, the compass was still functioning perfectly",
          "To indicate that the compass was broken beyond repair",
          "To suggest the children were lost and could not find their way home",
          "To explain how sailors in 1878 got shipwrecked"
        ],
        correctOptionIndex: 0,
        explanation: "The author uses 'steadfastly' to emphasize the miraculous craftsmanship: even after decades, the antique tool still worked."
      },
      {
        id: "rq-nar2-05",
        passageId: "passage-narrative-02",
        cognitiveSkill: "Main Idea",
        paragraphRef: 5,
        evidenceQuote: "'We have to show this to the park ranger,' she said firmly. 'This belongs in the museum for everyone to learn from.'",
        prompt: "What does Anika's reaction in paragraph 5 reveal about her values?",
        options: [
          "She wants to sell the antique compass for a high cash reward",
          "She values history and wants important cultural artifacts protected for the public good",
          "She wants to hide the compass in her bedroom",
          "She is frightened of getting into trouble with the park ranger"
        ],
        correctOptionIndex: 1,
        explanation: "Anika recognizes the historical value of the find and immediately insists on preserving it in a public museum."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 6: INFORMATIONAL - THE PLATYPUS: AUSTRALIA'S LIVING RIDDLE
  // =========================================================================
  {
    id: "passage-info-02",
    title: "The Platypus: Australia's Living Riddle",
    genre: "Informational",
    subtitle: "Why this elusive freshwater marvel baffled the world's greatest scientists",
    estimatedMinutes: 4,
    introduction: "Read the informational report. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "When British scientists first examined a preserved platypus skin sent from New South Wales in 1798, they declared it an elaborate hoax. Suspecting that an eccentric Chinese taxidermist had stitched a duck's leathery bill onto the pelt of a beaver, one naturalist even took scissors to the specimen in search of hidden thread."
      },
      {
        id: 2,
        text: "Far from a practical joke, the platypus is one of Earth's rarest biological treasures: a monotreme. Unlike almost all other mammals, which give birth to live infants, female monotremes lay soft, marble-sized eggs. Once hatched, the tiny puggles lap milk secreted directly through specialised glands on their mother's belly, as platypuses possess no teats."
      },
      {
        id: 3,
        text: "Underwater, the platypus transforms into an uncanny hunter. As soon as it submerges, skin folds seal its eyes, ears, and nostrils shut, leaving it sensory-blind. Instead, its rubbery bill is equipped with forty thousand electroreceptors that detect the faint electrical pulses emitted when yabbies, freshwater shrimp, or insect larvae flick their tails in the riverbed silt."
      },
      {
        id: 4,
        text: "Male platypuses possess another astonishing adaptation: sharp, hollow calcaneus spurs on their rear ankles. These spurs connect to venom glands located in the upper thighs. While the venom is rarely fatal to humans, it produces intense, excruciating agony that resists morphine and can leave an arm swollen for weeks."
      },
      {
        id: 5,
        text: "Today, environmental scientists regard the platypus as an 'indicator species'. Because platypuses require clean, oxygen-rich creeks teeming with macroinvertebrates, their presence proves a waterway is healthy. By conserving pristine riverbanks and preventing plastic pollution, we protect one of evolution's most remarkable survivors."
      }
    ],
    questions: [
      {
        id: "rq-inf2-01",
        passageId: "passage-info-02",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "one naturalist even took scissors to the specimen in search of hidden thread.",
        prompt: "Why did a scientist in 1798 use scissors on the first platypus specimen?",
        options: [
          "To cut off the claws for a museum display",
          "To check if someone had fraudulently stitched a duck's bill onto an animal body",
          "To test if the fur was waterproof",
          "To make a copy of the pelt for an art book"
        ],
        correctOptionIndex: 1,
        explanation: "Scientists thought the creature was an impossible fake, so they looked for stitches attaching the duck-bill to the fur."
      },
      {
        id: "rq-inf2-02",
        passageId: "passage-info-02",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "a monotreme. Unlike almost all other mammals, which give birth to live infants, female monotremes lay soft, marble-sized eggs.",
        prompt: "According to paragraph 2, what makes a monotreme distinct from other mammals?",
        options: [
          "Monotremes lay eggs rather than giving birth to live young",
          "Monotremes can fly through the air",
          "Monotremes do not drink water",
          "Monotremes have scales instead of fur"
        ],
        correctOptionIndex: 0,
        explanation: "Paragraph 2 defines monotremes as mammals that lay soft, leathery eggs rather than giving birth to live babies."
      },
      {
        id: "rq-inf2-03",
        passageId: "passage-info-02",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "skin folds seal its eyes, ears, and nostrils shut, leaving it sensory-blind. Instead, its rubbery bill is equipped with forty thousand electroreceptors",
        prompt: "Why is electroreception in the bill crucial for the platypus when diving?",
        options: [
          "It uses electricity to shock and stun large predators",
          "Because its eyes, ears, and nostrils are closed underwater, it needs electrical detection to find prey in the dark silt",
          "It helps warm the water during cold mountain winters",
          "It allows the platypus to communicate with other platypuses"
        ],
        correctOptionIndex: 1,
        explanation: "Since the platypus seals its eyes and ears while diving, it relies entirely on electrical sensing to find food."
      },
      {
        id: "rq-inf2-04",
        passageId: "passage-info-02",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 4,
        evidenceQuote: "sharp, hollow calcaneus spurs on their rear ankles.",
        prompt: "Where are a male platypus's venomous spurs located?",
        options: [
          "Underneath its leathery bill",
          "On the tip of its broad beaver-like tail",
          "On the rear ankles of its hind legs",
          "Along its front webbed claws"
        ],
        correctOptionIndex: 2,
        explanation: "Paragraph 4 clearly states that the venomous spurs are situated on the male's rear ankles."
      },
      {
        id: "rq-inf2-05",
        passageId: "passage-info-02",
        cognitiveSkill: "Main Idea",
        paragraphRef: 5,
        evidenceQuote: "Because platypuses require clean, oxygen-rich creeks teeming with macroinvertebrates, their presence proves a waterway is healthy.",
        prompt: "Why is the platypus referred to as an 'indicator species' in paragraph 5?",
        options: [
          "Because its presence indicates that a creek is unpolluted and ecologically healthy",
          "Because it points its bill toward freshwater springs",
          "Because it indicates when a seasonal flood is coming",
          "Because its coat turns brighter green when the weather warms up"
        ],
        correctOptionIndex: 0,
        explanation: "An 'indicator species' signals environmental health: if platypuses survive in a river, the water and food web are clean and thriving."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 7: PERSUASIVE - WHY EVERY SCHOOL NEEDS A KITCHEN GARDEN
  // =========================================================================
  {
    id: "passage-persuasive-02",
    title: "Why Every School Needs a Kitchen Garden",
    genre: "Persuasive",
    subtitle: "A student speech urging our school council to transform bare lawns into bountiful beds",
    estimatedMinutes: 3,
    introduction: "Read the persuasive speech presented to the School Council. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Respected School Council members, picture this scene: instead of pacing across endless patches of scorched grass during lunchtime, students are harvesting sweet cherry tomatoes, crunching crisp sugar-snap peas, and watching native blue-banded bees pollinate golden zucchini blossoms. A school kitchen garden is not an extravagant hobby; it is an essential classroom without walls."
      },
      {
        id: 2,
        text: "First and foremost, hands-on gardening transforms childhood nutrition. Research consistently reveals that when children plant, water, and weed their own vegetables, they become eager to eat them. Green beans and spinach stop being dreaded dinner obligations; they become tasty trophies grown with their own sweat and dedication."
      },
      {
        id: 3,
        text: "Secondly, a garden provides practical, real-world learning that no computer screen can duplicate. In mathematics, Year 3 students can calculate the perimeter of raised garden beds and measure monthly rainfall in rain gauges. In science, we investigate living soil microbes, worm composting, and seed germination firsthand."
      },
      {
        id: 4,
        text: "Some sceptics argue that maintaining garden beds during long summer holidays is impractical. However, dozens of neighbouring primary schools have solved this effortlessly by establishing weekend family watering rosters or installing solar-powered timer drip systems."
      },
      {
        id: 5,
        text: "Let us banish bare, baking bitumen and cultivate living green abundance. I urge the council to approve our kitchen garden proposal today. Invest in our learning, our health, and our future—our school community will reap the delicious rewards for generations to come."
      }
    ],
    questions: [
      {
        id: "rq-per2-01",
        passageId: "passage-persuasive-02",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "picture this scene: instead of pacing across endless patches of scorched grass during lunchtime, students are harvesting sweet cherry tomatoes",
        prompt: "Why does the speaker begin the speech with the phrase 'picture this scene'?",
        options: [
          "To tell the council members to look at a photograph in their booklet",
          "To engage the audience's imagination with a vivid, appealing vision of a thriving garden",
          "To test whether the microphone was working",
          "To announce that art class is starting"
        ],
        correctOptionIndex: 1,
        explanation: "'Picture this scene' is a persuasive hook that invites listeners to visualize a positive future, making the argument immediately compelling."
      },
      {
        id: "rq-per2-02",
        passageId: "passage-persuasive-02",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "Green beans and spinach stop being dreaded dinner obligations; they become tasty trophies grown with their own sweat and dedication.",
        prompt: "Why does the speaker refer to vegetables as 'tasty trophies' in paragraph 2?",
        options: [
          "Because the students win plastic cups for growing them",
          "To highlight the pride and achievement students feel when eating food they produced themselves",
          "Because vegetables are very expensive in supermarkets",
          "Because the school will enter them in an Olympic contest"
        ],
        correctOptionIndex: 1,
        explanation: "Calling homegrown food a 'tasty trophy' expresses the rewarding sense of pride that motivates kids to eat vegetables."
      },
      {
        id: "rq-per2-03",
        passageId: "passage-persuasive-02",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "Year 3 students can calculate the perimeter of raised garden beds and measure monthly rainfall in rain gauges.",
        prompt: "According to paragraph 3, what mathematics skill can students practice in the garden?",
        options: [
          "Counting coins to buy groceries",
          "Calculating the perimeter of garden beds and measuring rainfall",
          "Memorising division tables",
          "Drawing bar graphs of car colours"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 3 explicitly mentions calculating the perimeter of garden beds and measuring rainfall volumes."
      },
      {
        id: "rq-per2-04",
        passageId: "passage-persuasive-02",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Some sceptics argue that maintaining garden beds during long summer holidays is impractical. However, dozens of neighbouring primary schools have solved this effortlessly",
        prompt: "Why does the speaker mention the argument of 'sceptics' in paragraph 4?",
        options: [
          "To concede that the garden project is impossible to manage",
          "To anticipate a potential objection and immediately provide practical solutions to dismantle it",
          "To insult people who disagree with the speech",
          "To suggest that the school should cancel all summer holidays"
        ],
        correctOptionIndex: 1,
        explanation: "Strong persuasive texts address counterarguments directly and prove that the worries have simple, workable solutions."
      },
      {
        id: "rq-per2-05",
        passageId: "passage-persuasive-02",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 5,
        evidenceQuote: "our school community will reap the delicious rewards for generations to come.",
        prompt: "In the concluding sentence, what does the idiom 'reap the rewards' mean?",
        options: [
          "Cut down all the crops with sharp sickles",
          "Pay high financial costs for the garden project",
          "Enjoy the positive benefits and results of their good decision",
          "Plant extra seeds in the winter season"
        ],
        correctOptionIndex: 2,
        explanation: "To 'reap the rewards' is a metaphor meaning to receive the positive benefits of earlier hard work and wise choices."
      }
    ]
  },

  // =========================================================================
  // PASSAGE 8: POEM - THE DANCING BROLGA
  // =========================================================================
  {
    id: "passage-poem-02",
    title: "The Dancing Brolga",
    genre: "Poem",
    subtitle: "A rhythmic ode to Australia's graceful wetland crane",
    estimatedMinutes: 3,
    introduction: "Read the poem carefully. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Where claypans bake beneath the haze,\nAnd heatwaves shimmer through the days,\nA stately silhouette, silver-grey,\nSteps out across the sunbaked clay.\nWith crimson crown and dagger bill,\nShe stands beside the paperbark hill."
      },
      {
        id: 2,
        text: "A sudden pause—she bends her knees,\nThen springs like silk upon the breeze!\nShe leaps three metres in the air,\nAs light as thistle-down floating there,\nSpreading her vast, wing-feathered sails,\nWhile dust devils whirl their sandy tails."
      },
      {
        id: 3,
        text: "She bows politely to the sun,\nThen pirouettes—the dance begun!\nShe tosses grass into the sky,\nAnd catches twigs as they flutter by,\nA feathered dancer proud and free,\nPerforming for the inland sea."
      },
      {
        id: 4,
        text: "Her trumpet-cry rings fierce and clear,\nSo all the sleeping wetlands hear,\nUntil dark clouds begin to loom,\nAnd wash away the outback gloom,\nHer ballet done, she greets the rain,\nQueen of the silver marsh again."
      }
    ],
    questions: [
      {
        id: "rq-poe2-01",
        passageId: "passage-poem-02",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "A stately silhouette, silver-grey, / Steps out across the sunbaked clay.",
        prompt: "In stanza 1, what does the word 'stately' suggest about the brolga's movement?",
        options: [
          "She is clumsy and bumping into trees",
          "She moves with dignified, elegant grace like royalty",
          "She is running frantically away from danger",
          "She is limping from an injured wing"
        ],
        correctOptionIndex: 1,
        explanation: "'Stately' means majestic, grand, and dignified, conveying how gracefully the tall bird carries itself."
      },
      {
        id: "rq-poe2-02",
        passageId: "passage-poem-02",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "As light as thistle-down floating there",
        prompt: "What does the simile 'As light as thistle-down floating there' emphasize about the brolga's leap?",
        options: [
          "That the bird was covered in sharp prickles",
          "How weightless and effortless her massive leap appeared",
          "That she was falling rapidly to the ground",
          "That she was blown away into the desert by a cyclone"
        ],
        correctOptionIndex: 1,
        explanation: "Thistle-down is fluffy and floats weightlessly on air; this simile shows how light and airborne the crane appears when jumping."
      },
      {
        id: "rq-poe2-03",
        passageId: "passage-poem-02",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "She tosses grass into the sky, / And catches twigs as they flutter by,",
        prompt: "According to stanza 3, what objects does the brolga toss and catch during her dance?",
        options: [
          "Fish and river pebbles",
          "Clumps of grass and twigs",
          "Small feathers and red berries",
          "Insects and dried leaves"
        ],
        correctOptionIndex: 1,
        explanation: "Stanza 3 specifically says: 'She tosses grass into the sky, / And catches twigs as they flutter by'."
      },
      {
        id: "rq-poe2-04",
        passageId: "passage-poem-02",
        cognitiveSkill: "Inference",
        paragraphRef: 4,
        evidenceQuote: "Until dark clouds begin to loom, / And wash away the outback gloom, / Her ballet done, she greets the rain",
        prompt: "What change in the outback environment brings the brolga's dance to an end?",
        options: [
          "A bushfire spreading through the grass",
          "The arrival of storm clouds and refreshing rain",
          "The sun rising higher in the scorching midday",
          "A pack of dingoes approaching the swamp"
        ],
        correctOptionIndex: 1,
        explanation: "Stanza 4 describes dark clouds looming and rain washing away the gloom, concluding the bird's dance."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 13: INFORMATIONAL - WHY DOES IT RAIN? (NAPLAN Practice Test)
  // =========================================================================
  {
    id: "passage-info-rain",
    title: "Why Does It Rain?",
    genre: "Informational",
    subtitle: "How clouds form and water returns to Earth",
    estimatedMinutes: 4,
    introduction: "Read the explanation below about how rain forms, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "When clouds get too heavy with water, the water falls back down to the ground as rain. Water is in oceans, rivers and under the ground. When the Sun shines it makes the water warm. As the water warms it turns into droplets. These droplets rise up into the sky."
      },
      {
        id: 2,
        text: "As the water droplets get cooler they condense into clouds. Eventually these water droplets fall from the clouds as rain. Falling raindrops are often illustrated like a teardrop with a round bottom and narrower top but this is incorrect. Small raindrops are like spheres and larger ones look like spheres with flat bottoms. Larger raindrops always fall faster than smaller ones."
      }
    ],
    questions: [
      {
        id: "rq-rain-01",
        passageId: "passage-info-rain",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "When clouds get too heavy with water, the water falls back down to the ground as rain.",
        prompt: "What type of text is this?",
        options: ["A narrative", "A poem", "An explanation", "A recount"],
        correctOptionIndex: 2,
        explanation: "This text explains the scientific process of how rain occurs, so it is an explanation."
      },
      {
        id: "rq-rain-02",
        passageId: "passage-info-rain",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "As the water droplets get cooler they condense into clouds.",
        prompt: "Which statement is true according to the passage?",
        options: [
          "Clouds are made up of water droplets.",
          "Falling raindrops are tear-shaped.",
          "Small raindrops fall faster than larger ones.",
          "Rain is water in the oceans and rivers."
        ],
        correctOptionIndex: 0,
        explanation: "The passage states that cooler droplets condense into clouds, meaning clouds are made up of water droplets."
      },
      {
        id: "rq-rain-03",
        passageId: "passage-info-rain",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "As the water warms it turns into droplets.",
        prompt: "According to the passage, what happens to water when it warms?",
        options: [
          "It turns into rain.",
          "It turns into clouds.",
          "It turns into water droplets.",
          "It turns into teardrops."
        ],
        correctOptionIndex: 2,
        explanation: "Paragraph 1 states directly: 'When the Sun shines it makes the water warm. As the water warms it turns into droplets.'"
      },
      {
        id: "rq-rain-04",
        passageId: "passage-info-rain",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "Falling raindrops are often illustrated like a teardrop with a round bottom and narrower top but this is incorrect.",
        prompt: "Which statement is false?",
        options: [
          "Warm water turns into water droplets.",
          "Large raindrops fall faster than small raindrops.",
          "Water droplets cool and condense into clouds.",
          "Raindrops are narrow at the top and round at the bottom."
        ],
        correctOptionIndex: 3,
        explanation: "The passage clarifies that drawing raindrops as teardrops (narrow at top, round at bottom) is incorrect."
      },
      {
        id: "rq-rain-05",
        passageId: "passage-info-rain",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "Small raindrops are like spheres and larger ones look like spheres with flat bottoms.",
        prompt: "What shape are small raindrops?",
        options: ["Round", "Square", "Oval", "Rectangular"],
        correctOptionIndex: 0,
        explanation: "The text says 'Small raindrops are like spheres', which means they are round in 3D."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 14: INFORMATIONAL - THE AUSTRALIAN GOLD RUSH (NAPLAN Practice Test)
  // =========================================================================
  {
    id: "passage-info-goldrush",
    title: "The Australian Gold Rush",
    genre: "Informational",
    subtitle: "How discovering gold changed Australian history and population",
    estimatedMinutes: 5,
    introduction: "Read the historical recount below, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The Australian gold rush began in the 1850s. The first person to find gold was a man named Edward Hargraves. Hargraves found gold in a waterhole at Bathurst, New South Wales, in 1851. As soon as people heard that gold had been discovered they were eager to try to find gold themselves."
      },
      {
        id: 2,
        text: "People left their jobs and homes and rushed to the goldfields and began digging for gold. The entire country became swept up in “gold fever”. The Australian gold rush was responsible for the first wave of people arriving from countries other than England. These people made Australia their home as they dug for gold. Gold diggers came from America, Europe and Asia."
      },
      {
        id: 3,
        text: "From 1851 to 1857, Australia’s population grew from 430,000 to 1.7 million! Between 1851 and 1861, Australia produced one-third of the world’s gold."
      }
    ],
    questions: [
      {
        id: "rq-gold-01",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "Hargraves found gold in a waterhole at Bathurst, New South Wales, in 1851.",
        prompt: "When did Edward Hargraves find gold?",
        options: ["1857", "1855", "1851", "1861"],
        correctOptionIndex: 2,
        explanation: "Paragraph 1 clearly states Hargraves found gold in 1851."
      },
      {
        id: "rq-gold-02",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "Hargraves found gold in a waterhole at Bathurst, New South Wales, in 1851.",
        prompt: "What was the name of the town near where the first gold was found?",
        options: ["Bathurst", "Sydney", "Melbourne", "Ballarat"],
        correctOptionIndex: 0,
        explanation: "Gold was discovered at a waterhole in Bathurst, New South Wales."
      },
      {
        id: "rq-gold-03",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "Between 1851 and 1861, Australia produced one-third of the world’s gold.",
        prompt: "During which decade did Australia produce one-third of all gold in the world?",
        options: ["1851–1861", "1850–1860", "1851–1857", "1860–1870"],
        correctOptionIndex: 0,
        explanation: "Paragraph 3 notes: 'Between 1851 and 1861, Australia produced one-third of the world’s gold.'"
      },
      {
        id: "rq-gold-04",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "From 1851 to 1857, Australia’s population grew from 430,000 to 1.7 million!",
        prompt: "How many years did it take for Australia’s population to boom from 430,000 to 1.7 million?",
        options: ["10 years", "6 years", "3 years", "12 years"],
        correctOptionIndex: 1,
        explanation: "1857 minus 1851 equals 6 years."
      },
      {
        id: "rq-gold-05",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "The Australian gold rush was responsible for the first wave of people arriving from countries other than England.",
        prompt: "What caused Australia’s dramatic population growth in the 1850s?",
        options: [
          "The gold rush attracted people from many countries worldwide.",
          "People stopped moving away from Australia.",
          "Gold became cheaper and easier to buy in shops.",
          "New railway lines connected all cities."
        ],
        correctOptionIndex: 0,
        explanation: "People from America, Europe, and Asia sailed to Australia to find gold, booming the population."
      },
      {
        id: "rq-gold-06",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "People left their jobs and homes and rushed to the goldfields and began digging for gold.",
        prompt: "Why did people leave their jobs and homes to rush to the goldfields?",
        options: [
          "To search for gold and seek fortune",
          "To escape heavy rain in the cities",
          "To become sheep farmers in the outback",
          "To build new schoolhouses"
        ],
        correctOptionIndex: 0,
        explanation: "People rushed to the goldfields with the hope of striking rich by finding gold."
      },
      {
        id: "rq-gold-07",
        passageId: "passage-info-goldrush",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "The entire country became swept up in “gold fever”.",
        prompt: "What does the expression “gold fever” mean in this text?",
        options: [
          "A medical illness caused by touching gold",
          "Widespread excitement and eagerness to search for gold",
          "A hot fever suffered only by miners in winter",
          "The fear of losing gold coins"
        ],
        correctOptionIndex: 1,
        explanation: "'Gold fever' is a metaphor describing the overwhelming excitement and urge to hunt for gold."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 15: NARRATIVE - THE TIDE POOL EXPEDITION
  // =========================================================================
  {
    id: "passage-narrative-tidepool",
    title: "The Tide Pool Expedition",
    genre: "Narrative",
    subtitle: "A surprising encounter beneath the rock shelves of Bondi",
    estimatedMinutes: 4,
    introduction: "Read the story below. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The low tide had exposed a jagged labyrinth of sandstone rock pools along the coast. Maya hopped carefully from one dry ledge to another, her yellow bucket swinging by its rope handle. Sea anemones swayed in emerald pools like underwater chrysanthemums, and tiny hermit crabs scrambled into dark crevices whenever her shadow passed."
      },
      {
        id: 2,
        text: "In the deepest pool beneath a hanging curtain of brown kelp, something moved with deliberate grace. Maya dropped to her knees on the damp rock. A small creature, no larger than her palm, was gliding along the sandy floor. Its caramel body was speckled with brilliant, neon-blue rings that seemed to pulse and glow beneath the water."
      },
      {
        id: 3,
        text: "Maya inhaled sharply, instantly remembering Mr Harrison's science lesson from Tuesday. 'If the rings glow electric blue, step back immediately,' he had warned the class. Her fingers froze an inch from the surface. Slowly and silently, without splashing or startling the octopus, Maya stood up and took three steady steps backwards onto dry rock."
      },
      {
        id: 4,
        text: "She waved urgently toward the patrol tower where Lifeguard Dan was standing watch. Within minutes, Dan had arrived with warning flags to mark the pool. 'Outstanding spotting, Maya,' Dan said, kneeling to check the creature. 'You stayed calm, remembered your training, and kept everyone safe.'"
      }
    ],
    questions: [
      {
        id: "rq-tide-01",
        passageId: "passage-narrative-tidepool",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "Sea anemones swayed in emerald pools like underwater chrysanthemums",
        prompt: "According to paragraph 1, what did the sea anemones look like in the emerald pools?",
        options: [
          "Underwater chrysanthemums",
          "Tiny yellow starfish",
          "Rough clumps of brown kelp",
          "Speckled sea shells"
        ],
        correctOptionIndex: 0,
        explanation: "Paragraph 1 compares the sea anemones directly to 'underwater chrysanthemums'."
      },
      {
        id: "rq-tide-02",
        passageId: "passage-narrative-tidepool",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "something moved with deliberate grace.",
        prompt: "In paragraph 2, what does the phrase 'deliberate grace' suggest about the creature's movement?",
        options: [
          "It was clumsy and splashing loudly",
          "It moved smoothly and with careful purpose",
          "It was darting around in frantic panic",
          "It was frozen stiff and unable to swim"
        ],
        correctOptionIndex: 1,
        explanation: "'Deliberate grace' means smooth, controlled, and intentional motion."
      },
      {
        id: "rq-tide-03",
        passageId: "passage-narrative-tidepool",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "'If the rings glow electric blue, step back immediately,' he had warned the class.",
        prompt: "Why did Maya freeze and back away instead of touching the small octopus?",
        options: [
          "She dropped her bucket into the deep water",
          "She remembered blue-ringed octopuses are highly venomous and dangerous",
          "She was scared of slipping on the dry sandstone",
          "She heard Lifeguard Dan blowing a loud whistle"
        ],
        correctOptionIndex: 1,
        explanation: "Mr Harrison's warning about glowing blue rings signaled danger, prompting Maya's quick cautious reaction."
      },
      {
        id: "rq-tide-04",
        passageId: "passage-narrative-tidepool",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "'You stayed calm, remembered your training, and kept everyone safe.'",
        prompt: "What is the main message or theme of this story?",
        options: [
          "Collecting hermit crabs is the best beach activity",
          "Knowledge and calm action help protect yourself and others from danger",
          "Lifeguards should never leave the patrol tower",
          "Rock pools are too dangerous for children to visit"
        ],
        correctOptionIndex: 1,
        explanation: "The story highlights how listening in school and staying calm enabled Maya to avoid harm and protect beachgoers."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 16: PERSUASIVE - WHY EVERY SCHOOL NEEDS A VEGETABLE GARDEN
  // =========================================================================
  {
    id: "passage-persuasive-garden",
    title: "Why Every School Needs a Kitchen Garden",
    genre: "Persuasive",
    subtitle: "Digging up real knowledge beyond textbooks",
    estimatedMinutes: 4,
    introduction: "Read the opinion article below. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Imagine stepping out of the classroom into sunshine, pulling crisp sweet carrots straight from rich dark compost, and harvesting fragrant basil for cooking class. Every primary school should build a kitchen garden. It transforms empty grass patches into thriving outdoor laboratories."
      },
      {
        id: 2,
        text: "Firstly, hands-on gardening brings classroom science to life. Instead of merely gazing at diagrams in a dusty textbook, students witness seeds germination, observe bees pollinating pumpkin flowers, and test soil moisture with their own fingertips. Scientific facts stick far better when students can feel, smell, and observe nature in action."
      },
      {
        id: 3,
        text: "Furthermore, school gardens build healthy eating habits that last a lifetime. Many children claim they dislike vegetables like spinach or beetroot, yet research shows that when kids plant, water, and pick crops themselves, they are eager to eat them. Growing food gives children genuine pride in eating fresh produce."
      },
      {
        id: 4,
        text: "Some sceptics argue that gardens consume too much school time and budget. However, simple timber garden beds and recycled rain barrels cost very little, and community volunteers are always eager to assist. It is high time our schools invested in gardens to nurture healthy bodies and curious young minds."
      }
    ],
    questions: [
      {
        id: "rq-gard-01",
        passageId: "passage-persuasive-garden",
        cognitiveSkill: "Main Idea",
        paragraphRef: 1,
        evidenceQuote: "Every primary school should build a kitchen garden. It transforms empty grass patches into thriving outdoor laboratories.",
        prompt: "What is the author's primary argument in this text?",
        options: [
          "Schools should replace all textbooks with gardening tools",
          "Every primary school should establish a kitchen vegetable garden",
          "Students should only eat vegetables grown in pots",
          "Schools spend too much money on timber and rain barrels"
        ],
        correctOptionIndex: 1,
        explanation: "The central contention stated clearly in the introduction is that all primary schools should have a kitchen garden."
      },
      {
        id: "rq-gard-02",
        passageId: "passage-persuasive-garden",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "when kids plant, water, and pick crops themselves, they are eager to eat them.",
        prompt: "According to paragraph 3, what encourages children to enjoy eating fresh vegetables?",
        options: [
          "Buying vegetables from expensive organic markets",
          "Watching cooking shows on television",
          "Planting, nurturing, and harvesting the crops themselves",
          "Reading recipes in textbooks"
        ],
        correctOptionIndex: 2,
        explanation: "Paragraph 3 explains that growing food personally makes kids eager and proud to eat it."
      },
      {
        id: "rq-gard-03",
        passageId: "passage-persuasive-garden",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Some sceptics argue that gardens consume too much school time and budget.",
        prompt: "Why does the author mention 'sceptics' in paragraph 4?",
        options: [
          "To agree that gardens are too expensive for schools",
          "To introduce an opposing viewpoint and then disprove it with practical solutions",
          "To list people who dislike eating carrots and basil",
          "To suggest schools ask volunteers to run classrooms"
        ],
        correctOptionIndex: 1,
        explanation: "In persuasive writing, acknowledging the counterargument (cost/time) and addressing it strengthens the case."
      },
      {
        id: "rq-gard-04",
        passageId: "passage-persuasive-garden",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 4,
        evidenceQuote: "to nurture healthy bodies and curious young minds.",
        prompt: "What does the word 'nurture' mean as used in the final sentence?",
        options: [
          "To care for and encourage growth",
          "To paint or decorate brightly",
          "To inspect strictly for errors",
          "To buy at a supermarket"
        ],
        correctOptionIndex: 0,
        explanation: "'Nurture' means to feed, care for, and encourage healthy development."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 17: INFORMATIONAL - SECRETS OF THE PLATYPUS
  // =========================================================================
  {
    id: "passage-info-platypus",
    title: "Secrets of the Platypus",
    genre: "Informational",
    subtitle: "Australia's extraordinary egg-laying marvel",
    estimatedMinutes: 4,
    introduction: "Read the scientific report about the platypus below, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "When British scientists in 1799 first examined a preserved platypus skin sent from Australia, they believed it was an elaborate hoax stitched together by a mischievous taxidermist. With a duck-like bill, beaver-like tail, webbed feet, and otter fur, this river-dwelling creature seemed physically impossible."
      },
      {
        id: 2,
        text: "The platypus is a monotreme, one of only two surviving types of mammals that lay eggs instead of giving birth to live young (the other being the echidna). A mother platypus lays one or two soft, leathery eggs inside a burrow dug high into the riverbank, curling around them to keep them warm until they hatch ten days later."
      },
      {
        id: 3,
        text: "Beneath the water, the platypus does not rely on eyesight or smell. Instead, its rubbery bill is packed with tens of thousands of microscopic electroreceptors. These sensory cells detect tiny electrical impulses produced when shrimp, yabbies, and insect larvae contract their muscles. By sweeping its bill from side to side along murky riverbeds, the platypus detects prey with laser precision."
      }
    ],
    questions: [
      {
        id: "rq-platy-01",
        passageId: "passage-info-platypus",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "they believed it was an elaborate hoax stitched together by a mischievous taxidermist.",
        prompt: "Why did 18th-century British scientists think the platypus specimen was a hoax?",
        options: [
          "The animal was completely white in colour",
          "Its unusual mix of duck, beaver, and otter features seemed stitched together",
          "The skin had arrived damaged from the sea voyage",
          "They believed it was a bird rather than a mammal"
        ],
        correctOptionIndex: 1,
        explanation: "Scientists couldn't believe an animal with a duck bill and beaver tail was real, suspecting a fake."
      },
      {
        id: "rq-platy-02",
        passageId: "passage-info-platypus",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "The platypus is a monotreme, one of only two surviving types of mammals that lay eggs",
        prompt: "What is unique about monotremes compared to most other mammals?",
        options: [
          "They have scales like lizards",
          "They lay eggs instead of giving birth to live young",
          "They cannot breathe underwater",
          "They only feed on eucalyptus leaves"
        ],
        correctOptionIndex: 1,
        explanation: "Monotremes are unique mammals that reproduce by laying eggs."
      },
      {
        id: "rq-platy-03",
        passageId: "passage-info-platypus",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "its rubbery bill is packed with tens of thousands of microscopic electroreceptors.",
        prompt: "How is the platypus able to catch prey in murky riverbeds with closed eyes?",
        options: [
          "By shouting sound waves like a dolphin",
          "By detecting electric signals given off by prey with sensors on its bill",
          "By using long whiskers to feel vibrations",
          "By waiting on the riverbank until sunrise"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 3 explains the bill uses electroreceptors to detect tiny muscle signals from prey."
      },
      {
        id: "rq-platy-04",
        passageId: "passage-info-platypus",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "With a duck-like bill, beaver-like tail, webbed feet, and otter fur, this river-dwelling creature seemed physically impossible.",
        prompt: "What is the author's purpose in writing this article?",
        options: [
          "To persuade readers to buy pet platypuses",
          "To inform readers about the fascinating adaptations and biology of the platypus",
          "To argue that British scientists were foolish",
          "To explain how to build burrows on riverbanks"
        ],
        correctOptionIndex: 1,
        explanation: "The article provides factual scientific information about the platypus's unique adaptations."
      }
    ]
  }
];
