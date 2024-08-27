import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export const payload = async () => {
  return getPayloadHMR({ config: await configPromise });
};
