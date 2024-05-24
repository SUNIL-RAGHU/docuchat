const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const firebaseApp = require('../config/firebaseConfig');

const storage = getStorage(firebaseApp);

const uploadFile = async (file) => {
    try {
        const storageRef = ref(storage, `files/${file.originalname}`);
        const metadata = {
            contentType: file.mimetype
        };
        const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Failed to upload file:', error);
        throw error;
    }
};

module.exports = { uploadFile };
