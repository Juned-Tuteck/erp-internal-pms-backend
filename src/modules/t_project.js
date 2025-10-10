const pool = require('../config/database');

const projectModule = {
  async getAllProjects() {
    try {
      const query = `
        SELECT
          id,
          project_number,
          name AS project_name,
          lead_id,
          project_type,
          customer_id,
          created_at,
          lead_id AS project_manager,
          estimated_start AS est_start_date,
          estimated_end AS est_end_date,
          kick_off AS kick_off_date,
          updated_at AS last_updated,
          estimated_price AS est_price,
          project_status AS status,
          warehouse_id,
          project_species,
          actual_start,
          actual_end,
          price_customer,
          actual_price,
          comment_baseline,
          comment_other,
          project_template_id,
          location,
          project_address,
          is_insured,
          insurance_no,
          insurance_from_date,
          insurance_to_date,
          approval_status,
          approval_comment,
          approved_by,
          approved_on,
          completion,
          created_by,
          updated_by,
          is_active,
          is_deleted
        FROM pms.t_project
        WHERE is_deleted = false
        ORDER BY created_at DESC
      `;

      const result = await pool.query(query);
      return {
        success: true,
        statusCode: 200,
        data: result.rows,
        clientMessage: 'Projects fetched successfully',
        devMessage: 'Query executed successfully'
      };
    } catch (error) {
      console.error('Error fetching all projects:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to fetch projects',
        devMessage: error.message
      };
    }
  },

  async getProjectById(id) {
    try {
      const query = `
        SELECT
          id,
          project_number,
          name AS project_name,
          lead_id,
          project_type,
          customer_id,
          created_at,
          lead_id AS project_manager,
          estimated_start AS est_start_date,
          estimated_end AS est_end_date,
          kick_off AS kick_off_date,
          updated_at AS last_updated,
          estimated_price AS est_price,
          project_status AS status,
          warehouse_id,
          project_species,
          actual_start,
          actual_end,
          price_customer,
          actual_price,
          comment_baseline,
          comment_other,
          project_template_id,
          location,
          project_address,
          is_insured,
          insurance_no,
          insurance_from_date,
          insurance_to_date,
          approval_status,
          approval_comment,
          approved_by,
          approved_on,
          completion,
          created_by,
          updated_by,
          is_active,
          is_deleted
        FROM pms.t_project
        WHERE id = $1 AND is_deleted = false
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return {
          success: false,
          statusCode: 404,
          data: null,
          clientMessage: 'Project not found',
          devMessage: 'No project found with the given ID'
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: result.rows[0],
        clientMessage: 'Project fetched successfully',
        devMessage: 'Query executed successfully'
      };
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to fetch project',
        devMessage: error.message
      };
    }
  },

  async createProject(projectData) {
    try {
      const {
        lead_id,
        warehouse_id,
        project_species,
        name,
        project_type,
        project_status,
        estimated_start,
        estimated_end,
        actual_start,
        actual_end,
        price_customer,
        estimated_price,
        actual_price,
        kick_off,
        comment_baseline,
        comment_other,
        project_template_id,
        customer_id,
        location,
        project_address,
        project_number,
        is_insured,
        insurance_no,
        insurance_from_date,
        insurance_to_date,
        approval_status,
        approval_comment,
        approved_by,
        approved_on,
        completion,
        created_by
      } = projectData;

      const query = `
        INSERT INTO pms.t_project (
          lead_id,
          warehouse_id,
          project_species,
          name,
          project_type,
          project_status,
          estimated_start,
          estimated_end,
          actual_start,
          actual_end,
          price_customer,
          estimated_price,
          actual_price,
          kick_off,
          comment_baseline,
          comment_other,
          project_template_id,
          customer_id,
          location,
          project_address,
          project_number,
          is_insured,
          insurance_no,
          insurance_from_date,
          insurance_to_date,
          approval_status,
          approval_comment,
          approved_by,
          approved_on,
          completion,
          created_by,
          created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
          $31, NOW()
        )
        RETURNING *
      `;

      const values = [
        lead_id || null,
        warehouse_id || null,
        project_species || null,
        name || null,
        project_type || null,
        project_status || null,
        estimated_start || null,
        estimated_end || null,
        actual_start || null,
        actual_end || null,
        price_customer || null,
        estimated_price || null,
        actual_price || null,
        kick_off || null,
        comment_baseline || null,
        comment_other || null,
        project_template_id || null,
        customer_id || null,
        location || null,
        project_address || null,
        project_number || null,
        is_insured || false,
        insurance_no || null,
        insurance_from_date || null,
        insurance_to_date || null,
        approval_status || 'PENDING',
        approval_comment || null,
        approved_by || null,
        approved_on || null,
        completion || 0,
        created_by
      ];

      const result = await pool.query(query, values);

      return {
        success: true,
        statusCode: 201,
        data: result.rows[0],
        clientMessage: 'Project created successfully',
        devMessage: 'Insert query executed successfully'
      };
    } catch (error) {
      console.error('Error creating project:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to create project',
        devMessage: error.message
      };
    }
  },

  async updateProject(id, projectData) {
    try {
      const {
        lead_id,
        warehouse_id,
        project_species,
        name,
        project_type,
        project_status,
        estimated_start,
        estimated_end,
        actual_start,
        actual_end,
        price_customer,
        estimated_price,
        actual_price,
        kick_off,
        comment_baseline,
        comment_other,
        project_template_id,
        customer_id,
        location,
        project_address,
        project_number,
        is_insured,
        insurance_no,
        insurance_from_date,
        insurance_to_date,
        approval_status,
        approval_comment,
        approved_by,
        approved_on,
        completion,
        updated_by,
        is_active
      } = projectData;

      const query = `
        UPDATE pms.t_project
        SET
          lead_id = COALESCE($1, lead_id),
          warehouse_id = COALESCE($2, warehouse_id),
          project_species = COALESCE($3, project_species),
          name = COALESCE($4, name),
          project_type = COALESCE($5, project_type),
          project_status = COALESCE($6, project_status),
          estimated_start = COALESCE($7, estimated_start),
          estimated_end = COALESCE($8, estimated_end),
          actual_start = COALESCE($9, actual_start),
          actual_end = COALESCE($10, actual_end),
          price_customer = COALESCE($11, price_customer),
          estimated_price = COALESCE($12, estimated_price),
          actual_price = COALESCE($13, actual_price),
          kick_off = COALESCE($14, kick_off),
          comment_baseline = COALESCE($15, comment_baseline),
          comment_other = COALESCE($16, comment_other),
          project_template_id = COALESCE($17, project_template_id),
          customer_id = COALESCE($18, customer_id),
          location = COALESCE($19, location),
          project_address = COALESCE($20, project_address),
          project_number = COALESCE($21, project_number),
          is_insured = COALESCE($22, is_insured),
          insurance_no = COALESCE($23, insurance_no),
          insurance_from_date = COALESCE($24, insurance_from_date),
          insurance_to_date = COALESCE($25, insurance_to_date),
          approval_status = COALESCE($26, approval_status),
          approval_comment = COALESCE($27, approval_comment),
          approved_by = COALESCE($28, approved_by),
          approved_on = COALESCE($29, approved_on),
          completion = COALESCE($30, completion),
          updated_by = $31,
          updated_at = NOW(),
          is_active = COALESCE($32, is_active)
        WHERE id = $33 AND is_deleted = false
        RETURNING *
      `;

      const values = [
        lead_id,
        warehouse_id,
        project_species,
        name,
        project_type,
        project_status,
        estimated_start,
        estimated_end,
        actual_start,
        actual_end,
        price_customer,
        estimated_price,
        actual_price,
        kick_off,
        comment_baseline,
        comment_other,
        project_template_id,
        customer_id,
        location,
        project_address,
        project_number,
        is_insured,
        insurance_no,
        insurance_from_date,
        insurance_to_date,
        approval_status,
        approval_comment,
        approved_by,
        approved_on,
        completion,
        updated_by,
        is_active,
        id
      ];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return {
          success: false,
          statusCode: 404,
          data: null,
          clientMessage: 'Project not found',
          devMessage: 'No project found with the given ID'
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: result.rows[0],
        clientMessage: 'Project updated successfully',
        devMessage: 'Update query executed successfully'
      };
    } catch (error) {
      console.error('Error updating project:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to update project',
        devMessage: error.message
      };
    }
  },

  async deleteProject(id) {
    try {
      const query = `
        UPDATE pms.t_project
        SET is_deleted = true, updated_at = NOW()
        WHERE id = $1 AND is_deleted = false
        RETURNING id
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return {
          success: false,
          statusCode: 404,
          data: null,
          clientMessage: 'Project not found',
          devMessage: 'No project found with the given ID'
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: { id: result.rows[0].id },
        clientMessage: 'Project deleted successfully',
        devMessage: 'Soft delete query executed successfully'
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to delete project',
        devMessage: error.message
      };
    }
  },

  async hardDeleteProject(id) {
    try {
      const query = `
        DELETE FROM pms.t_project
        WHERE id = $1
        RETURNING id
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return {
          success: false,
          statusCode: 404,
          data: null,
          clientMessage: 'Project not found',
          devMessage: 'No project found with the given ID'
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: { id: result.rows[0].id },
        clientMessage: 'Project permanently deleted',
        devMessage: 'Hard delete query executed successfully'
      };
    } catch (error) {
      console.error('Error hard deleting project:', error);
      return {
        success: false,
        statusCode: 500,
        data: null,
        clientMessage: 'Failed to permanently delete project',
        devMessage: error.message
      };
    }
  }
};

module.exports = projectModule;
