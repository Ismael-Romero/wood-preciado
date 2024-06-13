import {Modal} from "antd";


export const ModalStock = ({ isOpen, handleClose }) => {

    const onClose = () => {
        handleClose();
    };

    const onCancel = () => {
        handleClose();
    };

    const onSuccess = () => {
        handleClose();
    };

    return (
        <Modal title={"Nueva entrada"}
               open={isOpen} onClose={onClose} onCancel={onCancel} onOk={onSuccess}>
            Stock
        </Modal>
    );
}