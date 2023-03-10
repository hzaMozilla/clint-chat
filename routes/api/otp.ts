import express from 'express';
import Nexmo from 'nexmo';
const nexmo = new Nexmo({
  apiKey: '87b59597',
  apiSecret: 'kcd04pz98799OwiQ'
});
const router = express.Router();
router.post('/send', (_req: any, _res: any) => {
  // Send SMS
  nexmo.verify.request(
    {
      number: '18017884331',
      brand: 'Pixs',
      code_length: '6'
    },
    // eslint-disable-next-line camelcase
    (err: any, result: { request_id: string; }) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        // const verifyRequestId = request_id;
      }
    }
  );
});
export default router;
