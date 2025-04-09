"use client"
import React, { useState } from "react";

const PersonalSettings = () => {
  const [formData, setFormData] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    profilePicture: null,
    notifications: {
      email: true,
      push: false,
    },
    theme: "light",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfilePictureChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleThemeToggle = () => {
    setFormData((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings: ", formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Personal Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Notifications */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-600 mb-1">
            Notifications
          </legend>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={formData.notifications.email}
                onChange={handleInputChange}
                className="mr-2 rounded border-gray-300 text-blue-600"
              />
              Email Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={formData.notifications.push}
                onChange={handleInputChange}
                className="mr-2 rounded border-gray-300 text-blue-600"
              />
              Push Notifications
            </label>
          </div>
        </fieldset>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Theme</label>
          <button
            type="button"
            onClick={handleThemeToggle}
            className={`py-2 px-4 rounded-md ${
              formData.theme === "light"
                ? "bg-gray-200"
                : "bg-gray-800 text-white"
            }`}
          >
            {formData.theme === "light"
              ? "Switch to Dark Mode"
              : "Switch to Light Mode"}
          </button>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalSettings;
