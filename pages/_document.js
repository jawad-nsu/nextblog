import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" /> {/*user for adding portals*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
