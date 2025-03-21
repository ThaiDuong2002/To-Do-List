import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

dotenv.config();
const SCHEDULER_CONFIG = process.env.SCHEDULER_CONFIG || "0 * * * *";

const schedule = cron.schedule(SCHEDULER_CONFIG, async () => {
  const overdueQuery = `
            SELECT TaskID, Title, DueDate
            FROM Tasks
            WHERE DueDate < NOW() AND Status != 'Completed'
        `;
  const [overdueTasks] = await db().query<RowDataPacket[]>(overdueQuery);

  for (const task of overdueTasks) {
    const notificationId = uuidv4();
    const message = `Task "${task.Title}" is overdue!`;

    const insertQuery = `
                INSERT INTO Notifications (NotificationID, TaskID, NotificationType, Message)
                VALUES (?, ?, 'Overdue', ?)
            `;
    await db().query(insertQuery, [notificationId, task.TaskID, message]);
  }

  // Find upcoming tasks
  const upcomingQuery = `
            SELECT TaskID, Title, DueDate
            FROM Tasks
            WHERE DueDate BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 DAY) AND Status != 'Completed'
        `;
  const [upcomingTasks] = await db().query<RowDataPacket[]>(upcomingQuery);

  for (const task of upcomingTasks) {
    const notificationId = uuidv4();
    const message = `Task "${task.Title}" is due soon!`;

    const insertQuery = `
                INSERT INTO Notifications (NotificationID, TaskID, NotificationType, Message)
                VALUES (?, ?, 'Upcoming', ?)
            `;
    await db().query(insertQuery, [notificationId, task.TaskID, message]);
  }

  console.log("Notification job executed successfully.");
});

export default schedule;
