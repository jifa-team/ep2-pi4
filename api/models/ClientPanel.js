const mongoose = require('mongoose');

const clientPanelSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferences: Object,
  lastAccess:  Date
});

module.exports = mongoose.model('ClientPanel', clientPanelSchema);
