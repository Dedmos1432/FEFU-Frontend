import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { countries, years, types } from "./groupdata";
import GroupGrid from "./components/GroupGrid";
import { useState } from "react";
import GroupChart from "./components/GroupChart";

type tSelect = "Страна" | "Год" | "Тип";

export default function Chart() {
  const [group, setGroup] = useState<tSelect>("Страна");
  const [groupData, setGroupData] = useState(countries);
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
              if (e.target.value == "Год") {
                setGroupData(years);
              } else if (e.target.value == "Тип") {
                setGroupData(types);
              } else {
                setGroupData(countries);
              }
            }}
          >
            <MenuItem value="Страна"> Стране </MenuItem>
            <MenuItem value="Год"> Году </MenuItem>
            <MenuItem value="Тип"> Типу </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />

      <Footer />
    </div>
  );
}
