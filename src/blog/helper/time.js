import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const formatter = buildFormatter({
  seconds: "less than a minute ago",
  minute: "about a minute ago",
  minutes: "%d minutes ago",
  hour: "1 hour ago",
  hours: "%d hours ago",
  day: "a day ago",
  days: "%d days ago",
  week: "about a week ago",
  weeks: "%d weeks ago",
  month: "about a month ago",
  months: "%d months ago",
  year: "about a year ago",
  years: "%d years ago",
});
