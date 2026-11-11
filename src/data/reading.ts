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
  },
  // =========================================================================
  // PASSAGE 18: NARRATIVE - THE ROBOT RACE IN ROOM 4
  // =========================================================================
  {
    id: "passage-narrative-robotics",
    title: "The Robot Race in Room 4",
    genre: "Narrative",
    subtitle: "Trial, error, and teamwork on the coding track",
    estimatedMinutes: 4,
    introduction: "Read the story below. Then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The classroom hummed with tension as twelve solar-powered rover robots lined up along the black tape track. For three weeks, Leo and Zara had soldered wires, tested infrared sensors, and tweaked their code on the laptop. Their robot, nicknamed The Grasshopper because of its bright green chassis and bouncy suspension, was ready for the final trial."
      },
      {
        id: 2,
        text: "‘Three, two, one, activate!’ called Mrs Chen, clicking the stopwatch. Whirring electric motors filled the room. The Grasshopper darted forward smoothly, hugging the first sharp hairpin turn with precision. But midway through the straight run, a loose wheel lug began to wobble violently. The Grasshopper veered sideways toward the boundary line."
      },
      {
        id: 3,
        text: "‘Adjust the left motor bias in the loop!’ shouted Zara, eyes glued to the telemetry monitor. Leo’s fingers flew across the keyboard, uploading an emergency throttle compensation via Bluetooth. Just two centimetres from disaster, The Grasshopper’s left wheel corrected its spin, stabilized, and shot across the checkered tape in first place."
      },
      {
        id: 4,
        text: "The entire class erupted in cheers. Leo and Zara exchanged an exhausted high-five. They hadn't just built a fast robot; they had learned that staying calm under pressure was the most powerful code of all."
      }
    ],
    questions: [
      {
        id: "rq-robot-01",
        passageId: "passage-narrative-robotics",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "nicknamed The Grasshopper because of its bright green chassis and bouncy suspension",
        prompt: "Why was the robot given the nickname 'The Grasshopper'?",
        options: [
          "It made loud chirping noises while driving",
          "It had a bright green chassis and bouncy suspension",
          "It was programmed to leap over obstacles",
          "It was the smallest robot in the classroom"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 1 clearly links the name to its bright green chassis and bouncy suspension."
      },
      {
        id: "rq-robot-02",
        passageId: "passage-narrative-robotics",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "a loose wheel lug began to wobble violently. The Grasshopper veered sideways toward the boundary line.",
        prompt: "What problem threatened to disqualify The Grasshopper during the race?",
        options: [
          "Its solar battery ran completely flat",
          "A loose wheel lug caused the robot to wobble off track",
          "Mrs Chen’s stopwatch malfunctioned",
          "Another rover crashed into its rear bumper"
        ],
        correctOptionIndex: 1,
        explanation: "The wobbling wheel lug caused the robot to veer sideways toward the edge."
      },
      {
        id: "rq-robot-03",
        passageId: "passage-narrative-robotics",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 3,
        evidenceQuote: "Leo’s fingers flew across the keyboard, uploading an emergency throttle compensation via Bluetooth.",
        prompt: "What does the phrase 'fingers flew across the keyboard' tell us about Leo?",
        options: [
          "He was typing very rapidly and with urgent focus",
          "He was swatting away an insect",
          "He was playing a musical song on the keys",
          "He had accidentally bumped the laptop off the table"
        ],
        correctOptionIndex: 0,
        explanation: "The idiom illustrates typing with extreme speed and intense concentration."
      },
      {
        id: "rq-robot-04",
        passageId: "passage-narrative-robotics",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "they had learned that staying calm under pressure was the most powerful code of all.",
        prompt: "What is the key lesson Leo and Zara discovered from the challenge?",
        options: [
          "Bluetooth signals always fail in competitions",
          "Quick teamwork and staying calm resolve unexpected crises",
          "Solar rovers are faster than battery rovers",
          "Coding is only useful for winning prizes"
        ],
        correctOptionIndex: 1,
        explanation: "The resolution emphasizes that teamwork and maintaining composure under pressure solved the crisis."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 19: INFORMATIONAL - THE GREAT BARRIER REEF CORAL SPAWN
  // =========================================================================
  {
    id: "passage-info-coral",
    title: "The Great Barrier Reef's Midnight Magic",
    genre: "Informational",
    subtitle: "One of the natural world's greatest synchronised spectacles",
    estimatedMinutes: 5,
    introduction: "Read the scientific report about the Great Barrier Reef, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Every year in late spring or early summer, following the full moon when sea temperatures rise above 26 degrees Celsius, Australia’s Great Barrier Reef hosts the largest mass reproduction event on Earth: coral spawning. Over several nights, hundreds of coral species release billions of tiny pink, orange, and white egg-and-sperm bundles into the sea simultaneously."
      },
      {
        id: 2,
        text: "This phenomenon transforms the ocean into an underwater snowstorm in reverse. Billions of buoyant bundles float slowly upward toward the surface. By releasing everything at the exact same hour, corals overwhelm hungry predators such as fish and crabs, ensuring that millions of fertilised larvae survive to drift on ocean currents and establish new colonies."
      },
      {
        id: 3,
        text: "Scientists use satellites and underwater drones to track coral slicks, which are so massive they can even be photographed from space. Understanding when corals spawn helps marine biologists protect reefs from pollution and collect larvae to restore damaged sections of this World Heritage wonder."
      }
    ],
    questions: [
      {
        id: "rq-coral-01",
        passageId: "passage-info-coral",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "following the full moon when sea temperatures rise above 26 degrees Celsius",
        prompt: "According to paragraph 1, what two environmental cues trigger coral spawning?",
        options: [
          "Winter storms and low tides",
          "The full moon and water temperatures over 26°C",
          "Heavy rainfall and solar eclipses",
          "Strong westerly winds and high waves"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 1 specifies the full moon and sea temperatures exceeding 26°C as the triggers."
      },
      {
        id: "rq-coral-02",
        passageId: "passage-info-coral",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "This phenomenon transforms the ocean into an underwater snowstorm in reverse.",
        prompt: "Why does the author describe the event as 'an underwater snowstorm in reverse'?",
        options: [
          "Because the sea water freezes into ice crystals",
          "Because millions of pale bundles float upward toward the surface instead of falling down",
          "Because the fish are frightened of the cold water",
          "Because it only happens during winter months"
        ],
        correctOptionIndex: 1,
        explanation: "Snow falls downward, but buoyant coral bundles drift upward, creating the reverse visual effect."
      },
      {
        id: "rq-coral-03",
        passageId: "passage-info-coral",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "corals overwhelm hungry predators such as fish and crabs, ensuring that millions of fertilised larvae survive",
        prompt: "What evolutionary advantage is gained by all corals releasing bundles at the exact same time?",
        options: [
          "It confuses predators and ensures more larvae survive being eaten",
          "It scares all the fish away permanently",
          "It cools the ocean down for swimming",
          "It keeps the water clear for sunlight"
        ],
        correctOptionIndex: 0,
        explanation: "Predator satiation: overwhelming numbers prevent fish from eating all larvae, allowing survival."
      },
      {
        id: "rq-coral-04",
        passageId: "passage-info-coral",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "coral slicks, which are so massive they can even be photographed from space.",
        prompt: "How large can coral slicks become during spawning?",
        options: [
          "Only as large as a dinner plate",
          "Visible only under a high-power microscope",
          "Massive enough to be photographed from space by satellites",
          "Covering only a single rock pool"
        ],
        correctOptionIndex: 2,
        explanation: "Paragraph 3 notes coral slicks are so vast they can be captured from orbiting satellites."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 20: POEM - SONG OF THE GUM TREE GULLY
  // =========================================================================
  {
    id: "passage-poem-gumtree",
    title: "Song of the Gum Tree Gully",
    genre: "Poem",
    subtitle: "A lyrical tribute to bush sounds at twilight",
    estimatedMinutes: 3,
    introduction: "Read the bush poem below, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The copper sun slips down the ridge,\nBeneath the timber wagon bridge,\nThe sleepy creek begins to hum,\nBeside the peeling ghost-bark gum."
      },
      {
        id: 2,
        text: "A chorus starts among the reeds,\nWhere cicadas tap on bamboo beads,\nAnd flying foxes take to flight,\nAcross the velvet cloak of night."
      },
      {
        id: 3,
        text: "The mopoke calls its gentle tune,\nTo greet the silver crescent moon,\nWhile nestled safe in hollow logs,\nThe possums sleep through chorus frogs."
      }
    ],
    questions: [
      {
        id: "rq-gum-01",
        passageId: "passage-poem-gumtree",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "Across the velvet cloak of night.",
        prompt: "In stanza 2, what does the poet compare the night sky to?",
        options: [
          "A timber bridge",
          "A velvet cloak",
          "A silver crescent",
          "A bamboo bead"
        ],
        correctOptionIndex: 1,
        explanation: "The metaphor 'velvet cloak of night' describes the dark, smooth night sky."
      },
      {
        id: "rq-gum-02",
        passageId: "passage-poem-gumtree",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "The sleepy creek begins to hum,",
        prompt: "Which poetic technique gives human actions to the creek in stanza 1?",
        options: [
          "Personification",
          "Alliteration",
          "Hyperbole",
          "Rhyming slang"
        ],
        correctOptionIndex: 0,
        explanation: "Describing a creek as 'sleepy' and able to 'hum' gives it human qualities (personification)."
      },
      {
        id: "rq-gum-03",
        passageId: "passage-poem-gumtree",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "The mopoke calls its gentle tune, / To greet the silver crescent moon,",
        prompt: "Which Australian night bird greets the crescent moon in stanza 3?",
        options: [
          "A kookaburra",
          "A mopoke (tawny frogmouth/boobook owl)",
          "A cockatoo",
          "A magpie"
        ],
        correctOptionIndex: 1,
        explanation: "Stanza 3 specifically names the mopoke calling its gentle tune."
      },
      {
        id: "rq-gum-04",
        passageId: "passage-poem-gumtree",
        cognitiveSkill: "Inference",
        paragraphRef: 1,
        evidenceQuote: "The copper sun slips down the ridge,",
        prompt: "What time of day is captured throughout the poem?",
        options: [
          "Early dawn",
          "Midday blazing heat",
          "Dusk turning into night",
          "Mid-morning recess"
        ],
        correctOptionIndex: 2,
        explanation: "The sun slipping down the ridge and the crescent moon rising depicts twilight/dusk."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 21: BAND 6+ TOP CENTILE NARRATIVE - THE DESERT OBSIDIAN
  // High-level Grade 3 vocabulary, rich figurative language, subtle inference
  // =========================================================================
  {
    id: "passage-band6-obsidian",
    title: "The Desert Obsidian",
    genre: "Narrative",
    subtitle: "A silent riddle across the red clay gibber plains",
    estimatedMinutes: 5,
    introduction: "Read the story below. Pay close attention to figurative language and underlying motivations, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The midday mirage shimmered like liquid silver across the gibber plains of the Sturt Stony Desert. Rowan paused beneath the sparse shade of a gnarled mulga tree, wiping red dust from his temples. Beside him, Uncle Daniel surveyed the flat horizon, his weathered eyes narrowing against the incandescent glare."
      },
      {
        id: 2,
        text: "‘Patience reveals what haste trampling underfoot misses,’ Uncle Daniel murmured, handing Rowan the canteen. Rowan nodded, chastened by his earlier reckless rush over the scree. He dropped to one knee, letting his gaze scan horizontally across the millions of wind-polished ironstone pebbles."
      },
      {
        id: 3,
        text: "Unlike the porous, ochre gravel surrounding it, one fragment trapped sunlight with glassy defiance. It was a flake of jet-black obsidian, no thicker than a coin, its edges serrated with micro-scallops formed thousands of years ago. Rowan did not reach to touch it. He simply traced its silhouette with his breath."
      },
      {
        id: 4,
        text: "‘A trade point,’ Daniel confirmed quietly, resting a hand on Rowan’s shoulder. ‘Carried hundreds of miles along ancient songlines from distant volcanic ranges. Some treasures belong only in memory, leaving the soil undisturbed.’ Rowan stood up, leaving the stone resting in its ancient bed of sand, his mind echoing with quiet reverence."
      }
    ],
    questions: [
      {
        id: "rq-obs-01",
        passageId: "passage-band6-obsidian",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "The midday mirage shimmered like liquid silver across the gibber plains",
        prompt: "What does the simile 'shimmered like liquid silver' convey about the desert environment?",
        options: [
          "The desert was freezing cold and covered in frost",
          "Intense heat was distorting the distant landscape into an illusion of water",
          "There was a large silver lake in the middle of the desert",
          "The ground was littered with metallic coins"
        ],
        correctOptionIndex: 1,
        explanation: "Heat mirages on arid ground create shimmering optical illusions resembling pools of silver liquid."
      },
      {
        id: "rq-obs-02",
        passageId: "passage-band6-obsidian",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "Rowan nodded, chastened by his earlier reckless rush over the scree.",
        prompt: "In paragraph 2, what does the word 'chastened' reveal about Rowan's emotional state?",
        options: [
          "He felt amused and proud of his running speed",
          "He felt subdued, humbled, and corrected by his uncle's wisdom",
          "He was furious and refused to listen",
          "He was completely exhausted and fell asleep"
        ],
        correctOptionIndex: 1,
        explanation: "'Chastened' means having a humbling realization after being corrected or reprimanded."
      },
      {
        id: "rq-obs-03",
        passageId: "passage-band6-obsidian",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "its edges serrated with micro-scallops formed thousands of years ago. Rowan did not reach to touch it.",
        prompt: "Why was the obsidian flake distinct from the surrounding gravel pebbles?",
        options: [
          "It had been freshly dropped by a modern hiker",
          "It was a glassy volcanic stone meticulously shaped by ancient human hands into a cutting tool",
          "It was glowing with radioactive heat",
          "It was the only stone made of rusted iron"
        ],
        correctOptionIndex: 1,
        explanation: "The serrated micro-scallops and glossy texture indicate it was knapped as an ancient trade tool."
      },
      {
        id: "rq-obs-04",
        passageId: "passage-band6-obsidian",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "Some treasures belong only in memory, leaving the soil undisturbed.",
        prompt: "What cultural value does Uncle Daniel impart to Rowan in the final paragraph?",
        options: [
          "Valuable stones should always be sold to museums for profit",
          "Ancient artifacts carry sacred history that should be respected and left undisturbed where they rest",
          "Obsidian tools are fragile and will break if carried",
          "Exploring the desert without maps is dangerous"
        ],
        correctOptionIndex: 1,
        explanation: "Uncle Daniel teaches cultural respect for Indigenous heritage, prioritizing conservation over collection."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 22: BAND 6+ TOP CENTILE INFORMATIONAL - BIONIC EYES & NEURAL RETINAS
  // Scientific exposition with complex terminology and cause-and-effect reasoning
  // =========================================================================
  {
    id: "passage-band6-bionics",
    title: "Engineering the Bionic Eye",
    genre: "Informational",
    subtitle: "Australian biomedical innovation bridging light and the human brain",
    estimatedMinutes: 5,
    introduction: "Read the scientific report below about neural engineering, then answer the comprehension questions.",
    paragraphs: [
      {
        id: 1,
        text: "Human vision is a biological marvel: the retina at the back of the eye contains over 120 million photoreceptor cells that translate photons of light into electrical impulses. However, degenerative conditions such as retinitis pigmentosa cause these photoreceptors to gradually deteriorate, severing communication with the brain while leaving underlying optic nerve fibers intact."
      },
      {
        id: 2,
        text: "To restore visual perception, biomedical engineers in Melbourne designed a revolutionary retinal prosthesis commonly known as the 'bionic eye'. The device consists of three integrated components: miniature digital cameras mounted on ordinary eyeglass frames, an external pocket processor that converts video into radio frequencies, and a microscopic platinum electrode array implanted behind the retina."
      },
      {
        id: 3,
        text: "When the cameras capture a scene, the processor converts the visual landscape into coded electrical pulses. The implanted array bypasses dead photoreceptors entirely, firing tiny electrical charges directly into surviving ganglion cells. The optic nerve then relays these signals to the visual cortex, allowing the patient to perceive patterns of light called 'phosphenes'."
      },
      {
        id: 4,
        text: "While bionic vision does not yet replicate crystal-clear biological eyesight, it provides vital navigational landmarks—allowing previously sightless individuals to detect doorways, locate crosswalks, and recognize the silhouettes of loved ones."
      }
    ],
    questions: [
      {
        id: "rq-bio-01",
        passageId: "passage-band6-bionics",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "severing communication with the brain while leaving underlying optic nerve fibers intact.",
        prompt: "What crucial anatomical feature remains functional in patients with retinitis pigmentosa that allows a bionic eye to work?",
        options: [
          "The cornea and lens muscles",
          "The underlying optic nerve and ganglion cells",
          "The damaged photoreceptor cells",
          "The tear ducts and eyelids"
        ],
        correctOptionIndex: 1,
        explanation: "Because optic nerve fibers remain intact, electrical pulses can still travel to the brain's visual cortex."
      },
      {
        id: "rq-bio-02",
        passageId: "passage-band6-bionics",
        cognitiveSkill: "Author Craft",
        paragraphRef: 3,
        evidenceQuote: "The implanted array bypasses dead photoreceptors entirely, firing tiny electrical charges directly into surviving ganglion cells.",
        prompt: "Which step best summarizes how the bionic eye circumvents damaged cells in the eye?",
        options: [
          "It injects medicine directly into the cornea",
          "It uses camera data to directly stimulate surviving nerve cells, skipping non-functioning photoreceptors",
          "It replaces the entire eyeball with glass lenses",
          "It magnifies light so dead cells can see again"
        ],
        correctOptionIndex: 1,
        explanation: "The platinum electrode array directly electrifies surviving ganglion cells, bypassing dead receptors."
      },
      {
        id: "rq-bio-03",
        passageId: "passage-band6-bionics",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 3,
        evidenceQuote: "allowing the patient to perceive patterns of light called 'phosphenes'.",
        prompt: "What does the term 'phosphenes' refer to in the context of paragraph 3?",
        options: [
          "Dangerous eye infections caused by metal implants",
          "Artificial sparks or visual dots of light perceived through electrical stimulation",
          "The radio frequencies transmitted by the pocket computer",
          "Special colored lenses worn by surgeons"
        ],
        correctOptionIndex: 1,
        explanation: "Phosphenes are the visual sensation of light flashes or glowing dots triggered non-optically by electrodes."
      },
      {
        id: "rq-band-04",
        passageId: "passage-band6-bionics",
        cognitiveSkill: "Inference",
        paragraphRef: 4,
        evidenceQuote: "allows previously sightless individuals to detect doorways, locate crosswalks, and recognize the silhouettes of loved ones.",
        prompt: "What is the primary practical benefit of the bionic eye for recipients today?",
        options: [
          "Reading fine print in books with microscope vision",
          "Regaining independence in navigation and obstacle detection in daily life",
          "Seeing in the dark like nocturnal predators",
          "Replacing natural vision with photographic memory"
        ],
        correctOptionIndex: 1,
        explanation: "Detecting outlines, doorways, and crosswalks grants essential mobility and autonomy to visually impaired patients."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 23: BAND 6+ TOP CENTILE PERSUASIVE - SHOULD AI GENERATE ART?
  // Philosophical debate, rhetorical evaluation, nuanced author perspective
  // =========================================================================
  {
    id: "passage-band6-ai-art",
    title: "Brushstrokes vs. Algorithms: The Soul of Human Art",
    genre: "Persuasive",
    subtitle: "Why artificial intelligence can never replace true human creativity",
    estimatedMinutes: 5,
    introduction: "Read the debate essay below, analyzing the author's arguments and rhetorical evidence.",
    paragraphs: [
      {
        id: 1,
        text: "With a single typed text prompt, modern computer software can assemble an oil painting in the style of Rembrandt or synthesize a whimsical digital landscape in seconds. Enthusiasts trumpet this as the democratization of creativity. Yet to equate computer-generated output with genuine artistic creation is to mistake a statistical regurgitation for human soul."
      },
      {
        id: 2,
        text: "True art does not arise in a vacuum of silicon and mathematical weights; it is born from lived vulnerability. When Vincent van Gogh brushed thick cobalt swirls onto canvas in 'The Starry Night', he was not calculating pixel frequencies—he was externalizing profound loneliness, wonder, and human ache. Machines possess no childhood memories, no heartache, and no mortality. Without genuine experience, computer output remains merely decorative mimicry."
      },
      {
        id: 3,
        text: "Furthermore, algorithmic generation relies entirely on scraping billions of human creations without consent or attribution. Rewarding software with the title of 'artist' dishonors the years of agonizing practice, calloused hands, and personal sacrifices made by living illustrators and painters."
      },
      {
        id: 4,
        text: "Technology may serve as a formidable tool in an artist’s studio, but it must remain the chisel, never the sculptor. We must celebrate and safeguard the imperfect, passionate human spirit that makes art uniquely transcendent."
      }
    ],
    questions: [
      {
        id: "rq-ai-01",
        passageId: "passage-band6-ai-art",
        cognitiveSkill: "Main Idea",
        paragraphRef: 1,
        evidenceQuote: "to equate computer-generated output with genuine artistic creation is to mistake a statistical regurgitation for human soul.",
        prompt: "What is the author’s primary contention regarding AI image generation?",
        options: [
          "Computers make painting faster and better than human artists",
          "Automated software mimics visual styles through math but lacks real emotional depth and human soul",
          "Paintbrushes should be banned in primary schools",
          "Only oil paintings should be considered authentic art"
        ],
        correctOptionIndex: 1,
        explanation: "The author argues that while AI replicates patterns mathematically, it lacks authentic human emotional experience."
      },
      {
        id: "rq-ai-02",
        passageId: "passage-band6-ai-art",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "he was not calculating pixel frequencies—he was externalizing profound loneliness, wonder, and human ache.",
        prompt: "Why does the author cite Vincent van Gogh’s 'The Starry Night' in paragraph 2?",
        options: [
          "To prove Van Gogh used computer algorithms to calculate color tones",
          "To provide a vivid contrast showing that real masterpieces stem from human emotion rather than data calculation",
          "To argue that Van Gogh was unappreciated in his own lifetime",
          "To encourage readers to visit European art galleries"
        ],
        correctOptionIndex: 1,
        explanation: "Van Gogh serves as evidence that human vulnerability and feeling are the true catalysts for artistic masterpieces."
      },
      {
        id: "rq-ai-03",
        passageId: "passage-band6-ai-art",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "technology must remain the chisel, never the sculptor.",
        prompt: "What does the metaphor 'it must remain the chisel, never the sculptor' mean?",
        options: [
          "Artists should only carve statues from marble",
          "Technology is a helpful instrument controlled by humans, not the conscious creator itself",
          "Chisels are sharper and more reliable than modern software",
          "Sculptors do not need technology to create statues"
        ],
        correctOptionIndex: 1,
        explanation: "A chisel is merely an inanimate tool; the human sculptor is the visionary agent directing it."
      },
      {
        id: "rq-ai-04",
        passageId: "passage-band6-ai-art",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "Enthusiasts trumpet this as the democratization of creativity.",
        prompt: "What does the author imply by the word 'trumpet' in paragraph 1?",
        options: [
          "Enthusiasts play loud brass instruments in concert",
          "Supporters proclaim and celebrate the technology loudly and proudly",
          "Critics complain about excessive volume",
          "Software makes horn noises when rendering images"
        ],
        correctOptionIndex: 1,
        explanation: "To 'trumpet' something means to announce or celebrate it publicly and boastfully."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 24: INFORMATIONAL - SURVIVING THE ICE CONTINENT (Antarctic Research)
  // =========================================================================
  {
    id: "passage-hard-antarctica",
    title: "Mawson's Frozen Frontier: Life at Casey Station",
    genre: "Informational",
    subtitle: "The brutal science and ingenuity required to endure an Antarctic blizzard",
    estimatedMinutes: 5,
    introduction: "Read the scientific report below about Australia's research operations in Antarctica, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Perched on the windswept edge of Vincennes Bay, Casey Station is one of Australia’s permanent outposts on the Antarctic ice cap. In midwinter, temperatures plummet past minus forty degrees Celsius, while katabatic winds—dense, cold air dragged downslope by gravity from the high polar plateau—howl at over two hundred kilometres per hour, blinding the station in scouring whiteouts."
      },
      {
        id: 2,
        text: "Under such extreme meteorological conditions, human tissue freezes within minutes. To move between sleeping quarters, laboratories, and the meteorological balloon shed, expeditioners clip carabiners onto heavy static guide ropes called 'blizz lines'. If someone loses contact with the line during a sudden whiteout, they can become disoriented only five paces from safety, unable to distinguish sky from ice."
      },
      {
        id: 3,
        text: "The main living facility, dubbed the 'Red Shed', is suspended on elevated steel stilts high above the rocky ground. This aerodynamic design allows fierce gale winds to funnel cleanly beneath the building rather than colliding against flat walls, preventing monumental snowdrifts from burying doorways and smothering air intake shafts."
      },
      {
        id: 4,
        text: "Despite the biting isolation, station scientists perform critical planetary health checks: drilling ice cores that trap ancient atmospheric bubbles from eight hundred thousand years ago, monitoring ozone depletion, and tracking emperor penguin colonies by satellite to assess changing sea ice patterns."
      }
    ],
    questions: [
      {
        id: "rq-ant-01",
        passageId: "passage-hard-antarctica",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "katabatic winds—dense, cold air dragged downslope by gravity from the high polar plateau",
        prompt: "According to paragraph 1, what physical force generates katabatic winds in Antarctica?",
        options: [
          "Ocean waves crashing against the ice shelves",
          "Gravity pulling dense, frigid air down steep slopes from the polar plateau",
          "Solar flares warming the upper atmosphere",
          "Magnetic attraction around the South Pole"
        ],
        correctOptionIndex: 1,
        explanation: "The text explains that katabatic winds occur when gravity drags dense cold air downslope from the high polar plateau."
      },
      {
        id: "rq-ant-02",
        passageId: "passage-hard-antarctica",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "unable to distinguish sky from ice.",
        prompt: "Why is a 'whiteout' described as so perilous for an expeditioner caught outside without a blizz line?",
        options: [
          "The static ropes attract dangerous lightning strikes",
          "Extreme wind and snow erase all visual horizon and shadows, causing total spatial disorientation",
          "Penguins attack humans who lose their footing",
          "The ice instantly cracks into deep crevasses"
        ],
        correctOptionIndex: 1,
        explanation: "In a whiteout, diffuse light and flying snow obliterate contrast, making it impossible to see where ground ends and sky begins."
      },
      {
        id: "rq-ant-03",
        passageId: "passage-hard-antarctica",
        cognitiveSkill: "Author Craft",
        paragraphRef: 3,
        evidenceQuote: "This aerodynamic design allows fierce gale winds to funnel cleanly beneath the building",
        prompt: "What primary architectural problem does elevating the Red Shed on steel stilts solve?",
        options: [
          "It keeps polar bears from climbing inside the windows",
          "It prevents giant snowdrifts from accumulating and burying doors or choking air vents",
          "It provides space underneath to park aeroplanes",
          "It absorbs earthquakes caused by moving glaciers"
        ],
        correctOptionIndex: 1,
        explanation: "By letting wind rush underneath the building, snow cannot pack against the walls to block exits or air shafts."
      },
      {
        id: "rq-ant-04",
        passageId: "passage-hard-antarctica",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 4,
        evidenceQuote: "drilling ice cores that trap ancient atmospheric bubbles from eight hundred thousand years ago",
        prompt: "What evidence trapped inside deep Antarctic ice cores allows scientists to study Earth's historical climate?",
        options: [
          "Fossilised penguin bones preserved in ice",
          "Microscopic pockets of ancient atmospheric gas bubbles",
          "Frozen volcanic ash from meteorite impacts",
          "Ancient tree seeds buried under glaciers"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 4 explicitly notes that ice cores trap ancient atmospheric bubbles dating back 800,000 years."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 25: NARRATIVE - THE DEEP TRENCH GLIDER
  // =========================================================================
  {
    id: "passage-hard-trench",
    title: "Voyage into the Abyss",
    genre: "Narrative",
    subtitle: "A tense descent into the deepest trench of the Indian Ocean",
    estimatedMinutes: 5,
    introduction: "Read the suspenseful underwater story below, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The titanium pressure sphere of the submersible Deep Hunter groggily creaked as it passed four thousand metres below sea level. Outside the quartz viewing port, daylight had vanished kilometres above into an absolute, suffocating void. Ayla adjusted her oxygen regulators, monitoring the telemetry screens while Captain Tariq adjusted the buoyancy thrusters."
      },
      {
        id: 2,
        text: "At six thousand metres inside the Diamantina Fracture Zone, the pressure outside reached six hundred atmospheres—equivalent to the weight of fifty jumbo jets stacked onto a single person. Suddenly, the sonar beacon pinged erratically. A sharp alarm shrilled from the starboard ballast manifold: 'Hydraulic Pressure Drop 18%'."
      },
      {
        id: 3,
        text: "‘Secondary seals are warping under the cold,’ Tariq said, his voice clipped but remarkably level. ‘If the hydraulic fluid thickens to gel, the buoyancy weights won't release. We’ll be tethered to the sea floor forever.’ Ayla didn't panic. Recalling her engineering drills, she reached for the manual bypass lever located behind the primary pilot console, using a steel cheater bar to give her small hands leverage."
      },
      {
        id: 4,
        text: "With a grinding metallic thud that shuddered through the entire hull, the mechanical emergency pins severed. Three tons of iron drop-weights detached into the abyss. Deep Hunter immediately tilted upward, accelerating toward the warmth of the sunlit surface as both pilots released a long, trembling breath."
      }
    ],
    questions: [
      {
        id: "rq-tre-01",
        passageId: "passage-hard-trench",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "daylight had vanished kilometres above into an absolute, suffocating void.",
        prompt: "In paragraph 1, what does the phrase 'suffocating void' emphasize about the deep-ocean environment?",
        options: [
          "The air inside the submarine was polluted",
          "The overwhelming, total blackness and terrifying emptiness of the deep water",
          "The ocean had run out of liquid water",
          "Fish were swarming against the porthole glass"
        ],
        correctOptionIndex: 1,
        explanation: "'Suffocating void' describes complete sensory darkness and the crushing, desolate nature of deep ocean trenches."
      },
      {
        id: "rq-tre-02",
        passageId: "passage-hard-trench",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "equivalent to the weight of fifty jumbo jets stacked onto a single person.",
        prompt: "Why did the author use the comparison to 'fifty jumbo jets'?",
        options: [
          "To explain how airplanes are transported across oceans",
          "To provide a dramatic, relatable comparison showing the immense physical water pressure",
          "To suggest the submarine was built from aeroplane parts",
          "To hint that an aircraft had crashed into the trench"
        ],
        correctOptionIndex: 1,
        explanation: "Comparing 600 atmospheres of pressure to 50 stacked jets helps young readers conceptualize extreme force."
      },
      {
        id: "rq-tre-03",
        passageId: "passage-hard-trench",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "using a steel cheater bar to give her small hands leverage.",
        prompt: "Why did Ayla use a steel cheater bar on the manual bypass lever?",
        options: [
          "To break the viewing window",
          "To multiply her physical strength so she could turn a frozen, high-resistance mechanical valve",
          "To fend off deep-sea creatures",
          "To test the electrical wiring for shorts"
        ],
        correctOptionIndex: 1,
        explanation: "A cheater bar extends a lever arm, providing mechanical advantage (leverage) to overcome heavy resistance."
      },
      {
        id: "rq-tre-04",
        passageId: "passage-hard-trench",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "Three tons of iron drop-weights detached into the abyss. Deep Hunter immediately tilted upward",
        prompt: "What fundamental scientific principle allowed the submarine to escape the sea floor?",
        options: [
          "Dropping heavy ballast reduced the sub's mass, making its overall density lower than the water and creating positive buoyancy",
          "The engines burned rocket fuel to push against gravity",
          "Magnetic fields pulled the titanium sphere to the surface",
          "Warmer water pushed the sub like a bubble"
        ],
        correctOptionIndex: 0,
        explanation: "Releasing drop-weights makes the vessel lighter than the displaced water, triggering positive buoyant rise."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 26: PERSUASIVE - CITIES OF SPONGE: BANISHING FLASH FLOODS
  // =========================================================================
  {
    id: "passage-hard-sponge",
    title: "Cities of Sponge: Transforming Concrete into Nature",
    genre: "Persuasive",
    subtitle: "Why paving our suburbs in concrete is a disastrous 19th-century mistake",
    estimatedMinutes: 5,
    introduction: "Read this urban planning opinion article, evaluating the author's logic and evidence.",
    paragraphs: [
      {
        id: 1,
        text: "Whenever a tropical thunderstorm breaks over our modern cities, millions of litres of rain strike impermeable bitumen roads, concrete driveways, and corrugated tin roofs. Unable to soak into the earth, this deluge rushes into storm drains like an express train, overwhelming gutters and triggering catastrophic flash floods across low-lying suburbs."
      },
      {
        id: 2,
        text: "For over a century, urban planners treated rainwater as a nuisance to be evacuated as fast as concrete tunnels would permit. This philosophy is backwards. By paving over every patch of topsoil, we starve groundwater aquifers, superheat our streets during summer heatwaves, and flush toxic tire pollutants directly into clean rivers."
      },
      {
        id: 3,
        text: "The solution is the 'Sponge City' model. Rather than funneling stormwater away, towns should be re-engineered to absorb, cleanse, and reuse rainfall. Permeable interlocking pavers allow water to trickle through footpaths. Sunken community rain gardens planted with native sedges filter road oils naturally while retaining flood surges."
      },
      {
        id: 4,
        text: "Critics complain that replacing asphalt with wetlands and porous pavement is financially burdensome. Yet the cost of retrofitting urban catchments is trivial compared to paying hundreds of millions in disaster recovery after every predictable flood. It is time we stopped fighting rain and invited it back into the soil."
      }
    ],
    questions: [
      {
        id: "rq-spg-01",
        passageId: "passage-hard-sponge",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "millions of litres of rain strike impermeable bitumen roads",
        prompt: "What does the word 'impermeable' mean as used in paragraph 1?",
        options: [
          "Cracked and full of holes",
          "Not allowing liquid to pass through or soak in",
          "Extremely expensive to build",
          "Painted with reflective bright colors"
        ],
        correctOptionIndex: 1,
        explanation: "'Impermeable' describes substances (like concrete or bitumen) through which fluids cannot penetrate."
      },
      {
        id: "rq-spg-02",
        passageId: "passage-hard-sponge",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "urban planners treated rainwater as a nuisance to be evacuated as fast as concrete tunnels would permit.",
        prompt: "How does the author critique historical drainage design in paragraph 2?",
        options: [
          "By praising the builders of underground drains",
          "By showing that rushing stormwater into pipes creates worse downstream problems like aquifer depletion and river pollution",
          "By proving that concrete tunnels never leak",
          "By arguing that roads should never be built near rivers"
        ],
        correctOptionIndex: 1,
        explanation: "The author points out that traditional drainage dries out aquifers and flushes toxic runoff into rivers."
      },
      {
        id: "rq-spg-03",
        passageId: "passage-hard-sponge",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "Sunken community rain gardens planted with native sedges filter road oils naturally while retaining flood surges.",
        prompt: "According to paragraph 3, what double benefit do sunken rain gardens provide?",
        options: [
          "They grow fruits for supermarkets and block wind",
          "They filter harmful oils with native plants while storing excess flood water",
          "They provide parking spaces during summer droughts",
          "They replace electricity wires underground"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 3 explicitly states rain gardens filter road oils naturally and retain storm surges."
      },
      {
        id: "rq-spg-04",
        passageId: "passage-hard-sponge",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "the cost of retrofitting urban catchments is trivial compared to paying hundreds of millions in disaster recovery",
        prompt: "How does the author rebut the financial argument against Sponge Cities?",
        options: [
          "By arguing that building sponge infrastructure is cheaper than repeatedly paying for catastrophic flood recovery",
          "By asking residents to donate money directly",
          "By suggesting that private insurance companies pay for road repairs",
          "By recommending people move away from cities"
        ],
        correctOptionIndex: 0,
        explanation: "The author demonstrates that preventative sponge infrastructure costs far less than perpetual disaster cleanup."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 27: POEM - THE BLACKSMITH'S SPARK
  // =========================================================================
  {
    id: "passage-hard-blacksmith",
    title: "The Song of the Anvil",
    genre: "Poem",
    subtitle: "Rhythm, heat, and metal craft in an old pioneer forge",
    estimatedMinutes: 4,
    introduction: "Read the rhythmic poem below about a historic forge. Note rhyme scheme and auditory imagery.",
    paragraphs: [
      {
        id: 1,
        text: "The leather bellows wheeze and blow,\nTo nurse the slumbering hearth aglow;\nA serpent's breath of ember sparks,\nLeaps up against the rafters dark,\nWhere charcoal sighs and iron bleeds,\nTo answer humankind’s rough needs."
      },
      {
        id: 2,
        text: "Clutched in the tongs, a scarlet bar,\nAs fiery as a fallen star;\nIt meets the anvil’s polished cheek,\nWith ring and chiming, fierce and bleak!\nThe heavy sledge strikes stroke for stroke,\nAmid a swirling shroud of smoke."
      },
      {
        id: 3,
        text: "Then plunging in the quenching tub,\nWith angry hiss and boiling scrub,\nThe steam bursts forth in ghostly white,\nTo cool the metal from the night:\nA horseshoe curved, an axle true,\nForged from the flame and born anew."
      }
    ],
    questions: [
      {
        id: "rq-bs-01",
        passageId: "passage-hard-blacksmith",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "Where charcoal sighs and iron bleeds,",
        prompt: "What poetic device is used in the line 'Where charcoal sighs and iron bleeds'?",
        options: [
          "Personification",
          "Hyperbole",
          "Onomatopoeia",
          "Limerick"
        ],
        correctOptionIndex: 0,
        explanation: "Giving human traits (sighing, bleeding) to inanimate materials (charcoal, iron) is personification."
      },
      {
        id: "rq-bs-02",
        passageId: "passage-hard-blacksmith",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "A scarlet bar, / As fiery as a fallen star;",
        prompt: "Why is the iron bar described as 'scarlet' and 'as fiery as a fallen star'?",
        options: [
          "It has been painted with bright red enamel",
          "It has been heated white-hot and glowing red in the forge fire",
          "It fell from an asteroid outside the shop",
          "It was carved from red cedar timber"
        ],
        correctOptionIndex: 1,
        explanation: "Metals heated to forge temperatures glow bright cherry-red to yellow, radiating intense heat."
      },
      {
        id: "rq-bs-03",
        passageId: "passage-hard-blacksmith",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "Then plunging in the quenching tub, / With angry hiss and boiling scrub,",
        prompt: "What is the purpose of plunging the hot iron into the 'quenching tub' filled with water?",
        options: [
          "To wash away dirty coal dust",
          "To rapidly cool the glowing metal, locking its forged shape and hardening the steel",
          "To extinguish an accidental floor fire",
          "To test if the metal will float"
        ],
        correctOptionIndex: 1,
        explanation: "Quenching is a metallurgy process where rapid cooling in water hardens shaped iron."
      },
      {
        id: "rq-bs-04",
        passageId: "passage-hard-blacksmith",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "A horseshoe curved, an axle true, / Forged from the flame and born anew.",
        prompt: "What two practical objects were created by the blacksmith in stanza 3?",
        options: [
          "A sword and a shield",
          "A horseshoe and a wagon axle",
          "A cooking pot and a door key",
          "A ship anchor and a fishing hook"
        ],
        correctOptionIndex: 1,
        explanation: "Stanza 3 concludes by naming 'a horseshoe curved, an axle true'."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 28: INFORMATIONAL - MYCORRHIZAL NETWORKS: THE WOOD WIDE WEB
  // =========================================================================
  {
    id: "passage-hard-fungi",
    title: "The Wood Wide Web: Underground Fungal Networks",
    genre: "Informational",
    subtitle: "How microscopic forest fungi trade nutrients and transmit chemical warnings",
    estimatedMinutes: 5,
    introduction: "Read the biological study below detailing underground forest communication.",
    paragraphs: [
      {
        id: 1,
        text: "When walking through a quiet eucalyptus forest, trees appear as solitary pillars competing against one another for sunlight and rain. Beneath the damp soil, however, lies an astonishing cooperative network. Thread-like fungal structures called hyphae intertwine with tree roots, forming symbiotic partnerships known as mycorrhizal networks."
      },
      {
        id: 2,
        text: "This biological highway is not charitable; it is a sophisticated trade marketplace. Trees cannot absorb phosphorus and nitrogen efficiently from rocky dirt, while fungi lack leaves to perform photosynthesis. Through this subterranean exchange, trees supply fungi with carbon sugars in return for vital minerals gathered by fungal filaments across vast forest floors."
      },
      {
        id: 3,
        text: "Even more extraordinary is the network’s communication capacity. When caterpillars attack a gum tree’s foliage, the wounded tree pulses biochemical warning signals through the fungal grid to neighboring trees. Warned in advance of the advancing pests, nearby trees immediately pump bitter tannins and protective toxins into their leaves before a single caterpillar crawls onto their branches."
      },
      {
        id: 4,
        text: "Old, mature trees—frequently called 'Mother Trees' by forest ecologists—act as central network hubs. If a young seedling germinates in deep understory shade without adequate sunlight, connected Mother Trees channel life-saving carbon directly into the sapling's root system, keeping it alive until a canopy gap opens."
      }
    ],
    questions: [
      {
        id: "rq-fun-01",
        passageId: "passage-hard-fungi",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "forming symbiotic partnerships known as mycorrhizal networks.",
        prompt: "What does the word 'symbiotic' mean in biological terms?",
        options: [
          "A relationship where one organism kills another for food",
          "A mutually beneficial relationship where both organisms rely upon and aid each other",
          "An artificial chemical added by human farmers",
          "A disease that rots tree leaves"
        ],
        correctOptionIndex: 1,
        explanation: "Symbiosis describes cooperative ecological interactions where both species gain mutual advantage."
      },
      {
        id: "rq-fun-02",
        passageId: "passage-hard-fungi",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 2,
        evidenceQuote: "trees supply fungi with carbon sugars in return for vital minerals gathered by fungal filaments",
        prompt: "According to paragraph 2, what exact trade occurs between trees and fungi?",
        options: [
          "Trees give shade, while fungi provide water droplets",
          "Trees provide carbon sugars from photosynthesis, while fungi provide phosphorus and nitrogen minerals",
          "Trees provide seeds, while fungi provide flowers",
          "Trees provide oxygen, while fungi provide carbon dioxide"
        ],
        correctOptionIndex: 1,
        explanation: "Trees manufacture sugars via photosynthesis to trade for minerals fungi extract from rock and soil."
      },
      {
        id: "rq-fun-03",
        passageId: "passage-hard-fungi",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "nearby trees immediately pump bitter tannins and protective toxins into their leaves before a single caterpillar crawls onto their branches.",
        prompt: "What strategic advantage do neighboring trees gain from underground chemical warning signals?",
        options: [
          "They can drop their leaves to sleep through winter",
          "They can preemptively produce defensive toxins so invading pests find their leaves unpalatable and toxic",
          "They can grow taller than the infected tree",
          "They can attract birds to eat the caterpillars"
        ],
        correctOptionIndex: 1,
        explanation: "Receiving advance warning allows trees to synthetically produce defensive chemicals before caterpillars arrive."
      },
      {
        id: "rq-fun-04",
        passageId: "passage-hard-fungi",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "connected Mother Trees channel life-saving carbon directly into the sapling's root system",
        prompt: "Why does the author refer to mature trees as 'Mother Trees' in paragraph 4?",
        options: [
          "Because they are the only trees that produce fruit",
          "To highlight their nurturing ecological role in sustaining young seedlings through shared resources",
          "Because they are physically shaped like human mothers",
          "To indicate that they will soon fall over"
        ],
        correctOptionIndex: 1,
        explanation: "'Mother Trees' metaphorically highlights their nurturing role supporting vulnerable saplings in the understory."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 29: NARRATIVE - THE AVALANCHE DOG OF MOUNT KOSCIUSZKO
  // =========================================================================
  {
    id: "passage-hard-avalanche",
    title: "Scent on the Snow: Blitz at Charlotte Pass",
    genre: "Narrative",
    subtitle: "A search-and-rescue team races against freezing seconds in the Snowy Mountains",
    estimatedMinutes: 5,
    introduction: "Read the dramatic alpine story below, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "The siren atop the Mount Kosciuszko ranger station cut through the howling blizzard with shrill urgency. A massive snow cornice had collapsed above Club Lake, triggering a category-three avalanche that swept two backcountry snowboarders down the cirque. Ski Patrol Officer Elena strapped the GPS transponder collar around Blitz, an athletic German Shepherd with razor-sharp working instincts."
      },
      {
        id: 2,
        text: "At the debris zone, the snowfield resembled a violent ocean of shattered ice boulders frozen mid-churn. Wind screamed at sixty knots, whipping ice crystals into Elena’s goggles. Conventional avalanche beacons were returning garbled interference from the fractured granite cliffs. ‘Find them, Blitz! Search!’ Elena commanded, unhooking his harness."
      },
      {
        id: 3,
        text: "Blitz didn't rely on sight or technology; he pressed his black nose inches from the powdery crust, weaving in zigzag quadrants across the slope. His olfactory receptors—over two hundred million times more sensitive than a human's—could pinpoint faint human scent particles percolating through two metres of compressed snowpack."
      },
      {
        id: 4,
        text: "Four minutes into the search, Blitz halted on a down-slope wind-drift, his ears snapping forward. He let out a sharp, piercing bark, then began frantic, piston-like digging with his front paws. Elena skied over instantly, sinking an aluminium avalanche probe into the drift. At 1.4 metres, the tip struck soft nylon. ‘Strike!’ Elena shouted to the shoveling crew. Blitz's nose had found life in the freezing dark."
      }
    ],
    questions: [
      {
        id: "rq-ava-01",
        passageId: "passage-hard-avalanche",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "the snowfield resembled a violent ocean of shattered ice boulders frozen mid-churn.",
        prompt: "What does the metaphor 'a violent ocean of shattered ice boulders frozen mid-churn' illustrate?",
        options: [
          "The avalanche had dumped liquid salt water over the mountain",
          "The chaotic, turbulent, and dangerous texture of compressed avalanche debris",
          "A calm frozen lake suitable for ice skating",
          "Snow that had completely melted away"
        ],
        correctOptionIndex: 1,
        explanation: "The vivid metaphor describes the violent, jumbled piles of compacted snow blocks following a slide."
      },
      {
        id: "rq-ava-02",
        passageId: "passage-hard-avalanche",
        cognitiveSkill: "Inference",
        paragraphRef: 2,
        evidenceQuote: "Conventional avalanche beacons were returning garbled interference from the fractured granite cliffs.",
        prompt: "Why was Blitz's role so essential during this rescue operation?",
        options: [
          "The rescue helicopters had run out of fuel",
          "Electronic transceiver beacons were malfunctioning due to granite cliff interference, leaving scent tracking as the sole hope",
          "Snowboarders do not carry backpacks",
          "Dogs can run faster downhill than skis"
        ],
        correctOptionIndex: 1,
        explanation: "Because electronics suffered geological interference, Blitz's olfactory tracking was the only viable location method."
      },
      {
        id: "rq-ava-03",
        passageId: "passage-hard-avalanche",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "weaving in zigzag quadrants across the slope. His olfactory receptors—over two hundred million times more sensitive than a human's",
        prompt: "How did Blitz search the slope to locate trapped humans under snowpack?",
        options: [
          "By digging holes randomly every ten metres",
          "By running in circles around Elena's skis",
          "By executing disciplined zigzag sweeps using powerful olfactory scent detection",
          "By barking loudly to listen for human voices"
        ],
        correctOptionIndex: 2,
        explanation: "Paragraph 3 explains Blitz systematically worked in zigzag quadrants using his 200-million olfactory receptors."
      },
      {
        id: "rq-ava-04",
        passageId: "passage-hard-avalanche",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 4,
        evidenceQuote: "At 1.4 metres, the tip struck soft nylon. ‘Strike!’ Elena shouted to the shoveling crew.",
        prompt: "In search-and-rescue terminology, what does shouting 'Strike!' signify?",
        options: [
          "A lightning bolt hit the mountain",
          "The search probe made physical contact with a buried victim, confirming their exact location",
          "The searchers are going on strike and stopping work",
          "A clock chimed the hour"
        ],
        correctOptionIndex: 1,
        explanation: "A 'strike' in avalanche rescue confirms the probe has touched a trapped person's gear under the snow."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 30: INFORMATIONAL - MARS ROVER SAMPLE DRILLING: JEZERO CRATER
  // =========================================================================
  {
    id: "passage-hard-mars",
    title: "Probing Ancient Lakes on Mars: The Perseverance Rover",
    genre: "Informational",
    subtitle: "How robotic geologists core rocks millions of kilometres from Earth",
    estimatedMinutes: 5,
    introduction: "Read this planetary science article about exploration on the Red Planet.",
    paragraphs: [
      {
        id: 1,
        text: "More than two hundred million kilometres across interplanetary vacuum, a six-wheeled robotic scientist named Perseverance crawls across the rust-red gravel of Jezero Crater on Mars. Billions of years ago, when Mars maintained a dense atmosphere and warm climate, Jezero was a shimmering lake fed by a rushing river that deposited a sprawling sediment delta."
      },
      {
        id: 2,
        text: "Sedimentary mudstones and clay layers are prime targets for astrobiologists because on Earth, ancient lakebeds frequently preserve fossilized micro-organisms called biosignatures. To extract pristine samples, Perseverance wields a two-metre robotic arm tipped with a percussive rotary drill that hammers diamond-toothed bits into bedrock without lubricating water."
      },
      {
        id: 3,
        text: "Once a rock core the size of a stick of chalk is hollowed out, the rover inspects the core with microscopic cameras and spectroscopic lasers to ensure sample integrity. It then seals the specimen inside a hermetically welded titanium tube and drops it onto the Martian surface as part of a distributed sample depot for a future international return mission."
      },
      {
        id: 4,
        text: "Because radio signals take between five and twenty minutes to travel between Earth and Mars, human engineers in California cannot drive the rover with joysticks. Instead, Perseverance relies on autonomous navigation algorithms, calculating its own hazard-free pathways across boulder fields using dual stereo vision."
      }
    ],
    questions: [
      {
        id: "rq-mar-01",
        passageId: "passage-hard-mars",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 1,
        evidenceQuote: "Jezero was a shimmering lake fed by a rushing river that deposited a sprawling sediment delta.",
        prompt: "Why was Jezero Crater chosen as the landing site for the Perseverance rover?",
        options: [
          "It contains the highest active volcano in the solar system",
          "It is an ancient dried lakebed and river delta where water once flowed and sediments accumulated",
          "It is the only flat landing area on Mars with liquid water today",
          "Astronauts built a base there twenty years ago"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 1 states Jezero was an ancient lake fed by a river delta, making it ideal for finding fossil biosignatures."
      },
      {
        id: "rq-mar-02",
        passageId: "passage-hard-mars",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 2,
        evidenceQuote: "ancient lakebeds frequently preserve fossilized micro-organisms called biosignatures.",
        prompt: "What does the scientific term 'biosignature' mean?",
        options: [
          "The signature autograph of the mission commander",
          "Any chemical or physical evidence providing proof of past or present microscopic life",
          "The blueprint schematics of the rover's computer circuits",
          "The brand name of the rover's titanium drill bits"
        ],
        correctOptionIndex: 1,
        explanation: "A biosignature is definitive scientific evidence indicating the former presence of biological life."
      },
      {
        id: "rq-mar-03",
        passageId: "passage-hard-mars",
        cognitiveSkill: "Inference",
        paragraphRef: 4,
        evidenceQuote: "Because radio signals take between five and twenty minutes to travel between Earth and Mars, human engineers in California cannot drive the rover with joysticks.",
        prompt: "Why must Perseverance utilize autonomous self-driving algorithms rather than real-time remote control?",
        options: [
          "Mars gravity breaks joystick cables",
          "The vast distance between planets creates a communications time lag of up to 20 minutes, making live steering impossible",
          "NASA engineers do not know how to steer cars",
          "The rover's wheels are controlled by Martian wind"
        ],
        correctOptionIndex: 1,
        explanation: "Speed-of-light delays (5-20 min each way) mean commands sent by human drivers would arrive too late to dodge hazards."
      },
      {
        id: "rq-mar-04",
        passageId: "passage-hard-mars",
        cognitiveSkill: "Author Craft",
        paragraphRef: 3,
        evidenceQuote: "drops it onto the Martian surface as part of a distributed sample depot for a future international return mission.",
        prompt: "What long-term plan justifies leaving sealed titanium sample tubes scattered across Jezero Crater?",
        options: [
          "To test whether Martian dust will rust titanium",
          "To allow a future planned spacecraft mission to collect the tubes and fly them back to Earth laboratories",
          "To lighten the rover so it can climb steeper hills",
          "To mark territorial borders between nations"
        ],
        correctOptionIndex: 1,
        explanation: "The sealed tubes form a collection cache intended for retrieval by a future Mars Sample Return spacecraft."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 31: PERSUASIVE - BAN DIGITAL SMARTPHONES IN PRIMARY CLASSROOMS
  // =========================================================================
  {
    id: "passage-hard-screens",
    title: "Reclaiming the Classroom: The Case for Screen-Free Schools",
    genre: "Persuasive",
    subtitle: "Why smartphones are cognitive poison to eight-year-old attention spans",
    estimatedMinutes: 5,
    introduction: "Read this editorial regarding educational policy, noting rhetorical appeals and counter-evidence.",
    paragraphs: [
      {
        id: 1,
        text: "Walk through any playground where mobile devices are unregulated, and you will witness an eerie, silent tableaux: children huddled over illuminated screens, thumbing algorithmic dopamine loops instead of chasing handballs, climbing monkey bars, or inventing imaginative playground games. The evidence is now indisputable: personal smartphones must be prohibited in primary schools."
      },
      {
        id: 2,
        text: "Proponents of digital devices argue that early technology exposure prepares eight-year-olds for the modern workforce. This argument collapses under basic scrutiny. Learning to swipe a touchscreen requires zero engineering skill; it is passive consumption explicitly designed by Silicon Valley psychologists to be addictive and frictionless."
      },
      {
        id: 3,
        text: "Cognitive science reveals that deep reading and complex problem-solving require sustained, uninterrupted focus. Even when a phone sits silently inside a school bag, brain imaging proves that a child’s working memory is fractured as their subconscious mind anticipates notifications. Removing devices restores neural bandwidth for reading, empathy, and creative play."
      },
      {
        id: 4,
        text: "Schools should be sanctums of human connection, tactile exploration, and focused inquiry. By enforcing bell-to-bell phone bans, we liberate our children from continuous digital anxiety and return them to the joys of authentic childhood."
      }
    ],
    questions: [
      {
        id: "rq-scr-01",
        passageId: "passage-hard-screens",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "you will witness an eerie, silent tableaux: children huddled over illuminated screens",
        prompt: "What tone does the phrase 'eerie, silent tableaux' establish in the opening paragraph?",
        options: [
          "Joyful celebration of modern computers",
          "Unsettling, ghostly concern about the unnatural loss of playful child energy",
          "Scientific neutrality with numerical data",
          "Boredom with playground games"
        ],
        correctOptionIndex: 1,
        explanation: "'Eerie, silent tableaux' conveys a spooky, abnormal atmosphere contrasting with lively normal schoolyard noises."
      },
      {
        id: "rq-scr-02",
        passageId: "passage-hard-screens",
        cognitiveSkill: "Author Craft",
        paragraphRef: 2,
        evidenceQuote: "Learning to swipe a touchscreen requires zero engineering skill; it is passive consumption",
        prompt: "How does the author counter the claim that early smartphone use trains kids for future tech careers?",
        options: [
          "By explaining that modern computers do not have screens",
          "By distinguishing between consuming pre-packaged apps and actual computer engineering skills",
          "By proving that tech companies do not hire people who owned phones",
          "By arguing that books teach coding faster than laptops"
        ],
        correctOptionIndex: 1,
        explanation: "The author points out that swiping social feeds is passive consumption rather than learning coding or engineering."
      },
      {
        id: "rq-scr-03",
        passageId: "passage-hard-screens",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "Even when a phone sits silently inside a school bag, brain imaging proves that a child’s working memory is fractured",
        prompt: "What scientific claim about working memory is highlighted in paragraph 3?",
        options: [
          "Silent phones emit poisonous radiation into school bags",
          "The mere physical presence of a phone consumes subconscious attention and diminishes mental focus",
          "Children forget their locker combinations when phones are off",
          "Working memory only functions when looking at paper"
        ],
        correctOptionIndex: 1,
        explanation: "Research demonstrates that anticipating messages fractures cognitive capacity even when devices are muted."
      },
      {
        id: "rq-scr-04",
        passageId: "passage-hard-screens",
        cognitiveSkill: "Main Idea",
        paragraphRef: 4,
        evidenceQuote: "Schools should be sanctums of human connection, tactile exploration, and focused inquiry.",
        prompt: "What is the author's ultimate vision for primary school environments?",
        options: [
          "Replacing teachers with video tutorials",
          "Spaces protected from digital noise where children engage in hands-on exploration and interpersonal connection",
          "Schools where children only speak during lunch breaks",
          "Classrooms where all writing is done on stone slates"
        ],
        correctOptionIndex: 1,
        explanation: "The conclusion argues schools should be protected spaces fostering tactile inquiry and deep human connections."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 32: INFORMATIONAL - BIOLUMINESCENT GLOW WORMS OF WAITOMO CAVES
  // =========================================================================
  {
    id: "passage-hard-glowworm",
    title: "Living Constellations in the Underworld",
    genre: "Informational",
    subtitle: "The carnivorous light traps of Arachnocampa luminosa",
    estimatedMinutes: 5,
    introduction: "Read this natural history account of cave-dwelling bioluminescence, then answer the questions.",
    paragraphs: [
      {
        id: 1,
        text: "Stepping inside the subterranean limestone caverns of Waitomo, New Zealand, visitors enter a pitch-black cathedral carved by subterranean rivers over millions of years. Glancing up at the cavern ceiling reveals what appears to be a starry night sky studded with thousands of celestial turquoise stars. These lights are not astronomical—they are the predatory lures of bioluminescent fly larvae."
      },
      {
        id: 2,
        text: "The fungus gnat larva (Arachnocampa luminosa) builds a horizontal mucus nest on the cave roof, from which it dangles up to seventy silk fishing lines. Each sticky silk filament, measuring up to forty centimetres long, is beaded with droplet beads of adhesive glue laced with mild sedative compounds."
      },
      {
        id: 3,
        text: "In its tail organ, the larva mixes an enzyme called luciferase with a molecule called luciferin in the presence of oxygen. This biochemical reaction produces 'cold light' with almost one hundred percent efficiency, converting all energy into blue-green illumination with zero waste heat. Plumed mayflies and river moths emerging from cave pools mistake the glowing constellation for open starlight, fly upward toward safety, and snare themselves hopelessly in the sticky silk lines."
      },
      {
        id: 4,
        text: "The hungrier a glowworm becomes, the brighter its tail organ glows to tempt prey faster. If gentle breezes or cave tourists create vibrations, larvae dim their lights synchronously to avoid attracting larger predatory cave spiders, demonstrating remarkable sensory awareness in the eternal dark."
      }
    ],
    questions: [
      {
        id: "rq-glo-01",
        passageId: "passage-hard-glowworm",
        cognitiveSkill: "Author Craft",
        paragraphRef: 1,
        evidenceQuote: "Glancing up at the cavern ceiling reveals what appears to be a starry night sky studded with thousands of celestial turquoise stars.",
        prompt: "Why does the author open the text with the illusion of 'a starry night sky'?",
        options: [
          "To prove that the cave roof had collapsed open to the real night sky",
          "To establish a captivating visual contrast between an astronomical appearance and biological reality",
          "To suggest that tourists visit the caves at midnight",
          "To explain why telescopes are stored inside limestone caverns"
        ],
        correctOptionIndex: 1,
        explanation: "The comparison vividly portrays how millions of glowing larvae create the optical illusion of a starry galaxy."
      },
      {
        id: "rq-glo-02",
        passageId: "passage-hard-glowworm",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 3,
        evidenceQuote: "converts all energy into blue-green illumination with zero waste heat.",
        prompt: "What makes the biochemical reaction of 'cold light' in glowworms scientifically remarkable?",
        options: [
          "It freezes the surrounding air into icicles",
          "It produces light at almost 100% efficiency without wasting energy as thermal heat",
          "It requires electricity from batteries",
          "It only glows when bathed in salt water"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 3 notes luciferase reactions produce cold light with almost 100% efficiency without waste heat."
      },
      {
        id: "rq-glo-03",
        passageId: "passage-hard-glowworm",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "mistake the glowing constellation for open starlight, fly upward toward safety, and snare themselves",
        prompt: "How does the glowworm exploit natural insect navigation instincts to catch food?",
        options: [
          "It produces a sweet floral perfume that smells like honey",
          "Cave insects navigating toward what they think is an outdoor night exit fly into the trap lines",
          "It shouts clicking soundwaves that stun prey",
          "It mimics the appearance of a queen fly"
        ],
        correctOptionIndex: 1,
        explanation: "Moths instinctively fly toward light sources to find cave exits, leading them straight into dangling silk snares."
      },
      {
        id: "rq-glo-04",
        passageId: "passage-hard-glowworm",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 4,
        evidenceQuote: "The hungrier a glowworm becomes, the brighter its tail organ glows to tempt prey faster.",
        prompt: "What biological factor causes an individual glowworm to increase the intensity of its glow?",
        options: [
          "Feeling threatened by cave tourists",
          "High levels of hunger, motivating it to lure food more urgently",
          "Drinking mineral water dripping from stalactites",
          "Mating season among adult flies"
        ],
        correctOptionIndex: 1,
        explanation: "Paragraph 4 explains that increased hunger triggers the larva to glow brighter to draw prey quickly."
      }
    ]
  },
  // =========================================================================
  // PASSAGE 33: NARRATIVE - THE LIGHTHOUSE OF GABO ISLAND
  // =========================================================================
  {
    id: "passage-hard-gabo",
    title: "Keepers of the Crimson Beam: Gabo Island",
    genre: "Narrative",
    subtitle: "A wild gale batters the pink granite sentinel of Bass Strait",
    estimatedMinutes: 5,
    introduction: "Read the historical maritime adventure below, focusing on character actions and atmospheric stakes.",
    paragraphs: [
      {
        id: 1,
        text: "Off the southeastern tip of Victoria, Gabo Island is a windswept slab of rose-pink granite besieged by the tempestuous cross-currents of Bass Strait and the Tasman Sea. For seventy years, the red-domed lighthouse had warned maritime vessels away from razor-sharp reef ledges. On an icy August evening in 1898, a barometric storm plunged the barometer down to unprecedented lows."
      },
      {
        id: 2,
        text: "Inside the stone tower, fourteen-year-old Callan hauled a brass jug of kerosene up the spiral iron stairs, his calf muscles screaming after ninety-six steps. Above in the lantern room, his father, Head Keeper Douglas, was frantically wiping condensation from the multi-ton revolving Fresnel lens. Suddenly, a deafening snap echoed through the tower: the counterweight rope driving the clockwork mechanism had frayed and sheared!"
      },
      {
        id: 3,
        text: "The monumental glass lens ground to an abrupt halt, fixing its piercing beam upon a single patch of ocean. ‘If the light stops rotating, approaching steamships will mistake us for a coastal fishing smudge!’ Douglas yelled over the gale. ‘Callan, grab the emergency crank lever!’"
      },
      {
        id: 4,
        text: "For four agonizing hours in the freezing lantern room, father and son took turns turning the manual bevel gears by hand, matching their cadence to the rhythmic ticking of a pocket watch to keep the lens spinning at exactly two revolutions per minute. Just past midnight, through the gale-lashed spray, the horn of the coastal freighter SS Ly-ee-Moon sounded three long blasts—acknowledging the spinning beacon that had steered them safely past the reefs."
      }
    ],
    questions: [
      {
        id: "rq-gab-01",
        passageId: "passage-hard-gabo",
        cognitiveSkill: "Vocabulary in Context",
        paragraphRef: 1,
        evidenceQuote: "a windswept slab of rose-pink granite besieged by the tempestuous cross-currents",
        prompt: "What does the word 'besieged' indicate about Gabo Island's situation?",
        options: [
          "It was under military attack by enemy battleships",
          "It was constantly attacked, pounded, and surrounded by violent ocean currents and rough seas",
          "It was completely underwater during high tide",
          "It was crowded with tourists"
        ],
        correctOptionIndex: 1,
        explanation: "'Besieged' metaphorically conveys how ferocious winds and ocean waves relentlessly hammer the isolated granite island."
      },
      {
        id: "rq-gab-02",
        passageId: "passage-hard-gabo",
        cognitiveSkill: "Inference",
        paragraphRef: 3,
        evidenceQuote: "If the light stops rotating, approaching steamships will mistake us for a coastal fishing smudge!",
        prompt: "Why was a stationary, non-rotating beam of light dangerous to passing steamships?",
        options: [
          "It would blind the lighthouse keepers",
          "Ships relied on specific flash cadences to identify navigational hazard lights; a static light looks like an insignificant campsite or boat lantern",
          "A stationary lens overheats and catches fire instantly",
          "The glass would crack from sea salt"
        ],
        correctOptionIndex: 1,
        explanation: "Navigational charts assign unique rotation flash intervals; an unmoving glow fails to warn ships of rocky headlands."
      },
      {
        id: "rq-gab-03",
        passageId: "passage-hard-gabo",
        cognitiveSkill: "Direct Retrieval",
        paragraphRef: 4,
        evidenceQuote: "matching their cadence to the rhythmic ticking of a pocket watch to keep the lens spinning at exactly two revolutions per minute.",
        prompt: "How did Callan and his father maintain the correct rotational speed while manually cranking the lens?",
        options: [
          "By singing sea shanties together",
          "By synchronizing their manual cranking rhythm to the ticking seconds of a pocket watch",
          "By counting ocean waves crashing against the rocks",
          "By watching the speed of passing clouds"
        ],
        correctOptionIndex: 1,
        explanation: "They calibrated their manual turning to a pocket watch to sustain exactly 2 revolutions per minute."
      },
      {
        id: "rq-gab-04",
        passageId: "passage-hard-gabo",
        cognitiveSkill: "Author Craft",
        paragraphRef: 4,
        evidenceQuote: "the coastal freighter SS Ly-ee-Moon sounded three long blasts—acknowledging the spinning beacon",
        prompt: "What function does the three-blast horn signal serve in the story's resolution?",
        options: [
          "It signals that the ship has run aground on the reefs",
          "It provides emotional validation and proof that their grueling physical effort saved sailors from maritime disaster",
          "It warns the lighthouse that pirates are approaching",
          "It signals that the storm has completely cleared"
        ],
        correctOptionIndex: 1,
        explanation: "The steam whistle confirms that the ship saw the warning beam, validating the duo's exhausting heroics."
      }
    ]
  }
];
