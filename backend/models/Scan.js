// models/Scan.js
const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upc: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: 'Unknown'
  },
  servingSize: {
    type: String,
    required: true
  },
  totalCarbs: {
    type: Number,
    required: true
  },
  nutrients: {
    type: Object,
    default: {}
  },
  scannedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', ScanSchema);
