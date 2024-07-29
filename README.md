# Verse

This repository is a monorepo managed with Nx containing projects built with Next.js and NestJS.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Running the Projects](#running-the-projects)
- [Building the Projects](#building-the-projects)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Linting](#linting)
- [Using Nx](#using-nx)
- [License](#license)

## Getting Started

To get started with this monorepo, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/System-Garcia/verse.git
    cd verse
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Make sure you have Docker installed and running on your machine for database support.

4. For each application, copy the `.env.template` file to `.env` and fill in the necessary environment variables:

    For the frontend (Next.js) application:
    ```bash
    cp apps/frontend/.env.template apps/frontend/.env
    ```

    For the backend (NestJS) application:
    ```bash
    cp apps/backend/.env.template apps/backend/.env
    ```

5. Start the Docker containers for the database:
    ```bash
    npm run start:docker
    ```

Now you are ready to run the projects.

## Project Structure

This repository contains the following projects:

- **apps/frontend**: A Next.js application.
- **apps/backend**: A NestJS application.

## Available Scripts

In the root directory, you can run the following scripts:

- `npm start`: Starts the Next.js application in development mode.
- `npm run start:next`: Starts the Next.js application in development mode.
- `npm run start:nest`: Starts the NestJS application in development mode.
- `npm run build`: Builds both the Next.js and NestJS applications.
- `npm run build:next`: Builds the Next.js application.
- `npm run build:nest`: Builds the NestJS application.
- `npm run start:docker`: Starts the Docker containers for the backend.
- `npm run stop:docker`: Stops the Docker containers for the backend.
- `npm run test`: Runs tests for both the Next.js and NestJS applications.
- `npm run test:next`: Runs tests for the Next.js application.
- `npm run test:nest`: Runs tests for the NestJS application.
- `npm run lint`: Lints both the Next.js and NestJS applications.
- `npm run lint:next`: Lints the Next.js application.
- `npm run lint:nest`: Lints the NestJS application.

## Running the Projects

To run the Next.js application:

```bash
npm start
```

To run the NestJS application:

```bash
npm run start:nest
```

## Building the projects

To build both the Next.js and NestJS application:

```bash
npm run build
```

To build Next.js application:
```bash
npm run build:next
```

To build NestJS application:
```bash
npm run build:nest
```

## Docker Setup

This monorepo uses Docker for database managment. To start the database:

1. Make sure Docker is installed and running.
2. Run the comman: ```npm run start:docker```

To stop docker containers: ```npm run stop:docker```

## Testing

To run tests for both the Next.js and NestJS applications:
```bash
npm run test
```

To run tests for the Next.js application:
```bash
npm run test:next
```

To run tests for the NestJS application:
```bash
npm run test:nest
```

## Linting

To lint both the Next.js and NestJS applications:
```bash
npm run lint
```

To lint the Next.js application:
```bash
npm run lint:next
```

To lint the NestJS application:
```bash
npm run lint:nest
```

## Using Nx

### Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

### Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

### Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.