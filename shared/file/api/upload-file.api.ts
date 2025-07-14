import { apiClient } from "@/lib/http-client";

export type UploadFileProps = {
    file: File;
}
export async function uploadFile({file}:UploadFileProps): Promise<string>{
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
}