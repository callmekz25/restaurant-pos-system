import httpRequest from "@/config/axios/axios.config";
import IViolationRequest from "@/interfaces/violation/violationRequest";

export const getViolations = async () => {
  try {
    const { data } = await httpRequest.get("/violations");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addViolation = async (request: IViolationRequest) => {
  try {
    const { data } = await httpRequest.post("/violations", request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
