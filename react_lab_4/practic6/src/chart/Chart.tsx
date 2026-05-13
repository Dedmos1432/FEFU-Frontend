import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { videoMemory, powerConsumption } from "./croupData";
import GroupGrid from "./GroupGrid";
import { useState } from "react";
import GroupChart from "./GroupChart";

type tSelect = "Видеопамять" | "Энергопотребление";

export default function Chart() {
  const [group, setGroup] = useState<tSelect>("Видеопамять");
  const [groupData, setGroupData] = useState(videoMemory);
  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width: "200px", m: "auto" }}>
        <FormControl fullWidth>
          <InputLabel> Группировать по </InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Группировать по"
            onChange={(e) => {
              setGroup(e.target.value as tSelect);
              if (e.target.value === "Энергопотребление") {
                setGroupData(powerConsumption);
              } else {
                setGroupData(videoMemory);
              }
            }}
          >
            <MenuItem value="Видеопамять"> Видеопамять </MenuItem>
            <MenuItem value="Энергопотребление"> Энергопотребление </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />

      <Footer />
    </div>
  );
}
