import { getPreferenceValues, ToastStyle, showToast, popToRoot } from "@raycast/api";
import axios from "axios";
import PiHoleResponse from "./PiHoleResponse";

export default async () => {
  const apiKey = getPreferenceValues().apiKey;
  const disable = async () => {
    const response = await axios.get<PiHoleResponse>(`http://192.168.1.25/admin/api.php?enable&auth=${apiKey}`);
    const data = response.data;
    if (data) {
      if (data.status === "enabled") {
        showToast(ToastStyle.Success, "Enabled", "Pi-Hole Enabled");
      } else {
        showToast(ToastStyle.Success, "Error", "An Error Occured");
      }
    }
  };
  await disable();
  popToRoot({ clearSearchBar: true });
};
