import db from '../models';

class VotingController {
  /**
      * 1.@method vote candidate
      * @description registers a new user
      * @parameters {object} req
      * @parameters {object} res
      * @return {object} JSON API response
    */

  static async vote(req, res) {
    // get expected information from body
    const { createdBy, officeId, candidateId } = req.body;

    const queryText = 'INSERT INTO votes (createdBy, officeId, candidateId) VALUES ($1, $2, $3) RETURNING *';
    const values = [createdBy, officeId, candidateId];

    try {
      const { rows } = await db.query(queryText, values);
      return res.status(201).json({
        status: 201,
        data: [{
          status: 201,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error === '_bt_check_unique') {
        res.status(409).json({
          status: 409,
          message: 'you cannot vote for a candidate more than once',
        });
      }
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
}

export default VotingController;
