import type { WalkStep, QuizQuestion } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Interactive teaching content for the 15 mTiny Discover lessons,
//  keyed by lesson number ("1.1" … "3.5"):
//   • walk  — the coach's guided teaching walkthrough (projector
//             stepper: say / ask / do this), authored from the official
//             Makeblock lesson plan PDFs (video timestamps, card names,
//             map scenarios come from the plans themselves)
//   • quiz  — 3 read-aloud questions for the end of class
//   • match — a projector matching game tied to the lesson theme
//  AUTO-GENERATED from the plan PDFs — edit freely, it's plain data.
// ════════════════════════════════════════════════════════════════

export interface DiscoverExtra {
  walk: WalkStep[];
  quiz: QuizQuestion[];
  match: { title: string; pairs: { left: string; right: string }[] };
}

export const DISCOVER_EXTRAS: Record<string, DiscoverExtra> = {
  "1.1": {
    "walk": [
      {
        "title": "Say Hi to Panda!",
        "say": "Friends, today we start a special adventure called Exploring Community with a robot panda named Panda! To understand our community, we first need to understand ourselves — so today is all about emotions, which are strong feelings.",
        "doThis": "Hold up mTiny so everyone can see, then gently pass Panda around the circle. Everyone says 'Hi Panda!'"
      },
      {
        "title": "Watch Panda's Day",
        "say": "Before we get to play with Panda, let's watch a video to see what Panda likes, what Panda doesn't like, and how Panda feels.",
        "doThis": "Play the Engage video. Pause at 0:21 right after Panda says playing at the park makes me happy.",
        "ask": "What is Panda feeling, and how can we tell? What do YOU do when you are happy?"
      },
      {
        "title": "More Panda Feelings",
        "say": "Panda has lots of feelings, just like us! Watch closely — Panda is about to feel sad, then angry, then scared.",
        "doThis": "Pause at 0:24 (sad, sun goes down), 0:50 (angry, missed goal), and 1:09 (scared of the shadow). At each pause ask what Panda feels and have the class act that feeling with their faces and bodies.",
        "ask": "How do we know Panda is feeling that way?"
      },
      {
        "title": "Feelings Talk Circle",
        "say": "Emotions are strong feelings, and we have them just like Panda does. Everybody has happy days and grumpy days — that's okay!",
        "ask": "What emotions do we feel? What can we do when we feel happy? Sad? Angry?"
      },
      {
        "title": "The Magic Tap Pen",
        "say": "We can change Panda's feelings with the Tap Pen and the purple face cards — tap a card and Panda shows that emotion! The blue arrow cards make Panda move.",
        "doThis": "Model: tap the Tap Pen on each purple emotion card and let the class guess the feeling Panda shows. Then tap one blue action card so Panda moves."
      },
      {
        "title": "Emotion Detectives",
        "say": "Now YOU are emotion detectives! Each table gets picture cards of people feeling something — your mission is to make Panda show that same feeling.",
        "doThis": "Groups of 3-4 get Emotion Scenario Cards (ice cream = happy, hurt and crying = sad, yawning = tired, scary shadow = scared, arms crossed = angry). Children tap purple and blue cards to match. Rotate between tables.",
        "ask": "Why do you think the person in your picture feels that way?"
      },
      {
        "title": "SMART Ways to Feel",
        "say": "All feelings are okay, but we can choose SMART ways to show them. Let's finish this sentence together: When I feel angry, I will... take a deep breath and ask a teacher for help!",
        "ask": "When I feel happy, I will ___? When I feel sad, I will ___? When I feel scared, I will ___?"
      },
      {
        "title": "My SMART Goal",
        "say": "Now open your Personal Learning Workbook to page 10 — you get to make your very own SMART goal! You can draw it or say it: When I feel ___, I will ___.",
        "doThis": "Pass out workbooks. Children draw a picture of their goal or dictate the sentence. Invite a few to share with the class."
      },
      {
        "title": "Wave Bye to Panda",
        "say": "Today we learned to code Panda with the Tap Pen, we talked about emotions, and we made SMART goals. Next time, Panda will teach us about caring for others!",
        "ask": "Who wants to share one thing they learned today?"
      }
    ],
    "quiz": [
      {
        "question": "What is an emotion?",
        "options": [
          "A strong feeling inside us",
          "A kind of banana snack",
          "A shoe for robots"
        ],
        "answerIndex": 0,
        "explanation": "Yes! An emotion is a strong feeling — like happy, sad, angry, or scared. Panda has them and so do we!"
      },
      {
        "question": "Which cards change Panda's feelings?",
        "options": [
          "The purple face cards",
          "A magic wand",
          "Tickling Panda's tummy"
        ],
        "answerIndex": 0,
        "explanation": "Right! We tap the purple emotion cards with the Tap Pen and Panda shows that feeling."
      },
      {
        "question": "What is a SMART thing to do when you feel angry?",
        "options": [
          "Throw all the toys",
          "Take a deep breath and ask a teacher for help",
          "Roar like a dinosaur forever"
        ],
        "answerIndex": 1,
        "explanation": "Exactly! When I feel angry, I will take a deep breath and ask for help. That's a SMART goal!"
      }
    ],
    "match": {
      "title": "Match the Feeling Face!",
      "pairs": [
        {
          "left": "😊 Big smile",
          "right": "Happy"
        },
        {
          "left": "😢 Teardrops",
          "right": "Sad"
        },
        {
          "left": "😠 Crossed arms",
          "right": "Angry"
        },
        {
          "left": "😨 Scary shadow",
          "right": "Scared"
        },
        {
          "left": "🥱 Big yawn",
          "right": "Tired"
        }
      ]
    }
  },
  "1.2": {
    "walk": [
      {
        "title": "Panda Needs Us",
        "say": "Welcome back, community explorers! Last time we learned about our emotions — today we learn how to CARE for others, starting with our friend Panda.",
        "doThis": "Hold up mTiny for everyone to see.",
        "ask": "Who remembers what we learned last lesson about our feelings?"
      },
      {
        "title": "Watch the Care Video",
        "say": "Let's watch how another class takes care of their Panda. Everyone has a special job helping mTiny!",
        "doThis": "Play the Engage video. Pause at 0:22 after the teacher says everyone has a special role caring for mTiny.",
        "ask": "How do you think we might take care of Panda?"
      },
      {
        "title": "Uh-oh, Panda Trouble!",
        "say": "Oh no — in the video, Panda would not turn on! Let's think like helpers.",
        "doThis": "Pause at 1:08 after the student says mTiny is not turning on. Then start a class list of ways to care for Panda — keep it, you will use it later!",
        "ask": "What would YOU do if Panda would not turn on?"
      },
      {
        "title": "Build Panda's Town",
        "say": "This is the map of Panda's town! When Panda drives on it, Panda makes sounds and reacts to the pictures — let's be gentle with the map and the cards.",
        "doThis": "Lay out the Town Map tiles on the floor with the class. Drive Panda across it once with a blue arrow card so children hear the sounds."
      },
      {
        "title": "The Card Sandwich",
        "say": "A program is like a sandwich: the yellow Event card always comes FIRST, the blue arrow cards go in the middle, and the Green Flag says GO at the end!",
        "doThis": "Model this exact program with the Tap Pen: Event card, Turn Right, Forward, Turn Left, then Green Flag. Watch Panda follow it!"
      },
      {
        "title": "Your Turn to Code",
        "say": "Now your group gets to build a piece of town and make your own program for Panda. Remember gentle hands — we are Panda's caretakers!",
        "doThis": "Groups of 3-4 each get 1 mTiny, Tap Pen, 4 Action cards, 1 Event card, and 1 Green Flag. Rotate to help. Afterwards let groups share what they made."
      },
      {
        "title": "Robot Words",
        "say": "Each card is a CODE — a word Panda understands. Putting cards together is CODING, and the whole list of steps is a PROGRAM!",
        "doThis": "Line up 4 action cards in a row where all can see.",
        "ask": "Count with me — how many steps are in our program? (Four!)"
      },
      {
        "title": "Panda Helper Jobs",
        "say": "Just like the class in the video, we will share jobs to keep Panda safe and happy: a Charger, a Bather who wipes Panda clean, a Set-Up Crew, and a Clean-Up Crew!",
        "doThis": "Read your class care list together and agree on class jobs. Assign helpers for this week.",
        "ask": "Which Panda job would you love to do, and why?"
      },
      {
        "title": "Caring Poster",
        "say": "Let's make a big poster about caring — for Panda AND for each other. When we care for things and friends, our whole classroom is happier!",
        "doThis": "Hand out poster paper and drawing supplies. Children draw how they treat Panda and friends kindly. Close: next lesson is about FAMILY!"
      }
    ],
    "quiz": [
      {
        "question": "Which card comes FIRST in every program?",
        "options": [
          "The yellow Event card",
          "A pizza card",
          "The last card"
        ],
        "answerIndex": 0,
        "explanation": "Yes! The yellow Event card always starts our program — first the Event card, then the arrows, then the Green Flag."
      },
      {
        "question": "What does the Green Flag tell Panda?",
        "options": [
          "Go to sleep",
          "GO! Start moving!",
          "Turn into a frog"
        ],
        "answerIndex": 1,
        "explanation": "Right! The Green Flag tells Panda the program is ready — go, Panda, go!"
      },
      {
        "question": "How do we take care of Panda?",
        "options": [
          "Throw Panda like a ball",
          "Give Panda a bubble bath in water",
          "Gentle hands and charge Panda after playing"
        ],
        "answerIndex": 2,
        "explanation": "Exactly! We use gentle hands, keep Panda clean and charged, and put the cards away nicely."
      }
    ],
    "match": {
      "title": "Panda Care Crew!",
      "pairs": [
        {
          "left": "🔌 Charger",
          "right": "Plugs Panda in"
        },
        {
          "left": "🧽 Bather",
          "right": "Wipes Panda clean"
        },
        {
          "left": "🃏 Set-Up Crew",
          "right": "Lays out maps"
        },
        {
          "left": "🧹 Clean-Up Crew",
          "right": "Puts cards away"
        },
        {
          "left": "🧠 Program Master",
          "right": "Helps friends code"
        }
      ]
    }
  },
  "1.3": {
    "walk": [
      {
        "title": "Families Are Special",
        "say": "Hello, explorers! Last time we cared for Panda — and guess what, we care for our FAMILIES the same way. Today Panda wants to learn what makes every family special!",
        "doThis": "Hold up mTiny for everyone to see.",
        "ask": "Who remembers how we take care of Panda?"
      },
      {
        "title": "Watch Family Video",
        "say": "Panda is visiting three friends to learn about their families. Watch closely — every family is different!",
        "doThis": "Play the Engage video. Pause at 0:50 after Panda thanks Jordan.",
        "ask": "What makes Jordan's family special? (Its size!)"
      },
      {
        "title": "More Family Visits",
        "say": "Panda has two more friends to visit — Bobbie and Taylor. Different people can live in a family, and families can look different, and that's what makes them special!",
        "doThis": "Pause at 1:13 (Bobbie: different members live with them) and 1:41 (Taylor: families look different). Ask what makes each family special.",
        "ask": "Who wants to share why THEIR family is special?"
      },
      {
        "title": "A New Friend!",
        "say": "Look at Panda's town — I spy someone new on the map! It's Panda's friend, and Panda wants to visit their house to learn about their family. How will Panda get there?",
        "doThis": "Gather everyone around the prebuilt Town Map with the friend cutout placed on it.",
        "ask": "Look at the map — what do you notice?"
      },
      {
        "title": "Investigate & Brainstorm",
        "say": "Engineers solve problems with special steps! Step one: INVESTIGATE — look closely at where the friend lives. Step two: BRAINSTORM — share your ideas out loud!",
        "doThis": "Point to Investigate and Brainstorm on the Engineering Design Process picture. Give one quiet minute to study the map, then collect ideas.",
        "ask": "Who has an idea for how Panda can get to the friend's house?"
      },
      {
        "title": "Draw the Plan",
        "say": "Step three: PLAN! With your group, draw the path Panda should take to reach the friend's house — like a treasure route!",
        "doThis": "Groups draw their route on paper. Rotate to check each group's plan."
      },
      {
        "title": "Build the Program",
        "say": "Step four: BUILD! Use your drawing to snap the cards: yellow Event card first, then the arrow cards for your path, and the Green Flag at the end.",
        "doThis": "Groups build their program with the Event card, Action cards, and Green Flag using their plan."
      },
      {
        "title": "Test & Fix It",
        "say": "Last step: TEST! Run your program — and if Panda goes the wrong way, that's totally okay! Engineers find the mistake, change a card, and try again.",
        "doThis": "Groups test on the Town Map and iterate until Panda reaches the friend's house. Celebrate every arrival!",
        "ask": "What went well, and what problem did your team fix?"
      },
      {
        "title": "My Family Picture",
        "say": "Now let's be engineers one more time — plan and draw a picture of YOUR special family on page 18 of your workbook. We will share these with our families!",
        "doThis": "Pass out workbooks and drawing materials. Point to the Engineering Design Process picture on page 17. Close: next lesson we solve problems as a classroom community!"
      }
    ],
    "quiz": [
      {
        "question": "What makes every family special?",
        "options": [
          "Every family is different in its own way",
          "Families must all look the same",
          "Only big families are special"
        ],
        "answerIndex": 0,
        "explanation": "Yes! Big or small, whoever lives together — every family is different, and that's exactly what makes it special."
      },
      {
        "question": "What do engineers do FIRST?",
        "options": [
          "Press Go right away",
          "Investigate — look closely at the problem",
          "Take a nap"
        ],
        "answerIndex": 1,
        "explanation": "Right! First we investigate and look carefully, then brainstorm, plan, build, and test."
      },
      {
        "question": "Panda drove the WRONG way! What do we do?",
        "options": [
          "Cry and give up",
          "Hide the map",
          "Find the mistake, fix a card, and try again"
        ],
        "answerIndex": 2,
        "explanation": "Exactly! Mistakes are okay — engineers test, fix, and try again until it works."
      }
    ],
    "match": {
      "title": "Little Engineer Steps!",
      "pairs": [
        {
          "left": "🔍 Investigate",
          "right": "Look closely"
        },
        {
          "left": "💡 Brainstorm",
          "right": "Share ideas"
        },
        {
          "left": "✏️ Plan",
          "right": "Draw the path"
        },
        {
          "left": "🧱 Build",
          "right": "Snap the cards"
        },
        {
          "left": "🚦 Test",
          "right": "Go and fix"
        }
      ]
    }
  },
  "1.4": {
    "walk": [
      {
        "title": "Treasure Day!",
        "say": "Explorers, last time we learned every family is different — and our differences make our class special too! Today Panda and friends found a TREASURE MAP, and we will work together to collect the gems.",
        "doThis": "Hold up mTiny for everyone to see."
      },
      {
        "title": "Watch Treasure Video",
        "say": "Panda and friends are looking at the treasure map. There are gems to collect and obstacles in the way!",
        "doThis": "Play the Engage video. Pause at 0:32 after Panda asks how they can avoid the obstacles, get the gems, and reach the treasure.",
        "ask": "What should the friends do FIRST?"
      },
      {
        "title": "Four Thinking Powers",
        "say": "Panda's team used four superpowers of thinking to solve the problem — and today we get to use them too!",
        "doThis": "Pause at 2:06 after Panda says when we work together we can solve problems.",
        "ask": "How did the friends talk to each other when they agreed? And when they disagreed?"
      },
      {
        "title": "Look at the Map",
        "say": "Here is OUR treasure map! I see gems, a treasure chest, and some obstacles — some big, some small.",
        "doThis": "Gather everyone around the prebuilt Treasure Map.",
        "ask": "Look carefully — what do you notice on the map?"
      },
      {
        "title": "Break It Apart",
        "say": "Thinking power number one: DECOMPOSITION — a fancy word for breaking a big problem into little pieces! Instead of one giant problem, we go around one obstacle at a time.",
        "ask": "What is one small problem you see on the map? Will the big and small obstacles change how Panda travels?"
      },
      {
        "title": "Spot the Patterns",
        "say": "Thinking power number two: PATTERN RECOGNITION! Let's share our ideas — when lots of us have the SAME idea, that's a pattern.",
        "ask": "Who has an idea for helping Panda get the gems? Which ideas are the same?"
      },
      {
        "title": "Pick One Plan",
        "say": "Thinking power number three: ABSTRACTION — looking at all our ideas and choosing ONE to try. Every idea is valuable, and if our pick doesn't work, we can choose again!",
        "doThis": "Talk through the shared ideas and agree as a class on one route for Panda."
      },
      {
        "title": "Build the Algorithm",
        "say": "Thinking power number four: an ALGORITHM — our step-by-step plan! Snap the Event card, the arrow cards to grab each gem, and the Green Flag to reach the treasure chest.",
        "doThis": "Groups get mTiny, Tap Pen, 4 Action cards, Event card, and Green Flag. They build, test on the Treasure Map, and fix until Panda collects the gems and reaches the treasure!"
      },
      {
        "title": "Team Treasure Talk",
        "say": "We did it — we solved a problem as a classroom community! Today we used decomposition, pattern recognition, abstraction, and algorithmic thinking. Next time, we help the Earth!",
        "ask": "Why was it important to listen to each other's ideas?"
      }
    ],
    "quiz": [
      {
        "question": "What does decomposition mean?",
        "options": [
          "Breaking a big problem into small pieces",
          "Eating your vegetables",
          "Making Panda dizzy"
        ],
        "answerIndex": 0,
        "explanation": "Yes! Decomposition means breaking a big problem into little pieces so it's easier to solve."
      },
      {
        "question": "What is an algorithm?",
        "options": [
          "A silly dance",
          "A step-by-step plan to solve a problem",
          "A kind of gem"
        ],
        "answerIndex": 1,
        "explanation": "Right! An algorithm is our list of steps — like the coding cards that tell Panda exactly where to go."
      },
      {
        "question": "A friend has a DIFFERENT idea than you. What do we do?",
        "options": [
          "Cover our ears",
          "Listen — every idea helps us solve the problem",
          "Say only my idea counts"
        ],
        "answerIndex": 1,
        "explanation": "Exactly! In our classroom community every idea is valuable — listening helps us find the best plan together."
      }
    ],
    "match": {
      "title": "Thinking Superpowers!",
      "pairs": [
        {
          "left": "🧩 Decomposition",
          "right": "Break it apart"
        },
        {
          "left": "👀 Patterns",
          "right": "Spot same ideas"
        },
        {
          "left": "🎯 Abstraction",
          "right": "Pick one plan"
        },
        {
          "left": "📋 Algorithm",
          "right": "Steps in order"
        },
        {
          "left": "💎 Gems",
          "right": "Collect them all"
        }
      ]
    }
  },
  "1.5": {
    "walk": [
      {
        "title": "Our Common Home",
        "say": "Explorers, last time we solved problems together as a team. Today we use that teamwork for our BIGGEST job yet — helping the Earth, Our Common Home!",
        "doThis": "Hold up mTiny for everyone to see.",
        "ask": "Who remembers our thinking superpowers from last time?"
      },
      {
        "title": "What Is Pollution?",
        "say": "Panda and Milo are learning about something called pollution — something in the air, land, or sea that hurts living things.",
        "doThis": "Play the Engage video. Pause at 0:16 right after Panda asks what pollution is.",
        "ask": "What do you think pollution is?"
      },
      {
        "title": "Water and Soil",
        "say": "Milo says recycling plastics and keeping garbage out of the water keeps it clean, and putting chemicals away safely protects the soil. We can be Earth helpers!",
        "doThis": "Pause at 1:08 (water pollution) and 1:32 (soil pollution).",
        "ask": "What ELSE can we do to stop water pollution? And soil pollution?"
      },
      {
        "title": "Pollution Talk Circle",
        "say": "Pollution can make animals, people, and the Earth sick. There are three kinds — air, water, and soil pollution — and people cause them, so people can STOP them too!",
        "ask": "What can people do to stop pollution?"
      },
      {
        "title": "Explore the Lawn Map",
        "say": "Look at Panda's lawn! I see a lake, a bag of garbage, a tree, and a factory — some pictures are big and some are small.",
        "doThis": "Gather everyone around the Lawn Map with the four cutouts taped on and a task card next to each.",
        "ask": "Who can point to the big pictures? Who can point to the small ones?"
      },
      {
        "title": "Read the Task Cards",
        "say": "Each picture has a helper card: recycle bottles to keep the lake clean, put garbage into trash cans, trees help keep the air clean, and use the sun and wind to make energy!",
        "doThis": "Hold up each of the four task cards and describe the messy picture and the clean picture side by side."
      },
      {
        "title": "Code Panda to Help",
        "say": "Now your group will code Panda to visit each picture on the lawn and learn how to clean it up. Event card first, arrows to travel, Green Flag to go!",
        "doThis": "Groups get mTiny, Tap Pen, 4 Action cards, Event card, and Green Flag. They program Panda to each cutout and read the task card when Panda arrives. Rotate to help."
      },
      {
        "title": "Earth Helpers Chart",
        "say": "Let's collect all our Earth-helping ideas on one big chart — recycling, using trash cans, planting trees, saving energy. Look how much we know!",
        "doThis": "Create the class anchor chart with words or pictures as children share.",
        "ask": "What did you learn about pollution and helping the Earth?"
      },
      {
        "title": "Teach the World",
        "say": "Earth helpers share what they know! Today we learned that when we reduce pollution, we help the Earth and everyone living on it. Give our Common Home a big air-hug!",
        "ask": "How can you teach your family or friends to help the Earth?"
      }
    ],
    "quiz": [
      {
        "question": "What is pollution?",
        "options": [
          "Something that hurts our Earth's air, land, and water",
          "A yummy dessert",
          "A game Panda plays"
        ],
        "answerIndex": 0,
        "explanation": "Yes! Pollution is something in the air, land, or sea that harms living things — and we can help stop it."
      },
      {
        "question": "What helps keep the lake clean?",
        "options": [
          "Throwing bottles in the water",
          "Recycling our bottles",
          "Adding more garbage"
        ],
        "answerIndex": 1,
        "explanation": "Right! Recycling bottles keeps them out of the lake so the water stays clean for fish and friends."
      },
      {
        "question": "How do trees help Our Common Home?",
        "options": [
          "They help keep the air clean",
          "They eat sandwiches",
          "They make more pollution"
        ],
        "answerIndex": 0,
        "explanation": "Exactly! Trees help clean the air, so planting trees is a super way to help the Earth."
      }
    ],
    "match": {
      "title": "Earth Helper Match!",
      "pairs": [
        {
          "left": "🧴 Empty bottle",
          "right": "Recycle it"
        },
        {
          "left": "🗑️ Garbage",
          "right": "In the trash can"
        },
        {
          "left": "🌳 Trees",
          "right": "Clean the air"
        },
        {
          "left": "☀️ Sun and wind",
          "right": "Make clean energy"
        },
        {
          "left": "🏞️ Lake",
          "right": "Keep it clean"
        }
      ]
    }
  },
  "2.1": {
    "walk": [
      {
        "title": "Hello, Friends!",
        "say": "Good morning, friends! Today we get to learn with Panda, Toby, Milo, and Chicka again. I wonder what they will teach us today!",
        "ask": "Who wants to share what they WONDER our friends will teach us? Start with 'I wonder...'",
        "doThis": "Hold up the mTiny panda so everyone can see it while children share their wonders."
      },
      {
        "title": "Watch: Grumpy Panda",
        "say": "Uh oh, Panda is taking out the trash and making a very grumpy noise! Let's pause and be detectives.",
        "ask": "What do you SEE? What do you THINK is going on? What do you WONDER?",
        "doThis": "Play the Engage video and pause at 0:18, just as Toby walks up to grumpy Panda."
      },
      {
        "title": "Talk: Why Chores?",
        "say": "Toby says responsibilities are things we do to help ourselves AND others. Panda just imagined what would happen if nobody EVER took out the trash — yuck!",
        "ask": "What do you think would happen at YOUR house if nobody ever took the trash out?",
        "doThis": "Pause the video at 1:11, right after Panda imagines the stinky trash pile and reacts."
      },
      {
        "title": "Two Big Words",
        "say": "Toby taught us two new words: a ROLE is the job we have, and a RESPONSIBILITY is something we do to help. Toby also said coding is like having responsibilities — a list of jobs to do in order!",
        "ask": "What is one responsibility YOU have at home?"
      },
      {
        "title": "Station 1: Code Panda",
        "say": "At this station you get a challenge sheet with pictures and empty spaces. Place the coding cards in the right spots, tap them with the Tap Pen, then tap Go and watch Panda do its job!",
        "doThis": "Model one challenge: snap Forward, Forward, Turn Right onto the sheet, tap each card with the Tap Pen, then tap Go!"
      },
      {
        "title": "Station 2: Code a Friend",
        "say": "Here, one friend PRETENDS to be Panda and one friend is the coder. The coder shows the list of coding cards, and robot-friend follows every step on our floor grid!",
        "doThis": "Tape a paper grid on the floor. Have one child walk the squares exactly as the coding cards say — no skipping steps!"
      },
      {
        "title": "Station 3: Question Time",
        "say": "There are two kinds of questions! CLOSED questions have one tiny answer, like 'What letter does Panda start with?' OPEN questions have big long answers, like 'Why do we have responsibilities?'",
        "ask": "Is 'How many friends does Panda have?' an open or a closed question?",
        "doThis": "Sort the question cards together into an OPEN pile and a CLOSED pile."
      },
      {
        "title": "Test Our Code",
        "say": "Let's watch a friend's code run! When the coding steps are in order, Panda can do its job — but when a step is out of order, Panda might bump, fall, or go nowhere. Our family jobs work the same way!",
        "ask": "Did the code work? If not, how can we fix it?",
        "doThis": "Invite one volunteer to run their challenge code on mTiny in front of the class and test it."
      },
      {
        "title": "My Home Goal",
        "say": "Time to make a goal for home, just like a program! Pick one responsibility you want to do better, like: 'I will improve cleaning my room by putting my clothes away and making my bed.'",
        "doThis": "Open workbooks to page 12. Children draw their goal, cut-and-paste the goal cards, or fill in the sentence with help."
      }
    ],
    "quiz": [
      {
        "question": "What is a responsibility?",
        "options": [
          "A super yummy snack",
          "Something we do to help ourselves and others",
          "A silly dance move"
        ],
        "answerIndex": 1,
        "explanation": "Yes! Toby taught us that responsibilities are things we do to help ourselves and others — like taking out the trash!"
      },
      {
        "question": "What happens if Panda's coding steps are out of order?",
        "options": [
          "Panda gets it wrong and might bump into things",
          "Panda takes a cozy nap",
          "Panda turns into a real panda"
        ],
        "answerIndex": 0,
        "explanation": "Right! When the steps are mixed up, Panda can't do its job — just like us when we forget our responsibilities."
      },
      {
        "question": "'What letter does Panda start with?' — what kind of question is that?",
        "options": [
          "An open question with a long answer",
          "Not a question at all",
          "A closed question with one tiny answer"
        ],
        "answerIndex": 2,
        "explanation": "It's closed! There's only one little answer: P! Open questions, like 'Why is Panda upset?', have big long answers."
      }
    ],
    "match": {
      "title": "Home Helper Match-Up!",
      "pairs": [
        {
          "left": "🗑️ Trash",
          "right": "Take it out"
        },
        {
          "left": "🧸 Toys",
          "right": "Put them away"
        },
        {
          "left": "🛏️ Bed",
          "right": "Make it neat"
        },
        {
          "left": "🐶 Pet dog",
          "right": "Feed it"
        },
        {
          "left": "🍽️ Dishes",
          "right": "Help wash them"
        }
      ]
    }
  },
  "2.2": {
    "walk": [
      {
        "title": "Remember Last Time?",
        "say": "Friends, last time Panda taught us about roles, responsibilities, and coding steps. Let's warm up our brains!",
        "ask": "Turn and talk to the friend next to you: what did we learn last time with Panda?",
        "doThis": "Give pairs one minute to turn-and-talk, then let two or three friends share."
      },
      {
        "title": "Watch: The Line",
        "say": "Oh no! Chicka jumped in front of the line at the water fountain, and Panda said 'It's your responsibility to follow the rules!' Now Chicka looks sad.",
        "ask": "What do you SEE? What do you THINK is going on? What do you WONDER?",
        "doThis": "Play the Engage video and pause at 0:29, right after Panda speaks and Chicka walks away sad."
      },
      {
        "title": "Talk: A Better Way",
        "say": "Milo asked Panda a big question: 'What is a STRATEGY you could have used instead of pushing Chicka?' A strategy is steps we take to solve a problem.",
        "ask": "What could Panda have done instead of pushing? What kind words could Panda use?",
        "doThis": "Pause the video at 1:49, right after Milo asks the strategy question."
      },
      {
        "title": "Play: Strategy Game",
        "say": "Let's play the Strategy Card game! One friend pulls a black card with a problem, everyone else puts down a white strategy card that could help, and the black-card friend picks the best one.",
        "doThis": "Model one round, then split into groups of 3-4. As they play, ask 'Why do you think that is the best strategy?'"
      },
      {
        "title": "When Is Pulling OK?",
        "say": "Was Panda wrong to wait in line? No! But pulling Chicka wasn't the best strategy there. Strategies help us make SMART decisions — and the same strategy doesn't work every time.",
        "ask": "What if Chicka was about to step into the road and a car was coming — would pulling Chicka be a good strategy then?"
      },
      {
        "title": "Code a Square",
        "say": "Panda's coding steps are a strategy too — some people call them a SEQUENCE! Watch: Turn Right, Forward, Turn Right, Forward, Turn Right, Forward, Turn Right, Forward makes a square. That's a lot of cards!",
        "ask": "Do you notice anything that repeats over and over?",
        "doThis": "Code a volunteer 'robot friend' around a taped floor square using Program 1: Turn Right + Forward, four times in a row."
      },
      {
        "title": "Meet the Loop!",
        "say": "Here's a magic shortcut called a LOOP! We put Turn Right and Forward inside two parenthesis cards that look like the letter C, then the Repeat card says: do it 4 times!",
        "ask": "Can you make a letter C with both hands, like the parenthesis cards?",
        "doThis": "Show Program 2 side by side with Program 1: Start, ( Turn Right, Forward ) Repeat x4 — same square, way fewer cards!"
      },
      {
        "title": "Station: Loop Challenges",
        "say": "Now it's your turn! At the Panda station, use the loop challenge cards to build programs with parentheses and the Repeat card, then tap Go and watch Panda loop-de-loop!",
        "doThis": "Run stations: Station 1 = mTiny loop challenges, Station 2 = strategy list with the coach, extra station = code your friends."
      },
      {
        "title": "My Strategy List",
        "say": "Let's each build a personal strategy list — one strategy for coding Panda, one for friends and family, and one for schoolwork. These help us make SMART decisions!",
        "ask": "Which strategy did YOU choose to help you make SMART decisions?",
        "doThis": "Open workbooks to page 15-16. Children cut and paste strategy cards or write their three strategies."
      }
    ],
    "quiz": [
      {
        "question": "What is a strategy?",
        "options": [
          "A kind of sandwich",
          "A very fast robot",
          "Steps we take to solve a problem"
        ],
        "answerIndex": 2,
        "explanation": "Yes! Milo taught us that a strategy is steps we take to solve a problem — at school, at home, and when we code!"
      },
      {
        "question": "What does a LOOP do in our code?",
        "options": [
          "It does the same steps over and over",
          "It makes Panda fall asleep",
          "It erases all our cards"
        ],
        "answerIndex": 0,
        "explanation": "Right! A loop repeats the cards inside the parentheses — so our square program got much shorter with Repeat x4!"
      },
      {
        "question": "What was a better strategy than pushing Chicka in line?",
        "options": [
          "Push even harder",
          "Use kind words like 'Please wait your turn'",
          "Grab the water fountain first"
        ],
        "answerIndex": 1,
        "explanation": "Kind words are a great strategy! Pushing is only okay to keep a friend safe, like pulling them back from a car."
      }
    ],
    "match": {
      "title": "Pick the SMART Strategy!",
      "pairs": [
        {
          "left": "😠 Friend cuts line",
          "right": "Use kind words"
        },
        {
          "left": "🧩 Puzzle too hard",
          "right": "Ask for help"
        },
        {
          "left": "🚗 Car coming!",
          "right": "Pull friend back"
        },
        {
          "left": "🤖 Long code",
          "right": "Use a loop"
        },
        {
          "left": "😤 Feeling angry",
          "right": "Take deep breaths"
        },
        {
          "left": "🎲 Group game",
          "right": "Take turns"
        }
      ]
    }
  },
  "2.3": {
    "walk": [
      {
        "title": "Strategy Check-In",
        "say": "Friends, last time we learned about strategies! Let's see if our brains remember.",
        "ask": "What is a strategy, and what does it help us do? Talk with the friend next to you!",
        "doThis": "Quick turn-and-talk, then a couple of friends share out."
      },
      {
        "title": "Watch: Toby Falls!",
        "say": "Oh no — Toby made a surprised sound, fell down a hole, and dropped everything! Let's be see-think-wonder detectives.",
        "ask": "What do you see? Why do you think Toby fell? What do you wonder?",
        "doThis": "Play the Engage video and pause at 0:12, right after Toby falls."
      },
      {
        "title": "Signs Are Like Code",
        "say": "Toby fell because there was NO SIGN to warn about the hole! And Panda says something amazing: 'Signs are like coding too' — they tell people what to do, just like coding cards tell Panda.",
        "ask": "What signs have YOU seen in our town? What do they tell people to do?",
        "doThis": "Pause the video at 1:37, right after Panda says signs are like coding and Toby asks what that means."
      },
      {
        "title": "Our Design Steps",
        "say": "Let's make signs to help our community! We'll use the Engineering Design Process: investigate, brainstorm, plan, build, test, and share.",
        "ask": "Do you remember the steps? Let's say them together with a clap for each one!"
      },
      {
        "title": "Station: Measure It",
        "say": "At this station we measure real signs with three tools: a ruler for small things, a yardstick for medium things, and a measuring tape for BIG things — even how tall you are!",
        "doThis": "Set out printed signs plus mTiny-drawn text samples; children measure and say how big each one is."
      },
      {
        "title": "Station: Panda Draws",
        "say": "Panda can DRAW! We slide a marker into Panda's bottom, tap the green pen-DOWN card to start drawing, code our shape, then tap the pen-UP card to stop.",
        "ask": "We know loops now — how might we program Panda to draw a square?",
        "doThis": "Run it: Start, Pen-Down, ( Turn Right, Forward ) Repeat x4, Pen-Up, Go! Then try the Drawing Card to make letters — Challenge: draw a circle or your initials!"
      },
      {
        "title": "Station: Helper Match",
        "say": "At this station we play a memory game! Flip two cards — if the community helper matches their job, you keep the pair. The police keep us safe, the store owner sells us food, the garbage collector takes our trash!",
        "doThis": "Lay the Community Roles matching cards face-down; children flip two per turn and hunt for pairs."
      },
      {
        "title": "Build Our Signs",
        "say": "Now it's time to plan and BUILD! Pick one role or responsibility from our list — like 'recycle' or 'be kind' — and make a sign that reminds everyone in our community to do it.",
        "doThis": "Hand out big paper, markers, crayons, scissors, and glue. Extension: let mTiny draw letters or shapes for the signs!"
      },
      {
        "title": "Share and Hang",
        "say": "You investigated, brainstormed, planned, and built — amazing engineering! Now for the next steps: test and share by hanging our signs around the school.",
        "ask": "Who would like to hold up their sign and tell us what it reminds people to do?",
        "doThis": "Do a gallery share on the carpet, then plan where each sign will hang."
      }
    ],
    "quiz": [
      {
        "question": "Why did Toby fall into the hole?",
        "options": [
          "Toby was dancing too fast",
          "There was no sign to warn Toby",
          "The hole was chasing Toby"
        ],
        "answerIndex": 1,
        "explanation": "Yes! There was no sign, so Toby didn't know the hole was there. Signs remind people what to do and keep us safe!"
      },
      {
        "question": "Which card makes Panda START drawing?",
        "options": [
          "The green pen-DOWN card",
          "The pizza card",
          "The nap card"
        ],
        "answerIndex": 0,
        "explanation": "Right! Pen-down starts the drawing and pen-up stops it — with a marker in Panda's bottom!"
      },
      {
        "question": "What is the garbage collector's job in our community?",
        "options": [
          "Baking yummy cookies",
          "Flying airplanes",
          "Keeping our town clean by taking the trash"
        ],
        "answerIndex": 2,
        "explanation": "That's it! Every helper has a role — the garbage collector keeps our community clean by taking away our trash."
      }
    ],
    "match": {
      "title": "Helpers on the Job!",
      "pairs": [
        {
          "left": "👮 Police",
          "right": "Keeps us safe"
        },
        {
          "left": "🏪 Store owner",
          "right": "Sells us food"
        },
        {
          "left": "🚛 Garbage collector",
          "right": "Takes the trash"
        },
        {
          "left": "🧑‍🏫 Teacher",
          "right": "Helps us learn"
        },
        {
          "left": "🚧 Sign",
          "right": "Reminds our jobs"
        }
      ]
    }
  },
  "2.4": {
    "walk": [
      {
        "title": "Our Common Home",
        "say": "Friends, we've learned about our roles at home, at school, and in our community. Today we zoom WAY out — to Our Common Home. Our Common Home is the Earth!",
        "ask": "Who lives in Our Common Home? (Hint: everyone and everything!)"
      },
      {
        "title": "Watch: Sad Panda",
        "say": "Panda is walking through town making sad sounds. There's trash in the park... and now trees are being cut down!",
        "ask": "What do you see? What do you think is going on? What do you wonder?",
        "doThis": "Play the Engage video; pause at 0:07 (trash in the park) and again at 0:15 (trees being cut down)."
      },
      {
        "title": "Out of Control!",
        "say": "Panda says: 'This is getting out of control! We are destroying the Earth, our common home. I need to do something about this.' There's even trash floating in the river!",
        "ask": "If YOU were Panda, how would you feel? What would you care about?",
        "doThis": "Pause at 0:28 after Panda speaks. Do Think-Feel-Care: what is Panda's role, how does Panda feel, what does Panda care about?"
      },
      {
        "title": "Four Thinking Powers",
        "say": "We can help Panda with our four computational thinking powers: DECOMPOSITION breaks a big problem into small pieces, ABSTRACTION picks what's important, PATTERN RECOGNITION connects what we already know, and ALGORITHMIC THINKING follows steps in order!",
        "doThis": "Display the four skill posters around the room and do a fun action for each (break apart hands, magnifying glass, pointing finger, marching steps)."
      },
      {
        "title": "Station: Code the Journey",
        "say": "Panda traveled through the town and found all the environmental problems. Let's use algorithmic thinking to code Panda's whole trip — the stops are numbered right on the map!",
        "doThis": "Lay out the Town Map with the printed disaster pictures on it. Children snap Forward and Turn cards to drive Panda from number to number, tap with the Tap Pen, then Go!"
      },
      {
        "title": "Station: Remember and Connect",
        "say": "This is our pattern recognition station with me! We'll look back at what we learned about questions, roles, and strategies, and pick ideas that could help Panda — like putting trash in the bin!",
        "ask": "Where might all that trash be coming from? What other questions do you have?",
        "doThis": "Work on workbook pages 22-23: list 1-2 questions, 2-3 helpful responsibilities, and strategies like the engineering design process."
      },
      {
        "title": "Station: Who Is Hurt?",
        "say": "This is our abstraction station! Look closely at pictures from the video and find who the changes are hurting — with trash in the water, the FISH are impacted!",
        "doThis": "Give each group printed pictures from the video. Children circle every person, animal, or plant being impacted, right on the image."
      },
      {
        "title": "Break It Down",
        "say": "Now our last thinking power: decomposition! Let's break Panda's big problem into small pieces — the river has trash, the trees are being cut, the park is messy.",
        "ask": "Who are the people and living things impacted? What would happen if the trees or the fish were all gone?",
        "doThis": "Chart the answers on the board as children turn-and-talk and share."
      },
      {
        "title": "Problem, People, Plan",
        "say": "Time to brainstorm like heroes! For each problem, write who it impacts and a possible solution — like: trash in the river hurts the fish, so let's add more trash cans around town!",
        "ask": "Which problem do you think is the MOST important? Draw a star next to it — we'll use it next lesson!",
        "doThis": "Workbook page 24: fill in 'Problem I See', 'Who it Impacts', and 'A Possible Solution' in small groups, then share out."
      }
    ],
    "quiz": [
      {
        "question": "What is Our Common Home?",
        "options": [
          "Panda's treehouse",
          "The toy box",
          "The Earth — where we ALL live"
        ],
        "answerIndex": 2,
        "explanation": "Yes! Our Common Home is the Earth, and everyone shares it — people, pandas, fish, and trees!"
      },
      {
        "question": "Who gets hurt when trash floats in the river?",
        "options": [
          "The fish and animals that live there",
          "Nobody at all",
          "Only robots"
        ],
        "answerIndex": 0,
        "explanation": "Right! Trash in the water impacts the fish, the animals that drink, the swimmers, and even the ocean!"
      },
      {
        "question": "How did we help Panda today?",
        "options": [
          "We threw more trash in the park",
          "We found the problems and brainstormed solutions",
          "We hid under the table"
        ],
        "answerIndex": 1,
        "explanation": "We used our four thinking powers to investigate Panda's problem and brainstorm ways to fix it — like real problem solvers!"
      }
    ],
    "match": {
      "title": "Save Our Common Home!",
      "pairs": [
        {
          "left": "🗑️ Trash in park",
          "right": "Put it in bins"
        },
        {
          "left": "🌳 Trees cut down",
          "right": "Plant new trees"
        },
        {
          "left": "🐟 Trash in river",
          "right": "Clean the water"
        },
        {
          "left": "💡 Lights left on",
          "right": "Switch them off"
        },
        {
          "left": "🚿 Water running",
          "right": "Turn off the tap"
        }
      ]
    }
  },
  "2.5": {
    "walk": [
      {
        "title": "The Story So Far",
        "say": "Friends, last time we helped Panda find the problems hurting Our Common Home, and you each put a star next to the problem you care about most. Today we become RESEARCH detectives!",
        "ask": "Who remembers which problem they starred in their workbook?"
      },
      {
        "title": "Real or Pretend?",
        "say": "Toby shows Panda a picture of a dog riding a motorcycle and asks: 'Is this real or pretend?' Hmm... tricky!",
        "ask": "What do you think — is a dog really driving that motorcycle? How can we tell?",
        "doThis": "Play the Engage video and pause at 1:28, right after Toby shows the tricky picture."
      },
      {
        "title": "Trust Detective Questions",
        "say": "Not everything we see or read is true! Before we believe something, we ask our detective questions: Does it make sense? Who is telling us? Can we read more about it? Can we find it in other books or websites?",
        "doThis": "Say the four questions together, holding up one finger for each."
      },
      {
        "title": "Picture Detectives",
        "say": "Now it's your turn! With a friend, look super closely at two real pictures of Earth changing and use see-think-wonder like detectives.",
        "ask": "What do you SEE? What do you THINK of it? What does it make you WONDER?",
        "doThis": "Pairs examine the two printed pictures with workbook pages 27-28. Ask 'What makes you say that?' as you circulate."
      },
      {
        "title": "Big Earth Words",
        "say": "You discovered five BIG words today! Pollution is yucky stuff that hurts living things, deforestation is cutting down forests, overfishing is taking too many fish, climate change is the Earth changing and warming, and overpopulation is too many people squeezed in one place.",
        "ask": "Which big word matches what you saw in YOUR picture?"
      },
      {
        "title": "Open and Closed",
        "say": "Remember our two question types? OPEN questions start with 'why' or 'how might' and have big long answers. CLOSED questions start with 'what', 'where', or 'who' and have short answers — both help us research!",
        "ask": "Is 'Why does climate change happen?' open or closed? What about 'What is climate change?'"
      },
      {
        "title": "My Research Questions",
        "say": "Let's put it all together! Pick your starred problem, write one OPEN question with 'why' or 'how might', two CLOSED questions with 'where, who, when, or what' — then 2-3 ways YOU can help solve it.",
        "doThis": "Workbook pages 29-30, in small groups or all together. Model one example first: 'How might we stop pollution?'"
      },
      {
        "title": "Panda Signs Our Pledge",
        "say": "Panda wants to help too! Let's have Panda draw on our class Help-the-Earth pledge poster using the marker and the drawing cards.",
        "doThis": "Slide a marker into mTiny, tap Start, Pen-Down, code a shape or a letter (try E for Earth!), Pen-Up, Go — right on the pledge paper."
      },
      {
        "title": "Share Out",
        "say": "You worked so hard today, friends! We will work as a classroom community to do our part for Our Common Home.",
        "ask": "Who would like to share their problem, one question they wrote, and one way they plan to help?",
        "doThis": "Chart 3-5 shared questions and helping ideas on the board as friends share."
      }
    ],
    "quiz": [
      {
        "question": "Was the dog REALLY riding the motorcycle in Toby's picture?",
        "options": [
          "Yes, dogs drive every day",
          "No — the picture was pretend, so we check before we believe",
          "The dog was actually flying"
        ],
        "answerIndex": 1,
        "explanation": "Tricky picture! Not everything we see is true — that's why we ask our detective questions: does it make sense, and who is telling us?"
      },
      {
        "question": "What does DEFORESTATION mean?",
        "options": [
          "Cutting down trees and forests",
          "Planting pretty flowers",
          "A dance party for trees"
        ],
        "answerIndex": 0,
        "explanation": "Yes! Deforestation means trees and forests are cut down by humans — and the animals lose their homes."
      },
      {
        "question": "Which one is an OPEN question?",
        "options": [
          "What color is Panda?",
          "How many legs does Chicka have?",
          "Why does climate change happen?"
        ],
        "answerIndex": 2,
        "explanation": "'Why does climate change happen?' is open — it starts with WHY and needs a big long answer. The others have tiny short answers!"
      }
    ],
    "match": {
      "title": "Big Word Detective Match!",
      "pairs": [
        {
          "left": "🏭 Pollution",
          "right": "Yucky stuff hurts Earth"
        },
        {
          "left": "🪓 Deforestation",
          "right": "Cutting down trees"
        },
        {
          "left": "🎣 Overfishing",
          "right": "Taking too many fish"
        },
        {
          "left": "🌡️ Climate change",
          "right": "Earth getting warmer"
        },
        {
          "left": "🏘️ Overpopulation",
          "right": "Too many people"
        }
      ]
    }
  },
  "3.1": {
    "walk": [
      {
        "title": "Hello Problem-Solvers",
        "say": "Hello friends! We have been learning how to solve tricky problems, and today Panda and our friends have a brand-new trick to teach us. It helps when we feel upset with a friend!",
        "ask": "Have you ever felt mad or sad because of something a friend did?"
      },
      {
        "title": "Watch Panda's Video",
        "say": "Let's watch Panda, Milo, Chicka and Toby. Milo can't reach the top of the bookshelf, Chicka is being bullied, and Toby takes Panda's toy. Each time, magic words pop up: Stop - Think - Reflect!",
        "doThis": "Play the Engage video. Pause at 0:16 (Milo and the bookshelf), 0:46 (Chicka is bullied), and 1:14 (Toby takes the toy). At each pause ask: How does the friend feel? Why? What might happen next? How should Panda help?"
      },
      {
        "title": "Stop, Think, Reflect",
        "say": "When we get upset or angry with someone, that is called a conflict. Our friends taught us to Stop, Think, and Reflect — reflect means to think about what happened. It's like breaking a big problem into little pieces!",
        "ask": "When we break something big into little pieces, what thinking skill is that? (Decomposition!)",
        "doThis": "Do the moves together: STOP (hands out flat), THINK (finger on head), REFLECT (hands on heart)."
      },
      {
        "title": "The Toy Story",
        "say": "Let's act one out with our robot friend! In this story, Panda walks over to Milo and grabs the toy right out of Milo's hand. Poor Milo is so mad!",
        "doThis": "Pick a volunteer to be Milo holding a toy. Snap Forward cards on the mat to drive mTiny (Panda) to Milo, tap them with the Tap Pen, then tap Go! When mTiny arrives, act out the grab."
      },
      {
        "title": "Stop-Think-Reflect Together",
        "say": "Now let's use our new trick on that story. Panda could have asked to share, or asked Milo when it would be his turn — kind words fix problems that grabbing never can!",
        "ask": "Stop: what did you see? Think: how did Milo feel? Reflect: what could Panda do differently?"
      },
      {
        "title": "Code Your Story",
        "say": "Now it's your turn, friends! Each group gets a story sheet with a kid problem, a little map, and a space for your coding cards.",
        "doThis": "In groups of 3-4, hand out the Scenario Worksheets. Groups read their story, snap the Forward and Turn cards to match the map, run mTiny, then answer the Stop-Think-Reflect questions on the sheet."
      },
      {
        "title": "Share Our Strategies",
        "say": "Wonderful coding, friends! Let's hear each group's conflict and the kind idea they found. I'll write every strategy on our big list!",
        "ask": "What was your conflict, and what could be done differently so nobody gets hurt?",
        "doThis": "Invite 1-2 groups to re-run their mTiny code for the class, then chart each group's strategy on the board."
      },
      {
        "title": "Magic 'I' Words",
        "say": "Here are two more super strategies! Start with 'I' — say 'I feel sad because of those words' instead of 'you were mean.' And ask kind questions like 'Can we share the toy and play together?'",
        "doThis": "Practice as a class: everyone says together, 'I feel... Can we share?'"
      },
      {
        "title": "My Strategy Book",
        "say": "Time to make our mark! Pick 3 to 5 favorite strategies from our list and put them in your workbook, then peek at your old goals — did you reach them?",
        "doThis": "Open workbook page 12. Learners copy strategies and Stop-Think-Reflect on their goals from Units 1 and 2: reached it? Write a new one! Not yet? What will you change?"
      }
    ],
    "quiz": [
      {
        "question": "You feel mad at a friend. What do we do FIRST?",
        "options": [
          "Stop, Think, Reflect",
          "Yell really loud",
          "Grab their toy"
        ],
        "answerIndex": 0,
        "explanation": "Yes! We stop our bodies, think about feelings, and reflect on what to do — just like Panda!"
      },
      {
        "question": "Panda wants Milo's toy. What are the magic words?",
        "options": [
          "Give it NOW!",
          "Can we share and play together?",
          "I'm telling!"
        ],
        "answerIndex": 1,
        "explanation": "Kind questions like 'Can we share?' solve problems — grabbing just makes friends sad."
      },
      {
        "question": "What does 'reflect' mean?",
        "options": [
          "To jump very high",
          "To eat bamboo",
          "To think about what happened"
        ],
        "answerIndex": 2,
        "explanation": "Reflect means to think about it — that is how we learn to do better next time!"
      }
    ],
    "match": {
      "title": "Panda's Peace Moves",
      "pairs": [
        {
          "left": "🛑 Stop",
          "right": "Freeze your body"
        },
        {
          "left": "🤔 Think",
          "right": "How do they feel?"
        },
        {
          "left": "💭 Reflect",
          "right": "What can I change?"
        },
        {
          "left": "🧸 Want a toy",
          "right": "Can we share?"
        },
        {
          "left": "😢 Sad friend",
          "right": "Can I help you?"
        },
        {
          "left": "💬 Start with I",
          "right": "I feel sad"
        }
      ]
    }
  },
  "3.2": {
    "walk": [
      {
        "title": "Remember Our Trick",
        "say": "Hi friends! Last time Panda taught us a three-step trick for solving problems with friends. Tell the friend next to you what it was!",
        "ask": "Who can share the strategy? (Stop - Think - Reflect!)",
        "doThis": "60-second turn-and-talk, then one volunteer shares."
      },
      {
        "title": "Watch: Panda's Trash Trouble",
        "say": "In today's video, Panda is cleaning up trash and makes a big ANGRY noise! Then Toby asks a very good question about three special R words.",
        "doThis": "Play the Engage video. Pause at 0:15 after the angry noise: Stop — what did you see? Think — how does Panda feel? Reflect — why? Pause again at 1:15 when Toby asks what reduce, reuse, and recycle mean."
      },
      {
        "title": "The 3 R Words",
        "say": "Reduce means use LESS. Reuse means use it AGAIN. Recycle means turn it into something NEW! These are strategies to take care of Our Common Home — the Earth!",
        "ask": "Can you say all three R words with me?",
        "doThis": "Chant with actions: Reduce (hands squeeze small), Reuse (roll hands in a circle), Recycle (draw a big triangle in the air)."
      },
      {
        "title": "Scavenger Hunt!",
        "say": "Time for a scavenger hunt! Find ONE thing in our room that we could reduce, reuse, or recycle, and bring it back to the carpet. Looking for just the important things is a thinking skill called abstraction!",
        "doThis": "Set the rules: walk, only loose things, don't break anything, 4 minutes. Go!"
      },
      {
        "title": "Sort the Treasure",
        "say": "Look at these three bins: Reduce, Reuse, Recycle. One by one, let's put our treasures in the right bin and I'll make a big list on the board!",
        "ask": "What makes you say your item goes in that bin?",
        "doThis": "Each child places their item in a bin; pull items out one-by-one and discuss. Chart everything."
      },
      {
        "title": "Pattern Detectives",
        "say": "Let's be pattern detectives with our list! Lots of things are made of cardboard, plastic, or metal — and lots can become something brand new.",
        "ask": "What patterns do you spot? What are the items made of?"
      },
      {
        "title": "Big Secret Project",
        "say": "Friends, big news: we are going to build our very own BOARD GAME with Panda to teach other people the 3 R's! Look at this game — what do all board games need?",
        "ask": "What do board games have? (A board, rules, pieces, a way to win!)",
        "doThis": "Hold up a board game the class knows and list their answers on the board."
      },
      {
        "title": "Brainstorm Time",
        "say": "Engineers always brainstorm first — that means catching every idea like fireflies! In small groups, dream up what our board looks like, how you win, and how it teaches the 3 R's.",
        "doThis": "Open workbook page 15 'Board Game Brainstorm.' Groups explore the board games, mTiny, coding cards and map pieces around the room for about 12 minutes, then share ideas as a class."
      },
      {
        "title": "My 3R Promise",
        "say": "Today we learned the 3 R's, sorted real things into bins, and started dreaming our game. Quietly think of ONE way YOU will reduce, reuse, or recycle this week!",
        "ask": "Who would like to share their 3R promise?"
      }
    ],
    "quiz": [
      {
        "question": "What does REUSE mean?",
        "options": [
          "Throw it far away",
          "Use it again",
          "Buy a new one"
        ],
        "answerIndex": 1,
        "explanation": "Reuse means use it again — an old shirt can become a doll blanket!"
      },
      {
        "question": "Where should an empty metal can go?",
        "options": [
          "Under the bed",
          "In the toy box",
          "In the recycle bin"
        ],
        "answerIndex": 2,
        "explanation": "Recycling turns the old can into something brand new!"
      },
      {
        "question": "What are we building with Panda to teach the 3 R's?",
        "options": [
          "A board game",
          "A rocket ship",
          "A giant sandwich"
        ],
        "answerIndex": 0,
        "explanation": "We are making a 3 R's board game so other kids can learn to help Our Common Home!"
      }
    ],
    "match": {
      "title": "The 3R Round-Up",
      "pairs": [
        {
          "left": "📉 Reduce",
          "right": "Use less"
        },
        {
          "left": "🔁 Reuse",
          "right": "Use it again"
        },
        {
          "left": "♻️ Recycle",
          "right": "Make something new"
        },
        {
          "left": "🥫 Empty can",
          "right": "Recycle bin"
        },
        {
          "left": "👕 Old T-shirt",
          "right": "Doll blanket"
        },
        {
          "left": "💡 Lights off",
          "right": "Save power"
        }
      ]
    }
  },
  "3.3": {
    "walk": [
      {
        "title": "3R Memory Check",
        "say": "Hello friends! Last time we learned three special R words. Do you remember them?",
        "ask": "What are the 3 R's, and why did Panda teach us about them? (Reduce, reuse, recycle — to help Our Common Home!)"
      },
      {
        "title": "Watch: Game Plans",
        "say": "Let's see how Panda and friends plan THEIR game! Chicka forgets what the R words mean — can we help remind her?",
        "doThis": "Play the Engage video. Pause at 0:21 (what does reduce mean?), 0:42 (what does reuse mean?), 0:56 (what does recycle mean?), and 2:43 when Panda talks about breaking down the work — ask which thinking skill breaks things down (decomposition!)."
      },
      {
        "title": "Time to Plan",
        "say": "We already investigated and brainstormed like real engineers. The next stage of the Engineering Design Process is PLANNING! Today we plan our rules and start to build.",
        "ask": "What does our game need? (Rules, a board, cards, ways to code with mTiny!)"
      },
      {
        "title": "Write Our Rules",
        "say": "Walk around and visit the mTiny stations, then think of TWO rules for our game. For example: you must use mTiny Discover every time it is your turn!",
        "doThis": "Open workbook page 18 'Game Rules.' Learners visit the coding cards, maps and mTiny stations placed around the room and write (or think of) 2 rules — about 6 minutes."
      },
      {
        "title": "Pick the Best Rules",
        "say": "Let's share our rules and I'll write them on the chart! We'll pick the best ones together so everyone knows how our game works.",
        "ask": "Do we all agree on these rules? Will they help someone win fairly?",
        "doThis": "Chart the rules, remove duplicates, and narrow the list down as a class."
      },
      {
        "title": "Choose Your Job",
        "say": "Big projects get easier when we break them into jobs — that's decomposition! You can be a Game Board Designer, a Game Piece Maker, a Game Card Builder, or a Game Writer.",
        "ask": "Which job would you like to do?",
        "doThis": "Explain each role: Board Designers draw and color the board using the mTiny maps; Piece Makers build player pieces; Card Builders draw things to reduce, reuse or recycle; Game Writers write the steps like little algorithms. Vote or assign, then move into groups."
      },
      {
        "title": "Build, Build, Build!",
        "say": "Engineers, it's BUILD time! Sketch first, then create — and Board Designers, let mTiny drive across your board to test that the path works!",
        "doThis": "Groups build for 15-20 minutes. Keep mTiny and the Tap Pen with the Board Designers so they can snap cards and test-drive the board as they go."
      },
      {
        "title": "Show What We Made",
        "say": "Builders, freeze and shine! When I call your job, hold your work up high so everyone can see. We are one giant step closer to teaching others about Our Common Home!",
        "doThis": "Call each role — Board Designers! Piece Makers! Card Builders! Game Writers! — and let them hold up their creations. Remind them: next time, we TEST the game!"
      }
    ],
    "quiz": [
      {
        "question": "We investigated, brainstormed, and planned. What comes next?",
        "options": [
          "Take a nap",
          "Build!",
          "Erase everything"
        ],
        "answerIndex": 1,
        "explanation": "Engineers build after they plan — and that is exactly what we did today!"
      },
      {
        "question": "What does a Game Board Designer do?",
        "options": [
          "Hides all the pieces",
          "Eats the game cards",
          "Draws and colors the board"
        ],
        "answerIndex": 2,
        "explanation": "Board Designers draw and color the board using the mTiny maps as their guide!"
      },
      {
        "question": "Why does mTiny drive on the board while we build?",
        "options": [
          "To test that the path works",
          "Because mTiny is bored",
          "To make tire marks"
        ],
        "answerIndex": 0,
        "explanation": "Testing as we build helps us catch problems early — smart engineers test!"
      }
    ],
    "match": {
      "title": "Dream Team Jobs",
      "pairs": [
        {
          "left": "🎨 Board Designer",
          "right": "Draws the board"
        },
        {
          "left": "♟️ Piece Maker",
          "right": "Makes player pieces"
        },
        {
          "left": "🃏 Card Builder",
          "right": "Makes 3R cards"
        },
        {
          "left": "✏️ Game Writer",
          "right": "Writes the steps"
        },
        {
          "left": "🐼 mTiny Panda",
          "right": "Tests the path"
        }
      ]
    }
  },
  "3.4": {
    "walk": [
      {
        "title": "Engineer Check-In",
        "say": "Hi friends! Our board game is coming out SO well. We already investigated, brainstormed, planned, and built — today we move to the next engineer stage!",
        "ask": "Which stages of the Engineering Design Process have we finished so far?"
      },
      {
        "title": "Watch: Iter-WHAT?",
        "say": "In today's video, Chicka uses a funny new word and Panda says 'Iter-WHAT?' Let's find out what it means!",
        "doThis": "Play the Engage video. Pause at 0:41 after Panda says 'Iter-what?' and ask: what do you think iteration means? Pause at 1:19 and ask: what thinking skills do we practice when we iterate?"
      },
      {
        "title": "Test by Playing",
        "say": "Iterate means test it and make it BETTER — and the best way to test a board game is to PLAY it! We'll take turns so everyone gets a chance.",
        "doThis": "Set up the board, pieces, cards, mTiny, Tap Pen and coding cards. Play for 10-15 minutes, rotating players."
      },
      {
        "title": "Watch Like Detectives",
        "say": "While you wait for your turn, be a game detective! Keep these four questions in your head — every problem you spot is treasure that makes our game better.",
        "ask": "How can we make the game work better? Easier to play? More fair? More beautiful?",
        "doThis": "Display the four questions where everyone can see. Watchers raise a hand to share observations and the coach records each one."
      },
      {
        "title": "Our Action Plan",
        "say": "An action plan is a strategy where we list our next steps: the problem we saw, the fix we'll make, and WHO will fix it. Broken things get fixed first!",
        "doThis": "Draw a 3-column chart — Problems we noticed / Solutions / Who will fix it. Walk through the four detective questions and fill it in together; pick just 3-5 fixes for today.",
        "ask": "Which problems should we fix first?"
      },
      {
        "title": "Fix-It Time",
        "say": "Back to your teams, engineers — Board Designers, Piece Makers, Card Builders and Game Writers each have a job on the action plan. Test your fixes with mTiny as you go!",
        "doThis": "Groups iterate for 15-20 minutes with makerspace materials (markers, glue, scissors). Keep mTiny, the Tap Pen and coding cards out for testing. Groups that finish can play the game."
      },
      {
        "title": "What Did You Fix?",
        "say": "Time's up, fix-it friends! In just one or two words, shout out what your team iterated today.",
        "doThis": "Rapid-fire share out around the circle."
      },
      {
        "title": "Iterate Forever",
        "say": "Today we learned that iterate means making something better after testing it — and we made a real action plan like grown-up engineers. Next time, we share our game with the world!",
        "ask": "What is one thing that is better about our game now than this morning?"
      }
    ],
    "quiz": [
      {
        "question": "What does ITERATE mean?",
        "options": [
          "Throw it in the trash",
          "Test it and make it better",
          "Play forever and ever"
        ],
        "answerIndex": 1,
        "explanation": "Iterate means we test, find problems, and make it better — engineers do it all the time!"
      },
      {
        "question": "Our game piece keeps falling over. What do we do?",
        "options": [
          "Hide it under the rug",
          "Cry very loudly",
          "Put it on the action plan and fix it"
        ],
        "answerIndex": 2,
        "explanation": "Problems go on our action plan: the problem, the fix, and who will fix it!"
      },
      {
        "question": "Which question helps us make the game better?",
        "options": [
          "How can we make it more fair?",
          "What's for lunch today?",
          "Who can shout loudest?"
        ],
        "answerIndex": 0,
        "explanation": "Our four detective questions: work better, easier, more fair, more beautiful!"
      }
    ],
    "match": {
      "title": "Fix-It Detectives",
      "pairs": [
        {
          "left": "⚙️ Work better",
          "right": "Fix broken parts"
        },
        {
          "left": "🙂 Easier",
          "right": "Simple rules"
        },
        {
          "left": "⚖️ More fair",
          "right": "Turns for everyone"
        },
        {
          "left": "🌈 More beautiful",
          "right": "Add bright colors"
        },
        {
          "left": "🔁 Iterate",
          "right": "Test, fix, again!"
        }
      ]
    }
  },
  "3.5": {
    "walk": [
      {
        "title": "Remember Everything",
        "say": "Hi friends! Today we wrap up our Panda board game project. Turn to the friend next to you and remember ALL the amazing things we put into our game!",
        "ask": "What strategies, ideas and lessons went into our game? (The 3 R's, the Engineering Design Process, coding cards, mTiny, our team roles!)",
        "doThis": "60-second turn-and-talk, then share out as a group."
      },
      {
        "title": "Watch: The Big Mark",
        "say": "In our last video, Panda and friends visit the park and the river after sharing their game with everyone. Wait until you see what changed!",
        "doThis": "Play the Engage video. Pause at 0:15 when Milo sees the sparkling clean park, and at 1:42 when Chicka sees the clean river. At each pause ask: What do you see? What do you think? What do you wonder?"
      },
      {
        "title": "Panda Made a Mark",
        "say": "Panda's game taught the whole community, and look — people started recycling and even put up recycling bins! That is what making your mark means.",
        "ask": "What happened in the town because of Panda's game?"
      },
      {
        "title": "How Will WE Share?",
        "say": "Panda's friends planned a game night and a video to share their game with the world. In little groups, dream up 2 or 3 ways WE can share our game!",
        "doThis": "In groups of 2-3, brainstorm for 4-5 minutes and write ideas on workbook page 23."
      },
      {
        "title": "Pick Our Way",
        "say": "Let's hear every idea — all ideas are good ideas! We could take pictures for our parents, teach another class to play, make a video, or write for the school newspaper.",
        "ask": "Which sharing idea should our class choose?",
        "doThis": "Chart every idea, then vote as a class on ONE way to share the game."
      },
      {
        "title": "3-2-1 Reflection",
        "say": "Reflecting means thinking about your own thinking! We'll use the 3-2-1 strategy: 3 things you learned, 2 things you found interesting, and 1 question you still have.",
        "doThis": "Model with the sentence starters on workbook pages 24-26: 'I learned about strategies — they are ways we solve problems. I thought coding was interesting because code tells mTiny what to do. I still wonder why code does not work every time!'"
      },
      {
        "title": "My Own 3-2-1",
        "say": "Now it's your turn, friends. Flip back through your workbook to remember all our adventures, then fill in your very own 3-2-1!",
        "doThis": "Learners work independently on workbook pages 24-26 for 10-15 minutes. Circulate and help; give a 1-minute warning."
      },
      {
        "title": "Share and Shine",
        "say": "Let's hear some of your reflections! Something you learned, something interesting, and a question we can chase together next time.",
        "ask": "Who would like to share one thing from their 3-2-1?",
        "doThis": "Call on 2-3 learners for each part: learned, interesting, still wondering."
      },
      {
        "title": "The Grand Goodbye",
        "say": "We learned so much from each other and from Panda, Milo, Toby and Chicka! You solved problems, built a whole game, and made your mark on Our Common Home — give yourselves a giant panda hug!",
        "doThis": "Big class cheer, then let mTiny do a happy dance across the mat: snap Forward, Turn Left, Turn Right, Forward, tap them, and Go!"
      }
    ],
    "quiz": [
      {
        "question": "What happened after Panda shared the game with the town?",
        "options": [
          "Nothing at all",
          "The park got clean and recycling bins appeared",
          "It rained candy"
        ],
        "answerIndex": 1,
        "explanation": "Sharing the game taught everyone the 3 R's — the park and river got clean, and the town added recycling bins!"
      },
      {
        "question": "In our 3-2-1 reflection, what does the 1 stand for?",
        "options": [
          "One cookie to eat",
          "One robot to hug",
          "One question I still have"
        ],
        "answerIndex": 2,
        "explanation": "3 things learned, 2 interesting things, and 1 question we still wonder about!"
      },
      {
        "question": "Why do we share our game with other people?",
        "options": [
          "To teach them to help Our Common Home",
          "To show off and brag",
          "So nobody else can play"
        ],
        "answerIndex": 0,
        "explanation": "Sharing what we learned helps others take care of the Earth too — that's making our mark!"
      }
    ],
    "match": {
      "title": "Share and Shine",
      "pairs": [
        {
          "left": "3️⃣ Three",
          "right": "Things I learned"
        },
        {
          "left": "2️⃣ Two",
          "right": "Interesting things"
        },
        {
          "left": "1️⃣ One",
          "right": "Question I have"
        },
        {
          "left": "📸 Photos",
          "right": "Send to parents"
        },
        {
          "left": "🎲 Game night",
          "right": "Play with friends"
        },
        {
          "left": "📰 Newspaper",
          "right": "Tell the school"
        }
      ]
    }
  }
};
