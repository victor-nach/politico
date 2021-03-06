import db from '../models';

class PartyController {
  /**
    * 1. CREATE - create a new Party to the database
    * @method createParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was just created
  */

  static async createParty(req, res) {
    // user is expected to send the name and hqAddress, logoUrl in the req.body
    const {
      name, hqAddress, logoUrl,
    } = req.body;

    // sql to insert a row to our already created database
    const text = `INSERT INTO
        parties (name, hqAddress, logoUrl)
        values($1, $2, $3)
        returning *`;

    const values = [
      name,
      hqAddress,
      logoUrl,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
  // create Party end

  /**
    * 2. RETRIEVE - get a single Party
    * @method getSingleParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was requested for
  */

  static async getSingleParty(req, res) {
    // the id to be used is sent as a url parameter
    const { id } = req.params;

    // find the requested Party from mock remote database
    const text = 'SELECT * FROM parties WHERE id = $1';

    const values = [
      id,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
  // get single Party end


  /**
    * 3. RETRIEVE - get all political parties
    * @method getAllparties
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] An array Containing all the parties available
    */

  static async getAllparties(req, res) {
    // In this case no specific data is provided

    // return a  list of all the parties from the database
    const text = 'SELECT * FROM parties';

    try {
      const { rows } = await db.query(text);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
  // get all parties end


  /**
    * 4. UPDATE - update a single political Party
    * @method updateParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was updated
  */

  static async updateParty(req, res) {
    // the id and the new name to be used is sent as a url parameter
    const { id, name } = req.params;

    // sql to update just the name field in our database
    const text = `UPDATE parties
      SET name = $2
      WHERE id = $1 
      returning *`;

    const values = [
      id,
      name,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
  // update a single Party end


  /**
    * 5. DELETE - delete a single Party
    * @method deleteParty
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] The updated list of parties as an array
  */

  static async deleteParty(req, res) {
    // The id of the Party to be deleted is sent as a rquest parameter
    const { id } = req.params;

    // SQL to delete a row based on the specified id
    const text = 'DELETE FROM parties WHERE id = $1';

    const values = [
      id,
    ];

    try {
      await db.query(text, values);
      return res.status(200).json({
        status: 200,
        message: 'the party has been succesfully deleted',
      });
    } catch (error) {
      return res.status(400).send('sorry your request cannot be completed at this time');
    }
  }
  // delete a single Party end

// end of class
}

export default PartyController;
