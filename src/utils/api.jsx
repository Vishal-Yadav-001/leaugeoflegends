import axios from "axios";
/**
 * for local dev use https://api.pandascore.co/lol/champions
 */
const API_KEY = "eNraJAvEMOVX0M_d7IfaecVTtJK_QiAXA-_qUL8WJckQX44PZ1U";
const baseUrl = "/api/";

/**
 * @returns {Array.<Object>} list of heros
 */
export const getListOfChampions = async (herosCount) => {
  const pageNumber = 1;
  const pageSize = (herosCount || 50);
  const config = {
    params: {
      "page[number]": pageNumber,
      "page[size]": pageSize,
      token: API_KEY,
    },
  };
  try {
    const response = await axios.get(`${baseUrl}`, config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {string} heroName used to fetch hero details
 */
export const getChampion = async (championName) => {
  const additionalDataURL = "https://lolbe2.azurewebsites.net/api/v1/champstaticdata";
  const config = {
    params: {
      "search[name]": championName,
      token: API_KEY,
    },
  };
  const additionalConfig = {
    params: {
      "champion": championName,
      
    },
  };
  
  try {
    const response = await axios.get(`${baseUrl}`, config);
    const additionalResponse = await axios.get(`${additionalDataURL}`,additionalConfig);
    const introduction = {"description":additionalResponse.data[0]?.introduction,"image":additionalResponse.data[0]?.image,class:additionalResponse.data[0]?.class};
    const finalResponse = [{...response.data[0],...introduction}];
    if(response && additionalResponse){
      return finalResponse;
    }
  } catch (error) {
    throw error;
  }
};
