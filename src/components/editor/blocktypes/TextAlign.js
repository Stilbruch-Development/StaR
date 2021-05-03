import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import Immutable from 'immutable';

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

class AlignRightWrapper extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <AlignRight>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {children}
      </AlignRight>
    );
  }
}

class AlignLeftWrapper extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <AlignLeft>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {children}
      </AlignLeft>
    );
  }
}

class AlignCenterWrapper extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <AlignCenter>
        {/* this.props.children contains a <section> container, as that was the matching element */}
        {children}
      </AlignCenter>
    );
  }
}

const blockRenderMap = Immutable.Map({
  alignRight: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'section',
    wrapper: <AlignRightWrapper />
  },
  alignLeft: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'section',
    wrapper: <AlignLeftWrapper />
  },
  alignCenter: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'section',
    wrapper: <AlignCenterWrapper />
  }
});

export default blockRenderMap;
