import http from "./api";

/***
 * Scrape a recipe from a URL
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
export const scrapeRecipeUrl = async (url: string) => {
  try {
    const res = await http.get(`/s/scrape/`, { params: { url: url } });
    return res;
  } catch (error) {
    console.error(error);
  }
};
