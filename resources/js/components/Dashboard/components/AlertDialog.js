import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class AlertDialog extends React.Component {
  constructor(props) {
        super(props);
        this.state = { 
            open: false
         };
      }
      
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    console.log("I confirm deletion!");
    this.props.agreeonclick();
    this.handleClose();
  };
  handleDisagree = () => {
    console.log("No - do not delete.");
    this.handleClose();
  };
  render() {
    return (
      <div>
        {/* Button to trigger the opening of the dialog */}
        <Button onClick={this.handleClickOpen}>Delete</Button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="Are you sure?"
          aria-describedby="Confirm deletion"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
           Yes delete
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAgree}  color="primary" autoFocus>

            Delete record 
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;