export type UploadFileProps = {
    file: File;
    signedUrl: string;
}
export async function uploadFile({ file, signedUrl}:UploadFileProps){
   const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type, // Supabase respects this
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
  }

  return response;
}