import { prisma } from "#backend/prisma/prisma.client.js";

class UserSetting {
  constructor() {
    this.client = prisma;
  }

  async updateEmailNotification({ userId, emailNotification }) {
    try {
      const setting = await this.client.setting.upsert({
        where: {
          userId,
        },
        update: {
          emailNotification,
        },
        create: {
          userId,
          emailNotification,
          confirmDelete: false,
          darkMode: false,
        },
      });

      return {
        success: true,
        msg: "Email notification setting updated successfully",
        data: setting,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to update email notification setting",
        data: null,
      };
    }
  }

  async updateConfirmDelete({ userId, confirmDelete }) {
    try {
      const setting = await this.client.setting.upsert({
        where: {
          userId,
        },
        update: {
          confirmDelete,
        },
        create: {
          userId,
          confirmDelete,
          emailNotification: false,
          darkMode: false,
        },
      });

      return {
        success: true,
        msg: "Confirm delete setting updated successfully",
        data: setting,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to update confirm delete setting",
        data: null,
      };
    }
  }

  async updateDarkMode({ userId, darkMode }) {
    try {
      const setting = await this.client.setting.upsert({
        where: {
          userId,
        },
        update: {
          darkMode,
        },
        create: {
          userId,
          darkMode,
          emailNotification: false,
          confirmDelete: false,
        },
      });

      return {
        success: true,
        msg: "Dark mode setting updated successfully",
        data: setting,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to update dark mode setting",
        data: null,
      };
    }
  }

  async getSetting({ userId }) {
    try {
      const setting = await this.client.setting.upsert({
        where: {
          userId,
        },
        update: {},
        create: {
          userId,
          emailNotification: false,
          confirmDelete: false,
          darkMode: false,
        },
      });

      return {
        success: true,
        msg: "Settings fetched successfully",
        data: setting,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to fetch settings",
        data: null,
      };
    }
  }
}

export default new UserSetting();
