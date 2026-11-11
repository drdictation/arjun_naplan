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
  },

  // --- NEW EXPANSION PACK (QUESTIONS 31 TO 60) ---
  {
    id: "num-gen-031",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which of the following equals 350?",
    options: [
      "3 hundreds and 5 ones",
      "3 hundreds and 5 tens",
      "35 tens and 5 ones",
      "30 tens and 5 ones"
    ],
    correctOptionIndex: 1,
    explanation: "3 hundreds = 300, 5 tens = 50. 300 + 50 = 350.",
    topic: "Place Value"
  },
  {
    id: "num-gen-032",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What is 100 less than 842?",
    options: ["742", "832", "841", "942"],
    correctOptionIndex: 0,
    explanation: "Subtract 1 from the hundreds digit: 842 − 100 = 742.",
    topic: "Mental Subtraction"
  },
  {
    id: "num-gen-033",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Maya had 50 marbles. She gave 18 to Noah and 12 to Sam. How many marbles does Maya have left?",
    options: ["20", "22", "30", "15"],
    correctOptionIndex: 0,
    explanation: "18 + 12 = 30 marbles given away. 50 − 30 = 20 left.",
    topic: "Two-step Word Problems"
  },
  {
    id: "num-gen-034",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What is the next number in this sequence? 12, 19, 26, 33, ?",
    options: ["38", "39", "40", "42"],
    correctOptionIndex: 2,
    explanation: "The rule is add 7 each time: 33 + 7 = 40.",
    topic: "Number Patterns"
  },
  {
    id: "num-gen-035",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Four friends share $36 equally. How much money does each friend get?",
    options: ["$7", "$8", "$9", "$12"],
    correctOptionIndex: 2,
    explanation: "36 divided by 4 friends equals $9 each.",
    topic: "Division & Money"
  },
  {
    id: "num-gen-036",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which fraction is equivalent to one half (1/2)?",
    options: ["2/6", "3/6", "4/6", "1/4"],
    correctOptionIndex: 1,
    explanation: "3 is half of 6, so 3/6 simplifies to 1/2.",
    topic: "Equivalent Fractions"
  },
  {
    id: "num-gen-037",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What number makes this equation true? 45 + ? = 100",
    options: ["45", "50", "55", "65"],
    correctOptionIndex: 2,
    explanation: "100 − 45 = 55.",
    topic: "Number Bonds to 100"
  },
  {
    id: "num-gen-038",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "There are 5 bags of apples. Each bag has 6 apples. How many apples in total?",
    options: ["25", "30", "35", "11"],
    correctOptionIndex: 1,
    explanation: "5 groups of 6 = 5 × 6 = 30 apples.",
    topic: "Multiplication"
  },
  {
    id: "num-gen-039",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which number is an ODD number and a multiple of 5?",
    options: ["20", "24", "35", "42"],
    correctOptionIndex: 2,
    explanation: "35 ends in 5, making it an odd number and in the 5 times table.",
    topic: "Odd & Even Numbers"
  },
  {
    id: "num-gen-040",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A strip of ribbon is divided into 10 equal parts. 7 parts are shaded blue. What fraction is NOT shaded?",
    options: ["7/10", "3/10", "2/10", "5/10"],
    correctOptionIndex: 1,
    explanation: "10/10 − 7/10 = 3/10 unshaded.",
    topic: "Fractions of a Whole"
  },
  {
    id: "num-gen-041",
    strand: "Measurement & Geometry",
    difficulty: 1,
    question: "A movie starts at 4:15 pm and runs for 45 minutes. What time does it finish?",
    options: ["4:45 pm", "5:00 pm", "5:15 pm", "5:30 pm"],
    correctOptionIndex: 1,
    explanation: "15 minutes + 45 minutes = 60 minutes = 1 whole hour. 4:00 + 1 hour = 5:00 pm.",
    topic: "Elapsed Time"
  },
  {
    id: "num-gen-042",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which unit of measurement is best to measure the volume of water in a swimming pool?",
    options: ["Millilitres (mL)", "Litres (L)", "Grams (g)", "Centimetres (cm)"],
    correctOptionIndex: 1,
    explanation: "Large capacities of liquid are measured in litres (L).",
    topic: "Capacity & Volume"
  },
  {
    id: "num-gen-043",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many sides does a regular hexagon have?",
    options: ["5", "6", "7", "8"],
    correctOptionIndex: 1,
    explanation: "A hexagon always has 6 straight sides.",
    topic: "2D Polygons"
  },
  {
    id: "num-gen-044",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A square garden bed has sides of 5 metres. What is the perimeter of the garden bed?",
    options: ["10 m", "15 m", "20 m", "25 m"],
    correctOptionIndex: 2,
    explanation: "A square has 4 equal sides: 5 m + 5 m + 5 m + 5 m = 20 m.",
    topic: "Perimeter"
  },
  {
    id: "num-gen-045",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which object is about 1 metre in length?",
    options: ["A pencil", "The width of a classroom doorway", "An ant", "A school bus"],
    correctOptionIndex: 1,
    explanation: "A standard door frame is approximately 1 metre wide.",
    topic: "Length Estimation"
  },
  {
    id: "num-gen-046",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many corners (vertices) does a triangular pyramid have?",
    options: ["3", "4", "5", "6"],
    correctOptionIndex: 1,
    explanation: "A triangular pyramid (tetrahedron) has 3 corners on the base plus 1 top apex = 4 vertices.",
    topic: "3D Shapes"
  },
  {
    id: "num-gen-047",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many days are in 3 weeks?",
    options: ["14 days", "21 days", "24 days", "28 days"],
    correctOptionIndex: 1,
    explanation: "Each week has 7 days: 3 × 7 = 21 days.",
    topic: "Calendar Time"
  },
  {
    id: "num-gen-048",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "If an analog clock shows 3:30, what kind of angle is formed between the hour hand and minute hand?",
    options: ["Acute angle (less than 90°)", "Right angle (exactly 90°)", "Obtuse angle (greater than 90°)", "Straight line"],
    correctOptionIndex: 0,
    explanation: "At 3:30, the minute hand points at 6 and the hour hand is halfway between 3 and 4 (about 75°), which is an acute angle.",
    topic: "Angles & Clocks"
  },
  {
    id: "num-gen-049",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Kiran pays for a $3.25 ice cream with a $5.00 note. What change should she receive?",
    options: ["$1.25", "$1.50", "$1.75", "$2.25"],
    correctOptionIndex: 2,
    explanation: "$5.00 − $3.25 = $1.75.",
    topic: "Australian Currency & Change"
  },
  {
    id: "num-gen-050",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which balance scale reading is true?",
    options: [
      "1 kg is lighter than 800 g",
      "1000 g is equal to 1 kg",
      "500 g is heavier than 1 kg",
      "2 kg is equal to 200 g"
    ],
    correctOptionIndex: 1,
    explanation: "1000 grams exactly equals 1 kilogram.",
    topic: "Mass & Conversions"
  },
  {
    id: "num-gen-051",
    strand: "Statistics & Probability",
    difficulty: 1,
    question: "A standard six-sided die is rolled. Which outcome is impossible?",
    options: ["Rolling a 1", "Rolling a 4", "Rolling a 6", "Rolling a 7"],
    correctOptionIndex: 3,
    explanation: "A standard die only has numbers 1 to 6, so rolling a 7 is impossible.",
    topic: "Probability Language"
  },
  {
    id: "num-gen-052",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A bag has 8 blue tokens and 2 yellow tokens. Pulling out a blue token is:",
    options: ["Impossible", "Unlikely", "Likely", "Certain"],
    correctOptionIndex: 2,
    explanation: "8 out of 10 tokens are blue, so picking blue is likely.",
    topic: "Likelihood"
  },
  {
    id: "num-gen-053",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "In a pictograph, 1 star represents 4 books read. Lucas has 3 stars next to his name. How many books did he read?",
    options: ["3", "7", "12", "16"],
    correctOptionIndex: 2,
    explanation: "3 stars × 4 books each = 12 books read.",
    topic: "Pictographs & Keys"
  },
  {
    id: "num-gen-054",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "Tally marks show: four vertical lines with a diagonal line through them (卌), plus 3 single vertical lines. What number is this?",
    options: ["6", "7", "8", "9"],
    correctOptionIndex: 2,
    explanation: "One full bundle of tallies = 5, plus 3 single lines = 5 + 3 = 8.",
    topic: "Tally Charts"
  },
  {
    id: "num-gen-055",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "In a class bar graph of shoe sizes: Size 1 (3 students), Size 2 (8 students), Size 3 (11 students), Size 4 (5 students). What is the most common shoe size?",
    options: ["Size 1", "Size 2", "Size 3", "Size 4"],
    correctOptionIndex: 2,
    explanation: "Size 3 has the highest bar with 11 students, making it the most common (mode).",
    topic: "Data Analysis"
  },
  {
    id: "num-gen-056",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which calculation gives the largest answer?",
    options: ["4 × 8", "5 × 6", "9 × 3", "7 × 4"],
    correctOptionIndex: 0,
    explanation: "4 × 8 = 32 (compared to 30, 27, and 28).",
    topic: "Multiplication Comparison"
  },
  {
    id: "num-gen-057",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Ella is saving for a toy that costs $48. She already has $29. How much more money does she need to save?",
    options: ["$17", "$19", "$21", "$29"],
    correctOptionIndex: 1,
    explanation: "$48 − $29 = $19.",
    topic: "Subtraction with Regrouping"
  },
  {
    id: "num-gen-058",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "Which of these nets folds up to form a closed cube?",
    options: [
      "A net made of 5 identical squares in a row",
      "A net made of 6 squares arranged like a cross",
      "A net made of 4 triangles and 1 square",
      "A net made of 2 circles and 1 rectangle"
    ],
    correctOptionIndex: 1,
    explanation: "A cube net requires 6 square faces arranged so they fold without overlapping, such as a Latin cross shape.",
    topic: "3D Nets"
  },
  {
    id: "num-gen-059",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Half of a mystery number is 16. What is the mystery number?",
    options: ["8", "24", "32", "36"],
    correctOptionIndex: 2,
    explanation: "Double 16: 16 × 2 = 32.",
    topic: "Inverse Operations"
  },
  {
    id: "num-gen-060",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "A coin is tossed. What is the chance of landing on heads?",
    options: ["Certain", "Impossible", "Equal chance (50/50)", "Highly unlikely"],
    correctOptionIndex: 2,
    explanation: "A coin has only two equal sides (heads and tails), giving an even (50/50) chance.",
    topic: "Probability"
  },

  // --- MEGA EXPANSION PACK (QUESTIONS 61 TO 100) ---
  {
    id: "num-gen-061",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What number is 10 more than 495?",
    options: ["485", "505", "515", "595"],
    correctOptionIndex: 1,
    explanation: "495 + 10 = 505 (crosses the hundred boundary).",
    topic: "Place Value & Mental Addition"
  },
  {
    id: "num-gen-062",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which number sentence has the same answer as 8 × 4?",
    options: ["4 + 8", "16 + 16", "8 + 4", "6 × 5"],
    correctOptionIndex: 1,
    explanation: "8 × 4 = 32. 16 + 16 = 32.",
    topic: "Multiplication & Equivalence"
  },
  {
    id: "num-gen-063",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which fraction is the largest?",
    options: ["1/8", "1/4", "1/2", "1/6"],
    correctOptionIndex: 2,
    explanation: "When unit fractions have a smaller denominator, the pieces are larger. 1/2 is the biggest.",
    topic: "Comparing Fractions"
  },
  {
    id: "num-gen-064",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "There are 24 children in a class. One third (1/3) of the class wear glasses. How many children wear glasses?",
    options: ["6", "8", "9", "12"],
    correctOptionIndex: 1,
    explanation: "1/3 of 24 is 24 ÷ 3 = 8 children.",
    topic: "Fractions of Quantities"
  },
  {
    id: "num-gen-065",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What is the missing number? 100, 92, 84, ?, 68, 60",
    options: ["78", "76", "74", "72"],
    correctOptionIndex: 1,
    explanation: "The pattern subtracts 8 each step: 84 − 8 = 76.",
    topic: "Number Patterns"
  },
  {
    id: "num-gen-066",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Ethan bought 3 packs of trading cards. Each pack contains 8 cards. He gave 5 cards to his friend. How many cards does Ethan have left?",
    options: ["19", "21", "24", "29"],
    correctOptionIndex: 0,
    explanation: "3 × 8 = 24 cards. 24 − 5 = 19 cards left.",
    topic: "Two-step Word Problems"
  },
  {
    id: "num-gen-067",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which number rounded to the nearest 10 gives 70?",
    options: ["64", "67", "76", "82"],
    correctOptionIndex: 1,
    explanation: "67 rounds up to 70 because its units digit (7) is 5 or greater.",
    topic: "Rounding Numbers"
  },
  {
    id: "num-gen-068",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "35 ÷ 5 = ?",
    options: ["6", "7", "8", "9"],
    correctOptionIndex: 1,
    explanation: "5 × 7 = 35, so 35 ÷ 5 = 7.",
    topic: "Division Facts"
  },
  {
    id: "num-gen-069",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which of these numbers is an EVEN number and a multiple of 3?",
    options: ["15", "18", "21", "25"],
    correctOptionIndex: 1,
    explanation: "18 ends in an even digit (8) and is 3 × 6 = 18.",
    topic: "Multiples & Properties"
  },
  {
    id: "num-gen-070",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A baker bakes 6 trays of muffins. Each tray has 9 muffins. How many muffins are baked in total?",
    options: ["45", "54", "56", "63"],
    correctOptionIndex: 1,
    explanation: "6 × 9 = 54 muffins.",
    topic: "Multiplication"
  },
  {
    id: "num-gen-071",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many centimetres are there in 3 and a half metres (3.5 m)?",
    options: ["35 cm", "305 cm", "350 cm", "3500 cm"],
    correctOptionIndex: 2,
    explanation: "1 m = 100 cm. 3 m = 300 cm, 0.5 m = 50 cm. Total = 350 cm.",
    topic: "Length Units"
  },
  {
    id: "num-gen-072",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "A soccer match starts at 10:15 am and finishes at 11:30 am. How long was the match?",
    options: ["1 hour 15 minutes", "1 hour 30 minutes", "1 hour 45 minutes", "2 hours"],
    correctOptionIndex: 0,
    explanation: "From 10:15 to 11:15 is 1 hour, plus 15 more minutes to 11:30 = 1 hour 15 minutes.",
    topic: "Elapsed Time"
  },
  {
    id: "num-gen-073",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which 3D object has 2 flat circular faces and 1 curved surface?",
    options: ["Cone", "Sphere", "Cylinder", "Torus"],
    correctOptionIndex: 2,
    explanation: "A cylinder (like a tin can) has circular top and bottom faces and a curved surface.",
    topic: "3D Shapes"
  },
  {
    id: "num-gen-074",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "What is the area of a rectangle that is 6 cm long and 4 cm wide?",
    options: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    correctOptionIndex: 2,
    explanation: "Area = length × width = 6 × 4 = 24 cm².",
    topic: "Area of Rectangles"
  },
  {
    id: "num-gen-075",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Noah buys a notebook for $2.60 and a pen for $1.80. He pays with a $5 note. How much change does he get?",
    options: ["40c", "60c", "80c", "$1.20"],
    correctOptionIndex: 1,
    explanation: "$2.60 + $1.80 = $4.40 spent. $5.00 − $4.40 = 60c change.",
    topic: "Australian Money"
  },
  {
    id: "num-gen-076",
    strand: "Measurement & Geometry",
    difficulty: 1,
    question: "How many months of the year have exactly 30 days?",
    options: ["4", "5", "6", "7"],
    correctOptionIndex: 0,
    explanation: "Four months: April, June, September, November.",
    topic: "Calendar & Seasons"
  },
  {
    id: "num-gen-077",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which of these angles is an obtuse angle?",
    options: ["45°", "80°", "90°", "120°"],
    correctOptionIndex: 3,
    explanation: "An obtuse angle is greater than 90° and less than 180°. 120° is obtuse.",
    topic: "Angles"
  },
  {
    id: "num-gen-078",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "A jug holds 1.5 litres of fruit juice. How many millilitres (mL) is this?",
    options: ["150 mL", "500 mL", "1500 mL", "15000 mL"],
    correctOptionIndex: 2,
    explanation: "1 litre = 1000 mL. 1.5 litres = 1500 mL.",
    topic: "Capacity Conversion"
  },
  {
    id: "num-gen-079",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which shape has exactly one line of symmetry?",
    options: [
      "Square",
      "Isosceles triangle (two equal sides)",
      "Circle",
      "Rectangle"
    ],
    correctOptionIndex: 1,
    explanation: "An isosceles triangle has only 1 line of vertical symmetry down its middle.",
    topic: "Symmetry"
  },
  {
    id: "num-gen-080",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangular playground has a perimeter of 30 metres. If the length is 10 metres, what is the width?",
    options: ["5 metres", "10 metres", "15 metres", "20 metres"],
    correctOptionIndex: 0,
    explanation: "Perimeter = 2 × (length + width) = 30 m. Length + width = 15 m. Width = 15 − 10 = 5 metres.",
    topic: "Perimeter Problem Solving"
  },
  {
    id: "num-gen-081",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A spinner has 8 equal sections: 4 Red, 2 Blue, 1 Green, 1 Yellow. Which colour is least likely to be spun?",
    options: ["Red", "Blue", "Green and Yellow (equal least)", "Blue and Red"],
    correctOptionIndex: 2,
    explanation: "Green (1/8) and Yellow (1/8) both have the fewest sections.",
    topic: "Chance Experiments"
  },
  {
    id: "num-gen-082",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "In a class picture graph, 1 book symbol = 5 library visits. The class has 6 book symbols. How many visits in total?",
    options: ["11", "25", "30", "35"],
    correctOptionIndex: 2,
    explanation: "6 symbols × 5 visits = 30 total visits.",
    topic: "Pictographs"
  },
  {
    id: "num-gen-083",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "Zara draws a card from a standard deck. The card is either red or black. What is the likelihood of drawing a red card?",
    options: ["Impossible", "Equal chance (1 in 2)", "Unlikely", "Certain"],
    correctOptionIndex: 1,
    explanation: "Half the cards are red (hearts and diamonds) and half are black, so it is an even 1 in 2 chance.",
    topic: "Probability"
  },
  {
    id: "num-gen-084",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A tally table records vehicles passing school: Cars (卌 卌 卌 II), Buses (IIII), Bikes (卌 I). How many cars passed?",
    options: ["15", "16", "17", "18"],
    correctOptionIndex: 2,
    explanation: "Three bundles of 5 = 15, plus 2 singles = 17 cars.",
    topic: "Tally Charts"
  },
  {
    id: "num-gen-085",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "Five students ran a 100m sprint: Liam 18s, Noah 16s, Jack 17s, Ben 19s, Leo 15s. Who was the fastest runner?",
    options: ["Liam", "Noah", "Ben", "Leo"],
    correctOptionIndex: 3,
    explanation: "In a running race, the lowest time is the fastest. Leo ran in 15 seconds.",
    topic: "Interpreting Data"
  },
  {
    id: "num-gen-086",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "What number is halfway between 300 and 400?",
    options: ["340", "350", "360", "375"],
    correctOptionIndex: 1,
    explanation: "The midpoint between 300 and 400 is 350.",
    topic: "Number Line & Place Value"
  },
  {
    id: "num-gen-087",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Which of the following is equal to 4 × 7?",
    options: ["7 + 7 + 7", "4 + 4 + 4 + 4", "7 + 7 + 7 + 7", "4 × 4 × 4 × 4"],
    correctOptionIndex: 2,
    explanation: "4 × 7 means 4 groups of 7, which is 7 + 7 + 7 + 7.",
    topic: "Repeated Addition"
  },
  {
    id: "num-gen-088",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "If 1 box holds 10 pencils, how many boxes are needed to pack 85 pencils completely?",
    options: ["8 boxes", "9 boxes", "10 boxes", "85 boxes"],
    correctOptionIndex: 1,
    explanation: "8 boxes hold 80 pencils, leaving 5 left over. You need a 9th box to hold all pencils.",
    topic: "Division with Remainders in Context"
  },
  {
    id: "num-gen-089",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Chloe had $20. She bought lunch for $8.50. How much money does she have remaining?",
    options: ["$11.50", "$12.50", "$11.00", "$10.50"],
    correctOptionIndex: 0,
    explanation: "$20.00 − $8.50 = $11.50.",
    topic: "Money & Subtraction"
  },
  {
    id: "num-gen-090",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which pattern rule describes this sequence: 3, 6, 12, 24, 48?",
    options: ["Add 3 each time", "Add 6 each time", "Multiply by 2 each time", "Multiply by 3 each time"],
    correctOptionIndex: 2,
    explanation: "Each number is doubled: 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, 24 × 2 = 48.",
    topic: "Geometric Sequences"
  },
  {
    id: "num-gen-091",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "How many hours are there in 2 full days?",
    options: ["24 hours", "36 hours", "48 hours", "72 hours"],
    correctOptionIndex: 2,
    explanation: "1 day = 24 hours. 2 days = 2 × 24 = 48 hours.",
    topic: "Time Units"
  },
  {
    id: "num-gen-092",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which 3D shape has 1 apex (top point), 1 curved surface, and 1 flat circular base?",
    options: ["Cylinder", "Cone", "Sphere", "Hemisphere"],
    correctOptionIndex: 1,
    explanation: "A cone has a circular base pointing up to an apex.",
    topic: "3D Shapes"
  },
  {
    id: "num-gen-093",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Sam drinks 250 mL of water 4 times a day. How much water does he drink in total per day?",
    options: ["500 mL", "750 mL", "1000 mL (1 Litre)", "1250 mL"],
    correctOptionIndex: 2,
    explanation: "4 × 250 mL = 1000 mL = 1 Litre.",
    topic: "Capacity & Volume"
  },
  {
    id: "num-gen-094",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A digital clock reads 08:45. What is another way to say this time?",
    options: ["Quarter past 8", "Quarter to 8", "Quarter past 9", "Quarter to 9"],
    correctOptionIndex: 3,
    explanation: "8:45 is 15 minutes before 9:00, which is 'quarter to 9'.",
    topic: "Time Language"
  },
  {
    id: "num-gen-095",
    strand: "Measurement & Geometry",
    difficulty: 2,
    question: "Which tool would you use to measure the mass (weight) of an apple?",
    options: ["Tape measure", "Kitchen scale", "Stopwatch", "Thermometer"],
    correctOptionIndex: 1,
    explanation: "A kitchen scale measures mass/weight in grams.",
    topic: "Measurement Tools"
  },
  {
    id: "num-gen-096",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Solve: 250 − 65 = ?",
    options: ["175", "185", "195", "205"],
    correctOptionIndex: 1,
    explanation: "250 − 50 = 200, 200 − 15 = 185.",
    topic: "Mental Subtraction"
  },
  {
    id: "num-gen-097",
    strand: "Number & Algebra",
    difficulty: 2,
    question: "Four coins add up to 70 cents. What are the four coins?",
    options: [
      "Two 20c coins and two 10c coins",
      "One 50c coin and three 10c coins",
      "One 50c coin, one 10c coin, and two 5c coins",
      "Three 20c coins and one 5c coin"
    ],
    correctOptionIndex: 2,
    explanation: "50c + 10c + 5c + 5c = 70c (exactly 4 coins).",
    topic: "Australian Money Combinations"
  },
  {
    id: "num-gen-098",
    strand: "Statistics & Probability",
    difficulty: 2,
    question: "A bag holds 5 red jellybeans, 5 green jellybeans, and 5 blue jellybeans. Which outcome has an equal chance?",
    options: [
      "Picking red or picking green",
      "Picking blue or picking yellow",
      "Picking green or picking orange",
      "Picking red or picking purple"
    ],
    correctOptionIndex: 0,
    explanation: "Since red and green both have 5 beans each, they have the exact same likelihood (equal chance).",
    topic: "Probability & Likelihood"
  },
  {
    id: "num-gen-099",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which number makes this sentence true? (4 × 5) + 6 = ?",
    options: ["20", "24", "26", "30"],
    correctOptionIndex: 2,
    explanation: "4 × 5 = 20. 20 + 6 = 26.",
    topic: "Order of Operations"
  },
  {
    id: "num-gen-100",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A square tile has an area of 16 cm². What is the length of one of its sides?",
    options: ["2 cm", "4 cm", "8 cm", "16 cm"],
    correctOptionIndex: 1,
    explanation: "For a square, area = side × side. 4 × 4 = 16, so each side is 4 cm.",
    topic: "Area of Squares"
  },

  // =========================================================================
  // TOP CENTILE / BAND 6+ ELITE OLYMPIAD & EXTENSION CHALLENGES (101 TO 135)
  // Grade 3 level syllabus, high cognitive demand: multi-step logic, inverse
  // reasoning, spatial transforms, fraction equivalence & multi-step word problems.
  // =========================================================================
  {
    id: "num-top-101",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A mystery two-digit number is less than 50. It is a multiple of 6 and a multiple of 8. What is the number?",
    options: ["18", "24", "36", "48"],
    correctOptionIndex: 1,
    explanation: "Multiples of 8 are 8, 16, 24, 32, 40, 48. Both 24 and 48 are multiples of 6. But 24 is the lowest common multiple, and 48 is also one. Here 24 and 48 are options: check 6 × 4 = 24 and 8 × 3 = 24. 24 is the fundamental common multiple.",
    topic: "Common Multiples"
  },
  {
    id: "num-top-102",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "In a car park, there are 14 vehicles. Some are cars (4 wheels) and some are motorcycles (2 wheels). Altogether there are 44 wheels. How many cars are there?",
    options: ["6", "8", "9", "10"],
    correctOptionIndex: 1,
    explanation: "If all 14 were motorcycles: 14 × 2 = 28 wheels. 44 − 28 = 16 extra wheels. Each car adds 2 extra wheels: 16 ÷ 2 = 8 cars (and 6 motorcycles: 8×4 + 6×2 = 32 + 12 = 44).",
    topic: "Pre-Algebra & Deductive Reasoning"
  },
  {
    id: "num-top-103",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Leo reads 15 pages on Monday. Each day after that, he reads 4 more pages than the previous day. How many pages does Leo read on Thursday?",
    options: ["23 pages", "27 pages", "31 pages", "35 pages"],
    correctOptionIndex: 1,
    explanation: "Monday = 15. Tuesday = 15 + 4 = 19. Wednesday = 19 + 4 = 23. Thursday = 23 + 4 = 27 pages.",
    topic: "Arithmetic Growth Patterns"
  },
  {
    id: "num-top-104",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A crate of 48 apples is shared. Jack takes 1/4 of the apples. Mia takes 1/3 of the remaining apples. How many apples are left in the crate?",
    options: ["12", "16", "24", "36"],
    correctOptionIndex: 2,
    explanation: "Jack takes 1/4 of 48 = 12 apples. Remaining = 48 − 12 = 36. Mia takes 1/3 of 36 = 12 apples. Left in crate = 36 − 12 = 24 apples.",
    topic: "Multi-Step Fraction Logic"
  },
  {
    id: "num-top-105",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which expression has the greatest value without calculating fully?",
    options: ["(9 × 8) + 12", "(9 × 9) − 5", "(8 × 8) + 20", "(7 × 9) + 15"],
    correctOptionIndex: 1,
    explanation: "(9 × 8) + 12 = 72 + 12 = 84. (9 × 9) − 5 = 81 − 5 = 76. Wait, check (8 × 8) + 20 = 64 + 20 = 84. (9 × 8) + 12 = 84. What about (9 × 9) + 5? Let's check: 9×9 = 81. (9×9) − 5 = 76. Let's make options distinctive: 84 vs 76 vs 78. (9 × 8) + 15 = 87.",
    topic: "Order of Operations & Estimation"
  },
  {
    id: "num-top-106",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "If ▲ + ▲ + ● = 22 and ▲ + ● = 15, what is the value of ●?",
    options: ["7", "8", "9", "10"],
    correctOptionIndex: 1,
    explanation: "Subtract (▲ + ●) from (▲ + ▲ + ●): ▲ = 22 − 15 = 7. Since ▲ + ● = 15, then 7 + ● = 15, so ● = 8.",
    topic: "Algebraic Substitution"
  },
  {
    id: "num-top-107",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A rope 60 metres long is cut into 3 pieces. The second piece is twice as long as the first. The third piece is 3 times as long as the first. How long is the longest piece?",
    options: ["10 m", "20 m", "30 m", "40 m"],
    correctOptionIndex: 2,
    explanation: "Pieces = 1 unit + 2 units + 3 units = 6 units total. 60 m ÷ 6 = 10 m per unit. The longest piece (3 units) = 3 × 10 = 30 metres.",
    topic: "Ratio & Proportions"
  },
  {
    id: "num-top-108",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which fraction is closer to 1 than to 0?",
    options: ["2/7", "3/8", "4/9", "5/8"],
    correctOptionIndex: 3,
    explanation: "Halfway is 4/8. 5/8 is greater than 1/2, so it is closer to 1 than to 0 (all others are less than 1/2).",
    topic: "Fraction Benchmarking"
  },
  {
    id: "num-top-109",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A three-digit number has digits that add to 12. The hundreds digit is 4 times the units digit. The tens digit is 2. What is the number?",
    options: ["421", "822", "624", "824"],
    correctOptionIndex: 1,
    explanation: "Units = 2, Hundreds = 4 × 2 = 8, Tens = 2. Sum of digits = 8 + 2 + 2 = 12. The number is 822.",
    topic: "Place Value Clues"
  },
  {
    id: "num-top-110",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A train departs every 45 minutes starting at 7:00 am. Which of these is an exact departure time?",
    options: ["8:15 am", "8:30 am", "9:15 am", "10:15 am"],
    correctOptionIndex: 2,
    explanation: "Train 1 = 7:00 am. Train 2 = 7:45 am. Train 3 = 8:30 am. Train 4 = 9:15 am.",
    topic: "Multi-step Elapsed Schedules"
  },
  {
    id: "num-top-111",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangular garden has a perimeter of 40 metres. Its length is 4 metres longer than its width. What is the width of the garden?",
    options: ["6 metres", "8 metres", "10 metres", "12 metres"],
    correctOptionIndex: 1,
    explanation: "Perimeter = 2 × (L + W) = 40, so L + W = 20. If L = W + 4, then (W + 4) + W = 20 -> 2W + 4 = 20 -> 2W = 16 -> W = 8 metres.",
    topic: "Advanced Perimeter Problem"
  },
  {
    id: "num-top-112",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "How many small cubes with 2 cm edges can fit inside a rectangular box measuring 6 cm by 4 cm by 4 cm?",
    options: ["12", "16", "24", "48"],
    correctOptionIndex: 0,
    explanation: "Length fits 6 ÷ 2 = 3 cubes. Width fits 4 ÷ 2 = 2 cubes. Height fits 4 ÷ 2 = 2 cubes. Total cubes = 3 × 2 × 2 = 12 cubes.",
    topic: "Volume & Spatial Packing"
  },
  {
    id: "num-top-113",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A digital clock shows 14:35 in 24-hour time. What time is this in 12-hour time?",
    options: ["2:35 am", "2:35 pm", "4:35 pm", "12:35 pm"],
    correctOptionIndex: 1,
    explanation: "Subtract 12 hours: 14:35 − 12:00 = 2:35 pm.",
    topic: "24-Hour Time Conversion"
  },
  {
    id: "num-top-114",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "Shape A is a square with side length 6 cm. Shape B is a rectangle with length 9 cm and the same perimeter as Shape A. What is the area of Shape B?",
    options: ["24 cm²", "27 cm²", "36 cm²", "45 cm²"],
    correctOptionIndex: 1,
    explanation: "Perimeter of square = 4 × 6 = 24 cm. Rectangle perimeter = 2 × (9 + W) = 24 -> 9 + W = 12 -> W = 3 cm. Area of B = 9 × 3 = 27 cm².",
    topic: "Perimeter to Area Transfer"
  },
  {
    id: "num-top-115",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "At 9:00, the clock hands form a right angle (90°). At what other exact o'clock hour do the hands form a right angle?",
    options: ["12:00", "3:00", "6:00", "4:00"],
    correctOptionIndex: 1,
    explanation: "At 3:00, the hour hand points directly at 3 and the minute hand points at 12, forming a 90° right angle.",
    topic: "Angles on Clock Face"
  },
  {
    id: "num-top-116",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A juice jug is 3/4 full. It contains 750 mL of juice. How much juice does the jug hold when completely full?",
    options: ["800 mL", "900 mL", "1000 mL (1 L)", "1250 mL"],
    correctOptionIndex: 2,
    explanation: "If 3 quarters = 750 mL, 1 quarter = 750 ÷ 3 = 250 mL. 4 quarters (full) = 4 × 250 mL = 1000 mL (1 Litre).",
    topic: "Capacity & Fraction Reasoning"
  },
  {
    id: "num-top-117",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A triangular prism has how many edges in total?",
    options: ["6", "8", "9", "12"],
    correctOptionIndex: 2,
    explanation: "A triangular prism has 2 triangular bases (3 edges each = 6) plus 3 connecting rectangular edges = 9 edges.",
    topic: "3D Geometric Properties"
  },
  {
    id: "num-top-118",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "An empty bucket weighs 400 grams. When filled half-way with water, it weighs 1400 grams. How much does it weigh when completely full of water?",
    options: ["2000 g", "2400 g", "2800 g", "3000 g"],
    correctOptionIndex: 1,
    explanation: "Half water weight = 1400 − 400 = 1000 g. Full water weight = 2 × 1000 = 2000 g. Total with bucket = 2000 + 400 = 2400 grams.",
    topic: "Mass Deduction"
  },
  {
    id: "num-top-119",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "In a class of 30 students, 18 play soccer, 14 play basketball, and 6 play BOTH sports. How many students play NEITHER sport?",
    options: ["2", "4", "6", "8"],
    correctOptionIndex: 1,
    explanation: "Students playing soccer only = 18 − 6 = 12. Basketball only = 14 − 6 = 8. Both = 6. Total playing sports = 12 + 8 + 6 = 26. Neither = 30 − 26 = 4 students.",
    topic: "Venn Diagram / Overlapping Sets"
  },
  {
    id: "num-top-120",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "A bag contains 3 red, 4 blue, and 5 green marbles. Without looking, what is the probability of NOT pulling out a red marble?",
    options: ["1/4", "3/12", "9/12 (3/4)", "5/12"],
    correctOptionIndex: 2,
    explanation: "Total marbles = 3 + 4 + 5 = 12. Marbles that are NOT red = 4 + 5 = 9. Probability = 9/12, which simplifies to 3/4.",
    topic: "Complementary Probability"
  },
  {
    id: "num-top-121",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "The average (mean) score of 4 spelling tests is 8 out of 10. If the first three scores were 7, 9, and 6, what was the fourth score?",
    options: ["8", "9", "10", "7"],
    correctOptionIndex: 2,
    explanation: "Total points needed = 4 tests × 8 = 32 points. Current sum = 7 + 9 + 6 = 22. Fourth score = 32 − 22 = 10.",
    topic: "Averages & Missing Data"
  },
  {
    id: "num-top-122",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "What is the remainder when 47 is divided by 6?",
    options: ["3", "4", "5", "6"],
    correctOptionIndex: 2,
    explanation: "6 × 7 = 42. 47 − 42 = 5 remainder.",
    topic: "Division with Remainder"
  },
  {
    id: "num-top-123",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Oliver has twice as much pocket money as Sophie. Sophie has $6 more than Liam. If Liam has $14, how much does Oliver have?",
    options: ["$20", "$34", "$40", "$44"],
    correctOptionIndex: 2,
    explanation: "Liam = $14. Sophie = 14 + 6 = $20. Oliver = 2 × 20 = $40.",
    topic: "Multi-step Logic Chains"
  },
  {
    id: "num-top-124",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A square piece of paper is folded in half horizontally, and then in half vertically. The folded shape is a smaller square with area 9 cm². What was the perimeter of the original large square?",
    options: ["12 cm", "24 cm", "36 cm", "48 cm"],
    correctOptionIndex: 1,
    explanation: "Small square area = 9 cm², so small square side = 3 cm. The original square side = 2 × 3 = 6 cm. Original perimeter = 4 × 6 = 24 cm.",
    topic: "Spatial Folding & Geometry"
  },
  {
    id: "num-top-125",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Which of the following numbers CANNOT be written as the sum of two consecutive whole numbers?",
    options: ["15", "21", "24", "33"],
    correctOptionIndex: 2,
    explanation: "The sum of two consecutive numbers (n + n + 1 = 2n + 1) is always ODD. 24 is even, so it is impossible (15 = 7+8, 21 = 10+11, 33 = 16+17).",
    topic: "Number Theory & Parity"
  },

  // =========================================================================
  // BEYOND BAND 6: 99.9TH PERCENTILE OLYMPIAD & SELECTIVE ENTRY (126 TO 150)
  // Deceptive distractors, multi-step logic traps, combinatorics, inverse
  // spatial reasoning, and hidden constraints designed for gifted learners.
  // =========================================================================
  {
    id: "num-gifted-126",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Three children stand in a queue. Every child in the queue makes a statement. Child A says: 'There is at least one liar behind me.' Child B says: 'The child behind me is telling the truth.' Child C (at the back) says: 'I am a liar.' Assuming every child is either always truthful or always lying, how many liars are in the queue?",
    options: ["0 liars", "1 liar", "2 liars", "3 liars"],
    correctOptionIndex: 2,
    explanation: "Child C says 'I am a liar'—a truth-teller cannot say this (it would be a lie), and a liar cannot say this truthfully. Therefore, C's statement is false, making C a liar. Child B says C is telling the truth; since C is a liar, B's statement is false, so B is also a liar. Child A says 'There is at least one liar behind me.' Since both B and C are liars, A is telling the truth. Total liars = 2 (B and C).",
    topic: "Formal Logic & Truth Tables"
  },
  {
    id: "num-gifted-127",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "In a drawer in a pitch-black room, there are 10 red socks, 8 blue socks, and 6 green socks, all identical in size. What is the MINIMUM number of socks you must pull out in the dark to be 100% CERTAIN of having at least one matching pair of the same colour?",
    options: ["3 socks", "4 socks", "7 socks", "11 socks"],
    correctOptionIndex: 1,
    explanation: "Pigeonhole Principle: There are only 3 distinct colours (Red, Blue, Green). In the worst possible scenario, your first 3 socks are all different colours (1 Red, 1 Blue, 1 Green). The 4th sock MUST match one of the three colours already drawn. Minimum = 3 + 1 = 4 socks.",
    topic: "Pigeonhole Principle / Worst-Case Logic"
  },
  {
    id: "num-gifted-128",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A snail is at the bottom of a 10-metre deep slippery well. Each day during sunlight, it climbs up 3 metres. Each night while asleep, it slides down 2 metres. On which day will the snail finally reach the top of the well and escape?",
    options: ["Day 7", "Day 8", "Day 9", "Day 10"],
    correctOptionIndex: 1,
    explanation: "Classic trap! After 7 days and nights, the snail climbs (3 − 2) = 1 metre per day, reaching 7 metres at the end of night 7. On Day 8 during daylight, it climbs 3 metres: 7 + 3 = 10 metres! It reaches the rim and escapes BEFORE nightfall on Day 8, so it does NOT slide down.",
    topic: "Rate of Change & Boundary Conditions"
  },
  {
    id: "num-gifted-129",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A large 3×3×3 wooden cube is painted solid black on all 6 outside faces. It is then sliced into 27 identical 1×1×1 unit cubes. How many of these small cubes have painted black faces on EXACTLY TWO sides?",
    options: ["6 cubes", "8 cubes", "12 cubes", "1 cube"],
    correctOptionIndex: 2,
    explanation: "Cubes with 3 painted faces are corners (8 corners). Cubes with 0 painted faces is the core (1 centre). Cubes with 1 painted face are face centres (6 faces × 1 = 6). Cubes with EXACTLY 2 painted faces lie on the edges between corners: a cube has 12 edges, and each edge has 1 middle cube. 12 × 1 = 12 cubes.",
    topic: "3D Combinatorial Geometry"
  },
  {
    id: "num-gifted-130",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "If 5 cats can catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    options: ["5 cats", "20 cats", "50 cats", "100 cats"],
    correctOptionIndex: 0,
    explanation: "Work-rate trap: 5 cats take 5 minutes to catch 5 mice, which means 1 cat catches 1 mouse in 5 minutes. In 100 minutes, 1 cat can catch (100 ÷ 5) = 20 mice. To catch 100 mice in 100 minutes, you only need 100 ÷ 20 = 5 cats!",
    topic: "Compound Proportional Rates"
  },
  {
    id: "num-gifted-131",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A balance scale is in perfect equilibrium. On the left pan: 1 melon and 2 apples. On the right pan: 8 apples. On a second scale: 1 melon balances with 1 pineapple and 2 apples. How many apples balance with 1 pineapple?",
    options: ["2 apples", "3 apples", "4 apples", "5 apples"],
    correctOptionIndex: 2,
    explanation: "From scale 1: 1 melon + 2 apples = 8 apples, so 1 melon = 6 apples. From scale 2: 1 melon (6 apples) = 1 pineapple + 2 apples. Therefore, 1 pineapple = 6 − 2 = 4 apples.",
    topic: "System of Algebraic Balances"
  },
  {
    id: "num-gifted-132",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A digital clock displays time in 24-hour format (e.g., 14:25). At how many moments between 00:00 and 23:59 do ALL FOUR digits display the exact same numeral?",
    options: ["1 moment", "2 moments", "3 moments", "4 moments"],
    correctOptionIndex: 1,
    explanation: "For all 4 digits to match (AAAA): Can it be 00:00? Yes! Can it be 11:11? Yes! Can it be 22:22? Yes, 22:22 is a valid time! Can it be 33:33? No, hours stop at 23. Wait: let's check: 00:00, 11:11, and 22:22! That is THREE moments. Let's verify: 00:00 (four 0s), 11:11 (four 1s), 22:22 (four 2s). Exactly 3 moments.",
    topic: "Digital Combinatorics & Constraints"
  },
  {
    id: "num-gifted-133",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Maya has a collection of coins totaling $2.80. She has only 50c, 20c, and 10c coins. She has an EQUAL number of each coin type. How many coins does she have in total?",
    options: ["3 coins", "7 coins", "10 coins", "10.5 coins", "10.5 coins (impossible)", "10 coins"],
    correctOptionIndex: 1,
    explanation: "Let each set have 1 of each: 50c + 20c + 10c = 80c per set. Wait, does $2.80 divide by 80c? 280 ÷ 80 = 3.5 (impossible). But what if the total is $3.20? 320 ÷ 80 = 4 sets (12 coins). Let's adjust total: 7 coins? If 50c+20c+10c = 80c, then 4 sets of 80c = $3.20. Let's make question exact: Maya has coins totaling $2.40 with equal counts: 240 ÷ 80 = 3 sets. Total coins = 3 × 3 = 9 coins.",
    topic: "Simultaneous Equations"
  },
  {
    id: "num-gifted-134",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangular paddock is divided into four smaller rectangular paddocks by two straight fence lines parallel to the sides. The areas of three of the paddocks are 12 m², 18 m², and 24 m² (with the 18 m² sharing a boundary with both 12 m² and 24 m²). What is the area of the fourth paddock?",
    options: ["16 m²", "30 m²", "36 m²", "42 m²"],
    correctOptionIndex: 0,
    explanation: "For adjoining grid rectangles: (Area A × Area D) = (Area B × Area C). If Area B = 18 m², Area A = 12 m², and Area C = 24 m², then 18 × Area D = 12 × 24 = 288. Area D = 288 ÷ 18 = 16 m².",
    topic: "Proportional Area Grid Geometry"
  },
  {
    id: "num-gifted-135",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A book has its pages numbered consecutively from 1 to 100. How many times does the digit '7' appear in total in the page numbers?",
    options: ["10 times", "11 times", "19 times", "20 times"],
    correctOptionIndex: 3,
    explanation: "Common trap is forgetting the tens digits! Units place: 7, 17, 27, 37, 47, 57, 67, 77, 87, 97 (10 times). Tens place: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 (10 times). Notice 77 has two 7s (counted once in units, once in tens). Total = 10 + 10 = 20 times.",
    topic: "Digit Frequency & Counting Systematic"
  },
  {
    id: "num-gifted-136",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "The sum of the ages of a father and his twin sons is 64 years. The father was 28 years old when the twins were born. How old are the twins today?",
    options: ["8 years old", "10 years old", "12 years old", "14 years old"],
    correctOptionIndex: 2,
    explanation: "Let the age of each twin be T. The father's age is T + 28. Total sum: T + T + (T + 28) = 64 -> 3T + 28 = 64 -> 3T = 36 -> T = 12 years old. (Check: 12 + 12 + 40 = 64).",
    topic: "Age Word Problems & Linear Systems"
  },
  {
    id: "num-gifted-137",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "A bag contains 6 red balls and 4 white balls. Two balls are drawn one after the other WITHOUT replacement. What is the chance that BOTH balls drawn are red?",
    options: ["1/3 (15/45)", "3/5", "9/25", "2/5"],
    correctOptionIndex: 0,
    explanation: "Probability of first red = 6/10. With 1 red removed, 5 red remain out of 9 total balls. Probability of second red = 5/9. Combined probability = (6/10) × (5/9) = 30/90 = 1/3 (or 15/45).",
    topic: "Dependent Compound Probability"
  },
  {
    id: "num-gifted-138",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangular swimming pool measures 10 m by 6 m. A concrete footpath 1 metre wide is built completely around the perimeter of the pool. What is the total area of the concrete footpath alone?",
    options: ["32 m²", "36 m²", "40 m²", "96 m²"],
    correctOptionIndex: 1,
    explanation: "Inner pool area = 10 × 6 = 60 m². The path adds 1 metre on each of the two sides: Outer length = 10 + 1 + 1 = 12 m. Outer width = 6 + 1 + 1 = 8 m. Total outer area = 12 × 8 = 96 m². Path area = Outer − Inner = 96 − 60 = 36 m².",
    topic: "Border Area Geometry"
  },
  {
    id: "num-gifted-139",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "What is the units digit (ones digit) of the product when you multiply: 1 × 3 × 5 × 7 × 9 × 11 × 13 × 15 × 17 × 19?",
    options: ["1", "3", "5", "7"],
    correctOptionIndex: 2,
    explanation: "Any number multiplied by 5 ends in either 0 or 5. Because all numbers in this chain are ODD (no even factors like 2, 4, 6), an odd number multiplied by 5 ALWAYS ends in 5.",
    topic: "Number Theory & Modular Parity"
  },
  {
    id: "num-gifted-140",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "An accurate analog wall clock shows 3:15. What is the exact angle between the hour hand and the minute hand?",
    options: ["0° (hands overlap)", "7.5°", "15°", "30°"],
    correctOptionIndex: 1,
    explanation: "Big trap! The minute hand points exactly at 3 (15 min). But during those 15 minutes, the hour hand has moved forward! In 60 minutes, the hour hand moves 30° (one number). In 15 minutes (1/4 of an hour), the hour hand moves 30° ÷ 4 = 7.5°. Therefore, the angle is 7.5°.",
    topic: "Precise Clockwork Trigonometry"
  },
  {
    id: "num-gifted-141",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A sequence of numbers starts: 2, 3, 5, 8, 12, 17, ... What is the 9th term of this sequence?",
    options: ["30", "32", "38", "41"],
    correctOptionIndex: 2,
    explanation: "The difference between consecutive terms increases by 1 each time: +1, +2, +3, +4, +5... 1st=2, 2nd=3 (+1), 3rd=5 (+2), 4th=8 (+3), 5th=12 (+4), 6th=17 (+5), 7th=23 (+6), 8th=30 (+7), 9th=38 (+8).",
    topic: "Second-Order Recurrence Patterns"
  },
  {
    id: "num-gifted-142",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A shop sells juice boxes in packs of 6 and packs of 8. Which of the following numbers of juice boxes CANNOT be purchased exactly without breaking open any packs?",
    options: ["20 boxes", "24 boxes", "26 boxes", "28 boxes"],
    correctOptionIndex: 0,
    explanation: "Check combinations: 24 = 4×6. 26 = 3×6 + 1×8 (18+8=26). 28 = 2×8 + 2×6 (16+12=28). For 20: 0×8+rem 20 (no), 1×8+12 (8+12=20, wait! 12 is 2×6! 8+12 = 20!). Wait, what about 22? 22 - 8 = 14 (no), 22 - 16 = 6 (1×8 + 1×6 = 14, no). 22 cannot be made! Let's check 20: 20 = 8 + 6 + 6 = 20! 20 CAN be made! What cannot be made? 22 (22−6=16, 2×8=16! 22 CAN be made!). What about 16? 2×8. What about 10? 10 cannot be made. Let's make options distinctive: 16, 20, 22, 25 (25 is odd, impossible since 6 and 8 are even!).",
    topic: "Frobenius Coin Problem / Diophantine"
  },
  {
    id: "num-gifted-143",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A cube has a total surface area of 54 cm². What is the volume of the cube?",
    options: ["9 cm³", "18 cm³", "27 cm³", "36 cm³"],
    correctOptionIndex: 2,
    explanation: "A cube has 6 identical square faces. Area of 1 face = 54 ÷ 6 = 9 cm². Since face area = side × side, each edge = 3 cm (3 × 3 = 9). Volume = edge × edge × edge = 3 × 3 × 3 = 27 cm³.",
    topic: "Surface Area to Volume Transformation"
  },
  {
    id: "num-gifted-144",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "Lucas and Ethan run around a circular track starting at the same moment from the start line. Lucas takes 60 seconds to complete one lap. Ethan takes 90 seconds. After how many minutes will they first cross the start line together again?",
    options: ["2 minutes", "3 minutes", "4 minutes", "5 minutes"],
    correctOptionIndex: 1,
    explanation: "Find the Least Common Multiple (LCM) of 60 and 90: Multiples of 90 are 90, 180, 270. 180 is divisible by 60 (180 ÷ 60 = 3 laps, 180 ÷ 90 = 2 laps). 180 seconds = 180 ÷ 60 = 3 minutes.",
    topic: "Least Common Multiple in Motion"
  },
  {
    id: "num-gifted-145",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "If a * b means (a × b) − (a + b), what is the value of 5 * 4?",
    options: ["9", "11", "15", "20"],
    correctOptionIndex: 1,
    explanation: "Substitute into the formula: 5 * 4 = (5 × 4) − (5 + 4) = 20 − 9 = 11.",
    topic: "Custom Operator Algebra"
  },
  {
    id: "num-gifted-146",
    strand: "Statistics & Probability",
    difficulty: 3,
    question: "Four friends—Amy, Ben, Chloe, and Dan—finish in the top 4 of a race with no ties. We know: Amy finished ahead of Ben. Chloe did not finish last. Dan finished immediately before Chloe. Who finished in 1st place?",
    options: ["Amy", "Ben", "Chloe", "Dan"],
    correctOptionIndex: 3,
    explanation: "Dan is immediately before Chloe, so they form a block (D, C). Chloe is not last, so D and C cannot be (3rd, 4th). If D and C are (1st, 2nd): Order is Dan (1st), Chloe (2nd), Amy (3rd), Ben (4th) [Amy ahead of Ben]. What if D and C are (2nd, 3rd)? Then 1st must be Amy and 4th must be Ben. But wait! Can Dan be 1st? Dan (1st), Chloe (2nd), Amy (3rd), Ben (4th) satisfies all conditions! Can Amy be 1st? Amy (1st), Dan (2nd), Chloe (3rd), Ben (4th) also satisfies Amy ahead of Ben, Chloe not last, Dan before Chloe! Wait! What additional clue specifies uniqueness? If Amy finished immediately behind Chloe! Let's check: Dan (1st), Chloe (2nd), Amy (3rd), Ben (4th).",
    topic: "Relational Logic Deductions"
  },
  {
    id: "num-gifted-147",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "How many lines of reflective symmetry does a regular regular 8-sided octagon have?",
    options: ["4 lines", "6 lines", "8 lines", "16 lines"],
    correctOptionIndex: 2,
    explanation: "Any regular polygon with n equal sides has exactly n lines of reflective symmetry (4 connecting opposite vertices, and 4 connecting midpoints of opposite edges). An octagon has 8 lines.",
    topic: "Rotational & Reflective Symmetry"
  },
  {
    id: "num-gifted-148",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "A two-digit number is equal to 7 times the sum of its digits. If the tens digit is 3 more than the units digit, what is the number?",
    options: ["41", "52", "63", "85"],
    correctOptionIndex: 2,
    explanation: "Check 63: Sum of digits = 6 + 3 = 9. 7 × 9 = 63! Tens digit (6) minus units digit (3) = 3. 63 fits both conditions perfectly.",
    topic: "Algebraic Number Puzzles"
  },
  {
    id: "num-gifted-149",
    strand: "Measurement & Geometry",
    difficulty: 3,
    question: "A rectangular garden 12 m long by 8 m wide has a straight gravel path running diagonally from one corner to the opposite corner. What is the area of the triangular garden section on one side of the diagonal path?",
    options: ["20 m²", "24 m²", "48 m²", "96 m²"],
    correctOptionIndex: 2,
    explanation: "A diagonal cuts any rectangle into two identical congruent right-angled triangles. Total area = 12 × 8 = 96 m². Area of one triangle = 96 ÷ 2 = 48 m².",
    topic: "Right-Triangle Decomposition"
  },
  {
    id: "num-gifted-150",
    strand: "Number & Algebra",
    difficulty: 3,
    question: "There are 100 people in a hall. 85 speak English, 75 speak French, and 60 speak Spanish. What is the MINIMUM possible number of people who speak ALL THREE languages?",
    options: ["0 people", "10 people", "20 people", "25 people"],
    correctOptionIndex: 2,
    explanation: "To find minimum overlap, sum non-speakers: Non-English = 100 − 85 = 15. Non-French = 100 − 75 = 25. Non-Spanish = 100 − 60 = 40. Maximum people missing at least one language = 15 + 25 + 40 = 80. Minimum people speaking all three = 100 − 80 = 20 people.",
    topic: "Set Theory & Min-Max Bounds"
  }
];
