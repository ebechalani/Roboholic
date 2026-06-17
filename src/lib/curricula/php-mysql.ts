import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// PHP / MySQL — server-side basics. NOTE: needs a PHP+MySQL environment.
// Kept $0 with a LOCAL stack (XAMPP) or free online sandboxes — no paid hosting required.
const P: KitProgram = { programId: 'php-mysql', programSlug: 'php-mysql', programTitle: 'PHP / MySQL', programColor: '#4F46E5', courseId: 'php-mysql-1', courseTitle: 'Dynamic Websites with PHP & MySQL' };
const L1 = 'Level I · PHP Basics', L2 = 'Level II · Databases with MySQL', L3 = 'Level III · Build a Data-Driven App';
const SETUP = 'SETUP/$0 NOTE: PHP+MySQL needs a server. Use a FREE local stack — XAMPP (Apache+PHP+MySQL) on the class computers — or a free online sandbox (e.g. an online PHP/MySQL playground). No paid hosting is required for learning. Prerequisite: students should know HTML basics.';
const M = [{ item: 'Computer with XAMPP (free) installed, or a free online PHP/MySQL sandbox', quantity: '1 per student' }];
const PHP_DOC = { id: 'php-doc', title: 'PHP Manual / W3Schools PHP (free)', type: 'link' as const, audience: 'both' as const, url: 'https://www.w3schools.com/php/', description: 'Free PHP reference & tutorials' };
const SQL_DOC = { id: 'sql-doc', title: 'W3Schools SQL (free)', type: 'link' as const, audience: 'both' as const, url: 'https://www.w3schools.com/sql/', description: 'Free SQL reference & tutorials' };

