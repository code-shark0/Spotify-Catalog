# Lightweight Spotify Catalog
### By: Eli Green

The goal of this project was to create a lightweight Spotify catalog application that would allow users to view their Spotify catalog in a simple, and user-friendly interface.

It allows users to login with their spotify account, then view their catalog of saved Albums, Tracks, and Episodes. 

Limited time was spent on the project, so any additional features, bugfixes, or improvements are either implicit or explicitely written as comments throughout the code.

## Project Setup

To run this project, you will need to have Node.js and npm installed on your computer. 

After installing Node.js and npm, you can run the following commands to install the dependencies:

```bash
npm install
```

After installing the dependencies, you can run the following command to start the development server:

```bash
npm start
```

This will start up the development server which will be accessible on your local machine at `http://localhost:3001`.

## Transcription Implementation Write-up
To display lyric transcriptions, I would start by thinking through the requirements and constraints of the project. If given the opportunity to, I would want to take the time to understand the end users perspective on the problem that they are trying to solve before assessing the best way of meeting their needs. If I had access to files that included timestamps with the lyrics, it would allow me to display the lyrics in time with when they were playing similar to a karaoke machine. To implement this option, I would need to create a new component that would display the lyrics in a scrolling manner, I would then utilize React features like useEffect to track when the lyrics need to be updated and displayed to the end user. We would probably also want to think about failsafes like having a static transcript fallback if all else failed. I would also be happy to talk through the process of implementing this feature in more detail in person.