import axios from "axios"
import type { IFinance } from "../interfaces/IFinance"
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces"


const endpoint = "/finance"

const getFinance = async (): Promise<IDefaultResponse<IFinance>> => {
  try {
    const response = await axios.get(endpoint)

    return { success: true, data: response.data }
      ;
  } catch (error) {
    return { success: false }
  }
};

const updateFinance = async (finance: IFinance): Promise<IDefaultResponse> => {
  try {
    await axios.put(endpoint + "/" + finance.id, finance);
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export default {
  getFinance,
  updateFinance
}