import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
type tSeries = {
  "Максимальная мощность": boolean;
  "Средняя мощность": boolean;
  "Минимальная мощность": boolean;
};
type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingChart({
  series,
  setSeries,
  isBar,
  setIsBar,
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Stack>
      <FormControl>
        <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
        <RadioGroup name="group-radio" value={isBar ? "bar" : "dot"}>
          <FormControlLabel
            value="bar"
            control={<Radio checked={isBar} onChange={() => setIsBar(true)} />}
            label="Гистограмма"
          />
          <FormControlLabel
            value="dot"
            control={
              <Radio checked={!isBar} onChange={() => setIsBar(false)} />
            }
            label="Линейная"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-checkbox-group">На диаграмме показать:</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Максимальная мощность"]}
              onChange={handleChange}
              name="Максимальная мощность"
            />
          }
          label="максимальную мощность"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Средняя мощность"]}
              name="Средняя мощность"
              onChange={handleChange}
            />
          }
          label="среднюю высоту"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Минимальная мощность"]}
              name="Минимальная мощность"
              onChange={handleChange}
            />
          }
          label="минимальную мощность"
        />
      </FormControl>
    </Stack>
  );
}
