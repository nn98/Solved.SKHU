import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./MaxWidthDialog.css";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default function MaxWidthDialog(props) {
  let detailDate = "";

  const handleClose = () => {
    props.setOpen(false);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      color: "rgba(255, 255, 255, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(18),
    },
  }));

  const setDetailDate = (value) => {
    detailDate = value;
    return;
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
            <React.Fragment key={index}>
              {data.Lecture_ID === props.subject &&
              data.name === props.detailName ? (
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
                        {data.status &&
                          data.status.map((result, _index) => (
                            <React.Fragment key={_index}>
                              {_index !== 0 ? (
                                <tr>
                                  {result.map((value, index) => (
                                    <React.Fragment key={index}>
                                      {index === 1 ? (
                                        <td>
                                          <a
                                            href={
                                              "https://www.acmicpc.net/user/" +
                                              value
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {value}
                                          </a>
                                        </td>
                                      ) : index === 2 ? (
                                        <td>
                                          <a
                                            href={
                                              "https://www.acmicpc.net/problem/" +
                                              value
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {value}
                                          </a>
                                        </td>
                                      ) : index === 3 ? (
                                        value === "맞았습니다!!" ? (
                                          <td style={{ color: "green" }}>
                                            {value}
                                          </td>
                                        ) : (
                                          <td style={{ color: "red" }}>
                                            {value}
                                          </td>
                                        )
                                      ) : index === 4 ? (
                                        value !== "" ? (
                                          <td>
                                            {value}{" "}
                                            <span style={{ color: "#CC723D" }}>
                                              KB
                                            </span>
                                          </td>
                                        ) : (
                                          <td></td>
                                        )
                                      ) : index === 5 ? (
                                        value !== "" ? (
                                          <td>
                                            {value}{" "}
                                            <span style={{ color: "#CC723D" }}>
                                              ms
                                            </span>
                                          </td>
                                        ) : (
                                          <td></td>
                                        )
                                      ) : index === 7 ? (
                                        <td>
                                          {value}{" "}
                                          <span style={{ color: "#CC723D" }}>
                                            B
                                          </span>
                                        </td>
                                      ) : index === 8 ? (
                                        <>{setDetailDate(value)}</>
                                      ) : index === 9 ? (
                                        <HtmlTooltip
                                          title={detailDate}
                                          placement="top"
                                        >
                                          <td>{value}</td>
                                        </HtmlTooltip>
                                      ) : (
                                        <td>{value}</td>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tr>
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
