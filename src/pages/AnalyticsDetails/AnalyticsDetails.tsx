import { Link, useLocation, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import classes from "./AnalyticsDetails.module.scss";
import { ReactSVG } from "react-svg";
import { arrowLeft, exportIconBlack, formula, hamburgerIcon, settingsIcon } from "../../assets";
import {
  GreenAreaAnalyticsChart,
  PinkLineChart,
} from "../../components/Graphs/Graphs";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { CSVLink } from "react-csv";

const graphData = [
  {
    name: "May 20 2024",
    uv: 0,
    pv: 0,
    amt: 0,
  },
  {
    name: "May 21 2024",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "May 22 2024",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "May 23 2024",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May 24 2024",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "May 25 2024",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "May 26 2024",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "May 27 2024",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "May 28 2024",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "May 29 2024",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const chartData = {
  title: "Total Project GHG emissions",
  value: "172,642",
  unit: "t CH4",
  url: "total-ghg-emission",
};

const parametersData = [
  {
    title: "E SSR P8",
    text: "Total SSR P8 GHG emissions from fossil fuel combustion, other than natural gas, for the project reporting period",
    input: false,
    value: "20",
  },
  {
    title: "E SSR P8",
    text: "Total SSR P8 GHG emissions from fossil fuel combustion, other than natural gas, for the project reporting period",
    input: true,
    value: "20",
  },
  {
    title: "E SSR P8",
    text: "Total SSR P8 GHG emissions from fossil fuel combustion, other than natural gas, for the project reporting period",
    input: true,
    value: "20",
  },
  {
    title: "E SSR P8",
    text: "Total SSR P8 GHG emissions from fossil fuel combustion",
    input: true,
    value: "20",
  },
  {
    title: "E SSR P8",
    text: "Total SSR P8 GHG emissions from fossil fuel combustion, other than natural gas, for the project reporting period",
    input: true,
    value: "",
  },
];

const CSVHeaders = [
  { label: "Date", key: "name" },
  { label: "Value", key: "pv" },
];

export const AnalyticsDetails = () => {
  const { analyticsSlug, slug } = useParams();
  const url = `/projects/${slug}/analytics`;
  const parametersUrl = `/projects/${slug}/analytics-setup/${analyticsSlug}`;

  const [isVisible, setIsVisible] = useState(false);
  const exportButtonHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(new Date());

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  const [CSVData, setCSVData] = useState(graphData);

  const dateFormat = (date: any) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let finalDate = new Date(`${year}-${month}-${day}`);

    return finalDate.valueOf();
  };

  const csvButtonHandler = () => {
    let finalCSV: any[] = [];

    let startDateVal = dateFormat(startDate);
    let endDateVal = dateFormat(endDate);

    graphData.map((item, index) => {
      let date = new Date(item.name);
      let fullDate = dateFormat(date);

      if (startDateVal <= fullDate && endDateVal >= fullDate) {
        finalCSV[index] = item;
      }
    });

    setCSVData(finalCSV);
  };

  return (
    <Layout>
      <div className={classes.titleContainer}>
        <Link to={url} className={classes.backLink}>
          <ReactSVG src={arrowLeft} className={classes.arrowIcon}></ReactSVG>
          {analyticsSlug}
        </Link>
        <div className={classes.rightButtons}>
          <Link to={parametersUrl} className={classes.button}>
            <ReactSVG src={settingsIcon} className={classes.icon}></ReactSVG>
            Settings
          </Link>
          <div className={classes.datePickerContainer}>
            <div className={classes.datepicker}>
              <ReactDatePicker
                calendarClassName="calendarStyle"
                popperClassName="pooperStyle"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMM d, yyyy"
              />
              <span>-</span>
              <ReactDatePicker
                calendarClassName="calendarStyle"
                popperClassName="pooperStyle"
                selected={endDate}
                onChange={(date) => date && setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MMM d, yyyy"
              />
            </div>
            <span className={classes.divider}></span>
            <div className={classes.moreOptions} onClick={exportButtonHandler}>
              <ReactSVG
                src={hamburgerIcon}
                className={classes.hamburgerIcon}
              ></ReactSVG>
            </div>
          </div>
        </div>
        {isVisible && (
            <div className={classes.export}>
              <div className={classes.exportWrapper}>
                <h4>Export</h4>
                <CSVLink
                  data={CSVData}
                  className={classes.csvDownload}
                  filename={analyticsSlug + ".csv"}
                  headers={CSVHeaders}
                  onClick={csvButtonHandler}
                >
                  <ReactSVG
                    src={exportIconBlack}
                    className={classes.icon}
                  ></ReactSVG>
                  Export to CSV
                </CSVLink>
              </div>
            </div>
          )}
      </div>
      <div className={classes.content}>
        <div className={classes.innerContent}>
          <div className={classes.analyticsGreenChart}>
            <div className={classes.heading}>
              <h3>{chartData.title}</h3>
              <div>
                <h2>{chartData.value}</h2>
                <span>{chartData.unit}</span>
              </div>
            </div>
            {analyticsSlug === "Total Project GHG emissions" ? (
              <PinkLineChart graphData={graphData} height={245} />
            ) : (
              <GreenAreaAnalyticsChart graphData={graphData} height={245} />
            )}
          </div>
          <figure className={classes.imageContainer}>
            <img src={formula} alt="Formula" />
          </figure>
          <div className={classes.data}>
            {parametersData.map((item, index) => (
              <div className={classes.singleItemInput} key={index}>
                <div className={classes.left}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
                {item.input ? (
                  <div className={classes.right}>
                    <span>Value</span>
                    <input
                      type="text"
                      name="value"
                      value={item.value}
                      disabled
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
