import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, Slider } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [valr,setvalr] = React.useState([2,4])

  const handleClickOpen = () => {
    console.log("open");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        style={{ float: "right" }}
        aria-label="delete"
        onClick={handleClickOpen}
      >
        <i class="filter icon"></i>
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filter Internship
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ padding: "15px", marginLeft: "25px", marginRight: "25px" }}>
          <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="work from home"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="external"
      />
            <Typography id="range-slider" gutterBottom>
              duration (in months)
            </Typography>
            <Slider
              value={valr}
              onChange={(e,v)=>setvalr(v)} //
              valueLabelDisplay="auto"
              min={0}
              step={1}
              max={12}
              aria-labelledby="range-slider"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
