const db = require('../models');
const Appointment = db.Appointment;
const { Op } = require('sequelize');


const checkConflict = async (doctor_id, appointment_start_time, appointment_end_time, excludeAppointmentId = null) => {
  const whereClause = {
    doctor_id,
    // Check overlap:
    [Op.or]: [
      {
        appointment_start_time: {
          [Op.between]: [appointment_start_time, appointment_end_time]
        }
      },
      {
        appointment_end_time: {
          [Op.between]: [appointment_start_time, appointment_end_time]
        }
      },
      {
        appointment_start_time: {
          [Op.lte]: appointment_start_time
        },
        appointment_end_time: {
          [Op.gte]: appointment_end_time
        }
      }
    ]
  };

  if (excludeAppointmentId) {
    whereClause.id = { [Op.ne]: excludeAppointmentId };
  }

  const existing = await Appointment.findOne({ where: whereClause });
  return !!existing; // true if conflict exists
};



exports.createAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_start_time, appointment_end_time } = req.body;

    if (!doctor_id || !appointment_start_time || !appointment_end_time) {
      return res.status(400).json({ message: "doctor_id, appointment_start_time, and appointment_end_time are required" });
    }

    // Convert to Date objects (or ISO string) for consistent DB comparison
    const startTime = new Date(appointment_start_time);
    const endTime = new Date(appointment_end_time);

    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ message: "Invalid appointment_start_time or appointment_end_time" });
    }

    const conflict = await checkConflict(doctor_id, startTime, endTime);
    if (conflict) {
      return res.status(409).json({ message: "This doctor already has an appointment during this time." });
    }

    // Override the times in req.body with valid ISO strings or Date objects
    req.body.appointment_start_time = startTime;
    req.body.appointment_end_time = endTime;

    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating appointment' });
  }
};



// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Get Appointments by patient_id
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patient_id: req.params.patientId }
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    await Appointment.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Appointment updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update appointment' });
  }
};


// // Update Appointment
// exports.updateAppointment = async (req, res) => {
//   try {
//     const { doctor_id, appointment_start_time } = req.body;
//     const appointmentId = req.params.id;

//     if (!doctor_id || !appointment_start_time) {
//       return res.status(400).json({ message: "doctor_id and appointment_start_time are required" });
//     }

//     const conflict = await checkConflict(doctor_id, appointment_start_time, appointmentId);
//     if (conflict) {
//       return res.status(409).json({ message: "This doctor already has an appointment at this time." });
//     }

//     await Appointment.update(req.body, { where: { id: appointmentId } });
//     res.json({ message: 'Appointment updated' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update appointment' });
//   }
// };

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment' });
  }
};
