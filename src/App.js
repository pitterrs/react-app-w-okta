import React from "react";
import { Helmet } from "react-helmet";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import "@deere/ux.uxframe-core/dist/css/uxframe.min.css";
import "./App.css";
import {
  Header,
  ListItem,
  Footer,
  List,
  FooterLink,
} from "@deere/ux.uxframe-react";
import { UxfCustomNavbar } from "./components/UxfCustomNavbar.js";
import { HomePage } from "./pages/Home.js";
import { MUIdata } from "./pages/MUIDataTable.js";
import { Switch, Route, useHistory } from "react-router-dom";
import { ScheduleLines } from "./pages/ScheduleLines.js";
// import { ReactComponent as ChevronLeftIcon } from "@deere/ux.brand-foundations/icons/chevron_left.svg";
import { oktaAuthConfig, oktaSignInConfig } from "./config";
import Login from "./Login";

function App() {
  const history = useHistory();
  const oktaAuth = new OktaAuth(oktaAuthConfig);
  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex">
      <div className="uxf-sticky-footer">
        <div className="uxf-main-content">
          <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Supplier Follow up Tool</title>
          </Helmet>
          <Header
            logoLinkOnClick={(e) => {
              e.preventDefault();
              history.push("/home");
            }}
            logoLink="/home"
            pageHeadingLink="/home"
            pageHeadingLinkOnClick={(e) => {
              e.preventDefault();
              history.push("/home");
            }}
            navbarCustom={true}
          >
            <UxfCustomNavbar />
          </Header>
          <div id="content">
            <Switch>
              <Security
                oktaAuth={oktaAuth}
                onAuthRequired={customAuthHandler}
                restoreOriginalUri={restoreOriginalUri}
              >
                <Route
                  path="/"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={"/home"} component={HomePage} />
                      <SecureRoute path={"/muitable"} component={MUIdata} />
                      <SecureRoute
                        path={`/schedules`}
                        component={ScheduleLines}
                      />
                      <Route
                        path="/login"
                        render={() => <Login config={oktaSignInConfig} />}
                      />
                      <Route path="/login/callback" component={LoginCallback} />
                    </>
                  )}
                />
              </Security>
            </Switch>
          </div>
        </div>
        <Footer>
          <List className="nav">
            <ListItem>
              <FooterLink href="http://localhost:3006/#/home">Home</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink href="http://ux.deere.com/other-pages/contact-us/">
                Contact Us
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink
                href="https://www.deere.com/en/privacy-and-data/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy & Data
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink
                href="https://www.deere.com/en/privacy-and-data/terms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </FooterLink>
            </ListItem>
          </List>
        </Footer>
      </div>
    </div>
  );
}

export default App;
