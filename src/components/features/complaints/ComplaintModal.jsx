import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Calendar,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Tag,
  Flag,
  Navigation,
  Eye,
  Edit3,
  Shield,
} from "lucide-react";
import { Avatar } from "../../common";
import { ISSUE_TYPES, PRIORITY_LEVELS, ISSUE_EMOJIS } from "../../../constants";

const ComplaintModal = ({ complaint, isOpen, onClose, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    issueTitle: "",
    issueType: "",
    priorityLevel: "",
    address: "",
    landmark: "",
    description: "",
    status: "",
  });

  // Store original data to detect changes
  const [originalData, setOriginalData] = useState({});

  // Get current user info
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isOwner = currentUser._id === complaint?.reportedBy?._id;
  const isAdmin = currentUser.role === "Admin";
  const canEditDetails = isOwner; // Only owner can edit details
  const canChangeStatus = isAdmin; // Only admin can change status
  const canEdit = canEditDetails || canChangeStatus; // Can make any changes

  // Initialize form data when complaint changes
  useEffect(() => {
    if (complaint) {
      const data = {
        issueTitle: complaint.issueTitle || "",
        issueType: complaint.issueType || "",
        priorityLevel: complaint.priorityLevel || "",
        address: complaint.address || "",
        landmark: complaint.landmark || "",
        description: complaint.description || "",
        status: complaint.status || "Pending",
      };
      setFormData(data);
      setOriginalData(data);
      setCurrentImageIndex(0);
      setHasChanges(false);
    }
  }, [complaint]);

  if (!isOpen || !complaint) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Check if there are any changes
    const changed = Object.keys(newFormData).some(
      (key) => newFormData[key] !== originalData[key]
    );
    setHasChanges(changed);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      // Only send the fields that the user is allowed to edit
      let updateData = {};

      if (canEditDetails) {
        // Owner can edit all details except status
        updateData = {
          issueTitle: formData.issueTitle,
          issueType: formData.issueType,
          priorityLevel: formData.priorityLevel,
          address: formData.address,
          landmark: formData.landmark,
          description: formData.description,
        };
      }

      if (canChangeStatus) {
        // Admin can change status
        updateData.status = formData.status;
      }

      await onSave(complaint._id, updateData);
      setOriginalData(formData);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return CheckCircle;
      case "In Progress":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const images = complaint.images || [];
  const emoji = ISSUE_EMOJIS[formData.issueType] || "📋";
  const StatusIcon = getStatusIcon(formData.status);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Get role badge info
  const getRoleBadge = () => {
    if (isOwner && isAdmin) {
      return { text: "Owner & Admin", icon: Shield, color: "from-purple-500 to-indigo-500" };
    }
    if (isOwner) {
      return { text: "Your Report", icon: Edit3, color: "from-green-500 to-emerald-500" };
    }
    if (isAdmin) {
      return { text: "Admin Mode", icon: Shield, color: "from-blue-500 to-indigo-500" };
    }
    return { text: "View Only", icon: Eye, color: "from-gray-400 to-gray-500" };
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h2 className="font-bold text-gray-800">
                {canEdit ? "Edit Issue Report" : "View Issue Report"}
              </h2>
              <p className="text-xs text-gray-500">
                {canEditDetails && canChangeStatus
                  ? "You can edit all details and status"
                  : canEditDetails
                  ? "You can edit issue details"
                  : canChangeStatus
                  ? "You can change the status"
                  : "You are viewing this report"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Role Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${roleBadge.color} text-white text-xs font-medium`}>
              <roleBadge.icon className="w-3.5 h-3.5" />
              {roleBadge.text}
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white rounded-full transition-all"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-h-[calc(90vh-140px)] overflow-hidden">
          {/* Image Section */}
          <div className="relative w-full md:w-2/5 h-56 md:h-auto bg-gray-100 flex-shrink-0">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={complaint.issueTitle}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-6xl">{emoji}</span>
              </div>
            )}

            {/* Reporter Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center gap-3">
                <Avatar name={complaint.reportedBy?.name} size="sm" showRing={false} />
                <div>
                  <p className="text-sm font-medium text-white">
                    {complaint.reportedBy?.name || "Anonymous"}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(complaint.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-3/5 p-6 overflow-y-auto">
            <div className="space-y-5">
              {/* Issue Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  Issue Title
                </label>
                <input
                  type="text"
                  name="issueTitle"
                  value={formData.issueTitle}
                  onChange={handleInputChange}
                  disabled={!canEditDetails}
                  placeholder="Enter issue title"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all ${
                    canEditDetails
                      ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Issue Type & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 text-green-500" />
                    Issue Type
                  </label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    disabled={!canEditDetails}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all ${
                      canEditDetails
                        ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white cursor-pointer"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  >
                    {ISSUE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {ISSUE_EMOJIS[type]} {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Flag className="w-4 h-4 text-green-500" />
                    Priority Level
                  </label>
                  <select
                    name="priorityLevel"
                    value={formData.priorityLevel}
                    onChange={handleInputChange}
                    disabled={!canEditDetails}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all ${
                      canEditDetails
                        ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white cursor-pointer"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  >
                    {PRIORITY_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status - Only Admin can change */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <StatusIcon className="w-4 h-4 text-green-500" />
                  Status
                  {!canChangeStatus && (
                    <span className="text-xs text-gray-400 font-normal">(Admin only)</span>
                  )}
                </label>
                <div className="flex gap-3">
                  {["Pending", "In Progress", "Resolved"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => canChangeStatus && handleInputChange({ target: { name: "status", value: status } })}
                      disabled={!canChangeStatus}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                        formData.status === status
                          ? status === "Resolved"
                            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md"
                            : status === "In Progress"
                            ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md"
                            : "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-md"
                          : canChangeStatus
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!canEditDetails}
                  placeholder="Enter street address"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all ${
                    canEditDetails
                      ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Navigation className="w-4 h-4 text-green-500" />
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  disabled={!canEditDetails}
                  placeholder="Near any landmark?"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all ${
                    canEditDetails
                      ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <AlertCircle className="w-4 h-4 text-green-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!canEditDetails}
                  rows={4}
                  placeholder="Describe the issue in detail..."
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none transition-all resize-none ${
                    canEditDetails
                      ? "focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50/50 hover:bg-white"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            {hasChanges && canEdit && (
              <span className="text-sm text-amber-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                Unsaved changes
              </span>
            )}
            {!canEdit && (
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                View only mode
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              {canEdit ? "Cancel" : "Close"}
            </button>
            {canEdit && (
              <button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComplaintModal;
