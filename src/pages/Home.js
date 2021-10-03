import React from "react";
import {
  Container,
  Col,
  Row,
} from "@deere/ux.uxframe-react";
import { Helmet } from "react-helmet";
import Testimage from '../components/images';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export function HomePage() {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  const login = async () => history.push('/login');

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;
  return (
    <div className="uxf-main-container">
      {button}
      <Helmet>
        <title>Home | UXFrame React</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col md="16">
            <h1>Welcome to the Supplier Follow-up Tool.</h1>
            <p>
            This site has been developed for you, Supplier, to have access to the Schedules information in real time.
            If you have any problems please access the "Help" page.
            </p>
            <Testimage />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
