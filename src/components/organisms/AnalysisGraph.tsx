import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const AnalysisGraph = () => {
  const data = [
    {
      name: "1",
      work1: 1,
      work2: 2,
      work3: 0,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 1,
      work9: 1,
      work10: 0,
    },
    {
      name: "2",
      work1: 1,
      work2: 0,
      work3: 1,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 2,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "3",
      work1: 1,
      work2: 0,
      work3: 1,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 0,
      work10: 0,
    },
    {
      name: "4",
      work1: 1,
      work2: 1,
      work3: 1,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "5",
      work1: 1,
      work2: 0,
      work3: 0,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "6",
      work1: 1,
      work2: 2,
      work3: 2,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 0,
      work8: 1,
      work9: 1,
      work10: 0,
    },
    {
      name: "7",
      work1: 1,
      work2: 2,
      work3: 2,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 0,
      work8: 0,
      work9: 1,
      work10: 1,
    },
    {
      name: "8",
      work1: 1,
      work2: 2,
      work3: 2,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "9",
      work1: 0,
      work2: 1,
      work3: 0,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 0,
      work10: 0,
    },
    {
      name: "10",
      work1: 1,
      work2: 1,
      work3: 1,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 0,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "11",
      work1: 1,
      work2: 2,
      work3: 2,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 1,
      work10: 0,
    },
    {
      name: "12",
      work1: 1,
      work2: 1,
      work3: 1,
      work4: 0,
      work5: 1,
      work6: 0,
      work7: 1,
      work8: 0,
      work9: 1,
      work10: 0,
    },
  ];

  const renderLineChart = (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="work1" stroke="#8884d8" />
      <Line type="monotone" dataKey="work2" stroke="#8884d8" />
      <Line type="monotone" dataKey="work3" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work4" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work5" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work6" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work7" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work8" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work9" stroke="#82ca9d" />
      <Line type="monotone" dataKey="work10" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" unit="日" />
      <YAxis
        domain={["dataMin", "dataMax"]}
        ticks={[0, 1, 2]} // Y軸に表示する温度
        unit="回" // Y軸の単位
      />
    </LineChart>
  );
  return renderLineChart;
};
