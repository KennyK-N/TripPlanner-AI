import { prisma } from "#backend/prisma/prisma.client.js";

class Task {
  constructor() {
    this.client = prisma;
  }

  async createTask({
    projectName,
    startDate,
    endDate,
    data,
    userId,
    temp,
    precipitation,
  }) {
    try {
      const task = await this.client.task.create({
        data: {
          userId,
          projectName,
          startDate,
          endDate,
          data,

          weather: {
            create: {
              temp,
              precipitation,
            },
          },
        },
        include: {
          weather: true,
        },
      });

      return {
        success: true,
        msg: "Task created successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to create task",
        data: null,
      };
    }
  }

  async viewTask({ taskId, userId }) {
    try {
      const task = await this.client.task.findFirst({
        where: {
          id: taskId,
          userId,
        },
        include: {
          weather: true,
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      return {
        success: true,
        msg: "Task fetched successfully",
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to fetch task",
        data: null,
      };
    }
  }

  async SearchTaskIds({ projectName, userId }) {
    try {
      const tasks = await this.client.task.findMany({
        where: {
          projectName: {
            contains: projectName,
            mode: "insensitive",
          },
          userId,
        },
        select: {
          id: true,
          projectName: true,
        },
      });

      if (tasks.length === 0) {
        throw new Error("Task not found");
      }

      return {
        success: true,
        msg: "Tasks fetched successfully",
        data: tasks,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to fetch tasks",
        data: null,
      };
    }
  }

  async getTaskIds({ userId, page = 1, limit = 10 }) {
    try {
      const skip = (page - 1) * limit;

      const taskIds = await this.client.task.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
        skip,
        take: limit,
        orderBy: {
          id: "asc",
        },
      });

      if (taskIds.length === 0) {
        throw new Error("Task not found");
      }

      return {
        success: true,
        msg: "Task IDs fetched successfully",
        data: taskIds,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to fetch task IDs",
        data: null,
      };
    }
  }

  async deleteTask({ taskId, userId }) {
    try {
      await this.client.$transaction(async (tx) => {
        const task = await tx.task.findFirst({
          where: {
            id: taskId,
            userId,
          },
        });

        if (!task) {
          throw new Error("Task not found");
        }

        await tx.task.delete({
          where: {
            id: taskId,
          },
        });
      });

      return {
        success: true,
        msg: "Task deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to delete task",
        data: null,
      };
    }
  }

  async deleteAllTasks({ userId }) {
    try {
      const result = await this.client.task.deleteMany({
        where: {
          userId,
        },
      });

      return {
        success: true,
        msg: "Tasks deleted successfully",
        data: {
          deletedCount: result.count,
        },
      };
    } catch (error) {
      return {
        success: false,
        msg: error.message || "Failed to delete tasks",
        data: null,
      };
    }
  }
}

export default new Task();
