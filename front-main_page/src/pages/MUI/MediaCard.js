import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import baekjoon from "../../image/boj-og.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MediaCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "20%", display: "inline-block", float: "left" }}>
      <CardMedia
        component="img"
        height="140"
        image={baekjoon}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          백준 자동화 채점 서비스
        </Typography>
        <Typography variant="h6" color="text.secondary">
          설명서
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          //   aria-expanded={expanded}
          aria-label="더 보기"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>순서</Typography>
          <br></br>
          <br></br>1. 강의를 선택한다. (상세정보 확인가능)<br></br>
          <br></br>2. 채점하고자 하는 백준 문제 번호를 입력한다.<br></br>
          <br></br>3. 제출 기한을 선택한다.<br></br>
          <br></br>4. 검사 실행 버튼을 누르고 기다린다.<br></br>
          <br></br>5. 복사 옵션을 선택하고 결과를 클립보드로 복사한다.<br></br>
          <br></br>* 밑줄 표시된 결과를 클릭하여 채점 상세 현황을 볼 수
          있습니다.
        </CardContent>
      </Collapse>
    </Card>
  );
}
