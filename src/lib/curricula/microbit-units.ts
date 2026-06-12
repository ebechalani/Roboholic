import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty } from '@/types';

// ════════════════════════════════════════════════════════════════
//  micro:bit — themed schemes of work (BBC micro:bit Foundation /
//  "do your :bit"). AUTO-GENERATED from the official lesson plans,
//  summaries and slide decks (CC BY-SA 4.0). Slide images are
//  rendered from the source .pptx; plans/handouts/.hex are in Drive.
//  Edit scripts/gen-microbit-units.mjs and re-run to regenerate.
// ════════════════════════════════════════════════════════════════

export const MICROBIT_COURSE_TITLE = 'micro:bit Coding & Computing (MakeCode)';

interface UnitLesson { n: number; slug: string; title: string; pages: number; intro: string; materials: string; objectives: string[]; activities: string[]; extension: string[]; differentiation: string[]; assessment: string[]; }
interface Unit { slug: string; title: string; emoji: string; order: number; description: string; skills: string[]; lessons: UnitLesson[]; }

const UNITS: Unit[] = [
 {
  "slug": "compfun",
  "title": "Computing fundamentals",
  "emoji": "🧮",
  "order": 2,
  "description": "This series of six lessons is aimed at students in the first year of secondary school. Students are introduced to the core concepts of computational thinking, programming and computer systems through unplugged activities and learning with the BBC micro:bit. No prior learning is assumed and this is an ideal introduction for students to ensure they have a shared understanding of these important elements of computing.",
  "skills": [
   "Algorithms",
   "Flowcharts",
   "Pseudocode",
   "Selection",
   "Iteration",
   "Hardware & software"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-compfun-1",
    "title": "Computational thinking 1596265019050",
    "pages": 18,
    "intro": "In this lesson students are introduced to Computational Thinking through a team giant paper aeroplane challenge. They create and test a giant paper aeroplane and create instructions (an algorithm) for someone else to follow. You will needLesson plan, presentation, large sheets of strong poster paper and normal paper, clear tape, coloured marker pens, stickers (optional), tape measure (optional)",
    "materials": "",
    "objectives": [
     "To understand what ‘computational thinking’ is",
     "To develop computational thinking skills",
     "To write an accurate algorithm",
     "Lesson summary approx 60 minutes",
     "Team giant aeroplane challenge (15 minutes)",
     "Flying time (10 minutes)"
    ],
    "activities": [
     "To understand what ‘computational thinking’ is",
     "To develop computational thinking skills",
     "To write an accurate algorithm",
     "Lesson summary approx 60 minutes",
     "Team giant aeroplane challenge (15 minutes)",
     "Flying time (10 minutes)",
     "Writing instructions (10 minutes)",
     "Sharing instructions (5 minutes)",
     "Introducing computational thinking (15 minutes)",
     "Review & wrap up (5 minutes)",
     "1. Introduction: Team giant paper aeroplane challenge (15 minutes)",
     "Introduce students to the challenge (slide 2)",
     "Split the students into teams and give out large pieces of poster paper, a roll of tape, coloured marker pens and any stickers",
     "Set a visible timer and give teams 10 minutes to create their paper aeroplanes (adjust the time to suit your students).",
     "Students may want more instructions, however emphasise that you are looking for them to use their skills of problem solving, experimentation and debugging. If any groups really struggle, you could give them the first instructions from https://www.bbc.co.uk/newsround/26050831 as a starting point.",
     "2. Testing & Flying (10 minutes)",
     "Once the time is up, go to a suitable area to test the aeroplanes (awarding prizes if you wish!).",
     "3. Writing instructions (10 minutes)",
     "Explain that you want them to write instructions for someone else to follow to create a giant paper aeroplane (slide 3)",
     "Give out large pieces of paper and ask teams to write the steps for creating the paper aeroplane (encourage creativity in how they do this, just emphasising that someone else should be able to follow it).",
     "Remind them they may also need to make adjustments from their own aeroplane if this wasn’t very successful!",
     "4. Sharing instructions (5 minutes)",
     "Give teams time to share and compare their instructions with other teams.",
     "Discuss how they have each approached the challenge, discussing what they noticed from comparing their instructions (eg. were they more/less detailed, which were easiest to follow etc) and highlighting there are different ways to write the instructions to meet the same goal.",
     "5. Introducing Computational thinking (15 minutes)",
     "Introduce the term ‘computational thinking’ (slides 4 & 5).",
     "Ask students to share any knowledge and understanding they currently have around computational thinking and introduce the learning objectives if you wish (slide 6).",
     "Use slides 7 - 16 to explain each term to students (the first slide of each term), then asking them to consider in their teams how they used that skill (the second slide - click to reveal some examples for each concept).",
     "6. Wrap up (5 minutes)",
     "Give out prizes for the giant aeroplane challenge if appropriate.",
     "Invite students to share their learning from today, informally assessing their knowledge and understanding of computational thinking concepts covered in the lesson, revisiting the learning objectives on slide 17 if you wish."
    ],
    "extension": [
     "You could extend the flying section significantly to include collecting, analysing and presenting data using spreadsheets.",
     "If your students have prior experience of designing algorithms, or you wish to extend the algorithmic understanding in this lesson, ask students to progress from using natural language in their algorithm to pseudocode and/or flowcharts.",
     "Ask students to create an algorithm of any activity they do in their daily lives (e.g. getting dressed, walking their dog, playing their favourite game etc)."
    ],
    "differentiation": [
     "Support:",
     "Consider groupings carefully to enable all students to participate.",
     "Give students suitable support with their algorithms, encouraging them to use images and simple language if helpful, or giving them statements and/or images to sequence.",
     "Stretch & challenge:",
     "Challenge students to create more detailed, accurate algorithms with less room for ambiguity.",
     "See also extension activities."
    ],
    "assessment": [
     "Informal assessment of students’ algorithms and answers to questions.",
     "Informal observation of students’ participation during the team activity and discussion."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-compfun-2",
    "title": "Computational thinking 2596265019050",
    "pages": 17,
    "intro": "In this lesson students deepen and extend their learning of computational thinking. They consider how they use the concepts covered in the last lesson in other subjects before designing a prototype of a computerised paper aeroplane to develop their understanding that using a computer to help solve a problem is an important step in computational thinking. You will need: Lesson plan, lesson guide and worksheets, large sheets of paper, various crafting materials (e.g. card, pens, glue, sticky tape).",
    "materials": "",
    "objectives": [
     "To develop a deeper understanding of computational thinking concepts",
     "To understand the steps in computational thinking",
     "To develop and present a prototype and algorithm for a computerised paper aeroplane",
     "Lesson summary approx 60 minutes",
     "Computational thinking recap (5 minutes)",
     "‘Computational’ thinking (10 minutes)"
    ],
    "activities": [
     "To develop a deeper understanding of computational thinking concepts",
     "To understand the steps in computational thinking",
     "To develop and present a prototype and algorithm for a computerised paper aeroplane",
     "Lesson summary approx 60 minutes",
     "Computational thinking recap (5 minutes)",
     "‘Computational’ thinking (10 minutes)",
     "Designing better paper aeroplanes with computers (10 minutes)",
     "Creating a prototype (20 minutes)",
     "Presenting prototypes (10 minutes)",
     "Review & wrap up (5 minutes)",
     "1. Introduction: Computational Thinking recap (5 minutes)",
     "Recap last lesson’s learning using slides 3 to 8.",
     "2. ‘Computational’ Thinking (10 minutes)",
     "Highlight to students that the skills they have been using can be applied in many different fields and subjects of study.",
     "Have a quick challenge quiz to get teams to come up with one way they use each concepts in different subjects (slide 9) and briefly discuss examples (slide 10).",
     "Invite students to share how computational thinking is different from these general skills they use in other subjects and remind them that computational thinking is looking at a problem in a way that a computer can help us to solve it (slide 11).",
     "3. Designing better paper aeroplanes with computers (10 minutes)",
     "Explain that they are going to use computational thinking to consider how computers could help to create a giant aeroplane that is ‘better’ (slide 12).",
     "Discuss what ‘Better’ could mean. E.g. it flies for a longer time or further, it can be directed or is more controllable - they can choose their own interpretation.",
     "Give out large pieces of paper to teams and invite them to brainstorm and share their ideas. Encourage students to be creative using the examples on slide 12 if you wish as a starting point.",
     "4. Creating a prototype (20 minutes)",
     "Give out large pieces of paper and some basic crafting materials to students and explain that you would like them to create a paper prototype of their idea to present to the class (slides 13 & 14). Encourage creativity in how they create and present their prototype and algorithm.",
     "5. Presenting prototypes (10 minutes)",
     "Ask each team to present their prototype and algorithm to the class, prompting them to consider how they used their computational thinking skills and inviting peer feedback.",
     "6. Wrap up (5 minutes)",
     "Review the learning objectives if you wish on slide 15 and invite students to create an ‘exit ticket’ for the lesson using the questions on slide 16."
    ],
    "extension": [
     "You could ask students to write a one page explanation of what computational thinking is and how they used it in the creation of their prototype.",
     "Teams could create questions (increasing in difficulty) to create a class Computational Thinking quiz."
    ],
    "differentiation": [
     "Support:",
     "Students can focus on one aspect of computational thinking in the first activity; e.g. just thinking about where they use instructions (algorithms).",
     "They may need additional support and examples for coming up with ideas in the prototyping task, though there are no right and wrong ideas, so encourage creativity to build confidence.",
     "Stretch & challenge:",
     "Students can be asked to think of more challenging examples in the first activity; e.g. further examples of abstraction.",
     "Encourage students to strive for more detail in their algorithm and prototype.",
     "Challenge students to consider and discuss potential problems with their prototype and how they could be approached."
    ],
    "assessment": [
     "Informal observation and assessment of students’ responses during team activities",
     "Observations made during the prototype creation challenge.",
     "More formal assessment of team’s prototype and individual responses to the exit ticket if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-compfun-3",
    "title": "Programming 1",
    "pages": 14,
    "intro": "In this lesson students develop their understanding of computational thinking further and learn, through practical application, how algorithms are used to create programs, using flowcharts and pseudocode. They also learn about the importance of testing and debugging, giving an opportunity to recap, consolidate and extend learning from KS2.",
    "materials": "Lesson plan, lesson guide, rough paper, micro:bit MakeCode editor",
    "objectives": [
     "To understand the relationship between algorithms and programming",
     "To understand and use pseudocode and flowchart algorithms",
     "To tinker, test and debug to create a working program using a graphical programming language",
     "Lesson summary – approx. 60 minutes",
     "Recapping algorithms (5 minutes)",
     "Pseudocode and flowcharts (7 minutes)"
    ],
    "activities": [
     "Lesson plan, lesson guide, rough paper, micro:bit MakeCode editor",
     "Learning objectives",
     "To understand the relationship between algorithms and programming",
     "To understand and use pseudocode and flowchart algorithms",
     "To tinker, test and debug to create a working program using a graphical programming language",
     "Lesson summary – approx. 60 minutes",
     "Recapping algorithms (5 minutes)",
     "Pseudocode and flowcharts (7 minutes)",
     "Introducing programming (5 minutes)",
     "Tinkering with the MakeCode editor (10 minutes)",
     "Writing programs (10 minutes)",
     "Testing and debugging programs (10 minutes)",
     "Sharing programs (8 minutes)",
     "Review & wrap up (5 minutes)",
     "1. Introduction: Recapping algorithms (5 minutes)",
     "Give out rough paper, show slide 2 and ask students to work in pairs to rearrange the instructions to create the algorithm for getting up (there are several possible combinations - a suggestion is on slide 3). If appropriate, encourage students to add their own steps too.",
     "Highlight the repetition used to make the algorithm more efficient, spending more time on this if necessary for your students.",
     "Ask students to think/pair/share what they know about algorithms from the computational thinking fundamentals lessons 1 and 2 and prior experience to recap, using the discussion to highlight the points on slide 4.",
     "2. Pseudocode and flowcharts (7 minutes)",
     "Use slides 5 and 6 to explain (or recap) that while algorithms can just be a simple set of instructions, as in the previous giant paper aeroplane activities, in computing we usually write them using pseudocode and flowcharts.",
     "Briefly highlight the standard format for pseudocode and standard flowchart symbols and inputs and outputs (these will be returned to in later lessons).",
     "Invite students to consider why we use pseudocode and/or flowcharts (it makes the algorithm easier for a human to follow when they program it into a computer, is clear and avoids ambiguity, is a standard format, so everyone can follow/understand, can be used with any programming language, improves speed and accuracy etc.)",
     "3. Introducing programming (5 minutes)",
     "Explain that in this lesson they will be programming using the micro:bit MakeCode editor, which is a graphical programming language, and share the learning objectives on slide 7 if you wish.",
     "Invite students to think/pair/share what they know about programming already (slide 8) and which programming languages they have already used or know (slide 9), highlighting others which are graphical and have a block-based interface (e.g Scratch, Kodu), which will give them a head start.",
     "4. Tinkering with the MakeCode editor (10 minutes)",
     "Show students how to access the MakeCode editor and start a new project.",
     "Individually, or in pairs, give students five minutes to ‘tinker’ with the environment to see what they can find out (try to encourage discovery, rather than giving them instructions, however if they struggle with this, ask them to find out how to create and run a simple program).",
     "After five minutes, invite students to show and share what they have discovered, ensuring you cover as a class how to create, run and stop at least a basic program.",
     "5. Writing programs (10 minutes)",
     "Show students the algorithm(s) on slide 10 (printed copies may be useful for them) and ask them to guess what they will do. A flowchart is given just for the first one, so ask students how this will change for the second.",
     "Explain that their challenge is to create a program from the algorithm using the MakeCode blocks editor.",
     "Briefly discuss how they can best approach this (e.g. logically, step-by-step), giving additional assistance to any students who may need it.",
     "Give students 10 minutes to work on the challenge. Those who are confident, can add additional elements to the algorithm and their program.",
     "6. Testing and debugging programs (10 minutes)",
     "Stop students at an appropriate point and ask them to share any problems they have encountered and how they have approached solving them.",
     "Highlight that regular testing and finding and fixing errors (debugging) are essential steps in programming, so they need to get in the habit of doing this regularly (slide 11).",
     "Encourage them to help each other to solve problems (i.e. not simply asking you when they are stuck!).",
     "Give students a further five minutes to test and debug their programs.",
     "7. Sharing programs (8 minutes)",
     "Have a ‘round robin’ sharing session where students share their programs with their peers.",
     "Discuss as a class, inviting them to share any different ways they have achieved the same goal, how they solved any problems they encountered and how they found following the flowchart and/or pseudocode.",
     "If this would not work owing to space, or dynamics, invite a few students to the front to share and discuss as above.",
     "8. Wrap up (5 minutes)",
     "Review the learning objectives if you wish on slide 12 and invite students to answer the questions on slide 13 either during the lesson or for homework if you wish."
    ],
    "extension": [
     "You could ask students to design their own pseudocode and/or flowchart algorithms for everyday activities.",
     "They could write algorithms for each other, increasing in difficulty, then swap to create, test and debug the programs (this could also be a stretch and challenge activity)."
    ],
    "differentiation": [
     "Support:",
     "Students may benefit from having slides 2, 5, 6, and 10 printed out so they can follow more easily.",
     "They can program only one part of the algorithm to the programming activity on slide 10 or you can set them easier challenges.",
     "They may benefit from more structured tinkering, being given some guidance as to which coloured blocks to focus on if helpful.",
     "Stretch & challenge:",
     "Encourage students to create a more complex algorithm and program and their own examples once they have completed the given one.",
     "Also see extension."
    ],
    "assessment": [
     "Informal observation of students’ during activities and discussion.",
     "Informal assessment of students’ programs and answers to review questions."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-compfun-4",
    "title": "Programming 2",
    "pages": 13,
    "intro": "In this lesson students develop their understanding of algorithms and programming by experimenting with iteration and selection and graphical and text-based programming languages.",
    "materials": "Lesson plan, lesson guide, paper, micro:bit MakeCode editor",
    "objectives": [
     "To understand iteration and selection and why they are used",
     "To develop algorithms and programs using iteration and selection",
     "To experiment with graphical and text-based programming languages"
    ],
    "activities": [
     "Write the algorithm (5 minutes)",
     "Iteration and selection (10 minutes)",
     "Using iteration (15 minutes)",
     "Using selection (15 minutes)",
     "Experimenting and sharing (10 minutes)",
     "Wrap up (5 minutes)",
     "1. Introduction: Write the algorithm (5 minutes)",
     "Give out paper to pairs and show the program on slide 2. Ask students to write the algorithm for the program using pseudocode.",
     "As a class write the algorithm and address any misconceptions (click for example pseudocode).",
     "2. Iteration and selection (10 minutes)",
     "Explain today’s lesson will focus on key concepts in algorithms and programming, sharing the learning objectives on slide 3 if you wish.",
     "Invite students to share their current understanding of iteration and selection (slide 4).",
     "Highlight the repetition used in the introductory activity (slide 5) and as a class discuss and show how the algorithm and program could be amended to include selection (slide 6).",
     "Invite students to think/pair/share why we use selection and iteration in algorithms & programs (slide 7).",
     "3. Using iteration (15 minutes)",
     "Explain you would like students to experiment with using iteration. Firstly, designing an algorithm using iteration, then using their algorithm to write a program using the MakeCode editor (slide 8).",
     "Give out paper and suggest students take 5 minutes to write their algorithm, then 5 minutes to program, testing and debugging as they go (you can set a timer to give prompts if you wish).",
     "As they are writing their algorithms and programs, look for good examples and when the time is up, invite students to share these with the class and others to share their learning.",
     "4. Using selection (15 minutes)",
     "Repeat the above for selection (slide 9), either extending the current algorithm and program, or creating another.",
     "5. Graphical and text programming languages (10 minutes)",
     "Invite students to recap what kind of programming language the MakeCode editor is (graphical) and what other type there is (text-based), using slide 10 to recap and illustrate.",
     "Show students how to access the JavaScript version of the program they have created and ask them to view and experiment with the JavaScript version of their program, going between the graphical and text-based language to make changes and view the impact.",
     "Discuss as a class, inviting students to share their observations and insights.",
     "6. Wrap up (5 minutes)",
     "Show the key words on slide 11 and give students 1 minute each to discuss in their pairs what they now know about each one (you can set a timer for a minute each, or swap the starting person for each word to ensure equal participation).",
     "If you have time, share as a class and review the learning objectives if you wish on slide 12."
    ],
    "extension": [
     "You could introduce the micro:bit Python editor and get students to experiment with using that (this could also be a stretch and challenge activity).",
     "Students could swap their algorithms to test and debug and/or program, giving feedback to each other.",
     "Students could record a short video/screen recording to talk through their algorithms and code, highlighting where they have used selection and iteration to explain their understanding, or they could print and annotate their code."
    ],
    "differentiation": [
     "Support:",
     "Ask students to focus on simple iteration and selection, giving further examples and support if needed.",
     "Through discrete questioning and observation, ensure a clear understanding of the basic concepts and confident use in algorithms and programs before moving to more complex use.",
     "Stretch & challenge:",
     "Encourage students to create algorithms and programs with more complex use of iteration and selection (and combining both).",
     "Also see extension activities."
    ],
    "assessment": [
     "Informal observation of students’ during activities, discussions and wrap up.",
     "More formal assessment of students’ algorithms and programs."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-compfun-5",
    "title": "Computer systems 1",
    "pages": 15,
    "intro": "In this lesson students develop their understanding of computer systems, learning about input and output devices, hardware and software and applying their understanding when creating algorithms and programming using micro:bit.",
    "materials": "Lesson plan, lesson guide, printed copies of slide 2 (A3 size micro:bit pictures) for small teams, printed copies of slide 3 labels, scissors, sticky tack, quiz sheets, pens and paper.",
    "objectives": [
     "To know and understand the common features of computer systems",
     "To be able to explain input and output devices, hardware and software",
     "To apply understanding to writing algorithms and programming micro:bit"
    ],
    "activities": [
     "Name the parts (15 minutes)",
     "Hardware and software (10 minutes)",
     "Computer systems (10 minutes)",
     "Writing algorithms and programs (20 minutes)",
     "Wrap up (5 minutes)",
     "1. Name the parts (15 minutes)",
     "Split students into small teams and give out the A3 copies of slide 2 (micro:bit pictures), printed copies of the labels on slide 3, scissors and some sticky tack to each team. Ensure teams have access to micro:bit make code editor and/or a physical micro:bit.",
     "Explain their task is to stick the labels in the correct places. Highlight they might not know all of them, however they can ‘tinker’ with micro:bit (and use this page if you wish).  (NB: more recent micro:bits have a combined compass and accelerometer chip but they are still both separately labelled on the back of the micro:bit).",
     "Give 5 or so minutes to complete the task, encouraging students who finish to use https://microbit.org/ to increase their understanding about each part before checking answers as a class (slide 4) and encouraging students to share what else they know about (e.g. light and temperature sensors, what pins can be used for etc.)",
     "2. Hardware and software (10 minutes)",
     "Share the learning objectives on slide 5 if you wish and give out the quiz sheets to teams.",
     "Explain that micro:bit and the parts they have labelled are examples of computer hardware (slide 6) and ask them to complete question 1 before clicking to reveal the definition and discussing as a class.",
     "Click to reveal each ‘what am I?’ clue on slide 7 (and answer) for question 2.",
     "Give teams a timed 1 minute to complete question 3 on their sheet, before checking and discussing as a class.",
     "Show slide 8 and ask teams to complete questions 4 & 5 on their sheet (click to reveal answers), awarding a bonus point for any teams who can say what the program shown will do (it is an example of a die).",
     "Give teams a timed 1 minute to complete question 6, before discussing as a class to assess understanding.",
     "3. Computer systems (10 minutes)",
     "Use slides 9, 10 and 11 to explain the input-process-output model of all computer systems to students, using the example to illustrate this using micro:bit and highlighting the processor labelled in the introduction task.",
     "Give teams 2 minutes to label the micro:bit inputs and outputs on their picture sheet and check as a class.",
     "Ask teams to complete quiz question 7 and 8 to apply their understanding beyond micro:bit before checking as a class.",
     "If you wish, get teams to ‘mark’ their score for the quiz and award prizes.",
     "4. Writing algorithms and programs (20 minutes)",
     "Give out paper and ask teams them to design a simple algorithm using (at least) one of the micro:bit input and output devices (slide 12). You may wish to give some more structure (see support).",
     "Invite them to swap their algorithm with another team and follow the algorithm they are given to write the program, testing and debugging as they go before feeding back to the other team.",
     "Share any learnings as a class, focusing on inviting examples of the input and output devices to assess understanding.",
     "5. Wrap up (5 minutes)",
     "Use slide 13 to assess students’ understanding in their teams and discuss as a class.",
     "Review the learning objectives on slide 14 if you wish."
    ],
    "extension": [
     "You could extend learning to include the CPU and fetch/execute cycle to extend understanding.",
     "Students could keep a list of all the computers, input and output devices, hardware and software they use in the time before the next lesson to apply their understanding to the real world."
    ],
    "differentiation": [
     "Support:",
     "Students can label the parts that are easiest to locate and focus on one or two inputs/outputs only to help support understanding.",
     "You may wish to give students an example algorithm (e.g. when button A is pressed, make an LED flash). They could also sequence pre-printed instructions if helpful.",
     "Stretch & challenge:",
     "Ask additional questions to stretch and challenge during the quiz.",
     "Students can be encouraged to create more complex algorithms and programs that make use of repetition and selection and/or multiple input and output devices."
    ],
    "assessment": [
     "Informal observation and assessment of students’ responses during team activities.",
     "More formal observation of team’s sheets, algorithms and programs if wished."
    ]
   },
   {
    "n": 6,
    "slug": "mbu-compfun-6",
    "title": "Computer systems 2",
    "pages": 7,
    "intro": "In this lesson students showcase their understanding of micro:bit by creating a short explainer video. They also revise and show their understanding of computer systems, algorithms and programming and computational thinking developed over the course of this unit.",
    "materials": "Lesson plan, lesson guide, explainer video planning sheet for pairs or small teams, video recording equipment and/or screen recording software, headphones and microphones.",
    "objectives": [
     "To plan and create a short explainer video about micro:bit",
     "To follow criteria and use criteria to evaluate",
     "To review and evaluate learning"
    ],
    "activities": [
     "What have you learnt? (5 minutes)",
     "Explainer video planning (10 minutes)",
     "Explainer video creation (30 minutes)",
     "Explainer video showcase (10 minutes)",
     "Wrap up (5 minutes)",
     "1. Introduction: 30 second challenge (5 minutes)",
     "Split students into pairs give them 30 seconds each to discuss each topic on slide 2 before discussing briefly as a class.",
     "Share the learning objectives on slide 3 if you wish.",
     "2. Explainer video planning (10 minutes)",
     "Invite students to share what they know about explainer videos (slide 4).",
     "Show the example if you wish, making sure students understand this is a BBC production, and they will be creating something much more simple.",
     "Introduce their task and the criteria for their video, highlighting this will be used to evaluate the videos at the end (slide 5). Ensure students grasp that they have only have 30 minutes, so will need to work very efficiently and keep it simple, focusing on one aspect or a simple overview.",
     "Give out copies of the explainer video planning sheet to pairs or small teams and give them 5 minutes to sketch out a quick plan of their explainer video (highlighting they are decomposing the task and this is their algorithm).",
     "3. Explainer video creation (30 minutes)",
     "Give students 30 minutes to complete their explainer video, ensuring they have access to suitable recording equipment and software as needed.",
     "Give regular time reminders to ensure they stay on task and work efficiently. You could allow more time if you wish, however it is also a good skill for students to learn how to create something ‘good enough’, that meets the criteria given within the timeframe allowed.",
     "4. Showcase (10 minutes)",
     "Depending on space and your preference, either invite students to show their videos to the class, have a round robin showcase where teams move around the classroom or ask them to swap with another team to watch each their videos and offer feedback.",
     "5. Wrap up (5 minutes)",
     "Remind students of the criteria on slide 5 and give out the video evaluation sheets to complete (can be completed for homework if you wish).",
     "Use slide 6 to recap the learning objectives if you wish."
    ],
    "extension": [
     "Students could complete an extended explainer video if you wish/have more time.",
     "You could ask students to complete a more formal assessment of their learning in this unit."
    ],
    "differentiation": [
     "Support:",
     "Ensure pairings/groupings are supportive and students are able to be fully involved in the planning and recording of the video.",
     "Encourage students to focus on creating a simple video that fits with their areas of confidence (e.g. a video of them explaining in an entertaining way how one aspect of micro:bit works, or a screen recording with voice over of how to use button A as an input).",
     "Stretch & challenge:",
     "Challenge students to create a clear video that is highly suitable for the audience and explains aspects of micro:bit in detail, using appropriate language to showcase their understanding."
    ],
    "assessment": [
     "Informal observation and assessment of students’ work during lesson.",
     "Formal assessment of planning, videos and evaluation sheets."
    ]
   }
  ]
 },
 {
  "slug": "data",
  "title": "Data handling",
  "emoji": "📊",
  "order": 3,
  "description": "This series of five lessons is aimed at students aged 9-10. Students learn about data through a variety of unplugged activities. They write and evaluate algorithms and programs using selection and repetition to use the  micro:bit as a temperature recorder, an automatic warning system and a digital assistant. You will ideally use physical micro:bits for these lessons, although you can also use the simulator.",
  "skills": [
   "Data handling",
   "Selection",
   "Iteration",
   "Pseudocode",
   "Flowcharts",
   "Information handling"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-data-1",
    "title": "What is data?",
    "pages": 19,
    "intro": "In this first lesson of the unit, students learn about data. They research data on a chosen person and explore ways this data can be grouped. Students also consider the data that organisations might hold on them and the reasons that they have this data. They conclude the lesson by finding out about recent cases where collected data has been misused.",
    "materials": "",
    "objectives": [
     "To understand what data is",
     "To classify data",
     "To identify ways that data might be used"
    ],
    "activities": [
     "Introduction: Who am I? (10 minutes)",
     "What is data? (20 minutes)",
     "How can data be used? (20 minutes)",
     "How is data collected? (10 minutes)",
     "Introduction: Who am I? (10 minutes)",
     "Provide students with printouts of slides 16 and 17. Explain that the image represents a famous person of their choosing and that they are going to work in pairs to put facts about the person around the image (slide 3).",
     "Invite suggestions as to what information they could record about the person. Examples can be name, age, place of birth, date of birth, height, and favourite colour (see completed example on slide 18). Give students time to research information about their selected person online. Remind students it is good practice to check the reliability of information from the internet by checking several sources to see if the same information is given. Display slide 4, and give out printed copies, to remind the students of some of the information to add but encourage them to identify additional information.",
     "After students have collected sufficient information, invite them to share the information with the class and invite others to guess who the person is.",
     "What is data? (20 minutes)",
     "Use slide 5 to explain to students that when facts like these are stored by computers, they are called data. Establish that data is often made up of two parts: the name (which stays the same) and the value (which can differ). Explain this by identifying a name and values in the information about the famous person (date of birth (name), 23 February 1987 (value)).",
     "Allow students to consolidate this knowledge by asking questions relating to names and values of data. What value do you have for data with the name place of birth? What could the name of data with the value pizza be? Use table of slide 6 to record examples of data names and data values.",
     "Explain that data can be classified into groups. Ask students to look at the data they created and discuss with their partners ways it could be grouped (slide 7).",
     "Invite suggestions, before explaining that it can be sorted into words and numbers, and data that stays the same and data that can change. When discussing each way of grouping, ask students to identify examples (numbers: age, height, number of siblings; words: place of birth, favourite colour, favourite food; stay the same: place of birth, date of birth; can change: age, favourite food, address).",
     "Use slide 8 to display a Carroll diagram. Ask students to explain how to use it to sort the types of data. Discuss where some examples of data would be placed (date of birth, age, place of birth, last city visited). Give students a copy of the slide and ask them to work with their partner to place the data on their famous person into the Carroll diagram.",
     "How can data be used? (20 minutes)",
     "Explain to students that the school keeps data on them (slide 9). Invite students to think/pair/share what data the school needs before discussing as a class and identifying the types of data kept by the school (e.g. name, address, age, medical information) and why.",
     "Invite students’ suggestions on who else might have data on them and what that data might be (doctor’s surgery: medical information, prescriptions, operations; sports team: age, address). For each example, identify why this data is needed.",
     "Ask students if they have store cards for any shops or any online accounts where they purchase or download content (examples may include Game store card, PS4 Plus accounts, Xbox Live accounts, Claire’s Accessories, Superdrug etc.). Invite students’ ideas on the type of data that these stores/websites might hold about them and how these may be used (targeting adverts, reminding them when renewal subscriptions are due - slide 10).",
     "Give students a copy of the ‘who might have my data?’ sheet and the ‘data name’ sheet (slide 11). Give students time to work in pairs to complete the sheets, identifying the data that different organisations might have on them and the reasons why the organisation might have this data. Discuss their answers as a class.",
     "How is data collected? (10 minutes)",
     "Establish that the school gets all its data on students by requesting it from their parents/carers while internet-based technologies get this data when we tick the terms and conditions of using their device (slides 12 and 13).",
     "Display a web page showing the terms and conditions for an app or website popular with your class. Highlight to students that when they tick to accept, they are agreeing to every point in the terms and conditions.",
     "Invite suggestions from students on devices they have in their homes that are connected to the internet. Steer students towards the most recent technologies such as watches, cameras, digital assistants (e.g. Alexa, Google Home, etc.), and central heating systems (e.g. Hive).",
     "Explain that these devices collect data about us when we use them and discuss how the types of information that we ask Alexa for can be used to target advertising.",
     "Use the link on slide 14 to share an example of how a company has collected and misused students’ data. Invite students to share any other examples they may have come across.",
     "If you wish, use slide 15 to review the learning outcomes of the lesson."
    ],
    "extension": [
     "Students could research and produce posters to display around the school to inform others of their rights relating to their data."
    ],
    "differentiation": [
     "Support",
     "Provide students with examples of data to sort using the ‘examples of data’ support sheet.",
     "Stretch & challenge",
     "Students can be challenged to show more sophistication when answering how their data might be used by organisations by identifying a possible positive and negative use of data."
    ],
    "assessment": [
     "Informal assessment of students’ understanding of types of data and how it can be grouped through paired activities.",
     "More formal assessment of students’ worksheets and how their data may be used by others."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-data-2",
    "title": "Data treasure hunt",
    "pages": 14,
    "intro": "In this lesson, students go on a treasure hunt to find data values relating to the school. They then learn about sensors and write simple programs using the MakeCode editor to use the BBC micro:bit to record the temperature in different locations around the school. Students then consider what the data they have collected show and identify any patterns. You will ideally need physical micro:bits to complete this lesson, although if you do not have these you can still use the simulator.",
    "materials": "",
    "objectives": [
     "To understand that some devices uses sensors",
     "To write simple programs using sensors",
     "To use the BBC micro:bit to collect data"
    ],
    "activities": [
     "Introduction: School treasure hunt (15 minutes)",
     "Introducing sensors (10 minutes)",
     "Collecting data with the micro:bit (30 minutes)",
     "What does our data show? (5 minutes)",
     "Introduction: School data treasure hunt (15 minutes)",
     "Invite students to recap in pairs what data is and the types of data that they used in the previous lesson (name, age, address, data of birth).",
     "Ask students to consider what data they could collect about the school (slide 2).",
     "Use slide 3 to display a copy of the school treasure hunt worksheet. Discuss students’ initial ideas on what the sheet shows and establish that students need to find the value for each data name. Invite suggestions on ways they might find such data (school website, asking adults, observing).",
     "Focus on the data name devices with sensors. Invite suggestions on the term sensors and establish that sensors are devices that sense changes in a given field (light, temperature, movement) and make something happen when a change is sensed (slide 5).",
     "In small groups, ask students to go on the treasure hunt, visiting the appropriate part of the school to find the required information.",
     "Review their findings as a class, collecting the data by asking students questions such as, ‘what value did you have for the data name number of photocopiers? (slide 6). Discuss which was the most difficult data to find and why this was.",
     "Using sensors (10 minutes)",
     "Discuss the devices with sensors that students found during their treasure hunt and ask them to suggest what sensors are used. If there were not any devices with sensors found, discuss common examples like automatic doors in shops, and automatic lighting and taps in toilets. Explain that they are going to focus on writing programs that use sensors with the micro:bit.",
     "Use slide 7 to explain to students that the micro:bit has sensors that can be used to record data. Invite suggestions on what data the micro:bit could record and establish that it can sense movement, temperature, and light (the students will make use of the last two sensors in this unit).",
     "Show students the program on slide 8 and ask them to predict what will happen when the program runs (remind students that they are using logical reasoning). Click on the light sensor link (image) in the presentation to open the program in the MakeCode editor and test students’ ideas. Establish that the micro:bit has been programed to display the light level recorded by the sensor.",
     "Recap that the colours of blocks can be used to locate the menu in which the blocks are located and identify the locations of the three blocks in the program.",
     "Collecting data with the micro:bit (30 minutes)",
     "Explain to the students that you would like to find out the warmest and coldest area of the school. Invite suggestions as to where these places could be. Record places on a large sheet of paper and ask students, in pairs or larger groups, to identify five places from the list where they will record the temperature. Give out the temperature table and ask students to identify the places that they are going to record the temperature in (slide 9).",
     "Explain that students are going to use their micro:bits to record the temperature in different areas around the school. Display the program used earlier (either from the link on slide 9 or by displaying slide 10) and invite suggestions on how this could be modified to show the temperature instead of the light level.",
     "Ask students to model how to download and transfer their programs to their micro:bits. Pose the question of how the micro:bits could be moved around and still used without being connected to the computer. Establish that the battery pack should be connected to the device to provide it with power (slide 11).",
     "Give students time to use the MakeCode editor to create a temperature recorder by modifying the given program. Once written and tested, ask students to download and transfer their program to their micro:bit which has been connected to a battery pack. An example of what this program will look like has been included with the lesson downloads.",
     "Give students sufficient time to visit the locations, use their micro:bits to identify the temperature and record it in their tables.",
     "What does our data show? (5 minutes)",
     "Use slide 12 to review the data students collected, and identify the warmest and coolest locations in the school. Explore any patterns in the results by identifying any similarities between the warmest/coolest locations. Identify any anomalies in the results and suggest reasons why (the micro:bit was being held on the temperature sensor, windows may have been opened or closed etc.).",
     "If you wish, use slide 13 to review the lesson objectives."
    ],
    "extension": [
     "Students could produce graphs showing their temperature data collected."
    ],
    "differentiation": [
     "Support",
     "Provide students with microbit-temperature-support hex file which provides the required blocks for students to use to write their program.",
     "Stretch & challenge",
     "Students could record three temperatures at each location and identify the mean temperature for each location. They could also add comments to their program to identify the changes they have made and why."
    ],
    "assessment": [
     "Informal assessment of students’ understanding of data and sensors through discussions and activities.",
     "More formal assessment of students’ programs."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-data-3",
    "title": "Sensor gadget design",
    "pages": 18,
    "intro": "In this lesson, students consider the need for sensors to continually check for changes, developing their understanding through the use of unplugged activities and by writing algorithms using repetition and selection. They then apply their knowledge and understanding to design a gadget using a sensor and selection and evaluate their work against the set design criteria.",
    "materials": "",
    "objectives": [
     "To explain how repetition is used when programming sensors",
     "To follow design criteria to design a product",
     "To write algorithms that show how sensors will be used"
    ],
    "activities": [
     "Introduction: Reading and writing algorithms (10 minutes)",
     "Street lights (15 minutes)",
     "Getting inventive (25 minutes)",
     "Presenting your design (10 minutes)",
     "Introduction: Reading and writing algorithms (10 minutes)",
     "Before starting the lesson, it would be useful to have a method of making the class darker if this cannot be done simply by turning lights off, closing blinds etc.",
     "Use slide 3 to display an algorithm. Invite students’ suggestions on what the algorithm is instructing them to do and when they will do each action. Turn the lights on and off to make the classroom dark and light and get students to carry out the actions in the algorithms on slide 3 and 4.",
     "Display the structure of the algorithm and ask students to write a simple algorithm that uses the level of light as a condition (slide 5).",
     "Street lights (20 minutes)",
     "Watch the time-lapse video of a street light turning on and off. Explain to students that this can be seen as an example of selection. Invite suggestions on what condition needs to be met and what to do if it is or isn’t met. Focus on responses that indicate the condition as being linked to the light level (is it dark?) and the actions are to turn the light on or off.",
     "Show slide 7 and remind students of previous algorithms that they have written using decision boxes (revisit how the structure is used). Invite students to suggest what could go in each section. A completed example is included on slide 8.",
     "Invite a student to role play the street light by giving them a torch and asking them to follow the algorithm on slide 9. Close the curtains and/or turn off class lights to create a dark environment and reverse to create a light environment. It is likely that the student will continue to respond to the changes and turn the torch on and off accordingly.",
     "Explain to the students that the algorithm only instructs the user to check if it is dark once, therefore the action should only be carried out once. When using sensors, we have to program them to check the conditions constantly so they respond at the required time. Invite suggestions on how they have previously instructed computers to do things more than once (through the use of repetition).",
     "Display an alternative algorithm for being a street light and invite students to identify the similarities and the differences between this algorithm and the decision box-based algorithm on slide 10 (see slide notes for answers).",
     "Invite students’ ideas on what the instruction ‘forever’ means - keep doing it - and why it is required in the algorithm (so the sensor is constantly checking if it is dark).",
     "Repeat the algorithms from the lesson introduction (slides 11 and 12), but this time see if students take note of the lack of ‘forever’ on slide 12. For this example, they should carry out the action the first time the light is changed and not again because they were only asked to check the light level once.",
     "Getting inventive (25 minutes)",
     "Show slide 13 to students and explain that they are going to design a gadget that can that either responds to changes in light level or temperature. Discuss how their design should be a representation of the gadget’s main features and purpose. Ask students to recall the term used in computing whereby the main information is focused on and extra detail is ignored (abstraction).",
     "Examples could include toys that light up when it gets dark, a glass that keeps a soft drink at the same temperature, a book that starts glowing when the lights are turned off so it can be read in the dark, and socks with heat pads that come on when the temperature goes below a certain level.",
     "As well as creating a labelled drawing of their design, highlight they need to write an algorithm to explain how their gadget will make use of selection and sensors.",
     "Students are not going to make these designs so should not be restricted by their understanding of the micro:bit. Instead they should concentrate on designing a gadget that makes use of a sensor to select which action to carry out.",
     "Give students copies of the gadget with sensors planning sheet (slide 14) and time to design their gadget and write the algorithm to explain how it will make use of sensors and selection.",
     "Presenting your design (10 minutes)",
     "Organise the students into small groups (3-5). Give each student the opportunity to present their design to the rest of the group and explain where they have met the requirements of the design criteria (slide 15).",
     "Give out copies of the Gadget with sensors evaluation sheets (slide 16) and ask students to complete them to comment on the design and the algorithm.",
     "Discuss groups’ learning as a class, reviewing the learning objectives on slide 17."
    ],
    "extension": [
     "Students could design a persuasive poster to advertise their gadget."
    ],
    "differentiation": [
     "Support",
     "Students use the algorithm support sheet to help with structuring their algorithm.",
     "Stretch & challenge",
     "Students can be encouraged to create more sophisticated gadgets, including more than one sensor (or even designing their own sensors) and include these in their algorithms."
    ],
    "assessment": [
     "Informal assessment of students’ understanding of how sensors work from class and group discussions.",
     "More formal assessment of students’ designs and algorithms."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-data-4",
    "title": "Data conditions & selection",
    "pages": 14,
    "intro": "In this lesson, students are introduced to how data collected by the micro:bit’s sensors can be used as a condition in programs. They explore the effect of changing the values and use this knowledge to plan, program and debug a micro:bit as a temperature warning system similar to those found in vehicles. You will ideally need physical micro:bits to complete this lesson, although if you do not have these you can still use the simulator.",
    "materials": "",
    "objectives": [
     "To know that data can be used as a condition in selection",
     "To explore the effects of changing the value of data in programs",
     "To write programs that use data as a condition"
    ],
    "activities": [
     "Introduction: Comparing programs and algorithms (10 minutes)",
     "Tinkering with sensors (20 minutes)",
     "Using temperature sensors (25 minutes)",
     "Debugging with sensors (5 mins)",
     "Introduction: Comparing programs and algorithms (10 minutes)",
     "Show students slide 3, and give a printout of the slide, explain that it shows the algorithm they used last lesson which shows how an automated street light could work and that the program is a representation of this algorithm using the micro:bit as an automated light.",
     "Ask students to discuss in pairs where the different parts of the algorithms are represented in the program and to annotate their printout to show this (a completed example of this is included on slide 4). After sufficient discussion, invite students to share their ideas. Ask students to explain what the terms data, selection and repetition mean and where they are used in the program.",
     "Tinkering with sensors (20 minutes)",
     "Using a micro:bit with the program microbit-street-light running on it, explain to the students that the program shown on slide 6 is on the device. If you do not have access to micro:bit hardware, a modified version can be completed using the MakeCode simulator. To test their programs, students should change the light level using the input on the simulator.",
     "Invite suggestions from students as to what will happen when the lights in the classroom are turned off. Discuss the student’s predictions and their use of logical reasoning when predicting the program’s output.",
     "Turn the lights off and identify that nothing has happened. Return to the program (slide 7) and identify that the condition is - is light level greater than zero. Identify that the micro:bit’s LEDs will only come on if the light level goes below zero.",
     "Invite suggestions from students as to how the program could be modified so that the LEDs come on when it starts getting dark. Discuss students’ ideas but do not test out.",
     "Explain to the students that you want them to test out their ideas to find their own solution to the problem.",
     "After the students have modified their programs, ask them to transfer them to their micro:bits and test them out by turning the lights out in the classroom: the micro:bit LEDs should turn on.",
     "Using temperature sensors (25 minutes)",
     "Use the frost indicator link in the presentation to show students information on frost warning lights on cars. Invite suggestions as to why it might be useful for a driver to know that there are frosty conditions.",
     "Ask students to suggest how the sensor might be used (the sensor checks the temperature - if the temperature is lower than 5 degrees Celsius it displays the frost warning light - a frost symbol).",
     "Give out large sheets of paper and the LED planner (slide 12). Ask students to work with a partner to represent this as an algorithm and to identify where data, selection and repetition have been used (see example on slide 13).",
     "Explain to students that they are going to turn the algorithm into a program for the micro:bit using the MakeCode editor and give students time to write and test their programs by using the temperature slider in the simulator.",
     "Depending on the time of the year, it might be possible to test the program by placing the micro:bits outdoors, otherwise you could put them in a see-through container and place them in a fridge. Allow sufficient time for the required temperature to be reached, then open the fridge to observe if the frost symbol is being displayed.",
     "Debugging with sensors (5 mins)",
     "Give out copies of slide 10 and use the link on the image to open the MakeCode file debugging-with-sensors. Use the temperature slider to change the temperature and ask students to observe what happens (nothing - the image in the program isn’t displayed).",
     "Ask students to work in pairs and annotate their copy of the program to identify where the errors are and how they could be fixed. An explanation of how this program should be debugged is contained in the speaker notes section of the slide.",
     "If you wish, use slide 11 to review the learning outcomes of the session."
    ],
    "extension": [
     "Students could research the sensors in smartphones and the apps that make use of these senses and report their findings back to the class."
    ],
    "differentiation": [
     "Support: For the streetlight activity, students could use micro-street-light-support hex file which provides all the blocks needed for the tinkering activity and on-screen instructions. For the temperature sensor activity, students could use the temperature-sensor-support hex file.",
     "Stretch & challenge: Students could annotate their programs (right-click on the block and select ‘add comment’) to show where repetition, selection and data have been used in their programs."
    ],
    "assessment": [
     "Informal assessment of students’ understanding of how data can be used in programs through tinkering.",
     "More formal assessment of students’ algorithms and programs."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-data-5",
    "title": "Digital assistants",
    "pages": 17,
    "intro": "In this final lesson of the unit, students use unplugged activities to identify how more than one condition can be used with selection statements. They consider how selection might be used by digital assistants by planning and role-playing a program that selects clothes for the user based on the temperature. Students then write a program to use the BBC micro:bit as a digital assistant and compare it with other digital assistants. You will ideally need physical micro:bits to complete this lesson, although if you do not have these you can still use the simulator.",
    "materials": "",
    "objectives": [
     "To read and write algorithms using selection",
     "To identify how a digital assistant might work",
     "To write a program to use a micro:bit as a digital assistant"
    ],
    "activities": [
     "Introduction: Please be quiet (10 minutes)",
     "Digital assistants (20 minutes)",
     "Writing programs (25 minutes)",
     "Comparing digital assistants (5 mins)",
     "Introduction: Please be quiet (10 minutes)",
     "Give out coloured sports bands to students so that each child is one of four colours (red, blue, green, yellow). Display slide 3 and ask students to carry out the instructions based on the band they are wearing. Recap that those who meet the condition (wearing a green band) should clap five times while those who are not wearing a green band should put their fingers on their lips and make a ‘shh’ sound.",
     "Display slide 4 and invite suggestions on how the algorithm has changed: the condition has changed to ‘if wearing a red band’; there is another section that says ‘else if a yellow band’; there are three possible actions to carry out. Remind students that when they use their existing understanding to make predictions on how something might work, they are using logic. Establish that those who are wearing red bands clap five times, those who are wearing yellow bands bark like a dog five times and those who are not wearing red or yellow bands put their fingers on their lips and make a ‘shh’ sound.",
     "Use the algorithms on slides 5 and 6 to practise and develop students’ understanding. Display slide 7 and invite students to create their own ‘If… then, if… else… then, else’ algorithms.",
     "Digital assistants (20 minutes)",
     "Display slide 8 and invite students’ ideas on what digital assistants are. Establish that they are devices that carry out actions when given instructions by a human voice. Discuss common brands that the students are familiar with (Alexa, Siri, Cortana, Google home, etc.) and the way people use them (to control lights in their home, to find out news and weather, to help with homework).",
     "Show slide 9 and explain to the students that they are going to program a micro:bit to be a digital assistant that can advise them what to wear. Explore students’ initial ideas on how this might be achieved and remind them of their use of sensors, but do not over-prompt: it is acceptable for students not to formulate any ideas at this point.",
     "Display and provide students with printouts of slide 10. Ask students to suggest five items of clothing that could go in each part of the table. Allow students time to do this, then take feedback on the items and add to a class version. Explain to students that the digital assistant will pick the clothes from the list. How will it know which list to pick from? Establish that it can use the temperature sensor to check the temperature and then state the clothes from the appropriate list.",
     "Give out cut up temperature cards (slide 11) and explain to students to work in pairs and take it in turns to be the digital assistant and the user. Select two students and model how to do this.",
     "The user asks the digital assistant “what shall I wear today?” In response, the digital assistant turns over one of the temperature cards that has been placed face down (this simulates the device checking the temperature) and then reads out the date values from the appropriate temperature range.",
     "In pairs, ask students to role-play being digital assistants and a user. After doing so, display slide 12 and ask students to suggest how this algorithm can be completed to represent their role as a digital assistant (a completed example is included on slide 13). In pairs, students write an algorithm to represent the clothes they chose and their role as a digital assistant.",
     "Writing programs (25 minutes)",
     "Explain to students that they are going to write a program to allow the micro:bit to tell them what clothes to wear based on the temperature. Display slide 14 and click on the link (the image) to access the digital assistant starter file through the MakeCode editor.",
     "Discuss that all the blocks students need to write their program have already been selected but they have yet to be sequenced correctly into a program - this will be their task. Highlight that the ‘if button A is pressed’ block has been added to represent the question ‘what shall I wear today?’ being asked.",
     "Give students time to work in pairs to write a program that represents their digital assistant algorithm using the digital-assistant-starter hex file. Remind students to test and debug their program as they work and that blocks can be copied by right-clicking on the block and selecting ‘duplicate’. Note when testing using the MakeCode simulator, the temperature slider only becomes visible once button A is pressed.",
     "If you have access to physical micro:bits, students can download and transfer their programs to them and test out their digital assistants.",
     "A completed example program is also provided with the lesson downloads.",
     "Comparing digital assistants (5 mins)",
     "Display slide 15 and explain that digital assistants, such as Alexa, do not use temperature sensors when suggesting what you should wear, instead they use the weather forecast.",
     "Ask students to think, pair, share opinions on whether this is a better method than using a temperature sensor. Examples that the students could give are included in the speaker notes section.",
     "Invite students to think/pair/share their learning in this lesson and the unit and discuss as a class, reviewing the learning objectives on slide 16 if you wish."
    ],
    "extension": [
     "Students could design an application to run on a digital assistant. They could write an algorithm to show the voice commands and the actions and then present their ideas by role-playing."
    ],
    "differentiation": [
     "Support: Students could use the digital-assistant-starter-support hex file which has a partially completed program.",
     "Stretch & challenge: Students could be challenged to write their program without the support of the digital-assistant-starter hex file."
    ],
    "assessment": [
     "Informal assessment of students’ understanding of using data with selection through discussion and role play.",
     "More formal assessment of students’ algorithms and programs."
    ]
   }
  ]
 },
 {
  "slug": "flashcards",
  "title": "Digital flashcards",
  "emoji": "🃏",
  "order": 4,
  "description": "This series of five lessons is aimed at students aged 7-8 years and builds on the ‘Nature art’ unit. Students design sequenced algorithms for flashcards to help them learn a foreign language, developing their understanding of computational thinking. They then write programs to create digital flashcards using the micro:bit and test and evaluate their work.",
  "skills": [
   "Algorithms",
   "Abstraction",
   "Pattern recognition",
   "Sequence",
   "Vocabulary"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-flashcards-1",
    "title": "Flashcard algorithms",
    "pages": 16,
    "intro": "In this ‘unplugged’ lesson pupils use flashcards to practice words learnt in another language. They consider the ‘responder’ and ‘shower’ roles of the people using the flashcards and write, test and debug algorithms for others to follow.",
    "materials": "",
    "objectives": [
     "To know and understand what algorithms are",
     "To write algorithms with clear instructions",
     "To test and debug algorithms"
    ],
    "activities": [
     "Using flashcards (5 minutes)",
     "Creating algorithms (25 minutes)",
     "Independent algorithmic writing (20 minutes)",
     "Testing and debugging algorithms (10 minutes)",
     "Introduction: Using flashcards (5 minutes)",
     "Give out a set of flashcards to pairs of pupils and model discuss how they can be used to practice using another language.",
     "Ask pupils to work in their pairs to use the flashcards, taking turns to be the person responding to the cards and the person showing the cards.",
     "As a class discuss the vocabulary and address any misunderstandings or pronunciation issues.",
     "Creating algorithms (25 minutes)",
     "Recap pupils’ understanding of the term algorithms by asking them to reflect on the algorithms they have previously written.",
     "Explain that pupils are going to write algorithms to give instructions on how to use flashcards.",
     "Recap what algorithms are and how sentences included in algorithms should be written (command sentences that instruct someone what to do).",
     "As a class, compose the first steps in a sequence for an algorithm that instructs someone how to use the cards in the role of responder.",
     "Give out large sheets of paper and ask pupils to write down the remaining sequence.",
     "Once the algorithm has been written, test it by following the instructions while using the flashcards. Identify any steps of the algorithm that need to be modified and recap the importance of testing and debugging.",
     "Independent algorithmic writing (20 minutes)",
     "Working in their pairs, ask pupils to write the algorithm to instruct someone how to carry out the role of the person showing the flashcards.",
     "Testing and debugging algorithms (10 minutes)",
     "Display slide 9 and ask pupils to follow the instructions.",
     "Invite pupils to give examples of instructions they found easiest/least easy to follow and record these as a class.",
     "Invite pupils’ ideas on what the ‘easiest to follow’ statements have in common and how the ‘least easy statements’ could be improved."
    ],
    "extension": [
     "Pupils could create their own set of flashcards using presentation software and could consider how flashcards could support their learning in other subject areas."
    ],
    "differentiation": [
     "Support:",
     "Pupils can use the algorithm word bank to support with sequencing their algorithm, their use of verbs in the imperative form and noun choices.",
     "Stretch & challenge:",
     "Pupils can be challenged to write a more detailed algorithm. They could also evaluate each other’s algorithms by identify words/phrases that could be ambiguous and offering suggested improvements."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of pupils’ vocabulary, writing and debugging algorithms.",
     "More formal assessment of pupils’ algorithms."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-flashcards-2",
    "title": "Abstraction and programming",
    "pages": 15,
    "intro": "In this lesson pupils recap their learning from the ‘Nature art’ unit before being introduced to using the BBC micro:bit as a digital flashcard. They identify appropriate language vocabulary to represent, and plan and use the MakeCode editor to write sequenced-programs to displays LED images of these words. They will use and build on this program in subsequent lessons.",
    "materials": "",
    "objectives": [
     "To use abstraction when planning LED images",
     "To write programs that create LED images",
     "To sequence programs"
    ],
    "activities": [
     "Recapping LED images (10 minutes)",
     "Planning flashcards (25 minutes)",
     "Programming flashcards (20 minutes)",
     "Evaluating (5 minutes)",
     "Introduction: Recapping LED images (10 minutes)",
     "Invite pupils to recap the previous lesson and ask pupils to demonstrate how to use the MakeCode editor to write programs to represent images using the micro:bit’s LEDs (slide 3 - recapping work completed in the ‘Nature art’ unit).",
     "Use slides 4 & 5 to give pupils images to represent. If helpful, challenge them to represent the images within a given time (one minute).",
     "Discuss the LED images pupils have created and their use of abstraction (slide 6).",
     "Planning flashcards (25 minutes)",
     "Explain to pupils that they are going to use the MakeCode editor to create digital flashcards using a micro:bit. Invite suggestions on how a micro:bit could be used as a flashcard (slide 7).",
     "As a class, create a list of 10 nouns that could be represented using the micro:bit’s LEDs. Judge the suitability of suggestion by asking pupils if they would be able to represent the word using the micro:bit’s LEDs.",
     "Give out the LED planner (slide 8) and ask pupils to recall how they have used it previously.",
     "Ask pupils to select four words from the class list and plan their sequence of images using the LED planner sheet (slide 9).",
     "Programming flashcards (25 minutes)",
     "Use slide 10 to explain to pupils they should now program their images using the MakeCode editor.",
     "Recap how in the ‘Nature art’ unit they wrote simple programs that displayed one image and that in this program the images need to be placed in a sequence. Ask pupils to discuss what the term sequencing means and how they have used it previously in their computing work (slide 11).",
     "Give pupils time to work in pairs to turn their algorithm into a program using the MakeCode editor, reminding them to test and debug as they go. An example of the type of program pupils could write is contained within the lesson downloads (DigitalFlashcard1) (you may need to rearrange the comment blocks to see the code).",
     "Pupils will need to use these programs in the next lesson. They can access these by naming the program and using the same login details and the same computer or saving in a shared drive. Alternatively, they can anonymously share (publish) their program in MakeCode and copy the address (URL) to a text document from which the program can be opened.",
     "Identifying issues (5 minutes)",
     "Advise pupils that there is a problem with the flashcard programs - can they identify what it is? (The images are displayed too quickly, with no delay between them).",
     "Invite pupils to run their programs and ask them to respond to the flashcards. Invite comments as to the problem with the flashcards (there is no time to respond). Highlight that they will be using their problem-solving skills to address this in the next lesson.",
     "Use slide 12 to recap how sequencing has been used in the lesson and slide 13 to revisit the learning objectives if you wish."
    ],
    "extension": [
     "Pupils could plan and program LED images to represent a song they have learnt in their studied language i.e. Frère Jacques."
    ],
    "differentiation": [
     "Support:",
     "The algorithm could be constructed as a shared activity led by an adult. Two words could be represented as a group and then a further word represented independently.",
     "Pupils could be asked to represent at least two words in their sequenced program. Some pupils may benefit from having the blocks already sequenced so they only have to select the LEDs to be turned on in each image.",
     "For EAL pupils the MakeCode editor language could be changed (click on cog > Language).",
     "Stretch & challenge:",
     "Pupils could be challenged to add more sequenced images in their plan and in their program.",
     "The MakeCode editor language could be changed to the target language being learnt (click on cog > Language)."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of writing and sequencing programs.",
     "More formal assessment of pupils’ programs."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-flashcards-3",
    "title": "Patterns & delays",
    "pages": 12,
    "intro": "In this lesson, pupils explore solutions to the problem identified in the previous lesson. They develop their understanding of the ‘wait’ command by using it in algorithms and micro:bit MakeCode programs when solving the problem. Pupils are introduced to the role of patterns in computing and identify patterns in their algorithms and programs.",
    "materials": "",
    "objectives": [
     "To identify solutions to problems",
     "To identify patterns",
     "To use delays in algorithms and programs"
    ],
    "activities": [
     "Solving problems (10 minutes)",
     "Using delays with algorithms (15 minutes)",
     "Programming with delays (25 minutes)",
     "Reviewing improvements (10 minutes)",
     "Introduction: Solving problems (10 minutes)",
     "Ask pupils to recall the problem with the digital flashcards they identified at the end of the previous lesson - the images move on without allowing sufficient thinking time.",
     "Display an example of an algorithm produced in lesson one and ask pupils to discuss with a partner why the person following this algorithm does allow thinking time.",
     "Identify that waiting for the person to respond would not be possible with the micro:bit but that ‘wait’ could be used in a different way. Ask pupils to think/pair/share ideas on how ‘wait’ could be used to display the images for longer and allow thinking time.",
     "Using delays with algorithms (15 minutes)",
     "Model how to annotate the LED planner used in the previous lesson to identify the delays that need to be added and give pupils suitable time to use their LED plans from the previous lesson to create an algorithm that indicates the length of time each image will be shown for.",
     "Use slide 7 to explain the role of patterns in computing and invite suggestions on how pupils have used patterns in their algorithm when deciding on the wait time given to each image.",
     "Programming with delays (25 minutes)",
     "In their pairs, invite pupils to explore the blocks in the ‘basic’ menu in the MakeCode editor to find a block that can be used to delay the program and test out how it can be used. Note the ‘pause’ block uses milliseconds, so a delay of 2 seconds will be pause (ms) 2000.",
     "As a class, share pupils’ findings of which block to use and how it can be used.",
     "Ask pupils to modify their programs created in the previous lesson in line with the changes made to their algorithms.",
     "Remind them of the need to test and debug their programs as they go.",
     "If you have access to micro:bits, pupils should transfer them to the device once they feel their program is working and then try out their flashcard.",
     "An example of a program (DigitialFlashcard2) using pause block to create thinking time is included in the lesson downloads (you may need to rearrange the comment blocks to see the code).",
     "Reviewing improvements (10 minutes)",
     "Display slide 10 to the pupils and ask them to discuss their understanding of the computing concepts: evaluation, algorithms, patterns and debugging.",
     "Invite suggestions from pupils, on how they made use of each of these concepts to improve their digital flashcard",
     "Ask pupils for examples of how their work in other lesson could benefit from the process they undertook."
    ],
    "extension": [
     "Pupils could write an algorithm for having a short conversation in the language you are studying e.g. saying hello and asking someone’s name.",
     "If you have micro:bits, pupils could construct an algorithm that instructs others how to transfer a program from the MakeCode editor to the micro:bit."
    ],
    "differentiation": [
     "Support:",
     "Pupils could write algorithms and modify programs as part of an adult led group.",
     "For EAL pupils the MakeCode editor language could be changed (click on cog > Language).",
     "Stretch & challenge:",
     "Pupils could explore simple sentence patterns in the language you are studying and write an algorithm to help someone follow one of the patterns."
    ],
    "assessment": [
     "Informal observations of pupils’ solutions, use of patterns and programs.",
     "More formal assessment of pupils’ use of delays in their programs."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-flashcards-4",
    "title": "Predicting & experimenting",
    "pages": 18,
    "intro": "In this lesson, pupils develop their logical reasoning skills by matching programs with their outputs before experimenting (‘tinkering’) with the MakeCode editor to find additional ways of controlling the BBC micro:bit’s LEDs. They are introduced to design criteria for the use of micro:bit as a digital number flashcard and create an algorithm that meets these needs.",
    "materials": "",
    "objectives": [
     "To use logical reasoning to identify the output of a program",
     "To tinker (experiment) to develop understanding",
     "To create an algorithm that meets given criteria"
    ],
    "activities": [
     "What’s my program? (10 minutes)",
     "Tinkering with LEDs (20 minutes)",
     "Designing a number flashcard",
     "Reviewing algorithms (10 minutes)",
     "Introduction: What’s my program? (10 minutes)",
     "Give pupils print out of slides 4 - 6. In pairs or small groups, ask pupils to annotate the programs to predict the output.",
     "Use the links on each slide to run the programs using the micro:bit simulator (in full screen mode) – HEX files are also supplied.",
     "Ask pupils to use logical reasoning to identify which program would have created the sequence observed. When taking feedback, ensure pupils justify their choices by referring to the sequence of images and the length of delays to help to develop their logical reasoning skills.",
     "Tinkering with LEDs (20 minutes)",
     "Explain to pupils that the LED images can be programmed using other blocks and ask them to tinker with the MakeCode editor to find other ways of controlling the LEDs (use slide 8 if helpful to explain the concept of tinkering and why it’s important in Computing).",
     "Allow sufficient time for pupils to explore other ways of programming LEDs before inviting pupils to share their findings. Using slide 10, discuss which is the most effective program for creating a representation of the digit eight.",
     "Invite suggestions on how the results of their tinkering could be used to create another flashcard that would help some practice numbers to ten in their studied language.",
     "Designing a number flashcard (20 mins)",
     "Share and discuss the design criteria for a number flashcard with the pupils using slide 12.",
     "Discuss how this could be planned as an algorithm using the LED planner (an example is included on slides 13 & 14 of the lesson presentation).",
     "In pairs or small groups give pupils time to plan how they will use the micro:bit as a digital flashcard to practice numbers to ten the chosen language.",
     "Reviewing algorithms (10 minutes)",
     "Use slide 15 to display the design criteria for the flashcards and ask pupils to work in their pairs or small groups to highlight where on their algorithm they have met the different aspects of the design criteria."
    ],
    "extension": [
     "Pupils could develop an instruction leaflet that tells someone the different ways to create LED images using micro:bit."
    ],
    "differentiation": [
     "Support:",
     "Pupils could use modified design criteria that require representations using the show LED blocks only.",
     "For EAL pupils the MakeCode editor language could be changed (click on cog > Language).",
     "Stretch & challenge:",
     "Pupils could be challenged to create more representations in their algorithm."
    ],
    "assessment": [
     "Informal observations of pupils’ use of logical reasoning when making matching programs to outputs and tinkering when exploring additional ways to programs LEDs.",
     "More formal assessment of pupils’ algorithms and how it meets the design criteria."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-flashcards-5",
    "title": "Debugging & evaluating",
    "pages": 18,
    "intro": "In this final lesson, pupils use their algorithms to program the BBC micro:bit as a digital number flashcard that meets design criteria. Upon completion, pupils evaluate their programs against the design criteria, consolidate and review the all computing concepts used in this unit.",
    "materials": "",
    "objectives": [
     "To follow an algorithm accurately to create a digital number flashcard",
     "To write and debug programs that meets design criteria",
     "To evaluate against design criteria"
    ],
    "activities": [
     "Copy my image (10 minutes)",
     "Recapping algorithms (5 minutes)",
     "Programming number flashcards (30 minutes)",
     "Evaluating and reviewing (15 minutes)",
     "Introduction: Copy my image (10 minutes)",
     "Invite pupils to think/pair/share the ways found to program LEDs through tinkering in the previous lesson.",
     "Show the images in slides 4, 5 and 6. In pairs, ask pupils to write simple programs to create an identical output using the best block for the task: show LEDs, show number, or show string. Links to solutions are provided in the slides and in supplied HEX files.",
     "Recapping algorithms (5 minutes)",
     "Invite pupils to explain how, in the previous lesson, they wrote an algorithm using the LED planner to show how they will program micro:bit to be a digital flashcard.",
     "Use slide 8 to remind pupils of the design criteria for their product.",
     "Remind pupils of the importance of testing and debugging regularly as they construct their programs (slide 9).",
     "Programming number flashcards (30 minutes)",
     "In pairs or small groups, give pupils time to follow their algorithms to program their digital flashcards using the MakeCode editor, reminding them to test and debug as they go.",
     "If using physical micro:bits, pupils should also transfer their programs to the device and test and debug them.",
     "An example of a program ( HYPERLINK \"https://makecode.microbit.org/\" \\l \"pub:_8m11eEEgaLma\" DigitalNumberFlashcards) that meets the design criteria has been included in the lesson downloads.",
     "Evaluating and reviewing (15 minutes)",
     "Display slide 10 and ask pupils to reflect on their successes at addressing each point of the success criteria. Ask pupils to complete the evaluation sheet individually.",
     "If programs have been transferred to micro:bits, you may wish to allow pupils to swap and try out the digital flashcards.",
     "Review the unit as a whole by discussing understanding of the key computing concepts using slides 11-15 and the lesson objectives on slide 17 if you wish."
    ],
    "extension": [
     "Pupils could create digital flashcards that could be used by another class to support specific vocabulary being learnt in foreign language lessons or to develop subject specific vocabulary in another area of the curriculum.",
     "Pupils could use the flashcards as a memory game and even do a research project on whether numerical, graphical or written numbers are quicker to read, and which are easier to remember."
    ],
    "differentiation": [
     "Support:",
     "Pupils use evaluation support sheet which could be completed as an adult led activity.",
     "For EAL pupils the MakeCode editor language could be changed (click on cog > Language).",
     "Stretch & challenge:",
     "Pupils could swap digital flashcards and evaluate this as a ‘user.’ Are all aspects of the design criteria met? Can suggestions for further improvements be made (these should not be limited by their knowledge of programming the micro:bit)?"
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of algorithms and evaluations through paired, group and whole class activities.",
     "More formal assessment of pupils’ programs and evaluation sheets."
    ]
   }
  ]
 },
 {
  "slug": "musical",
  "title": "Musical micro:bit",
  "emoji": "🎵",
  "order": 5,
  "description": "This series of five lessons is written for primary school students aged 9-10 years. Students compose musical phrases and write algorithms to play their phrases on pitched instruments (e.g. glockenspiels). They then program the micro:bit to play their phrases when events are triggered and experiment with using the accelerometer. Finally, they consider whether the micro:bit can be used as a music-making device, especially for those who might not have access to instruments.",
  "skills": [
   "Algorithms",
   "Iteration",
   "Selection",
   "Input/output",
   "Listening",
   "Composition"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-musical-1",
    "title": "Musical algorithms",
    "pages": 16,
    "intro": "In this unplugged lesson, pupils widen their experiences of algorithms by identifying ways that people are given instructions to play music. They evaluate the effectiveness and identify strengths and weaknesses of a variety of algorithms before creating a short musical composition based on given criteria. Finally, they write an algorithm to communicate their composition to a person who cannot read music.",
    "materials": "",
    "objectives": [
     "To read and interpret a range of algorithms",
     "To evaluate algorithms",
     "To write algorithms for a given audience"
    ],
    "activities": [
     "Introductory activity: Fill the gap (10 minutes)",
     "Evaluating algorithms (15 minutes)",
     "Reading musical algorithms (15 minutes)",
     "Composing musical phrases and algorithms (15 minutes)",
     "Evaluating algorithms (5 minutes)",
     "Introduction: Fill the gap (10 minutes)",
     "Give out the pitched musical instruments. Ask pupils to listen, and then join in, as you clap a beat of four then rest for a beat several times (slide 3).",
     "Once pupils are confident with the sequence, explain that when you point to a pupil then need to play a musical phrase on their pitched instrument that will fill the gap. Repeat this several times, the pupils continue ‘clapping and resting’ if they have not been chosen to play a musical phrase.",
     "Recap pupils’ understanding of selection from the Data handling unit by presenting the algorithm on slide 4. Identify what computing concepts are represented in the algorithm (repetition and selection) and invite pupils to complete it by identifying the activities they did when certain conditions were met. Discuss why forever has been added and what the effect of removing it from the algorithm would be (you would only check if the conditions have been met once).",
     "Evaluating algorithms (15 minutes)",
     "Use slide 5 to recap the meaning of the term algorithm (definition in slide notes) and invite pupils to give examples of algorithms that they have previously written.",
     "Display slide 6 and ask pupils to discuss with their partner if allow the images are examples of algorithms. Explore pupils’ ideas and establish that all give pupils instructions on how to play a piece of music.",
     "Display slide 7 and explain to pupils that they are going to evaluate each algorithm. Recap what evaluation means: identifying how well something does the job it was made to do (give instructions to humans) and how it can be improved. Using each algorithm in turn, invite brief suggestions on the positives and negatives of that algorithm - examples are included in the speaker notes section of lesson presentation.",
     "Give out copies of the algorithm evaluation sheet (slide 8) and ask pupils to work with a partner to identify at least one positive and negative for each type of musical algorithm.",
     "When pupils have completed their evaluations, discuss which algorithm they think would be most useful for a person that doesn’t know how to read music and to justify why they think that.",
     "Reading musical algorithms (15 minutes)",
     "Display slide 9 and ask pupils what instructions they think the algorithm is giving. Pupils responses should focus on which notes need to be played and the sequence in which the notes should be played. Invite pupils to follow the algorithm and play the musical phrase using their instruments.",
     "Display slide 10 and invite pupils’ ideas on what the statements about the musical phrase created by the algorithm relate to (see speaker notes for explanation).",
     "Present pupils with the algorithms on slides 11 & 12 and ask them to create statements, similar to those on slide 10, about each musical phrase. Use the questions on the slide to guide pupils’ responses.",
     "Composing musical phrases and algorithms (15 minutes)",
     "Explain to pupils that they are going to compose a piece of music that matches the criteria displayed on slide 13.",
     "Review the terminology used and highlight they need to write an algorithm to instruct someone who cannot read music how to play each musical phrase they create.",
     "Give pupils time to work with a partner to create musical phrases that meet the criteria and write their algorithm for each phrase. Pupils can choose the form their algorithm will take but it must be for a person who cannot read music.",
     "Evaluating algorithms (5 minutes)",
     "Invite pupils to share their algorithms with the class and ask for volunteers to test out the algorithms by playing the pieces of music.",
     "After playing the piece of music, ask pupils to comment on the effectiveness of the algorithm and suggest what could be changed to improve it. Use the questions on slide 14 to guide pupils’ evaluation and feedback.",
     "If you wish, use slide 15 to review the learning objectives of the session."
    ],
    "extension": [
     "Pupils could be given a help sheet on how to read sheet music and the sheet music to a popular children’s song (e.g. happy birthday) and asked to re-write it in the form of an algorithm that would allow someone who cannot read music to play it."
    ],
    "differentiation": [
     "Support: Pupils could be given simplified criteria for their musical phrases and use a specified algorithm - see musical phrases support sheet.",
     "Stretch & challenge: Pupils could explore different ways of writing algorithms for people who cannot read music by creating different style algorithms for each musical phrase. They should then evaluate their algorithms to select the one they think is most effective and state why."
    ],
    "assessment": [
     "Informal observation of pupils understanding and evaluations of algorithms through whole class and group discussions.",
     "More formal assessment of pupils’ algorithms if wished."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-musical-2",
    "title": "Programming & debugging music",
    "pages": 13,
    "intro": "In this lesson, pupils develop their understanding of how to program the BBC micro:bit to play musical phrases by exploring and modifying programs that use the music blocks in MakeCode. They make use of their knowledge of repetition and inputs from previous units when writing programs to allow the micro:bit to play different musical phrases when certain conditions are met. They test and debug their programs before transferring to their device and exploring how to connect a micro:bit to speakers/headphones to play the music.",
    "materials": "",
    "objectives": [
     "To use existing knowledge to improve programs",
     "To write and debug musical programs",
     "To experiment (tinker) with the micro:bit to make music"
    ],
    "activities": [
     "Introductory activity: represent that tune (10 mins)",
     "Introducing musical programming (20 minutes)",
     "From programs to algorithms (20 minutes)",
     "Making the micro:bit musical (10 minutes)",
     "Introduction: Represent that tune (10 mins)",
     "Use slide 3 to invite pupils to recall the algorithms they wrote last lesson and discuss the questions with their partner before feeding back to the class,",
     "Run the video clip of a glockenspiel being played (slide 4) and ask pupils to write an algorithm that a person may have followed to play the musical phrase. Remind pupils to think about the feedback from their evaluations last session. Pupils can be supported by using printout of the octave on slide 11.",
     "Take a few examples and highlight pupils’ use of repetition. If repetition hasn’t been used, prompt thinking by asking questions such as, “how else could we have communicated the musical phrase?”",
     "Introducing musical programming (20 minutes)",
     "Display slide 5 and invite pupils to use their current understanding of the micro:bit and MakeCode to make statements about the program (see speaker notes for suggestions).",
     "Use the link on the slide (the image of the starter hex file program) to open up the same program using the MakeCode editor and invite suggestions for how to get the music to be played.",
     "Explain to pupils they are going to write a program with the same output using fewer blocks. Allow pupils to think/pair/share their initial responses before letting them work with a partner to rewrite the program. The program should make use of repetition (see slide 12 for example).",
     "Once pupils have had the opportunity to rewrite the program, ask them to share their programs and comment on how they were able to create the same output using fewer blocks. Identify the concept that pupils used (repetition) and the benefits of using it: fewer instructions are used so less time is spent writing and debugging the program (slide 6) and it is more efficient for the micro:bit to run.",
     ".",
     "From programs to algorithms (20 minutes)",
     "Explain to pupils that they are going to write a program to play the musical phrases they composed in the previous lesson. Discuss the need for each phrase to start when a different condition is met (slide 7).",
     "Pupils work with a partner to program the micro:bit to play their musical phrases composed in the previous lesson. Each musical phrase should start with a different input. Remind pupils to test their program frequently and debug when necessary (see example hex file with lesson downloads and on slide 12).",
     "Making micro:bit musical (10 minutes)",
     "This activity requires access to physical micro:bits and associated hardware, if you do not have the required resources, skip this section.",
     "Give out headphones/speakers, micro:bits, battery packs, crocodile clips and USB connectors and display slide 8. Invite a pupil to model how to download and transfer the program to a micro:bit.",
     "Explain that pupils are going to experiment (tinker) to find out how to get their musical phrases to be played when the micro:bit is not connected to the computer. Display slide 9 and explain that this requires a lot of the information they need and give pupils time to experiment.",
     "Invite pupils to share their findings and explain how they made use of the image on slide 9. Ask pupils how they used trial and error to solve the problem, highlighting the importance of ‘failure’ to learning.",
     "If you wish, used slide 10 to review the learning objectives of the session."
    ],
    "extension": [
     "Pupils could play a duet with micro:bits. The pupils play their musical phrase on the glockenspiel alongside the micro:bit playing it through speakers. This could be recorded and shared."
    ],
    "differentiation": [
     "Support: Pupils could use a partially completed program (see support hex file) or complete the task as a guided group with adult support.",
     "Stretch & challenge: Pupils could use the ‘add comment’ function in the MakeCode editor (right-click) to annotate their program to explain their use of repetition and selection in the program."
    ],
    "assessment": [
     "Informal observation of pupils understanding of repetition, programming and tinkering through class and group discussions and activities.",
     "More formal assessment of pupils’ algorithms and programs if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-musical-3",
    "title": "Musical gestures",
    "pages": 15,
    "intro": "In this unplugged lesson, pupils revisit selection and consolidate their understanding by following algorithms that require them to carry out specified movements when conditions are met. They analyse and modify the algorithm to help them identify the structure of selection statements. Pupils consider the role of a conductor in an orchestra and how the musicians carry out actions when certain gestures are made. They then write algorithms to instruct others which notes to play on a pitched instrument when certain actions are carried out.",
    "materials": "",
    "objectives": [
     "To analyse and modify algorithms",
     "To identify patterns in algorithms",
     "To write algorithms using repetition and selection"
    ],
    "activities": [
     "Introductory activity: Following an algorithm (10 mins)",
     "Modifying and debugging an algorithm (15 mins)",
     "Conductor algorithms (25 minutes)",
     "Evaluating algorithms (10 minutes)",
     "Introduction: Following an algorithm (10 mins)",
     "Give our copies of slide 13 and use slide 3 to display the algorithm to the pupils. Invite pupils to make statements about the algorithm and to answer the questions on the slide.",
     "Explain that pupils are going to follow the algorithm displayed on slide 4 and carry out the action when the condition in the selection statement (i.e. point at the ceiling) is met.",
     "Go through the algorithm together and check if pupils are carrying out the correct action. You may wish to discuss the number of times pupils carry out the action; as forever is used then pupils should continue doing the action until you change to another condition or stop doing that condition.",
     "Modifying and debugging an algorithm (15 mins)",
     "Display slide 5 and invite pupils to write further selection statements for the algorithm by adding to their copy of slide 13. When doing so, draw pupils’ attention to the pattern of indentation with the ‘If’ statement and the ‘then’ statement.",
     "Invite pupils to share their additional lines and add these to a class algorithm. After a few further statements have been added, select a pupil to act out the conditions in the algorithms while others respond with the appropriate action.",
     "Explain to pupils that the algorithm was written to get a person to carry out an action once (not repetitively) when a gesture is made. Discuss if this algorithm meets the goal and how it could be improved so it meets that goal (slide 6).",
     "Pupils work with a partner to debug the algorithm (again they should annotate their copy of slide 13).",
     "Conductor algorithms (20 minutes)",
     "Watch the first minute of the YouTube video which shows a conductor conducting an orchestra (slide 7). Highlight that the musicians have sheet music (an algorithm) to tell them what notes to play but the conductor instructs the musicians on how to play the music and when to come in. Invite suggestions on the similarities between the roles the conductor and the orchestra are carrying out and the roles they carried out when responding to the algorithm.",
     "Ask pupils to write a selection statement that represents the conductor’s gesture and the subsequent action of the orchestra (see example in slideshow speaker notes).",
     "Explain that pupils are going to write an algorithm that identifies the gestures that they will carry out to tell others what note to play on their pitched instruments (slide 8). Explain to pupils that they are going to use the notes low G through to middle G (commonly the first 8 notes on classroom glockenspiels).",
     "Ask pupils to identify any keywords or phrases they believe are essential to the algorithm. Ask pupils to explain the reasoning behind their suggestions and add words to a large sheet of paper to display during independent work.",
     "Display slide 9 and explain how to use the planning sheet to identify the gestures before then writing their algorithm.",
     "Give pupils time to work with a partner to plan out the gestures they will use on the planning an algorithm sheet then to write an algorithm that shows other pupils what notes to play on a glockenspiel when certain gestures are carried out (see examples of pupils’ work on slide 14).",
     "Evaluating algorithms (10 minutes)",
     "Give out pitched instruments and select an algorithm to share with the class by photocopying or displaying on the class interactive board. Invite the writers of the algorithm to take on the role of conductors and get them to conduct the class so they play one of their musical phrases from lesson one (slide 10).",
     "After the musical phrase has been successfully played, display the questions on slide 11 and ask pupils to use these to help them evaluate the algorithm they just used. Invite feedback by allowing the pupils to respond to each question in turn. Suggestions of what pupils might identify in the algorithms have been included in the speaker note section of the lesson slide presentation."
    ],
    "extension": [
     "Pupils could record a video journal of their work to explain what they have been doing and their learning."
    ],
    "differentiation": [
     "Support: Pupils could use the bank of gestures sheet to help identify the movements and the algorithm support sheet.",
     "Stretch & challenge: Pupils could be encouraged to write and test a more complex algorithm from scratch, featuring a range of conditions and gestures."
    ],
    "assessment": [
     "Informal assessments of pupils’ understanding of algorithms through responding, modifying, debugging and evaluating activities carried out in whole class and paired situations.",
     "More formal assessment of pupils’ written algorithms if you wish."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-musical-4",
    "title": "Controlling music with inputs",
    "pages": 11,
    "intro": "In this lesson, pupils explore further the inputs that the BBC micro:bit can use to trigger events. They read programs and make predictions about when outputs will occur. They experiment with selection by using conditions that make use of the micro:bit’s accelerometer so that all the notes in an octave can be played using inputs. After writing, testing and debugging their program, they consider the potential benefits of using a micro:bit for people who find playing musical instruments difficult.",
    "materials": "",
    "objectives": [
     "To identify how inputs are used in programs",
     "To write programs that use inputs and selection",
     "To write and evaluate algorithms"
    ],
    "activities": [
     "Introductory activity: 3, 2, 1, program (10 minutes)",
     "Selecting conditions (30 minutes)",
     "Writing algorithms (15 minutes)",
     "Introduction: 3, 2, 1, program (10 minutes)",
     "Show the videos on slide 3 and on slide 4. After each video has been shown, challenge pupils to write a program to get micro:bit to play the same musical phrase. If you wish, pupils can use the starter hex file which contains some of the blocks needed for the programs. If you have access to physical devices, you may wish to rehearse transferring the program to the device and connecting micro:bits to headphones/speakers to play the phrase.",
     "After pupils have programed the first musical phrase, discuss the techniques they used. Ask pupils if anyone managed to write the program without getting extra blocks from the menu. Some pupils may have duplicated the blocks already given and therefore saved time. Invite a pupil, who knows how to do this, to model to the rest of the class how to duplicate a block (right-click on the block and select duplicate). Invite pupils to test this out when programing the musical phrase from slide 4.",
     "Selecting conditions (35 minutes)",
     "Show pupils the Instrument MakeCode program on slide 5 and ask them to use their existing knowledge to make statements about the program (when a certain condition is met, a certain note is played). Ask pupils to work with a partner to write down their statements on a large sheet of paper, before inviting them to feedback ideas to the class. Remind pupils they are using logical reasoning (see speaker notes for example responses).",
     "Use the link in the slide to open the same program in the MakeCode editor. Invite pupils to use the simulator to show how to get a micro:bit to play certain notes (pressing button A will produce low G note, pressing button B will produce low A note, shaking the micro:bit will produce low B). Remind pupils that when a computer carries out an action only when a condition is met is an example of selection.",
     "Focus on the block that contains the condition ‘is shake gesture’ and explain to pupils that the micro:bit uses the accelerometer to check if the device has been shaken.",
     "Click on the drop-down menu of the block to show other accelerometer-based inputs:",
     "Explain to pupils that they are going to finish this program by adding the rest of the notes in the octave (middle C, middle D, middle E, middle F & middle G). Invite pupils’ suggestions on what blocks would need to be added to program a micro:bit to play the next note. Explain that they are going to use the accelerometer-based inputs that involve moving the micro:bit (the first seven options). Select an appropriate condition and then add a block to specify which note will be played.",
     "Explain that the simulator cannot represent these inputs so it will have to be tested by downloading and transferring the program to a physical micro:bit which should be connected to speakers/headphones in order to play the music. Invite a pupil to demonstrate how to do this if needed. If you do not have access to the hardware the program can still be completed using the MakeCode editor.",
     "Give pupils a copy of instrument hex file and ask them to work with a partner to complete the program so that the micro:bit has a different output for each note in the octave. Use slides 6 & 7 to explain to pupils how to complete the program and record the inputs on the worksheet to state which condition they used for each note. You may wish to change the octave to suit the pitched instruments you have used as a class.",
     "Writing algorithms (15 minutes)",
     "Once pupils have programed their micro:bits to play the notes in the chosen octave when certain conditions are met, use slide 8 to explain that they are going to write a simple algorithm to allow someone to play one of their musical phrases from lesson one using the micro:bit’s inputs.",
     "Give pupils time to work with their partner to write an algorithm that instructs someone which micro:bit inputs to use to get the device to play a musical phrase. Pupils should move on to this task when they have finished the program. If you do not have access to physical micro:bit hardware, the task can still be completed but pupils are creating an algorithm for when they have access to a micro:bit.",
     "Once pupils have written an algorithm, ask them to swap algorithms with another pair and evaluate this algorithm. Use the questions on slide 8 to support their evaluation and feedback.",
     "If you wish, use slide 9 to revisit the learning outcomes of the session."
    ],
    "extension": [
     "Pupils could use the start melody block from the music menu to create melodies that are played when certain inputs are used. Then they can compose music by sequencing the different melodies and playing them through micro:bits attached to speakers or headphones."
    ],
    "differentiation": [
     "Support: Pupils could use the instrument-support hex file to support the structure of their program and their block choices.",
     "Stretch & challenge: Pupils could program from a blank canvas and select all the inputs that are used as conditions for when a note is played. Pupils could also use the selection in a musical scale (challenge) sheet to record their conditions."
    ],
    "assessment": [
     "Informal assessments of pupils’ understanding of inputs, selection, algorithms, programming and evaluations through whole class and paired activities.",
     "More formal assessment of pupils algorithms and programs if you wish."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-musical-5",
    "title": "Evaluating micro:bit music",
    "pages": 15,
    "intro": "In this lesson, pupils use their knowledge and understanding to make changes to programs in response to challenges. They decompose their learning from the unit by considering the information that someone will need to make music using a BBC micro:bit and create slides for a presentation based on this idea. Pupils conclude the unit by evaluating the micro:bit as a device for making music.",
    "materials": "",
    "objectives": [
     "To modify programs to meet given criteria",
     "To decompose learning from the unit",
     "To evaluate the micro:bit as a music-making device"
    ],
    "activities": [
     "Introduction: Programming challenges (15 minutes)",
     "Creating a guide (35 minutes)",
     "Evaluating musical micro:bit (10 mins)",
     "Introduction: Programming challenges (15 minutes)",
     "Display the starter program on slide 3 and explain to pupils that you would like them to modify the program to meet each criterion on the slide. Invite suggestions for how each modification could be made, before using the link (click on the program image) or supplied starter hex file to open the program in the MakeCode editor and amend.",
     "Show the pupils the two programs on slide 4 and explain that they are going to work with a partner to create challenges for one of the programs. If possible, split the class so that half of the pupils set challenges for program A, and the other half set challenges for program B (click code blocks for published project or use hex files supplied with lesson downloads).",
     "Allow pupils several minutes to set their challenges by recording them on the programming challenges worksheet and then ask pupils to team up with a pair creating challenges for the other program. Pupils then work with their partner to modify the given program (using Musical challenges A & Musical challenges B hex files) to meet the criteria set by the other group (slide 5). As pupils make each modification, they should explain what change they made to the program on the programming challenges worksheet. Examples of the challenges pupils may set and how they might be responded to are included on slide 14.",
     "Creating a guide (35 minutes)",
     "Show slide 6 and invite pupils to think/pair/share some reasons why people might be restricted from playing a musical instrument: fine motor skills, disability, cost of the instrument, etc. You may wish to share this link with pupils that highlights the findings of a recent survey showing that pupils from poorer families are three-times less likely to play a musical instrument than children from wealthier families.",
     "Display slide 7 and pose the question to pupils: could the micro:bit allow someone who is restricted from playing a musical instrument a way of making music? Ask pupils to think/pair/share their responses and allow pupils to respond to the ideas of others.",
     "Use slide 8 to recap the term decomposition. Invite pupils to explain their understanding of the term and explain that it is the process by which a more complex problem is broken down into smaller problems and by solving these smaller problems the bigger problem is solved.",
     "Invite pupils to decompose the statement ‘programming the micro:bit to play music’ by asking them to reflect on their learning in the unit (further support could be given by asking what someone else would need to know if they wanted to make music on a micro:bit). Guide pupils’ thinking so they identify that they programmed the micro:bit to play musical phrases, they connected micro:bits to speakers/headphones, they used the micro:bit’s inputs to play the notes in an octave. Ask pupils to discuss their ideas in small groups and record these on a large sheet of paper.",
     "Use slide 9 to explain to pupils that they are going to create two slides for a ‘How to make music using the micro:bit’ presentation. One slide should focus on how the micro:bit can be used to play musical phrases. The second slide should focus on how some of the inputs on a micro:bit can be used to play the notes in an octave. Each slide should contain a snapshot of their program (right-click on a blank area next to the program in the MakeCode editor and select snapshot), a brief explanation of parts of the program and a few challenges for a person using the guide to complete using the program as a starting point. Print out copies of this slide for pupils to refer to when creating their slides.",
     "Use slide 10 to show pupils an example of what the slide might look like, though if you wish, encourage pupils to be creative. Identify how each part of the criteria on slide 9 has been met by this example.",
     "Give pupils time to work with a partner to use presentation software to produce two slides for a presentation on ‘How to make music using the micro:bit’ that meet the criteria given on slide 9. Pupils should access the programs they have previously written in the unit.",
     "Evaluating musical micro:bit (10 mins)",
     "Display slide 11 and ask pupils to consider the strengths and weaknesses of programming the micro:bit to play a musical phrase and programing a micro:bit to play individual notes when certain inputs are used.",
     "Give pupils a copy of the slide and ask them to work with a partner to identify strengths and weaknesses for each (example comments on slide 13).",
     "After they have had sufficient time to discuss their ideas, invite pupils to share their ideas with the class.",
     "If you wish, revisit the learning outcomes of the lesson by using slide 12."
    ],
    "extension": [
     "Pupils could research UNICEF’s rights of a child and focus on article 31: every child has the right to relax, play and take part in a wide range of cultural and artistic activities. Pupils could consider children who are not having this right met, the reasons this might be and how giving access to a micro:bit and the MakeCode editor could help this right to be met."
    ],
    "differentiation": [
     "Support: Pupils could create a poster to replicate a slide as an adult-led shared writing activity. It would be useful to select the programs that are going to be used prior to the lesson and provide each member of the group with printouts of the program to help them explain the program and enlarged copies to stick on the poster.",
     "Stretch & challenge: Pupils can be challenged to create an answer slide which should contain examples of the program after each change has been made in line with the challenges set."
    ],
    "assessment": [
     "Informal assessments of pupils’ understanding of decomposition and their understanding of programing through whole class and paired activities.",
     "More formal assessment of pupils’ slides if you wish."
    ]
   }
  ]
 },
 {
  "slug": "sensory",
  "title": "Sensory classroom",
  "emoji": "🧩",
  "order": 6,
  "description": "In this series of four lessons students consider how a sensory classroom can be used to meet the needs of learners who are sensitive to sensory stimulus. They evaluate sensory aids to learn how they meet the needs of their users and use this understanding to plan and devise a classroom sensory aid using the micro:bit. Ideally, this unit should be taught after Computing fundamentals and assumes students have experience of writing algorithms using pseudocode and have used the MakeCode editor.",
  "skills": [
   "Algorithms",
   "Abstraction",
   "Iteration",
   "Input/output"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-sensory-1",
    "title": "Exploring learning environments",
    "pages": 13,
    "intro": "In this lesson students consider the effects a standard classroom environment can have on learners who are sensitive to sensory stimuli. They will learn about how sensory rooms are used to offer such learners a calm environment in which they can explore their senses and evaluate the aids that are used to achieve this.",
    "materials": "",
    "objectives": [
     "To understand that some learners are sensitive to sensory stimulus",
     "To know some benefits of sensory environments",
     "To evaluate sensory aids"
    ],
    "activities": [
     "Introductory activity: describing classrooms (5 minutes)",
     "Sensory learning environments (20 minutes)",
     "Evaluating sensory aids (15 minutes)",
     "Sharing evaluations (10 minutes)",
     "Review & wrap up (10 minutes)",
     "Introduction: Describing classrooms (5 minutes)",
     "Use slide 3 to invite students to suggest ideas on what learning looks like in their classrooms. What do their classrooms sound/look like? What type of activities do they regularly do? (e.g. whole class discussions, group work, talking partners, watching videos, using digital learning resources etc).",
     "Give out sticky notes and ask students to write words to describe their classrooms (one word per post-it note). If needed, remind students that their comments should related to their learning and their learning environment, rather than personal opinions!",
     "Invite students to place their notes on a working wall and discuss them as a class, inviting students to group words of the same and similar meanings together and discussing what the words suggest about what classroom learning looks like (e.g. busy, full of sound, movement, energy).",
     "Sensory learning environments (20 minutes)",
     "Use slide 4 to explain that busy, active classroom environments are not always suitable for all learners.",
     "Discuss the problems for those students who struggle in environments where there are too many sensory stimuli, being sensitive to the students in your class.",
     "Ask students to think/pair/share the senses that would be most stimulated by modern learning environments and what stimulates those senses in their classrooms (slide 5 - see notes for ideas).",
     "Use slide 6 to introduce the term ‘Sensory Classroom’ and ask students to think/pair/share their ideas or experience of what a sensory room is.",
     "Use slide 7 to explain why a sensory room may be beneficial to learning who is sensitive to sensory stimulus",
     "Watch an online clip showing a sensory room (example given on slide 8, or find your own), or visit the school’s sensory room if you have one.",
     "Ask students to make notes on the items that they see in the room, how they are being used and what sense they are designed to simulate.",
     "Evaluating sensory aids (15 minutes)",
     "After a short feedback session around the sensory aids observed, give students with a range of images representing aids from a sensory room selected from an image search for ‘sensory room aids.’",
     "Allocate pairs of students an image of a sensory aid and give them a digital or paper copy of the evaluation sheet and a sheet of A3 paper on which to stick their image and make evaluatory comments about the aid (slide 9).",
     "Sharing evaluations (10 minutes)",
     "After a suitable length of time, give pairs the opportunity to share their evaluation of the sensory aid and invite questions from other students, if appropriate (slide 10).",
     "Recap (10 minutes)",
     "Use slide 11 to review students’ learning in the lesson and recap the lesson objectives on slide 12 if you wish."
    ],
    "extension": [
     "Students could be given a budget (£2000) and asked to decide with sensory aids should be purchased for a sensory room, prepare a spreadsheet to submit their budget and justify why they selected certain items."
    ],
    "differentiation": [
     "Support:",
     "Give students images of a sensory aid that is more transparent in terms of what it does",
     "Provide students with direct questions relating to their sensory aid by using the support statements sheet.",
     "Stretch & challenge:",
     "Students could record their evaluation in the form of a product review for a consumers’ advice website.",
     "They can be encouraged to make more complex evaluative statements and could go on to complete the extension activity."
    ],
    "assessment": [
     "Informal observation of students’ during activities and discussion and students’ annotations of sensory aid image.",
     "More formal evaluation if wished of evaluations."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-sensory-2",
    "title": "Light patterns",
    "pages": 22,
    "intro": "In this lesson students focus on creating a light pattern for a sensory aid by writing a pseudocode algorithm using iteration to meet a set criteria and programming their algorithm using micro:bit.",
    "materials": "",
    "objectives": [
     "To use pseudocode to write an algorithm for a light pattern",
     "To use iteration in algorithms and programs to create a repeating light pattern",
     "To evaluate an algorithm and program to ensure they meet criteria"
    ],
    "activities": [
     "Introduction: A sensory classroom (10 minutes)",
     "Creating repeating patterns (10 minutes)",
     "Writing algorithms (10 minutes)",
     "Turning algorithms into programs (15 minutes)",
     "Evaluating programs (10 minutes)",
     "Wrap up (5 minutes)",
     "Introduction: A sensory classroom (10 minutes)",
     "Ask students to recall from the previous lessons why sensory rooms are used in schools and other settings. Explain that you would like to bring sensory elements into your classroom and briefly recap  the potential benefits for some students (slide 3).",
     "Give out A3 paper and use slide 4 to set students a ‘300 second challenge’ to produce a sketch detailing how a standard classroom could be converted into a sensory classroom. Invite students to share their ideas with the rest of the class.",
     "Creating repeating patterns (10 minutes)",
     "Explain to students that they are going to create a sensory aid for a classroom that uses light patterns and discuss which patterns would be most appropriate for a sensory aid and why (slides 5-7).",
     "Encourage students to identify the commonalities between the images selected non-threatening, symmetrical and make reference to identifying ‘patterns’ in Computational Thinking if you wish.",
     "Show pupils slide 8 and invite suggestions on how the image could be used to plan and record a light pattern before giving out blank copies of the light pattern sheet (slide 10) and asking pairs to create a repeating light pattern, using the diagrams to record each stage of their pattern (slide 9).",
     "Give students appropriate time to design and record their repeating patterns, labelling each diagram to show the sequence of their light pattern.",
     "Invite pairs to share their patterns with another, explaining why they have chosen the specific images sequence and what is displayed at the end of the sequence.",
     "Writing algorithms (10 minutes)",
     "Use slide 11 to recap algorithms with students and explain they are now going to write a pseudocode algorithm to show how their repeating pattern could be displayed on a microbit.",
     "Share the criteria and highlight the concepts they will be using (slides 12-15).",
     "When students finish their algorithm, invite them to compare, test and debug with another pair, checking their algorithms meet the criteria (slide 16).",
     "Turning algorithms into programs (15 minutes)",
     "Ask students to briefly recap their micro:bit experience and access the MakeCode editor (slide 17).",
     "Using paired-programming (slide 18), give students time to create their program, reminding them to test and debug regularly. If necessary, provide additional programming support according to your students’ levels of confidence and experience.",
     "Once students have a working program, ask them to investigate different ways the program could be started (i.e. how the user can interact with the sensory aid). This will help them at a later stage and could include pressing buttons A or B (separately or together); shaking the micro:bit; rotating or tilting micro:bit; dropping micro:bit  - the last two inputs can only be achieved with physical micro:bits.",
     "If you have physical micro:bits, students can connect their micro:bit and transfer the program (if possible with a connected battery supply).",
     "Evaluating programs (10 minutes)",
     "Revisit the program criteria (slide 19).",
     "If you have time, show students a program that has some elements of the given criteria but not all (see supplied criteria review hex file). Invite students to identify what parts of the criteria have been met and to suggest how the program can be debugged or adapted to meet it.",
     "Ask students to show their programs to each other and identify how they have met some/all of the given criteria, allowing time to revise their program if needed.",
     "Wrap up (5 minutes)",
     "Ask students to demonstrate the variety of different ways they used to start their micro:bit program with another pair (slide 20), and share 2 things they have learnt in this lesson. Revisit the learning objectives on slide 21 if you wish."
    ],
    "extension": [
     "Students could act out their algorithms by arranging themselves into a 5 x 5 array and turn a piece paper over to show if the light is on or off and/ or create an animation to represent a bubble tube (see bubble tube example hex file)."
    ],
    "differentiation": [
     "Support:",
     "Students could use the algorithm support sheet to construct instructions for their algorithm.",
     "Students could use the ‘show icon’ block from the ‘basic’ menu in the MakeCode editor which provides a selection of pre-designed images which can be used to create a sequence of different images.",
     "Stretch & challenge:",
     "Students could write a program that use more than one input to activate different repeating patterns (see repeating pattern example project hex file), or that uses variables which would randomly select a repeating pattern (see random image pattern example project hex file)."
    ],
    "assessment": [
     "Informal observation of students’ during activities and discussion, especially evaluative comments.",
     "Informal, or more formal assessment if wished, of students’ light patterns, algorithms and programs."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-sensory-3",
    "title": "Developing pattern algorithms",
    "pages": 15,
    "intro": "In this lesson students plan how to create a classroom sensory aid to provide a visual sensory pattern using micro:bit. They create an algorithm to show the sequence of instructions to follow to program their sensory aid using inputs, outputs, iteration and selection.",
    "materials": "",
    "objectives": [
     "To create a sensory aid for a classroom that meets given criteria.",
     "To use pseudocode to write an algorithm using inputs, outputs, iteration and selection"
    ],
    "activities": [
     "Introduction: Sensory classroom recap (5 minutes)",
     "Introducing the design and build challenge (15 mins)",
     "Planning and designing (30 minutes)",
     "Sharing designs (10 minutes)",
     "Introduction: Sensory classroom recap (5 minutes)",
     "Give out rough paper, and ask students to work in pairs, or small groups, to draw a diagram of a sensory classroom, labelling as many sensory aids from a sensory room as they can remember and adding how learning environments can be beneficial (slide 2).",
     "Ask students to share their diagrams with another pair and compare their ideas.",
     "Introducing the design and build challenge (15 mins)",
     "Share the learning objectives on slide 3 and introduce the design and build challenge (slide 4), highlighting that students will be creating an abstraction of a sensory device and will need to decompose the different parts to create a working device, to link to Computational Thinking.",
     "Share the criteria (slide 5) and discuss why user interaction and hiding any wires (if using physical micro:bits are important considerations).",
     "Note: It may be helpful to remind pupils that sensory aids are designed to stimulate one sense (e.g. visual stimuli and other stimuli, such as sound, should be avoided so as to not over-stimulate the user).",
     "Invite pupils to share ideas around different ways visual stimulus could be provided (e.g. micro:bit images, micro:bit light patterns, different coloured surfaces, patterned surfaces, simple drawings, etc).",
     "Show students the resources and equipment that they will have available for creating their sensory aid (see materials list above for suggestions). If they do not have access to physical micro:bits explain they can create a prototype and use the simulator in the MakeCode editor for their code.",
     "Give students a planning sheet and copies of the light pattern sheet (slides 6-8) and check understanding of what needs to be recorded in each section.",
     "Invite students to recap the computer science concepts that they are likely to make use of in their algorithm if helpful (slides 9 and 10).",
     "Planning and designing (30 minutes)",
     "If you wish, as a class, create a mind-map - on the class interactive display board or on large sheets of paper - showing potential ideas for the sensory aids that could be made, before allowing students thinking time to come up with their idea(s) for a classroom sensory aid.",
     "Once students have an idea, ask them to use their planning sheet to create a diagram to show what their intended product will look like, what it will be made from, where micro:bit (sharing the criteria on slide 11 and example on slide 12 if helpful).",
     "Throughout this phase, encourage students to constantly refer to the design criteria and to ask each other for potential solutions to problems. Use the Have you thought about? sheet to allow students to reflect on the progress of their design.",
     "Sharing Designs (10 minutes)",
     "Ask students to share their designs either with another pair or the class as a round robin (slide 13).",
     "Invite others to ask questions and give constructive feedback (e.g. 2 stars and a wish).",
     "Revisit the learning objectives on slide 14 if you wish."
    ],
    "extension": [
     "Students could create a sensory aid similar to a colour cube that has several repeating patterns that are activated individually. Both buttons A and B could be used as well as shake.",
     "Students could record each other sharing their algorithms and design ideas and upload the videos to a shared area, blog or vlog."
    ],
    "differentiation": [
     "Support:",
     "Students could be paired sympathetically to ensure they can make good progress and could work in a group with an adult who could help to develop their ideas (and be a scribe if helpful).",
     "Stretch & challenge:",
     "Students could make use of their programs from the previous lesson to create a sensory aid that displays more than one repeating pattern, or students could investigate how to design a sensory aid based on a bubble tube (see example files in lesson 2).",
     "Students could also investigate how to use variables and design a sensory aid that selects a random light pattern."
    ],
    "assessment": [
     "Informal observation of students’ during activities and discussion.",
     "Informal, or more formal assessment if wished, of students’ design plan and algorithm."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-sensory-4",
    "title": "Building sensory aids",
    "pages": 8,
    "intro": "In this lesson students will use their plans from the previous lesson to build their light-pattern based classroom sensory aid including programming the micro:bit. Depending on the complexity of the build and the required level of evaluation this lesson may be extended into another/several lesson(s).",
    "materials": "",
    "objectives": [
     "To follow a design plan to create a classroom sensory aid that meets given criteria",
     "To follow an algorithm to create a program using inputs, outputs, iteration and selection",
     "To test and debug code and develop solutions to problems that may arise",
     "To evaluate the classroom sensory aid effectively"
    ],
    "activities": [
     "Introduction: learning recap (5 minutes)",
     "Making and programming a sensory aid (40 minutes)",
     "Evaluation and review (15 minutes)",
     "Introduction: What are we making? (5 minutes)",
     "Give students their planning sheets from the previous lesson and allow them to look over their designs, sharing slide 2 to recap the design criteria if you wish.",
     "Display slide 3 and ask students to pair-up with another pair and discuss the questions on the slide.",
     "Share the learning objectives on slide 4 if you wish.",
     "Making and programming a sensory aid (40 minutes)",
     "If needed, revisit any concepts or programming skills that your students will need to complete their program (though a ‘tinkering’ and problem-solving approach is to be encouraged). The worked example hex file is a working program based on the example algorithm in the previous lesson and can be used for further explanation if helpful.",
     "Give students sufficient time to create their sensory aid from their plan.",
     "It may be helpful to create a ‘maker-space’ environment within the classroom: zoned so activities and their resources for the different aspects of the build are together.",
     "If setting up the classroom in this way, use the pupils planning sheets to guide the zones that are required. Typically, these would be: an area with computers/laptops where pupils undertake their programming and receive additional support if needed, an area with paints, markers pens, coloured paper, scissors, paints brushes, etc. where pupils can construct their casing; and an area with adhesive materials and battery packs where children can secure micro:bit and power-supply to their sensory aid.",
     "Evaluation and review (15 minutes)",
     "When students have completed their sensory aid, give them a copy of the sensory aid evaluation sheet (slide 5) online or on paper.",
     "Ask students to work independently to evaluate their sensory aid. It may be helpful to display the design criteria on slide 2 for them as they complete their evaluations.",
     "As students are likely to finish at different times, when they finish, ask them to record a short video or screencast to explain and present their product, and/or present their product to another group who have also finished.",
     "Review learning of the sensory classroom project by inviting students to answer the questions on slide 6 and recap the learning objectives on slide 7 if you wish."
    ],
    "extension": [
     "Each pair could showcase their product to the class and explain how it meets the needs of the user. You could invite a ‘judging panel’ who could award suitable prizes and certificates (e.g. most creative, most helpful to user)."
    ],
    "differentiation": [
     "Support:",
     "Students can be encouraged to create a simple working program to build their confidence.",
     "Students can use the evaluation support sheet when evaluating their product. Students may benefit from verbalising their responses, which could be scribed or recorded using a microphone or digital device.",
     "Stretch & challenge:",
     "Students will have been challenged to design a more complex sensory aid in the previous lesson which they can build and program in this lesson, including, for example the use of variables. They can also investigate writing their code in JavaScript if they wish.",
     "Students can be challenged to make more deeply evaluative comments."
    ],
    "assessment": [
     "Informal observation of students’ during activities.",
     "Formal assessment of students’ programs, products and evaluation sheets."
    ]
   }
  ]
 },
 {
  "slug": "conductors",
  "title": "Electrical conductors",
  "emoji": "⚡",
  "order": 7,
  "description": "In this series of five lessons aimed at students aged 8-9 years, students develop their understanding of flowchart algorithms, selection and inputs and outputs by using electrical circuits and the BBC micro:bit to test the conductivity of different materials.",
  "skills": [
   "Flowcharts",
   "Algorithms",
   "Electricity",
   "Input/output",
   "Selection",
   "Electronics"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-conductors-1",
    "title": "Selection & conductivity investigation",
    "pages": 17,
    "intro": "In the first ‘unplugged’ lesson of the unit, pupils use their knowledge of electricity to construct circuits and identify the output. They are introduced to the term selection and use this to explain what happens to the output when conductors and insulators are added to the circuit.",
    "materials": "",
    "objectives": [
     "To identify the output in an electrical circuit",
     "To understand the term selection",
     "To use selection when describing the output of an electrical circuit"
    ],
    "activities": [
     "Introduction: Identifying outputs (10 minutes)",
     "Creating and representing circuits (15 minutes)",
     "Introducing selection (10 minutes)",
     "Testing electrical conductivity (15 minutes)",
     "Reviewing learning (10 minutes)",
     "Introduction: Identifying outputs (10 minutes)",
     "Before the session starts, place a range of electrical components for pupils on their tables (see materials needed).",
     "Recap the names of the components and invite ideas on how they could be grouped (slide 3).",
     "Establish that some of the components can be classified as ‘having outputs’ because they produce something when electricity passes through them, and that this output stops once the electricity is removed from the circuit.",
     "Identify the output of each of the electrical components pupils have been given: e.g. the bulb gives out light; the buzzer makes a noise; the motor spins around.",
     "Use slide 4 to define the concept of outputs and invite pupils to identify other examples they commonly use (tablets, TV screens, game consoles, etc.).",
     "Creating and representing circuits (15 minutes)",
     "Use slide 5 to explain to pupils that they are going to use the electrical components to create several circuits, each with an output, and then record these circuits in the form of a simple drawing (not using circuit diagrams) where they label the output.",
     "Review pupils’ understanding of the term abstraction and identify how it could be used to create simple images that represents the components (batteries, bulbs, wires, etc.).",
     "Give pupils time to work in small groups to build electrical circuits and use a simple drawing to record it and label the output. Examples of how circuits could be recorded are included on slide 14.",
     "Introducing selection (10 minutes)",
     "Display slides 6-8 in turn and ask pupils to read and respond to each slide based on whether or not they meet the condition. Pupils should carry out the first action if they meet the condition and the second action if they don’t.",
     "Display slide 9 and invite pupils to share what the term selection means. Highlight that they have just made use of selection when deciding which action to carry out in the previous activity.",
     "Use slide 10 to introduce the concept, an action is only carried out when a certain condition is/isn’t met. Using the images on slides 10 and 11 to show pupils everyday examples of selection. Invite pupils to offer suggestions on what condition needs to be met and what will happen if the condition is/isn’t met?",
     "Testing electrical conductivity (15 minutes)",
     "Explain to pupils that they are going to modify their circuits to allow them to test the materials provided to see if they allow electricity to flow through them. Invite suggestions on what the term electrical conductors means if pupils have previously used this (slide 12).",
     "Allow pupils to share their initial ideas on how the materials can be tested, before giving out copies of the materials recording sheet and asking them to test and record the materials provided to see if they are electrical conductors (slide 13).",
     "Reviewing learning (10 minutes)",
     "Invite pupils to share their findings by identifying which materials were electrical conductors and which were not.",
     "Use slide 14 to link this idea to selection and establish that the condition that needs to be met is the electrical output (bulb lights, buzzer makes a sound) and if this condition is met the material is an electrical conductor and if it isn’t then it isn’t. Review the learning objectives on slide 15 if you wish."
    ],
    "extension": [
     "You could go on a class ‘selection-walk’ around the school and in the local area. Pupils could identify and record systems where they think selection is being used examples traffic lights, pelican crossings, zebra crossings, automated doors, atms, etc."
    ],
    "differentiation": [
     "Support: Pupils may benefit from being supported by an adult or their peers when constructing their circuits and identifying outputs.",
     "Stretch & challenge: Pupils could design a recording table and use the terms conductors and insulators when describing materials. They could also identify patterns in the materials that are conductors and insulators. E.g. conductors are made from metals; insulators are made from non-metallic materials; graphite is a non-metallic conductor..."
    ],
    "assessment": [
     "Informal assessment of pupils’ understanding of outputs and selection from class and group discussions.",
     "More formal assessment if wished of their circuit drawings and recording sheets."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-conductors-2",
    "title": "Decision boxes",
    "pages": 28,
    "intro": "In this ‘unplugged’ lesson, pupils develop their understanding of selection by exploring the use of decision boxes. Initially, they undertake activities where they are required to read and respond to decision boxes before they use decision boxes as part of a flowchart algorithm.",
    "materials": "",
    "objectives": [
     "To understand how selection is represented in flowcharts",
     "To understand and use decision boxes",
     "To create flowcharts algorithms"
    ],
    "activities": [
     "Introduction: Flowchart algorithms (5 minutes)",
     "Decision boxes (10 minutes)",
     "Electrical circuits (15 minutes)",
     "Algorithms with decision boxes (20 minutes)",
     "Evaluating Algorithms (10 minutes)",
     "Introduction: Flowchart algorithms (5 minutes)",
     "Use slide 3 to show pupils a basic algorithm, in the form of a flowchart, for making a glass of squash. Invite suggestions for what the algorithm is and what problem it is solving.",
     "Ask pupils to think/pair/share their previous learning of flowcharts from the Volcano animations unit (where they first saw this flowchart).",
     "Decision boxes (10 minutes)",
     "Show slide 4 and ask pupils to think/pair/share the questions on selection.",
     "Use slide 5 to introduce decision boxes as a way to record selection in a flowchart and show pupils an example related to the previous lesson. Discuss how it is different to other boxes they have used in flowcharts (answers are provided in the speaker notes for the slide).",
     "Display the decision box on slide 6 and ask pupils to identify the condition and the outcomes if the condition is/isn’t met. If helpful, invite other suggestions from pupils’ everyday lives.",
     "Electrical circuits  (15 minutes)",
     "Ensure pupils have access to the same range of materials as the previous lesson and give each group a set of decision cards (printed from slides 20-27).",
     "In small groups, ask pupils to build an electrical circuit that contains an output from the components on their tables, selecting any of the given materials and test if it is an electrical conductor.",
     "Display slide 7 and ask them to respond by selecting the action to carry out based on whether or not there is an output in their circuit. Groups who select a material that is a conductor should be counting to 30 in threes. While those who selected a material that is an insulator should be counting back from 20 in twos.",
     "Explain that you would like pupils are going to repeat this process by selecting a decision card (printouts of slides 20 - 27) and a material, connecting it their circuit and carry out the action dependent on whether or not the condition is met (the circuit has an output).",
     "Review their learning briefly as a class once groups have finished.",
     "Algorithms with decision boxes (25 minutes)",
     "Show pupils slide 8, a scenario used in the previous session, and invite ideas on how to create a decision box to represent the use of selection. Use the questions on slide 9 to support pupils’ ideas and then transfer to the blank decision box on slide 10.",
     "Display slide 11 and ask pupils to recall the selection statement they made about the materials at the end of the previous lesson. Is there is an electrical output in the circuit? If the answer is yes, then the material is an electrical conductor. If the answer is no, then the material isn’t an electrical conductor.",
     "Use the blank decision box on slide 12 and invite ideas on how to represent the selection statement. An example of this could be completed in included on slide 13.",
     "Explain to pupils that they are going to write an algorithm, in the form of a flowchart, to show someone how to test if a material is an electrical conductor (slide 14).",
     "Display slide 15, which shows a blank flowchart and invite pupils to suggest what type of information goes in each box (oval for start and stop, rectangular for actions, rhombus for decision boxes, arrows to connect boxes, yes and no arrows from decision boxes).",
     "Explain that pupils are going to use this frame to help them write a flowchart that shows someone else how to use an electrical circuit to test if a material is an electrical conductor. Establish how many actions will be needed in the flowchart (two) and invite suggestions on the two activities that could be added.",
     "Draw attention to the decision box and invite suggestions from pupils on the condition that could be added to the decision box and the statements to go in the yes and no boxes.",
     "Give out copies of the blank flowchart algorithm sheet to pairs and ask them to construct a flowchart algorithm to show how to test if a material is an electrical conductor.",
     "Evaluating algorithms (10 minutes)",
     "When pupils have completed their algorithms, show an example using slide 16 and discuss if this is accurate (would it allow someone to complete the task if they followed it?).",
     "Ask pupils to share the steps they created (displaying their flowcharts to the class if possible) and decide if they are also accurate. Use slide 17 to discuss what should be done to algorithms that are difficult to follow and invite pupils’ suggestions on how this can be done (debugging their algorithms).",
     "After sharing several examples, establish that the algorithm could be written in different ways and discuss that if the flowchart instructs someone to complete the task, then it is accurate.",
     "Display slide 18 and ask pupils to select the action which represents their understanding of selection. Invite pupils to recap with a partner the meaning of selection and review the learning objectives on slide 19 if you wish."
    ],
    "extension": [
     "If pupils carried out the selection-walk in the previous lesson, they can reflect on their findings and try and use decision boxes to represent the items/systems observed. Or, they could create decision boxes for teachers to use to reinforce the school’s behaviour rules and identify the positive and negative consequences of actions."
    ],
    "differentiation": [
     "Support: The actions in the decision boxes could be changed to ones that suit the abilities of the pupils and focus on helping pupils to gain an overall understanding of selection and decision making. Pupils could use sort the command in the algorithm support sheet and use these to create their flowchart algorithm.",
     "Stretch & challenge: Pupils could be challenged to write a more detailed algorithm that requires additional steps and to construct their own flowchart."
    ],
    "assessment": [
     "Informal assessment of pupils’ understanding and use of decision boxes.",
     "More formal assessment of pupils’ flowchart algorithms."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-conductors-3",
    "title": "Inputs",
    "pages": 14,
    "intro": "In this lesson, pupils are introduced to inputs using the MakeCode editor. They use an experimental (‘tinkering’) approach to discover a range of inputs on the BBC micro:bit and use their knowledge of selection to record their findings using decision boxes.",
    "materials": "",
    "objectives": [
     "To review outputs",
     "To understand what inputs are",
     "To use tinkering to find inputs on the BBC micro:bit",
     "To represent selection with inputs using decision boxes"
    ],
    "activities": [
     "Introduction: Introducing inputs (15 minutes)",
     "Exploring inputs (30 minutes)",
     "Reviewing inputs (15 minutes)",
     "Introduction: Introducing inputs  (15 minutes)",
     "Use slide 3 to review pupils’ understanding of outputs and to identify that the micro:bit’s LEDs are an example of an output.",
     "Show pupils the program written with the MakeCode editor on slide 4. Ask pupils to predict what output the micro:bit will show and how this can be changed. Click on the link to go to the MakeCode editor to test out pupils’ ideas (see slide notes for the answer).",
     "Ask pupils to predict in which menu the ‘on button A pressed’ block can be found and to explain why they think that. (It is in the Input menu, which is the same colour).",
     "Use slide 5 to introduce the term inputs and explore pupils’ understanding by asking them to identify everyday input example (volume buttons on TV, microphone on digital assistant, touch-screen on smartphone).",
     "Exploring inputs (30 minutes)",
     "Recap selection (slide 6) and invite ideas on how the program on slide 4 used selection. (When button A is pressed, the micro:bit displays a smiley face, if it is not pressed it will display a sad face). Lead pupils to identify that the image displayed is an output.",
     "Display slide 7 and ask pupils to identify what information needs to be placed in each part of the diagram to create the algorithm for the program. Discuss how the LED planner (slide 8) could be used to show the images that will be displayed.",
     "Explain to pupils that button A is one of several inputs on the micro:bit and they are going to tinker with the MakeCode editor to find out different inputs they can use to start programs.",
     "Explain that every time they find a way of starting the program with a new input, they should record it using the decision box recording sheet. Provide pupils with a number of copies of the decision box recording sheet and the LED planner (slides 12 and 13).",
     "Give pupils time to work in pairs using the MakeCode editor to explore different ways of starting programs with inputs and to record the selection involved. Explain to pupils that some of the inputs can only be used using the physical micro:bit itself. Exploring the additional inputs that required the use of the micro:bit hardware is suggested as a stretch and challenge task.",
     "Reviewing inputs (15 minutes)",
     "Recap pupils’ learning by inviting them to share what they have discovered about inputs.",
     "Invite pupils to use the MakeCode editor and the whole class display screen to modify the program used in the introductory activity to use a different input.",
     "For each input, ask other pupils to identify what the condition that is needed to be met is and what the outputs will be if the condition is/isn’t met.",
     "Revisit the learning objectives on slide 11 if you wish."
    ],
    "extension": [
     "Pupils could write a how to guide that explains the different ways of starting programs using the micro:bit’s inputs, or they could build on their learning from the volcanic eruption animation unit and modify their programs so that each stage of the animation in started by an input."
    ],
    "differentiation": [
     "Support: Pupils could be given a program with the blocks and the structure already selected from the menus. Pupils would swap the blocks over to test out different inputs. You can import the input support hex file into the MakeCode editor from the lesson downloads folder to support this.",
     "Stretch & challenge:",
     "Pupils could explore how to combine the different ways they found to start programs into one program - an example is included in the lesson downloads folder (extending inputs hex file). If you have access to physical micro:bits, pupils could explore additional inputs linked to the movement of the micro:bit (tilt left, logo down, etc.)."
    ],
    "assessment": [
     "Informal assessment of pupils’ understanding of inputs through class, group and paired discussion.",
     "More formal assessment of pupils’ use of decision boxes to represent inputs and selection."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-conductors-4",
    "title": "Making a conductivity tester",
    "pages": 14,
    "intro": "In this lesson, pupils build on their understanding of inputs by learning how to use the BBC micro:bit’s pins as inputs. They plan, write, test and debug MakeCode programs to use their micro:bits to test the electrical conductivity of materials before comparing this to the previous method they used. This lesson requires physical micro:bits.",
    "materials": "",
    "objectives": [
     "To plan, write, test and debug programs",
     "To write programs that use selection",
     "To write programs that use inputs and output"
    ],
    "activities": [
     "Introduction: Recapping inputs (10 minutes)",
     "Using pins (15 minutes)",
     "Creating electrical conductivity testers (25 minutes)",
     "Comparing conductivity tests (10 minutes)",
     "Introduction: Recapping inputs (10 minutes)",
     "Display slide 3 showing the phrase ‘the BBC micro:bit inputs’. Invite pupils to recap their understanding of inputs from the previous lesson.",
     "Use the link on slide 4 to open the ‘How do I show the output?’ program in the MakeCode editor and give pupils a copy of slide 4 and a copy of the LED planner (slide 13). Explain that they are going to predict the output micro:bit will show when certain inputs are used by representing the LEDs that will be turned on using the planner.",
     "Ask questions such as, ‘what will the micro:bit’s output be when I press button B?’ In response, pupils can use the program to identify the output, in this case a serious face, and represent it by selecting the LEDs that will be lit on the planner.",
     "Use the simulator to test pupils’ predictions. Repeat several times using a different input each time. It is suggested that a maximum of five questions should be asked as this will leave enough space to use the LED planner for another activity in this lesson.",
     "Using pins (15 minutes)",
     "Use slide 5 to explain to pupils that the micro:bit has 3 large pins number 0, 1 and 2 which can be used as inputs by connecting crocodile clips to one of them and the another crocodile clip to ground pin (GND).",
     "Display the program Pin-Inputs in the MakeCode editor (slide 6) and ask pupils to state what condition needs to be met and what output will be displayed when the condition is/isn’t met. Test pupils’ ideas using the simulator.",
     "Ask pupils to demonstrate how to download the program and transfer it to a micro:bit. Then, connect crocodile clips to pins 0 and GND and explain to pupils that this creates an electrical circuit. Demonstrate this by touching the crocodile clips together and observing the change in the output (the sad face should change to a happy face because pin 0 has been pressed).",
     "Remind pupils that to use the input again the restart button has to be pressed and locate this on the back of the micro:bit.",
     "Ask pupils to suggest another material that could be used to complete the circuit and change the input (an electrical conductor).",
     "Select a material that pupils identify as an electrical conductor and invite a pupil(s) to complete the circuit by attaching it between the crocodile clips. Again, highlight the change in output (it should be the same as above).",
     "Creating electrical conductivity testers (25 minutes)",
     "Use slide 7 to ask pupils to think/pair/share how the micro:bit can be used to test the electrical conductivity of materials.",
     "Discuss the program that pupils will need to write to achieve this. Identify that micro:bit will need to display one image if pin 0 is pressed (the material is an electrical conductor) and another image when it isn’t pressed (the material isn’t an electrical conductor).",
     "Give pairs of pupils a copy of the LED planner and the decision box recording sheet (slides 13 and 14) and ask them to plan their program by identifying the condition that needs to be met (which pin needs to be pressed) and the outputs (images) to be displayed when the input is/isn’t pressed (slide 8).",
     "Give out copies of the micro:bit testing sheet and time to plan, program and carry out their electrical conductivity test using their micro:bits. After using the same materials as in lesson one, encourage pupils to identify objects in the classroom that they can take the micro:bit to and test.",
     "Comparing conductivity tests (10 minutes)",
     "Ask pupils to identify the two ways they have tested the electrical conductivity of materials in this unit - using an electrical circuit and using the micro:bit (slide 9).",
     "Display slide 10 and invite pupils to explain what the terms pros and cons means. Ask pupils to discuss in their pairs the pros and cons of both ways of testing the electrical conductivity of materials (examples are included in the slide speaker notes).",
     "Discuss as a class and use the learning objectives on slide 11 to review pupils’ learning."
    ],
    "extension": [
     "Pupils could use the pros and cons identified for each way of testing the electrical conductivity of materials as the basis for producing a comparative text on the two methods."
    ],
    "differentiation": [
     "Support: Import file pin-support hex file into the MakeCode editor to provide pupils with the structure of the program in which they create the images to be shown when the pin is/isn’t pressed.",
     "Stretch & challenge: Pupils could be challenged to write a program that uses a different pin from pin 0 which is used in the lesson examples."
    ],
    "assessment": [
     "Informal assessment of pupils’ understanding of selection, inputs and outputs through class and group discussion.",
     "More formal assessment of pupils’ plans and programs."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-conductors-5",
    "title": "Review & reflection",
    "pages": 9,
    "intro": "In this final ‘unplugged’ lesson, pupils reflect on their learning during the unit and decompose the task of testing the electrical conductivity of materials using the BBC micro:bit. The pupils construct an algorithm to identify the steps they undertook in the aforementioned process then review their understanding of the terms inputs and outputs.",
    "materials": "",
    "objectives": [
     "To decompose a problem into smaller steps",
     "To write a flowchart algorithm that uses selection",
     "To know and identify inputs and outputs"
    ],
    "activities": [
     "Flowchart thinking map (10 minutes)",
     "Creating algorithms (40 minutes)",
     "Reviewing learning (10 minutes)",
     "Introduction: Flowchart thinking map (10 minutes)",
     "Show pupils an example of a flowchart algorithm they created in lesson two. Ask pupils to identify what is meant by the term algorithm: a set of sequenced instructions, steps or rules for a human to follow to allow them to complete a task or solve a problem (slide 3).",
     "Use slide 4 to display the start of a thinking map about flowchart algorithms. Give pupils a copy of the same slide and ask them to work with a partner to note down what they know about flowchart algorithms.",
     "Once pupils have had sufficient time to add to their thinking map, share ideas as a class.",
     "Creating algorithms (40 minutes)",
     "Use slide 5 to explain to pupils that they are going to write a flowchart algorithm that instructs someone else how to plan, program and use the micro:bit to test if materials are electrical conductors.",
     "Explain that they are going to use decomposition to help them identify all the steps they undertook to test materials using the micro:bit. Recall what is meant by the term decomposition (see speaker notes).",
     "Give out large sheets of paper and ask pupils to work with a partner to record all the steps completed in the process. Collect ideas from the pupils and add to a class copy that can be displayed during pupils’ independent work. Once all ideas have been added, invite suggestions on how the tasks can be sequenced.",
     "Give pupils time to work with a partner to construct a flowchart algorithm to give step by step instructions on how to use the micro:bit to test the electrical conductivity of materials. (An example of what this could look like is on slide 8.)",
     "Reviewing learning (10 minutes)",
     "Display slide 6 and discuss how to use the Venn diagram. Ask pupils to recall what the terms input and output mean.",
     "Starting with their experiences in the unit (creating electrical circuits, tinkering with the micro:bit, testing the electrical conductivity of materials) ask pupils to suggest items that can be added to the input, output and the overlap section.",
     "Ask pupils to think about their own devices and identify further options. If pupils struggle to identify an example of both ask them to think of a tablet screen and identify if this is an input or an output (The  screen is both an input and output as touching the screen makes something happen the results of which are viewed on the screen)."
    ],
    "extension": [
     "Pupils could produce a poster explaining what inputs and outputs and giving examples of both. They could write a blog post, or record a video to show how they have used their micro:bit as electrical conductor testers."
    ],
    "differentiation": [
     "Support: Pupils can construct the algorithm as a shared writing task led by an adult, or be given starting points for the steps they took.",
     "Stretch & challenge: Pupils can be challenged to write a more detailed algorithm which could include more than once decision box."
    ],
    "assessment": [
     "Informal assessment of pupils’ understanding of inputs and outputs through whole class discussion.",
     "More formal assessment of pupils’ flowchart algorithms."
    ]
   }
  ]
 },
 {
  "slug": "energy",
  "title": "Energy awareness",
  "emoji": "🔋",
  "order": 8,
  "description": "A unit of 4, 5 or 6 lessons exploring energy use around us. Students learn how we can monitor our use of energy and use this to make decisions about how we can save energy, save money and have a positive impact on climate change. Students use micro:bits to monitor electric light use, learn about how to collect good data and present it in order to help inform decisions about changing behaviours.",
  "skills": [
   "13 Climate",
   "Input/output",
   "Sensors",
   "Variables",
   "Data handling",
   "Energy"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-energy-1",
    "title": "Energy around us",
    "pages": 10,
    "intro": "Students relate the UN Global Goals on Climate action to the use of energy in their school or home and start planning where to use the micro:bit to collect data about electric light usage.",
    "materials": "Downloadable resources:, Lesson slides, Other resources:, Paper - writing (optional), pens (optional), Introduction to the Global Goals, If you wish, recap or introduce the UN Global Goals and Goal 13: Climate Action. You may want to use the introduction videos and activities on Introducing the Global Goals and Climate action (slides 3 & 4)., Exploring - 'learning is the first step to doing', Discuss with students the key message of the second video: ‘learning is the first step to doing’. Key points:, Climate change includes:, the global warming driven by human emissions of greenhouse gases, and the resulting shifts in weather patterns., Although the climate has changed at other times in the Earth’s history, this is the first time humans have caused it to change., Many sources of energy have an impact on climate change by putting CO2 into the atmosphere., Invite students to consider (individually, then in pairs or small groups):, How can we make a contribution to combating climate change by becoming more aware about our energy use?, How might we be able to use data to drive changes in behaviour?, Guide students to consider the types of energy used in everyday life: heating, air conditioning, lighting, cooking, petrol in cars. Students may have ‘smart’ energy meters at home or their parents may have used buses or cars powered by electricity or alternative fuels. (Slide 5), Energy use around us, Introduce the idea that the micro:bit has sensors for temperature, light and magnetism, all of which could be used to monitor energy use. Explain that in following lessons students will be making light sensors to monitor energy use. (Slide 6), Planning to monitor energy usage for lighting, Invite students to consider and plan in pairs or small groups how they might be able to monitor energy use in our schools or homes. Guide them to understand that if we know where energy is being used, and have data to support it, we can take steps to reduce energy usage, saving CO2 emissions and also save money. For example, with data collection we might discover:, Which places use the most energy., When energy is most used. Are there patterns of behaviour you could discover, for example is lighting left on at night or at weekends?, Does it make a difference what kind of lighting is used? Light bulbs are rated in Watts - the more Watts, the more energy they use. More efficient kinds of lighting generate more light and less heat. LED lighting uses less electricity than fluorescent lighting which uses less energy than incandescent lighting. (Slide 7), Planning micro:bit placement, Depending on the number of micro:bits and battery packs available to you, ask students to work in their groups to plan how to monitor lighting in several places: individual lights in a classroom, different rooms, storage areas or large cupboards. Guide students to consider where they will get good data: away from daylight / windows / people getting between the sensor and the light source. Questions include:, Is daylight, sunrise or sunset a factor? Is it winter or summer? We want the timer to be triggered by electric lighting, not light coming in from windows., Would people moving around the room affect readings?, How do these factors affect where we place our data recorders?, If the ceilings are high, it may be difficult to place sensors near light sources, how can we mitigate that? e.g. make cardboard shields for micro:bit to reduce light from windows, place micro:bits away from windows, place in windowless cupboards or storage areas., Ask students to draw maps of their classroom, school or home and annotate these to suggest good locations to place light energy monitors. (Slide 8), Review, Invite students to present their maps and discuss similarities and differences amongst the groups., Re-cap the learning objectives and look forward to the next lesson where students will take sample light readings in their chosen locations to calibrate a micro:bit light timer. (Slide 9)",
    "objectives": [
     "Understand what UN Global Goal 13 (climate action) is and why it’s relevant to us",
     "Understand how our energy use can have an impact on climate change",
     "To consider and plan how we might monitor our energy use at home or at school and how awareness can drive changes in behaviour."
    ],
    "activities": [
     "Downloadable resources:",
     "Other resources:",
     "Paper - writing (optional), pens (optional)",
     "Introduction to the Global Goals",
     "If you wish, recap or introduce the UN Global Goals and Goal 13: Climate Action. You may want to use the introduction videos and activities on Introducing the Global Goals and Climate action (slides 3 & 4).",
     "Exploring - 'learning is the first step to doing'",
     "Discuss with students the key message of the second video: ‘learning is the first step to doing’. Key points:",
     "Climate change includes:",
     "the global warming driven by human emissions of greenhouse gases",
     "and the resulting shifts in weather patterns.",
     "Although the climate has changed at other times in the Earth’s history, this is the first time humans have caused it to change.",
     "Many sources of energy have an impact on climate change by putting CO2 into the atmosphere.",
     "Invite students to consider (individually, then in pairs or small groups):",
     "How can we make a contribution to combating climate change by becoming more aware about our energy use?",
     "How might we be able to use data to drive changes in behaviour?",
     "Guide students to consider the types of energy used in everyday life: heating, air conditioning, lighting, cooking, petrol in cars. Students may have ‘smart’ energy meters at home or their parents may have used buses or cars powered by electricity or alternative fuels. (Slide 5)",
     "Energy use around us",
     "Introduce the idea that the micro:bit has sensors for temperature, light and magnetism, all of which could be used to monitor energy use. Explain that in following lessons students will be making light sensors to monitor energy use. (Slide 6)",
     "Planning to monitor energy usage for lighting",
     "Invite students to consider and plan in pairs or small groups how they might be able to monitor energy use in our schools or homes. Guide them to understand that if we know where energy is being used, and have data to support it, we can take steps to reduce energy usage, saving CO2 emissions and also save money. For example, with data collection we might discover:",
     "Which places use the most energy.",
     "When energy is most used. Are there patterns of behaviour you could discover, for example is lighting left on at night or at weekends?",
     "Does it make a difference what kind of lighting is used? Light bulbs are rated in Watts - the more Watts, the more energy they use. More efficient kinds of lighting generate more light and less heat. LED lighting uses less electricity than fluorescent lighting which uses less energy than incandescent lighting. (Slide 7)",
     "Planning micro:bit placement",
     "Depending on the number of micro:bits and battery packs available to you, ask students to work in their groups to plan how to monitor lighting in several places: individual lights in a classroom, different rooms, storage areas or large cupboards. Guide students to consider where they will get good data: away from daylight / windows / people getting between the sensor and the light source. Questions include:",
     "Is daylight, sunrise or sunset a factor? Is it winter or summer? We want the timer to be triggered by electric lighting, not light coming in from windows.",
     "Would people moving around the room affect readings?",
     "How do these factors affect where we place our data recorders?",
     "If the ceilings are high, it may be difficult to place sensors near light sources, how can we mitigate that? e.g. make cardboard shields for micro:bit to reduce light from windows, place micro:bits away from windows, place in windowless cupboards or storage areas.",
     "Ask students to draw maps of their classroom, school or home and annotate these to suggest good locations to place light energy monitors. (Slide 8)",
     "Review",
     "Invite students to present their maps and discuss similarities and differences amongst the groups.",
     "Re-cap the learning objectives and look forward to the next lesson where students will take sample light readings in their chosen locations to calibrate a micro:bit light timer. (Slide 9)"
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students could be provided with ready printed maps along with a printed version of the questions they are asked to consider.",
     "Place students in supportive pairs or groups and encourage them to record everyone’s ideas.",
     "Students could present their ideas in ways other than a written plan (e.g. a video)",
     "Stretch & challenge",
     "Students could consider measuring heat and electricity use using magnetism. For example the https://energyinschools.co.uk/  project uses micro:bits as sensors for heat and electromagnetic fields generated by electrical cables to monitor energy use.",
     "Students could also plan how you could use the micro:bit's temperature sensor and compass (magnetometer) to measure other kinds of energy use.",
     "They could also make use of the micro:bit's radio function to collect data remotely."
    ],
    "assessment": [
     "Informal assessment of students’ plans.",
     "Do they show understanding and application of the task?",
     "Have they chosen and justified accessible locations where lighting is switched on and off at different times and hence could be measured?"
    ]
   },
   {
    "n": 2,
    "slug": "mbu-energy-2",
    "title": "Energy data planning",
    "pages": 11,
    "intro": "",
    "materials": "Downloadable resources:, Student handouts, Lesson slides, Lesson plan, HEX files, Other resources:, micro:bits, micro:bit battery packs, student work from previous lesson, paper - writing (optional), pens (optional), spreadsheet (optional), Review and introduction, Invite students to share their best ideas from the previous activity to recap how they can monitor electric light usage around our school or homes., Discuss practical considerations and reach consensus about the best places to place a light data logger., Explain that in the next lesson they will be making a timer to measure how long lighting is switched on for., Discuss that firstly, they will need to make a light meter to take readings of the light level to find out how much light is measured when the lights are on or off. They will then use this to decide which locations allow reliable collection of data and calibrate the timer (which will be made next lesson). Highlight the need to take accurate baseline light readings when the lights are on and off in order to calibrate the timer (slide 3)., Make a light meter, Ask students to make predictions about what the program below does (MakeCode blocks or Python text code). If you open the code in the MakeCode editor, you can use the simulator and ask a student to demonstrate changing light levels and what happens when you press the buttons. (Slide 4), Downloaded program files:, energy-awareness-2-makecode.hex, energy-awareness-2-python.hex, The key concepts (slide 5) are:, it uses a variable called reading to store the light level recorded by the micro:bit's built-in light sensor input, which is in the LED display, it takes a new light level reading when you press button A and stores it in the reading variable, the light level reading is shown on the micro:bit's LED display output when you press button B, You can optionally show the video from the Energy light meter Make it: code it project to help explain the program and how to use it: https://youtu.be/1UJXPZrxPh0 (Slide 6), Test the light meter, Invite students to test out the light meter by flashing the code on to micro:bits. Use either the downloaded HEX file or flash it from the MakeCode or Python editors., Using the instructions below (slide 7), ask students to take test readings at their desks with the micro:bit uncovered then covered with paper or a book to simulate lights being turned on and off., Remind them the light sensor is built into the LED display, so you need the micro:bit's front to be pointing towards the light source., Place your micro:bit where you want to take the light reading, cover it over or turn the lights off and press button A., Uncover it and button B to see the light reading. This will be a number between 0 and 255., You can press B again if you're not sure of the reading., To record another reading with the lights on (or with it uncovered) press button A again and then press button B to see the number., You should see a consistent difference between the values - lower numbers when the lights are off or micro:bit is covered and higher values when the lights are on and the micro:bit is uncovered., Use the light meter, Recap with students the different areas chosen to take light readings., Ask students to attach battery packs to their micro:bits and use the light meter take at least 3 readings in these areas. Highlight that for the readings to be useful, they need the difference between when the lights are on and off to be as large as possible., If possible, you, or your students could also gather information about the wattage and type of lighting used in each location, which will be useful in lesson 5 on measuring energy usage., Encourage as many readings as possible in each area. Students could collate and calculate averages from their own or class results using paper or the sample spreadsheet provided. (Slide 8), Review, If you wish, recap the learning objectives. (Slide 9), Invite students to share and explain:, their views on the best locations for recording light usage data and why their choices will allow the most reliable collection of data., Whether they encountered any problems and how they approached and overcame them, What they would change were they to do this again (slide 10)",
    "objectives": [
     "Understand the importance of planning when collecting data to ensure it is reliable",
     "Program a micro:bit to take measurements of environmental data (a light meter to measure light levels)",
     "Understand the importance of baseline measurements and calibration when collecting data"
    ],
    "activities": [
     "Downloadable resources:",
     "Student handouts",
     "HEX files",
     "Other resources:",
     "micro:bits, micro:bit battery packs, student work from previous lesson, paper - writing (optional), pens (optional), spreadsheet (optional)",
     "Review and introduction",
     "Invite students to share their best ideas from the previous activity to recap how they can monitor electric light usage around our school or homes.",
     "Discuss practical considerations and reach consensus about the best places to place a light data logger.",
     "Explain that in the next lesson they will be making a timer to measure how long lighting is switched on for.",
     "Discuss that firstly, they will need to make a light meter to take readings of the light level to find out how much light is measured when the lights are on or off. They will then use this to decide which locations allow reliable collection of data and calibrate the timer (which will be made next lesson). Highlight the need to take accurate baseline light readings when the lights are on and off in order to calibrate the timer (slide 3).",
     "Make a light meter",
     "Ask students to make predictions about what the program below does (MakeCode blocks or Python text code). If you open the code in the MakeCode editor, you can use the simulator and ask a student to demonstrate changing light levels and what happens when you press the buttons. (Slide 4)",
     "Downloaded program files:",
     "energy-awareness-2-makecode.hex",
     "energy-awareness-2-python.hex",
     "The key concepts (slide 5) are:",
     "it uses a variable called reading to store the light level recorded by the micro:bit's built-in light sensor input, which is in the LED display",
     "it takes a new light level reading when you press button A and stores it in the reading variable",
     "the light level reading is shown on the micro:bit's LED display output when you press button B",
     "You can optionally show the video from the Energy light meter Make it: code it project to help explain the program and how to use it: https://youtu.be/1UJXPZrxPh0 (Slide 6)",
     "Test the light meter",
     "Invite students to test out the light meter by flashing the code on to micro:bits. Use either the downloaded HEX file or flash it from the MakeCode or Python editors.",
     "Using the instructions below (slide 7), ask students to take test readings at their desks with the micro:bit uncovered then covered with paper or a book to simulate lights being turned on and off.",
     "Remind them the light sensor is built into the LED display, so you need the micro:bit's front to be pointing towards the light source.",
     "Place your micro:bit where you want to take the light reading, cover it over or turn the lights off and press button A.",
     "Uncover it and button B to see the light reading. This will be a number between 0 and 255.",
     "You can press B again if you're not sure of the reading.",
     "To record another reading with the lights on (or with it uncovered) press button A again and then press button B to see the number.",
     "You should see a consistent difference between the values - lower numbers when the lights are off or micro:bit is covered and higher values when the lights are on and the micro:bit is uncovered.",
     "Use the light meter",
     "Recap with students the different areas chosen to take light readings.",
     "Ask students to attach battery packs to their micro:bits and use the light meter take at least 3 readings in these areas. Highlight that for the readings to be useful, they need the difference between when the lights are on and off to be as large as possible.",
     "If possible, you, or your students could also gather information about the wattage and type of lighting used in each location, which will be useful in lesson 5 on measuring energy usage.",
     "Encourage as many readings as possible in each area. Students could collate and calculate averages from their own or class results using paper or the sample spreadsheet provided. (Slide 8)",
     "Review",
     "If you wish, recap the learning objectives. (Slide 9)",
     "Invite students to share and explain:",
     "their views on the best locations for recording light usage data and why their choices will allow the most reliable collection of data.",
     "Whether they encountered any problems and how they approached and overcame them",
     "What they would change were they to do this again (slide 10)"
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students could work in pairs or small groups to record and collate data together.",
     "Students could use the spreadsheet on a laptop or tablet to record their data, or use a voice recorder.",
     "Stretch & challenge",
     "Students could use Python instead of MakeCode blocks",
     "They could collect more data in more locations, justifying their decisions.",
     "Students could make improvements to the light meter code, for example calculating the average of multiple readings on the micro:bit itself"
    ],
    "assessment": [
     "Informal assessment of students' approach and data collection. E.g.:",
     "Did the students record more than one reading in each location?",
     "Were the values consistent?",
     "Did they correctly calculate average readings for a given location? If not, did they take steps to account for this or fix it?",
     "Have students collectively found at least one good location to record light usage data next time?"
    ]
   },
   {
    "n": 3,
    "slug": "mbu-energy-3",
    "title": "Energy data collecting",
    "pages": 8,
    "intro": "",
    "materials": "Downloadable resources:, Lesson slides, Lesson plan, HEX files, Other resources:, micro:bits, micro:bit battery packs, student work from previous lesson, Recap and introduction, Recap the calibration readings gathered in the last lesson for each area you’re going to monitor. What did students decide about which locations might allow reliable collection of data, and why? (Slide 3), Make and test a micro:bit light timer, Introduce the energy light timer project in MakeCode blocks or Python (slide 4)., Downloaded program files:, energy-awareness-3-makecode.hex, energy-awareness-3-python.hex, Explain students will need to use the data gathered in the last lesson to calibrate the timer for their chosen locations., Highlight that although the code looks complex, they only need to modify one block. Model this process, using the instructions below (slide 4) before asking students to modify their own code and flash it onto their micro:bits., Use data gathered using the light meter in the previous lesson: light readings when the lights in your chosen location are on and off., Put your light on reading into the code where the LIGHT variable is set, replacing the number 100., Attach a battery pack and place your micro:bit under the light you want to monitor. You should see a dot on the display when the light is off, and the display lights up when your light is on. If this doesn't work, consider using the Light meter project from lesson 2 again to find the light level when the light is on, or move the micro:bit., The micro:bit will keep timing and when you press button B it will show how long the light has been switched on in minutes., Depending on the number of students and locations, you may wish to assign different locations to students for this testing process., Optionally show the video from the Energy light timer Make it: code it project to explain how to set up and use the light timer: https://youtu.be/kc31WZ80Rxw (Slide 5)., Collect data, Once testing has been successful, ask students to reset the time variable by pressing the reset button on the back of the micro:bit(s)., Invite them to then place them in their chosen locations and leave them for an agreed longer period of time, e.g. over a day, overnight or even over a weekend., Once the time has lapsed, retrieve the light timers and gather the data for later analysis in lesson 4. (Slide 6), Review, Invite students to recap to each other what they modified in the code and why. Ask them to share any issues they had in the testing stage and how they overcame them., Discuss what students expect to discover from the data., If you wish, review the learning objectives (slide 7).",
    "objectives": [
     "To calibrate and deploy a data logger (micro:bit light timer)",
     "To collect environmental data (light usage) over time"
    ],
    "activities": [
     "Downloadable resources:",
     "HEX files",
     "Other resources:",
     "micro:bits, micro:bit battery packs, student work from previous lesson",
     "Recap and introduction",
     "Recap the calibration readings gathered in the last lesson for each area you’re going to monitor. What did students decide about which locations might allow reliable collection of data, and why? (Slide 3)",
     "Make and test a micro:bit light timer",
     "Introduce the energy light timer project in MakeCode blocks or Python (slide 4).",
     "Downloaded program files:",
     "energy-awareness-3-makecode.hex",
     "energy-awareness-3-python.hex",
     "Explain students will need to use the data gathered in the last lesson to calibrate the timer for their chosen locations.",
     "Highlight that although the code looks complex, they only need to modify one block. Model this process, using the instructions below (slide 4) before asking students to modify their own code and flash it onto their micro:bits.",
     "Use data gathered using the light meter in the previous lesson: light readings when the lights in your chosen location are on and off.",
     "Put your light on reading into the code where the LIGHT variable is set, replacing the number 100.",
     "Attach a battery pack and place your micro:bit under the light you want to monitor. You should see a dot on the display when the light is off, and the display lights up when your light is on. If this doesn't work, consider using the Light meter project from lesson 2 again to find the light level when the light is on, or move the micro:bit.",
     "The micro:bit will keep timing and when you press button B it will show how long the light has been switched on in minutes.",
     "Depending on the number of students and locations, you may wish to assign different locations to students for this testing process.",
     "Optionally show the video from the Energy light timer Make it: code it project to explain how to set up and use the light timer: https://youtu.be/kc31WZ80Rxw (Slide 5).",
     "Collect data",
     "Once testing has been successful, ask students to reset the time variable by pressing the reset button on the back of the micro:bit(s).",
     "Invite them to then place them in their chosen locations and leave them for an agreed longer period of time, e.g. over a day, overnight or even over a weekend.",
     "Once the time has lapsed, retrieve the light timers and gather the data for later analysis in lesson 4. (Slide 6)",
     "Review",
     "Invite students to recap to each other what they modified in the code and why. Ask them to share any issues they had in the testing stage and how they overcame them.",
     "Discuss what students expect to discover from the data.",
     "If you wish, review the learning objectives (slide 7)."
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students may require additional assistance, from a teacher or a partner, to modify the code and test the timer.",
     "Stretch & challenge",
     "Students could explore how the code works in greater depth, in particular the role played by the hysteresis variable which makes sure the timer is only turned on or off.",
     "They could use the micro:bit's radio function to collect timing data remotely.",
     "Students could use Python instead of MakeCode blocks and adapt the Python timer to use non-volatile storage to record timings and retain them even when the battery packs are removed, such as in the Max-min temperature logger."
    ],
    "assessment": [
     "Informal and observational assessment of students' work during the task. E.g.:",
     "Was the code modified to match the data recorded in the previous lesson effectively?",
     "Was the code flashed on to the micro:bits successfully and any problems worked through systematically?",
     "Were the micro:bits deployed in the correct locations successfully?",
     "Were students able to explain what they modified and why and what they expect to discover from their data collection?"
    ]
   },
   {
    "n": 4,
    "slug": "mbu-energy-4",
    "title": "Energy data processing",
    "pages": 8,
    "intro": "Students collate, process and analyse light usage data. They plot simple charts to help them to visualise data, spot patterns and suggest solutions to modify behaviour and save energy.",
    "materials": "Downloadable resources:, Student handouts, Lesson slides, Lesson plan, Other resources:, Student work from previous lesson, spreadsheet (optional), Introduction, Prior to the lesson you should have gathered timings of how long a light was left switched on in at least one location over a period of time. If you do not have this, you can use the example data given., Recap the data gathered in previous lessons about how much energy has been used by lighting in a particular area(s)., Collate data, Share the raw numerical data as you have collected with all the students (e.g. timings from different locations for multiple time periods, or readings from a single timer). If you do not have this, you can use the example data., Ask students to work in pairs or small groups to collate the data in spreadsheets or in a written table, and plot simple column or bar charts of the data (slides 3 and 4)., Analyse data, Invite groups to consider what the data shows and to draw possible conclusions from it (slide 5). Discuss their findings as a class. Examples could include:, Do some locations use more electric light that others? E.g in the example, usually the classroom uses more electricity than the cupboard, Compare different days: can you spot any patterns?, Look for anomalies: in the example the huge number for the cupboard at the weekend and larger number on Monday could suggest someone left the light on before going home on Friday and it wasn’t spotted until Monday, You might expect to see higher numbers in the Sat/Sun column as it accounts for two days, but the school may be empty which may mean the numbers should be lower., Discuss the impact of this on cost and energy use and highlight the need to help people turn off lights to use less electricity and save money., Propose solutions, Invite students in their groups, or individually, to write suggestions for how they might encourage people to change their behaviour to save energy and money on lighting based on analysis of the data (slide 6). Examples could include:, raise awareness in the school of energy use on lighting, have student monitors to check lights are turned off at the end of the day, put signs up by light switches, create a visual or audible alarm using a micro:bit to show when lights have been on for too long - you could use radio to send a message from a micro:bit in a cupboard to one in the classroom, ask people to consider if lights are really needed, eg on sunny days, Discuss which of their suggestions are most likely to be effective and why they think this is. What barriers do they think there are to people changing their behaviour?, Review, Recap the learning objectives and discuss with students their views on how the data collected has helped them to draw conclusions about energy use and make suggestions for modifying behaviour and saving money., Invite them to consider other areas of energy use they could apply these skills to (slide 7).",
    "objectives": [
     "Collate and process numerical data",
     "Present numerical data in visual form",
     "Analyse data and make inferences from it about energy use",
     "Use these inferences to make proposals to modify behaviour to save energy"
    ],
    "activities": [
     "Downloadable resources:",
     "Student handouts",
     "Other resources:",
     "Student work from previous lesson, spreadsheet (optional)",
     "Introduction",
     "Prior to the lesson you should have gathered timings of how long a light was left switched on in at least one location over a period of time. If you do not have this, you can use the example data given.",
     "Recap the data gathered in previous lessons about how much energy has been used by lighting in a particular area(s).",
     "Collate data",
     "Share the raw numerical data as you have collected with all the students (e.g. timings from different locations for multiple time periods, or readings from a single timer). If you do not have this, you can use the example data.",
     "Ask students to work in pairs or small groups to collate the data in spreadsheets or in a written table, and plot simple column or bar charts of the data (slides 3 and 4).",
     "Analyse data",
     "Invite groups to consider what the data shows and to draw possible conclusions from it (slide 5). Discuss their findings as a class. Examples could include:",
     "Do some locations use more electric light that others? E.g in the example, usually the classroom uses more electricity than the cupboard",
     "Compare different days: can you spot any patterns?",
     "Look for anomalies: in the example the huge number for the cupboard at the weekend and larger number on Monday could suggest someone left the light on before going home on Friday and it wasn’t spotted until Monday",
     "You might expect to see higher numbers in the Sat/Sun column as it accounts for two days, but the school may be empty which may mean the numbers should be lower.",
     "Discuss the impact of this on cost and energy use and highlight the need to help people turn off lights to use less electricity and save money.",
     "Propose solutions",
     "Invite students in their groups, or individually, to write suggestions for how they might encourage people to change their behaviour to save energy and money on lighting based on analysis of the data (slide 6). Examples could include:",
     "raise awareness in the school of energy use on lighting",
     "have student monitors to check lights are turned off at the end of the day",
     "put signs up by light switches",
     "create a visual or audible alarm using a micro:bit to show when lights have been on for too long - you could use radio to send a message from a micro:bit in a cupboard to one in the classroom",
     "ask people to consider if lights are really needed, eg on sunny days",
     "Discuss which of their suggestions are most likely to be effective and why they think this is. What barriers do they think there are to people changing their behaviour?",
     "Review",
     "Recap the learning objectives and discuss with students their views on how the data collected has helped them to draw conclusions about energy use and make suggestions for modifying behaviour and saving money.",
     "Invite them to consider other areas of energy use they could apply these skills to (slide 7)."
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students may benefit from supportive groupings where they are able to use their strengths in the group task.",
     "You could provide partially completed spreadsheets or a blank framework to fill in and students could record their solutions on a whiteboard or voice recorder.",
     "Stretch & challenge",
     "Students could consider and present suggestions for making the data more reliable, for example",
     "Take readings over a longer period of time",
     "Deploy more micro:bit timers to measure data in more locations",
     "Deploy more than 1 micro:bit timer in each location and compare data or take an average"
    ],
    "assessment": [
     "Informal, or more formal, assessment of spreadsheets and written work:",
     "Has the data been captured and recorded accurately?",
     "Are charts clear and correctly labelled?",
     "Has data been analysed to draw sensible conclusions?",
     "Have practical proposals been made based on the data collected to modify behaviour and reduce energy use?"
    ]
   },
   {
    "n": 5,
    "slug": "mbu-energy-5",
    "title": "Energy use calculations",
    "pages": 11,
    "intro": "Recap the previous lessons' work around how long electric lights were left on. Invite students to make suggestions about how people could be encouraged to save energy used by lighting. Calculate energy use Explain that some kinds of lighting use more energy than others. Highlight that in order to encourage people to change their behaviour, it would be useful to know not just how long lighting is left on for, but how much energy is being used and the cost. Invite students to consider why this information may be more likely to contribute to behaviour change (people could save money). Optionally show the video from the Energy cost calculation Make it: code it project to explain how to calculate energy costs from power and time data (slide 3): https://youtu.be/uuADvz5X3h4 Ask students what needs to be known in order to calculate how much energy has been used (slide 4): how long the energy source was in use (time, measured in minutes or hours) the power rating of the light source (measured in Watts). The wattage is often written on the light bulbs themselves, but may be hard to read so help may be required. we can then work out how much electricity was used in kWh (kilowatt hours) kWh = watts ÷ 1000 × minutes ÷ 60 Ask students to calculate on paper or modify their spreadsheet/table used in lesson 4 to calculate the amount of energy used. They should use the information about wattage gathered in lesson 2 and the time data gathered in lessons 3 and 4. See below and the example spreadsheet 5a in the download bundle. In this example the classroom has 8 fluorescent lights operated by the same switch, each rated at 40w, making 320w in total. The amount of energy used is calculated in cell C5 by multiplying the wattage by the time. The formula used is =320/1000*B5/60 320 is divided by 1000 to convert watts to kilowatts. Cell B5 contains the time in minutes, which is divided by 60 to convert minutes to hours. kW multiplied by hours = kWh (slide 5). (If needed, you can explain that we don’t need brackets in that spreadsheet formula as division takes precedence over multiplication in the order of operations - sometimes referred to as BIDMAS or BODMAS) The formula can be copied to other cells - for example the formula in C6 reads =320/1000*B6/60 The totals and average energy usage are then calculated depending on the data (slide 6). Calculate energy cost To calculate the cost of the energy used, we need to know the unit cost of electricity. This is how much the electricity company charges for each kWh. If you don’t know what your school pays, students could research this online and see what different energy providers charge, and whether the source of energy is from sustainable sources (e.g wind/solar). Students can either calculate this on paper or modify their spreadsheet as below to look like spreadsheet 5b in the download bundle: In this example the unit cost of electricity is in cell B3. The formula to calculate Monday’s cost is in cell D5: =C5*$B$3 This formula multiplies the energy used in kWh by the unit cost. The $ is used in the unit cost cell (B3) so this remains the same when copying the formula down to the rows below (slide 7). The weekly cost is calculated in cell D13: =SUM(D5:D10)/100 This divides the sum of the daily cost in pence by 100 to convert to pounds and the cell is formatted to currency to show the pound sign (slide 8). Analysing costs Invite students to share their cost of lighting calculations. (Slide 9) The cost of lighting they have calculated may seem small, so invite them to consider: the cost over a year the cost across a whole school depending on your location, if the data was collected when there are more hours of daylight, whether the costs may be higher at other times of the year (e.g. in winter) Review Ask students to summarise what they can conclude about their findings and note down what they would recommend for the school. For example: How much energy/money could be saved in a year by changing behaviour? For example by not leaving lights on overnight or at the weekend. How much energy/money could be saved in a year by using low energy lighting, for example LED lighting? How much money could be saved in a year by finding a cheaper electricity supplier?",
    "materials": "Downloadable resources:, Lesson slides, Lesson plan, Student handouts, Spreadsheet 5a - energy use in kWh, Spreadsheet 5b - energy cost, Other resources:, Student work from previous lesson, spreadsheet (optional)",
    "objectives": [
     "Calculate the amount of energy used in kWh given the time and power consumed by electric lighting",
     "Calculate the cost of energy used from previously recorded data"
    ],
    "activities": [
     "Downloadable resources:",
     "Student handouts",
     "Spreadsheet 5a - energy use in kWh",
     "Spreadsheet 5b - energy cost",
     "Other resources:",
     "Student work from previous lesson, spreadsheet (optional)",
     "Introduction",
     "Recap the previous lessons' work around how long electric lights were left on. Invite students to make suggestions about how people could be encouraged to save energy used by lighting.",
     "Calculate energy use",
     "Explain that some kinds of lighting use more energy than others. Highlight that in order to encourage people to change their behaviour, it would be useful to know not just how long lighting is left on for, but how much energy is being used and the cost. Invite students to consider why this information may be more likely to contribute to behaviour change (people could save money).",
     "Optionally show the video from the Energy cost calculation Make it: code it project to explain how to calculate energy costs from power and time data (slide 3): https://youtu.be/uuADvz5X3h4",
     "Ask students what needs to be known in order to calculate how much energy has been used (slide 4):",
     "how long the energy source was in use (time, measured in minutes or hours)",
     "the power rating of the light source (measured in Watts). The wattage is often written on the light bulbs themselves, but may be hard to read so help may be required.",
     "we can then work out how much electricity was used in kWh (kilowatt hours)",
     "kWh = watts ÷ 1000 × minutes ÷ 60",
     "Ask students to calculate on paper or modify their spreadsheet/table used in lesson 4 to calculate the amount of energy used. They should use the information about wattage gathered in lesson 2 and the time data gathered in lessons 3 and 4. See below and the example spreadsheet 5a in the download bundle.",
     "In this example the classroom has 8 fluorescent lights operated by the same switch, each rated at 40w, making 320w in total.",
     "The amount of energy used is calculated in cell C5 by multiplying the wattage by the time.",
     "The formula used is =320/1000*B5/60",
     "320 is divided by 1000 to convert watts to kilowatts.",
     "Cell B5 contains the time in minutes, which is divided by 60 to convert minutes to hours.",
     "kW multiplied by hours = kWh (slide 5).",
     "(If needed, you can explain that we don’t need brackets in that spreadsheet formula as division takes precedence over multiplication in the order of operations - sometimes referred to as BIDMAS or BODMAS)",
     "The formula can be copied to other cells - for example the formula in C6 reads =320/1000*B6/60",
     "The totals and average energy usage are then calculated depending on the data (slide 6).",
     "Calculate energy cost",
     "To calculate the cost of the energy used, we need to know the unit cost of electricity. This is how much the electricity company charges for each kWh. If you don’t know what your school pays, students could research this online and see what different energy providers charge, and whether the source of energy is from sustainable sources (e.g wind/solar).",
     "Students can either calculate this on paper or modify their spreadsheet as below to look like spreadsheet 5b in the download bundle:",
     "In this example the unit cost of electricity is in cell B3.",
     "The formula to calculate Monday’s cost is in cell D5: =C5*$B$3",
     "This formula multiplies the energy used in kWh by the unit cost. The $ is used in the unit cost cell (B3) so this remains the same when copying the formula down to the rows below (slide 7).",
     "The weekly cost is calculated in cell D13: =SUM(D5:D10)/100",
     "This divides the sum of the daily cost in pence by 100 to convert to pounds and the cell is formatted to currency to show the pound sign (slide 8).",
     "Analysing costs",
     "Invite students to share their cost of lighting calculations. (Slide 9)",
     "The cost of lighting they have calculated may seem small, so invite them to consider:",
     "the cost over a year",
     "the cost across a whole school",
     "depending on your location, if the data was collected when there are more hours of daylight, whether the costs may be higher at other times of the year (e.g. in winter)",
     "Review",
     "Ask students to summarise what they can conclude about their findings and note down what they would recommend for the school. For example:",
     "How much energy/money could be saved in a year by changing behaviour? For example by not leaving lights on overnight or at the weekend.",
     "How much energy/money could be saved in a year by using low energy lighting, for example LED lighting?",
     "How much money could be saved in a year by finding a cheaper electricity supplier?"
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students could work in carefully selected pairs or in supportive groups.",
     "You could provide students with partially completed spreadsheets with formulas or a blank framework to fill in.",
     "Stretch & challenge",
     "Students could find and use an online carbon footprint calculator to add data about how much CO2 is being generated by lighting in school (assuming the energy is not from sustainable sources).",
     "They could provide visual representations of cost data in graphs or charts."
    ],
    "assessment": [
     "Informal, or more formal assessment of students' spreadsheets and analysis.",
     "Has the amount of energy been calculated correctly?",
     "Has the cost of energy been calculated correctly?",
     "Have formulas been successfully copied to other rows in the spreadsheet?",
     "Have they been able to make sensible conclusions and recommendations?"
    ]
   },
   {
    "n": 6,
    "slug": "mbu-energy-6",
    "title": "Energy presentations",
    "pages": 6,
    "intro": "Recap learning from previous lessons (slide 3), which could include: Global goal 13 on climate action and why it's relevant to Energy use at school and how data can be used to make decisions and drive change in behaviours How to plan the collection of good data and why this is important How to calculate energy use in kWh and cost Collecting and processing data and visualising it to make it easier to interpret Making suggestions for reducing energy use based on the information collected and how this can drive behaviour change, help people to save money and reduce our impact on climate change Create a presentation of findings Invite students in small groups to review their findings from the previous lessons and create a presentation which they could give to the rest of their class, year group, school leadership, parents or governors. This could cover: how they used technology to collect good data how they have used their computing knowledge, data handling, mathematics and science skills how they made inferences about behaviour from that data suggestions about changing behaviour how much energy and money could be saved by changing behaviour, changing lighting types or energy providers what impact this could have on climate change Recap with students how they can consider their audience when planning their presentations and good practice for slideshows if appropriate – i.e. keep words on screen to a minimum and rehearse the spoken part of the presentation (slide 4). Giving presentations Invite students to give their presentations to their chosen audience. If you wish, other students could evaluate them as they do so and give appropriate feedback. You could award prizes for different presentations (e.g best presentation of data, most persuasive presentation etc).",
    "materials": "Downloadable resources:, Lesson slides, Lesson plan, Other resources:, Student work from previous lesson",
    "objectives": [
     "Demonstrate an understanding of factors affecting the reliability of data collection.",
     "Show how data can be analysed to drive decisions to encourage behaviour change.",
     "Explain how problems were approached and the skills used.",
     "Present complex information in a way that's appropriate to the audience."
    ],
    "activities": [
     "Downloadable resources:",
     "Other resources:",
     "Student work from previous lesson",
     "Introduction",
     "Recap learning from previous lessons (slide 3), which could include:",
     "Global goal 13 on climate action and why it's relevant to",
     "Energy use at school and how data can be used to make decisions and drive change in behaviours",
     "How to plan the collection of good data and why this is important",
     "How to calculate energy use in kWh and cost",
     "Collecting and processing data and visualising it to make it easier to interpret",
     "Making suggestions for reducing energy use based on the information collected and how this can drive behaviour change, help people to save money and reduce our impact on climate change",
     "Create a presentation of findings",
     "Invite students in small groups to review their findings from the previous lessons and create a presentation which they could give to the rest of their class, year group, school leadership, parents or governors.",
     "This could cover:",
     "how they used technology to collect good data",
     "how they have used their computing knowledge, data handling, mathematics and science skills",
     "how they made inferences about behaviour from that data",
     "suggestions about changing behaviour",
     "how much energy and money could be saved by changing behaviour, changing lighting types or energy providers",
     "what impact this could have on climate change",
     "Recap with students how they can consider their audience when planning their presentations and good practice for slideshows if appropriate – i.e. keep words on screen to a minimum and rehearse the spoken part of the presentation (slide 4).",
     "Giving presentations",
     "Invite students to give their presentations to their chosen audience. If you wish, other students could evaluate them as they do so and give appropriate feedback. You could award prizes for different presentations (e.g best presentation of data, most persuasive presentation etc)."
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "Students could work with carefully selected, supportive partners for group work.",
     "Students could be assigned roles within their groups that play to their strengths. e.g. written work, design, public speaking",
     "Stretch & challenge",
     "Students could research alternative energy suppliers and sustainable energy sources",
     "They could add projections about possible savings in money and carbon footprints that could be made",
     "They could evaluate their own contribution to the tasks and how they might improve these in the future."
    ],
    "assessment": [
     "Informal or formal assessment of presentations (slide 5). E.g.",
     "Did the presentation reflect the skills gained in this unit?",
     "Did it communicate numerical data findings clearly and give appropriate suggestions for behaviour change?",
     "Was it appropriate to its audience?",
     "Was the presentation delivered effectively?"
    ]
   }
  ]
 },
 {
  "slug": "nightsafety",
  "title": "Night safety",
  "emoji": "🌙",
  "order": 9,
  "description": "",
  "skills": [
   "Algorithms",
   "Product design",
   "Sensors",
   "Input/output",
   "Sequence",
   "3 Health"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-nightsafety-1",
    "title": "Lesson 1",
    "pages": 11,
    "intro": "In this activity, students develop their understanding around road safety for children at night and explore potential solutions before planning, creating and testing a Night sensor using the BBC micro:bit.",
    "materials": "Introduction: Night safety for children (5 minutes), In groups or pairs, invite students to consider and share the main problems around road safety for children (slide 2)., You could ask them to focus on particularly vulnerable children if you wish (e.g. children with visual or hearing impairments)., How can technology help? (10 minutes), Introduce the idea that technology could help with the problems identified (slide 3)., Give groups large sheets of paper and ask them to brainstorm potential ideas – encourage them to think creatively., Invite groups to present their (best) ideas back to the class., Using the BBC micro:bit to help (10 minutes), Give each group a micro:bit and ask them to consider how it could be used to help (slide 4). Depending on your class’ experience with micro:bit you may need to provide an introduction or a micro:bit running the ‘Night sensor’ program for them to explore., Invite groups to share their ideas., Introduce the ‘Night sensor’ and discuss how it could be used, why it might be helpful for children and especially those with hearing or visual impairments (slide 5)., Algorithm for a Night sensor (10 mins+), Depending on your students’ experience, you may need to introduce them to iteration, selection and variables before asking them in pairs or individually to write a pseudocode algorithm for the Night sensor program (slide 6)., Invite students to test and debug their algorithm with someone else/another pair., Examples are given on slide 7., Programming a Night sensor (15 mins+), Ask students to work in pairs or individually to write their Night sensor programs (slide 8)., You may need to talk students through the MakeCode editor and using iteration, selection and variables, depending on their experience. Simple and more complex examples are given as example files and on slide 9., If working in pairs, encourage students to use paired programming and test and debug regularly., Once completed, ask students to download their code to a micro:bit and test out their program, debugging if necessary until they have a working version., Encourage them to show each other and spot any differences in their programs., Review (10 mins), Ask students to share any problems they encountered and how they overcame them (slide 10)., As a class share students’ learning from the project, highlighting aspects important for your students (e.g. terminology, programming skills, common issues etc.).",
    "objectives": [
     "To understand the problem of road safety for children",
     "To explore ways technology can help children stay safe at night",
     "To plan, create and test a ‘Night sensor’ using the BBC micro:bit to remind children to ‘Be Safe: Be Seen!"
    ],
    "activities": [
     "Introduction: Night safety for children (5 minutes)",
     "In groups or pairs, invite students to consider and share the main problems around road safety for children (slide 2).",
     "You could ask them to focus on particularly vulnerable children if you wish (e.g. children with visual or hearing impairments).",
     "How can technology help? (10 minutes)",
     "Introduce the idea that technology could help with the problems identified (slide 3).",
     "Give groups large sheets of paper and ask them to brainstorm potential ideas – encourage them to think creatively.",
     "Invite groups to present their (best) ideas back to the class.",
     "Using the BBC micro:bit to help (10 minutes)",
     "Give each group a micro:bit and ask them to consider how it could be used to help (slide 4). Depending on your class’ experience with micro:bit you may need to provide an introduction or a micro:bit running the ‘Night sensor’ program for them to explore.",
     "Invite groups to share their ideas.",
     "Introduce the ‘Night sensor’ and discuss how it could be used, why it might be helpful for children and especially those with hearing or visual impairments (slide 5).",
     "Algorithm for a Night sensor (10 mins+)",
     "Depending on your students’ experience, you may need to introduce them to iteration, selection and variables before asking them in pairs or individually to write a pseudocode algorithm for the Night sensor program (slide 6).",
     "Invite students to test and debug their algorithm with someone else/another pair.",
     "Examples are given on slide 7.",
     "Programming a Night sensor (15 mins+)",
     "Ask students to work in pairs or individually to write their Night sensor programs (slide 8).",
     "You may need to talk students through the MakeCode editor and using iteration, selection and variables, depending on their experience. Simple and more complex examples are given as example files and on slide 9.",
     "If working in pairs, encourage students to use paired programming and test and debug regularly.",
     "Once completed, ask students to download their code to a micro:bit and test out their program, debugging if necessary until they have a working version.",
     "Encourage them to show each other and spot any differences in their programs.",
     "Review (10 mins)",
     "Ask students to share any problems they encountered and how they overcame them (slide 10).",
     "As a class share students’ learning from the project, highlighting aspects important for your students (e.g. terminology, programming skills, common issues etc.)."
    ],
    "extension": [
     "Students could design and create their own innovation using the micro:bit to help children stay safe at night, developing their initial ideas, or developing new ones."
    ],
    "differentiation": [
     "Support:",
     "Students can create the basic Night sensor, with additional support in writing their algorithm or programming as required.",
     "Stretch & challenge:",
     "Students could add additional features to their Night sensor, or create a sensor using the Python editor."
    ],
    "assessment": [
     "Informal observation of students’ understanding of writing algorithms and using iteration, selection and variables.",
     "More formal assessment of students’ programs and final Night sensors if wished."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-nightsafety-2",
    "title": "Lesson 2",
    "pages": 9,
    "intro": "In this activity, students design, create and test a prototype of a flashing wheel light to help improve road safety at night for wheelchair users.",
    "materials": "Road safety for wheelchair users (10 minutes), Give groups or pairs of students large sheets of paper and ask them to consider the main problems around road safety for wheelchair users, especially at night (slide 2)., Discuss students’ ideas then ask them to come up with ways they think travelling at night could be made safer for people who are wheelchair users., Flashing wheel lights (10 minutes), Introduce the Flashing wheel lights project (slide 3)., If appropriate, make the classroom dark and show students an example Flashing wheel light (a micro:bit with the Flashing wheel code running on it)., Ask students to discuss different ways it could work (e.g. light always on, blinking rapidly, flashing more slowly etc)., Go into appropriate depth about how it works for your students (e.g. how do they think the light level is detected, how does a user turn the light on and off, what makes it flash, how long does the flashing word etc)., Algorithm writing (10 minutes+), Ask students individually or in pairs to write an algorithm for a Flashing wheel light on another large sheet of paper (slide 4)., Depending on your student’s level you may need to introduce or recap iteration, selection and variables., Programming a Flashing wheel light (15 minutes+), Ask students to use their algorithm to program their Flashing wheel light (slide 5)., You may need to talk students through the MakeCode editor and using iteration, selection and variables, depending on their experience. Example programs are given as files and on slide 6., If working in pairs, encourage them to use paired programming, work through problems systematically together and test and debug their work regularly., Evaluating and presenting (15 mins+), Ask students to evaluate their work in simple ways (e.g. What went well/Even better if) (slide 7)., Invite them to present their Flashing wheel light (if you can find wheels for students to attach their lights to, all the better) and what they have learnt from this project.",
    "objectives": [
     "To develop understanding of issues around road safety for wheelchair users, especially at night.",
     "To design and create a prototype of a flashing wheel light using micro:bit to help wheelchair users ‘Be Safe: Be Seen!’ at night.",
     "To test, debug, evaluate and present a Flashing wheel light prototype."
    ],
    "activities": [
     "Road safety for wheelchair users (10 minutes)",
     "Give groups or pairs of students large sheets of paper and ask them to consider the main problems around road safety for wheelchair users, especially at night (slide 2).",
     "Discuss students’ ideas then ask them to come up with ways they think travelling at night could be made safer for people who are wheelchair users.",
     "Flashing wheel lights (10 minutes)",
     "Introduce the Flashing wheel lights project (slide 3).",
     "If appropriate, make the classroom dark and show students an example Flashing wheel light (a micro:bit with the Flashing wheel code running on it).",
     "Ask students to discuss different ways it could work (e.g. light always on, blinking rapidly, flashing more slowly etc).",
     "Go into appropriate depth about how it works for your students (e.g. how do they think the light level is detected, how does a user turn the light on and off, what makes it flash, how long does the flashing word etc).",
     "Algorithm writing (10 minutes+)",
     "Ask students individually or in pairs to write an algorithm for a Flashing wheel light on another large sheet of paper (slide 4).",
     "Depending on your student’s level you may need to introduce or recap iteration, selection and variables.",
     "Programming a Flashing wheel light (15 minutes+)",
     "Ask students to use their algorithm to program their Flashing wheel light (slide 5).",
     "You may need to talk students through the MakeCode editor and using iteration, selection and variables, depending on their experience. Example programs are given as files and on slide 6.",
     "If working in pairs, encourage them to use paired programming, work through problems systematically together and test and debug their work regularly.",
     "Evaluating and presenting (15 mins+)",
     "Ask students to evaluate their work in simple ways (e.g. What went well/Even better if) (slide 7).",
     "Invite them to present their Flashing wheel light (if you can find wheels for students to attach their lights to, all the better) and what they have learnt from this project."
    ],
    "extension": [],
    "differentiation": [
     "Support",
     "You could give out instructions to sequence to help students create their algorithm and printed versions of the blocks to sequence before coding.",
     "Stretch & challenge",
     "Students can be challenged to consider the most efficient way of writing their program and to explain why with comments. They could also use one of the other editors (e.g. python)."
    ],
    "assessment": [
     "Informal observation of students during algorithm writing and programming and more formal assessment of their final program and Flashing wheel light prototype if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-nightsafety-3",
    "title": "Lesson 3",
    "pages": 10,
    "intro": "In this activity, students learn about Juliane, a girl from Zimbabwe who has come to England as a refugee and create a light up bag for her journey to school.",
    "materials": "Juliane’s story (10 minutes), Show the animation of Juliane’s story (slide 2)., Discuss as a class, using the questions on slide 3 as a guide., A bag for Juliane (10 minutes), Introduce the project of creating a bag for Juliane with a light and other features to help her feel safe at night (slide 4)., Use slide 5 to discuss the tasks to complete and give out large pieces of paper for students to complete their design., Light algorithm (15 minutes+), Discuss with students how the light for the bag could work and ask them to write an algorithm., An example algorithm is on slide 6 and you may need to go through some concepts used depending on your students., Coding the light (15 minutes+), Ask students to write their program using the MakeCode editor and their algorithm, working through problems and regularly testing and debugging their code (slide 7)., Give appropriate support depending on your students’ level., Example code is given on slide 8 or can be downloaded., Once they have a working program, ask students to download it to their micro:bit to test it out., Creating Juliane’s bag (15 minutes+), If you have materials and wish students to create their bag, ask them to do so., They can also design and create other features of their bag., Evaluating a bag for Juliane (10 minutes), Invite students to show their work as appropriate (if they have made their bags, you could create a display)., Discuss and review what they have learnt during this project (slide 9).",
    "objectives": [
     "To develop empathy and understanding for child refugees",
     "To design a bag to help Juliane, a child refugee, feel safer on her school journey",
     "To design and code a light for Juliane’s bag using micro:bit",
     "To create a bag featuring a micro:bit light and other features to help Juliane (if have materials)"
    ],
    "activities": [
     "Juliane’s story (10 minutes)",
     "Show the animation of Juliane’s story (slide 2).",
     "Discuss as a class, using the questions on slide 3 as a guide.",
     "A bag for Juliane (10 minutes)",
     "Introduce the project of creating a bag for Juliane with a light and other features to help her feel safe at night (slide 4).",
     "Use slide 5 to discuss the tasks to complete and give out large pieces of paper for students to complete their design.",
     "Light algorithm (15 minutes+)",
     "Discuss with students how the light for the bag could work and ask them to write an algorithm.",
     "An example algorithm is on slide 6 and you may need to go through some concepts used depending on your students.",
     "Coding the light (15 minutes+)",
     "Ask students to write their program using the MakeCode editor and their algorithm, working through problems and regularly testing and debugging their code (slide 7).",
     "Give appropriate support depending on your students’ level.",
     "Example code is given on slide 8 or can be downloaded.",
     "Once they have a working program, ask students to download it to their micro:bit to test it out.",
     "Creating Juliane’s bag (15 minutes+)",
     "If you have materials and wish students to create their bag, ask them to do so.",
     "They can also design and create other features of their bag.",
     "Evaluating a bag for Juliane (10 minutes)",
     "Invite students to show their work as appropriate (if they have made their bags, you could create a display).",
     "Discuss and review what they have learnt during this project (slide 9)."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "healthtech",
  "title": "Health tech",
  "emoji": "🩺",
  "order": 10,
  "description": "In this series of 5-6 lessons aimed at students in the first year of secondary school, students learn about 'health tech', the use of technology to improve health. They develop and apply their knowledge and understanding of computational thinking and real-life problem-solving by working in teams to create their own prototype health tech innovation.",
  "skills": [
   "Algorithms",
   "Health",
   "Product design"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-healthtech-1",
    "title": "Health of the nation",
    "pages": 12,
    "intro": "In this lesson students are introduced to health tech and develop their understanding of how it is being used to try to help address some of the largest health problems facing the UK. They research, evaluate and present real-life examples to develop their understanding of this innovative, real-life use of technology to help to improve lives.",
    "materials": "",
    "objectives": [
     "To understand some of the UK’s biggest health challenges",
     "To be able to explain ‘health tech’",
     "To be research and evaluate real-life examples of health tech being used to address health challenges"
    ],
    "activities": [
     "The UK’s health (10 minutes)",
     "How can ‘health tech’ help? (10 minutes)",
     "Health tech research (15 minutes)",
     "Presenting research (15 minutes)",
     "Review & wrap up (10 minutes)",
     "Introduction: The UK’s health (10 minutes)",
     "Give different pairs or small teams access to a recent news article relating to health challenges in the UK (examples on slide 2, though tailor for your students, being sensitive to any pastoral issues).",
     "Give teams time to read the article, before sharing summaries and leading a class discussion around the main health challenges in the UK and their impact",
     "e.g. ageing population, increases in obesity etc = more people needing more treatment, leads to lack of beds, long waiting times, pressure on NHS staff and funding etc.",
     "How can health tech help? (10 minutes)",
     "Invite students to share their current understanding of ‘health tech’ (slide 3), ensure they understand the initial concept and ask them to think/pair/share how technology could help to address some of these issues.",
     "Use the examples on slides 4-6 as prompts for a class discussion and invite students to share their own examples if they know of any.",
     "Share the learning objectives on slide 7 if you wish.",
     "Health tech research (15 minutes)",
     "Split students into small teams, give them flip chart paper and pens and explain they need to choose and research one ‘health tech’ innovation to present to the class.",
     "Depending on your students, you can let them find their own, or direct them to choose from the NHS Apps list (slide 8).",
     "Use the questions on slide 9 to give students’ research structure and allow students 10-15 minutes to work on the task.",
     "Presenting research (15 minutes)",
     "Invite each group to share their research, showing the innovation on the class board and using the questions on slide 9 and a timer to retain focus.",
     "Lead a brief class discussion to draw out their thoughts around overall benefits and potential problems with health tech innovations.",
     "Wrap up (10 minutes)",
     "Pair up students and ask them to discuss the questions on slide 10 before sharing briefly as a class.",
     "Review the learning objectives on slide 11 if you wish."
    ],
    "extension": [
     "Students could write up their research of their health tech innovation individually for homework.",
     "You could hold a debate on a statement such as ‘health tech will solve all the UK’s health problems.’",
     "Students could be set a task to use a health tech innovation for homework (e.g. a step tracker or online food diary) and bring their review to the next lesson."
    ],
    "differentiation": [
     "Support:",
     "Students can be given easy to access news articles (or videos) in the introductory task.",
     "Consider allocating health tech innovations for the research task, or giving them a limited selection from which to choose.",
     "Encourage even simple evaluation of potential benefits and problems for user.",
     "Stretch & challenge:",
     "Students could source their own news articles and health tech innovations to research.",
     "Encourage deeper evaluative thought around potential benefits and problems for users, the healthcare system and society."
    ],
    "assessment": [
     "Informal observation of students’ during activities, discussions and presentation of their research.",
     "More formal assessment of individual write-up (see first extension idea)."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-healthtech-2",
    "title": "Health tech innovations",
    "pages": 10,
    "intro": "In this lesson students are introduced to the health tech challenge and work in teams to brainstorm and choose a health tech innovation idea to address a real-life problem. They learn the importance of prototyping, are introduced to the criteria for their prototype and begin designing their innovation.",
    "materials": "",
    "objectives": [
     "To develop ideas for health tech innovation innovations to meet a UK healthcare need",
     "To understand the importance of prototyping",
     "To select an innovation idea and begin to develop a prototype"
    ],
    "activities": [
     "Recapping health tech (5 minutes)",
     "Health tech innovation challenge (10 minutes)",
     "Understanding prototyping (5 minutes)",
     "Health area choice & brainstorming (10 minutes)",
     "Developing an innovation (15 minutes)",
     "Presenting innovation research (10 minutes)",
     "Review & wrap up (5 minutes)",
     "Introduction: Recapping health tech (5 minutes)",
     "Use slide 2 for think/pair/share questions to recap health tech and the learning from last lesson.",
     "Discuss as a class, encouraging students to give a range of answers and addressing any misunderstandings.",
     "Also recap the skills students used in the previous lesson (research, summarising, evaluation, presenting, team work etc) and highlight that these will be important in their next challenge.",
     "Health tech innovation challenge (10 minutes)",
     "Explain to students that their challenge is going to be to create a prototype of a health tech innovation to help solve a UK health problem using micro:bit (slide 3).",
     "If you wish you can make this a challenge set by the Health Secretary.",
     "Advise them that their first challenge is to decompose this larger problem into smaller steps they will need to take to solve this challenge.",
     "Put students into the small teams they will be working in for the challenge, give out large sheets of paper and pens and ask them to write down the steps they think they need to take to complete the challenge (suggestions on slide 4).",
     "Introduce the learning objectives if you wish (slide 5).",
     "Understanding prototyping (5 minutes)",
     "Invite students to consider their current understanding of prototyping.",
     "Ask them to think/pair/share in their teams why prototyping is important and discuss as a class (slide 6).",
     "Go through your expectations of what their prototype should include (suggestions on slide 7, though adjust if wished according to your students’ experience).",
     "Explain this is the criteria for their innovation and they must make sure they follow it (you can say it is the Health Secretary’s criteria if you are taking this approach, or that this is the criteria their innovations are being judged on if you wish to make it a competition).",
     "Health area choice & brainstorming (10 minutes)",
     "Ensure each team has a worksheet (on paper or computer).",
     "Give them a set amount of time (say 5 minutes) to decide what area of health they wish to focus on and complete the first question on their worksheet.",
     "Give teams 5 minutes to discuss and brainstorm different ideas for innovations on the other side of their flip chart paper.",
     "Depending on their level of experience with micro:bit, you may need to set expectations around what they could prototype while encouraging creativity and reminding them they only have to present a representation (an abstraction) of their innovation.",
     "Developing an innovation (15 minutes)",
     "Give teams a short amount of time to choose the innovation they wish to prototype and develop their initial ideas for it on flip chart paper.",
     "Ask each team to complete question 2 on their worksheet.",
     "Presenting innovations (10 minutes)",
     "Invite each team to briefly share with the class their innovation idea and encourage constructive feedback to help teams develop their thinking.",
     "Give teams time to note down feedback and set team actions for the next stage in their prototype development on their worksheet.",
     "Review & wrap up (5 minutes)",
     "Ask teams to discuss the learning review questions on slide 8 and review the learning objectives on slide 9 if you wish."
    ],
    "extension": [
     "Instead of completing the worksheet, teams could start a vlog or blog and be tasked each week with summarising their learning (using the questions on the worksheet as a guide). This can be a more appealing way of assessment and improve digital literacy skills.",
     "Students could explain and collect feedback on their ideas from home or other peers in school and bring this to the following lesson to discuss with their team."
    ],
    "differentiation": [
     "Support:",
     "Sensitive groups can help to ensure active participation.",
     "You could give the first steps for the decomposition activity so students have more structure.",
     "Extra adult support may be helpful at the start of the brainstorming activity to help ideas to flow and to help with the choice and initial development of the idea.",
     "Stretch & challenge:",
     "Encourage more detailed breakdown of the tasks involved in the challenge and a variety of ideas in the brainstorming task.",
     "Stretch students’ ideas with additional questioning when they are choosing their innovation to encourage them to give consideration to which ideas might be most workable & effective and why."
    ],
    "assessment": [
     "Informal observation of students’ during team activities.",
     "More formal assessment of worksheets if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-healthtech-3",
    "title": "Prototyping innovations",
    "pages": 13,
    "intro": "In this lesson, students work in teams to complete the prototype of their health tech innovation, using a number of computational thinking concepts and skills. The lesson can easily be adjusted in terms of length and teacher input to suit your students experience.",
    "materials": "",
    "objectives": [
     "To work effectively as a team to develop a prototype for a health tech innovation",
     "To design an accurate, detailed algorithm for at least one prototype feature",
     "To use the algorithm to write, test and debug a working micro:bit program"
    ],
    "activities": [
     "Recap of challenge & team planning (5 minutes)",
     "Team work & workshops (40 minutes)",
     "Sharing progress (10 minutes)",
     "Review & wrap up (5 minutes)",
     "Introduction: Recap of challenge & team planning (5 minutes)",
     "Ensure students have their worksheets and plans from last lesson.",
     "Spend a few minutes recapping the challenge and criteria for their health tech innovation (slides 2 and 3) and asking teams to consider how they will work effectively to complete the challenge.",
     "If you wish, ask teams to set ‘responsibilities’ and note down objectives for this lesson E.g. overall team leader, visual designers, programmers).",
     "Ensure they understand they will be presenting their prototype to an audience next lesson and share the learning objectives on slide 4 if you wish.",
     "Team work & workshops (40 minutes)",
     "Ensure students have access to all that they need to complete their prototype and give them ample time to complete it, offering support and interim ‘time and progress checks’ as appropriate.",
     "You may wish to run a series of ‘workshops’ with representative from each group responsible for that task. E.g.",
     "Discussing plans with the ‘visual designers’ and explaining what a ‘good’ prototype looks like (slide 5).",
     "Running an ‘algorithm design / programming clinic’ to help students work through any issues they are having as they write their algorithms and programs (use the example on slides 6 & 7 and the step tracker example hex code if helpful).",
     "Using slides 8 and 9 to explain paired programming and reminding students of the importance of testing and debugging.",
     "Sharing progress (10 minutes)",
     "Explain to teams that next lesson they will be presenting their prototype (slide 10 - adjust as necessary to suit).",
     "Ask teams to discuss their progress in today’s lesson within the team, giving each member the chance to feedback and discuss what they need to in order to complete their prototype, ensuring they take note of actions for next lesson.",
     "Ensure teams are sure how much time they to get ready for their presentation in the next lesson and if possible/necessary, offer support prior to the next lesson so this is achievable.",
     "Review & wrap up (5 minutes)",
     "Use slide 11 to ask students to consider in their teams what computational thinking concepts and skills they have used in today’s lesson and share as a group (e.g. abstraction by creating a representation of their innovation, decomposition by breaking down the challenge into smaller tasks).",
     "Highlight important skills such as problem solving, team working, sticking to deadlines etc, sharing examples from different teams.",
     "Review the learning objectives on slide 12 if you wish."
    ],
    "extension": [
     "Teams could create a short informal video to explain their prototype development so far and how they have approached the challenge with each member explaining their role, any problems they have encountered and how they have overcome them. and how they have.",
     "Students from each team with the same ‘role’ could get together and share their progress and discuss challenges."
    ],
    "differentiation": [
     "Support:",
     "Students can be given an appropriate role playing to their strengths, or paired with another student if helpful.",
     "Additional adult support can be given where needed to help them fulfil their role successfully.",
     "Stretch & challenge:",
     "Students can be given more challenging roles according to their strengths and/or areas of development and can write (or support other members of their team to write) more complex algorithms and code.",
     "Students can set themselves, or be helped to set, stretch and challenge objectives for this and next lesson."
    ],
    "assessment": [
     "Informal observation of individuals and teams during teamwork and workshops."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-healthtech-4",
    "title": "Preparing presentations",
    "pages": 8,
    "intro": "In this lesson, students work in their teams to complete their prototype before preparing and practicing a presentation of their work.",
    "materials": "",
    "objectives": [
     "To complete your health tech prototype",
     "To prepare an effective way to present your prototype",
     "To practice delivering your presentation"
    ],
    "activities": [
     "Recap of challenge and criteria (5 minutes)",
     "Completing prototype (20 minutes)",
     "Preparing presentations (20 minutes)",
     "Practicing presentations (10 minutes)",
     "Review & wrap up (5 minutes)",
     "Introduction: Recap of challenge & presentation criteria (5 minutes)",
     "Ensure students have all their prototype work so far.",
     "Share the learning objectives if you wish and briefly recap the challenge and the criteria for their health tech innovation prototype (slides 2-4).",
     "Ask teams to discuss and set their team and individual objectives so they can complete their prototype in the time allowed",
     "Completing prototype (20 minutes)",
     "Give teams time to complete their prototype, giving additional support as needed.",
     "They may well not finish in the allotted time and you can decide whether to give extra time, or encourage them to make decisions to ensure they meet the deadline and are ready to present.",
     "As teams finish, they can move on to preparing their presentation.",
     "Preparing presentations (20 minutes)",
     "Remind students of the criteria for their presentations (slide 5).",
     "Invite students to share some ideas on the different ways they could present their prototypes.",
     "Discuss what makes a ‘good’ presentation (slide 6).",
     "If you wish, share the student presentation template with teams (although creativity in how they present their prototype should be encouraged).",
     "Give teams time to complete their presentation, giving interim time reminders and support as necessary.",
     "Practicing presentations (10 minutes)",
     "Remind teams of how they will be delivering their presentations (i.e. where they will be delivering them and to whom, the running order, the time they will have and how you want them to setup and be ready).",
     "Give teams time to practice the delivery and timing of their presentations.",
     "Ask them to share or store their presentations in a suitable place so they are ready to deliver next lesson.",
     "Review & wrap up (5 minutes)",
     "Invite students to think/pair/share in their teams what they have achieved and learnt in this lesson.",
     "Share a few as a class and review the learning objectives on slide 7 if you wish."
    ],
    "extension": [
     "Teams could pair up and deliver their presentation to each other, giving and receiving constructive feedback."
    ],
    "differentiation": [
     "Support:",
     "Students can be given support to complete their role in the prototype either from peers or adults if needed.",
     "All students should be encouraged to be involved in the presentation in some respect, playing to their strengths as appropriate.",
     "Stretch & challenge:",
     "Students could find and analyse examples of different types of presentations, giving their opinions on which they consider to be most effective and why before incorporating these into their presentation."
    ],
    "assessment": [
     "Informal observation of individuals and teams during the lesson."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-healthtech-5",
    "title": "Health tech showcase",
    "pages": 10,
    "intro": "In this lesson, students deliver their health tech innovation presentations to an audience, giving and receiving constructive feedback. They then evaluating their prototypes, presentations and their approach to the project.",
    "materials": "",
    "objectives": [
     "To present your health tech prototype to an audience",
     "To give and receive constructive feedback",
     "To evaluate your health tech prototype, presentation and approach to the challenge"
    ],
    "activities": [
     "Set up of presentations (5 minutes)",
     "Delivery of presentations (35 minutes)",
     "Evaluations (15 minutes)",
     "Review & wrap up (5 minutes)",
     "Prior to the lesson:",
     "Create a suitable presentation area and atmosphere (inside the classroom or in another suitable area).",
     "Presentation set up (5 minutes)",
     "Remind teams they will be showcasing their health tech innovation by presenting their prototype to an audience.",
     "Give teams 5 minutes to ensure their presentation is set up and remind them of the running order.",
     "Share the lesson objectives if you wish on slide 2.",
     "Delivery of presentations (35 minutes)",
     "Introduce the challenge, prototype and presentation criteria to any invited audience members (slides 3-5).",
     "Invite each team in order to give their presentations (slide 6) and a short time for constructive feedback (e.g. What Went Well, Even Better If).",
     "You, or invited guests, could award different prizes (e.g. best overall health tech innovation, most likely to get to market, impressive prototype, most effective presentation, best team work etc). You can use the template certificate and adapt it.",
     "Evaluations (15 minutes)",
     "Ensure students have access to the student evaluation sheet on paper or computer (slide 7) and ask them to complete it (this could be set for homework).",
     "Review & wrap up (5 minutes)",
     "Use the questions on slide 8 to review students’ learning in this topic.",
     "Review the learning objectives if you wish."
    ],
    "extension": [
     "Presentations could be videoed and a selection shared on the school intranet or website.",
     "Students could create an individual portfolio presentation, blog or vlog to document their work in the unit for informal or more formal assessment."
    ],
    "differentiation": [
     "Support:",
     "Encourage students to showcase their strengths and achievements as part of the presentation.",
     "Sentence starters may be helpful for the evaluation (e.g. “One problem I had was…. I solved it by…”).",
     "Stretch & challenge:",
     "Encourage students to give thoughtful, constructive feedback to others.",
     "Stretch students in their evaluations, considering their individual learning carefully and include additional questions as appropriate to further develop thinking (e.g. When you encounter similar problems in the future, how will you change how you approach them)."
    ],
    "assessment": [
     "Informal observation of individuals and teams during the lesson.",
     "More formal assessment of presentations, evaluation sheets and students’ contribution to the challenge."
    ]
   }
  ]
 },
 {
  "slug": "active1",
  "title": "Being active",
  "emoji": "🏃",
  "order": 11,
  "description": "",
  "skills": [
   "Algorithms",
   "Hardware & software",
   "Sensors",
   "Input/output",
   "Selection",
   "Sequence"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-active1-1",
    "title": "Lesson 1",
    "pages": 8,
    "intro": "In this activity, students learn about the importance of regular activity then create a simple wearable device to give regular reminders to exercise.",
    "materials": "Activity and heart disease (10 minutes), Give groups of students large sheets of paper and ask them to share their understanding on why regular exercise is important to prevent heart disease (slide 2)., Discuss their ideas as a class, then ask them to consider why many people don’t do more exercise and ideas for simple ways people can fit more activity into their day., A ‘Fitness friend’ device (10 minutes), Introduce the idea of a ‘Fitness friend’ wearable device to help people remember to do some exercise (slide 3)., Show a working prototype (the code running on a micro:bit) and discuss students’ ideas of how it is programmed to work., Fitness friend algorithm (10 minutes+), Ask students individually or in pairs to write an algorithm to program the ‘Fitness friend’ using the micro:bit (slide 4)., Depending on your student’ level you may need go through some of the concepts so they can write the algorithm (e.g. iteration, loops and selection – see example algorithms)., Coding a Fitness friend (15 minutes+), Ask students to write their program using the MakeCode editor and their algorithm, offering support where needed (slide 5)., You may need to talk students through the MakeCode editor, depending on their experience. Example code is given and shown on slide 6 (a basic version and one with start and stop buttons – note the reduced pause time for testing)., Once they have a working program, students can download it to their micro:bit and try out their device., Sharing learning (5 minutes+), Discuss what students have learnt from creating their ‘Fitness friend’ (slide 7)., Discuss what students have learnt from creating their 'Fitness friend' (slide 7)., Invite students to share any problems they encountered, how they overcome them and to consider any improvements they would like to make.",
    "objectives": [
     "To understand the importance of regular activity to help prevent heart disease",
     "To write a pseudocode or flowchart algorithm for a 'fitness friend' wearable device to remind someone to exercise",
     "To program, create and test a fitness friend wearable device using the BBC micro:bit"
    ],
    "activities": [
     "Activity and heart disease (10 minutes)",
     "Give groups of students large sheets of paper and ask them to share their understanding on why regular exercise is important to prevent heart disease (slide 2).",
     "Discuss their ideas as a class, then ask them to consider why many people don’t do more exercise and ideas for simple ways people can fit more activity into their day.",
     "A ‘Fitness friend’ device (10 minutes)",
     "Introduce the idea of a ‘Fitness friend’ wearable device to help people remember to do some exercise (slide 3).",
     "Show a working prototype (the code running on a micro:bit) and discuss students’ ideas of how it is programmed to work.",
     "Fitness friend algorithm (10 minutes+)",
     "Ask students individually or in pairs to write an algorithm to program the ‘Fitness friend’ using the micro:bit (slide 4).",
     "Depending on your student’ level you may need go through some of the concepts so they can write the algorithm (e.g. iteration, loops and selection – see example algorithms).",
     "Coding a Fitness friend (15 minutes+)",
     "Ask students to write their program using the MakeCode editor and their algorithm, offering support where needed (slide 5).",
     "You may need to talk students through the MakeCode editor, depending on their experience. Example code is given and shown on slide 6 (a basic version and one with start and stop buttons – note the reduced pause time for testing).",
     "Once they have a working program, students can download it to their micro:bit and try out their device.",
     "Sharing learning (5 minutes+)",
     "Discuss what students have learnt from creating their ‘Fitness friend’ (slide 7).",
     "Discuss what students have learnt from creating their 'Fitness friend' (slide 7).",
     "Invite students to share any problems they encountered, how they overcome them and to consider any improvements they would like to make."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 2,
    "slug": "mbu-active1-2",
    "title": "Lesson 2",
    "pages": 10,
    "intro": "In this activity, students learn how to measure their heart rate and create a prototype of a heart rate monitor.",
    "materials": "Activity and heart disease (5 minutes), Give groups of students large sheets of paper and ask them to share their understanding on why regular exercise is important to prevent heart disease (slide 2)., Discuss their ideas as a class., Measuring heart rates (10 minutes), Ask students to consider the impact on their heart rate of different activities (slide 3)., Give out scrap paper and as a class try different forms of activity and record their heart rates in a simple table (slide 4)., Discuss the results and themes as a class (i.e. which activity got their heart rates up the most, which helped to calm the heart rate down, which could easily be incorporated into daily routine, what else could they try etc.)., Designing a heart rate monitor (15 minutes+), Share the prototype with students and ask them to consider how it could be helpful and how they think it is programmed to work (slide 5)., Explain you would like them to design their own heart rate monitor using the micro:bit and give out large sheets of paper for them to use to create their paper design, which could include a drawing and an algorithm to explain how it works (see slide 6 for an example algorithm)., Depending on your students you may need to go through some of the concepts used (e.g. iteration, selection and variables) so they can write their algorithm., Coding a heart rate monitor (15 minutes+), Invite students to write their program using the MakeCode editor and their paper design, offering support where needed (slide 7)., Example code is given below and on slide 8., Encourage students to work through any problems logically, help each other and regularly test and debug their code., Once they have a working program, students can download it to their micro:bit to test out their heart rate monitor and debug it as necessary., Reviewing learning (10 minutes), Invite students to swop heart rate monitors and test them out., Review successes and common issues as a class, encouraging problem solving skills (slide 9)., Ask students to give simple evaluations of their work and approach to creating their heart rate monitor.",
    "objectives": [
     "To understand the importance of activity to help keep the heart healthy",
     "To measure the effect of different activities on heart rates",
     "To create, test and evaluate a prototype heart rate monitor using the micro:bit"
    ],
    "activities": [
     "Activity and heart disease (5 minutes)",
     "Give groups of students large sheets of paper and ask them to share their understanding on why regular exercise is important to prevent heart disease (slide 2).",
     "Discuss their ideas as a class.",
     "Measuring heart rates (10 minutes)",
     "Ask students to consider the impact on their heart rate of different activities (slide 3).",
     "Give out scrap paper and as a class try different forms of activity and record their heart rates in a simple table (slide 4).",
     "Discuss the results and themes as a class (i.e. which activity got their heart rates up the most, which helped to calm the heart rate down, which could easily be incorporated into daily routine, what else could they try etc.).",
     "Designing a heart rate monitor (15 minutes+)",
     "Share the prototype with students and ask them to consider how it could be helpful and how they think it is programmed to work (slide 5).",
     "Explain you would like them to design their own heart rate monitor using the micro:bit and give out large sheets of paper for them to use to create their paper design, which could include a drawing and an algorithm to explain how it works (see slide 6 for an example algorithm).",
     "Depending on your students you may need to go through some of the concepts used (e.g. iteration, selection and variables) so they can write their algorithm.",
     "Coding a heart rate monitor (15 minutes+)",
     "Invite students to write their program using the MakeCode editor and their paper design, offering support where needed (slide 7).",
     "Example code is given below and on slide 8.",
     "Encourage students to work through any problems logically, help each other and regularly test and debug their code.",
     "Once they have a working program, students can download it to their micro:bit to test out their heart rate monitor and debug it as necessary.",
     "Reviewing learning (10 minutes)",
     "Invite students to swop heart rate monitors and test them out.",
     "Review successes and common issues as a class, encouraging problem solving skills (slide 9).",
     "Ask students to give simple evaluations of their work and approach to creating their heart rate monitor."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 3,
    "slug": "mbu-active1-3",
    "title": "Lesson 3",
    "pages": 11,
    "intro": "In this activity, students learn about Aysha, a girl from Ethiopia and how far she has to walk for water. They then create a step counter to track their own steps and are challenged to walk the same number of steps as Aysha does in 1 day over 4 days.",
    "materials": "Aysha’s story (10 minutes), Show the video telling Aysha’s story (slide 2)., Discuss Aysha’s daily walk for water as a class, using the questions on slide 3 as a guide., Estimate as a class the number of steps Aysha walks every day., Walking for water challenge (10 minutes), Introduce the waling for water challenge (slide 4)., Use slide 5 to discuss the tasks to complete and give out large pieces of paper for students to complete their design., Step counter algorithm (15 minutes+), Show students a prototype of the step counter (a micro:bit with the example hex file running on it)., Ask them to consider how they think the code is working., Invite them to write their own algorithm for a step counter, supporting them as appropriate and using the example on slide 6 if helpful., Coding their step counter (15 minutes+), Ask students to write their program using the MakeCode editor and their algorithm, working through problems and regularly testing and debugging their code (slide 7)., Give appropriate support depending on your students’ level., Example code is given on slide 8 or can be downloaded., Once they have a working program, ask students to download it to their micro:bit., Allow students to choose suitable materials (if you have them) to attach their step counter to their shoe, ankle or wrist and try out their step counter., Walking for water challenge (over the course of 4 days), Give students a suitable time period to carry out their walking for water challenge., They can record their steps each day in any way you agree., Evaluating their step counter and challenge (10 minutes), Invite students to share the results from their challenge (awarding prizes if you wish)., Review and discuss what they have learnt during this project (slide 9).",
    "objectives": [
     "To develop empathy and understanding for others",
     "To design and program a step counter using micro:bit",
     "To use the step counter and undertake a ‘walking for water’ challenge"
    ],
    "activities": [
     "Aysha’s story (10 minutes)",
     "Show the video telling Aysha’s story (slide 2).",
     "Discuss Aysha’s daily walk for water as a class, using the questions on slide 3 as a guide.",
     "Estimate as a class the number of steps Aysha walks every day.",
     "Walking for water challenge (10 minutes)",
     "Introduce the waling for water challenge (slide 4).",
     "Use slide 5 to discuss the tasks to complete and give out large pieces of paper for students to complete their design.",
     "Step counter algorithm (15 minutes+)",
     "Show students a prototype of the step counter (a micro:bit with the example hex file running on it).",
     "Ask them to consider how they think the code is working.",
     "Invite them to write their own algorithm for a step counter, supporting them as appropriate and using the example on slide 6 if helpful.",
     "Coding their step counter (15 minutes+)",
     "Ask students to write their program using the MakeCode editor and their algorithm, working through problems and regularly testing and debugging their code (slide 7).",
     "Give appropriate support depending on your students’ level.",
     "Example code is given on slide 8 or can be downloaded.",
     "Once they have a working program, ask students to download it to their micro:bit.",
     "Allow students to choose suitable materials (if you have them) to attach their step counter to their shoe, ankle or wrist and try out their step counter.",
     "Walking for water challenge (over the course of 4 days)",
     "Give students a suitable time period to carry out their walking for water challenge.",
     "They can record their steps each day in any way you agree.",
     "Evaluating their step counter and challenge (10 minutes)",
     "Invite students to share the results from their challenge (awarding prizes if you wish).",
     "Review and discuss what they have learnt during this project (slide 9)."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "active2",
  "title": "Getting active",
  "emoji": "🤸",
  "order": 12,
  "description": "This series of five lessons is aimed at students aged 10-11 years. They are introduced to variables and develop their understanding of planning, coding and debugging through a mixture of unplugged and practical programming activities. Students use variables to design and program the micro:bit to be star-jump and step counters. They then use random numbers and selection to code a times table test and an activity selector.",
  "skills": [
   "Variables",
   "Randomisation",
   "Algorithms",
   "Health"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-active2-1",
    "title": "Describing with variables",
    "pages": 18,
    "intro": "In this lesson, pupils develop their understanding of variables through three unplugged activities. They consider the difference between variable names and variable values, using these to retell stories. Pupils’ understanding is reinforced by using variables to describe the characters they create. They finally consider how variables are changed and use this understanding to describe the numbers of sides that different shapes have.",
    "materials": "",
    "objectives": [
     "To know and understand what variables are",
     "To use variables to describe a character",
     "To write algorithms that use variables"
    ],
    "activities": [
     "Introduction: Playing a game (15 minutes)",
     "Introducing variables (25 minutes)",
     "Changing variables (15 minutes)",
     "Reviewing learning (5 minutes)",
     "Introduction: Playing a game (15 minutes)",
     "Explain to pupils that they are going to have a competition using a stacking game (e.g. ‘chairs,’ ‘Jenga,’ ‘suspend’, etc). If you do not have access to such games, towers could be made from playing cards or plastic cups. Players score a point for each item they add to the stack, their score carries on when they lose a life. Players have two lives. A life is lost each time there is a collapse when the pupil’s lives reach zero it is the end of their turn.",
     "Select three pupils to act in the role of score, lives and high score give each pupil a mini-whiteboard. Use slide 4 to discuss with pupils the value of each at the start of the game and when they will change (see speaker notes for answers).",
     "Select one pupil to play the game and ask the three others to set their whiteboards to the first value identified and make the appropriate changes to the number during the game. At the end of the player’s turn, select another player and invite suggestion what the pupils with the mini-whiteboards should do (high score should be changed to the same value as score - being the first attempt, this will be the high score, while score and lives should be reset to the original value – 0 and 2.)",
     "Repeat the game with different pupils taking on the roles, ask further questions about what the values of the mini-whiteboards should be and when they should be changed. In subsequent games, the high score should only be changed if the current player’s score is greater than the high score.",
     "Introducing variables (25 minutes)",
     "Use slide 5 to introduce the concept of variables to pupils. Invite pupils to share any previous experience of variables.",
     "Display slide 6 and ask pupils to reflect on the game they played in the introduction and identify the variables that they used (score, lives, high score). Ask pupils to discuss with their partner the questions. (Examples of the type of statements that pupils might make have been included in the slide speaker notes).",
     "Provide pupils with a copy of slide 7 and explain that before a variable can be used it has to be set to a value. Set the values of the variables on the slide (e.g. Spiderman, jelly babies, 7 and squirrel) and ask pupils to do the same. Ask directed questions to pupils to get them to identify the value of their variables e.g. What is the value of your favourite sweet variable?",
     "Display slide 8 and explain to pupils that when writing a program we use the variable name but the computer will find the value of the named variable and use that. Discuss how this could have been used in the opening game.",
     "Display slide 9 and invite suggestions on how the passage should be read. Allow pupils to attempt to read it before establishing that each time the variable name has been written the value should be used (e.g. where it says ‘favourite superhero’ say ‘Spiderman’). Invite several pupils to share their version of the story with the class.",
     "Display slide 10 and explain how variables are useful when writing computer programs and draw links with how the story was told in different ways without changing anything in the text.",
     "Give out copies of the Variable character description worksheet and explain to pupils that need to set the values of the variables to numbers between 2 and 10. Then they are going to create a character and describe it using their variables. Remind pupils that when writing they should use the name of the variable but when reading it out loud, they should say its value.",
     "When pupils have completed their character descriptions, ask them to swap with another pupil to read their description back to them. Pupils should listen to the description to see if their partner reads it the way it was intended. If not, they should go back to their description and edit it so it does (debugging).",
     "Once all the pupils have finished, invite them to share their character description with the class. If possible, display the description that they have written at the same time.",
     "Changing variables (15 minutes)",
     "Explain to pupils that in computing, variables in a program can be changed which helps to reduce the number of variables that a program needs to include and making the program more efficient (slide 12). Invite suggestions on how and when the variables in the game played at the start of the lesson were changed.",
     "Display slide 13 and invite pupils’ suggestions on how and when the variable in the algorithm will change - increase by two if a question is answered correctly, decrease by 1 if a question is answered incorrectly.",
     "Display slide 14 and explain that one variable is being used to state how many sides different shapes have. Identify that the variable was set to 3 for the triangle then increased by 1 for the rectangle. Give out a copy of the same slide and ask pupils to work with a partner to identify the value by which the variable should change so it can be used to describe the next shape. Those who finish can add extra lines using their existing knowledge of shapes",
     "Use slide 15 to show pupils the correct answers.",
     "Reviewing learning (5 minutes)",
     "Use slide 16 to help pupils reflect on their use and understanding of variables. Allow them to discuss their responses with a partner before inviting pupils to share their ideas with the class.",
     "If you wish, use slide 17 to review the learning objectives of the lesson."
    ],
    "extension": [
     "Pupils could rewrite a counting song (e.g. ten green bottles) using variables.",
     "Example:",
     "set ‘number of bottles’ to 10",
     "Repeat twice",
     "‘number of bottles’ green bottles hanging on the wall",
     "Change ‘number of bottles’ by -1",
     "If one green bottle should accidentally fall, there’ll be ‘number of bottles’ green bottles hanging on the wall.",
     "Change ‘number of bottles’ by -1"
    ],
    "differentiation": [
     "Support: Pupils could work in an adult-led group to support their use of variables and focus on developing a solid basic understanding of how variables work and are used.",
     "Stretch & challenge: Pupils could use Variable character description (challenge) worksheet which requires pupils to use a greater number of variables which are set to larger values."
    ],
    "assessment": [
     "Informal observation of pupils understanding of variables through class discussions and paired activities.",
     "More formal assessment of pupils’ use of variables through the character description activity if wished."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-active2-2",
    "title": "Using variables in programs",
    "pages": 15,
    "intro": "In this lesson, pupils apply their understanding of variables by creating and using variables when recording the number of star-jumps each member of the group does in thirty seconds. They consider how the variables were changed and used, and sequence instructions to create an algorithm to represent this. Pupils are introduced to a program using variables and identify the goal of specific parts of the program before using this understanding to debug a program so the BBC micro:bit can be used to record an activity.",
    "materials": "star jump counter, variables debug, variables debug support, variables-debug challenge",
    "objectives": [
     "To write algorithms that use variables",
     "To explain how variables are used in programs",
     "To debug programs containing variables"
    ],
    "activities": [
     "Introduction: Ready, steady, star-jump! (15 minutes)",
     "Reviewing variables (15 minutes)",
     "Using variables in programs (10 minutes)",
     "Debugging (20 minutes)",
     "Introduction activity 1: Ready, steady, star-jump! (15 minutes)",
     "Arrange pupils into small groups (5-6) and explain that each group is going to have a competition to see which member can do the most star-jumps in 30 secs (slide 3).",
     "Explain you will provide the thirty-second timer, but the pupils will need to identify all the other information that needs to be recorded. Invite suggestions on what variables they could use. These should include player’s name, score and current leader (the person who has at a given point completed the most star-jumps).",
     "Ask pupils to carry out the activity and use slide 4 to provide a thirty-second timer. After pupils have finished recording the star-jumps for each member, ask each group to identify who completed the most jumps.",
     "Activity 2: Reviewing variables (15 minutes)",
     "Display slide 5 and ask pupils to think/pair/share the variables they used and how the variables were set, changed and used.",
     "Explain to pupils the statements on slide 6 are the steps to create an algorithm to show how to use the variables score and high score when recording the number of star jumps a person does in thirty seconds and identifying the highest number of star jumps completed by one person in the group.",
     "Give pairs copies of the variable algorithm to sort worksheet and time to sort the statements into an algorithm that represents how they might have used variables when recording the number of star-jumps completed.",
     "Once they have completed ordering the steps of the algorithm, display solution slide 7 (also on second page of handout) so they can compare their algorithm. If pupils have sequenced their algorithm differently, invite suggestions on why their algorithm differs and how either algorithm could be improved.",
     "Recap the computing concept of ‘selection’ by inviting pupils to explain their understanding of the term and ask them to identify where it is used in the algorithm. (Selection is the process by which a computer only carries out specific parts of a program if certain conditions are met).",
     "Activity 3: Using variables in programs (10 minutes)",
     "Show pupils the star jump counter program on slide 8 and explain that it uses variables to program a micro:bit to be used as an activity counter.",
     "Give out copies of slide 9 and ask pairs to identify the purpose of each part of the program by drawing an arrow from the purple circle next to a section of the program to a statement in the adjacent table. A completed copy of the slide has been provided on slide 13.",
     "Display slide 10 and invite suggestions from pupils on how a micro:bit, when running this program, could be used to count the number of star jumps completed. Ask questions such as, how is the counter set to zero (press button A), how is a jump recorded (press button B), when is the score displayed (when micro:bit is shaken). Test pupils’ ideas by using the star jump counter hex file in the MakeCode editor (see speaker notes for an explanation of pause block).",
     "Activity 4: Debugging (20 minutes)",
     "Use slide 11 to recap pupils’ understanding of the term ‘debug’ and establish that it is the process of finding and fixing errors in programs and algorithms.",
     "Explain to pupils that they are going to use the example program on slide 9 to debug a program so it can be used as an activity counter.",
     "Give pupils access to the variable debug hex file and ask them to work in pairs to debug the program so it can be used as an activity counter. Remind pupils to make use of the simulator in the MakeCode editor to see of their debug has had the desired impact.",
     "If you have access to physical micro:bit devices, you could ask pupils to download and transfer the program to their micro:bits and use them to count how many times an activity can be completed.",
     "Display slide 12 and invite pupils to demonstrate their understanding of variables and highlight how they have used them in the lesson (both in the forms of algorithms and programs) and to reflect on their debugging work.",
     "If you wish, use slide 13 to review the learning objectives of the lesson."
    ],
    "extension": [
     "Once programed, pupils could transfer the file to a micro:bit and use it to record the group completing various physical activities. If pupils are recording a new type of activity (after completing sit-ups, recording burpees) they will need to press the reset button on the reverse side of their micro:bit to reset the high score."
    ],
    "differentiation": [
     "Support: Pupils could use the variables debug support hex file which contains hints on how the program might be debug.",
     "Stretch & challenge: Pupils could use the variables debug challenge hex file which contains more bugs."
    ],
    "assessment": [
     "Informal observation of pupils understanding of how variables are used in algorithms and programs through class discussions and paired activities.",
     "More formal assessment of pupils’ use of variables through the debugging activity if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-active2-3",
    "title": "Programming step-counters",
    "pages": 16,
    "intro": "In this lesson, pupils use their previous learning to consider how activity trackers may use variables to record the number of steps a person takes every day. Pupils identify some of the ways that step-counters work and create algorithms to represent them. They then transfer this knowledge to program BBC micro:bits, using the MakeCode editor, to act as a step-counter. Pupils conclude the lesson by evaluating the use of the micro:bit as an activity tracker.",
    "materials": "",
    "objectives": [
     "To identify the uses of a step-counter",
     "To write an algorithm for a step-counter",
     "To program the BBC micro:bit as a step-counter"
    ],
    "activities": [
     "Introduction: How many steps? (10 minutes)",
     "Analysing step-counters (20 minutes)",
     "Programing step-counters (20 minutes)",
     "Comparing step-counters (10 minutes)",
     "Introduction: How many steps? (10 minutes)",
     "Use slide 3 to explain to pupils that in this lesson they will be looking at devices that people use to track physical activities. Invite suggestions on the brand names of these products (Fitbit, Garmin, Galaxy fit-e, etc), what types of data they record and the potential benefits to people’s health (see suggestions in slide notes).",
     "Analysing step-counters (20 minutes)",
     "Explain to pupils they are going to work with a partner to identify all the steps an activity-tracker needs to take in the process of counting steps. Link to pupils’ existing knowledge of selection and variables and ask them to record in a thinking map all the things that an activity-tracker does when it is counting steps (slide 4). See example thinking map on slide 14.",
     "Display slide 5 and review pupils’ ideas by asking them to contribute points from their thinking map to a class thinking map which can be created on a large sheet of paper. As pupils offer ideas, probe their understanding by asking them questions to link the ideas to variables i.e. so when does the variable rest to zero, how does the activity tracker know when the daily target has been reached? etc.",
     "Ask pupils to work with their partner to rank the actions that the activity tracker carries out into an order. Invite pupils to share their ideas then invite pupils to sequence the actions on the class thinking map. The order depends on the actions identified by the pupils but may look like this:",
     "1. sets to 0 steps at midnight",
     "2. records each step a person takes.",
     "3. shows the number of steps that have been taken so far when the screen is tapped.",
     "4. vibrates and shows an image of a trophy when 10,000 steps have been completed.",
     "Once the actions on the class activity map have been ordered, explain to the pupils that they are going to help you write a class algorithm to show how a step-counter may work.",
     "Use a large sheet of paper and working sequentially, ask pupils how each action could be represented in the algorithm. Remind pupils of the need to use repetition to ensure that the computer is constantly checking to see if steps are being taken. (See example on slide 15).",
     "Programing step-counters (20 minutes)",
     "Give out copies of identifying the actions of a program worksheet. Explain to pupils that this represents all the parts of the program to use a micro:bit as a step-counter and ask pairs to identify how a variable has been used in each part of the program.",
     "Use slides 7 - 10 to review their ideas, then ask pupils to work with their partner to write a program, using the microbit step counter to sort hex file, to use the micro:bit as a step-counter (slide 11).",
     "Remind pupils to make use of identifying the actions of a program worksheet to support their programing and to test and debug the program as they go along.",
     "If you have access to physical micro:bits, download the program onto the devices and allow pupils to test out their step-counters.",
     "Reviewing micro:bit as a step-counter (5 minutes)",
     "Display slide 12 and ask pupils to think/pair/share ways that they might improve the design of the micro:bit as a step-counter to make it more appealing to the ‘fitness tracker’ market. If you wish, use slide 13 to review the learning objectives."
    ],
    "extension": [
     "You could ask pupils to use a micro:bit as a step-counter for a fixed period of time. Display the steps counted for each user and ask pupils to represent the data in the form of a graph.",
     "Pupils could build on their ideas developed when reviewing the micro:bit as a step-counter and create a prototype of their design."
    ],
    "differentiation": [
     "Support: Pupils could use identifying the actions of a program support worksheet which requires pupils to select the action that the micro:bit will carry out for each part of the program",
     "Stretch & challenge: Pupils can build the program their micro:bit step tracker program without the use of the support file. They will need to select the blocks that are needed and locate in the menus. They could also explore how the program is created in the text-based, JavaScript editor in MakeCode."
    ],
    "assessment": [
     "Informal observation of pupils understanding of variables through class discussions and paired activities.",
     "More formal assessment of pupils’ explanation of how variables are used in the micro:bit step-counter program if wished."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-active2-4",
    "title": "Random activities",
    "pages": 14,
    "intro": "In this largely-unplugged lesson, pupils complete a micro:bit times table test and analyse the program to identify how variables and random numbers have been used, before identifying how the program can be modified to make it suitable for younger children. They then consider how variables and random numbers can be used to help a family become more active and plan how a micro:bit can be incorporated into their solution.",
    "materials": "",
    "objectives": [
     "To predict how variables will be used in programs",
     "To understand how a variable can be set to a random number",
     "To write algorithms that use random number variables"
    ],
    "activities": [
     "Introduction: variable times tables test (10 minutes)",
     "Modifying programs (15 minutes)",
     "Getting Active (20 minutes)",
     "Solving the problem with a micro:bit (15 minutes)",
     "Introduction: Variable times tables test (10 minutes)",
     "Display slide 3 and use it to explain to pupils that they are going to be given a times table test by a micro:bit.",
     "Open the Maths variable starter MakeCode project in the MakeCode editor and press button A on the simulator to generate each question. As you ask each question, pupils should respond by writing their answers on the mini-whiteboards and changing their variable score when the answer is displayed.",
     "Modifying programs (15 minutes)",
     "Invite pupils to think/pair/share what variables were used in the program and how they were used.",
     "Display slide 4 and explain to pupils that this is the program you used.",
     "Give out copies of variables times table program worksheet and ask pupils to work in pairs to discuss and record their answers before reviewing as a class (see speaker notes for answers).",
     "Display slide 5 and ask pupils to discuss with their partner how the program could be modified to make the test more suitable for younger pupils. When taking feedback, use the program in the MakeCode editor to allow pupils to make the changes and run the program to see the impact (see speaker notes for suggestions).",
     "Getting Active (20 minutes)",
     "Display slide 6 and explain to pupils that a family wishes to become more active but each member of the family has a different idea of what activity they should do.",
     "Give out dice, large sheets of paper and a marker pen to each small groups or pairs and explain you would like them to create a solution so that an activity is randomly selected for the family (slide 7). Invite pupils to share their initial ideas with the class and discuss these ideas to further stimulate the pupils’ thinking.",
     "Give pupils time to identify how they can use the equipment given to help a family decide what activity to do and then write an algorithm to instruct the family on how to use the equipment to select which activity to do using the activity selector worksheet (see examples on slide 13).",
     "Solving the problem with micro:bit (15 minutes)",
     "Display slide 8 and explain to pupils that their next task is to consider how a micro:bit can be incorporated into their solution. Invite pupils to respond to the questions on the slide and discuss these ideas as a class.",
     "Give pupils time to respond to the questions on the reverse side of the activity selector worksheet and give them copies of the help cards (print-outs of slides 10 & 11) to help structure their thinking.",
     "Review their ideas and if you wish, use slide 9 to review the learning objectives of the lesson."
    ],
    "extension": [
     "Pupils could write an algorithm to represent the program that they will write to use a micro:bit as an activity selector."
    ],
    "differentiation": [
     "Support: Pupils can work in an adult-led group to plan a solution that selects between three different activities. Use slide 12 of the lesson presentation to help pupils identify which activity the family will do when each pair of numbers (1&2, 3&4, 5&6) are rolled. After pupils have identified this, they can write the algorithm as a shared writing activity.",
     "Stretch & challenge: Pupils could be challenged to write a more detailed algorithm to instruct the family how to use the equipment to select which activity to do."
    ],
    "assessment": [
     "Informal observation of pupils understanding of how random number variables are set and used through class discussions and paired activities.",
     "More formal assessment of pupils’ written algorithms if wished."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-active2-5",
    "title": "Programming an activity picker",
    "pages": 9,
    "intro": "In this final lesson, pupils apply their understanding of variables and setting random numbers by programming a useful gadget to promote fitness; they explain which outputs in a program are the most and least likely and use their algorithms from the previous lesson to program a micro:bit to help a family select which activity to partake in. After testing their solution, they evaluate their solution to identify its strengths and areas for improvement.",
    "materials": "images predictions, activity selector example, activity selector support",
    "objectives": [
     "To debug programs involving random number variables",
     "To write programs that use random number variables",
     "To evaluate a solution effectively"
    ],
    "activities": [
     "Introduction: Image predictions (10 minutes)",
     "Programing the micro:bit (40 minutes)",
     "Evaluating your solution (10 minutes)",
     "Introduction: Image predictions (10 minutes)",
     "Display slide 3 and provide pupils with a printout of the slide. Ask pupils to work with a partner to discuss their responses to the questions on the slide (see speaker notes for suitable answers).",
     "Open the file images predictions project in the MakeCode editor and invite pupils to use this to provide justifications for their answers when giving feedback to the questions.",
     "Invite pupils to show how they would debug the program so that each image has an equal chance of being chosen.",
     "Programing the micro:bit (40 minutes)",
     "Give out the algorithms pupils created in the previous lesson and display slide 4. Invite pupils to refer to their work from the previous lesson to recall the problem they were presented with and the solutions they developed including how they intend to use a micro:bit as part of their solution.",
     "Explain to pupils that they are going to work with their partners to program a micro:bit using the MakeCode editor so it provides a solution to help a family become more active. Remind pupils that they should use the simulator to test their program, testing and debugging as they go.",
     "Give out sets of help cards to pupils (slides 7 & 8) and explain that they can use these to help structure their program. Remind pupils that before they can use a variable in their program that they must create one. Invite a pupil to demonstrate how to create a variable. Hints on how to do this are contained within the help cards.",
     "Give pupils time to work in pairs to program micro:bits using the MakeCode editor, following their algorithms from the previous lesson.",
     "If you have access to physical micro:bits, when pupils are happy that their program works, ask them to download their progra, file and transfer it to their micro:bit to test how it works on the device.",
     "An example of how the program may look can be found with the lesson downloads and in MakeCode: activity selector example project hex file",
     "Evaluating your solution (10 minutes)",
     "Display slide 5 and explain to pupils that they are going to evaluate their solution to the problem to identify its strengths and the areas that need to be improved.",
     "Give out copies of evaluating your solution worksheet and ask pupils to work with their partners to identify the aspects of their solution that they are happy with and how their solution might be improved. Pupils’ improvements should not be governed by their knowledge of how to write the program.",
     "Invite pupils to share their evaluations with the class. Ask other pupils if they had selected similar strengths/areas for improvement and invite ideas from pupils as to how the identified improvements could be made. (A possible area for improvement could be to remove each activity once it has been chosen and then reset once all the activities have been selected).",
     "If you wish, use slide 6 to review the learning objectives of the unit."
    ],
    "extension": [
     "Pupils could write a set of instructions to allow a family to personalise the device: change the names of the activities that are selected; change the range of numbers from which the random number is selected to reflect the number of people in the family."
    ],
    "differentiation": [
     "Support: Pupils write a shorter program selecting three activities as identified in their planning from the previous lesson. Pupils could be given a scaffolded program ( HYPERLINK \"https://makecode.microbit.org/\" \\l \"pub:_T97Uqy9mJ3va\" activty selector support project hex file) to offer further support with writing the program.",
     "Stretch & challenge: Pupils could be challenged to replace the words/images used to communicate the activity selected with a short animation."
    ],
    "assessment": [
     "Informal observation of pupils understanding of how variables are used and their evaluations through class discussions and paired activities.",
     "More formal assessment of pupils’ programs if wished."
    ]
   }
  ]
 },
 {
  "slug": "oceans",
  "title": "Healthy oceans",
  "emoji": "🌊",
  "order": 13,
  "description": "",
  "skills": [
   "Sensors",
   "Input/output",
   "Algorithms",
   "Flowcharts",
   "IoT",
   "Electronics"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-oceans-1",
    "title": "Lesson 1",
    "pages": 12,
    "intro": "",
    "materials": "micro:bit(s) x2, battery peripheral, materials to make the floating base, additional sensor peripherals (optional)",
    "objectives": [
     "Understand what the Global Goals are",
     "Understand what goal 14 is and its significance",
     "Understand the basics of transmitting data",
     "Produce a data node product to meet the success criteria",
     "Develop the product further with additional features",
     "Engagement – How can I engage learners?"
    ],
    "activities": [
     "Introduction to the Global Goals concept",
     "Introduction to the ‘life below water’ goal",
     "Discuss why this goal is important and what may happen if we ignore it",
     "Introduce the success criteria and discuss initial ideas on how to solve the problem",
     "Explain how this is a simplified version of how it would work in real life (IRL) using the diagram (optional)",
     "Introduce what will be sensed by the micro:bit for this product",
     "Discuss the sensors on the micro:bit and how other sensors can be used (if available)",
     "Introduce the IPO (input-process-output) model and go through the IPO and relate to the success criteria",
     "Put learners into small groups (2+) and explain that they will work as a team to design and build a product that meets the success criteria. Remind learners about the importance of communication and collaboration and how the designs should be reflected in the product",
     "Provide the learners with the activity sheet, micro:bits and making resources, learners will need to extend the algorithm as only the first two steps are demonstrated",
     "Get the learners to start to design and create the product in their groups",
     "Encourage learners to use the IPO worksheet to plan their additional features",
     "This lesson could easily be extended over 2 or more lessons to allow learners to fully explore their product and develop it beyond the brief",
     "Making",
     "BEWARE do not test the products in water, micro:bits are not waterproof!",
     "This activity includes making the product and also a case to contain the micro:bit, battery and any other peripherals used. The node and gateway will need different types of cases as both have different requirements",
     "The product will need to be tested, so a mock-up of a floating base will need to be made but do not test it in water as this could be dangerous and could damage the equipment"
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 2,
    "slug": "mbu-oceans-2",
    "title": "Lesson 2",
    "pages": 22,
    "intro": "",
    "materials": "micro:bit(s), battery peripheral and batteries, materials to make the floating body and paddles, servo control board, servo motors, a sponge to simulate the smart material",
    "objectives": [
     "Understand what the Global Goals are",
     "Understand what goal 14 is and its significance",
     "Produce an Oil Spill Cleaner-Upper product to meet the success criteria",
     "Develop the product further with additional features",
     "Engagement – How can I engage learners?",
     "Learners may be engaged and motivated by the Global Goals context"
    ],
    "activities": [
     "Introduction to the Global Goals concept",
     "Introduction to the ‘life under water’ goal",
     "Discuss why this goal is important and what may happen if we ignore it",
     "Introduce the success criteria and discuss initial ideas on how to solve the problem",
     "Discuss the concept of an autonomous drone boat and how it might look and work",
     "Discuss how the smart material that soaks up the oil will be towed behind the boat and how we can simulate it using a sponge",
     "Discuss the IPO (input-process-output) process and discuss the suggested pattern for the boat to follow",
     "If needed, draw a flow chart that represents the steps needed and discuss which computational techniques would be best suited to efficiently implement the algorithm",
     "OPTIONAL: create the algorithm using a sprite on the micro:bit",
     "Remind learners to refer back to the success criteria",
     "The build:",
     "Introduce the concept of the paddle wheel and why we need two servos (to allow steering)",
     "If needed, look at the suggested design for the boat and discuss",
     "Introduce the servo control board and if needed go over how to add the extension to MakeCode",
     "Encourage learners to design the algorithm and the boat before making it, encourage them to consider the materials and their suitability for use on water",
     "Provide the learners with the activity sheet, micro:bits and making resources, learners will need to extend the algorithm as only the first two steps are demonstrated",
     "Troubleshoot the making and programming and intervene where necessary",
     "Remind learners to refer back to the success criteria",
     "Making",
     "BEWARE! Do not test the products in water. Micro:bits are not waterproof!",
     "This activity includes making the floating body of the product – do not test in water.",
     "The paddles also need to be carefully designed and made so that the servos can move them, they will need to light weight enough for the servo you use",
     "The servos need to sit above the water line (as in the schematic in the activity sheet)"
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "seacreatures",
  "title": "Saving sea creatures",
  "emoji": "🐠",
  "order": 14,
  "description": "",
  "skills": [
   "Input/output",
   "Selection",
   "14 Life below water",
   "Design challenge summary",
   "bit.",
   "bit’s LEDs."
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-seacreatures-1",
    "title": "Lesson 1",
    "pages": 8,
    "intro": "In this activity students learn about the problem of bycatch (unwanted fish and other marine creatures trapped by commercial fishing nets during fishing for a different species), the impact of it and potential solutions, before creating a prototype light-up fishing net using a micro:bit.",
    "materials": "",
    "objectives": [
     "To learn about the problem of ‘bycatch’ and its impact on marine ecosystems",
     "To identify possible solutions to the problem",
     "To learn how inputs (sensors) and outputs (lights and sound) of the micro:bit can be used to design and make prototype solutions"
    ],
    "activities": [
     "What is bycatch?",
     "Write the word ‘bycatch’ on the board and ask students to consider what it could mean.",
     "Give students time to research the problem of bycatch and share their learning with the class (slide 2). Students could be grouped to consider and then share:",
     "What is bycatch?",
     "Why does bycatch happen?",
     "What are the impacts of bycatch?",
     "What solutions already exist to reduce bycatch?",
     "Discuss what students may have already discovered about solutions to the problem of bycatch, or give them time to research these (slide 3) e.g.",
     "Simple modifications to fishing gear, so birds, fish, turtles, dolphins etc. are not caught or can escape",
     "Using specially designed types of hooks and nets",
     "Using technology to allow fishermen to see inside their nets and use sound devices to deter species they do not intend to catch",
     "Light-up fishing nets",
     "Discuss with students what they have found out about LED nets (slide 4). Fitting LEDs on nets can help to reduce bycatch in a cheap and simple way - the lights act as a visual warning for turtles and birds, but don’t affect the amount of fish caught in the nets.",
     "Introduce the idea of using a micro:bit to build a prototype of an LED net that also could emit a high frequency pulsed sound.",
     "Explore how the fishing nets could work. The example prototype on slides 5 & 6 (and supplied light-up nets hex file) turns on micro:bit’s LEDs when the light level is below a certain point (assuming a certain sea depth) and emits a high frequency pulsed sound.",
     "Depending on your students you could:",
     "Use the example light-up nets program to introduce the theory and application of selection (IF statements), sensors (light sensors) and outputs (LED display).",
     "Explore what the problems/issues with the example prototype are (the best LEDs for reducing bycatch are green, making it waterproof etc.)",
     "Give students some fish netting and other materials to work out how to attach the light to the net – see safety note below.",
     "Use the algorithm and program as a starting point and ask students to improve the prototype.",
     "Encourage students to create their own prototype algorithm and program, without referencing the example.",
     "Let students create their own prototype for addressing bycatch.",
     "Safety",
     "Do not use BBC micro:bits in water or with wet hands. Prototyping should be done without water present.",
     "Review",
     "Discuss with students what they have learnt from their exploration of bycatch and the prototype they have created (slide 7).",
     "Allow students time and space to consider other ways they could help prevent bycatch, through the design challenge."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 2,
    "slug": "mbu-seacreatures-2",
    "title": "Lesson 2",
    "pages": 10,
    "intro": "In this activity students discover all about sea turtles before creating a prototype sea turtle safe beach light using micro:bit’s LEDs.",
    "materials": "",
    "objectives": [
     "To discover more about the threats faced by sea turtles",
     "To learn about efforts to help them",
     "To learn how micro:bit inputs (sensors) and outputs (LED lights) can be used to make a prototype to help protect sea turtles"
    ],
    "activities": [
     "Discovering sea turtles",
     "Find and play a suitable short video clip to introduce sea turtles.",
     "Ask students to share what they currently know about sea turtles (if anything).",
     "Give students time in pairs or small groups to find more about sea turtles and share their research (slide 2).",
     "Students could prepare a short presentation, poster or video to share what they have discovered about sea turtles.",
     "Sea turtles in trouble",
     "Highlight that sea turtles are in trouble and their numbers are falling. Ask students to share why they think this is. They may have come across this in their research, or if not, give them time find out the main issues for sea turtles and the reasons behind them (slide 3), e.g.",
     "Illegal trade for sea turtles (meat, eggs, shells etc)",
     "Fishing (bycatch is a particular issue)",
     "Habitat loss (human activity on beaches for nesting, coral reef damage)",
     "Climate change (e.g. increased temperature & impact on sex of hatchlings)",
     "Plastics (sea turtles eat jellyfish which floating plastics can look similar to)",
     "Tourism (irresponsible tourism)",
     "How can we help sea turtles?",
     "Give students time to research and/or share what is being done to help sea turtles (slide 4), e.g.",
     "Campaigns to stop illegal trade",
     "Educating locals and tourists",
     "Protecting habitats (especially beaches, e.g. beach rangers and ‘beach safe’ lighting)",
     "Helping hatchlings",
     "Invite students to share what they have already found out about sea turtle hatchlings, why they need special protection and what is already being done to help (slide 5).",
     "Introduce the idea of using micro:bit to help sea turtles hatchlings in some way and encourage students to brainstorm some possible ideas.",
     "If you have time, and students have discovered that sea turtles use the earth’s magnetic field to navigate to nesting areas, you could have some fun exploring using micro:bit’s compass (magnetometer) to illustrate this.",
     "micro:bit turtle-safe beach light",
     "Explain that you are going to work through an example together – creating sea turtle safe beach lighting using micro:bit .",
     "Recap / explore what the issues are around beach lighting and hatchlings and how a micro:bit beach-safe light could help (slide 6).",
     "Explore how the beach-safe light could work. The example prototype uses micro:bit’s LED to emit a low wattage, red light in a turtle shape (see algorithm starter and code on slides 7 and 8, published project here and supplied Sea turtle light hex file).",
     "Depending on your students you could:",
     "Use the example to introduce theory and application of selection (IF statements), sensors (light sensors) and outputs (LED display).",
     "Explore what the problems/issues with the example prototype are.",
     "Use the algorithm and program as a starting point and ask students to improve the prototype.",
     "Encourage students to create their own prototype algorithm and program, without referencing the example.",
     "Give students other materials to create a full light prototype.",
     "Let students create their own prototype for helping turtles that is not a beach light.",
     "Review",
     "Discuss with students what they have learnt from their exploration of protecting sea turtles and the prototype they have created (slide 9).",
     "Allow students time and space to consider other ways they could help sea turtles, or other endangered marine life, through the design challenge."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "plants",
  "title": "Helping plants grow",
  "emoji": "🌱",
  "order": 15,
  "description": "",
  "skills": [
   "Communication",
   "IoT",
   "Input/output",
   "Electronics",
   "15 Life on land",
   "Plants"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-plants-1",
    "title": "Lesson 1",
    "pages": 11,
    "intro": "",
    "materials": "micro:bit(s) x 2, battery peripheral, materials to make a tree to test the product",
    "objectives": [
     "Understand what the Global Goals are",
     "Understand what goal 15 is and its significance",
     "Understand the basics of IoT",
     "Produce an IoT ‘tree protector’ product to meet the success criteria",
     "Develop the product further with additional features",
     "Engagement – How can I engage learners?"
    ],
    "activities": [
     "Introduction to the Global Goals concept",
     "Introduction to the ‘life on land’ goal",
     "Discus why this goal is important and what may happen if we ignore it",
     "Introduce the success criteria and discuss initial ideas on how to solve the problem",
     "Explain how this is a simplified version of how it would work in real life (IRL) using the diagram",
     "Introduce what will be sensed by the micro:bit for this product",
     "Introduce the IPO (input-process-output) model and go through the IPO for the first success criteria",
     "Provide the learners with the activity sheet, micro:bits and making resources, learners will need to extend the algorithm as only the first two steps are demonstrated",
     "Put learners into small groups (2+) and explain that they will work as a team to design and build a product that meets the success criteria. Remind learners about the importance of communication and collaboration and how the designs should be reflected in the product",
     "Get the learners to start to design and create the product in their groups",
     "Encourage learners to use the IPO worksheet to plan their additional features",
     "This lesson could be extended over 2 or more lessons to allow learners to fully explore their product and develop it beyond the brief.",
     "Making",
     "This activity includes making the product and a case to contain the micro:bit, battery and any other peripherals used. The node and gateway will need different types of cases as both have different requirements",
     "The product will need to be tested, so a mock-up of a falling tree will need to be made/sourced"
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 2,
    "slug": "mbu-plants-2",
    "title": "Lesson 2",
    "pages": 16,
    "intro": "",
    "materials": "micro:bit(s), USB cable, 3v dual relay module, Micro:bit breakout board, Moisture sensor, Header wires (male and female)",
    "objectives": [
     "Understand what the Global Goals are",
     "Understand what goal 15 is and its significance",
     "Understand the basics of transmitting data",
     "Produce a data node product to meet the success criteria",
     "Develop the product further with additional features",
     "Engagement – How can I engage learners?"
    ],
    "activities": [
     "Introduction to the global goals concept",
     "Introduction to the ‘life on land’ goal",
     "Discus why this goal is important and what may happen if we ignore it",
     "Introduce the success criteria and discuss initial ideas on how to solve the problem",
     "Explain how this is a simplified version of how it would work in real life (IRL) using the diagram in the slides",
     "Introduce the input, process, output (IPO) model and discuss what will be sensed by the micro:bit for this prototype (use the IPO table on the slides/activity sheet) and relate to the success criteria",
     "Discuss the sensors on the micro:bit and how other sensors can be used (if available)",
     "Put learners into small groups (2+) and explain that they will work as a team to design and build a prototype that meets the success criteria.",
     "Remind learners about the importance of communication and collaboration and how the designs should be reflected in the product",
     "Provide the learners with the activity sheet, micro:bits, peripherals and making resources",
     "Get the learners to start to design and create the prototype in their groups",
     "Encourage learners to use the IPO worksheet to plan their additional features",
     "Making",
     "This project does not involve building anything but does involve wiring together different components which can prove fiddly. Be prepared to troubleshoot loose wires, short circuits and troublesome components."
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "animals",
  "title": "Protecting animals on land",
  "emoji": "🦌",
  "order": 16,
  "description": "",
  "skills": [
   "Algorithms",
   "Variables",
   "Selection",
   "Communication",
   "15 Life on land",
   "Product design"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-animals-1",
    "title": "Lesson 1",
    "pages": 9,
    "intro": "In this activity students consider the wildlife they see in their local habitat and consider how important it is. They then create a micro:bit counter to record different species.",
    "materials": "",
    "objectives": [
     "Apply micro:bit coding (MakeCode) to the unit theme.",
     "Plan, build, test and debug a working program.",
     "Discuss and evaluate how the technology helps solve a real-world problem."
    ],
    "activities": [
     "What kind of wildlife is in your local area?",
     "Discuss with students and create a list together (slide 2)",
     "You could go out on a nature walk together to spot different species",
     "Why does it matter what wildlife is in our local area?",
     "Discuss with students the importance of wildlife in your local environment (slide 3).",
     "E.g.",
     "the role wildlife plays in local ecosystems and balancing the local environment",
     "the different habitats they observe in your local area",
     "any changes that have occurred and possible reasons (e.g. an environmental disaster/a gradual observed decline in a species over time)",
     "Students could create ‘fact files’ or food chain posters for a local ecosystem or species of their choosing",
     "How can we monitor the wildlife in our local area?",
     "Discuss how recording different species can help to monitor your local ecosystem (slide 4)",
     "Explore the ways in which this could be done",
     "Ask students to decide what species they’d like to ‘spot’ (slide 5)",
     "Creating a micro:bit species counter",
     "Introduce using micro:bit as a counter and explore with students how it could be used effectively (slides 6 and 7)",
     "Depending on your students’ experience they could:",
     "collaboratively write an algorithm for how the counter would work before programming it (developing important computational thinking skills - see example).",
     "be given starting block(s) and then work out the rest of the program",
     "write their own program and extend it beyond the simple species counter HEX file example supplied",
     "Wildlife survey",
     "Give students time to spot and count their chosen species using their counters",
     "Collect, analyse and, if you wish, present the data (slide 8)",
     "what does the data show?",
     "what species are least/most prevalent?",
     "what surprises are there?"
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   },
   {
    "n": 2,
    "slug": "mbu-animals-2",
    "title": "Lesson 2",
    "pages": 9,
    "intro": "In this activity students consider the illegal wildlife trade, with a focus on poaching. They then create their own micro:bit anti-poaching collar.",
    "materials": "",
    "objectives": [
     "Apply micro:bit coding (MakeCode) to the unit theme.",
     "Plan, build, test and debug a working program.",
     "Discuss and evaluate how the technology helps solve a real-world problem."
    ],
    "activities": [
     "What is the illegal wildlife trade?",
     "Discuss with students what they know, giving them time to research and present their findings if you wish (slide 2). e.g.",
     "What is the illegal wildlife trade?",
     "Why does it exist?",
     "What are the impacts?",
     "What animals are endangered? Focus if you can on your own country/continent and especially less well-known examples.",
     "A focus on poaching",
     "Invite students to focus on poaching and share what they know, or research to find out (slide 3). Encourage them to look at deeper issues (e.g. social media driving increased demand, poverty of local communities driving people to poach). e.g.",
     "What is poaching?",
     "What are the biggest issues with poaching (locally if appropriate)",
     "What efforts are being made to stop poaching and how successful are they?",
     "Students could focus on area that they find interesting and create a presentation or video to share with others.",
     "How could technology help?",
     "Give students time to creatively consider ways technology could help with poaching (slide 4) e.g.",
     "Tracking animals (there are many examples online)",
     "Helping local communities",
     "Educating people about the issues",
     "Creating a micro:bit anti-poaching collar",
     "Introduce the idea of using micro:bit as an anti-poaching collar and invite students to consider how it could help and potential issues (slide 5).",
     "Consider the example algorithm and code (slides 6 and 7) and depending on your students’ experience they could:",
     "Write an algorithm and program for a simple micro:bit anti-poaching collar",
     "Be given starting block(s) and then work out the rest of the program",
     "Write their own program and extend it beyond the example code (collar transmitter and receiver and supplied HEX files collar transmitter and collar receiver)",
     "Create and program their own physical micro:bit anti-poaching collar",
     "Note: ensure students use different radio group numbers and alert message messages so they have their own groups and do not trigger each other’s alarms.",
     "Presenting collars",
     "Give students time to present their collars and encourage some simple evaluation (slide 8). e.g.",
     "What are they pleased with and would work well?",
     "What would need further research and development?"
    ],
    "extension": [],
    "differentiation": [],
    "assessment": []
   }
  ]
 },
 {
  "slug": "natureart",
  "title": "Nature art",
  "emoji": "🎨",
  "order": 17,
  "description": "Four lessons designed for students aged 7-8 years as an introduction to computational thinking and the BBC micro:bit. They learn how to create nature abstractions by taking a nature walk, using art materials and then using the LEDs on micro:bit. They'll develop an understanding of several key computational thinking concepts, including logical reasoning, abstraction, algorithms and evaluation. Students then develop their programming and debugging skills and are introduced to working with outputs.",
  "skills": [
   "Abstraction",
   "Algorithms",
   "Sequence",
   "Representation",
   "Drawing"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-natureart-1",
    "title": "Representing nature",
    "pages": 12,
    "intro": "In this ‘unplugged’ lesson pupils use traditional art techniques to represent images collected on a nature walk. They consider the rules and the processes when working with the different materials, developing their logical reasoning and algorithmic thinking, and evaluate their work.",
    "materials": "",
    "objectives": [
     "To use logical reasoning when making predictions",
     "To abstract relevant detail from a nature image",
     "To create nature representations using a variety of art materials"
    ],
    "activities": [
     "Nature walk – prior to the lesson",
     "Introduction: representing images (10 minutes)",
     "Creating artistic representations (40 minutes)",
     "Evaluating artistic representations (10 minutes)",
     "Nature walk (prior to the lesson)",
     "Prior to the unit take pupils on a local area nature walk during which they record examples of flora and fauna they observe, ideally by recording digital images using a digital camera, tablet, etc.",
     "You will also need to conduct an internet search for suitable images to display showing sketches, drawings, paintings and sculptures of animals, plants and flowers.",
     "You may wish to set up the classroom for this lesson so there are 3 art-zones e.g. an area for sketching, an area for painting and an area for sculpting. Images of each area could be taken in order to support pupils algorithmic writing in the next lesson.",
     "Introduction: Representing images (10 minutes)",
     "Remind pupils of their nature walk and ask them to share some examples of nature they observed (slide 3). You could also display the digital images you collected to help stimulate conversation.",
     "Show pupils the images of drawings/paintings/sculptures of animals/plants/flowers you collected prior to the lesson and invite pupils to group the images in different ways, including based on the techniques used to create them (painting, sketching, sculpting). Discuss briefly how they could represent the images from the nature walk using these techniques.",
     "If using, draw pupils’ attention on each of the art-zones in the classroom and ask them to predict what type of representations would be created in each. Ask pupils to justify their predictions by using the equipment that is on the table as evidence, e.g. ”I think we will be doing sculpting in this zone because there is clay, clay tools and water”.",
     "Use slide 4 to explain/remind pupils that when they make predictions like this, they are using logical reasoning.",
     "For each zone, ask pupils to give instructions on how the equipment should be used and add any additional rules based on your classroom context.",
     "Creating artistic representations (40 minutes)",
     "Provide pupils with a selection of images recorded on the nature walk. Ask them to pick one they find interesting and explore how they can use represent the image using the given materials in each area (slide 6).",
     "Explain to pupils that the entire image doesn’t have to be represented and that for some images it might be easier to select part of the image to represent. Invite pupils to suggest which parts of a tree, plant, animal, etc. could be represented (leaf from a tree, tail of a squirrel, flower of a plant).",
     "Use slide 7 to explain to pupils that when they select part of the image to represent they are using a computer science concept called abstraction.",
     "Allow pupils sufficient time to produce a representation in each art-zone. Using a tablet or a digital camera, record images of the pupils’ artwork for use later in the unit.",
     ".",
     "Evaluating artistic representations (10 minutes)",
     "Show slide 8 and invite pupils to share their representations with the rest of the class, asking them to state what part of their representation they are most happy with and what changes they would make.",
     "Lead a class discussion around which art materials created the most effective representations and why.",
     "Use slide 9 to highlight to pupils that they have just been evaluating their work and ask pupils why it is important to identify the success and areas for improvement for any piece of work.",
     "Use slides 10 and 11 to review the learning outcomes of the lesson and the key computing concepts covered."
    ],
    "extension": [
     "Pupils could research the work of wildlife artists like David Shepherd, Carol Gillian and Charley Harper and identify similarities and differences between the representations."
    ],
    "differentiation": [
     "Support:",
     "Pupils who may require additional support when creating artistic representations could be grouped together and supported by an adult as they use each art zone.",
     "Stretch & challenge:",
     "Pupils may wish to spend more time in one art-zone to produce a more detailed representation using the given art materials."
    ],
    "assessment": [
     "Informal observations of pupils’ use of logical reasoning when making predictions during class discussions.",
     "More formal assessment of pupils’ use of abstraction when selecting the detail to represent and of their final artistic representations."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-natureart-2",
    "title": "Art algorithms",
    "pages": 12,
    "intro": "In this ‘unplugged’ lesson, pupils recap their understanding of algorithms before writing their own algorithms to show how they created their nature representations in lesson 1 of the ‘Nature art’ unit.",
    "materials": "",
    "objectives": [
     "To know and understand what algorithms are",
     "To write algorithms with clear instructions",
     "To test and debug algorithms"
    ],
    "activities": [
     "Recapping representations (5 minutes)",
     "Constructing algorithms (20 minutes)",
     "Paired algorithmic writing (20 minutes)",
     "Reviewing algorithms (15 minutes)",
     "Introduction: Recapping Representations (5 minutes)",
     "Display slide 3 and use the questions to encourage pupils to recap the representations they created in the previous lesson.",
     "Use slide 4 to recap the computing concepts covered. Explain you will be focusing on one more important computing concept today.",
     "Constructing Algorithms (20 minutes)",
     "Use slide 5 to display a sequence of instructions (an algorithm) and ask pupils to think/pair/share what it is for (getting ready for school in the morning).",
     "Ask pupils if they know the word for a sequence of instructions in computing (an algorithm) and explain that they are going to write an algorithm that shows how they created their nature representations in the previous lesson (slide 6).",
     "Invite pupils to share their current level of understanding of algorithms, if possible, showing algorithms they constructed in previous years (discuss with the computing subject leader and/or staff from earlier year groups, e.g. England KS1).",
     "Draw pupils’ attention to the equipment and materials used last lesson along with large pieces of paper to pairs and ask them to write down the first 3 steps they took last lesson.",
     "Discuss these as a class to correct any misunderstandings and ask pupils to consider if the statements they have written would give instructions to people. Allow pupils time to change their statements to instructions and invite suggestions on the instructions they have created, recording them on the whiteboard and focusing on the use of the imperative verb.",
     "Use slide 8 to recap on the term debugging and discuss the importance of pupils do this as they work.",
     "Paired Algorithmic Writing (20 minutes)",
     "Give each pair a copy of the word bank containing useful verbs in the imperative form and the names of the equipment and materials used.",
     "Give pupils time to work in pairs to create their algorithm, using a fresh piece of paper if they wish.",
     "Encourage pupils to read and act out their instructions to each other in order to test and debug their algorithm as they go.",
     "Reviewing Algorithms (15 minutes)",
     "When their algorithms have been completed, invite pairs to share their algorithm with another pair. Use slide 10 to guide pupils’ evaluation of the other pair’s algorithm. Pairs should feedback their evaluations to each other.",
     "Invite pupils to share with the rest of the class the changes they might need to make to their algorithms more accurate. Recap on the name of the process pupils are undertaking (debugging).",
     "Use slide 11 to review the learning outcomes of the lesson and invite pupils to think/pair/share how they have met these."
    ],
    "extension": [
     "Pupils could use presentation software and combine text-based instructions with digital images to write their algorithm."
    ],
    "differentiation": [
     "Support:",
     "The algorithm support sheet can be given to pupils to help them sequence statements into an algorithm.",
     "Stretch & challenge:",
     "Pupils could write an additional algorithm that explains how to use the art materials in one of the art-zones to produce a representation e.g. clay for sculpting, or be challenged to create a more detailed algorithm with additional steps."
    ],
    "assessment": [
     "Informal observations of pupils understanding of algorithms, debugging and evaluation during class discussions.",
     "More formal assessment if wished of the final algorithms."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-natureart-3",
    "title": "Digital nature representations",
    "pages": 16,
    "intro": "In this lesson, pupils are introduced to the micro:bit and how images can be represented by using the LEDs. They create visual algorithms to plan simple images before writing programs using the MakeCode editor to create their images.",
    "materials": "",
    "objectives": [
     "To understand that LEDs can be used to create image representations.",
     "To plan LED image representations.",
     "To construct programs to display LED image representations with the micro:bit."
    ],
    "activities": [
     "Introduction: micro:bit nature art (5 minutes)",
     "Representing images with LEDs (10 minutes)",
     "Planning LED images (10 minutes)",
     "Programming LED representations (10 minutes)",
     "Paired programming (15 minutes)",
     "Evaluating images (10 Minutes)",
     "Introduction: micro:bit nature art (5 minutes)",
     "Explain to pupils that they are going to view some representations of nature created using micro:bit.",
     "Invite pupils to remind you what logical reasoning is and ask them to predict what plants/animals the images you are about to show them created on the micro:bit may represent.",
     "Show pupils the images on slide 3 and allow them to discuss their ideas with a partner before taking feedback. Guide pupils towards justifying why they think a specific plant/animal has been represented.",
     "Use slide 4 to invite pupils to look at the images again and identify anything that all the images have in common. Invite predictions on how they think the representations have been created.",
     "Representing images with LEDs (10 minutes)",
     "Use slide 5 to introduce pupils to the micro:bit if needed, or as a recap.",
     "Focus on the set of LEDs (light emitting diodes) on the micro:bit. Explain that these are an example of an output (slide 6) and that can be controlled (turned off or on) using code.",
     "Ask pupils to discuss and share how they think the images seen on the previous slides were created (e.g. which LEDs are switched on/off?)",
     "Open the simple images 1 program in the MakeCode editor and view the simulator in full screen mode. Run the program and ask pupils to identify what images are being represented, using the restart button to re-run the program. You can also use the MakeCode hex file provided.",
     "When taking feedback, ask pupils to identify what it was about the image that made them think it was a representation of that item (remind them by making predictions using the available evidence they are using logical reasoning).",
     "Show pupils the LED planner (slide 7) and invite suggestions on how this could be used to plan which LEDs would need to be turned on or off to represent a given image. Highlight that this is a simple visual algorithm that can be used for someone to program a micro:bit.",
     "Using slide 8, model as a class how to use the planner to create an image of a sad face. Ask pupils what parts of a face would be most likely convince someone else that it was a representation of a sad face. Explain that they are, as in lesson 1, using abstraction to highlight the most important information and disregard the parts that are not required.",
     "While recording, shade in a wrong LED and explain to pupils that by using pencils to plan the images changes can be made by rubbing out selected LEDs. Invite suggestions, on the name of the process by which errors are found and fixed as they did with their algorithms in lesson 2 (debugging).",
     "Planning LED images (10 minutes)",
     "Give pupils a copy of the ‘Items to represent with LEDs’ and LED planner sheets and ask them to use them to plan their representations of at least one of the items on the list.",
     "Programming LED representations (10 minutes)",
     "Recap the term ‘program’ (slide 9) and ask pupils to share their experience of programming so far.",
     "Explain that they are going to construct a simple program to show one (or more, if time allows) of their images on the micro:bit.",
     "Display slide 10 to introduce pupils to the MakeCode editor before opening the webpage and asking pupils to discuss the links between the program and the output on the simulator.",
     "Invite pupils (either as a class, or if more confident, in pairs), to program a different image by modifying the existing program. If a mistake is made - selecting a wrong LED - ask pupils to suggest how this problem can be overcome.",
     "Paired programming (15 minutes)",
     "In pairs, or small groups give pupils time to tinker with the MakeCode editor and construct programs to show the images that they created using the LED planner (slide 11 can be used to introduce paired programming).",
     "If possible, pupils should snip/screenshot an image of the simulator displaying their image and save this to a shared area on the school network or to presentation software, so you can later show the images to the rest of the class from your computer.",
     "Evaluating images (10 Minutes)",
     "Invite pairs/small groups to show the images they created to another pair/group or the rest of the class (slide 12). Ask the other pupils to share what they think the images represent.",
     "Ask pairs to discuss their programs with another pair, highlighting any mistakes they made whilst programming and how they overcame these (slide 13).",
     "Use slide 14 to review the learning outcomes of the lesson and ask pupils to think/pair/share their main learning points from the lesson."
    ],
    "extension": [
     "Pupils could compare the MakeCode language with other graphical programming languages they have used. Similarities may include blocks that connect together and blocks having different colours. Differences may include programs organised vertically instead of horizontally, and different words used on the blocks."
    ],
    "differentiation": [
     "Support:",
     "The first four (red, 1-4) items on the images to represent with LEDs sheet are items that can be represented with simple images. Pupils could be provided with images of the items they are representing.",
     "Stretch & challenge:",
     "The final four (purple, 9-12) items on the ‘images to represent with LEDs’ sheet provide an additional challenge due to the complexity of the image to be represented. Pupils will need to abstract the most important detail and ignore the other details in order to be able to create a representation. They could be challenged further to see how many different representations (abstracting different detail) they can create for a given item."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of how the LEDs are used to create images through class discussions.",
     "Informal observations of pupils understanding of how to use the MakeCode editor to write their program.",
     "More formal assessment if wished of the pupils’ plans for their image representations and code."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-natureart-4",
    "title": "Programming and evaluating representations",
    "pages": 16,
    "intro": "In this final lesson of the Nature art unit, pupils plan and program LED image representations of some of the flora and fauna observed on their nature walk using the MakeCode editor. They also evaluate their LED nature art and reflect on the elements of computational thinking they have used in this unit.",
    "materials": "",
    "objectives": [
     "To use logical reasoning to predict the output of programs",
     "To plan and construct algorithms and programs to create LED image representations",
     "To evaluate programs"
    ],
    "activities": [
     "What will the program show? (5 minutes)",
     "Representations of the nature walk (10 minutes)",
     "Planning and programing representations LED Images (30 minutes)",
     "Evaluating LED representations (15 minutes)",
     "Introduction: What does the program show? (5 minutes)",
     "Use slide 3 to show the pupils 4 simple programs that all create an image on micro:bit using the LEDs. State the image (e.g. star) and ask pupils to select the program that will create that image. Discuss how abstraction has been used to create these representations and invite them to discuss and share how they worked it out to highlight their use of logical reasoning.",
     "Representations of the nature walk (10 minutes)",
     "Display your chosen images taken during the nature walk and briefly ask pupils to recap the flora and fauna that they observed.",
     "Use slide 4 to explain that pupils are going to plan and program LED representations of some of these images using micro:bit.",
     "Invite suggestions from the pupils as to the steps they will need to take in order to complete this task and record this as an algorithm on the whiteboard (you can also use slide 5).",
     "If a recap is needed, ask pupils to model how to create a program for a simple image using the MakeCode editor, and if you are using micro:bits demonstrate how to download and flash the program to a micro:bit.",
     "Ask a pupil to model how to add a comment to code (right-click on the block and select add comment) and invite suggestions as to why this is good programming practice (makes it easier for someone else to follow the code, helps in debugging etc). Have a brief discussion about what comments would be helpful (the image, why they have used that code etc).",
     "Planning and programing LED nature art (30 minutes)",
     "Give pupils access to the digital images of the art work they created in lesson 1, or a selection of images taken on the nature walk.",
     "Ask them to work in pairs or small groups to choose and plan their LED nature art (using the image planner) before writing their programs using the MakeCode editor. If using micro:bit, pupils should also download their programs and flash them to their micro:bit.",
     "Remind pupils of the need to regularly test and debug their programs and add comments to their code.",
     "Evaluating LED representations (15 minutes)",
     "Use slide 6 to invite pupils to evaluate their LED nature art. Allow pupils to discuss their responses in their pairs/groups before giving them to sufficient time to independently complete the evaluation sheet.",
     "Use slides 7-13 to recap on the computational thinking concepts developed in this unit (the slides give pupils a definition and they should identify the correct concept) and slide 14 to review the learning objectives if you wish."
    ],
    "extension": [
     "Pupils could explore how to create a simple animation using the micro:bit by breaking their representation down into 3-5 stages. They can use the LED planner to sequence the construction of their LED nature art and then program using the MakeCode editor. An example of a completed program can be found here.",
     "Support:",
     "When evaluating, pupils could use the ‘Evaluating my LED nature art’ support sheet. If possible, this could be completed as an adult-led group where each question is discussed and a model answer scribed. In this case, pupils should complete this activity while others are discussing their evaluations.",
     "Stretch & challenge:",
     "Pupils can be challenged to sequence their representations into one program to represent the order in which the wildlife was found on the nature walk."
    ],
    "differentiation": [],
    "assessment": [
     "Informal observations of pupils’ planning and programming.",
     "More formal assessment if wished of the pupils’ programs and evaluation sheets."
    ]
   }
  ]
 },
 {
  "slug": "volcano",
  "title": "Volcano animations",
  "emoji": "🌋",
  "order": 18,
  "description": "This series of five lessons is aimed at students aged 8-9 years. Through a mixture of fun unplugged and programming activities related to animations, pupils develop their understanding of decomposition, flowchart algorithms and repetition. They then write, program and test an animation showing volcanic eruption using the LEDs on the BBC micro:bit.",
  "skills": [
   "Decomposition",
   "Algorithms",
   "Flowcharts",
   "Physical geography",
   "Iteration",
   "Product design"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-volcano-1",
    "title": "Animation & decomposition",
    "pages": 13,
    "intro": "In this ‘unplugged’ lesson pupils are introduced to the theme of animation and produce a thinking map based on the subject. They then develop their understanding decomposition by planning a dance sequence and creating a flipbook animation.",
    "materials": "",
    "objectives": [
     "To understand decomposition",
     "To use decomposition to create a dance sequence",
     "To create a flipbook animation of a dance sequence"
    ],
    "activities": [
     "Let’s dance (20 minutes)",
     "Introducing animation (15 minutes)",
     "Creating flipbooks (15 minutes)",
     "Sharing animations (10 minutes)",
     "Introduction: Let’s dance! (20 minutes)",
     "As pupils enter the classroom, play some music to get them in a dancing mood (e.g. YMCA).",
     "Give out large sheets of paper and explain to pupils that they are going to create a dance sequence to meet the criteria given on slide 3.",
     "Use slide 4 to introduce the concept of decomposition and invite suggestions to suggest how a dance sequence could be decomposed into smaller parts, one step at a time (slide 5).",
     "Explain that pupils need to use the large sheets of paper to record their sequence, in whichever way they want, as they create it.",
     "In small groups, give pupils time to design their dance sequence, decomposing each step on their paper.",
     "Invite pupils to perform their dance sequence to the rest of the class. If possible, display the large sheet of paper with the record of their sequence and invite suggestions on the accuracy.",
     "Highlight that their dance sequence is an algorithm that someone else could follow.",
     "Introducing animation (15 minutes)",
     "Explain to pupils that they are going to use the BBC micro:bit to create animations in this unit. Invite pupils to recap how they have previously used micro:bits and their ideas for how it might be used for animation (slide 6).",
     "Ask pupils to think/pair/share what they know about animation already. Use slide 7 to display a copy of a thinking map focusing on animation. Invite pupils to explain how the thinking map works and invite suggestions on what could be added to each section.",
     "Give out copies of the thinking map to pairs or small groups and ask them to complete their thinking map about animation. Once complete, share ideas as a class, adding them to a class-copy to display and discuss.",
     "Creating flipbooks (15 minutes)",
     "Explain to pupils that they are going to first create a simple form of animation based on their dance sequence to get them used to creating animation (slide 8).",
     "Show resources and invite suggestions as to the form of animation this could take, linking pupils’ responses to logical reasoning, by asking them to explain the reasoning behind their answers. Discuss examples of flipbook animations that pupils have experienced (e.g. the Dogman books by Dav Pilkey).",
     "Reveal that they are going to create a flipbook animation of their dance sequence.",
     "Ask pupils to model how to create a flipbook animation and invite suggestions on tips: use simple main image, make a small change between each picture, etc. Record and display their tips on a large sheet of paper or the board (slide 9).",
     "Give out packs of sticky notes and allow pupils time to produce a flipbook animation of their dance sequence.",
     "Sharing animations (10 minutes)",
     "Place each group’s set of flipbook animations on a table along with some additional sticky notes.",
     "Ask pupils to visit each table, watch the animation(s) and leave feedback (what worked well and even better if) on the sticky notes (slide 10).",
     "Highlight to pupils that their flipbooks are also algorithms as they could be used by someone to follow the sequence of their dance routine. Use slide 11 to recap the learning objectives of the lesson, focusing on asking pupils to share how they have used decomposition to create algorithms."
    ],
    "extension": [
     "Pupils could use plasticine figures and stop motion animation software to create an animation of their dance sequence. They could also create a ‘how to create a flipbook’ guide for other pupils to follow."
    ],
    "differentiation": [
     "Support: Pupils could use the animation support sheet and place each item in the corresponding area of the thinking map.",
     "Stretch & challenge: Pupils could undertake independent research into different types of animation and create a timeline showing these."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of decomposition and animation techniques.",
     "More formal assessment if wished of pupils’ flipbooks."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-volcano-2",
    "title": "Flowcharts & repetition",
    "pages": 14,
    "intro": "In this lesson pupils learn how algorithms can be written in the form of flowcharts by representing their dance sequence developed in the previous lesson. They then program this sequence using the micro:bit MakeCode editor and explore how the concept of repetition can be used to achieve animation.",
    "materials": "",
    "objectives": [
     "To understand the use of repetition",
     "To write simple flowchart algorithms using repetition",
     "To write programs based on algorithms using repetition"
    ],
    "activities": [
     "LEDs Dance (10 minutes)",
     "Flowchart algorithms (15 minutes)",
     "Programming animations (15 minutes)",
     "Exploring repetition (10 minutes)",
     "Reviewing repetition (10 minutes)",
     "Introduction: LEDs Dance (10 minutes)",
     "Display a copy of the LED Planner (slide 3) and ask pupils to consider how they have previously used the planner when working with the micro:bit (slide 4).",
     "Use this opportunity to recap on abstraction (developed in the Nature art and Digital flashcard units) and discuss how their dance sequence can be recorded on the LED planner.",
     "Ask pupils to record an image to represent each step, cut out each image and arrange them in the correct sequence (slide 5).",
     "Flowchart algorithms (15 minutes)",
     "Explain to pupils that they are going to explore how animation can be created using a micro:bit by planning and programming their dance sequence.",
     "Display slide 6 and ask pupils to explain what is being shown: an algorithm for washing your hands in the form of a flowchart. Ask pupils to identify any patterns they notice in the blocks that are used: start and stop blocks are oval, action boxes are rectangles.",
     "Explain that pupils are going to use the images from the LED Planner to create an algorithm in the form of a flowchart (slide 7). Invite pupils to suggest how this may look and model their ideas. If pupils do not address the need for delays between the images stimulate their thinking by asking how they can make sure that the image is displayed long enough for someone to see it.",
     "Give pupils time and materials to create an algorithm in the form of a flowchart using the images they have already created.",
     "Once finished, invite them to share their algorithm with another pair/group to test and debug as necessary.",
     "Programming animations (10 minutes)",
     "Display the MakeCode editor and invite pupils to show how to program a first image from a dance sequence algorithm as a class if this is helpful.",
     "Give pupils time to use the MakeCode editor to program their dance sequence animation. Remind pupils to test and debug their programs as they work.",
     "Remind pupils that if they need to debug their program, they should annotate their algorithm to represent the change. This is most likely to be a change in the time used for a delay.",
     "If you have access to physical micro:bits, ask pupils to transfer the program to their device.",
     "Exploring repetition (10 minutes)",
     "Use slide 9 to introduce pupils to repetition, an important concept in writing algorithms and programs. Invite suggestions on how repetition could be used in their algorithms and programs.",
     "Ask pupils to show on their flowchart algorithm by adding another step, how many times they want their animation to be repeated. Discuss where the block and the arrow from this block should go (slide 10).",
     "Ask pupils to tinker with and explore the blocks in the loops menu of the MakeCode editor to find a way to repeat their animation as identified in their algorithm. Encourage them to share their findings with each other until all pupils are able to include repetition in their program (slide 11).",
     "Reviewing repetition (10 minutes)",
     "Discuss pupils’ findings when exploring their use of repetition and invite pupils to model their findings on the whole class display screen (slide 12).",
     "Display the simple dance sequence program (included in the lesson downloads and link on slide 12) using the MakeCode editor and ask pupils to change the number of times it repeats to meet a given criteria (link this to your maths curriculum e.g. repeats given as Roman numerals VI, factors of 18, or multiples of 5 etc.).",
     "Invite pupils to recap what they have learnt about repetition and using flowchart algorithms in this lesson, using the learning objectives on slide 13 if you wish."
    ],
    "extension": [
     "Pupils could create a video in which they perform their dance sequence alongside their animation. They could also create flowchart animations for everyday tasks including repetition, such as cleaning teeth or tying shoelaces."
    ],
    "differentiation": [
     "Support:",
     "Pupils may benefit from working in a group led by an adult when constructing algorithms and writing programs. They can be encouraged to focus on just a few steps of their dance sequence.",
     "Stretch & challenge:",
     "Ask pupils to explore the effects that placing the repeat block in different places within their program has on the output."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of repetition.",
     "More formal assessment of pupils’ algorithms and programs."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-volcano-3",
    "title": "Planning eruption animations",
    "pages": 17,
    "intro": "In this ‘unplugged’ lesson pupils are introduced to the planning of a volcanic eruption animation for the BBC micro:bit. They apply the skills they have developed in the previous lessons, by decomposing the process into several stages and creating a flowchart-based algorithm to represent the animation for each stage.",
    "materials": "",
    "objectives": [
     "To decompose a process into stages",
     "To construct simple flowchart algorithms",
     "To use repetition in algorithms"
    ],
    "activities": [
     "Introduction: Recapping repeats (10 minutes)",
     "Decomposing volcanic eruptions (15 minutes)",
     "Planning volcanic eruption animation (25 minutes)",
     "Reviewing key concepts (10 minutes)",
     "Introduction: Recapping repeats (10 minutes)",
     "Display, and/or give out, copies of slide 3 and invite pupils to identify the block they were introduced to last lesson and the effect that it has on the program (repeat).",
     "Display slide 4 and ask pupils to identify similarities and differences between the three programs and which one would finish first/last if they all started at the same time and why (slide 4). Ensure pupils give reasons for their answers to encourage logical reasoning (see slide 4 speaker notes for answers).",
     "If you have access to micro:bits, ask pupils how their predictions could be tested before transferring the programs to different micro:bits and testing them out.",
     "Decomposing volcanic eruptions (15 minutes)",
     "Revisit the concept of decomposition and invite pupils to recall how they used it, and repetition, when creating their dance sequence animations (slide 5).",
     "Explain that pupils are going to make use of their knowledge and understanding of decomposition and repetition to make an animation of a volcanic eruption. Invite ideas on how these concepts might be used (slide 6).",
     "Display slide 7 and ask pupils to discuss with their partner the stages that the process of a volcanic eruption could be decomposed into (magma circulating in the chamber, magma rising through the vent, the eruption, lava creeping and cooling). Record possibilities for pupils to refer to later in the lesson.",
     "Planning volcanic eruption animation (25 minutes)",
     "Display slide 8 and use the questions to explain that pupils are going to plan (in the form of a flowchart algorithm) and program a volcanic eruption on the micro:bit using the MakeCode editor.",
     "Using an example from the previous lesson, remind pupils how they constructed a flowchart algorithm that included repetition. Discuss the need to create an algorithm for each stage of the volcanic eruption they identified to decomposing the process.",
     "In pairs or small groups, give out large sheets of paper to pupils and give them time to create a flowchart algorithm to show each stage of the volcanic eruption animation (slide 9). Each algorithm should contain the images they plan to use, taken from the LED planner, a delay after each image and the number of times each sequence will be repeated.",
     "Reviewing key concepts (10 minutes)",
     "Provide each pupil with a printout of slide 10 and ask them to cut out the sheet in half twice so that the four word cards (abstraction, algorithms, decomposition and repetition) are created.",
     "Use slides 11 - 14 to display definitions of concepts, pupils respond by selecting the term they think is being described.",
     "Repeat the exercise by inviting pupils to give their own definitions to the rest of the class who again select the appropriate card."
    ],
    "extension": [
     "Pupils could create a storyboard or poster based on their decomposition to explain what happens at each stage of the volcanic eruption process."
    ],
    "differentiation": [
     "Support:",
     "Pupils’ task can be simplified be requiring them to construct algorithms for fewer (or just one) stage(s) of the process.",
     "Stretch & challenge:",
     "Pupils could build on their knowledge from the digital flashcards unit by identifying opportunities to add numbers (steps) and/or words (key vocabulary) into their animation."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of decomposition and repetition.",
     "More formal assessment of pupils’ flowchart algorithms and responses to the final review activity."
    ]
   },
   {
    "n": 4,
    "slug": "mbu-volcano-4",
    "title": "Programming eruption animations",
    "pages": 9,
    "intro": "In this lesson pupils use the algorithms they created in the previous lesson to program their BBC micro:bit volcanic eruption animation using the MakeCode editor. Once completed, they consider their opinions on different aspects of learning in the unit.",
    "materials": "",
    "objectives": [
     "To follow an algorithm accurately to write a program",
     "To use repetition in a program effectively",
     "To test and debug programs and algorithms",
     "To review learning"
    ],
    "activities": [
     "Introduction: going loopy (10 minutes)",
     "Making micro:bit animations (35 minutes)",
     "Reviewing animations (15 minutes)",
     "Introduction: going loopy (10 minutes)",
     "Upload and open the missing-from-repetition hex file to the MakeCode editor (or use link in slide 3 to published project).",
     "Using the simulator run the program and ask pupils to identify how many times the animation is repeated and how many images are contained within the repeat (there are four images in the sequence and the sequence is repeated six times).",
     "Invite suggestions on why the final image, despite being part of the planned sequence, was only shown once (it has not been placed inside the repeat block). Show pupils the program and identify that it was not placed within the repeat block. Invite pupils to debug the program and re-run it to see if it works.",
     "Making micro:bit animations (35 minutes)",
     "Invite pupils to describe what they did in the previous lesson (created algorithms) and how they will make use of these in this lesson (slide 4).",
     "Model how to use the MakeCode editor to construct a program with more than one repeating section by inviting pupils to demonstrate on the whole class display (example microbit-example-of-animation.hex is included in the lesson downloads and published in the link on slide 5).",
     "Give pupils time to work in their pairs, or small groups, to follow their algorithms to write their programs using the MakeCode editor (slide 5). You may wish them to make use of paired programming (slide 6).",
     "Remind pupils to test and debug their programs as they work and, when successful changes are made, to document this by annotating their algorithm.",
     "If you have access to physical micro:bits, download and transfer the programs.",
     "Encourage pupils to share their animations with other groups.",
     "Reviewing Animations (15 minutes)",
     "Display slide 7 and give copies to pupils.",
     "Explain that the table will be used to record their opinions of the unit so far. Highlight the terms process and product and invite pupils’ ideas on what these refer to - the process: the different activities/steps they undertook to make their animations; the product: the final animation.",
     "Explain to pupils that they are going to identify any aspects of the process and the product they are pleased with/enjoyed and any that they didn’t. Identify where on the table different opinions would be placed (if pupils have experience of Carroll diagrams in maths, link to this).",
     "Give pupils time to complete their own copy of the Reviewing your Learning sheet."
    ],
    "extension": [
     "Pupils could create a video of their micro:bit animations and add narration using movie-making software to create an explanation video."
    ],
    "differentiation": [
     "Support:",
     "Pupils will have planned less stages to program in the previous lesson and should be given the support needed to program their animation successfully.",
     "Stretch & challenge:",
     "Pupils will have planned how to include words and/or numbers into the animation in the previous lesson and can program these into their animation. They can add comments to their program to explain their code."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of repetition, debugging and programming.",
     "More formal assessment of pupils’ completed programs."
    ]
   },
   {
    "n": 5,
    "slug": "mbu-volcano-5",
    "title": "Reflection & review",
    "pages": 11,
    "intro": "In this final lesson (which is ‘unplugged’) pupils reflect on the unit as a whole by decomposing their learning to identify all the steps they undertook in order to produce their animation and record this using a thinking map.",
    "materials": "",
    "objectives": [
     "To understand and explain decomposition",
     "To use decomposition to review learning",
     "To reflect on learning"
    ],
    "activities": [
     "Introduction: Get ready (10 minutes)",
     "Decomposing our learning (40 minutes)",
     "Sharing our decomposition (10 minutes)",
     "Introduction: get ready (10 minutes)",
     "Use slide 3 to display the instruction ‘Get Ready’ to pupils. Establish that when they are given this instruction on a school morning it can involve completing lots of smaller tasks.",
     "Ask pupils to work in pairs or small groups to record down as many different activities that are included in the command ‘Get Ready.’",
     "Review pupils’ answers by asking for suggestions of the task they think nobody else has on their list.",
     "Decomposing our learning (40 minutes)",
     "Ask pupils to recall the process they have just used when they break the task of getting ready down into smaller tasks and recap the definition of decomposition (slide 4).",
     "Display slide 5 and invite pupils to suggest the different concepts/skills/activities they have developed during this unit in order to make a micro:bit animation. Record these suggestions as a list for pupils to use during their independent activity.",
     "Explain to pupils that they are going to create a thinking map to decompose their learning within this unit (slide 6).",
     "Model how to do this by adding one of the decomposed items to the thinking map and explaining how it was use e.g. algorithms - in this unit we learnt how to write algorithms in a flowchart. We used them to plan our dance sequence animation and our volcanic eruption animation.",
     "Give pupils time to work in pairs or small groups to produce a thinking map that represents their learning through the unit.",
     "Sharing our decomposition (10 minutes)",
     "Ask groups to share their thinking map with another group, talking through their ideas.",
     "Once they have finished, encourage those listening to ask questions, use slide 7 as a prompt.",
     "Discuss as a class the learning they have gained throughout the unit, giving pupils time to think/pair/share the questions on slide 8."
    ],
    "extension": [
     "Using the context of learning in another curriculum area create a flowchart to show all the steps that pupils undertook before completing the final product (e.g. writing a character description in English)."
    ],
    "differentiation": [
     "Support:",
     "If you have access to tablets, using presentation software would allow pupils to capture images of the work they have already produced and record narration to explain how this was used.",
     "Stretch & challenge:",
     "Pupils could organise their ideas into a more formal piece of writing where they explain what decomposition is and how they have used it in this unit. They can also be encouraged to go into greater detail about their use of repetition and decomposition in algorithms and programs."
    ],
    "assessment": [
     "Informal observations of pupils’ understanding of decomposition during activities and discussions.",
     "More formal assessment of pupils’ thinking maps."
    ]
   }
  ]
 },
 {
  "slug": "crypto",
  "title": "Introduction to cryptography",
  "emoji": "🔐",
  "order": 19,
  "description": "In this series of three lessons aimed at students in the first year of secondary school, students learn about cryptography and undertaking practical unplugged activities to develop their logical reasoning and problem-solving skills. They write algorithms for a Caesar cipher and are introduced to writing Caesar ciphers in text-based programming using JavaScript and Python. This unit forms the second part of the cyber security unit, though it can be used on its own and can be a good introduction to text-based programming, or a way to extend existing knowledge.",
  "skills": [
   "World War Two",
   "Roman Empire",
   "Algorithms",
   "Text-based programming"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-crypto-1",
    "title": "What is cryptography?",
    "pages": 16,
    "intro": "In this lesson students develop their understanding of cryptography, encryption and ciphers. They learn how they have been used over time, focusing on 3 different ciphers and learning about Turing and code-breaking during World War Two. They crack and create ciphers, developing their abilities to use logical reasoning to solve problems.",
    "materials": "",
    "objectives": [
     "To know what cryptography is and how it has been used over time to encrypt data and information",
     "To create and solve ciphers using logical reasoning",
     "To appreciate the importance of code breaking in World War Two through learning about Alan Turing"
    ],
    "activities": [
     "Crack the code (5 minutes)",
     "Cryptography & ciphers (15 minutes)",
     "Create and break ciphers (15 minutes)",
     "Code breaking in WWII (15 minutes)",
     "Encryption in our lives today (5 minutes)",
     "Review & wrap up (5 minutes)",
     "Introduction: Crack the code (5 minutes)",
     "Give out copies of the code cracking sheet to pairs and ask students to crack the code (slide 2)",
     "Discuss as a class and award some code cracking stickers to the pair who cracks it first if you wish (solution on slide 3).",
     "Highlight they had to use the computational skill of logical reasoning to problem solve and work out the code (slide 4) and get them to think/pair/share how they worked it out.",
     "Share the learning objectives on slide 5 if you wish.",
     "Introduction: Cryptography & ciphers (10 minutes)",
     "Invite students to share their current understanding of cryptography and use slide 6 to support class discussion.",
     "Ask students to discuss in small groups, then share any examples of code breaking/ciphers they know (they may have come across them in Maths for example).",
     "Highlight they used a substitution cipher in the first exercise (letters were substituted by Roman numerals).",
     "Use slides 7-9 to introduce and discuss different types of ciphers (Pigpen, Atbash, Caesar).",
     "Ask students to consider what was technically incorrect about the cipher they used in the first task (Augustus was an Emperor after Caesar, so would probably have used his great-uncle’s shift cipher, rather than a substitution cipher. The Caesar cipher was used for hundreds of years after Caesar’s death!).",
     "Create and break ciphers (15 minutes)",
     "In pairs or individually, ask students to complete the cipher challenge task B on their sheet (slide 10).",
     "Share their learnings as a class, encouraging students to consider how they solved the cipher, thus developing their understanding of logical reasoning (slide 11).",
     "Code breaking in WW2 (15 minutes)",
     "Explain to students that they have already seen how ciphers and cryptography have been used in history.",
     "Highlight that one of the most recent and famous examples is during World War Two and invite them to think/pair/share their knowledge and understanding around code breaking in WW2 (slide 12).",
     "Give students 10 minutes individually or in pairs to research the story around Turing, Enigma and Bletchley park, make brief notes and discuss as a class. You could ask them to make rough notes, a slide or 1 page summary, depending on your preference.",
     "This is also an opportunity to bring PSHE into your lesson if you discuss Turing’s prosecution.",
     "Encryption in our lives today (5 minutes)",
     "Use slide 13 to lead a discussion to highlight how encryption remains very important in our lives today, linking to previous cyber security lessons on hacking.",
     "Invite students’ examples of how they / their parents rely on encryption for safety of personal data and information.",
     "Review and wrap up (5 minutes)",
     "Invite students to think/pair/share the questions on slide 14 and review the learning objectives if you wish on slide 15."
    ],
    "extension": [
     "Students could create a class display on cryptography and/or the Enigma story with students conducting additional research and creating suitable display materials (e.g. a timeline, posters, example ciphers)",
     "You could watch The Imitation Game (certificate 12A) as a class.",
     "You could ask students to make a note of instances where they think encryption is being used in their lives over the next week and discuss as a class at the start of next lesson."
    ],
    "differentiation": [
     "Support:",
     "Students can be given simpler codes to crack according to their ability if needed. They may find one cipher easier to work with and so should focus on creating a simple code. Working in supportive pairings may also help.",
     "Students may find it challenging to articulate how they have cracked codes (logical reasoning), so reward attempts generously.",
     "Stretch & challenge:",
     "You could ask students to write an algorithm for how to solve a substitution cipher.",
     "Students could explore the Mathematical code cracking challenges on: https://nrich.maths.org/2197"
    ],
    "assessment": [
     "Informal observation of students’ responses during the activities.",
     "Informal assessment of logical reasoning from responses to questions and cipher creation and solving.",
     "More formal assessment of students’ research and ciphers if wished."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-crypto-2",
    "title": "Caesar cipher algorithms",
    "pages": 10,
    "intro": "In this ‘unplugged’ lesson students create their own Caesar cipher, firstly using card before writing, testing and debugging algorithms to create a Caesar cipher to encrypt and decrypt messages.",
    "materials": "",
    "objectives": [
     "To create and use a paper-based Caesar cipher to encrypt and decrypt messages",
     "To use logical reasoning to write algorithms to encrypt and decrypt messages using a Caesar cipher",
     "To test and debug algorithms effectively"
    ],
    "activities": [
     "Introduction: recapping cryptography (5 minutes)",
     "Creating card Caesar ciphers (20 minutes)",
     "Caesar cipher algorithms: encryption (15 minutes)",
     "Caesar cipher algorithms: decryption (10 minutes)",
     "Review & wrap up (10 minutes)",
     "Introduction: Recapping cryptography (5 minutes)",
     "Ask students to think/pair/share what they can recall about cryptography and ciphers from the previous lesson (slide 2), highlighting you will be focusing on Caesar ciphers in this lesson.",
     "Share the learning objectives on slide 3 if you wish.",
     "Creating card Caesar ciphers (20 minutes)",
     "Give out the Caesar cipher worksheet to individuals or pairs of students (slide 4) and go through the instructions to check their understanding.",
     "Ask students to collect card, scissors and paper fasteners and to create their ciphers.",
     "Once they have created the ciphers, students can complete task B on their sheet.",
     "Discuss their learning as a class, inviting students to share their answers to the ‘challenge’ question and highlighting examples of using logical reasoning (slide 5).",
     "Caesar cipher algorithms: encryption (15 minutes)",
     "Explain to students they are going to write an algorithm giving for encrypting a message using a Caesar cipher and ask pairs or small groups to collect A3 paper and pens to write their algorithm.",
     "If you wish, you can discuss as a class to give some direction (there is a simple example on slide 6).",
     "Once students have written their first version, ask them to write a message at the bottom of their sheet and swap their sheet with another pair or group.",
     "Ask them to test each other’s algorithms by trying to encrypt the message using the algorithm’s instructions and to feed back any problems found in testing for the other pair/group to debug.",
     "Discuss as a class, so all have a working algorithm for encryption and ask students to collect a new sheet of A3 paper and encrypt a message using their algorithm at the top.",
     "Caesar cipher algorithms: decryption (10 minutes)",
     "Ask students to write an algorithm to decrypt the message they have written using a Caesar cipher. This should be easier for them as they have already written the encryption algorithm, though you can use the simple example on slide 7 to help if needed).",
     "Once they have their algorithm, again ask them to swap with another pair or group who should test it using the algorithm only to try to decrypt the message and feedback any problems to be debugged.",
     "Again, discuss as a class to address any misconceptions.",
     "Review & wrap up (10 minutes)",
     "Use the questions on slide 8 to prompt review discussion in students’ pairs or groups around their learning in this lesson.",
     "Discuss responses as a class, exploring students answers to question 5 in particular, rewarding any credible attempts generously even if the language or context is not quite right (e.g. lookup tables, variables, arrays, lists).",
     "Review students’ learning against the learning objectives on slide 9 if you wish."
    ],
    "extension": [],
    "differentiation": [
     "Support:",
     "Students may benefit from supportive pairings during the algorithm writing task, could work in a small group with adult support to sequence a set of pre-printed instructions or have a starter algorithm from which to continue.",
     "Ensure they have a short message to decrypt/encrypt and encourage any sign of increased understanding and confidence when writing algorithms and using iteration and selection.",
     "Stretch & challenge:",
     "Students can be challenged to create a more detailed algorithm (e.g. one that allows a user to decide the number of letters to ‘shift’).",
     "Students can work independently or in pairs to explore using their algorithm to try to write a program in familiar software."
    ],
    "assessment": [
     "Informal observation of students’ during Caesar cipher and algorithm writing activities.",
     "Informal assessment during class, group and individual questioning.",
     "More formal assessment of algorithms if wishes."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-crypto-3",
    "title": "Ciphers and text-based programming",
    "pages": 15,
    "intro": "In this lesson students introduced to text-based programming. They explore and analyse JavaScript code before using their developing knowledge of selection, variables, functions and text-based programming, alongside their own algorithms to create a Caesar cipher in Python (if you have micro:bits. If you do not, an alternative final activity is given).",
    "materials": "",
    "objectives": [
     "To develop practical understanding of text-based programming",
     "To understand and use selection, variables and functions",
     "To analyse JavaScript code",
     "To program a Caesar cipher with Python (if you have micro:bits)"
    ],
    "activities": [
     "Recapping algorithms (5 minutes)",
     "Introducing text programming (5 minutes)",
     "JavaScript Caesar cipher (10 minutes)",
     "Python Caesar cipher (30 minutes)",
     "Review & wrap up (10 minutes)",
     "Introduction: Recapping algorithms (5 minutes)",
     "Use slide 2 to recap students’ learning from last lesson and introduce the learning objectives on slide 3 if you wish.",
     "Introducing text programming (10 minutes)",
     "Show slide 4 and ask students what they can see in the image (a very simple micro:bit program showing the code in both graphical (MakeCode blocks editor) and text (JavaScript) form.",
     "Invite students to think/pair/share the question on slide 5 about their current level of experience/understanding of text based programming.",
     "If this is their first introduction, give them 5 minutes to complete the task on the slide in pairs to experiment with going between the blocks and JavaScript editors on MakeCode.",
     "JavaScript Caesar cipher (10 minutes)",
     "Visit the web link given on slide 6 and ask students what they think it is (a JavaScript Caesar cipher).",
     "Invite students to use the cipher and lead a discussion around the purpose of the 3 different columns.",
     "Explain you would like students to experiment with it in pairs, trying to ‘decipher the cipher’ and work out what each part of the JavaScript code is doing (they can ignore the other 2 columns, unless you want them to explore CSS and HTML too).",
     "Highlight that it is very unlikely they will be able to work it all out, but they should recognise some familiar elements from previous programming and/or their algorithms and explain that all programmers have to work with different languages, so it’s a good skill to learn.",
     "This is tricky, however give students 5 minutes to work in paris, then lead a discussion around what they have found out, highlighting the use of selection, variables, functions and anything else of interest (slides 7 to 9 may help with the task and/or discussion).",
     "Python Caesar ciphers (30 minutes): If you do have physical micro:bits",
     "Explain that they are now going to use their algorithms and their knowledge from looking at the JavaScript cipher to program their own Caesar cipher to decipher messages using Python.",
     "Show slide 10 and ask students to think/pair/share what they can see in the code.",
     "Can they spot the variables and functions?",
     "Can they talk through the code?",
     "How does it differ from the JavaScript and their algorithm in how it creates the cipher?",
     "Lead a brief discussion to support understanding, highlighting the purpose of the different parts of the code:",
     "The function that gives each letter of the alphabet a number, so it can shift it along a set amount to a different number",
     "The function that goes through each letter of the encoded work and applies the shift.",
     "Show slide 11 and do the same as above, ensuring all students have at least a basic grasp of the different parts of the code:",
     "Checking if button A is pressed",
     "The value of the shift key",
     "The amount the cipher has shifted",
     "How the display is cleared and the message displayed.",
     "Get students to work in pairs to visit MicroPython and code and test their own Caesar cipher. Depending on their confidence, you may wish to give them some/all of the code to start off with, perhaps printing it off so they at least have to type it in (and learn that they need to be very exact). Alternatively, the supplied .HEX files can be dragged and dropped into the online Python editor https://python.microbit.org or they can be opened in micro:bit classroom.",
     "Depending on confidence, you could use the simplified Python Caesar program (slide 12) which does not use functions but which produces similar results.",
     "Encourage them to make comments to explain their code as they go (and print it off if you wish to assess it).",
     "Python Caesar ciphers (30 minutes): If you don’t have physical micro:bits",
     "Print out the code of the hex file and cut it up into sections.",
     "Give small groups the code sections, A3 paper and glue.",
     "Ask students to work in small groups to consider what each section does and sequence it in the right order to make a working program, annotating on their A3 paper notes to say what they think each section does (use the prompts in the Python section above to help)",
     "Encourage groups to ‘step-through’ the program to test and debug it before pairing up with another team to send and receive messages with their ‘program’.",
     "Discuss their learning as a class.",
     "Review and wrap up (10 minutes)",
     "Review the learning objectives on slide 13 if you wish and use the questions on slide 14 to review students’ learning in this lesson and Cryptography as a whole."
    ],
    "extension": [],
    "differentiation": [
     "Support:",
     "Students may benefit from being given specific sections of the JavaScript / Python code to look at, selected to suit their areas of confidence. Then they can be given additional sections of code to develop their understanding.",
     "If students are unable to access the text-based programming of the Caesar cipher, they can stay in the Micro:bit editor, looking between the blocks and JavaScript editor to build up their understanding slowly with help (e.g using a simple tutorial such as the flashing heart and looking at how it is represented in both editors).",
     "Stretch & challenge:",
     "Students can be challenged to write more of their own code, adapting or totally changing the Python code to create their own Caesar cipher. Explaining to the class how they did so could help to develop others.",
     "Students could join the Cyber challenge https://go.joincyberdiscovery.com/"
    ],
    "assessment": [
     "Informal assessment of students’ responses during the activities.",
     "More formal assessment of students’ ciphers and responses to the review (you could ask them to give their responses to the questions individually on paper/on a computer if you preferred)."
    ]
   }
  ]
 },
 {
  "slug": "cyber",
  "title": "Introduction to cyber security",
  "emoji": "🛡️",
  "order": 20,
  "description": "In this series of three lessons aimed at students in the first year of secondary school, students gain a greater understanding of the importance of cyber security and explore the need to create strong password before writing algorithms and programs to create their own ‘strong password generator’ using the micro:bit. Ideally, this unit should be taught after Computing fundamentals.",
  "skills": [
   "Malware",
   "Ethical hacking",
   "Passwords",
   "Algorithms",
   "Pseudocode",
   "Variables"
  ],
  "lessons": [
   {
    "n": 1,
    "slug": "mbu-cyber-1",
    "title": "What is cyber security?",
    "pages": 15,
    "intro": "In this lesson students learn about cyber security and, through practical application, about ethical hacking. They also learn about the importance of cyber security in the world today, consolidating and extending their prior learning about internet safety.",
    "materials": "",
    "objectives": [
     "to understand about the importance of cyber security in the world today",
     "to be able to explain what is meant by the term ‘ethical hacking’",
     "to understand how to recognise potential malware attacks and how to protect data and devices."
    ],
    "activities": [
     "What is malware? (10 minutes)",
     "What is Cyber Security and why does it matter? (10 minutes)",
     "Cyber security risks - a global problem (15 minutes)",
     "Cyber security jobs (10 minutes)",
     "Beat the hacker (10 minutes)",
     "Review and wrap up (5 mins)",
     "Introduction: What is malware? (10 minutes)",
     "Share the learning objectives on slide 2 if you wish and use slide 3 to lead a discussion around ‘malware’ and check students’ current understanding.",
     "Give out mixed-up copies of the malware or made up cards to pairs of students and explain you want them to sort the cards into two piles, according to whether they think the name on the card is associated with malware or is made up (slide 4).",
     "Go through the answers using slide 5 (and see the slide notes if want further information).",
     "What is Cyber security and why does it matter? (10 minutes)",
     "Give students in their pairs a few minutes to think/pair/share the questions on slide 6 (and to make notes if you wish).",
     "Lead a class discussion around their ideas, inviting them to share their own examples and using slide 7 to clarify understanding if needed.",
     "Cyber security risks: a Global Problem (15 minutes)",
     "Explain the role of the National Cyber Security Centre, part of GCHQ (slide 8) and follow the link to the website to show students it publishes details of weekly cyber security threats around the world.",
     "Give students 5-10 mins to research the website, find some interesting stories and feedback as a class.",
     "Highlight that, as they have seen from their research, Cyber Security is now a global problem that affects many areas of our lives.",
     "Give students time to think and discuss the questions on slide 9 before discussing the answers as a class.",
     "Cyber security jobs (10 minutes)",
     "Computer Misuse Act (UK): you can be sent to prison for up to 14 years and / or face a large fine for malicious hacking.",
     "Watch the video on slide 10 (or find an alternative if you wish) to highlight a recent story about teenage hackers.",
     "Use slides 11 and 12 to explain that hackers can also be employed ‘ethically’, the increase in cyber security risks has led to an increase in the demand for cyber security jobs and people can be employed as ‘white-hat’ (ethical) hackers.",
     "Students may have stories to share from their own knowledge and understanding and this can be encouraged.",
     "Beat the hacker (10 minutes)",
     "Give out the beat the hacker worksheets to pairs or small groups (slide 13).",
     "Ensure they understand what to do and give a suitable amount of time to complete (the suggestions are only some of the possible solutions to the scenarios and they should add in their own ideas). Discuss as a class.",
     "Ask each pair or team to self-certify as to whether they could be good candidates for cyber-security jobs in the future given their performance on the task.",
     "Review and wrap up (5 minutes)",
     "Review the learning objectives if you wish on slide 14 and invite students to think/pair/share what they have learnt during this lesson."
    ],
    "extension": [
     "Student could conduct further research about malware before creating their own blog post or web page and providing top tips to help others avoid the pitfalls. These could be uploaded onto the school website. A good starting point is BBC Bitesize."
    ],
    "differentiation": [
     "Support:",
     "Students may benefit by being put into mixed ability groupings to aid with discussion and question prompts, particularly in the ‘malware or made up’ and ‘beat the hacker’ activities.",
     "You could give students only one or two of the scenarios for the ‘beat the hacker’ activity to focus on.",
     "Stretch & challenge:",
     "Students can be asked to provide more of their own ideas in the ‘beat the hacker’ activity, researching possible solutions if appropriate. They could also come up with their own problems for others to try to solve and swop them.",
     "Students can be encouraged to explore cyber security further and give advice to others (see extension)."
    ],
    "assessment": [
     "Informal observation and assessment of students’ during activities and discussion.",
     "More formal assessment, if wished, of their answers to the ‘beat the hacker’ activity."
    ]
   },
   {
    "n": 2,
    "slug": "mbu-cyber-2",
    "title": "Strong passwords",
    "pages": 18,
    "intro": "In this lesson students explore the need for strong passwords and design an algorithm to create a strong password generator using the micro:bit.",
    "materials": "",
    "objectives": [
     "To understand the need for secure password and what makes a password secure.",
     "To plan, test and debug an algorithm for a password generator.",
     "To use selection and variables in an algorithm and explain their use."
    ],
    "activities": [
     "What is a password breach? (5 minutes)",
     "Guess the password? (5 minutes)",
     "Why are strong passwords important? (10 minutes)",
     "Password Generator Task (10 minutes)",
     "Writing an algorithm (20 minutes)",
     "Testing and debugging algorithms (5 minutes)",
     "Review & wrap up (5 minutes)",
     "Introduction: What is a password breach? (5 minutes)",
     "Ask students to recap their understanding about malware from the previous lesson.",
     "Explain in this lesson you will be focusing on passwords and share the learning objectives on slide 2 if you wish.",
     "Invite them to think/pair/share what is meant by a ‘password breach’ (slide 3) and discuss as a class.",
     "Guess the password (5 minutes)",
     "Use slide 4 to play a quick ‘Guess the password’ game.",
     "Invite students to share why it was so easy to guess and where hackers could find this kind of personal information (e.g. social media).",
     "Highlight the existence of powerful hacking software which helps hackers to guess passwords and that",
     "people often use the same password for multiple accounts, inviting discussion about what problems this creates.",
     "Why are strong passwords important?  (10 minutes)",
     "Ask students to think/pair/share why strong passwords are important (slide 5).",
     "If you wish, give students a few minutes to look at the website on slide 6 and check how safe Ali’s password and their own passwords are.",
     "Invite students to think/pair/share what makes a good/strong password (slide 7).",
     "Password generator challenge (10 minutes)",
     "Explain to students that they are going to devise their own password generator using micro:bit and give them a few minutes to visit the website and answer the question on slide 8.",
     "Give sticky notes to individuals or pairs of students and ask them to devise their own secure password.",
     "Give students a few minutes to pair up and try to guess each other’s passwords. They should find it challenging and highlight that hackers or computer software would have the same problem.",
     "Writing algorithms (20 minutes +)",
     "Discuss the process they went through to create their password (i.e. choose random numbers and letters, included capitals and symbols).",
     "Use slide 9 to share the checklist reminder of what their password generator should be able to do.",
     "If helpful, use slide 10 to show students a starter pseudocode algorithm. Check understanding by discussing what the next instruction(s) should be and if needed, slides 11-14 can be used to help with selection and variables explanation.",
     "Ask students to complete the password generator planning sheets individually or in pairs, giving them a suitable amount of time and support to according to their confidence and experience.",
     "Testing and debugging algorithms (5 minutes)",
     "Once students have completed their algorithm, ask them to share with another person or pair and work through them together to test and debug, ready to start coding in the next lesson (slide 15).",
     "Review and wrap up (5 minutes)",
     "Ask students to recap their learning by answering the questions on slide 16 and revisit the learning objectives if you wish on slide 17."
    ],
    "extension": [],
    "differentiation": [
     "Support:",
     "Give students the password generator planning support sheet to help them with their algorithm planning. They may also benefit from being given additional instructions that they can sequence and from being given adult support.",
     "Stretch & challenge:",
     "Students explore the advice and resources for fostering good password practice offered by the UK National Cyber Security Centre https://www.ncsc.gov.uk",
     "Students could add a shake function to their algorithm with a range of characters such as hashtag, @ sign etc. to make their passwords more complex (see bottom of worksheet). They could also add sound effects to their algorithm."
    ],
    "assessment": [
     "Informal assessment of students’ answers to discussions.",
     "More formal assessment of students’ completed algorithms if wished."
    ]
   },
   {
    "n": 3,
    "slug": "mbu-cyber-3",
    "title": "Making a password generator",
    "pages": 10,
    "intro": "In this lesson students use their pseudocode algorithm to code their password generator before testing, debugging and evaluating it.",
    "materials": "",
    "objectives": [
     "To follow a pseudocode algorithm to program a password generator using a micro:bit",
     "To write a program using variables correctly",
     "To test and debug code to create a working password generator"
    ],
    "activities": [
     "Recapping challenge (5 minutes)",
     "Recapping code (optional: 10 minutes)",
     "Coding a password generator (20+ minutes)",
     "Sharing, testing and debugging (10 minutes)",
     "Evaluating programs (10 minutes)",
     "Review & wrap up (10 minutes)",
     "Introduction: Password generator challenge recap (5 minutes)",
     "Invite students to recap the password generator challenge and their tasks for this lesson (slide 3).",
     "Recapping code (10 minutes)",
     "If you feel your students would benefit from recapping using selection and variables prior to coding, use slides 4 and 5.",
     "Completing the Dice and Rock and Paper and Scissors tutorials on MakeCode will also help to familiarise them with using variables.",
     "Coding the password generator (20+ minutes)",
     "Ensure students have their plans from the previous lesson, give out the coding support sheets as needed, and give students ample time to program their password generator.",
     "If working in pairs, encourage students to use paired programming (slide 6)",
     "If you have physical micro:bits, once students have a working program, give them time to connect  micro:bit, test their password generator and debug as necessary.",
     "Sharing, testing and debugging (10  minutes)",
     "As students finish, invite them to pair up, swap password generators and test each other’s, using slide 7 to support discussion and debugging as needed.",
     "Evaluating programs (10 minutes)",
     "Give students access to the password generator evaluation sheet, ideally on the school network and ask them to evaluate their password generator (slide 8).",
     "Review and wrap up (5 minutes)",
     "Review the learning objectives if you wish on slide 9 and invite students to share their answers to the last 2 questions on the evaluation sheet to review learning.",
     "An example password generator program hex file is also provided."
    ],
    "extension": [],
    "differentiation": [
     "Support:",
     "Provide students with the coding support sheet which has starter for the code they will need. They can then edit and add more code to complete their password generator.",
     "Students could be sensitively paired with a more confident coder who can support them through paired programming.",
     "Students can be encouraged to make simple evaluative statements in the evaluation activity and given starters to their sentences if needed.",
     "Stretch & challenge:",
     "Challenge the students to use the shake function to create characters and add sound effects for their password generator and make greater use of variables.",
     "Students can be encouraged to make more insightful, evaluative statements when evaluating their program.",
     "Students could extend their learning about Cyber Security further by playing the game on the following website: https://go.joincyberdiscovery.com/tutorial"
    ],
    "assessment": [
     "Informal observation of students during activities.",
     "Formal assessment of students’ completed programs and evaluation sheets."
    ]
   }
  ]
 }
];

function gallery(slug: string, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) a.push({ src: `/lessons/${slug}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Slide ${i}` });
  return a;
}

function makeLesson(u: Unit, l: UnitLesson): LessonDetail {
  const diff = (l.n <= 1 ? 2 : 3) as Difficulty;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        l.intro || `Introduce "${l.title}" from the ${u.title} unit.`,
        l.materials ? `Materials: ${l.materials}` : 'Materials: BBC micro:bits + USB leads, computers/tablets with the MakeCode editor (makecode.microbit.org), and the unit handouts.',
        'Open the lesson slides (shown below). The editable plan (.docx), slides (.pptx), printable student handouts and ready-made MakeCode .hex files are in the unit\'s Drive folder (see Resources).',
        'This is official micro:bit Foundation curriculum (CC BY-SA 4.0) — the timings and prompts are adaptable to your class.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Lesson Guide', emoji: '🎓', isCoachOnly: true,
      content: l.activities.length ? l.activities : ['Work through the lesson slides below with the class, pausing for the practical MakeCode activities.'],
      images: gallery(l.slug, l.pages),
    },
    {
      type: 'activity', title: `Activity: ${l.title}`, emoji: '🛠️',
      content: [
        l.intro || `In this lesson you will explore "${l.title}".`,
        'Follow your coach through the activities and build, test and debug the code in MakeCode (makecode.microbit.org). Test in the simulator, then flash it to a real micro:bit.',
      ],
      studentContent: [
        `🎯 Today: ${l.title}`,
        ...l.objectives.map(o => '• ' + o),
        '💻 Build and test your code in MakeCode, then flash it to your micro:bit!',
      ],
    },
    ...(l.extension.length ? [{
      type: 'extra_challenge' as const, title: 'Extension & Challenge', emoji: '🚀',
      content: l.extension,
    }] : []),
    {
      type: 'assessment', title: 'Assessment & Success Criteria', emoji: '✅',
      content: l.assessment.length ? l.assessment : l.objectives.map(o => 'Can ' + o.replace(/^to\s+/i, '').toLowerCase()),
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `UNIT: ${u.title} · Lesson ${l.n} of ${u.lessons.length}.`,
        ...(l.differentiation.length ? ['DIFFERENTIATION: ' + l.differentiation.join(' ')] : []),
        'The slides, editable lesson plan, student handouts and completed MakeCode .hex files are in the unit Drive folder (Resources).',
        'micro:bit classroom (mbit.io/lessons-classroom) is a free, no-accounts way to manage and save every student\'s code.',
        'SOURCE: official micro:bit Foundation curriculum, licensed CC BY-SA 4.0.',
      ],
    },
  ];

  return {
    id: l.slug, slug: l.slug, title: l.title,
    programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981',
    courseId: 'microbit-first', courseTitle: MICROBIT_COURSE_TITLE,
    moduleId: `mbu-${u.slug}`, moduleTitle: `${u.emoji} ${u.title}`,
    ageGroup: '10-12', level: 'Intermediate', duration: '45–60 minutes', difficulty: diff,
    skills: u.skills.slice(0, 4),
    materials: [
      { item: 'BBC micro:bit + micro-USB cable', quantity: '1 per pair' },
      { item: 'Computer/tablet with MakeCode editor', quantity: '1 per pair' },
      { item: 'micro:bit battery pack', quantity: '1 per micro:bit', isOptional: true },
    ],
    objectives: l.objectives,
    assessmentChecklist: l.objectives.map(o => o.replace(/^to\s+/i, 'Can ')),
    sections,
    heroImage: `/lessons/${l.slug}/p-01.png`,
    resources: [
      { id: `${l.slug}-r1`, title: `${l.title} — Lesson Slides (PPTX)`, type: 'slides', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Official micro:bit slide deck', needsReview: true },
      { id: `${l.slug}-r2`, title: `${l.title} — Lesson Plan (DOCX)`, type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Official micro:bit lesson plan', needsReview: true },
    ],
  };
}

export const MICROBIT_UNIT_LESSONS: LessonDetail[] = UNITS.flatMap(u => u.lessons.map(l => makeLesson(u, l)));

export const MICROBIT_UNIT_MODULES: Module[] = UNITS.map(u => ({
  id: `mbu-${u.slug}`, title: `${u.emoji} ${u.title}`, order: u.order,
  description: u.description.slice(0, 200),
  lessons: u.lessons.map(l => ({ id: l.slug, title: l.title, duration: '45–60 min', difficulty: (l.n <= 1 ? 2 : 3) as Difficulty, skills: u.skills.slice(0, 2), order: l.n })),
}));

export const MICROBIT_UNIT_LESSON_COUNT = MICROBIT_UNIT_LESSONS.length;
