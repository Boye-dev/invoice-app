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

- `/src`: Contains all source code files.
  - `/api`: Contains API handling files.
  - `/assets`: Contains static assets like images, fonts, etc.
  - `/components`: Contains React components.
  - `/constants`: Contains constant values used across the app.
  - `/contexts`: Contains React context files.
  - `/hooks`: Contains custom React hooks.
  - `/interfaces`: Contains custom TypeScript interfaces.
  - `/pages`: Contains page components for different routes.
  - `/services`: Contains custom service functions.
  - `/shared`: Contains shared utilities and components.
  - `/utils`: Contains utility functions.
  - `App.tsx`: Main application component.
  - `index.css`: Main stylesheet.
  - `main.tsx`: Main entry point for the application.
  - `vite-env.d.ts`: Vite environment type declarations.
- `.env`: Environment configuration file.
- `.eslintrc.cjs`: ESLint configuration file.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `index.html`: Main HTML file.
- `package.json`: Project metadata and dependencies.
- `pnpm-lock.yaml`: Lock file for dependencies.
- `postcss.config.js`: PostCSS configuration file.
- `README.md`: Project README file.
- `tailwind.config.js`: Tailwind CSS configuration file.
- `tsconfig.app.json`: TypeScript configuration for the application.
- `tsconfig.json`: Base TypeScript configuration.
- `tsconfig.node.json`: TypeScript configuration for Node.js.
- `vercel.json`: Vercel deployment configuration.
- `vite.config.ts`: Vite configuration file.

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
   git clone [https://github.com/yourusername/invoicing-app.git](https://github.com/Boye-dev/invoice-app.git)
   ```
   
2. Navigate to the project directory:

  ```bash
  cd invoicing-app
  ```

3. Install the dependencies:
   ```bash
    pnpm install
    ```

4. Create a `.env` file to configure your environment variables.
  ```bash
  VITE_API_BASE_URL=https://boye-dev-invoice-app-backend.vercel.app/api
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

