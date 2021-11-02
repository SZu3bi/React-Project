import React from 'react';
import image from '../../../Views/loader.gif';
import './Spinner.scss';

export const Spinner = ({
 isActive, isAbsolute, isSmall, isWithoutText
}) => (
  <>
    {isActive && (
      <div
        className={`spinner-wrapper${isAbsolute ? '  is-absolute' : ''}${
          (isSmall && ' is-small') || ''
        }`}
      >
        <div className='app-spinner'>
          <img src={image} alt='...' className='spinner-img' />
          {!isWithoutText && <span className='fz-15px'>Please Wait ...</span>}
        </div>
      </div>
    )}
  </>
);