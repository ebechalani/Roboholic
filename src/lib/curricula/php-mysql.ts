import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty, AgeGroupId } from '@/types';

// ════════════════════════════════════════════════════════════════
//  PHP / MySQL — "Dynamic Websites with PHP & MySQL" (Grade 12, 2023)
//  Converted from the academy's real Grade-12 workbook (zero1.education
//  / LINFOPOURTOUS): Chapter 2 "Interactive Websites with PHP" (5 lessons)
//  and Chapter 3 "Managing Databases with MySQL" (10 lessons, incl. the
//  School Management System guided project). The actual workbook pages
//  are rendered as each lesson's deck; objectives/steps are transcribed.
//  Runs $0 on a local XAMPP stack (Apache + MySQL + phpMyAdmin).
// ════════════════════════════════════════════════════════════════

const M1 = 'Level I · Interactive Websites with PHP';
const M2 = 'Level II · Managing Databases with MySQL';
const M3 = 'Level III · PHP + MySQL Integration & Project';

interface PM {
  id: string; title: string; emoji: string; pages: number; difficulty: Difficulty;
  moduleId: string; moduleTitle: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; order: number;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
}

function gallery(slug: string, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 1; i <= pages; i++) a.push({ src: `/lessons/${slug}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Workbook page ${i}` });
  return a;
}

const WORKBOOK = { id: 'g12-book', title: 'Grade 12 Workbook — PHP & MySQL chapters (PDF)', type: 'pdf' as const, audience: 'both' as const, url: 'https://drive.google.com/drive/folders/roboholic-g12', description: 'The official Grade-12 (2023) workbook pages for this lesson' };
const W3_PHP = { id: 'w3-php', title: 'W3Schools PHP (free reference)', type: 'link' as const, audience: 'both' as const, url: 'https://www.w3schools.com/php/', description: 'PHP syntax & functions reference' };
const W3_SQL = { id: 'w3-sql', title: 'W3Schools SQL (free reference)', type: 'link' as const, audience: 'both' as const, url: 'https://www.w3schools.com/sql/', description: 'SQL syntax reference' };

function makePM(c: PM): LessonDetail {
  const sqlLesson = c.moduleId !== 'g12-m1';
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        'SETUP ($0): install XAMPP (free) on each computer — it turns the machine into a local web server with Apache + MySQL. Start Apache' + (sqlLesson ? ' and MySQL, and open phpMyAdmin (Admin button) to manage databases.' : ' for PHP. Write code in Notepad++ and save into the XAMPP "htdocs" folder.'),
        'This is the academy\'s official Grade-12 workbook — the lesson pages are shown below. Work the example yourself first; the full chapter PDF is in Resources.',
        'No paid hosting is needed for learning. Prerequisite: HTML basics.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Lesson Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Work through the workbook pages below with the class, typing each code example live.',
        'CREATE: Students type and run the code (htdocs → localhost), and answer the workbook questions.',
        'REVIEW: Check the objectives and do the workbook challenge/project.',
      ],
      images: gallery(c.id, c.pages),
    },
    {
      type: 'activity', title: `Do It: ${c.title}`, emoji: '🛠️',
      content: ['Follow the workbook pages and these steps:', ...c.steps],
      studentContent: [`🎯 ${c.title}`, ...c.steps.map(s => '👉 ' + s)],
    },
    {
      type: 'challenge', title: 'Project / Challenge', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student ran the code on the local server and completed the workbook tasks.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        sqlLesson ? 'Remind students: always use a WHERE clause with UPDATE/DELETE, and validate/sanitise form input to prevent SQL injection.' : 'Common gotcha: PHP statements end with a semicolon; strings are joined with the "." operator; the file must be in htdocs and opened via localhost (not double-clicked).',
        'SOURCE: official Grade-12 (2023) workbook — the rendered pages are the primary material.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'php-mysql', programSlug: 'php-mysql', programTitle: 'PHP / MySQL', programColor: '#4F46E5',
    courseId: 'php-mysql-1', courseTitle: 'Dynamic Websites with PHP & MySQL (Grade 12)',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: '13-15' as AgeGroupId, level: c.level, duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'Computer with XAMPP (Apache + MySQL) — free', quantity: '1 per student' },
      { item: 'Notepad++ (or any code editor)', quantity: '1 per student' },
      { item: 'Web browser', quantity: '1 per student' },
    ],
    objectives: c.objectives,
    assessmentChecklist: c.objectives,
    sections,
    heroImage: `/lessons/${c.id}/p-01.png`,
    resources: [WORKBOOK, ...(sqlLesson ? [W3_SQL, W3_PHP] : [W3_PHP])],
  };
}

