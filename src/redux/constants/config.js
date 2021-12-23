import { baseUrl } from "./url";
const token = localStorage.getItem("token");

export const fetchFeesTableDataConfig = {
  method: "GET",
  url: `${baseUrl}/api/list_schema`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

