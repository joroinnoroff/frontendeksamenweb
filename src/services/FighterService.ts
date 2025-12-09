import type { IFighter } from "../interfaces/IFighter";
import axios from "axios";

const endpoint = "http://localhost:5279/api/athlete";
const endpointImageUpload = "http://localhost:5279/api/athleteimageupload";

const getAllFighters = async () => {
  try {
    const response = await axios.get<IFighter[]>(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to get all fighters", error);
    return { success: false, data: null };
  }
};
// Opprett fighter + last opp bilde
const postFighter = async (
  fighter: Omit<IFighter, "id" | "image">,
  imageFile: File
): Promise<IFighter | null> => {
  try {
    // 1️⃣ Opprett fighter
    const fighterResponse = await axios.post(endpoint, fighter);
    const fighterId = fighterResponse.data.id; // <-- hent ID direkte

    if (!fighterId) {
      console.error("No fighterId returned from backend");
      return null;
    }

    // 2️⃣ Last opp bilde
    const formData = new FormData();
    formData.append("fighterId", fighterId.toString());
    formData.append("file", imageFile);

    const imageResponse = await axios.post(endpointImageUpload, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const savedFighter: IFighter = {
      ...fighter,
      id: fighterId,
      image: imageResponse.data.path || "",
      purchaseStatus: fighter.purchaseStatus,
    };

    return savedFighter;
  } catch (error) {
    console.error("Error saving fighter:", error);
    return null;
  }
};

const deleteFighter = async (fighter: IFighter): Promise<boolean> => {
  try {
    await axios.delete(`${endpoint}/${fighter.id}`);
    return true;
  } catch (error) {
    console.error("Error deleting fighter:", error);
    return false;
  }
};

const FighterService = {
  getAllFighters,
  postFighter,
  deleteFighter
};

export default FighterService;
