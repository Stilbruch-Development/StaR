import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
`;

const EditorToolBar = (props) => {
  const classes = useStyles();

  return (
    <StyleWrapper>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => props._toggleInlineStyle('BOLD')}
        style={{ fontWeight: 'bolder' }}
      >
        Fett
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => props._toggleInlineStyle('ITALIC')}
        style={{ fontStyle: 'italic' }}
      >
        Kursiv
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => props._toggleInlineStyle('UNDERLINE')}
        style={{ textDecoration: 'underline' }}
      >
        Unterstrichen
      </Button>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => props._toggleBlockType('alignLeft')}>
          <FormatAlignLeftIcon />
        </Button>
        <Button onClick={() => props._toggleBlockType('alignCenter')}>
          <FormatAlignCenterIcon />
        </Button>
        <Button onClick={() => props._toggleBlockType('alignRight')}>
          <FormatAlignRightIcon />
        </Button>
      </ButtonGroup>
    </StyleWrapper>
  );
};

export default EditorToolBar;
