import { getZBD } from '@/services/zbd';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Get zbd client
    const { zbd } = getZBD(res);

    try {
      // Deconstruct body
      const {
        amount,
        expiresIn,
        internalId,
        callbackUrl,
        description,
      } = JSON.parse(req.body);

      // Construct payload
      const payload = {
        amount,
        expiresIn,
        internalId,
        callbackUrl,
        description,
      }

      // Creating Charge / Payment Request
      const result = await zbd.createCharge(payload);

      // Returning JSON payload
      return res.status(200).json({ ...result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } else if (req. method === 'GET') {
    // Get zbd client
    const { zbd } = getZBD(res);

    try {
      // Deconstruct query
      const { chargeId } = req.query;

      // Get Charge
      const result = await zbd.getCharge(chargeId);

      // Returning JSON payload
      return res.status(200).json({ ...result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
