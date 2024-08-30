import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const ActionDialog = (props) => {
    const {
        title,
        body,
        openModal,
        onCloseModal,
        onAction,
        params
    } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (title) {
            setShow(true);
        }
    }, [title, params]);

    const handleSubmit = () => {
        onAction(params);
    };

    return (
        <div>
            {show && (
                <Dialog open={openModal} onClose={onCloseModal}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        {body}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleSubmit()} color="primary">
                            OK
                        </Button>
                        <Button onClick={onCloseModal} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}


export default ActionDialog;
