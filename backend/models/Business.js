const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  contactPerson: String,
  email: String,
  confirmEmail: String,
  phone: String,
  businessType: String,
  cooperationGoals: String,
  interestSolutions: String,
  comment: String,
});

module.exports = mongoose.model('BusinessOrders', businessSchema, 'BusinessOrders');