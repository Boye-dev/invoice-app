# Invoice App

This is a web application for managing invoices built with React and TypeScript. The app provides features such as creating, viewing, and managing invoices, with a modern UI built using Tailwind CSS.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Configuration](#configuration)
- [License](#license)

## Folder Structure

Here's an overview of the folder structure of the project:


## Folder Structure

### node_modules/
- This folder contains all the project’s dependencies installed by `npm` or `pnpm`. It is automatically generated and managed, so you don't typically edit files within it.

### public/
- Contains static assets like images, icons, and fonts. These files are served directly to the client without any processing.

### src/
- The main directory for your application’s source code.

#### api/
- Contains code related to API calls and interactions with external services. It includes functions to fetch, update, and delete data from APIs.

#### assets/
- Houses images, icons, and other static assets that are part of the application's UI.

#### components/
- Contains reusable UI components used throughout the application. Each component is typically organized in its own subfolder with its associated styles and tests.

#### constants/
- Stores constant values and configuration settings used across the application, helping to maintain consistency and reduce hardcoding.

#### contexts/
- Holds React context files that manage state and logic across different parts of the application. Useful for sharing data and functions among various components.

#### hooks/
- Contains custom React hooks that encapsulate reusable logic. These hooks simplify state management and side effects in components.

#### interfaces/
- Defines TypeScript interfaces and types used throughout the application, promoting type safety and code maintainability.

#### pages/
- Contains the main page components for different routes in the application. Each page typically corresponds to a route defined in the app’s router.

#### services/
- Provides various services like authentication, user management, and other business logic that are used by multiple parts of the application.

#### shared/
- Houses shared utilities, styles, and components that are used across different parts of the application to promote reuse and consistency.

#### utils/
- Contains utility functions that perform common tasks or calculations. These are used across different components and services to prevent code duplication.

#### App.tsx
- The root component of the application. It sets up the overall structure and routing of the app.

#### index.css
- Contains global CSS styles that are applied across the entire application.

#### main.tsx
- The entry point of the application, where the root component is rendered to the DOM.

#### vite-env.d.ts
- Provides type definitions for the Vite development environment.

## Configuration and Miscellaneous Files

### .env
- Contains environment variables that are used throughout the application. This file is ignored by version control systems to keep sensitive information secure.

### .eslintrc.cjs
- Configuration file for ESLint, which is used to maintain code quality and consistency across the project.

### .gitignore
- Specifies files and folders that should be ignored by Git, such as `node_modules/` and `.env`.

### index.html
- The main HTML file that serves as the entry point for the application.

### package.json
- Lists the project’s dependencies, scripts, and other metadata. It is used by `npm` or `pnpm` to manage the project.

### pnpm-lock.yaml
- A lockfile used by `pnpm` to ensure consistent dependency versions across different environments.

### postcss.config.js
- Configuration file for PostCSS, which is used for processing CSS files.

### README.md
- Provides an overview of the project, its setup, and instructions for running and deploying the app.

### tailwind.config.js
- Configuration file for Tailwind CSS, which is used for styling the application.

### tsconfig.app.json, tsconfig.json, tsconfig.node.json
- TypeScript configuration files that specify compiler options and project settings for the application, development environment, and Node.js environment, respectively.

### vercel.json
- Configuration file for deploying the application to Vercel, specifying build and deployment settings.

### vite.config.ts
- Configuration file for Vite, the build tool used for the project. It specifies settings like plugins, server options, and build options.


## Features

- **User Authentication**: Secure login and registration using JWT.
- **Invoice Management**: Create, update, and delete invoices.
- **File Upload**: Upload business logos and profile pictures.
- **Form Handling**: Manage forms and validations using React Hook Form and Zod.
- **API Integration**: Seamless integration with backend services using Axios.
- **Notifications**: Real-time notifications using React Toastify.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/invoicing-app.git
   ```
   
2. Navigate to the project directory:

  ```bash
  cd invoicing-app
  ```

3. Install the dependencies:
   ```bash
  cd invoicing-app
  ```

4. Create a `.env` file to configure your environment variables.
  ```bash
    VITE_API_BASE_URL=http://localhost:4000/api
  ```

## Scripts

- **`pnpm dev`**: Starts the development server.
- **`pnpm build`**: Builds the project for production.
- **`pnpm lint`**: Lints the project using ESLint.
- **`pnpm preview`**: Previews the production build.

## Dependencies

- **React & React DOM**: Core library for building user interfaces.
- **React Hook Form**: Manage forms and validations.
- **React Icons**: Collection of popular icons.
- **React Router DOM**: Handle routing in React applications.
- **React Toastify**: Provide toast notifications.
- **Axios**: Make HTTP requests to backend services.
- **JWT Decode**: Decode JWT tokens.
- **TanStack React Query**: Manage server state.
- **Zod**: Validation and type checking for forms.

## Development Dependencies

- **TypeScript**: Superset of JavaScript for type-safe development.
- **ESLint**: Linting utility for JavaScript and TypeScript.
- **PostCSS & Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Build tool for faster development.

## Configuration

- **Tailwind CSS**: Customize the `tailwind.config.js` file for your design requirements.
- **Vite**: Customize the `vite.config.ts` file for Vite-specific settings.

