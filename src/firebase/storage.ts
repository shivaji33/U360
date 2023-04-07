import { getDownloadURL, getMetadata, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.init";

const BUCKET_URL = "gs://expense-tracker-9ac2e.appspot.com";

export async function uploadFileTOFirebaseStorage(file: File, uid: string) {
  const formatedDate = getFormatdeDate();
  const bucket = `${BUCKET_URL}/${uid}/${formatedDate}`;
  const storageRef = ref(storage, bucket);
  const data = await uploadBytes(storageRef, file);
  const finalUrl = await getDownloadURL(storageRef);
  return {rawURL: bucket,downloadURL: finalUrl, fileType: data.metadata.contentType, fileSize: data.metadata.size};
}

function getFormatdeDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export async function getDownloadUrl(url: string) {
  const storageRef = ref(storage, url);
  const data =  await getDownloadURL(storageRef);
  return data;
}

export async function getFileMetaData(url: string) {
  const storageRef = ref(storage, url);
  return await getMetadata(storageRef);
}
