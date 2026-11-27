# NuxtoDo

A calm, Kanban-style task board built with Nuxt 3. Create boards, fill them with lists, and drag cards between lists. Cards hold rich-text notes.

## Features

- **Accounts:** email and password sign-up and sign-in (Auth.js credentials, JWT sessions).
- **Boards:** create, rename, re-cover and delete. Optional cover photo from Picsum; boards without a cover get a generated gradient.
- **Search:** filter boards instantly. Press `/` to focus the search box and `N` to create a new board.
- **Lists:** add lists inline, rename them, delete them, and drag them by their header to reorder.
- **Cards:** create and edit cards with a rich-text editor, and drag them within or between lists. Press `⌘/Ctrl + Enter` to save.
- **Safe deletes:** deleting a board, list or card asks for confirmation first. Deleting a board also deletes its lists and cards.
- **Light and dark mode**, a responsive layout from phone to desktop, and support for `prefers-reduced-motion` and `prefers-reduced-transparency`.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Nuxt 3](https://nuxt.com) (Vue 3, Nitro server) |
| UI | [Nuxt UI 2](https://ui.nuxt.com) (Tailwind CSS, Headless UI), themed in `app.config.ts` |
| Auth | [`@sidebase/nuxt-auth`](https://sidebase.io/nuxt-auth) + `next-auth` credentials provider |
| Data | MongoDB via Mongoose (`nuxt-server-utils` manages the connection) |
| Validation | Zod schemas shared by client forms and API handlers |
| Drag and drop | `vuedraggable` (SortableJS) |
| Rich text | `@vueup/vue-quill`, lazy-loaded |

## Project structure

```
├── app.vue               # Root: page outlet, confirm dialog, toasts, global styles
├── app.config.ts         # Design tokens for Nuxt UI (accent colour, radii, surfaces)
├── tailwind.config.ts    # System font stack + "azure" accent palette
├── error.vue             # 404 / error page
├── pages/
│   ├── index.vue         # Boards grid, search, create/edit modal
│   ├── [boardId].vue     # Board view: lists and cards
│   └── auth/             # signin.vue, signup.vue
├── components/
│   ├── Wrapper/          # Default (app shell + header), Auth (sign-in layout)
│   ├── Board/Card.vue    # Board tile
│   ├── List/             # Container (list row), Item (list column), Card (card tile)
│   ├── Form/             # Board, List, Card forms
│   ├── ConfirmDialog.vue # App-wide destructive-action dialog
│   ├── ImagePicker.vue   # Cover photo picker
│   ├── ModalHeader.vue
│   └── ColourSwitcher.vue
├── composables/          # useBoard, useList, useCard (mutations), useConfirm, toastError
├── schemas/              # Zod schemas (Board, List, Card, Signin, Signup)
├── plugins/quill.ts      # Registers the Quill editor as an async component
└── server/
    ├── api/              # REST handlers (see below)
    ├── middleware/       # Session check for /api/boards and /api/lists
    ├── models/           # Mongoose models: User, Board, List, Card
    └── utils/hash.ts     # bcrypt password hashing
```

## Prerequisites

- Node.js 18 or later, and npm
- A MongoDB instance, either local (`mongodb://localhost:27017/nuxtodo`) or hosted

## Getting started

```bash
npm install
cp test.env .env   # then fill in real values (see below)
npm run dev        # http://localhost:5173
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string |
| `AUTH_SECRET` | yes | Secret used to sign session JWTs. Use a long random string. |
| `AUTH_ORIGIN` | yes | Public origin of the app, e.g. `http://localhost:5173` in development |
| `PIXABAY_API_KEY` | no | Exposed in runtime config; not used by the current UI |

Never commit `.env`. It is already listed in `.gitignore`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR on port 5173 |
| `npm run build` | Production build into `.output/` |
| `npm run preview` | Serve the production build locally |
| `npm run generate` | Static generation (not useful here, because the app needs its API server) |

## API overview

Every route except the auth routes requires a session. Data is always scoped to the signed-in user.

| Method & path | Description |
| --- | --- |
| `POST /api/auth/signup` | Create an account |
| `/api/auth/*` | Auth.js sign-in, sign-out, session and CSRF routes |
| `GET /api/boards` | List the user's boards |
| `POST /api/boards` | Create a board `{ name, coverImage? }` |
| `GET /api/boards/:id` | Get a board with its lists populated |
| `PUT /api/boards/:id` | Update the name, cover, or list order (`lists: string[]`) |
| `DELETE /api/boards/:id` | Delete a board and its lists and cards |
| `POST /api/lists` | Create a list `{ name, board }` |
| `PUT /api/lists/:id` | Rename a list or set its card order (`cards: string[]`) |
| `DELETE /api/lists/:id` | Delete a list and its cards |
| `GET /api/lists/:id/cards` | Get a list's cards, in order |
| `POST /api/lists/:id/cards` | Create a card `{ title, description?, list }` |
| `PUT /api/lists/:id/cards/:cardId` | Update a card or move it to another list (`list`) |
| `DELETE /api/lists/:id/cards/:cardId` | Delete a card |

## Production

```bash
npm run build
node .output/server/index.mjs
```

Set the same environment variables on the host, with `AUTH_ORIGIN` set to the public URL. The output is a standard Nitro Node server, so it runs on any Node host. See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for platform presets.

## Design notes

- **Tokens:** the accent colour is `azure-500` (`#0071e3`), which meets WCAG AA contrast against white text. Grays use Tailwind `neutral`. Radii: `lg` for controls, `xl` for cards and menus, `2xl` for surfaces.
- **Type:** the system font stack (SF Pro on Apple devices, Segoe UI Variable on Windows). Headings use −0.02em tracking.
- **Materials:** the header, menus and list columns are translucent (`backdrop-blur`). Under `prefers-reduced-transparency` they become solid (see the `.glass` class in `app.vue`).
- **Motion:** buttons give press feedback on pointer-down, routes cross-fade, and drag and drop uses a short sort animation. All motion is cut under `prefers-reduced-motion`.
