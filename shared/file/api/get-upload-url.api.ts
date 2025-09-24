import { apiClient } from "@/lib/http-client";

export type GetUploadUrlResponse = {
  signedUploadUrl: string;
  fileKey: string;
};
export type GetUploadUrlProps = {
    file: File;
}
export async function getUploadUrl({file}: GetUploadUrlProps): Promise<GetUploadUrlResponse>{
    const filePath = `${Date.now()}_${file.name}`
      .trim()
      .replace(/\s+/g, '_') // replace whitespace with underscores
      .replace(/[^a-zA-Z0-9._-]/g, '_');
    const response = await apiClient.get(`/files/${filePath}/upload/signed-url`);
    return {signedUploadUrl: response.data, fileKey: filePath};
}