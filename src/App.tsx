//import Todolist from "./components/Todolist"
import { useState } from "react";
import { Button, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import BoxSentiment from "./components/BoxSentiment";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [prob, setProb] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    let taskText = text.trim();
    if (taskText.length === 0) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    };
    const response = await fetch(
      "https://nlp-api.ppirch.me/predict",
      requestOptions
    );
    const data = await response.json();
    setSentiment(data.sentiment);
    setProb(data.probability);
  };
  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 48,
          background:
            "-webkit-linear-gradient(45deg, #383FEB 40%, #00F877 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        {" "}
        Text Sentiment Analysis{" "}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px"
        }}
      >
        <Stack
          sx={{ width: "50%", minWidth: "300px" }}
          direction="row"
          spacing={2}
        >
          <TextField
            id="outlined-basic"
            label="ใส่ข้อความที่นี่"
            variant="outlined"
            fullWidth
            multiline
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <Button
            style={{ fontSize: "14px" }}
            variant="contained"
            disableElevation
            onClick={handleSubmit}
          >
            วิเคราะห์
          </Button>
        </Stack>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {sentiment === "q" && (
          <>
            <BoxSentiment
              emoji="🤔"
              sentiment={"คำถาม"}
              neu={prob[1]}
              pos={prob[2]}
              neg={prob[0]}
              q={prob[3]}
            />
          </>
        )}
        {sentiment === "neg" && (
          <BoxSentiment
            emoji="🙁"
            sentiment={"ข้อความเชิงลบ"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
        {sentiment === "neu" && (
          <BoxSentiment
            emoji="😐"
            sentiment={"ข้อความทั่วไป"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
        {sentiment === "pos" && (
          <BoxSentiment
            emoji="😀"
            sentiment={"ข้อความเชิงบวก"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
      </Box>
    </>
  );
}

export default App;
