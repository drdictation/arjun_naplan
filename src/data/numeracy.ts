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
  }
];
