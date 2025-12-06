import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://hunarmand.qaxramonov.uz",
  headers: { Accept: "application/json" },
});

export default customFetch;
