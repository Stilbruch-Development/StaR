import React from 'react';
import StandardContext from './standardContext';
import useCovid19State from './covid19/useCovid19State';
import usePulmonaryEmbolismState from './pulmonaryEmbolism/usePulmonaryEmbolismState';

const StandardState = (props) => {
  const { children } = props;
  const [Covid19State, setCovid19State] = useCovid19State();
  const [PulmonaryEmbolismState, setPulmonaryEmbolismState] =
    usePulmonaryEmbolismState();
  return (
    <StandardContext.Provider
      value={{
        Covid19State,
        setCovid19State,
        PulmonaryEmbolismState,
        setPulmonaryEmbolismState
      }}
    >
      {children}
    </StandardContext.Provider>
  );
};

export default StandardState;
