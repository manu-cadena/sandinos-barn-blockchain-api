# Sandinos Barn Donation Transparency Backend

This project is a learning-focused backend system designed to implement a transparent donation tracking blockchain. It is written in **TypeScript** and uses **Node.js** and **Express**.

The goal is to gradually build a simplified blockchain API that simulates how donations can be tracked with full transparency. It follows the **MVC pattern** and uses **TDD** (Test-Driven Development) with **Vitest**.

## Tech Stack

- TypeScript
- Node.js
- Express
- Vitest (TDD)
- ES Modules
- File-based storage (JSON)
- Logging to a file

## Features

- Basic blockchain functionality (Block, Blockchain)
- File-based persistence
- Transparent donation entries
- Logging mechanism

## Structure

```bash
src/
├── controllers/    # Handle API logic
├── models/         # Blockchain classes
├── routes/         # Express routes
├── utilities/      # Helpers (e.g. logger, config)
├── logs/           # Log files
├── app.ts          # Express config
└── server.ts       # App start point
```
