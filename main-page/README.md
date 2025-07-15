# React Landing Page for Aging-related Transcriptomic Changes

This folder contains a minimal React app for the project landing page. It is designed for static hosting (e.g., Netlify, GitHub Pages) and does not require a build step or Python.

## Folder Structure

```
main-page/
  ├── App.js
  ├── index.js
  ├── index.html
  ├── style.css
  ├── public/
  │    ├── bg.png
  │    ├── bg2.png
  │    ├── beth.png
  │    ├── hms.png
  │    ├── hsph.png
  │    ├── lab.png
  │    └── nih.png
  └── README.md
```

## How to Run Locally

1. **Install a static web server if you don't have one:**
   - With Node.js:
     ```sh
     npm install -g http-server
     http-server ./main-page
     ```

2. **Open your browser and go to:**
   - [http://localhost:8080](http://localhost:8080)

You should see the React landing page. Any changes to `App.js` will be reflected after a browser refresh.

## How It Works
- The app uses React and ReactDOM from CDN, and Babel for JSX support in the browser.
- All main content and logic is in `App.js`.
- Styles are in `style.css`.
- Images and backgrounds are in the `public/` folder.

## Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** and select **Deploy manually**.
3. Drag and drop the `main-page` folder into the upload area.
4. Netlify will provide a live URL for your site.

---

For any questions or improvements, edit `App.js` and `style.css` as needed.
