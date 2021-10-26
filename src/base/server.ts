import Axios, { AxiosResponse } from "axios";
const server = Axios.create({
  baseURL: "YOUR_URL",
  timeout: 2000,
});

const getItems = async function ({
  domain = "",
  page = 1,
  limit = 10,
}): Promise<AxiosResponse | false> {
  try {
    const response = await server.post("/list_keyword_info_for_domain", {
      firstDate: "2020-02-20",
      lastDate: "2020-02-25",
      domain,
      limit,
      page,
    });
    return response;
  } catch (error) {
    return false;
  }
};
const getItemDetails = async function ({
  keyword = "ankara",
  country = "tr",
  lang = "tr",
}): Promise<AxiosResponse | false> {
  try {
    const response = await server.post("/get_specific_search_volume", {
      keyword,
      country,
      lang,
    });
    return response;
  } catch (error) {
    return false;
  }
};

export default {
  getItems,
  getItemDetails,
};
