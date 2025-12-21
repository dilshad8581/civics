import { MapPin, Calendar, ThumbsUp, MessageCircle } from "lucide-react";
import { Avatar, Badge } from "../../common";
import { ISSUE_EMOJIS } from "../../../constants";

const ComplaintCard = ({ complaint, onUpvote, onClick }) => {
  const {
    _id,
    issueTitle,
    issueType,
    description,
    address,
    status,
    images,
    createdAt,
    upvotes = 0,
    comments = 0,
    reportedBy,
  } = complaint;

  const getStatusVariant = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      case "Pending":
        return "error";
      default:
        return "info";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const emoji = ISSUE_EMOJIS[issueType] || "📋";

  const handleUpvoteClick = (e) => {
    e.stopPropagation();
    onUpvote?.(_id);
  };

  return (
    <div
      onClick={() => onClick?.(complaint)}
      className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={issueTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl">{emoji}</span>
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant={getStatusVariant(status)} gradient>
            {status}
          </Badge>
        </div>

        {/* Image Count Badge */}
        {images && images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            +{images.length - 1} more
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Issue Type Tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{emoji}</span>
          <span className="text-sm font-medium text-gray-600">{issueType}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {issueTitle}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {truncateText(description, 80)}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="truncate">{address || "Location not specified"}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <Avatar name={reportedBy?.name} size="sm" showRing={false} />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                {reportedBy?.name || "Anonymous"}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpvoteClick}
              className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-medium">{upvotes}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
