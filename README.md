# Cyber Security Solutions Website

This is a demo website for a fictional company called **Cyber Security Solutions (CSS)**, built as a coursework project using [Create React App](https://github.com/facebook/create-react-app). 
I plan on adapting this to be a template for future portfolios.

## Features

- Responsive React-based single-page application
- Informational pages: Home, About, and more
- Blog section with Markdown-based articles & Easy blog system
- Modern UI with smooth route transitions


## Getting Started

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sudoxyz/demoSite.git
   cd demoSite
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the Development Server

Start the app in development mode:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Building for Production

To create an optimized production build:

```sh
npm run build
```

The build output will be in the `build/` directory.


### Adding Blogs

To add more blogs
1. Put your markdown file(s) in `public/blogs`.
2. Index the new file(s) in `public/blogs.json` with your chosen title and file path.
3. Add description to blog:
   ```md
   ---
   description: Description content
   ---
   ```

---

Made by [github.com/sudoxyz](https://github.com/sudoxyz)