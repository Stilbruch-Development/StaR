import React, { Component } from "react";
import styled from "styled-components";
import Immutable from "immutable";

const AlignRight = styled.div`
  .public-DraftStyleDefault-ltr {
    text-align: right;
  }
`;

const AlignLeft = styled.div`
  .public-DraftStyleDefault-ltr {
    text-align: left;
  }
`;

const AlignCenter = styled.div`
  .public-DraftStyleDefault-ltr {
    text-align: center;
  }
`;

class AlignRightWrapper extends Component {
  render() {
    return (
      <AlignRight>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </AlignRight>
    );
  }
}

class AlignLeftWrapper extends Component {
  render() {
    return (
      <AlignLeft>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </AlignLeft>
    );
  }
}

class AlignCenterWrapper extends Component {
  render() {
    return (
      <AlignCenter>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </AlignCenter>
    );
  }
}

const blockRenderMap = Immutable.Map({
  alignRight: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: "section",
    wrapper: <AlignRightWrapper />
  },
  alignLeft: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: "section",
    wrapper: <AlignLeftWrapper />
  },
  alignCenter: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: "section",
    wrapper: <AlignCenterWrapper />
  }
});

export default blockRenderMap;
