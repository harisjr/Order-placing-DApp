import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Task.css";

const Task = ({ askingAmount, spread, onClick }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar />
        <ListItemText primary={askingAmount} />
        <ListItemText primary={spread} />
      </ListItem>
      <DeleteIcon fontSize="large" style={{ opacity: 0.7 }} onClick={onClick} />
    </List>
  );
};

export default Task;
