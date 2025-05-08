import httpRequest from "@/config/axios/axios.config";

export const getTables = async () => {
  try {
    const { data } = await httpRequest.get("/seats");
    return data;
  } catch (error) {
    console.log(error);
  }
};