const CONFIGS: PM[] = [
  // ─── Chapter 2 · PHP ───
  {
    id: 'g12-php-1', title: 'PHP Basics: Setup & First Script', emoji: '🐘', pages: 2, difficulty: 2, moduleId: 'g12-m1', moduleTitle: M1, level: 'Beginner', order: 1,
    concept: 'PHP and running a first server-side script', conceptExplain: 'PHP (Hypertext Preprocessor) is a server-side language that creates dynamic web pages. XAMPP turns the computer into a local web server so you can run PHP. A script lives in <?php … ?> and echo prints to the page.',
    objectives: ['Explain static vs dynamic web pages', 'Set up XAMPP and start Apache', 'Write and run a simple PHP script (echo, variables, concatenation)'],
    steps: ['Install XAMPP and start Apache.', 'In Notepad++ write <?php echo "Welcome back to PHP!"; ?> and save as welcome.php in htdocs.', 'Open localhost/welcome.php in the browser.', 'Add variables ($name, $age) and echo them joined with the "." operator.'],
    challenge: 'Add a $hobby variable and include it in the echo (e.g. "…and my hobby is reading books."), then change all values to your own info.',
    skills: ['PHP', 'XAMPP', 'echo & variables'],
  },
  {
    id: 'g12-php-2', title: 'Variables & Data Types', emoji: '🔣', pages: 2, difficulty: 2, moduleId: 'g12-m1', moduleTitle: M1, level: 'Beginner', order: 2,
    concept: 'PHP variables, data types and arithmetic', conceptExplain: 'A PHP variable starts with $ and stores data. PHP data types include String, Integer, Float, Boolean and Array. gettype() reveals a variable\'s type, and arithmetic operators (+ − * / %) compute values.',
    objectives: ['Declare variables and identify their data type', 'Use String, Integer, Float, Boolean and Array types', 'Use gettype() and arithmetic operators (incl. modulus %)'],
    steps: ['Create variables of each data type.', 'Use gettype($x) to print each type.', 'Compute $sum/$diff/$product/$quotient from two numbers.', 'Use % to find a remainder.'],
    challenge: 'Write a PHP script that calculates the year you turn (year 2050), your height in inches (1 m = 39.37 in), and prints the sentence from the workbook with your details.',
    skills: ['Variables', 'Data Types', 'Operators'],
  },
  {
    id: 'g12-php-3', title: 'Conditions in PHP', emoji: '🔀', pages: 2, difficulty: 2, moduleId: 'g12-m1', moduleTitle: M1, level: 'Beginner', order: 3,
    concept: 'conditional statements and comparison operators', conceptExplain: 'Conditional statements let code make decisions. PHP uses if, elseif, else and switch, with comparison operators (==, ===, != / <>, !==, >, <, >=, <=) to compare values.',
    objectives: ['Use comparison operators correctly', 'Write if / else / elseif statements', 'Understand the switch statement'],
    steps: ['Write an if that prints "You passed!" when $grade >= 10.', 'Add an else for the fail case.', 'Add elseif for multiple conditions (e.g. morning/day/night by time).', 'Note the difference between == and ===.'],
    challenge: 'Write a script that says whether a person can drive (legal age 18) and, if not, how many years are left; and a script that maps a month number (1–12) to its season.',
    skills: ['Conditionals', 'Comparison Operators', 'switch'],
  },
  {
    id: 'g12-php-4', title: 'HTML Forms with PHP', emoji: '📝', pages: 2, difficulty: 3, moduleId: 'g12-m1', moduleTitle: M1, level: 'Intermediate', order: 4,
    concept: 'collecting and processing form data', conceptExplain: 'HTML forms collect user input. With method="post" and an action pointing to a PHP file, PHP reads the values from $_POST and responds — the basis of every interactive site. Input types include text, password, email, number, date, checkbox, submit and reset.',
    objectives: ['Build an HTML form with action and method="post"', 'Read submitted values with $_POST in PHP', 'Use the right input types and the name attribute'],
    steps: ['Create an HTML form (Name, Email) posting to process.php.', 'Add a submit <input>.', 'In process.php read $_POST["name"]/$_POST["email"] and echo them.', 'Save both files in htdocs and test via localhost.'],
    challenge: 'Create contact.html (name, email, phone, age, message) and process.php that thanks the user and displays everything they submitted.',
    skills: ['HTML Forms', '$_POST', 'Input Types'],
  },
  {
    id: 'g12-php-5', title: 'PHP Knowledge Check', emoji: '🧠', pages: 1, difficulty: 2, moduleId: 'g12-m1', moduleTitle: M1, level: 'Beginner', order: 5,
    concept: 'reviewing the PHP chapter', conceptExplain: 'A review lesson: true/false, fill-in-the-blank and multiple-choice questions covering PHP basics, variables, operators, conditionals and forms.',
    objectives: ['Recall PHP key facts (server-side, $ variables, echo, $_POST)', 'Distinguish == vs === and the post method', 'Self-assess understanding of the PHP chapter'],
    steps: ['Complete the True/False questions.', 'Fill in the blanks (mixed, echo, case, include, HTML).', 'Answer the multiple-choice questions.', 'Review any topic you missed.'],
    challenge: 'Score yourself, then re-explain any wrong answer in your own words to a partner.',
    skills: ['Review', 'Assessment', 'PHP'],
  },
  // ─── Chapter 3 · MySQL basics ───
  {
    id: 'g12-sql-1', title: 'Databases & MySQL Structure', emoji: '🗄️', pages: 2, difficulty: 3, moduleId: 'g12-m2', moduleTitle: M2, level: 'Intermediate', order: 6,
    concept: 'what MySQL is and how a database is structured', conceptExplain: 'MySQL is a database management system that uses SQL to store, retrieve and manage data. Offline (XAMPP) databases run locally; phpMyAdmin manages them. A database holds tables; each table has rows (records) and columns, and each column has a data type (INT, TEXT, VARCHAR, DATE, FLOAT).',
    objectives: ['Explain what MySQL and phpMyAdmin are', 'Describe the structure of a database (tables, rows, columns)', 'Choose appropriate MySQL data types'],
    steps: ['Start Apache + MySQL in XAMPP; open phpMyAdmin (Admin).', 'Examine the example "students" table (rows = records, columns = fields).', 'Match data types to data: INT, VARCHAR, TEXT, DATE, FLOAT.', 'Discuss online vs offline databases.'],
    challenge: 'Design (on paper) a table for a club: list its columns and the right data type for each.',
    skills: ['MySQL', 'Database Structure', 'Data Types'],
  },
  {
    id: 'g12-sql-2', title: 'Create a Database (phpMyAdmin & SQL)', emoji: '🏗️', pages: 2, difficulty: 3, moduleId: 'g12-m2', moduleTitle: M2, level: 'Intermediate', order: 7,
    concept: 'creating databases and tables two ways', conceptExplain: 'You can create a database and tables visually in phpMyAdmin, or with SQL commands (CREATE DATABASE, CREATE TABLE). Both produce the same result — phpMyAdmin is point-and-click; SQL is typed and repeatable.',
    objectives: ['Create a database and table manually in phpMyAdmin', 'Create a database and table using SQL', 'Define columns with name, type and size'],
    steps: ['In phpMyAdmin click New → create database "school".', 'Create a table "students" with columns Name (VARCHAR) and Age (INT).', 'Repeat using SQL: CREATE DATABASE school; CREATE TABLE students (Name VARCHAR(20), Age INT);', 'Confirm the empty table exists.'],
    challenge: 'Create a "Library" database: a Books table (BookID, Title, Author, Genre, PublicationYear) manually, and a Members table (MemberID, FirstName, LastName, MembershipDate) using SQL.',
    skills: ['phpMyAdmin', 'CREATE TABLE', 'SQL'],
  },
  {
    id: 'g12-sql-3', title: 'Unique IDs, Modify Tables & Insert Records', emoji: '🔑', pages: 2, difficulty: 3, moduleId: 'g12-m2', moduleTitle: M2, level: 'Intermediate', order: 8,
    concept: 'primary-key IDs and inserting data', conceptExplain: 'An ID is a unique tag for each record (fast searches, linking tables, no mix-ups). You add an auto-incrementing ID primary key (visually or with ALTER TABLE), then insert records manually or with INSERT INTO.',
    objectives: ['Explain why unique IDs matter', 'Add an AUTO_INCREMENT PRIMARY KEY id column (manual & SQL)', 'Insert records manually and with INSERT INTO'],
    steps: ['Add an ID column at the start of "students" (INT, A_I, PRIMARY) — or run ALTER TABLE students ADD ID INT AUTO_INCREMENT PRIMARY KEY;', 'Use the Insert tab to add a student (ID auto-fills).', 'Insert with SQL: INSERT INTO students (Name, Age) VALUES ("Jason", 18);', 'Verify the records.'],
    challenge: 'Add ID columns to your Library tables, then INSERT 5 books and at least 5 members with SQL.',
    skills: ['Primary Key', 'ALTER TABLE', 'INSERT INTO'],
  },
  {
    id: 'g12-sql-4', title: 'Retrieve, Filter & Sort Data', emoji: '🔎', pages: 2, difficulty: 3, moduleId: 'g12-m2', moduleTitle: M2, level: 'Intermediate', order: 9,
    concept: 'querying data with SELECT, WHERE and ORDER BY', conceptExplain: 'SELECT retrieves data: "SELECT *" gets all columns, or list specific columns. WHERE filters rows by a condition; ORDER BY sorts the results ascending (ASC) or descending (DESC).',
    objectives: ['Retrieve data with SELECT (all and specific columns)', 'Filter rows with WHERE', 'Sort results with ORDER BY ASC/DESC'],
    steps: ['Run SELECT * FROM students; and examine all columns.', 'Run SELECT Name, Age FROM students;', 'Filter: SELECT Name FROM students WHERE Age > 17;', 'Sort: SELECT * FROM students ORDER BY Age ASC;'],
    challenge: 'On the Library DB: retrieve all books, just the titles, books published after 2000, members who joined after a date, and member names in alphabetical order.',
    skills: ['SELECT', 'WHERE', 'ORDER BY'],
  },
  {
    id: 'g12-sql-5', title: 'SQL: Update & Delete Records', emoji: '✏️', pages: 2, difficulty: 3, moduleId: 'g12-m2', moduleTitle: M2, level: 'Intermediate', order: 10,
    concept: 'modifying and removing data safely', conceptExplain: 'UPDATE … SET … WHERE changes existing data (one or many columns/records); DELETE … WHERE removes rows. The WHERE clause is critical — without it, UPDATE/DELETE affects EVERY row, and changes are hard to reverse.',
    objectives: ['Update one or many columns/records with UPDATE … SET … WHERE', 'Delete records with DELETE … WHERE', 'Apply data-integrity caution (always use WHERE)'],
    steps: ['UPDATE students SET Name="Tom" WHERE ID=1;', 'Update multiple columns: SET Name="Tom", Age=20 WHERE ID=1;', 'Conditional update: SET Name="Ray", Age=21 WHERE Age < 18;', 'DELETE FROM students WHERE ID=3; (always with WHERE!).'],
    challenge: 'On the Library DB: update a book title, change the genre of several books at once, update a member who changed their last name, and delete a damaged book and a cancelled membership.',
    skills: ['UPDATE', 'DELETE', 'Data Integrity'],
  },
  // ─── Chapter 3 · PHP + MySQL integration & project ───
  {
    id: 'g12-sql-6', title: 'Connect PHP to MySQL (Form → Database)', emoji: '🔌', pages: 2, difficulty: 4, moduleId: 'g12-m3', moduleTitle: M3, level: 'Advanced', order: 11,
    concept: 'sending form data from PHP into MySQL', conceptExplain: 'To store form data, PHP connects to MySQL with mysqli_connect($host, $user, $pass, $db), then runs an INSERT query built from $_POST values. This is how registration forms save data for later.',
    objectives: ['Connect PHP to MySQL with mysqli_connect', 'Read form data and build an INSERT query', 'Run the query with mysqli_query and close with mysqli_close'],
    steps: ['Create student_form.php (Name, Age) posting to process.php.', 'Create db_connect.php with $host="localhost", $user="root", $pass="", $db="school" and mysqli_connect.', 'In process.php: include db_connect, read $_POST, $sql = "INSERT INTO students (name, age) VALUES (\'$name\', \'$age\')", run mysqli_query.', 'Submit the form and check the row appears in phpMyAdmin.'],
    challenge: 'Wire the Library project: connect to the Library DB and make a form that inserts a new book record.',
    skills: ['mysqli_connect', 'INSERT from form', 'mysqli_query'],
  },
  {
    id: 'g12-sql-7', title: 'Fetch Data from MySQL in PHP', emoji: '📤', pages: 2, difficulty: 4, moduleId: 'g12-m3', moduleTitle: M3, level: 'Advanced', order: 12,
    concept: 'reading database rows and displaying them', conceptExplain: 'To show stored data, PHP runs a SELECT with mysqli_query, checks mysqli_num_rows, then loops the result with while + mysqli_fetch_assoc, echoing each row — so the page always shows up-to-date data.',
    objectives: ['Run a SELECT query from PHP', 'Loop results with while + mysqli_fetch_assoc', 'Display the fetched records on the page'],
    steps: ['In process.php add $sql = "SELECT * FROM students"; $result = mysqli_query($conn, $sql);', 'If mysqli_num_rows > 0, while ($row = mysqli_fetch_assoc($result)) echo the Name and Age.', 'Else echo "No records found".', 'Include process.php at the top of student_form.php and view it.'],
    challenge: 'On the Library project: fetch and display all books and members in tables on index.php (extra: add a search bar).',
    skills: ['SELECT in PHP', 'while loop', 'mysqli_fetch_assoc'],
  },
  {
    id: 'g12-sql-8', title: 'PHP & MySQL Knowledge Check', emoji: '🧪', pages: 2, difficulty: 3, moduleId: 'g12-m3', moduleTitle: M3, level: 'Advanced', order: 13,
    concept: 'reviewing PHP + MySQL integration', conceptExplain: 'A review lesson: true/false, gap-fill, matching, multiple-choice and short-answer questions covering connecting PHP to MySQL, CRUD, $_POST vs $_GET, and SELECT/INSERT/UPDATE/DELETE.',
    objectives: ['Recall the PHP↔MySQL connection and CRUD commands', 'Distinguish SELECT/INSERT/UPDATE/DELETE and $_POST/$_GET', 'Write short SQL+PHP snippets from memory'],
    steps: ['Complete True/False and gap-fill.', 'Do the matching (INSERT INTO, SELECT, $_POST, mysqli_query).', 'Answer the MCQs.', 'Write the short-answer SQL+PHP snippets (e.g. update age WHERE ID=5).'],
    challenge: 'Build the mini app from the review: a form to add a student to the "students" table that also lists all students below the form.',
    skills: ['Review', 'CRUD', 'Assessment'],
  },
  {
    id: 'g12-sql-9', title: 'Guided Project: School Management System', emoji: '🏫', pages: 2, difficulty: 4, moduleId: 'g12-m3', moduleTitle: M3, level: 'Advanced', order: 14,
    concept: 'a full PHP + MySQL CRUD application', conceptExplain: 'The capstone: build a web app that manages students, teachers and classes — set up school_db with three tables, design forms, connect, insert, display, update, delete, and add search/filter. It ties together everything in the course.',
    objectives: ['Set up a multi-table database and connection', 'Implement full CRUD (add, display, update, delete) from forms', 'Add search/filter and reflect on the build'],
    steps: ['Part 1–3: create SchoolManagement folder (index.php, db_connect.php, process.php); make school_db with students, teachers, classes; connect.', 'Part 4–5: insert records from forms (validate/sanitise); display each table.', 'Part 6–7: add update & delete; add search to filter students by name/class.', 'Part 8–9: test, debug, and write the reflection questions.'],
    challenge: 'Complete the full School Management System with working add/edit/delete and a student search, then answer the reflection.',
    skills: ['Full-stack CRUD', 'Multi-table DB', 'Project'],
  },
  {
    id: 'g12-sql-10', title: 'MySQL Knowledge Check', emoji: '📊', pages: 1, difficulty: 3, moduleId: 'g12-m3', moduleTitle: M3, level: 'Advanced', order: 15,
    concept: 'reviewing the MySQL chapter', conceptExplain: 'A final review: true/false, gap-fill and multiple-choice covering database structure, creating databases, unique identifiers, CRUD, filtering/sorting, and PHP↔MySQL.',
    objectives: ['Recall MySQL structure and key commands', 'Identify SELECT/INSERT/UPDATE/DELETE uses', 'Self-assess the whole MySQL chapter'],
    steps: ['Complete the True/False questions.', 'Fill the gaps (unique identifier, INSERT, fetch function, connection feature).', 'Answer the multiple-choice questions.', 'Revisit any weak topic in the workbook.'],
    challenge: 'Write, from memory, the SQL to create a table, insert a row, select with a filter, update one record, and delete one record.',
    skills: ['Review', 'MySQL', 'Assessment'],
  },
];

