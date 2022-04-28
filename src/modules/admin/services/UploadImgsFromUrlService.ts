import admin from 'firebase-admin';
import uuid from 'uuid-v4';
import { stringifyArray } from '../../../common/helpers/string';

import firebaseServiceKeys from '../../../firebaseServiceKeys.json';

/// get node-fetch
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: unknown[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};

/// connect to firebase
admin.initializeApp({
  credential: admin.credential.cert(
    firebaseServiceKeys as admin.ServiceAccount
  ),
  storageBucket: 'oto-a6dev.appspot.com',
});
const bucket = admin.storage().bucket();

class UploadImgsFromUrlService {
  private fetchFile(link: string) {
    return new Promise((resolve) => {
      resolve(fetch(link));
    });
  }

  async uploadImgsToFirebase(urls: Array<string> | string) {
    if (typeof urls === 'object') {
      const fetchFilePromises = urls.map((url) => this.fetchFile(url));
      const responseFromFetchFiles = await Promise.all(fetchFilePromises);
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const newUrls = responseFromFetchFiles.map((response: any) => {
        const newUrl = response.url.replace('https://img.tinbanxe.vn/', '');
        // const file = bucket.file('path/to/image.jpg');
        const file = bucket.file(newUrl);

        const contentType = response.headers.get('content-type');
        const writeStream = file.createWriteStream({
          metadata: {
            contentType,
            metadata: {
              myValue: uuid(),
            },
          },
        });
        response.body.pipe(writeStream);
        return newUrl;
      });
      return stringifyArray(newUrls);
    }
  }
}

export default UploadImgsFromUrlService;
