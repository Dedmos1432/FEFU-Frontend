import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { tTasks } from "../quizData";
import SortableList from "./SortableList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addList } from "./quizSlice";

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

export default function Matching({ index, tasks }: ComponentProps) {
  const answerData = new Set<string>();
  while (answerData.size < tasks.length) {
    answerData.add(tasks[Math.floor(Math.random() * tasks.length)].answer);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addList({ index, items: Array.from(answerData) }));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  textAlign: "right",
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <SortableList index={index} answers={Array.from(answerData)} />
    </Grid>
  );
}