const C: KitLesson[] = [
  { id: 'php-1', title: 'Setup & Your First PHP Page', emoji: '🐘', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'php-m1', moduleTitle: L1, order: 1, safety: SETUP,
    concept: 'running PHP on a local server', conceptExplain: 'PHP is a server-side language: the server runs the code and sends HTML to the browser. With XAMPP you run a server on your own computer for free.',
    objectives: ['Start a local server (XAMPP) or open a sandbox', 'Write a .php file that outputs HTML', 'Use echo to print'],
    steps: ['Start Apache in XAMPP and put files in htdocs.', 'Create index.php.', 'Use <?php echo "Hello"; ?>.', 'Open http://localhost/index.php.'],
    code: ['<?php', 'echo "Hello from PHP!";', '?>'],
    challenge: 'Make a page that echoes today\'s date using PHP\'s date() function.', skills: ['PHP', 'Server Setup', 'echo'], materials: M, resources: [PHP_DOC] },
  { id: 'php-2', title: 'Variables, Logic & Loops', emoji: '🔣', difficulty: 3, ageGroup: '13-15', level: 'Beginner', moduleId: 'php-m1', moduleTitle: L1, order: 2,
    concept: 'PHP variables, conditionals and loops', conceptExplain: 'PHP variables start with $. It has if/else, for/while loops and arrays — used to build the HTML that gets sent to the browser.',
    objectives: ['Use variables and arithmetic', 'Use if/else and loops', 'Build HTML output from a loop'],
    steps: ['Make variables and do math.', 'Use if/else to choose output.', 'Loop to print a list.', 'Mix PHP into HTML.'],
    code: ['<?php for ($i=1; $i<=5; $i++) { echo "<li>Item $i</li>"; } ?>'],
    challenge: 'Print a multiplication table (1–10) as an HTML list with a loop.', skills: ['Variables', 'Loops', 'Logic'], materials: M, resources: [PHP_DOC] },
  { id: 'php-3', title: 'Forms & Handling Input', emoji: '📨', difficulty: 4, ageGroup: '13-15', level: 'Beginner', moduleId: 'php-m1', moduleTitle: L1, order: 3,
    concept: 'receiving form data with $_POST', conceptExplain: 'An HTML form sends data to a PHP script. PHP reads it from $_POST/$_GET, then responds — the basis of all interactive sites. Always validate/sanitise input.',
    objectives: ['Build an HTML form posting to PHP', 'Read values from $_POST', 'Validate and respond to input'],
    steps: ['Make a form with method="post".', 'In PHP read $_POST["name"].', 'Validate it isn\'t empty.', 'Echo a personalised response.'],
    code: ['<?php $name = $_POST["name"] ?? ""; if ($name) echo "Hi $name"; ?>'],
    challenge: 'Build a feedback form that greets the user and rejects empty submissions.', skills: ['Forms', '$_POST', 'Validation'], materials: M, resources: [PHP_DOC] },
  // Level II
  { id: 'php-4', title: 'Intro to Databases & SQL', emoji: '🗄️', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'php-m2', moduleTitle: L2, order: 4,
    concept: 'tables and basic SQL', conceptExplain: 'A database stores data in tables (rows & columns). SQL is the language to create tables and query them. phpMyAdmin (in XAMPP) gives a visual way to manage MySQL.',
    objectives: ['Create a database and table in phpMyAdmin', 'Understand rows, columns and keys', 'Write a basic SELECT'],
    steps: ['Open phpMyAdmin and create a database.', 'Create a table with columns (id, name, …).', 'Add a few rows.', 'Run SELECT * FROM table.'],
    code: ['CREATE TABLE students (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50));', 'SELECT * FROM students;'],
    challenge: 'Design a table for a club (members) with sensible columns and add 5 rows.', skills: ['Databases', 'SQL', 'Tables'], materials: M, resources: [SQL_DOC] },
  { id: 'php-5', title: 'CRUD: Insert, Select, Update, Delete', emoji: '✏️', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'php-m2', moduleTitle: L2, order: 5,
    concept: 'the four core database operations', conceptExplain: 'CRUD = Create, Read, Update, Delete — the operations behind every data app. In SQL: INSERT, SELECT, UPDATE, DELETE.',
    objectives: ['Write INSERT, SELECT, UPDATE, DELETE', 'Filter with WHERE', 'Order results'],
    steps: ['INSERT a new row.', 'SELECT with a WHERE filter.', 'UPDATE a row.', 'DELETE a row (carefully).'],
    code: ['INSERT INTO students (name) VALUES ("Sara");', 'UPDATE students SET name="Sam" WHERE id=1;'],
    challenge: 'Perform all four CRUD operations on your club table and verify each.', skills: ['CRUD', 'SQL', 'WHERE'], materials: M, resources: [SQL_DOC] },
  { id: 'php-6', title: 'Connect PHP to MySQL', emoji: '🔌', difficulty: 4, ageGroup: '13-15', level: 'Intermediate', moduleId: 'php-m2', moduleTitle: L2, order: 6,
    concept: 'querying the database from PHP (PDO)', conceptExplain: 'PHP connects to MySQL (using PDO) to run queries and show the results as HTML. Prepared statements keep it safe from SQL injection.',
    objectives: ['Connect to MySQL from PHP with PDO', 'Run a SELECT and loop the results', 'Use prepared statements for input'],
    steps: ['Create a PDO connection.', 'Query SELECT * and fetch rows.', 'Loop rows into an HTML table.', 'Use a prepared statement for any user input.'],
    code: ['$pdo = new PDO("mysql:host=localhost;dbname=club", "root", "");', '$rows = $pdo->query("SELECT * FROM students")->fetchAll();'],
    challenge: 'Show your members table as a styled HTML table pulled live from MySQL.', skills: ['PDO', 'Queries', 'Security'], materials: M, resources: [PHP_DOC, SQL_DOC] },
  // Level III
  { id: 'php-7', title: 'Build a CRUD App (Add & List)', emoji: '🧱', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'php-m3', moduleTitle: L3, order: 7,
    concept: 'a form that writes to the database', conceptExplain: 'Combine forms + PDO: a page where you add a record (form → INSERT) and see the updated list (SELECT) — a real data-driven feature.',
    objectives: ['Insert form data into MySQL', 'Display the live list', 'Use prepared statements'],
    steps: ['Build an add form.', 'On submit, INSERT via a prepared statement.', 'Re-query and show the list.', 'Test adding several records.'],
    challenge: 'Build a "guestbook" or "task list" where entries persist in the database.', skills: ['CRUD App', 'Forms + DB', 'PDO'], materials: M, resources: [PHP_DOC] },
  { id: 'php-8', title: 'Sessions & Simple Login', emoji: '🔐', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'php-m3', moduleTitle: L3, order: 8,
    concept: 'sessions and password handling', conceptExplain: 'Sessions remember a logged-in user across pages. Passwords must be hashed (password_hash / password_verify), never stored as plain text.',
    objectives: ['Use $_SESSION to keep a user logged in', 'Hash and verify a password', 'Protect a page behind login'],
    steps: ['Store users with hashed passwords.', 'On login, verify and set $_SESSION.', 'Protect a page (redirect if not logged in).', 'Add a logout that clears the session.'],
    code: ['$hash = password_hash($pw, PASSWORD_DEFAULT);', 'if (password_verify($pw, $hash)) { $_SESSION["user"] = $id; }'],
    challenge: 'Add a login so only signed-in users can add records to your app.', skills: ['Sessions', 'Auth', 'Security'], materials: M, resources: [PHP_DOC] },
  { id: 'php-9', title: 'Capstone: A Data-Driven Web App', emoji: '🚀', difficulty: 4, ageGroup: '13-15', level: 'Advanced', moduleId: 'php-m3', moduleTitle: L3, order: 9,
    concept: 'a complete PHP + MySQL application', conceptExplain: 'Students plan and build a small full app — a club directory, blog, or inventory — with full CRUD, a login, and clean HTML/CSS, running on the local stack.',
    objectives: ['Design the data model and pages', 'Implement full CRUD with login', 'Test and present the app'],
    steps: ['Plan the tables and pages.', 'Build CRUD with prepared statements.', 'Add login + sessions.', 'Style it and demo it.'],
    challenge: 'Ship a working app (e.g. club directory) with add/edit/delete and a login.', skills: ['Full-stack', 'Project', 'CRUD + Auth'], materials: M, resources: [PHP_DOC, SQL_DOC] },
];

