import { Box, Button, Container, Typography, Divider } from "@mui/material";

import { quiz } from "../quizData";
import Matching from "./Matching";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { clearResults, resetLists, setResult } from "./quizSlice";

export default function Quiz() {
  const dispatch = useDispatch();

  const lists = useSelector((state: RootState) => state.lists.lists);

  const results = useSelector((state: RootState) => state.lists.results);

  const handleCheck = () => {
    dispatch(clearResults());

    quiz.forEach((item, quizIndex) => {
      let correct = 0;

      item.tasks.forEach((task, taskIndex) => {
        if (lists[quizIndex][taskIndex] === task.answer) {
          correct++;
        }
      });

      dispatch(
        setResult({
          index: quizIndex,
          correct,
          total: item.tasks.length,
        }),
      );
    });
  };

  const handleRestart = () => {
    dispatch(resetLists());
  };

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>

          <Matching
            key={index + lists.length}
            index={index}
            tasks={item.tasks}
          />
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 4 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>

        <Button variant="contained" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h4">Результаты тестирования</Typography>

          {results.map((result, index) =>
            result.correct === result.total ? (
              <Typography>Задание {index + 1}: Все ответы верны</Typography>
            ) : (
              <Typography>
                Задание {index + 1}: Верных ответов: {result.correct}
              </Typography>
            ),
          )}
        </Box>
      )}
    </Container>
  );
}
