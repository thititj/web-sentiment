import { Box, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BoxSentiment = (props: {
  emoji: string;
  sentiment: string;
  neu: number;
  pos: number;
  neg: number;
  q: number;
}) => {
  const { sentiment, emoji } = props;
  const data = [
    {
      sentiment: "ทั่วไป",
      ความน่าจะเป็น: props.neu
    },
    {
      sentiment: "เชิงบวก",
      ความน่าจะเป็น: props.pos
    },
    {
      sentiment: "เชิงลบ",
      ความน่าจะเป็น: props.neg
    },
    {
      sentiment: "คำถาม",
      ความน่าจะเป็น: props.q
    }
  ];

  return (
    <>
      <Box sx={{ justContent: "center", textAlign: "center" }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <h2>
              ประโยคนี้เป็น : {sentiment} {emoji}
            </h2>

            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sentiment" />
              <YAxis type="number" domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ความน่าจะเป็น" fill="#8884d8" />
            </BarChart>
          </CardContent>
          <CardActions>
            <p style={{}}>ผลการวิเคราะห์ถูกต้องหรือไม่</p>
            <Button
              variant="outlined"
              startIcon={<FaThumbsUp />}
              size="medium"
              color="success"
            >
              ถูกต้อง
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaThumbsDown />}
              size="medium"
              color="error"
            >
              ไม่ถูกต้อง
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default BoxSentiment;
