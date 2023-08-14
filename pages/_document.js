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
          <link rel="stylesheet" href="/style/RNBOStyle.module.css" />
          {/* Other meta tags and stylesheets can go here */}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Scripts loaded at the end of the body */}
          <script type="text/javascript" src="/js/guardrails.js"></script>
          <script type="text/javascript" src="/js/app.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
