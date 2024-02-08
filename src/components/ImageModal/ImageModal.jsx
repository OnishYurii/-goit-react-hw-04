import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export const ImageModal = ({
  isOpen,
  onRequestClose,
  selectedItem: { urls, alt_description, description },
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={css.modal}
        overlayClassName={css.backdrop}
      >
        <div className={css.container}>
          <img src={urls.regular} alt={alt_description} />
          <p className={css.text}>{description}</p>
        </div>
      </Modal>
    </div>
  );
};
