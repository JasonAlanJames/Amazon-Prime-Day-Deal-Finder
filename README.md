
# AI Prime Day Deal Finder

This project is a web application that uses the Google Gemini API to find and display Amazon Prime Day deals.

## Deployment Steps

Follow these steps to build the application and deploy it to your website.

### Step 1: File Structure

Organize all your project files into the following structure. Create a `src` folder and move all your components, services, and other source files into it as shown below.

```
/
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── index.tsx
    ├── types.ts
    ├── components/
    │   ├── DealCard.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   └── LoadingSpinner.tsx
    └── services/
        └── geminiService.ts
```

### Step 2: Create Your Environment File (IMPORTANT)

For security, your API key should not be written directly in your code.

1.  In the project's root directory (the same level as `package.json`), create a new file named `.env`.

2.  Inside the `.env` file, add your Gemini API key. **The `VITE_` prefix is essential.**

    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    **Security Note**: For a public website, it is highly recommended to go to your Google AI Studio dashboard and create a new, restricted API key that can **only** be used from your website's domain (`usefulaihacks.com`).

### Step 3: Install Dependencies

Open your terminal or command prompt in the project's root directory and run the following command. This will download all the necessary packages defined in `package.json`.

```bash
npm install
```

### Step 4: Build the Application

Now, run the build command. This will compile all your TypeScript/React code into plain JavaScript, HTML, and CSS that browsers can understand.

```bash
npm run build
```

This command will create a new folder named `dist` in your project directory. This folder contains the final, optimized files for your website.

### Step 5: Deploy to Your Website

You are now ready to upload the application.

1.  Connect to your web server using FTP, cPanel, or another file manager.
2.  Navigate to the `/prime-day-deal-finder/` directory on your server.
3.  Upload the **contents** of the `dist` folder (not the `dist` folder itself) to this directory.

Your application should now be live!
