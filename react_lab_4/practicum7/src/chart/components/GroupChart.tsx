import { tGroup } from "../groupdata";
import { BarChart } from "@mui/x-charts/BarChart";
import Container from "@mui/material/Container";
import { useState } from "react";
import SettingChart from "./SettingChart";
import { LineChart } from "@mui/x-charts/LineChart";
type GroupProps = {
  data: tGroup;
};

export default function GroupChart({ data }: GroupProps) {
  const [isBar, setIsBar] = useState(true);
  const chartSetting = {
    yAxis: [{ label: "Высота (м)" }],
    height: 400,
  };

  const [series, setSeries] = useState({
    "Максимальная высота": true,
    "Средняя высота": false,
    "Минимальная высота": false,
  });

  const activeSeries = Object.entries(series).filter(
    (item) => item[1] === true,
  );

  const seriesY = activeSeries.map((item) => {
    return {
      dataKey: item[0],
      label: item[0],
      barLabel: activeSeries.length === 1 ? ("value" as const) : undefined,
    };
  });

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      )}

      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />
    </Container>
  );
}