export const PHP_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const PHP_COURSE: Course = {
  id: P.courseId, slug: 'dynamic-websites-php-mysql', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '13-15', level: 'Intermediate',
  description: 'Go beyond static pages to dynamic, data-driven websites with PHP and MySQL — run for FREE on a local stack (XAMPP). Level I: PHP basics, logic and forms. Level II: databases and SQL (CRUD) and connecting PHP to MySQL. Level III: a CRUD app, sessions & login, and a full data-driven capstone. (Server required — no paid hosting needed for learning.)',
  objectives: ['Run PHP on a free local server and output HTML', 'Use PHP variables, logic, loops and forms', 'Design databases and write SQL (CRUD)', 'Connect PHP to MySQL safely with PDO', 'Build a data-driven app with login'],
  duration: '9 lessons × 45–60 minutes', totalHours: 9, lessonCount: 9, prerequisites: ['HTML basics (see the Web Dev course)'],
  skills: ['PHP', 'MySQL', 'SQL / CRUD', 'PDO', 'Sessions & Auth'],
  modules: [
    { id: 'php-m1', title: L1, order: 1, description: 'Set up a free local server; PHP variables, logic, loops and form handling.', lessons: C.filter(c => c.moduleId === 'php-m1').map(kitSummary) },
    { id: 'php-m2', title: L2, order: 2, description: 'Databases & SQL (CRUD) and connecting PHP to MySQL with PDO.', lessons: C.filter(c => c.moduleId === 'php-m2').map(kitSummary) },
    { id: 'php-m3', title: L3, order: 3, description: 'A CRUD app, sessions & login, and a full data-driven capstone.', lessons: C.filter(c => c.moduleId === 'php-m3').map(kitSummary) },
  ],
};
