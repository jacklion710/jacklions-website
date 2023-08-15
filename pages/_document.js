import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Other meta tags and stylesheets can go here */}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Scripts loaded at the end of the body */}
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script> */}
          <script async type="text/javascript" src="/js/guardrails.js"></script>
          <script async type="text/javascript" src="/js/app.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
