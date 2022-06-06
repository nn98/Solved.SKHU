import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./MaxWidthDialog.css";

export default function MaxWidthDialog(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>채점 상세 보기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.pnumber} 문제에 대한 {props.detailName} 의 채점 현황입니다.
          </DialogContentText>
          {props.student.map((data, index) => (
            <React.Fragment key={data.ID}>
              {data.name === props.detailName ? (
                <>
                  {data.status !== "" ? (
                    <table className="detail">
                      <thead>
                        <tr>
                          <th>제출 번호</th>
                          <th>아이디</th>
                          <th>문제</th>
                          <th>결과</th>
                          <th>메모리</th>
                          <th>시간</th>
                          <th>언어</th>
                          <th>코드 길이</th>
                          <th>제출한 시간</th>
                        </tr>
                        {data.status.map((result, index) => (
                          <React.Fragment key={index}>
                            {index !== 0 ? (
                              <tr
                                dangerouslySetInnerHTML={{ __html: result }}
                              ></tr>
                            ) : null}
                          </React.Fragment>
                        ))}
                      </thead>
                    </table>
                  ) : null}
                </>
              ) : null}
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
