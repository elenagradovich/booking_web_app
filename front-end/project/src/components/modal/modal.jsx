import React, {forwardRef, Fragment, useRef} from 'react';
import {createPortal} from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './backdrop';
import './modal.scss';

const ModalOverlay = forwardRef(
  'Modal',
  (
    {
      className,
      style,
      headerClass,
      header,
      onSubmit,
      contentClass,
      footerClass,
      footer,
      children,
    },
    ref,
  ) => {
    const defaultSubmit = (e) => e.preventDefault();

    const content = (
      <div ref={ref} className={`modal ${className}`} style={style}>
        <header className={`modal__header ${headerClass}`}>
          <h2>{header}</h2>
        </header>
        <form onSubmit={onSubmit ? onSubmit : defaultSubmit}>
          <div className={`modal__content ${contentClass}`}>{children}</div>
          <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
        </form>
      </div>
    );

    return createPortal(content, document.getElementById('modal-hook'));
  },
);

function Modal ({ show, onCancel, ...rest }) {
  const nodeRef = useRef(null);

  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay ref={nodeRef} {...rest} />
      </CSSTransition>
    </Fragment>
  );
}

export default Modal;
