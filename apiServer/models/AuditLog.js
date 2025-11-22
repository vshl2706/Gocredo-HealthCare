const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }, // LOGIN_SUCCESS, PROFILE_UPDATE, etc.
    ip: String,
    userAgent: String,
    metadata: {}, // keep minimal & non-PHI
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
