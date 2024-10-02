import { Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const EssayInput = ({
  question,
  onAnswerChange,
}: {
  question: string;
  onAnswerChange: Function;
}) => {
  const [text, setText] = useState("");
  const saveInterval = 5000;
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData();
    }, saveInterval);

    return () => clearTimeout(timer);
  }, [text]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const saveData = () => {
    onAnswerChange(text);
    console.log("Data saved:", text);
  };
  return (
    <div>
      <Typography>{question}</Typography>
      <TextField
        multiline
        rows={3}
        value={text}
        onChange={handleInputChange}
      ></TextField>
    </div>
  );
};

export default EssayInput;
