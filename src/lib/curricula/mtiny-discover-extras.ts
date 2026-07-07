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

export const DISCOVER_EXTRAS: Record<string, DiscoverExtra> =  {
  "1.1": {
    "walk": [
      {
        "title": "A New Panda in Town 🐼",
        "say": "One sunny morning, a tiny robot rolls into our town. Beep-beep! Whirr! It's a panda — a robot panda named Panda! New town. New faces. Panda needs friends. Will YOU be Panda's friends? Say it with me: HI, PANDA!",
        "ask": "Friends, will you help Panda feel at home in our town?",
        "doThis": "Hold up mTiny so everyone can see, then gently pass Panda around the circle. Everyone says 'Hi Panda!'"
      },
      {
        "title": "Panda's Happy Day",
        "say": "Panda wants to show us his very first day. Look — Panda is at the park! Wheee! Panda is smiling. Panda is bouncing. Something inside Panda feels warm and sparkly.",
        "ask": "What is Panda feeling, friends? How can you tell? What do YOU do when you feel that sparkle?",
        "doThis": "Play the Engage video. Pause at 0:21 right after Panda says playing at the park makes me happy."
      },
      {
        "title": "But Then... Oh No!",
        "say": "But then... the sun goes down. Panda's smile falls — plop. Later, Panda kicks the ball and... misses! Grrr! And in the dark — a big black shadow! EEK! Poor Panda. So many feelings in one day!",
        "ask": "How do we know Panda feels that way? Show me with your face and your whole body!",
        "doThis": "Pause at 0:24 (sad, sun goes down), 0:50 (angry, missed goal), and 1:09 (scared of the shadow). At each pause ask what Panda feels and have the class act that feeling with their faces and bodies."
      },
      {
        "title": "Feelings Live in All of Us",
        "say": "Panda sits down and sighs. 'So many big feelings,' beeps Panda. 'Do my new friends have them too?' Yes, Panda! We do! Happy days, grumpy days — we all have them. And that's okay!",
        "ask": "What feelings do YOU have, friends? What can we do when we feel happy? Sad? Angry?"
      },
      {
        "title": "The Magic Tap Pen ✨",
        "say": "Ta-daaa! Panda brought a treasure from Bamboo Land — a magic Tap Pen! Tap a purple face card... tap tap!... and Panda shows that feeling! Tap a blue arrow card and — vroom! — Panda moves! But shhh... the magic only works with YOUR help.",
        "ask": "Ready to try the magic? What feeling will Panda show next?",
        "doThis": "Model: tap the Tap Pen on each purple emotion card and let the class guess the feeling Panda shows. Then tap one blue action card so Panda moves."
      },
      {
        "title": "The Emotion Detectives",
        "say": "Ring ring! Panda has a mission for us! People in town are feeling all kinds of things, and Panda wants to understand every one. Detectives — look at your picture card... then tap-tap the magic cards so Panda feels it too!",
        "ask": "Why do you think the person in your picture feels that way?",
        "doThis": "Groups of 3-4 get Emotion Scenario Cards (ice cream = happy, hurt and crying = sad, yawning = tired, scary shadow = scared, arms crossed = angry). Children tap purple and blue cards to make Panda match the feeling. Rotate between tables."
      },
      {
        "title": "The SMART Spell",
        "say": "Panda whispers a secret spell from Bamboo Land. It's called the SMART spell! When a big feeling comes, say the spell: 'When I feel angry, I will... take a deep breath and ask a teacher for help!' Say it with me — deeeep breath... whooooosh!",
        "ask": "Let's make more spells! When I feel happy, I will ___? When I feel sad, I will ___? When I feel scared, I will ___?"
      },
      {
        "title": "My Promise to Panda",
        "say": "Panda leans close and whispers: 'Friends... will you make your OWN smart spell? Draw it, so I never forget it.' Every promise makes Panda's heart go DING!",
        "ask": "What will YOUR spell be, friends?",
        "doThis": "Open the Personal Learning Workbook to page 10. Children draw a picture of their SMART goal or dictate the sentence 'When I feel ___, I will ___.' Invite a few to share with the class."
      },
      {
        "title": "Goodnight, Panda 🌙",
        "say": "The sun goes down on Panda's first day in town. But Panda isn't scared of the dark anymore — Panda has friends. YOU! Panda yawns... beep... boop... zzz. But shhh — tomorrow morning, something in town will need our CARE. See you next time, friends!",
        "ask": "Before Panda falls asleep — who wants to tell Panda one thing they learned today?"
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
        "title": "Panda Is Very Quiet",
        "say": "A new morning in town. The birds sing. The friends come to play... but wait. Panda is very, very quiet. Today Panda needs something special from us — Panda needs friends who CARE. Are you ready, caretakers?",
        "ask": "Who remembers what Panda taught us about feelings last time?",
        "doThis": "Hold up mTiny for everyone to see."
      },
      {
        "title": "The Panda Keepers",
        "say": "Far away, in another town, there are children just like you. They have a Panda too! And listen to this — every single child has a special job caring for their Panda. Every. Single. One!",
        "ask": "How do YOU think we might take care of our Panda?",
        "doThis": "Play the Engage video. Pause at 0:22 after the teacher says everyone has a special role caring for mTiny."
      },
      {
        "title": "Oh No! Panda Won't Turn On!",
        "say": "But then — oh no! Their Panda won't turn on! Not a beep. Not a boop. NOTHING! The children gasp. What happened? Quick, friends — a Panda in trouble needs helper ideas!",
        "ask": "What would YOU do if our Panda would not turn on?",
        "doThis": "Pause at 1:08 after the student says mTiny is not turning on. Then start a class list of ways to care for Panda — keep it, you will use it later!"
      },
      {
        "title": "Building Panda's Town",
        "say": "Phew — OUR Panda beeps happily! And look what Panda brought: his whole TOWN, in pieces! Let's build it together. Click... click... click! And when Panda drives on it — beep! vroom! — the town talks back to him!",
        "ask": "Gentle hands, friends — can we promise to keep Panda's town and cards safe?",
        "doThis": "Lay out the Town Map tiles on the floor with the class. Drive Panda across it once with a blue arrow card so children hear the sounds."
      },
      {
        "title": "The Card Sandwich 🥪",
        "say": "Panda is hungry — for a CARD SANDWICH! First the yellow Event card — that's the bread on top. Then the blue arrows in the middle — yum yum yum. And the Green Flag at the end — GO, Panda, GO!",
        "ask": "What comes FIRST in the sandwich, friends? Say it loud!",
        "doThis": "Model this exact program with the Tap Pen: Event card, Turn Right, Forward, Turn Left, then Green Flag. Watch Panda follow it!"
      },
      {
        "title": "Your Turn, Caretakers!",
        "say": "Now Panda rolls right up to YOUR table. 'Friends,' beeps Panda, 'build me a piece of town and code me a path — I trust you!' Gentle hands. Big ideas. Tap tap... GO!",
        "ask": "Where will Panda travel in YOUR piece of town?",
        "doThis": "Groups of 3-4 each get 1 mTiny, Tap Pen, 4 Action cards, 1 Event card, and 1 Green Flag. Rotate to help. Afterwards let groups share what they made."
      },
      {
        "title": "Panda's Secret Language",
        "say": "Psst — Panda tells us a secret. Every card is a CODE — a word Panda understands! Putting the cards together is CODING. And the whole line of cards? That's a PROGRAM! You speak robot now, friends!",
        "ask": "Count with me — how many steps are in our program? One... two... three... FOUR!",
        "doThis": "Line up 4 action cards in a row where all can see."
      },
      {
        "title": "The Panda Care Crew",
        "say": "Night is coming, and Panda needs a crew — just like the children far away! A Charger to give Panda power. A Bather to wipe Panda clean. A Set-Up Crew! A Clean-Up Crew! Panda is counting on us.",
        "ask": "Which Panda job would YOU love to do, and why?",
        "doThis": "Read your class care list together and agree on class jobs: a Charger, a Bather who wipes Panda clean, a Set-Up Crew, and a Clean-Up Crew. Assign helpers for this week."
      },
      {
        "title": "The Caring Poster 💛",
        "say": "Panda's heart goes ding-ding-DING! 'My friends care for me,' beeps Panda, 'and they care for each other too!' Let's paint our caring big and bright, so the whole town can see it. And psst... next time, Panda knocks on doors to meet real FAMILIES. See you there!",
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
        "title": "Panda Misses Home",
        "say": "One quiet morning, Panda sits on a rooftop and sighs. Beep... Panda misses his family, far away in Bamboo Land. 'What makes a family?' Panda wonders. 'And who will show me?' Friends... will YOU show Panda?",
        "ask": "Who remembers how we take care of Panda? Families care for each other the very same way!",
        "doThis": "Hold up mTiny for everyone to see."
      },
      {
        "title": "Knock Knock at Jordan's Door",
        "say": "Panda puts on his explorer hat and rolls to the first house. Knock knock! It's Jordan's house — and WOW, so many people inside! Big family, big hugs, big fun!",
        "ask": "What makes Jordan's family special, friends? (Its size!)",
        "doThis": "Play the Engage video. Pause at 0:50 after Panda thanks Jordan."
      },
      {
        "title": "Two More Doors",
        "say": "Knock knock! Bobbie's house — different people live together here! Knock knock! Taylor's house — this family looks different too! Panda's eyes go wide. Every family is different... and every family is SPECIAL!",
        "ask": "Who wants to tell Panda why THEIR family is special?",
        "doThis": "Pause at 1:13 (Bobbie: different members live with them) and 1:41 (Taylor: families look different). Ask what makes each family special."
      },
      {
        "title": "A Mystery Friend Appears",
        "say": "But wait... who is THAT? Someone new is standing in Panda's town! It's Panda's friend! 'I want to visit their house and meet their family!' beeps Panda. But oh no — Panda doesn't know the way. Only YOU can guide him!",
        "ask": "Look at the map, friends — what do you notice?",
        "doThis": "Gather everyone around the prebuilt Town Map with the friend cutout placed on it."
      },
      {
        "title": "The Explorer's Secret Scroll",
        "say": "Panda unrolls an old explorer scroll. It says: real explorers INVESTIGATE first — look closely with big detective eyes! Then they BRAINSTORM — share your ideas out loud! Shhh... look... now — ideas, GO!",
        "ask": "Who has an idea for how Panda can reach the friend's house?",
        "doThis": "Point to Investigate and Brainstorm on the Engineering Design Process picture. Give one quiet minute to study the map, then collect ideas."
      },
      {
        "title": "Draw the Treasure Route",
        "say": "The scroll says step three: PLAN! Grab your pencils, explorers. Draw Panda's path like a treasure route — this way, that way, all the way to the friend's front door!",
        "ask": "Which way will YOUR Panda go, friends?",
        "doThis": "Groups draw their route for Panda on paper. Rotate to check each group's plan."
      },
      {
        "title": "Snap the Magic Cards",
        "say": "Step four: BUILD! Turn your drawing into robot words! Yellow Event card first... then the arrows, one by one... and the Green Flag at the very end. Tap, tap, tap — the magic is ready!",
        "doThis": "Groups build their program with the Event card, Action cards, and Green Flag, following their drawn plan."
      },
      {
        "title": "Go, Panda, Go!",
        "say": "Deep breath, everyone... GO! Panda rolls... turns... rolls... Did he make it? If Panda goes the wrong way — no tears, explorers! Find the sneaky card, fix it, and try again. Every explorer gets a little lost before they get found!",
        "ask": "What went well? What problem did your team fix?",
        "doThis": "Groups test on the Town Map and iterate until Panda reaches the friend's house. Celebrate every arrival!"
      },
      {
        "title": "Panda's Family Album 📔",
        "say": "Knock knock — Panda made it, and the friend's family waves hello! Now Panda wants one more treasure: a picture of YOUR family for his album. Draw your special family, friends — Panda will keep it forever. And next time... a real TREASURE MAP blows into town! Shhh!",
        "doThis": "Pass out workbooks and drawing materials; children draw their family on page 18. Point to the Engineering Design Process picture on page 17. Close: next lesson we solve problems as a classroom community!"
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
        "title": "The Dusty Treasure Map",
        "say": "One windy morning — whoooosh! — something flies through the air and lands right at Panda's feet. It's old. It's dusty. It's... a TREASURE MAP! Gems! A treasure chest! Panda jumps up: 'Friends! Adventure time!'",
        "doThis": "Hold up mTiny for everyone to see."
      },
      {
        "title": "Obstacles Everywhere!",
        "say": "Panda and his friends unroll the map. Ooooh — shiny gems! But then... oh no. Big rocks. Small rocks. Obstacles EVERYWHERE, blocking the way to the treasure! The friends scratch their heads.",
        "ask": "What should Panda and the friends do FIRST?",
        "doThis": "Play the Engage video. Pause at 0:32 after Panda asks how they can avoid the obstacles, get the gems, and reach the treasure."
      },
      {
        "title": "The Four Superpowers",
        "say": "Then Panda smiles a great big panda smile. 'Friends — we have SUPERPOWERS!' Not flying. Not lasers. THINKING powers — four of them! And when friends work together... the powers grow stronger and stronger!",
        "ask": "How did the friends talk to each other when they agreed? And when they disagreed?",
        "doThis": "Pause at 2:06 after Panda says when we work together we can solve problems."
      },
      {
        "title": "The Map Lands HERE!",
        "say": "And then — gasp! — the wind blows again... whoooosh... and a treasure map lands HERE. In OUR room! Gems... a treasure chest... and yes — obstacles, some big, some small. This adventure is OURS now, friends!",
        "ask": "Look carefully — what do you notice on the map?",
        "doThis": "Gather everyone around the prebuilt Treasure Map."
      },
      {
        "title": "Superpower 1: Break It Apart!",
        "say": "Panda whispers the first superpower: DE-COM-PO-SI-TION! It means: don't fight the whole giant problem — snap it into little pieces! Crack! One obstacle at a time. Crack! One gem at a time.",
        "ask": "What is one SMALL problem you see on the map? Will the big and small obstacles change how Panda travels?"
      },
      {
        "title": "Superpower 2: Spot the Patterns!",
        "say": "Superpower two: PATTERN POWER! Everyone, share your idea for Panda. Now listen closely... do you hear it? When lots of friends say the SAME idea — ding ding ding! — that's a pattern!",
        "ask": "Who has an idea for helping Panda get the gems? Which ideas are the same?"
      },
      {
        "title": "Superpower 3: Pick One Plan!",
        "say": "Superpower three: ABSTRACTION! So many good ideas... but Panda can only take ONE path. Let's choose together, heroes. And if our plan flops? No problem — heroes simply pick again!",
        "doThis": "Talk through the shared ideas and agree as a class on one route for Panda."
      },
      {
        "title": "The Great Gem Rescue 💎",
        "say": "Superpower four: the ALGORITHM — our step-by-step plan! Only YOUR magic cards can carry Panda past the obstacles. Snap! Tap! GO! Grab that gem... and that one... all the way to the treasure chest! Go, Panda, GO!",
        "doThis": "Groups get mTiny, Tap Pen, 4 Action cards, Event card, and Green Flag. They snap the Event card, the arrow cards to grab each gem, and the Green Flag; test on the Treasure Map and fix until Panda collects the gems and reaches the treasure!"
      },
      {
        "title": "Treasure for the Whole Team",
        "say": "CLINK! The treasure chest opens! Panda dances — wiggle, wiggle! 'We did it TOGETHER,' beeps Panda, 'with decomposition, pattern recognition, abstraction, and algorithms!' But friends... tomorrow Panda smells something funny in town. The EARTH will need us. Rest up, heroes!",
        "ask": "Why was it important to listen to each other's ideas today?"
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
        "title": "Something Smells Funny",
        "say": "Early one morning, Panda rolls through town — and stops. Sniff, sniff. Something smells funny. The air looks grey. Panda's friend Milo comes running: 'Panda! The Earth — Our Common Home — needs help!' Friends, this is our BIGGEST mission yet.",
        "ask": "Heroes, do you remember our thinking superpowers from last time? We will need them today!",
        "doThis": "Hold up mTiny for everyone to see."
      },
      {
        "title": "The Mystery Word",
        "say": "Milo says a strange, strange word: po-llu-tion. Panda tilts his head. Beep? 'What is pollution?' asks Panda. Hmm... Milo looks at us. Can WE help Panda figure it out?",
        "ask": "What do YOU think pollution is, friends?",
        "doThis": "Play the Engage video. Pause at 0:16 right after Panda asks what pollution is."
      },
      {
        "title": "Sick Water, Sick Soil",
        "say": "Oh no. Milo shows Panda the lake — yucky garbage floating in the water! And the soil — sick from spilled chemicals! But Milo knows helper tricks: recycle plastics, keep garbage OUT of the water, and put chemicals away safely. Phew!",
        "ask": "What ELSE can we do to stop water pollution? And soil pollution?",
        "doThis": "Pause at 1:08 (water pollution) and 1:32 (soil pollution)."
      },
      {
        "title": "The Three Sneaky Troublemakers",
        "say": "Panda counts on his paws: AIR pollution... WATER pollution... SOIL pollution. Three sneaky troublemakers, making animals, people, and the whole Earth feel sick! But listen closely — people STARTED pollution... so people can STOP it. And we are those people!",
        "ask": "What can people do to stop pollution, friends?"
      },
      {
        "title": "Trouble on Panda's Lawn!",
        "say": "Then Panda gasps — beep-beep! The trouble is HERE, on Panda's very own lawn! Look: a lake, a bag of garbage, a tree, a factory. Some big, some small. Panda can't clean it up alone. Only YOU can help!",
        "ask": "Who can point to the big pictures? Who can point to the small ones?",
        "doThis": "Gather everyone around the Lawn Map with the four cutouts taped on and a task card next to each."
      },
      {
        "title": "The Four Helper Cards",
        "say": "But wait — what's this? Next to every picture sits a secret helper card! Card one: recycle bottles and keep the lake clean! Card two: garbage goes in the trash can — swish! Card three: trees keep the air clean! Card four: the sun and wind make clean energy — whoosh!",
        "doThis": "Hold up each of the four task cards and describe the messy picture and the clean picture side by side."
      },
      {
        "title": "Panda's Clean-Up Patrol 🚨",
        "say": "Time to roll, patrol! Code Panda from picture to picture across the lawn. Event card first... arrows to travel... Green Flag — GO! At every stop, read the helper card out loud. Vroom! One stop cleaner... two stops cleaner... keep going!",
        "ask": "Where should Panda roll first, helpers?",
        "doThis": "Groups get mTiny, Tap Pen, 4 Action cards, Event card, and Green Flag. They program Panda to each cutout and read the task card when Panda arrives. Rotate to help."
      },
      {
        "title": "The Earth Helpers' Chart",
        "say": "Hooray — Panda's lawn is safe! Now let's put every Earth-saving trick on one GIANT chart. Recycle! Trash cans! Plant trees! Save energy! Look at everything we know, friends. Panda beeps with pride!",
        "ask": "What did you learn about pollution and helping the Earth?",
        "doThis": "Create the class anchor chart with words or pictures as children share."
      },
      {
        "title": "A Big Hug for the Earth 🌍",
        "say": "Panda looks up at the big blue sky. 'Friends,' beeps Panda softly, 'this town is my home now. And the Earth is Our Common Home — for ALL of us.' Arms out wide, everyone... give the Earth a great big air-hug! Squeeeeze! And guess what... Panda's adventures are not over. Next time, Panda gets his very first JOB in town!",
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
        "title": "One Sunny Morning ☀️",
        "say": "One sunny morning, Panda wakes up and stretches. 'Today,' says Panda, 'I will find my special job!' His friends Toby, Milo, and Chicka are on their way. But wait... sniff, sniff... what is that smell?",
        "ask": "I wonder what Panda will find, friends. What do YOU wonder? Start with 'I wonder...'",
        "doThis": "Hold up the mTiny panda so everyone can see it while children share their wonders."
      },
      {
        "title": "The Grumpy Grumble",
        "say": "It's the trash! Pee-yew! Panda drags the trash bag — hmph, hmph, HMPH! Panda grumbles a big grumpy grumble. And here comes Toby! Freeze the story! Detectives, look closely.",
        "ask": "What do you SEE? What do you THINK is going on? What do you WONDER?",
        "doThis": "Play the Engage video and pause at 0:18, just as Toby walks up to grumpy Panda."
      },
      {
        "title": "The Stinky Mountain",
        "say": "Toby whispers a secret: 'Responsibilities are jobs that help ourselves AND others.' Then Panda closes his eyes and imagines... nobody EVER takes the trash out. The trash grows and grows into a wobbly, stinky MOUNTAIN! Pee-YEW! Panda's eyes pop open.",
        "ask": "What would happen at YOUR house if nobody ever took the trash out?",
        "doThis": "Pause the video at 1:11, right after Panda imagines the stinky trash pile and reacts."
      },
      {
        "title": "Toby's Two Magic Words",
        "say": "Toby gives Panda two magic words. 'A ROLE is the job you have. A RESPONSIBILITY is what you do to help!' And guess what, says Toby — coding is just like that: a list of jobs, one, two, three, in order! Panda claps his paws. 'I want a job list too!'",
        "ask": "What is one responsibility YOU have at home, Panda's helpers?"
      },
      {
        "title": "Helpers to the Rescue!",
        "say": "But oh no — Panda can't reach his home jobs alone. He doesn't know the way! 'Help me, friends!' calls Panda. Only YOU can snap the magic cards and send Panda to his jobs. Tap, tap, tap... and GO!",
        "doThis": "Station 1: each group gets a challenge sheet with pictures and empty spaces for coding cards. Model one challenge: snap Forward, Forward, Turn Right onto the sheet, tap each card with the Tap Pen, then tap Go and watch Panda do its job!"
      },
      {
        "title": "The Robot Friend Game",
        "say": "Now for more magic — one of YOU turns into a robot, just like Panda! Beep boop! The coder holds up the cards, and robot-friend follows every single step. No skipping! Beep... boop... step!",
        "doThis": "Station 2: tape a paper grid on the floor. One friend pretends to be Panda while another friend is the coder showing the list of coding cards. Robot-friend walks the squares exactly as the cards say — no skipping steps!"
      },
      {
        "title": "Chicka's Question Basket",
        "say": "Chicka flutters in with a basket full of questions! Some are TINY closed questions with one little answer — 'What letter does Panda start with?' P! Some are GIANT open questions with long, stretchy answers — 'Why do we have responsibilities?' Hmmmm!",
        "ask": "Friends, is 'How many friends does Panda have?' a tiny closed question or a giant open one?",
        "doThis": "Station 3: sort the question cards together into an OPEN pile and a CLOSED pile."
      },
      {
        "title": "Will It Work?",
        "say": "Time for the big test! When the cards are in order — ta-da! Panda does his job. But when a card is out of order... BONK! Panda bumps, falls, or goes nowhere at all. Our jobs at home work just the same way!",
        "ask": "Did the code work, friends? If not, how can we rescue Panda and fix it?",
        "doThis": "Invite one volunteer to run their challenge code on mTiny in front of the class and test it."
      },
      {
        "title": "Panda's Home Promise 🏠",
        "say": "Panda hugs his trash bag. 'Taking out the trash is MY special job at home!' Now you pick a home job too, just like a program. Hip hip hooray for Panda's helpers! But wait... where will Panda hunt for a job next? At SCHOOL! See you there, friends!",
        "doThis": "Open workbooks to page 12. Children draw their home goal, cut-and-paste the goal cards, or fill in the sentence with help — for example: 'I will improve cleaning my room by putting my clothes away and making my bed.'"
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
        "title": "Back to School, Panda!",
        "say": "Ding, ding! The school bell rings, and here comes Panda with his little backpack — boing, boing, boing! Panda found his job at home. Today he hunts for a job at SCHOOL. But first, warm up those story brains!",
        "ask": "Turn to the friend next to you: what did Panda learn in our last adventure?",
        "doThis": "Give pairs one minute to turn-and-talk, then let two or three friends share."
      },
      {
        "title": "Trouble at the Fountain",
        "say": "Splash! It's water fountain time. Everyone waits in line... when ZOOM! Chicka jumps right to the front! Panda pulls Chicka back — 'It's your responsibility to follow the rules!' Oh no. Chicka's head droops. Chicka walks away... sad, sad, sad.",
        "ask": "What do you SEE? What do you THINK is going on? What do you WONDER?",
        "doThis": "Play the Engage video and pause at 0:29, right after Panda speaks and Chicka walks away sad."
      },
      {
        "title": "Milo's Big Question",
        "say": "Wise old Milo strolls over. 'Panda,' says Milo, 'what STRATEGY could you use instead of pushing? A strategy is steps we take to solve a problem.' Panda scratches his fuzzy head. Hmmmm...",
        "ask": "Friends, what could Panda do instead of pushing? What kind words could Panda say?",
        "doThis": "Pause the video at 1:49, right after Milo asks the strategy question."
      },
      {
        "title": "The Strategy Game",
        "say": "Panda needs practice — and so do we! Let's play Milo's Strategy Game. One friend pulls a black card — uh oh, a problem! Everyone else slides out a white strategy card to save the day. Which rescue card wins?",
        "doThis": "Model one round of the Strategy Card game, then split into groups of 3-4: one friend pulls a black problem card, everyone else puts down a white strategy card that could help, and the black-card friend picks the best one. As they play, ask 'Why do you think that is the best strategy?'"
      },
      {
        "title": "The Hero Pull",
        "say": "But wait! Was Panda wrong to wait in line? No, no, no — waiting was right! Pulling was the wrong move... THAT time. Because listen closely, friends: sometimes pulling a friend is a HERO move. The same strategy does not work every time!",
        "ask": "What if Chicka was about to step into the road and a car was coming — VROOM! Would pulling Chicka be a good strategy THEN?"
      },
      {
        "title": "The Longest Job List Ever",
        "say": "Now Panda tries a school job: walking the square path. Turn, step! Turn, step! Turn, step! Turn, step! Phew... that is SO many cards. Panda's little paws are tired just carrying them all!",
        "ask": "Look closely, friends... do you see something that repeats over and over?",
        "doThis": "Code a volunteer 'robot friend' around a taped floor square using Program 1: Turn Right + Forward, four times in a row — eight cards total."
      },
      {
        "title": "The Magic Loop ✨",
        "say": "Suddenly Milo laughs. 'Panda! Use the magic LOOP!' We tuck Turn and Forward inside two curvy cards shaped like the letter C... then the Repeat card shouts: 'Do it FOUR times!' Zip, zip, zip, zip — same square, teeny tiny program. Magic!",
        "ask": "Can you make a letter C with both hands, like the parenthesis cards?",
        "doThis": "Show Program 2 side by side with Program 1: Start, ( Turn Right, Forward ) Repeat x4 — the same square with way fewer cards."
      },
      {
        "title": "Loop-de-Loop Rescue",
        "say": "Now Panda is stuck on his school jobs, and only YOUR loops can free him! Snap the C cards, snap the Repeat, tap, tap, tap... GO! Watch Panda loop-de-loop around the school. Wheee!",
        "doThis": "Run stations: Station 1 = mTiny loop challenges using the challenge cards with parentheses and the Repeat card (tap with the Tap Pen, then tap Go), Station 2 = strategy list with the coach, extra station = code your friends."
      },
      {
        "title": "Panda's School Secret",
        "say": "Panda smiles a big panda smile. 'My school job is being a kind friend — with SMART strategies!' He says sorry to Chicka, and they sip water together. Slurp! Next time, Panda rolls into TOWN... and somebody falls in a hole! See you there, friends!",
        "ask": "Which strategy did YOU choose to help you make SMART decisions?",
        "doThis": "Open workbooks to pages 15-16. Children cut and paste strategy cards or write three strategies: one for coding Panda, one for friends and family, and one for schoolwork."
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
        "title": "Off to Town!",
        "say": "Roll, roll, roll! Panda rides into town with his friends. Home job? Found it! School job? Found it! Today Panda hunts for his job in TOWN. But first, warm up those story brains, helpers!",
        "ask": "What is a strategy, and what does it help us do? Whisper it to the friend next to you!",
        "doThis": "Quick turn-and-talk, then a couple of friends share out."
      },
      {
        "title": "Toby Falls Down! 😱",
        "say": "The friends stroll down the street, la la la... when suddenly — 'WAAAH!' CRASH! Toby falls right into a hole and drops everything! Papers fly everywhere! Freeze the story! Detectives, look closely.",
        "ask": "What do you see? Why do you think Toby fell? What do you wonder?",
        "doThis": "Play the Engage video and pause at 0:12, right after Toby falls."
      },
      {
        "title": "The Missing Sign",
        "say": "Panda pulls Toby out — oof! And Panda spots the problem: there was NO SIGN to warn about the hole! Then Panda says something amazing: 'Signs are like coding! They tell people what to do — just like the cards tell me!' Toby blinks. 'Huh? What does THAT mean?'",
        "ask": "What signs have YOU seen in our town, friends? What do they tell people to do?",
        "doThis": "Pause the video at 1:37, right after Panda says signs are like coding and Toby asks what that means."
      },
      {
        "title": "Panda's Big Idea 💡",
        "say": "Panda jumps up tall. 'THAT'S my town job! I will make signs to keep everyone safe!' But sign-makers need the engineer steps: investigate, brainstorm, plan, build, test, share!",
        "ask": "Do you remember the steps, friends? Say them with me — one big clap for each one!",
        "doThis": "Review the Engineering Design Process together: investigate, brainstorm, plan, build, test, share — clapping once per step."
      },
      {
        "title": "How Big Is Big?",
        "say": "But wait — how BIG should a sign be? Teeny tiny? GIANT? Panda doesn't know! Grab the measuring tools, helpers: a ruler for small things, a yardstick for medium things, and a looong measuring tape for BIG things — even as tall as YOU!",
        "doThis": "Measuring station: set out printed signs plus mTiny-drawn text samples; children measure with the ruler, yardstick, and measuring tape and say how big each one is."
      },
      {
        "title": "Panda Learns to Draw! 🖊️",
        "say": "And now... the most magical moment of all! Panda slides a marker into his bottom — pop! Tap the green pen-DOWN card and... Panda DRAWS! Scribble, scribble, line, line! Tap pen-UP and Panda stops. Panda can draw his own signs!",
        "ask": "We know loops now, friends — how might we make Panda draw a square?",
        "doThis": "Drawing station: slide a marker into Panda's bottom, then run Start, Pen-Down, ( Turn Right, Forward ) Repeat x4, Pen-Up, Go! Then try the Drawing Card to make letters — Challenge: draw a circle or your initials!"
      },
      {
        "title": "Who Works in Town?",
        "say": "While Panda practices drawing, let's meet the town helpers! Flip, flip — is it a match? The police keep us safe! The store owner sells us food! The garbage collector takes our trash! Everyone in town has a special job... just like Panda is finding his.",
        "doThis": "Memory game station: lay the Community Roles matching cards face-down; children flip two cards per turn and keep the pair when a community helper matches their job."
      },
      {
        "title": "The Great Sign Build",
        "say": "Building time! Panda needs YOUR signs for the town — signs that say 'recycle!' or 'be kind!' Snip, snip! Color, color! Glue, glue! Every sign you make keeps a friend from falling in a hole like poor Toby!",
        "doThis": "Hand out big paper, markers, crayons, scissors, and glue; each child picks one role or responsibility from the class list for their sign. Extension: let mTiny draw letters or shapes for the signs!"
      },
      {
        "title": "Signs Up Everywhere!",
        "say": "Ta-da! Look at all these beautiful signs! Panda dances a happy wiggle dance. 'The town is safer because of YOU, friends!' But shhh... next time, Panda sees something that makes him very, very sad. The whole EARTH needs help. Bring your hero hearts!",
        "ask": "Who wants to hold up their sign and tell us what it reminds people to do?",
        "doThis": "Do a gallery share on the carpet — you investigated, brainstormed, planned, and built; now finish with test and share by planning where each sign will hang around the school."
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
        "title": "The Biggest Home of All 🌍",
        "say": "Panda found his job at home — tick! At school — tick! In town — tick! But this morning, Panda looks up, up, UP at the big blue sky. 'Is there a job for me somewhere even BIGGER?' Friends, there is. The biggest home of all: Our Common Home... the EARTH!",
        "ask": "Who lives in Our Common Home, friends? (Hint: everyone and everything!)"
      },
      {
        "title": "Panda's Saddest Walk",
        "say": "Panda goes for a walk through town. But... oh no. Sniff. Trash all over the park! Sniff, sniff. And listen — buzz, CRACK! Trees are falling down! Panda makes the saddest sound you ever heard. Awwwww...",
        "ask": "What do you see? What do you think is going on? What do you wonder?",
        "doThis": "Play the Engage video; pause at 0:07 (trash in the park) and again at 0:15 (trees being cut down)."
      },
      {
        "title": "Panda's Big Promise",
        "say": "Panda stops by the river — trash is floating in the water too! Panda stands up tall and says: 'This is getting out of control! We are destroying the Earth, our common home. I need to do something about this!' Panda has found his BIGGEST job ever.",
        "ask": "If YOU were Panda, how would you feel? What would you care about?",
        "doThis": "Pause at 0:28 after Panda speaks. Do Think-Feel-Care: what is Panda's role, how does Panda feel, what does Panda care about?"
      },
      {
        "title": "The Four Thinking Powers",
        "say": "But this problem is HUGE — too big for one little panda! Good thing Panda's helpers have FOUR thinking powers. Break it into pieces — SNAP! Pick what matters most — ZOOM! Spot what we already know — AHA! And follow the steps — march, march, march!",
        "doThis": "Display the four skill posters around the room (decomposition, abstraction, pattern recognition, algorithmic thinking) and do a fun action for each: break-apart hands, magnifying glass, pointing finger, marching steps."
      },
      {
        "title": "Retrace the Sad Journey",
        "say": "First mission, helpers! Panda must visit every sad spot again — the trash, the trees, the river. Only YOUR cards can drive him there! Number one... number two... number three! Tap, tap, tap — GO, Panda, go!",
        "doThis": "Algorithmic thinking station: lay out the Town Map with the printed disaster pictures on it — the stops are numbered right on the map. Children snap Forward and Turn cards to drive Panda from number to number, tap with the Tap Pen, then Go!"
      },
      {
        "title": "The Memory Treasure Chest",
        "say": "At this station, we open our memory treasure chest! Questions, roles, strategies — we collected so many treasures on our adventure. Which ones can help Panda now? Putting trash in the bin... asking good questions... hmmmm!",
        "ask": "Where might all that trash be coming from, friends? What other questions do you have?",
        "doThis": "Pattern recognition station with the coach: work on workbook pages 22-23 — list 1-2 questions, 2-3 helpful responsibilities, and strategies like the engineering design process."
      },
      {
        "title": "Who Is Crying?",
        "say": "Look very, very closely at the sad pictures, detectives. Who is hurting? With trash in the water... the FISH are crying! Blub, blub. Circle every friend who needs help — people, animals, plants. They are all counting on YOU!",
        "doThis": "Abstraction station: give each group printed pictures from the video. Children circle every person, animal, or plant being impacted, right on the image."
      },
      {
        "title": "Snap It Into Pieces",
        "say": "Now the last power — SNAP the big problem into little pieces! Piece one: trash in the river. Piece two: trees falling down. Piece three: a messy park. Little pieces are not so scary. Panda feels braver already!",
        "ask": "Who are the people and living things impacted? What would happen if the trees or the fish were ALL gone?",
        "doThis": "Decomposition: chart the answers on the board as children turn-and-talk and share."
      },
      {
        "title": "The Hero Plan",
        "say": "Panda's helpers, it's hero time! For every problem, we make a plan. Trash in the river hurts the fish... so let's add more trash cans! Panda cheers: 'With friends like you, the Earth has a chance!' Next time, we become RESEARCH detectives... and Panda draws something special for the whole planet!",
        "ask": "Which problem is the MOST important to you? Draw a star next to it — we will need it next episode!",
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
        "title": "The Final Mission 🕵️",
        "say": "This is it, friends — the last episode of Panda's great job hunt! Panda knows his biggest job now: protecting Our Common Home. And last time, YOU each starred the problem you care about most. Today we become research detectives — dun, dun, DUN!",
        "ask": "Who remembers which problem they starred in their workbook?"
      },
      {
        "title": "The Tricky Picture",
        "say": "But first, Toby has a trick up his sleeve! He shows Panda a picture — a DOG riding a MOTORCYCLE! Vroom, vroom! Woof, woof! 'Panda,' grins Toby, 'is this real... or pretend?' Panda's eyes go wide. Hmmmm...",
        "ask": "What do you think, detectives — is a dog really driving that motorcycle? How can we tell?",
        "doThis": "Play the Engage video and pause at 1:28, right after Toby shows the tricky picture."
      },
      {
        "title": "The Detective Chant",
        "say": "Panda learns the detective secret: not everything we see is TRUE! So detectives ask four magic questions. Does it make sense? Who is telling us? Can we read more about it? Can we find it in other books or websites? Say it with me, detectives!",
        "doThis": "Say the four questions together as a chant, holding up one finger for each."
      },
      {
        "title": "Real Pictures, Real Mystery",
        "say": "Now Panda hands YOU two real pictures — pictures of the Earth changing. These are NOT pretend, detectives. Look closer... closer... what is happening to Our Common Home?",
        "ask": "What do you SEE? What do you THINK of it? What does it make you WONDER?",
        "doThis": "Pairs examine the two printed pictures with workbook pages 27-28. Ask 'What makes you say that?' as you circulate."
      },
      {
        "title": "Five Giant Words",
        "say": "Panda opens his big detective book, and five GIANT words tumble out! Pollution — yucky stuff that hurts living things. Deforestation — CHOP, the forests fall! Overfishing — too many fish taken from the sea. Climate change — the Earth getting warmer. Overpopulation — squeeze! Too many people in one place!",
        "ask": "Which giant word matches what you saw in YOUR picture, detective?"
      },
      {
        "title": "Tiny and Giant Questions",
        "say": "Remember Chicka's question basket? Tiny CLOSED questions start with what, where, or who — snap, short answer! Giant OPEN questions start with why or how might — and the answer goes on and ooooon. Detectives need BOTH!",
        "ask": "Is 'Why does climate change happen?' tiny or giant? What about 'What is climate change?'"
      },
      {
        "title": "Your Detective Notebook",
        "say": "Time to fill your detective notebooks! Pick your starred problem. Write one GIANT question, two tiny questions... and the ways YOU can help. Panda watches proudly — his helpers are real detectives now!",
        "doThis": "Workbook pages 29-30, in small groups or all together: one OPEN question with 'why' or 'how might', two CLOSED questions with 'where, who, when, or what', then 2-3 ways they can help solve it. Model one example first: 'How might we stop pollution?'"
      },
      {
        "title": "Panda Draws His Promise 🐼✏️",
        "say": "And now... the moment Panda has waited for all adventure long! Panda slides in his marker — pop! He rolls onto our class pledge poster and DRAWS. Line... by line... it's an E! E for EARTH! Panda signs the pledge with his very own wheels! Hooray!",
        "doThis": "Slide a marker into mTiny, then tap Start, Pen-Down, code a shape or a letter (try E for Earth!), Pen-Up, Go — right on the class Help-the-Earth pledge poster."
      },
      {
        "title": "Heroes of the Common Home",
        "say": "Panda found his special job — and so did YOU! At home, at school, in town, and for the whole wide Earth. Panda takes a big bow. 'Thank you, my helpers. Together, we care for Our Common Home!' Hip hip HOORAY! And psst... Panda's adventures are not over — next time, he learns a magic peace trick!",
        "ask": "Who wants to share their problem, one question they wrote, and one way they plan to help?",
        "doThis": "Chart 3-5 shared questions and helping ideas on the board as friends share, and celebrate working as a classroom community through the whole adventure."
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
        "title": "A Stormy Morning for Panda 🐼",
        "say": "One sunny morning, Panda skips to the playground to meet Milo, Chicka and Toby. But wait — nobody is smiling today! Someone is frowning. Someone is stomping. Grumble, grumble! Something is wrong in Panda's town, and Panda needs helpers... that's YOU!",
        "ask": "Have you ever had a grumbly day like Panda's friends — mad or sad because of something a friend did?"
      },
      {
        "title": "Three Troubles in Town",
        "say": "Look through the magic window, helpers! Milo stretches and stretches — the top shelf is too high. Chicka's feelings are getting hurt by a bully. And Toby — oh no! — Toby grabs Panda's toy! Each time, three sparkly words pop into the sky: Stop! Think! Reflect!",
        "ask": "What should Panda do to help each friend?",
        "doThis": "Play the Engage video. Pause at 0:16 (Milo and the bookshelf), 0:46 (Chicka is bullied), and 1:14 (Toby takes the toy). At each pause ask: How does the friend feel? Why? What might happen next? How should Panda help?"
      },
      {
        "title": "The Three Magic Moves ✨",
        "say": "When friends feel upset with each other, that is called a conflict — a big tangled knot of feelings. But Panda knows a spell to untangle it: STOP! THINK! REFLECT! Reflect means to think about what happened. The spell chops the big knot into tiny pieces — snip, snip, snip!",
        "ask": "When we break something big into little pieces, what thinking power is that, helpers? (Decomposition!)",
        "doThis": "Do the moves together: STOP (hands out flat), THINK (finger on head), REFLECT (hands on heart)."
      },
      {
        "title": "The Great Toy Grab 😱",
        "say": "Story time! Milo is playing with a shiny toy. Panda rolls over — vroom, vroom — and... GRAB! Panda snatches the toy right out of Milo's paws! Poor Milo turns red as a tomato. Oh no, Panda — that was not hero behavior!",
        "doThis": "Pick a volunteer to be Milo holding a toy. Snap Forward cards on the mat to drive mTiny (Panda) to Milo, tap them with the Tap Pen, then tap Go! When mTiny arrives, act out the grab."
      },
      {
        "title": "Untangling the Knot",
        "say": "Quick, helpers — cast the spell with me! Stop! Think! Reflect! Panda could have asked, 'Milo, can we share?' or 'When will it be my turn?' Kind words fix problems that grabbing never, ever can.",
        "ask": "Stop: what did you see? Think: how did Milo feel? Reflect: what could Panda do differently?"
      },
      {
        "title": "The Rescue Missions 🗺️",
        "say": "Now every table gets a secret mission scroll! Inside is a friend in trouble and a little map. Only YOU can drive Panda there to help — snap the magic cards and off he goes! Vroom!",
        "doThis": "In groups of 3-4, hand out the Scenario Worksheets. Groups read their story, snap the Forward and Turn cards to match the map, run mTiny, then answer the Stop-Think-Reflect questions on the sheet."
      },
      {
        "title": "Heroes Around the Fire",
        "say": "Mission complete! Gather round, brave helpers. Every team found a kind idea to fix their trouble. I will write every single one on our big Hero List so we never forget!",
        "ask": "What was your conflict, and what kind idea saved the day so nobody gets hurt?",
        "doThis": "Invite 1-2 groups to re-run their mTiny code for the class, then chart each group's strategy on the board."
      },
      {
        "title": "The Magic 'I' Spell 💬",
        "say": "Shhh — Panda whispers one more secret spell. It starts with the tiny word 'I'. Say 'I feel sad because of those words' — poof! — the other friend understands. And kind questions like 'Can we share the toy and play together?' open doors that shouting slams shut!",
        "doThis": "Practice as a class: everyone says together, 'I feel... Can we share?'"
      },
      {
        "title": "Panda's Hero Handbook 📖",
        "say": "Every hero keeps a handbook of their best spells! Pick your 3 to 5 favorites from our Hero List and tuck them inside yours. Panda gives you a proud panda smile... then whispers: 'Come back soon, friends — tomorrow I have TRASH trouble, and I will need your helping hands!'",
        "doThis": "Open workbook page 12. Learners copy 3-5 strategies and Stop-Think-Reflect on their goals from Units 1 and 2: reached it? Write a new one! Not yet? What will you change?"
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
        "title": "Sharpening Our Spells",
        "say": "One bright morning, our hero Panda is back! But before today's adventure, heroes always sharpen their spells. Last time Panda taught us a three-step magic trick. Whisper it to the friend next to you!",
        "ask": "Who can shout our spell for Panda? (Stop — Think — Reflect!)",
        "doThis": "60-second turn-and-talk, then one volunteer shares."
      },
      {
        "title": "GRRR! The Trash Mountain 🗑️",
        "say": "Panda is cleaning the park when — GRRRR! — Panda makes the angriest noise you have EVER heard! The trash pile is as tall as a mountain. Then Toby asks about three mysterious words... and they all start with R!",
        "doThis": "Play the Engage video. Pause at 0:15 after the angry noise: Stop — what did you see? Think — how does Panda feel? Reflect — why? Pause again at 1:15 when Toby asks what reduce, reuse, and recycle mean."
      },
      {
        "title": "The Three R Spells ♻️",
        "say": "Reduce — use LESS! Reuse — use it AGAIN! Recycle — turn it into something NEW! Three magic words to shrink the trash mountain and protect Our Common Home, the Earth!",
        "ask": "Can you chant all three R spells with me, Earth heroes?",
        "doThis": "Chant with actions: Reduce (hands squeeze small), Reuse (roll hands in a circle), Recycle (draw a big triangle in the air)."
      },
      {
        "title": "The Treasure Hunt Begins 🔍",
        "say": "Panda needs treasure for the mission! Tiptoe, tiptoe around our room and find ONE thing we could reduce, reuse, or recycle — then bring it back to the carpet. Spotting just the important things is a hero power called abstraction!",
        "doThis": "Set the rules: walk, only loose things, don't break anything, 4 minutes. Go!"
      },
      {
        "title": "Three Bins, One Mission",
        "say": "Look — three magic bins appear! Reduce, Reuse, Recycle. One by one, drop your treasure in the right bin and watch the trash mountain shrink... shrink... shrink!",
        "ask": "What makes you say your treasure goes in that bin?",
        "doThis": "Each child places their item in a bin; pull items out one-by-one and discuss. Chart everything on the board."
      },
      {
        "title": "Detectives Spot a Pattern 👀",
        "say": "Wait a minute... Panda squints at our big list. Cardboard... plastic... metal... cardboard again! Do you see it too, detectives? So many treasures can become something brand new!",
        "ask": "What patterns do you spot? What are the treasures made of?"
      },
      {
        "title": "Panda's Big Secret 🤫",
        "say": "Come close... closer... Panda has a SECRET! We are going to build our very own BOARD GAME with Panda — a game that teaches the whole world the three R spells! But hmm... what do games like this one have inside?",
        "ask": "What do all board games need? (A board, rules, pieces, a way to win!)",
        "doThis": "Hold up a board game the class knows and list their answers on the board."
      },
      {
        "title": "Catching Firefly Ideas 💡",
        "say": "Every great builder starts by catching ideas like fireflies — quick, before they fly away! Dream big, little dreamers: what will our board look like? How do you win? How will it teach the three Rs?",
        "doThis": "Open workbook page 15 'Board Game Brainstorm.' Groups explore the board games, mTiny, coding cards and map pieces around the room for about 12 minutes, then share ideas as a class."
      },
      {
        "title": "The Hero's Promise 🌍",
        "say": "The trash mountain is trembling now — because YOU know the three R spells! Close your eyes and make one hero promise: one way you will reduce, reuse, or recycle this week. And psst... next episode, hammers and crayons out — we start BUILDING Panda's great game!",
        "ask": "Who would like to share their 3R promise with Panda?"
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
        "title": "Heroes, Assemble!",
        "say": "Boing, boing! Panda bounces into class this morning, too excited to sit still — because today is BUILD day! But first, our hero checks the team's memory. Three R words saved the park last time...",
        "ask": "What are the 3 R's, and why did Panda teach us? (Reduce, reuse, recycle — to help Our Common Home!)"
      },
      {
        "title": "Chicka Forgets! 😮",
        "say": "Uh oh! Through the magic window, Panda and friends are planning THEIR game — but Chicka's memory goes POOF! She forgets what the R words mean. Quick, helpers — only YOU can remind her!",
        "doThis": "Play the Engage video. Pause at 0:21 (what does reduce mean?), 0:42 (what does reuse mean?), 0:56 (what does recycle mean?), and 2:43 when Panda talks about breaking down the work — ask which thinking skill breaks things down (decomposition!)."
      },
      {
        "title": "The Giant Blueprint",
        "say": "Swoosh! Panda unrolls a giant blueprint across the floor. We already investigated and brainstormed like real engineers. Now comes the next stage of the quest: PLANNING! Today we plan our rules and begin to build.",
        "ask": "What does our game need, brave engineers? (Rules, a board, cards, ways to code with mTiny!)"
      },
      {
        "title": "The Rule Scrolls 📜",
        "say": "Every game in the kingdom needs rules! March around, visit the mTiny stations, and dream up TWO rules for our game. Maybe... you must use mTiny Discover every time it is your turn!",
        "doThis": "Open workbook page 18 'Game Rules.' Learners visit the coding cards, maps and mTiny stations placed around the room and write (or think of) 2 rules — about 6 minutes."
      },
      {
        "title": "The Council of Rules",
        "say": "Ding ding ding! The Great Rule Council begins! Share your rules and I will write them on the royal chart. Together we choose the very best ones — so our game is fair for every player in the land!",
        "ask": "Do we all agree on these rules? Will they help someone win fairly?",
        "doThis": "Chart the rules, remove duplicates, and narrow the list down as a class."
      },
      {
        "title": "Choose Your Hero Job 🛠️",
        "say": "A giant quest gets easier when we chop it into jobs — snip, snip, decomposition! Will you be a Board Designer, a Piece Maker, a Card Builder, or a Game Writer? Panda needs every single one of you!",
        "ask": "Which hero job will you choose?",
        "doThis": "Explain each role: Board Designers draw and color the board using the mTiny maps; Piece Makers build player pieces; Card Builders draw things to reduce, reuse or recycle; Game Writers write the steps like little algorithms. Vote or assign, then move into groups."
      },
      {
        "title": "The Workshop Comes Alive 🔨",
        "say": "Tap tap! Snip snip! Color color! The workshop comes alive! Sketch first, then create. And listen — Panda wants to test-drive every board. Vroom! If Panda can cross it, our path works!",
        "doThis": "Groups build for 15-20 minutes. Keep mTiny and the Tap Pen with the Board Designers so they can snap cards and test-drive the board as they go."
      },
      {
        "title": "Treasures Held High ✨",
        "say": "Builders, freeze! Look what your hands made today! When I call your job, lift your treasure high into the sky. Panda claps his paws — clap, clap, clap! But wait... will the game actually WORK? Next episode: the big TEST!",
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
        "title": "Sunrise Over the Workshop",
        "say": "The sun rises over the workshop... and there stands our game, built by YOUR hands! Panda circles it slowly. Hmm... hmm... Our hero has already investigated, brainstormed, planned and built. But today, something brand new is coming!",
        "ask": "Which stages of the Engineering Design Process have we heroes finished so far?"
      },
      {
        "title": "Iter-WHAT?! 🤯",
        "say": "Through the magic window, Chicka says a strange, wobbly new word — and Panda's eyes go WIDE! 'Iter-WHAT?' says Panda. A mystery word! Helpers, we must crack the code together!",
        "doThis": "Play the Engage video. Pause at 0:41 after Panda says 'Iter-what?' and ask: what do you think iteration means? Pause at 1:19 and ask: what thinking skills do we practice when we iterate?"
      },
      {
        "title": "The Best Test Is to PLAY 🎲",
        "say": "Mystery solved! Iterate means test it and make it BETTER. And how do heroes test a board game? They PLAY it! Roll up, roll up — everyone gets a turn!",
        "doThis": "Set up the board, pieces, cards, mTiny, Tap Pen and coding cards. Play for 10-15 minutes, rotating players so everyone gets a chance."
      },
      {
        "title": "Detectives in the Shadows 🕵️",
        "say": "But while some heroes play, other heroes watch from the shadows like detectives. Every wobble, every mix-up, every 'huh?' is TREASURE — because every problem we spot makes our game stronger!",
        "ask": "How can we make the game work better? Easier to play? More fair? More beautiful?",
        "doThis": "Display the four questions where everyone can see. Watchers raise a hand to share observations and the coach records each one."
      },
      {
        "title": "The Fix-It Map 🗺️",
        "say": "Panda spreads a big chart across the table — the Fix-It Map! Every problem goes on it, next to its fix, next to the hero who will fix it. An action plan, just like real engineers! Broken things first — charge!",
        "ask": "Which problems should we fix first, heroes?",
        "doThis": "Draw a 3-column chart — Problems we noticed / Solutions / Who will fix it. Walk through the four detective questions and fill it in together; pick just 3-5 fixes for today."
      },
      {
        "title": "The Great Fix-It Race 🔧",
        "say": "Teams, to your stations! Board Designers, Piece Makers, Card Builders, Game Writers — each of you has a mission on the Fix-It Map. Snip! Glue! Color! And let Panda test-drive every fix — vroom, vroom!",
        "doThis": "Groups iterate for 15-20 minutes with makerspace materials (markers, glue, scissors). Keep mTiny, the Tap Pen and coding cards out for testing. Groups that finish can play the game."
      },
      {
        "title": "Victory Shout-Outs 📣",
        "say": "Tools down, fix-it heroes! Stand tall and shout your victory — in just one or two words, what did your team make better today?",
        "doThis": "Rapid-fire share out around the circle."
      },
      {
        "title": "Stronger Than This Morning 💪",
        "say": "Look at our game now — shinier, fairer, easier, BETTER! That is the magic of iterate: test, fix, and try again. Panda hugs the board with both paws. And next episode, the biggest moment of all... we show our game to the WORLD!",
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
        "title": "The Final Adventure Begins",
        "say": "This is it, friends — the very last episode of Panda's great adventure! Our finished game sits proud and shining on the table. Turn to the friend beside you and remember every amazing thing we poured into it!",
        "ask": "What strategies, ideas and lessons went into our game? (The 3 R's, the Engineering Design Process, coding cards, mTiny, our team roles!)",
        "doThis": "60-second turn-and-talk, then share out as a group."
      },
      {
        "title": "The Town Transformed 😲",
        "say": "Through the magic window one last time! Panda and friends shared their game with everyone... and then walked to the park and the river. Hold your breath, helpers — wait until you see what changed!",
        "doThis": "Play the Engage video. Pause at 0:15 when Milo sees the sparkling clean park, and at 1:42 when Chicka sees the clean river. At each pause ask: What do you see? What do you think? What do you wonder?"
      },
      {
        "title": "Panda's Mark on the World 🌍",
        "say": "The park sparkles! The river shines! The whole town learned the three R spells from Panda's game — they even put up recycling bins! That, dear heroes, is what making your mark means.",
        "ask": "What happened in the town because of Panda's game?"
      },
      {
        "title": "Our Turn to Shine",
        "say": "Now Panda turns to us with twinkling eyes and asks THE big question: 'Friends... how will YOU share OUR game with the world?' Panda's friends planned a game night and a video. Huddle up, little dream-teams — dream up your own ways!",
        "doThis": "In groups of 2-3, brainstorm 2-3 sharing ideas for 4-5 minutes and write them on workbook page 23."
      },
      {
        "title": "The Great Vote 🗳️",
        "say": "Idea fireflies everywhere! We could take pictures for our parents, teach another class to play, make a video, or write for the school newspaper. Every idea glows — but our class can carry only ONE out into the world!",
        "ask": "Which sharing idea should our class choose?",
        "doThis": "Chart every idea, then vote as a class on ONE way to share the game."
      },
      {
        "title": "The Magic Mirror: 3-2-1 🪞",
        "say": "Before a hero rides into the sunset, they look into the magic mirror and REFLECT — thinking about their own thinking! The mirror asks for 3 things you learned, 2 things you found interesting, and 1 question still buzzing in your head.",
        "doThis": "Model with the sentence starters on workbook pages 24-26: 'I learned about strategies — they are ways we solve problems. I thought coding was interesting because code tells mTiny what to do. I still wonder why code does not work every time!'"
      },
      {
        "title": "My Page in the Legend 📖",
        "say": "Your turn, heroes! Flip back through your workbook — the feelings, the maps, the cards, the game — your whole adventure with Panda! Now write your very own 3-2-1 page in the legend.",
        "doThis": "Learners work independently on workbook pages 24-26 for 10-15 minutes. Circulate and help; give a 1-minute warning before time is up."
      },
      {
        "title": "Campfire Stories 🔥",
        "say": "Gather round the campfire, adventurers! Let's hear your tales — something you learned, something that made your eyes go WOW, and a question we can chase on our next adventure.",
        "ask": "Who would like to share one thing from their 3-2-1?",
        "doThis": "Call on 2-3 learners for each part: learned, interesting, still wondering."
      },
      {
        "title": "The Happy Dance Finale 🎉",
        "say": "Panda looks at each of you and smiles the biggest panda smile ever. You solved problems! You built a whole game! You made your mark on Our Common Home! Panda is SO happy, he dances — wiggle, wiggle, vroom! Give yourselves a giant panda hug... heroes forever!",
        "doThis": "Big class cheer, then let mTiny do a happy dance across the mat: snap Forward, Turn Left, Turn Right, Forward, tap them with the Tap Pen, and Go!"
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
