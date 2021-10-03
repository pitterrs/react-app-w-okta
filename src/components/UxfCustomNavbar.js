import React from "react";
import {
  Nav,
  HeaderContext,
} from "@deere/ux.uxframe-react";
import { ReactComponent as HomeIcon } from "@deere/ux.brand-foundations/icons/home.svg";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

export class UxfCustomNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static contextType = HeaderContext;

  handleClick() {
    this.context.onClickLink();
  }

  render() {

    return (
      <React.Fragment>
        {/* Begin House Icon */}
        <IndexLinkContainer to="/home" onClick={this.handleClick}>
          <Nav.Item className="uxf-nav-item-icon">
            <a href="index.html" className="nav-icon" aria-label="home page">
              <HomeIcon className="nav-home-icon" />
              <span className="uxf-header-home-text-mobile">Home</span>
            </a>
          </Nav.Item>
        </IndexLinkContainer>
        {/* Ending House Icon */}

        {/* Begin Schedule Menu Link */}
        <Nav.Item className="uxf-nav-item-icon nav-icon">
          <LinkContainer
            to="/schedules"
            onClick={this.handleClick}
            active={false}
          >
            <Nav.Link>
              <span className="uxf-link-text">Schedules</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {/* Ending Schedule Menu Link */}

        {/* begin Search Schedules Menu Link */}
        <Nav.Item className="uxf-nav-item-icon">
          <LinkContainer to="/help" onClick={this.handleClick} active={false}>
            <Nav.Link >
              <span className="uxf-link-text">Contact</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {/* Ending Schedule Menu Link */}

        {/* begin Search Schedules Menu Link */}
        <Nav.Item className="uxf-nav-item-icon">
          <LinkContainer to="/help" onClick={this.handleClick} active={false}>
            <Nav.Link>
              <span className="uxf-link-text">Help</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {/* Ending Schedule Menu Link */}

        {/* begin Search Schedules Menu Link */}
        <Nav.Item className="uxf-nav-item-icon">
          <LinkContainer
            to="/muitable"
            onClick={this.handleClick}
            active={false}
          >
            <Nav.Link>
              <span className="uxf-link-text">Schedule Lines</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {/* Ending Schedule Menu Link */}
      </React.Fragment>
    );
  }
}
