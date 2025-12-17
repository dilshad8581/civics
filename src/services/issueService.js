const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get ImageKit auth parameters for client-side uploads
async function getImageKitAuth() {
  const response = await fetch(`${API_BASE_URL}/imagekit/auth`);
  if (!response.ok) {
    throw new Error("Failed to get ImageKit auth");
  }
  return response.json();
}

// Upload a single image to ImageKit
async function uploadToImageKit(file, authParams) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY);
  formData.append("signature", authParams.signature);
  formData.append("expire", authParams.expire);
  formData.append("token", authParams.token);

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const result = await response.json();
  return result.url;
}

// Upload multiple images to ImageKit
async function uploadImages(files) {
  if (!files || files.length === 0) return [];

  const authParams = await getImageKitAuth();
  const uploadPromises = files.map((file) => uploadToImageKit(file, authParams));
  return Promise.all(uploadPromises);
}

export const issueService = {
  async submitIssue(issueData, imageFiles) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login to submit an issue");
    }

    // Upload images to ImageKit first
    const imageUrls = await uploadImages(imageFiles);

    // Prepare the request body
    const requestBody = {
      issueTitle: issueData.issueTitle,
      issueType: issueData.issueType,
      priorityLevel: issueData.priorityLevel,
      address: issueData.address,
      landmark: issueData.landmark,
      description: issueData.description,
      location: issueData.location,
      images: imageUrls,
    };

    const response = await fetch(`${API_BASE_URL}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || "Failed to submit issue");
    }

    return response.json();
  },

  async getIssues(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}/issues?${queryString}` : `${API_BASE_URL}/issues`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }

    return response.json();
  },

  async getMyIssues() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/issues/my-issues`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch your issues");
    }

    return response.json();
  },

  async getIssueById(id) {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch issue");
    }

    return response.json();
  },

  async getIssueStats() {
    const response = await fetch(`${API_BASE_URL}/issues/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch issue stats");
    }

    return response.json();
  },
};
