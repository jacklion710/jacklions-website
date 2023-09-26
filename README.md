# Jack Lion's Studio - Next.js Project

## Deployment:
https://jacklion.xyz

Welcome to the repository for Jack Lion's Studio, a music and device-focused web application built with [Next.js](https://nextjs.org/). This project was initialized with \[`create-next-app`\](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- **User Authentication**: Allows users to sign in and sign up, integrated with Firebase.
- **Embedded Media Gallery**: Hosts music and graphic art through embedded content.
- **Embedded Shop**: Pages like `Devices` and `Samples` showcase creative tools and packs available for musicians.
- **Automated Booking**: Appointments and services can be easily booked.
- **Responsive Design**: Built with Chakra UI for a seamless user experience on all device types.
- **Interactive Audio-Visual Art**: Integrating P5.js together with RNBO.js to create an immersive experience.
- **SEO Optimized**: Each page is enhanced with SEO optimizations for better discoverability.

## Getting Started

To get this project up and running locally:

1. Clone the repository.
2. Install the dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
   or
   ```
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- **Authentication**: The `SignInPage` and `SignUpPage` components handle user authentication, leveraging Firebase.
- **Components**: Reusable components like `Navbar` and `Footer` are located in the `/components` directory.
- **Pages**: The pages that the user will interact with are located in the `/pages` directory.
- **Audio-Visuals**: Immersive art pages will be located inside the `/pages/av` directory.
- **Public**: Assets and dependencies are located in the `/public` directory.
- **Utilities**: Utilities such as Firebase configuration are found under the `/utils` directory.

## SEO

I've integrated SEO optimizations using the `react-helmet` library. This ensures that our pages are discoverable and rank well in search engines.

## Feedback and Contributions

Feedback, issues, and contributions are always welcome! Feel free to open an issue or submit a pull request.

## Learn More

For more in-depth knowledge on Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

For more information on Chakra UI:

- [Chakra UI Home](https://chakra-ui.com)

For more in-depth knowledge on Firebase:

- [RNBO.js Documentation](https://firebase.google.com/docs)
- [Firebase Home](https://firebase.google.com)

For more in-depth knowledge on RNBO.js:

- [RNBO.js Documentation](https://rnbo.cycling74.com/learn/getting-the-rnbojs-library)
- [RNBO.js Reference](https://rnbo.cycling74.com/js)

For more in-depth knowledge on P5.js:

- [P5.js Home](https://p5js.org)
- [P5.js Reference](https://p5js.org/reference/)

## Deployment

For deployment, it is recommended to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the official platform from the creators of Next.js.

[Next.js deployment documentation](https://nextjs.org/docs/deployment) provides detailed instructions.
