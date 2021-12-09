import { getPreferenceValues, ToastStyle, showToast, popToRoot } from "@raycast/api";
import axios from "axios";
import PiHoleResponse from "./PiHoleResponse";

export default async () => {
  const apiKey = getPreferenceValues().apiKey;
  const disable = async () => {
    const response = await axios.get<PiHoleResponse>(`http://192.168.1.25/admin/api.php?disable=300&auth=${apiKey}`);
    const data = response.data;
    if (data) {
      if (data.status === "disabled") {
        showToast(ToastStyle.Success, "Disabled", "Disabled Pi-Hole for 5 Minutes");
      } else {
        showToast(ToastStyle.Failure, "Error", "An Error Occured");
      }
    }
  };
  await disable();
  popToRoot({ clearSearchBar: true });
};
