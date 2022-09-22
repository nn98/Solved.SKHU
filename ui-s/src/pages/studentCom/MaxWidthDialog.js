import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";

export default function MaxWidthDialog(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  //   const HtmlTooltip = styled(({ className, ...props }) => (
  //     <Tooltip {...props} classes={{ popper: className }} />
  //   ))(({ theme }) => ({
  //     [`& .${tooltipClasses.tooltip}`]: {
  //       backgroundColor: "rgba(0, 0, 0, 0.87)",
  //       color: "rgba(255, 255, 255, 0.87)",
  //       maxWidth: 220,
  //       fontSize: theme.typography.pxToRem(18),
  //     },
  //   }));

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>테스트 중</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
