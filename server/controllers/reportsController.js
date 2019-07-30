// const express = require('express');
// const bodyParser = require('body-parser');
// const router = express.Router();

const moment = require('moment');
const helper = require('./helpers');
const db = require('../database/database');

const {
  validate_user, validate_redflag, validate_comment, validate_location, validate_login, validate_status,
} = require('../middleware/reportsMiddleware.js');
const { users, AllRedflag } = require('../models/data.js');


class recordsController {
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 */

  /*
	GET REQUESTS
	*/
  // homepage
  // async homepage(req, res) {
  //   res.send({ status: 200, data: 'Welcome to the iReporter api_enpoints' });
  // }

  async homepage(req, res) {
    res.render("index")
  }


  async getRecord(req, res){
    res.render("create_post/intervention")
  }
  /*
	GET REQUESTS - REDFLAG
	*/

  // get all redflags
  async getRedflags(req, res) {
    const getAllRedflags = 'SELECT * FROM incidents WHERE type = \'Redflag\' ';
    try {
      const { rows } = await db.query(getAllRedflags);
      res.send({ status: 200, data: [rows[0]] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // get specific redflag
  async getSpecificRedflag(req, res) {
    const getRedflag = 'SELECT * FROM incidents WHERE id = $1 AND type = \'Redflag\' ';
    try {
      const { rows } = await db.query(getRedflag, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'record not found' });
      }
      return res.status(200).send({ status: 200, data: [rows[0]] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  /*
	GET REQUESTS - USERS
  */
  
  // get sign out/in page
  async loginPage(req, res) {
    res.render("sign_in_and_out/sign-in")
  }

  async signUpPage(req, res) {
    res.render("sign_in_and_out/sign-up")
  }

  // get all users info
  async getUsersInfo(req, res) {
    const getAllUsers = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(getAllUsers);
      res.send({ status: 200, data: [rows[0]] });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // get a specific user post
  async getSpecificUserPost(req, res) {
    const getSpecificUser = 'SELECT * FROM incidents WHERE post_owner_id = $1 ';
    try {
      const { rows } = await db.query(getSpecificUser, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'post not found' });
      }

      return res.send({ status: 200, data: [rows[0]] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  /*
	GET REQUESTS - INTERVENTION
	*/

  // get specific intervention
  async getSpecificIntervention(req, res) {
    const getIntervention = 'SELECT * FROM incidents WHERE id = $1 AND type = \'Intervention\' ';
    try {
      const { rows } = await db.query(getIntervention, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'record not found' });
      }
      return res.send({ status: 200, data: [rows[0]] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  // get all interventions
  async getInterventions(req, res) {
    const getAllInterventions = 'SELECT * FROM incidents WHERE type = \'Intervention\' ';
    try {
      const { rows } = await db.query(getAllInterventions);
      res.send({ status: 200, data: [rows[0]] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /*
	POST REQUESTS
	*/
  // login
  async login(req, res) {
    const { email, password } = req.body;
    const result = validate_login(req.body);
    if (result.error) return res.status(400).send({ status: 400, error: result.error.details[0].message });

    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The email you provided is incorrect' });
      }
      if (!helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The password you provided is incorrect' });
      }
      const token = helper.generateToken(rows[0].id, rows[0].username);
      return res.header('x-auth-token', token).status(200).send({ status: 200, data: [{ token, user: rows[0] }] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }


  // signup page
  async signup(req, res) {
    const result = validate_user(req.body);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }

    const hashPassword = helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
		users(password,email,registered,firstname,lastname,othernames,username,isadmin,phonenumber)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
		returning *`;
    const values = [
      hashPassword,
      req.body.email,
      moment(new Date()),
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.username,
      false,
      req.body.phonenumber,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = helper.generateToken(rows[0].id, rows[0].username);
      res.header('x-auth-token', token).status(201).send({ status: 201, data: [{ token }] });
      res.redirect("api/v1")
      //
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that email or username already exist' });
      }
      console.log(error)
      return res.status(400).send(error);
    }
  }


  // create redflag or intervention record
  async createRecord(req, res) {
    const result = validate_redflag(req.body);
  		if (result.error) {
    	return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    if (!req.body.images) req.body.images = '';
    if (!req.body.videos) req.body.videos = '';
    const query = `INSERT INTO
		incidents(title,story,post_owner_id,created_by,type,latitude,longitude,status,images,videos)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
		returning *`;
    	const values = [
		    req.body.title.trim(),
		    req.body.story.trim(),
      req.user.id,
		    req.user.user,
		    req.body.type.trim(),
      req.body.latitude.trim(),
      req.body.longitude.trim(),
		    'draft',
		    req.body.images.trim(),
		    req.body.videos.trim(),
    ];

    try {
      const { rows } = await db.query(query, values);
      return res.status(201).send({ status: 201, data: [{ id: rows[0].id, message: 'Created red_flag post' }] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /*
	PATCH REQUESTS - REDFLAG
	*/

  // edit redflag story
  async editRedflagStory(req, res) {
  		const result = validate_comment(req.body);
  		if (result.error) {
		    return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE type = \'Redflag\' AND  id = $1';
    const updateRedflag = 'UPDATE incidents SET story = $1 WHERE id = $2 AND type = \'Redflag\' ';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('redflag record not found');
      }
      const { row } = await db.query(updateRedflag, [req.body.story, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated red-flags record\'s comment' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  // edit redflag status
  async editRedflagStatus(req, res) {
    const result = validate_status(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE type = \'Redflag\' AND  id = $1';
    const updateIntervention = 'UPDATE incidents SET status = $1 WHERE id = $2 AND type = \'Redflag\' ';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('Redflag record not found');
      }
      const { row } = await db.query(updateIntervention, [req.body.status, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated redflag record\'s status' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  // edit redflag loaction
  async editRedflagLocation(req, res) {
    const result = validate_location(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE type = \'Redflag\' AND id = $1';
    const updateRedflag = 'UPDATE incidents SET longitude = $1 , latitude = $2 WHERE id = $3 AND type = \'Redflag\' ';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('redflag record not found');
      }
      const { row } = await db.query(updateRedflag, [req.body.longitude, req.body.latitude, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated red-flags record\'s location' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  /*
	PATCH REQUESTS - INTERVENTION
	*/

  // edit intervention story
  async editInterventionStory(req, res) {
    const result = validate_comment(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE type = \'Intervention\' AND  id = $1';
    const updateIntervention = 'UPDATE incidents SET story = $1 WHERE id = $2 AND type = \'Intervention\' ';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('Intervention record not found');
      }
      const { row } = await db.query(updateIntervention, [req.body.story, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated interventiion record\'s story' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  // edit intervention status
  async editInterventionStatus(req, res) {
    const result = validate_status(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE type = \'Intervention\' AND  id = $1';
    const updateIntervention = 'UPDATE incidents SET status = $1 WHERE id = $2 AND type = \'Intervention\' ';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('Intervention record not found');
      }
      const { row } = await db.query(updateIntervention, [req.body.status, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated interventiion record\'s status' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  // edit intervention loaction
  async editInterventionLocation(req, res) {
  		const result = validate_location(req.body);
  		if (result.error) {
		    return res.status(400).send(result.error.details[0].message);
    }
    const findOne = 'SELECT * FROM incidents WHERE id = $1 AND type = \'Intervention\' ';
    const updateIntervention = 'UPDATE incidents SET longitude = $1 , latitude = $2 WHERE id = $3 AND type = \'Intervention\'';
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send('intervention record not found');
      }
      const { row } = await db.query(updateIntervention, [req.body.longitude, req.body.latitude, req.params.id]);
      return res.send({ status: 200, data: [{ id: req.params.id, message: 'Updated intervention record\'s location' }] });
    } catch (error) {
      res.status(400).send(error);
    }
  }


  /*
	DELETE REQUESTS
	*/
  // DELETE USER
  async deleteUser(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }


  // delete redflag record
  async deleteRedflagRecord(req, res) {
    const findOne = 'SELECT * FROM incidents WHERE type = \'Redflag\' AND id = $1';
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 AND type = \'Redflag\' returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Redflag not found' });
      }
      return res.status(204).send({ status: 204, data: [{ id: req.params.id, message: 'red_flag record has been deleted' }] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // delete intervention record
  async deleteInterventionRecord(req, res) {
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 AND type = \'Intervention\' returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'intervention not found' });
      }
      return res.status(204).send({ status: 204, data: [{ id: req.params.id, message: 'intervention record has been deleted' }] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = recordsController;
