export type NumeracyStrand =
  | "Number & Algebra"
  | "Measurement & Geometry"
  | "Statistics & Probability";

export interface NumeracyQuestion {
  id: string;
  strand: NumeracyStrand;
  difficulty: 1 | 2 | 3;
  question: string;
  visualSnippet?: string; // Optional ASCII diagram or math layout
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  topic: string;
}

export const YEAR_3_NUMERACY_QUESTIONS: NumeracyQuestion[] = [
  // --- DIRECT FROM NAPLAN FILE ---
  {
    id: "num-nap-001",
    strand: "Number & Algebra",
    difficulty: 1,
    question: "33 + 10 = ?",
    options: ["34", "43", "130", "330"],
    correctOptionIndex: 1,
    explanation: "Add one ten to 33: 33 + 10 = 43.",
    topic: "Addition & Place Value"
  },
  {
    id: "num-nap-002",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "James has 12 eggs. He uses 3 to make a cake. What fraction of the eggs did he use?",
    options: ["1/2", "5/8", "3/4", "1/4"],
    correctOptionIndex: 3,
    explanation: "3 out of 12 eggs is 3/12, which simplifies to 1/4.",
    topic: "Fractions"
  },
  {
    id: "num-nap-003",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many minutes are there in one and a half hours?",
    options: ["80", "120", "90", "60"],
    correctOptionIndex: 2,
    explanation: "1 hour = 60 minutes. Half an hour = 30 minutes. 60 + 30 = 90 minutes.",
    topic: "Time"
  },
  {
    id: "num-nap-004",
    strand: "Measurement & Geometry",
    difficulty: 1,
    question: "Which 3-D shape has a square base?",
    options: ["Sphere", "Cone", "Square-based pyramid", "Cylinder"],
    correctOptionIndex: 2,
    explanation: "A square-based pyramid has a flat square bottom and 4 triangular faces.",
    topic: "3D Shapes"
  },
  {
    id: "num-nap-005",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "6 × 8 = ?",
    options: ["42", "56", "36", "48"],
    correctOptionIndex: 3,
    explanation: "6 groups of 8 equals 48.",
    topic: "Multiplication"
  },
  {
    id: "num-nap-006",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Eliza has one $1 coin, two 20-cent coins, four 10-cent coins and two 5-cent coins. How much money does she have?",
    options: ["$1.45", "$1.90", "$2.00", "$2.20"],
    correctOptionIndex: 1,
    explanation: "$1.00 + (2 × 20c = 40c) + (4 × 10c = 40c) + (2 × 5c = 10c) = $1.00 + 90c = $1.90.",
    topic: "Australian Money"
  },
  {
    id: "num-nap-007",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "A pizza is cut into 8 equal slices. Three slices are missing. What fraction is missing?",
    options: ["1/4", "5/8", "1/3", "3/8"],
    correctOptionIndex: 3,
    explanation: "Three out of eight equal pieces is 3/8.",
    topic: "Fractions"
  },
  {
    id: "num-nap-008",
    strand: "Number & Algebra",
    difficulty: 1,
    question: "Base-ten blocks show one hundred block, four ten-rods and eight single units. What number is represented?",
    options: ["172", "121", "98", "148"],
    correctOptionIndex: 3,
    explanation: "100 + 40 + 8 = 148.",
    topic: "Place Value"
  },
  {
    id: "num-nap-009",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Put these numbers in order from smallest to largest: 16, 12, 40, 20, 32, 44, 8, 24, 36, 28.",
    options: [
      "44, 40, 36, 32, 28, 24, 20, 16, 12, 8",
      "8, 12, 16, 20, 28, 32, 24, 36, 40, 44",
      "8, 12, 16, 20, 24, 28, 32, 40, 36, 44",
      "8, 12, 16, 20, 24, 28, 32, 36, 40, 44"
    ],
    correctOptionIndex: 3,
    explanation: "Ascending order counting in 4s: 8, 12, 16, 20, 24, 28, 32, 36, 40, 44.",
    topic: "Number Sequences"
  },
  {
    id: "num-nap-010",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "There are 14 ice creams in a group, and 7 are circled. What fraction is circled?",
    options: ["1/4", "1/3", "4/4", "1/2"],
    correctOptionIndex: 3,
    explanation: "7 is half of 14, so 7/14 = 1/2.",
    topic: "Fractions"
  },
  {
    id: "num-nap-011",
    strand: "Number & Algebra",
    difficulty: 1,
    question: "What is the missing number in this sequence? 75, 80, 85, ?, 95, 100",
    options: ["60", "90", "85", "105"],
    correctOptionIndex: 1,
    explanation: "Count up by 5 each time: 85 + 5 = 90.",
    topic: "Number Patterns"
  },
  {
    id: "num-nap-012",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which shape does NOT have a right angle (90° corner)?",
    options: ["Rectangle", "Square", "Equilateral Triangle", "Right-angled Triangle"],
    correctOptionIndex: 2,
    explanation: "An equilateral triangle has all 60° acute angles, with no 90° right angles.",
    topic: "Angles & Shapes"
  },
  {
    id: "num-nap-013",
    strand: "Number & Algebra",
    difficulty: 1,
    question: "Sally has 17 shells. She drops them and 9 break. Which calculation shows how many unbroken shells she has left?",
    options: ["17 − 9 = 8", "9 + 17 = 25", "9 + 10 = 29", "17 − 9 = 11"],
    correctOptionIndex: 0,
    explanation: "Subtract the broken shells from the total: 17 − 9 = 8.",
    topic: "Word Problems"
  },
  {
    id: "num-nap-014",
    strand: "Measurement & Geometry",
    difficulty: 1,
    question: "Lina is 115 cm tall, Jessie is 113 cm, Erin is 121 cm and Bess is 123 cm. Who is the shortest?",
    options: ["Jessie", "Erin", "Lina", "Bess"],
    correctOptionIndex: 0,
    explanation: "113 cm is the lowest height among all four students, so Jessie is shortest.",
    topic: "Length Measurement"
  },
  {
    id: "num-nap-015",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A class chart shows: Super-Dudes (6 votes), Megatron (9 votes), Which Witch? (5 votes), Cartoon World (8 votes). Which show received exactly 6 votes?",
    options: ["Megatron Universe", "Cartoon World", "Super-Dudes", "Which Witch?"],
    correctOptionIndex: 2,
    explanation: "Super-Dudes received exactly 6 votes on the chart.",
    topic: "Data & Graphs"
  },

  // --- MIRROR COMPANION QUESTIONS (PARALLEL PRACTICE) ---
  {
    id: "num-gen-016",
    strand: "Number & Algebra",
    difficulty: 1,
    question: "54 + 20 = ?",
    options: ["64", "74", "56", "70"],
    correctOptionIndex: 1,
    explanation: "Add two tens (20) to 54: 54 + 20 = 74.",
    topic: "Addition & Place Value"
  },
  {
    id: "num-gen-017",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Oliver has 16 stickers. He shares 4 with his sister. What fraction of the stickers did he give away?",
    options: ["1/4", "1/2", "3/4", "1/8"],
    correctOptionIndex: 0,
    explanation: "4 out of 16 stickers is 4/16, which simplifies to 1/4.",
    topic: "Fractions"
  },
  {
    id: "num-gen-018",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many minutes are there in two and a half hours?",
    options: ["120", "140", "150", "180"],
    correctOptionIndex: 2,
    explanation: "2 hours = 120 minutes. Half an hour = 30 minutes. 120 + 30 = 150 minutes.",
    topic: "Time"
  },
  {
    id: "num-gen-019",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which 3-D shape has 6 flat square faces and 8 vertices?",
    options: ["Cylinder", "Cone", "Cube", "Triangular prism"],
    correctOptionIndex: 2,
    explanation: "A cube has 6 identical square faces, 12 edges, and 8 vertices (corners).",
    topic: "3D Shapes"
  },
  {
    id: "num-gen-020",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "7 × 6 = ?",
    options: ["36", "42", "48", "49"],
    correctOptionIndex: 1,
    explanation: "7 groups of 6 equals 42.",
    topic: "Multiplication"
  },
  {
    id: "num-gen-021",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Lucas buys an apple for $1.40 and pays with a $2.00 coin. How much change does he get?",
    options: ["40c", "50c", "60c", "70c"],
    correctOptionIndex: 2,
    explanation: "$2.00 − $1.40 = 60 cents.",
    topic: "Australian Money"
  },
  {
    id: "num-gen-022",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "A cake is cut into 6 equal slices. Four slices are eaten. What fraction of the cake was eaten?",
    options: ["2/6", "4/6", "1/6", "5/6"],
    correctOptionIndex: 1,
    explanation: "4 out of 6 equal slices were eaten, which is 4/6 (or 2/3).",
    topic: "Fractions"
  },
  {
    id: "num-gen-023",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Base-ten blocks show two hundred-flats, three ten-rods, and five single unit cubes. What number is this?",
    options: ["253", "235", "325", "230"],
    correctOptionIndex: 1,
    explanation: "200 + 30 + 5 = 235.",
    topic: "Place Value"
  },
  {
    id: "num-gen-024",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What is the missing number in this pattern? 48, 44, 40, ?, 32, 28",
    options: ["38", "36", "34", "30"],
    correctOptionIndex: 1,
    explanation: "The pattern subtracts 4 each step: 40 − 4 = 36.",
    topic: "Number Patterns"
  },
  {
    id: "num-gen-025",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "There are 20 marbles in a bag. 5 are green. What fraction of the marbles are green?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    correctOptionIndex: 2,
    explanation: "5 out of 20 simplifies to 1/4 (because 5 × 4 = 20).",
    topic: "Fractions"
  },
  {
    id: "num-gen-026",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangle has a length of 7 cm and a width of 4 cm. What is its perimeter?",
    options: ["28 cm", "22 cm", "11 cm", "18 cm"],
    correctOptionIndex: 1,
    explanation: "Perimeter = 7 + 4 + 7 + 4 = 22 cm.",
    topic: "Perimeter & Area"
  },
  {
    id: "num-gen-027",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A spinner is divided into 4 equal quarters: Red, Blue, Green, Yellow. What is the chance of spinning Green?",
    options: ["Impossible", "Equal chance (1 in 4)", "Certain", "More likely than not"],
    correctOptionIndex: 1,
    explanation: "Each quarter is equal in size, so green has a 1 in 4 chance.",
    topic: "Probability"
  },
  {
    id: "num-gen-028",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A farmer packs 36 oranges equally into 4 boxes. How many oranges go in each box?",
    options: ["8", "9", "7", "6"],
    correctOptionIndex: 1,
    explanation: "36 ÷ 4 = 9 oranges per box.",
    topic: "Division"
  },
  {
    id: "num-gen-029",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many grams are there in 2 kilograms?",
    options: ["200 g", "500 g", "1000 g", "2000 g"],
    correctOptionIndex: 3,
    explanation: "1 kg = 1000 g, so 2 kg = 2000 g.",
    topic: "Mass & Weight"
  },
  {
    id: "num-gen-030",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "In a survey of favorite pets: Dogs (12), Cats (10), Rabbits (4), Birds (2). How many more people chose dogs than rabbits?",
    options: ["6", "8", "10", "16"],
    correctOptionIndex: 1,
    explanation: "12 (dogs) − 4 (rabbits) = 8 more people.",
    topic: "Data Interpretation"
  }
];
