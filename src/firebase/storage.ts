import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.init";

const BUCKET_URL = 'gs://expense-tracker-9ac2e.appspot.com';

export async function uploadFileTOFirebaseStorage(file: File, uid: string) {
    const formatedDate = getFormatdeDate();
    const bucket = `${BUCKET_URL}/${uid}/${formatedDate}`;
    const storageRef = ref(storage, bucket);
    await uploadBytes(storageRef,file);
    return bucket;
}

function getFormatdeDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}