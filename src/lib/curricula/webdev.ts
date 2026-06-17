import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// HTML / CSS / JavaScript — build real web pages in the browser ($0).
// Fully interactive: every lesson has a live code playground + quiz + an activity.
const P: KitProgram = { programId: 'html-css-js', programSlug: 'html-css-js', programTitle: 'HTML / CSS / JavaScript', programColor: '#EA580C', courseId: 'webdev-1', courseTitle: 'Build Websites: HTML, CSS & JavaScript' };
const L1 = 'Level I · HTML & CSS', L2 = 'Level II · JavaScript', L3 = 'Level III · Build & Ship a Site';
const M = [{ item: 'Computer with a browser + a code editor (VS Code, or online: CodePen / Replit)', quantity: '1 per student' }];
const MDN = { id: 'mdn', title: 'MDN — Learn Web Development (free)', type: 'link' as const, audience: 'both' as const, url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'Mozilla\'s free, authoritative web tutorials' };
const FCC = { id: 'fcc', title: 'freeCodeCamp — Responsive Web Design (free)', type: 'link' as const, audience: 'both' as const, url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', description: 'Free interactive HTML/CSS course' };
const html = (starter: string) => ({ lang: 'html' as const, starter });

const C: KitLesson[] = [
  {
    id: 'web-1', title: 'Your First Web Page (HTML)', emoji: '🌐', difficulty: 2, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 1,
    concept: 'HTML structure with tags', conceptExplain: 'HTML is the skeleton of a web page. Content goes inside tags like <h1>, <p>, <img>, <a>. A browser reads the HTML and shows the page.',
    objectives: ['Write a basic HTML document', 'Use headings, paragraphs, images and links', 'Open your page in a browser'],
    steps: ['Create index.html with html/head/body.', 'Add an <h1> title and a <p> paragraph.', 'Add an <img> and an <a> link.', 'Open it in the browser.'],
    challenge: 'Build an "About Me" page with a heading, a photo, a paragraph and two links.', skills: ['HTML', 'Tags', 'Structure'], materials: M, resources: [MDN, FCC],
    playground: html('<h1>About Me</h1>\n<p>Hi! I am learning web development at RoboHolic.</p>\n<a href="https://makeymakey.com">A link</a>\n<!-- Try adding another <p> or an <h2> below -->'),
    quiz: [
      { question: 'Which tag makes the biggest heading?', options: ['<p>', '<h1>', '<head>', '<title>'], answerIndex: 1, explanation: '<h1> is the top-level heading; <p> is a paragraph.' },
      { question: 'Which tag creates a link?', options: ['<link>', '<a>', '<href>', '<url>'], answerIndex: 1, explanation: 'The <a> (anchor) tag, with an href attribute.' },
      { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Mode Language'], answerIndex: 0 },
    ],
    interactions: [
      { kind: 'fill', title: '✏️ Fill the Tags', intro: 'Complete the HTML (type just the tag name, e.g. h1).', text: 'A paragraph uses the ___ tag, the biggest heading uses ___, an image uses ___, and a link uses the ___ tag.', answers: ['p', 'h1', 'img', 'a'] },
    ],
  },
  {
    id: 'web-2', title: 'Styling with CSS', emoji: '🎨', difficulty: 2, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 2,
    concept: 'CSS for colours, fonts and spacing', conceptExplain: 'CSS styles HTML — colours, fonts, sizes, spacing. You select an element and set properties: e.g. h1 { color: blue; }.',
    objectives: ['Add CSS to a page', 'Use selectors and properties', 'Style text, colours and backgrounds'],
    steps: ['Add a <style> block.', 'Style the body font and background.', 'Style h1 and p (colour, size).', 'Refresh to see changes.'],
    challenge: 'Give your About-Me page a colour theme, a custom font and nice spacing.', skills: ['CSS', 'Selectors', 'Design'], materials: M, resources: [MDN, FCC],
    playground: html('<style>\n  body { font-family: sans-serif; background: #FFF7ED; padding: 20px; }\n  h1 { color: #EA580C; }\n  p { color: #444; }\n</style>\n<h1>Styled with CSS!</h1>\n<p>Change the colours and font above, then Run.</p>'),
    quiz: [
      { question: 'What does CSS control?', options: ['The page\'s content', 'The page\'s appearance/style', 'The database', 'The server'], answerIndex: 1 },
      { question: 'Which CSS sets the text colour of <h1>?', options: ['h1 { text: blue; }', 'h1 { color: blue; }', 'h1 { font: blue; }', '<h1 color="blue">'], answerIndex: 1 },
      { question: 'Where can CSS rules live?', options: ['Only in a .css file', 'In a <style> tag or a .css file', 'Inside <h1> only', 'In the database'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'p { color: red; font-size: 30px; }', question: 'What happens to every <p> on the page?', options: ['Nothing changes', 'All paragraphs turn red and bigger', 'Only the first paragraph changes', 'The headings turn red'], answerIndex: 1, explanation: 'A tag selector (p) styles ALL <p> elements.' }],
  },
  {
    id: 'web-3', title: 'Layout: Box Model & Flexbox', emoji: '📐', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 3,
    concept: 'the box model and flexbox layout', conceptExplain: 'Every element is a box (content, padding, border, margin). Flexbox arranges boxes in rows/columns — the modern way to lay out a page.',
    objectives: ['Use padding, border and margin', 'Lay out boxes with flexbox', 'Build a simple navigation bar'],
    steps: ['Add padding/margin/border to a box.', 'Wrap items in a container with display:flex.', 'Use gap to space them.', 'Build a horizontal nav bar.'],
    challenge: 'Build a page with a top nav bar and a 3-card row using flexbox.', skills: ['Box Model', 'Flexbox', 'Layout'], materials: M, resources: [MDN],
    playground: html('<style>\n  .nav { display: flex; gap: 16px; background:#0F2044; padding:12px; }\n  .nav a { color:white; text-decoration:none; }\n</style>\n<div class="nav"><a>Home</a><a>About</a><a>Contact</a></div>\n<p>Try changing gap, or add a 4th link.</p>'),
    quiz: [
      { question: 'Which CSS makes items sit in a row?', options: ['display: block', 'display: flex', 'display: none', 'float: row'], answerIndex: 1 },
      { question: 'The box model order from inside out is:', options: ['margin, border, padding, content', 'content, padding, border, margin', 'content, margin, border, padding', 'padding, content, margin, border'], answerIndex: 1 },
      { question: 'Which property adds space INSIDE a box, around its content?', options: ['margin', 'padding', 'gap', 'border'], answerIndex: 1, explanation: 'Padding is inside the border; margin is outside.' },
    ],
  },
  {
    id: 'web-4', title: 'Responsive & Multi-Page Sites', emoji: '📱', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 4,
    concept: 'responsive design and linking pages', conceptExplain: 'Responsive pages look good on phones and desktops using flexible units and media queries. Multiple HTML pages link together to form a site.',
    objectives: ['Make a layout responsive with a media query', 'Link multiple pages', 'Use a shared stylesheet'],
    steps: ['Add a viewport meta tag.', 'Add a media query for small screens.', 'Create a second page and link both ways.', 'Share one stylesheet.'],
    challenge: 'Make a 2-page site (Home + About) that reflows neatly on mobile.', skills: ['Responsive', 'Media Queries', 'Multi-page'], materials: M, resources: [MDN, FCC],
    quiz: [
      { question: 'What makes a page adapt to phone screens?', options: ['A media query', 'A bigger image', 'A second server', 'More headings'], answerIndex: 0 },
      { question: 'How do you go from one page to another in a site?', options: ['A <p> tag', 'An <a href="page.html"> link', 'A CSS rule', 'A media query'], answerIndex: 1 },
      { question: 'The viewport <meta> tag helps with:', options: ['Colours', 'Mobile responsiveness', 'Databases', 'Fonts'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: '@media (max-width: 600px) {\n  .nav { flex-direction: column; }\n}', question: 'When does the nav stack vertically?', options: ['Always', 'Only on screens 600px wide or narrower', 'Only on wide screens', 'Never'], answerIndex: 1, explanation: 'max-width:600px applies on small screens (≤600px).' }],
  },
  // Level II — JavaScript
  {
    id: 'web-5', title: 'JavaScript Basics', emoji: '⚡', difficulty: 3, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 5,
    concept: 'variables, types and functions in JS', conceptExplain: 'JavaScript makes pages interactive. It has variables, types, operators and functions, and runs right in the browser.',
    objectives: ['Declare variables (let/const)', 'Write and call a function', 'Show output on the page'],
    steps: ['Add a <script>.', 'Make variables and do arithmetic.', 'Write a function that returns a value.', 'Show the result on the page.'],
    challenge: 'Write a function that takes a name and greets the user.', skills: ['JavaScript', 'Variables', 'Functions'], materials: M, resources: [MDN],
    playground: html('<h2 id="out">Result here</h2>\n<script>\n  function add(a, b) { return a + b; }\n  let result = add(2, 3);\n  document.getElementById("out").textContent = "2 + 3 = " + result;\n</script>'),
    quiz: [
      { question: 'Which keyword declares a variable that can change?', options: ['const', 'let', 'fun', 'var-let'], answerIndex: 1, explanation: 'let is reassignable; const is constant.' },
      { question: 'What does a function\'s "return" do?', options: ['Prints to screen', 'Gives back a value', 'Loops forever', 'Styles the page'], answerIndex: 1 },
      { question: 'JavaScript runs:', options: ['Only on a server', 'In the browser', 'Only in a database', 'On paper'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'let x = 5;\nlet y = x * 2;\nconsole.log(y);', question: 'What is logged?', options: ['5', '10', '52', 'x*2'], answerIndex: 1, explanation: '5 × 2 = 10.' }],
  },
  {
    id: 'web-6', title: 'The DOM: Make the Page React', emoji: '🖱️', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 6,
    concept: 'reading and changing the page with JS', conceptExplain: 'The DOM is the page as objects JS can change. You select elements (querySelector), respond to events (click), and update content/styles.',
    objectives: ['Select an element with querySelector', 'Add a click event listener', 'Change text or style from code'],
    steps: ['Add a button and a text element.', 'Select them in JS.', 'addEventListener("click", …).', 'Change the text/colour on click.'],
    challenge: 'Build a button that toggles dark/light mode.', skills: ['DOM', 'Events', 'Interactivity'], materials: M, resources: [MDN],
    playground: html('<button id="btn">Click me</button>\n<p id="out">Not clicked yet.</p>\n<script>\n  document.getElementById("btn").addEventListener("click", function() {\n    document.getElementById("out").textContent = "Clicked! 🎉";\n  });\n</script>'),
    quiz: [
      { question: 'What does querySelector do?', options: ['Creates a database', 'Selects an element on the page', 'Sends an email', 'Adds CSS'], answerIndex: 1 },
      { question: 'Which runs code when a button is clicked?', options: ['addEventListener("click", …)', 'while(click)', 'onLoad()', 'click.css'], answerIndex: 0 },
      { question: 'The DOM lets JavaScript:', options: ['Change the page live', 'Slow the page down', 'Only read files', 'Style with CSS only'], answerIndex: 0 },
    ],
  },
  {
    id: 'web-7', title: 'Logic, Loops & Arrays in JS', emoji: '🔁', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 7,
    concept: 'conditionals, loops and arrays', conceptExplain: 'if/else makes decisions, loops repeat, and arrays hold lists. Together they power real interactive features.',
    objectives: ['Use if/else and loops', 'Store data in an array', 'Loop over an array to build the page'],
    steps: ['Make an array of items.', 'Loop over it with for/forEach.', 'Build list elements from the data.', 'Add a condition.'],
    challenge: 'Build a to-do list: type an item, press add, it appears in the list.', skills: ['Loops', 'Arrays', 'Logic'], materials: M, resources: [MDN],
    playground: html('<ul id="list"></ul>\n<script>\n  const items = ["Build", "Test", "Ship"];\n  const ul = document.getElementById("list");\n  for (let i = 0; i < items.length; i++) {\n    ul.innerHTML += "<li>" + items[i] + "</li>";\n  }\n</script>'),
    quiz: [
      { question: 'What does a "for" loop do?', options: ['Makes a decision', 'Repeats code', 'Stores one value', 'Styles text'], answerIndex: 1 },
      { question: 'An array holds:', options: ['One value', 'A list of values', 'Only numbers', 'Only text'], answerIndex: 1 },
      { question: 'items.length gives:', options: ['The first item', 'How many items are in the array', 'The last item', 'A random item'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'const a = [10, 20, 30];\nlet total = 0;\nfor (let i = 0; i < a.length; i++) { total += a[i]; }\nconsole.log(total);', question: 'What is logged?', options: ['30', '60', '102030', '3'], answerIndex: 1, explanation: '10 + 20 + 30 = 60.' }],
  },
  {
    id: 'web-8', title: 'Build a Mini App', emoji: '🧮', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 8,
    concept: 'combining HTML + CSS + JS into an app', conceptExplain: 'A small app ties it together: a UI (HTML/CSS) and logic (JS) — like a calculator, quiz or unit converter.',
    objectives: ['Plan a small app\'s UI and logic', 'Wire inputs/buttons to JS', 'Show results on the page'],
    steps: ['Pick an app (calculator/quiz/converter).', 'Build the HTML/CSS UI.', 'Write the JS logic.', 'Connect inputs → logic → output.'],
    challenge: 'Build a working tip calculator or 5-question quiz with a score.', skills: ['App Building', 'Integration', 'JS'], materials: M, resources: [MDN, FCC],
    playground: html('<input id="n" type="number" placeholder="Bill amount"> \n<button onclick="tip()">Tip 15%</button>\n<p id="out"></p>\n<script>\n  function tip() {\n    let bill = Number(document.getElementById("n").value);\n    document.getElementById("out").textContent = "Tip: " + (bill * 0.15).toFixed(2);\n  }\n</script>'),
    quiz: [
      { question: 'A web app combines:', options: ['HTML, CSS and JavaScript', 'Only HTML', 'Only a database', 'Only CSS'], answerIndex: 0 },
      { question: 'To read what a user typed in an input you use:', options: ['input.color', 'input.value', 'input.size', 'input.style'], answerIndex: 1 },
      { question: 'Number("12") gives:', options: ['The text "12"', 'The number 12', 'An error', 'Nothing'], answerIndex: 1 },
    ],
  },
  // Level III
  {
    id: 'web-9', title: 'Forms & Input Validation', emoji: '📝', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 9,
    concept: 'HTML forms and validating input', conceptExplain: 'Forms collect user input. You read values in JS and validate them (not empty, valid email) before using them.',
    objectives: ['Build a form with inputs', 'Read values in JS', 'Validate input and show a message'],
    steps: ['Create a form with text/email inputs.', 'On submit, read the values.', 'Validate (required, format).', 'Show a success/error message.'],
    challenge: 'Build a contact form that validates a name and email and confirms on success.', skills: ['Forms', 'Validation', 'UX'], materials: M, resources: [MDN],
    playground: html('<input id="name" placeholder="Your name">\n<button onclick="check()">Submit</button>\n<p id="msg"></p>\n<script>\n  function check() {\n    let v = document.getElementById("name").value.trim();\n    document.getElementById("msg").textContent = v ? ("Hi " + v + "! ✅") : "Please enter your name ❌";\n  }\n</script>'),
    quiz: [
      { question: 'Why validate form input?', options: ['To make it colourful', 'To make sure the data is correct/complete', 'To slow the page', 'To add images'], answerIndex: 1 },
      { question: 'Which checks an input is empty in JS?', options: ['value.trim() === ""', 'value.color', 'value.big', 'value.style'], answerIndex: 0 },
      { question: 'A form sends data using its:', options: ['colour', 'action and method', 'font', 'width'], answerIndex: 1 },
    ],
  },
  {
    id: 'web-10', title: 'Git & Publish with GitHub Pages', emoji: '🚀', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 10,
    concept: 'version control and free hosting', conceptExplain: 'Git tracks changes to your code; GitHub stores it; GitHub Pages hosts a static site for free — so your site goes live on the internet at $0.',
    objectives: ['Put a project in a GitHub repo', 'Understand basic commit/push', 'Publish with GitHub Pages'],
    steps: ['Create a GitHub repo and add your files.', 'Commit and push your site.', 'Enable GitHub Pages in settings.', 'Visit your live URL.'],
    challenge: 'Publish your site live on GitHub Pages and share the link.', skills: ['Git', 'GitHub Pages', 'Deployment'], materials: M, resources: [MDN],
    quiz: [
      { question: 'What does Git do?', options: ['Hosts videos', 'Tracks changes to your code', 'Styles pages', 'Runs a database'], answerIndex: 1 },
      { question: 'GitHub Pages lets you:', options: ['Host a static site for free', 'Buy a domain', 'Edit photos', 'Run PHP'], answerIndex: 0 },
      { question: 'Saving a snapshot of your code in Git is called a:', options: ['push', 'commit', 'clone', 'merge'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'match', title: '🔗 Match the Git terms', pairs: [
      { left: 'commit', right: 'Save a snapshot of changes' },
      { left: 'push', right: 'Upload commits to GitHub' },
      { left: 'repository', right: 'A project\'s folder of code & history' },
      { left: 'GitHub Pages', right: 'Free hosting for a static site' },
    ] }],
  },
  {
    id: 'web-11', title: 'Capstone: Build & Ship a Multi-Page Site', emoji: '🏁', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 11,
    concept: 'a complete, responsive, interactive website', conceptExplain: 'Students plan and build a real multi-page, responsive site with at least one interactive JS feature, then publish it and gather feedback.',
    objectives: ['Plan and build a multi-page responsive site', 'Add an interactive JS feature', 'Publish it and iterate'],
    steps: ['Plan pages and content.', 'Build responsive HTML/CSS.', 'Add a JS feature (form, gallery, quiz).', 'Publish to GitHub Pages and refine.'],
    challenge: 'Ship a 3-page portfolio/club site with one interactive feature, live online.', skills: ['Web Dev', 'Project', 'Shipping'], materials: M, resources: [MDN, FCC],
    playground: html('<style>\n  body { font-family: sans-serif; }\n  .hero { background:#EA580C; color:white; padding:24px; border-radius:12px; text-align:center; }\n</style>\n<div class="hero"><h1>My Club Site</h1><p>Welcome!</p></div>\n<button onclick="alert(\'Thanks for visiting!\')">Say hi</button>\n<!-- Make it yours: add sections, colours, and another button -->'),
    quiz: [
      { question: 'A good website project should be:', options: ['One huge page only', 'Planned, responsive and interactive', 'Images only', 'Text only'], answerIndex: 1 },
      { question: 'Before building, you should:', options: ['Plan the pages and content', 'Publish immediately', 'Delete everything', 'Skip CSS'], answerIndex: 0 },
      { question: 'After publishing, improving from feedback is called:', options: ['ignoring', 'iterating', 'deleting', 'hosting'], answerIndex: 1 },
    ],
  },
];

export const WEBDEV_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const WEBDEV_COURSE: Course = {
  id: P.courseId, slug: 'build-websites', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '13-15', level: 'Beginner',
  description: 'Build real websites with the languages of the web — and run your code live in every lesson. Level I: HTML structure and CSS styling/layout (box model, flexbox, responsive). Level II: JavaScript — variables, the DOM, events, logic and a mini app. Level III: forms & validation, Git + free GitHub Pages hosting, and a ship-it capstone. 100% browser-based and $0.',
  objectives: ['Structure pages with HTML and style them with CSS', 'Lay out responsive pages with flexbox and media queries', 'Add interactivity with JavaScript and the DOM', 'Use Git and publish for free with GitHub Pages', 'Build and ship a complete multi-page site'],
  duration: '11 lessons × 45–60 minutes', totalHours: 11, lessonCount: 11, prerequisites: [],
  skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git / GitHub Pages'],
  modules: [
    { id: 'web-m1', title: L1, order: 1, description: 'HTML structure and CSS styling, layout (box model, flexbox) and responsive multi-page sites.', lessons: C.filter(c => c.moduleId === 'web-m1').map(kitSummary) },
    { id: 'web-m2', title: L2, order: 2, description: 'JavaScript: variables & functions, the DOM & events, logic/loops/arrays, and a mini app.', lessons: C.filter(c => c.moduleId === 'web-m2').map(kitSummary) },
    { id: 'web-m3', title: L3, order: 3, description: 'Forms & validation, Git + GitHub Pages hosting, and a ship-a-real-site capstone.', lessons: C.filter(c => c.moduleId === 'web-m3').map(kitSummary) },
  ],
};
