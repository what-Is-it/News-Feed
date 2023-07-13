import axios from "axios";

const axiosHabr = axios.create({
  baseURL: "https://habr.com/ru/rss/all/all/",
  withCredentials: false,
});

const axios3d = axios.create({
  baseURL: "https://3dnews.ru/software/rss/",
  withCredentials: false,
});

export { axiosHabr, axios3d };
