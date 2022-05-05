import { useState } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {

  // ! We use destructuring here and extract the values from useInput() and assign aliases to them
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  // ! If the form is submitted, all inputs are treated as "touched"
  const formSubmitHandler = event => {
    event.preventDefault();

    // ! If enteredName is nothing...
    if (!enteredNameIsValid) {
      return;
    }

    // ! We console log the last name we stored
    console.log(enteredName);

    resetNameInput();

  };

  // ! Because only if it was touched and then it's invalid, I want to treat is as invalid

  // ! Making classes dynamic
  const nameInputClasses = nameInputHasError ?
    'form-control invalid'
    :
    'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
