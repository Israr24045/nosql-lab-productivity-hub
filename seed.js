// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  // await db.collection('users').deleteMany({});
  // await db.collection('projects').deleteMany({});
  // await db.collection('tasks').deleteMany({});
  // await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  // Insert users
  const alice = await db.collection('users').insertOne({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    passwordHash: await bcrypt.hash('password123', 10),
    createdAt: new Date()
  });
  const aliceId = alice.insertedId;

  const bob = await db.collection('users').insertOne({
    name: 'Bob Smith',
    email: 'bob@example.com',
    passwordHash: await bcrypt.hash('password123', 10),
    createdAt: new Date()
  });
  const bobId = bob.insertedId;

  // Insert projects
  const project1 = await db.collection('projects').insertOne({
    ownerId: aliceId,
    name: 'Web Development Project',
    description: 'Building a responsive website',
    archived: false,
    createdAt: new Date()
  });
  const project1Id = project1.insertedId;

  const project2 = await db.collection('projects').insertOne({
    ownerId: aliceId,
    name: 'Mobile App',
    description: 'Developing a cross-platform mobile application',
    archived: false,
    createdAt: new Date()
  });
  const project2Id = project2.insertedId;

  const project3 = await db.collection('projects').insertOne({
    ownerId: bobId,
    name: 'Data Analysis',
    description: 'Analyzing sales data for insights',
    archived: false,
    createdAt: new Date()
  });
  const project3Id = project3.insertedId;

  const project4 = await db.collection('projects').insertOne({
    ownerId: bobId,
    name: 'Marketing Campaign',
    description: 'Planning and executing a new marketing campaign',
    archived: false,
    createdAt: new Date()
  });
  const project4Id = project4.insertedId;

  // Insert tasks (20 tasks)
  const tasks = [
    // Alice's tasks for project1 (5 tasks)
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Design homepage layout',
      status: 'done',
      priority: 2,
      tags: ['design', 'frontend'],
      subtasks: [
        { title: 'Sketch wireframes', done: true },
        { title: 'Create mockups', done: true }
      ],
      description: 'Create an attractive homepage design',
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Implement responsive CSS',
      status: 'in-progress',
      priority: 3,
      tags: ['css', 'responsive'],
      subtasks: [
        { title: 'Mobile styles', done: true },
        { title: 'Tablet styles', done: false },
        { title: 'Desktop styles', done: false }
      ],
      dueDate: new Date('2026-05-01'),
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Add JavaScript functionality',
      status: 'todo',
      priority: 4,
      tags: ['javascript', 'interactivity'],
      subtasks: [],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Test cross-browser compatibility',
      status: 'todo',
      priority: 1,
      tags: ['testing', 'browsers'],
      subtasks: [
        { title: 'Chrome', done: false },
        { title: 'Firefox', done: false },
        { title: 'Safari', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Deploy to production',
      status: 'todo',
      priority: 5,
      tags: ['deployment'],
      subtasks: [],
      createdAt: new Date()
    },
    // Alice's tasks for project2 (5 tasks)
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'Set up React Native project',
      status: 'done',
      priority: 3,
      tags: ['react-native', 'setup'],
      subtasks: [
        { title: 'Install dependencies', done: true },
        { title: 'Configure environment', done: true }
      ],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'Create login screen',
      status: 'in-progress',
      priority: 4,
      tags: ['ui', 'authentication'],
      subtasks: [
        { title: 'Design UI', done: true },
        { title: 'Implement form', done: false }
      ],
      dueDate: new Date('2026-04-30'),
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'Integrate API calls',
      status: 'todo',
      priority: 2,
      tags: ['api', 'backend'],
      subtasks: [],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'Add push notifications',
      status: 'todo',
      priority: 3,
      tags: ['notifications', 'features'],
      subtasks: [
        { title: 'Configure Firebase', done: false },
        { title: 'Implement notification logic', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'Prepare for app store submission',
      status: 'todo',
      priority: 1,
      tags: ['deployment', 'app-store'],
      subtasks: [],
      createdAt: new Date()
    },
    // Bob's tasks for project3 (5 tasks)
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Collect sales data',
      status: 'done',
      priority: 4,
      tags: ['data-collection', 'sales'],
      subtasks: [
        { title: 'Export from CRM', done: true },
        { title: 'Clean data', done: true }
      ],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Perform statistical analysis',
      status: 'in-progress',
      priority: 3,
      tags: ['statistics', 'analysis'],
      subtasks: [
        { title: 'Calculate averages', done: true },
        { title: 'Identify trends', done: false }
      ],
      dueDate: new Date('2026-05-05'),
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Create visualizations',
      status: 'todo',
      priority: 2,
      tags: ['visualization', 'charts'],
      subtasks: [],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Write report',
      status: 'todo',
      priority: 5,
      tags: ['reporting', 'documentation'],
      subtasks: [
        { title: 'Outline findings', done: false },
        { title: 'Draft conclusions', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Present results',
      status: 'todo',
      priority: 1,
      tags: ['presentation', 'stakeholders'],
      subtasks: [],
      createdAt: new Date()
    },
    // Bob's tasks for project4 (5 tasks)
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Define campaign goals',
      status: 'done',
      priority: 5,
      tags: ['strategy', 'goals'],
      subtasks: [
        { title: 'Identify target audience', done: true },
        { title: 'Set KPIs', done: true }
      ],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Create content calendar',
      status: 'in-progress',
      priority: 3,
      tags: ['content', 'planning'],
      subtasks: [
        { title: 'Brainstorm ideas', done: true },
        { title: 'Schedule posts', done: false }
      ],
      dueDate: new Date('2026-04-28'),
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Design social media graphics',
      status: 'todo',
      priority: 2,
      tags: ['design', 'social-media'],
      subtasks: [],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Set up tracking and analytics',
      status: 'todo',
      priority: 4,
      tags: ['analytics', 'tracking'],
      subtasks: [
        { title: 'Configure Google Analytics', done: false },
        { title: 'Set up conversion tracking', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Launch campaign',
      status: 'todo',
      priority: 1,
      tags: ['launch', 'execution'],
      subtasks: [],
      createdAt: new Date()
    }
  ];

  await db.collection('tasks').insertMany(tasks);

  // Insert notes (10 notes)
  const notes = [
    // Alice's notes (5 notes)
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Homepage Design Ideas',
      body: 'Brainstorming ideas for the homepage: hero section with call-to-action, testimonials, feature highlights.',
      tags: ['design', 'ideas'],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      title: 'Meeting Notes - Client Call',
      body: 'Discussed project timeline, budget constraints, and feature priorities. Follow up next week.',
      tags: ['meeting', 'client'],
      pinned: true,
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project2Id,
      title: 'API Endpoints',
      body: 'List of required API endpoints: /login, /register, /tasks, /projects.',
      tags: ['api', 'backend'],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      title: 'Personal Goals',
      body: 'Complete React Native certification, learn TypeScript, contribute to open source.',
      tags: ['goals', 'personal'],
      createdAt: new Date()
    },
    {
      ownerId: aliceId,
      projectId: project1Id,
      title: 'Color Scheme',
      body: 'Primary: #3B82F6, Secondary: #10B981, Accent: #F59E0B',
      tags: ['design', 'colors'],
      createdAt: new Date()
    },
    // Bob's notes (5 notes)
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Data Sources',
      body: 'Sales data from CRM, website analytics from Google Analytics, customer feedback from surveys.',
      tags: ['data', 'sources'],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      title: 'Book Recommendations',
      body: 'Books to read: "Storytelling with Data", "Lean Analytics", "The Lean Startup".',
      tags: ['books', 'learning'],
      pinned: true,
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project4Id,
      title: 'Campaign Strategy',
      body: 'Focus on social media ads targeting 25-35 year olds, email marketing to existing customers.',
      tags: ['strategy', 'marketing'],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      title: 'Weekly Review',
      body: 'Reflect on accomplishments and plan for next week. Track progress on key projects.',
      tags: ['reflection', 'productivity'],
      createdAt: new Date()
    },
    {
      ownerId: bobId,
      projectId: project3Id,
      title: 'Analysis Tools',
      body: 'Using Python with pandas for data manipulation, matplotlib for visualizations.',
      tags: ['tools', 'python'],
      createdAt: new Date()
    }
  ];

  await db.collection('notes').insertMany(notes);

  console.log('Seeding completed successfully');
  process.exit(0);
})();