export const PHP_LESSONS: LessonDetail[] = CONFIGS.map(makePM);

const sum = (c: PM) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const PHP_COURSE: Course = {
  id: 'php-mysql-1', slug: 'dynamic-websites-php-mysql', title: 'Dynamic Websites with PHP & MySQL (Grade 12)',
  programId: 'php-mysql', programSlug: 'php-mysql', ageGroup: '13-15', level: 'Intermediate',
  description: 'The academy\'s Grade-12 (2023) PHP & MySQL curriculum, converted from the official workbook. Level I — Interactive Websites with PHP: setup, variables & data types, conditions, and HTML forms. Level II — Managing Databases with MySQL: structure, creating databases (phpMyAdmin & SQL), unique IDs & inserting, retrieving/filtering/sorting, and updating/deleting. Level III — Integration & Project: connect PHP↔MySQL (form→DB), fetch & display data, and a full School Management System guided project. Runs $0 on a local XAMPP stack.',
  objectives: [
    'Write PHP: variables, data types, operators, conditionals and forms ($_POST)',
    'Build and manage MySQL databases in phpMyAdmin and with SQL',
    'Use full CRUD: SELECT, INSERT, UPDATE, DELETE (with WHERE/ORDER BY)',
    'Connect PHP to MySQL to store and fetch form data',
    'Build a complete School Management System web app',
  ],
  duration: '15 lessons × 45–60 minutes', totalHours: 15, lessonCount: 15,
  prerequisites: ['HTML basics (see the Web Dev course)'],
  skills: ['PHP', 'MySQL', 'SQL / CRUD', 'phpMyAdmin', 'Forms & $_POST', 'Full-stack Project'],
  modules: [
    { id: 'g12-m1', title: M1, order: 1, description: 'PHP setup & first script, variables & data types, conditions, HTML forms, and a knowledge check.', lessons: CONFIGS.filter(c => c.moduleId === 'g12-m1').map(sum) },
    { id: 'g12-m2', title: M2, order: 2, description: 'MySQL structure, creating databases (phpMyAdmin & SQL), unique IDs & inserting, retrieving/filtering/sorting, and updating/deleting.', lessons: CONFIGS.filter(c => c.moduleId === 'g12-m2').map(sum) },
    { id: 'g12-m3', title: M3, order: 3, description: 'Connect PHP to MySQL (form→DB), fetch & display data, knowledge checks, and the School Management System guided project.', lessons: CONFIGS.filter(c => c.moduleId === 'g12-m3').map(sum) },
  ],
};
