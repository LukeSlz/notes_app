import Modal from 'react-modal';
import './ConfirmModal.scss';

interface ModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
  onConfirmDelete: () => void,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}


const ConfirmModal: React.FC<ModalProps> = ({isOpen, onRequestClose, onConfirmDelete}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <h2>Delete Note</h2>
      <p>This action cannot be undone <br />
      Are you sureyou want to delete this note?
      </p>
      <button onClick={onConfirmDelete}>DELETE</button>
      <button onClick={onRequestClose}>Cancel</button>

    </Modal>
  )
}

export default ConfirmModal;