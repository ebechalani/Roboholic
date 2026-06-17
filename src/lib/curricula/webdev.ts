import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// HTML / CSS / JavaScript — build real web pages in the browser ($0).
const P: KitProgram = { programId: 'html-css-js', programSlug: 'html-css-js', programTitle: 'HTML / CSS / JavaScript', programColor: '#EA580C', courseId: 'webdev-1', courseTitle: 'Build Websites: HTML, CSS & JavaScript' };
const L1 = 'Level I · HTML & CSS', L2 = 'Level II · JavaScript', L3 = 'Level III · Build & Ship a Site';
const M = [{ item: 'Computer with a browser + a code editor (VS Code, or online: CodePen / Replit)', quantity: '1 per student' }];
const MDN = { id: 'mdn', title: 'MDN — Learn Web Development (free)', type: 'link' as const, audience: 'both' as const, url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'Mozilla\'s free, authoritative web tutorials' };
const FCC = { id: 'fcc', title: 'freeCodeCamp — Responsive Web Design (free)', type: 'link' as const, audience: 'both' as const, url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', description: 'Free interactive HTML/CSS course' };

const C: KitLesson[] = [
  { id: 'web-1', title: 'Your First Web Page (HTML)', emoji: '🌐', difficulty: 2, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 1,
    concept: 'HTML structure with tags', conceptExplain: 'HTML is the skeleton of a web page. Content goes inside tags like <h1>, <p>, <img>, <a>. A browser reads the HTML and shows the page.',
    objectives: ['Write a basic HTML document', 'Use headings, paragraphs, images and links', 'Open your page in a browser'],
    steps: ['Create index.html with <!DOCTYPE html> and html/head/body.', 'Add an <h1> title and a <p> paragraph.', 'Add an <img> and an <a> link.', 'Open it in the browser.'],
    code: ['<h1>My Page</h1>', '<p>Hello world!</p>', '<a href="https://example.com">A link</a>'],
    challenge: 'Build an "About Me" page with a heading, a photo, a paragraph and two links.', skills: ['HTML', 'Tags', 'Structure'], materials: M, resources: [MDN, FCC] },
  { id: 'web-2', title: 'Styling with CSS', emoji: '🎨', difficulty: 2, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 2,
    concept: 'CSS for colours, fonts and spacing', conceptExplain: 'CSS styles HTML — colours, fonts, sizes, spacing. You select an element and set properties: e.g. h1 { color: blue; }.',
    objectives: ['Add CSS to a page', 'Use selectors and properties', 'Style text, colours and backgrounds'],
    steps: ['Add a <style> block or a styles.css file.', 'Style the body font and background.', 'Style h1 and p (colour, size).', 'Refresh to see changes.'],
    code: ['body { font-family: sans-serif; }', 'h1 { color: #EA580C; }'],
    challenge: 'Give your About-Me page a colour theme, a custom font and nice spacing.', skills: ['CSS', 'Selectors', 'Design'], materials: M, resources: [MDN, FCC] },
  { id: 'web-3', title: 'Layout: Box Model & Flexbox', emoji: '📐', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 3,
    concept: 'the box model and flexbox layout', conceptExplain: 'Every element is a box (content, padding, border, margin). Flexbox arranges boxes in rows/columns — the modern way to lay out a page.',
    objectives: ['Use padding, border and margin', 'Lay out boxes with flexbox', 'Build a simple navigation bar'],
    steps: ['Add padding/margin/border to a box.', 'Wrap items in a container with display:flex.', 'Use justify-content / gap to space them.', 'Build a horizontal nav bar.'],
    code: ['.nav { display: flex; gap: 16px; }'],
    challenge: 'Build a page with a top nav bar and a 3-card row using flexbox.', skills: ['Box Model', 'Flexbox', 'Layout'], materials: M, resources: [MDN] },
  { id: 'web-4', title: 'Responsive & Multi-Page Sites', emoji: '📱', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'web-m1', moduleTitle: L1, order: 4,
    concept: 'responsive design and linking pages', conceptExplain: 'Responsive pages look good on phones and desktops using flexible units and media queries. Multiple HTML pages link together to form a site.',
    objectives: ['Make a layout responsive with a media query', 'Link multiple pages', 'Use relative links and a shared stylesheet'],
    steps: ['Add a viewport meta tag.', 'Add a media query for small screens.', 'Create a second page and link both ways.', 'Share one stylesheet across pages.'],
    code: ['@media (max-width: 600px) { .nav { flex-direction: column; } }'],
    challenge: 'Make a 2-page site (Home + About) that reflows neatly on mobile.', skills: ['Responsive', 'Media Queries', 'Multi-page'], materials: M, resources: [MDN, FCC] },
  // Level II
  { id: 'web-5', title: 'JavaScript Basics', emoji: '⚡', difficulty: 3, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 5,
    concept: 'variables, types and functions in JS', conceptExplain: 'JavaScript makes pages interactive. It has variables, types, operators and functions, and runs right in the browser.',
    objectives: ['Declare variables (let/const)', 'Write and call a function', 'Log output to the console'],
    steps: ['Add a <script> or .js file.', 'Make variables and do arithmetic.', 'Write a function that returns a value.', 'console.log the result.'],
    code: ['function add(a, b) { return a + b; }', 'console.log(add(2, 3));'],
    challenge: 'Write a function that takes a name and logs a personalised greeting.', skills: ['JavaScript', 'Variables', 'Functions'], materials: M, resources: [MDN] },
  { id: 'web-6', title: 'The DOM: Make the Page React', emoji: '🖱️', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 6,
    concept: 'reading and changing the page with JS', conceptExplain: 'The DOM is the page as objects JS can change. You select elements (querySelector), respond to events (click), and update content/styles.',
    objectives: ['Select an element with querySelector', 'Add a click event listener', 'Change text or style from code'],
    steps: ['Add a button and a text element.', 'Select them in JS.', 'addEventListener("click", ...).', 'Change the text/colour on click.'],
    code: ['document.querySelector("#btn").addEventListener("click", () => {', '  document.querySelector("#out").textContent = "Clicked!";', '});'],
    challenge: 'Build a button that toggles dark/light mode (changes the page colours).', skills: ['DOM', 'Events', 'Interactivity'], materials: M, resources: [MDN] },
  { id: 'web-7', title: 'Logic, Loops & Arrays in JS', emoji: '🔁', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 7,
    concept: 'conditionals, loops and arrays', conceptExplain: 'if/else makes decisions, loops repeat, and arrays hold lists. Together they power real interactive features.',
    objectives: ['Use if/else and loops', 'Store data in an array', 'Loop over an array to build the page'],
    steps: ['Make an array of items.', 'Loop over it with for/forEach.', 'Build list elements from the data.', 'Add a condition (e.g. highlight some).'],
    code: ['const items = ["a","b","c"];', 'items.forEach(x => console.log(x));'],
    challenge: 'Build a to-do list: type an item, press add, and it appears in the list.', skills: ['Loops', 'Arrays', 'Logic'], materials: M, resources: [MDN] },
  { id: 'web-8', title: 'Build a Mini App', emoji: '🧮', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'web-m2', moduleTitle: L2, order: 8,
    concept: 'combining HTML + CSS + JS into an app', conceptExplain: 'A small app ties it together: a UI (HTML/CSS) and logic (JS) — like a calculator, quiz or unit converter.',
    objectives: ['Plan a small app\'s UI and logic', 'Wire inputs/buttons to JS', 'Show results on the page'],
    steps: ['Pick an app (calculator/quiz/converter).', 'Build the HTML/CSS UI.', 'Write the JS logic.', 'Connect inputs → logic → output.'],
    challenge: 'Build a working tip calculator or 5-question quiz with a score.', skills: ['App Building', 'Integration', 'JS'], materials: M, resources: [MDN, FCC] },
  // Level III
  { id: 'web-9', title: 'Forms & Input Validation', emoji: '📝', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 9,
    concept: 'HTML forms and validating input', conceptExplain: 'Forms collect user input. You read values in JS and validate them (not empty, valid email) before using them.',
    objectives: ['Build a form with inputs', 'Read values in JS', 'Validate input and show a message'],
    steps: ['Create a form with text/email inputs.', 'On submit, read the values.', 'Validate (required, format).', 'Show a success/error message.'],
    challenge: 'Build a contact form that validates a name and email and confirms on success.', skills: ['Forms', 'Validation', 'UX'], materials: M, resources: [MDN] },
  { id: 'web-10', title: 'Git & Publish with GitHub Pages', emoji: '🚀', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 10,
    concept: 'version control and free hosting', conceptExplain: 'Git tracks changes to your code; GitHub stores it; GitHub Pages hosts a static site for free — so your site goes live on the internet at $0.',
    objectives: ['Put a project in a GitHub repo', 'Understand basic commit/push', 'Publish with GitHub Pages'],
    steps: ['Create a GitHub repo and add your files.', 'Commit and push your site.', 'Enable GitHub Pages in settings.', 'Visit your live URL.'],
    challenge: 'Publish your site live on GitHub Pages and share the link.', skills: ['Git', 'GitHub Pages', 'Deployment'], materials: M, resources: [MDN] },
  { id: 'web-11', title: 'Capstone: Build & Ship a Multi-Page Site', emoji: '🏁', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'web-m3', moduleTitle: L3, order: 11,
    concept: 'a complete, responsive, interactive website', conceptExplain: 'Students plan and build a real multi-page, responsive site with at least one interactive JS feature, then publish it and gather feedback.',
    objectives: ['Plan and build a multi-page responsive site', 'Add an interactive JS feature', 'Publish it and iterate'],
    steps: ['Plan pages and content.', 'Build responsive HTML/CSS.', 'Add a JS feature (form, gallery, quiz).', 'Publish to GitHub Pages and refine.'],
    challenge: 'Ship a 3-page portfolio/club site with one interactive feature, live online.', skills: ['Web Dev', 'Project', 'Shipping'], materials: M, resources: [MDN, FCC] },
];

export const WEBDEV_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const WEBDEV_COURSE: Course = {
  id: P.courseId, slug: 'build-websites', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '13-15', level: 'Beginner',
  description: 'Build real websites with the languages of the web. Level I: HTML structure and CSS styling/layout (box model, flexbox, responsive). Level II: JavaScript — variables, the DOM, events, logic and a mini app. Level III: forms & validation, Git + free GitHub Pages hosting, and a ship-it capstone. 100% browser-based and $0.',
  objectives: ['Structure pages with HTML and style them with CSS', 'Lay out responsive pages with flexbox and media queries', 'Add interactivity with JavaScript and the DOM', 'Use Git and publish for free with GitHub Pages', 'Build and ship a complete multi-page site'],
  duration: '11 lessons × 45–60 minutes', totalHours: 11, lessonCount: 11, prerequisites: [],
  skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git / GitHub Pages'],
  modules: [
    { id: 'web-m1', title: L1, order: 1, description: 'HTML structure and CSS styling, layout (box model, flexbox) and responsive multi-page sites.', lessons: C.filter(c => c.moduleId === 'web-m1').map(kitSummary) },
    { id: 'web-m2', title: L2, order: 2, description: 'JavaScript: variables & functions, the DOM & events, logic/loops/arrays, and a mini app.', lessons: C.filter(c => c.moduleId === 'web-m2').map(kitSummary) },
    { id: 'web-m3', title: L3, order: 3, description: 'Forms & validation, Git + GitHub Pages hosting, and a ship-a-real-site capstone.', lessons: C.filter(c => c.moduleId === 'web-m3').map(kitSummary) },
  ],
};
