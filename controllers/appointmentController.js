const db = require('../models');
const Appointment = db.Appointment;

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
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

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment' });
  }
};
