import React from "react";
import ContentGroup from "@/components/contentGroup";
import LoginForm from "@/components/loginForm";

export default function SplashPage() {
  return (
    <>
      <ContentGroup variant="content">
        <h1 className="title">Solid Todo App</h1>
        <p>
          Welcome to Solid Todo App, a <a href="https://solidproject.org/">Solid-compliant</a>, web-based application
          that allows you to manage todo lists. The data created as part of this management will be stored in your&nbsp;
          <a href="https://solidproject.org/about#solid-servers-and-pods">Solid Pod</a>, meaning the data will stay
          under <strong>your control</strong>.
        </p>
        <p>
          As the data is stored on <a href="https://solidproject.org/about#solid-servers-and-pods">Solid Servers</a>,
          you will be able to access your data as long as you&apos;re able to connect to the web. This also allows you
          to <strong>share your data with others</strong>.
        </p>
      </ContentGroup>
      <div className="message is-warning">
        <h2 className="message-header" data-testid={"UnderDevelopmentHeader"}>Under development</h2>
        <p className="message-body">
          Note that this app is under development. As such, things might change, and you should only use this app for
          testing purposes.
        </p>
      </div>
      <ContentGroup variant="content">
        <h2 className="subtitle">Log in using your Solid ID</h2>
        <LoginForm />
        <p>
          In order to access your data we need to authenticate you. If you don&apos;t have a Solid ID, check out any
          of the providers listed above to create one.
        </p>
      </ContentGroup>
    </>
);
}