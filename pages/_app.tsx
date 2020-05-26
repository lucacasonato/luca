import React from "react";
import App from "next/app";
import Head from "next/head";
import "../components/app.css";

export default class BaseApp extends App {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}
