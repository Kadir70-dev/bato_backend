// models/appointment.js

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.STRING,
    time12: DataTypes.STRING,
    time24: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    nurse_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    sub_total: DataTypes.STRING,
    discount_amount: DataTypes.STRING,
    extra_amount: DataTypes.STRING,
    full_amount: DataTypes.STRING,
    due_amount: DataTypes.STRING,
    appointment_start_date: DataTypes.STRING,
    appointment_end_date: DataTypes.STRING,
    appointment_start_time: DataTypes.STRING,
    appointment_end_time: DataTypes.STRING,
    appointment_start_between_end: DataTypes.TEXT,
    appointment_start_date_and_time: DataTypes.STRING,
    appointment_end_date_and_time: DataTypes.STRING,
    appointment_number: DataTypes.STRING,
    civil_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
    dob: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    note_allergy: DataTypes.TEXT,
    note_history: DataTypes.TEXT,
    note: DataTypes.TEXT,
    cancellation_reason: DataTypes.TEXT,
    description: DataTypes.TEXT,
    urgency_level: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    appointment_status: DataTypes.STRING,
    appointment_progress_status: DataTypes.STRING,
    file_number: DataTypes.STRING,
    amount_freez_status: DataTypes.STRING,
    appointment_fees: DataTypes.STRING,
    appointment_extra_fees: DataTypes.STRING,
    clinic_id: DataTypes.INTEGER,
    appointment_course_status: DataTypes.INTEGER,
    current_status: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    tableName: 'appointments',
    timestamps: false,
  });

  // You can define associations here, like:
  // Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id' });

  return Appointment;
};
