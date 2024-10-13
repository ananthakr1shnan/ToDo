const connectDB = require('./setupDatabase');
const { ObjectId } = require('mongodb'); // Import ObjectId

async function registerUser(username, password) {
  const db = await connectDB();
  const users = db.collection('users');
  await users.insertOne({ username, password });
  console.log("User registered successfully!");
}

async function addTask(userId, description) {
  const db = await connectDB();
  const tasks = db.collection('tasks');
  await tasks.insertOne({
    userId: userId,
    description: description,
    completed: false,
    created_at: new Date()
  });
  console.log("Task added successfully!");
}

async function markTaskCompleted(taskId) {
  const db = await connectDB();
  const tasks = db.collection('tasks');
  await tasks.updateOne({ _id: new ObjectId(taskId) }, { $set: { completed: true } });
  console.log("Task marked as completed!");
}

async function deleteTask(taskId) {
  const db = await connectDB();
  const tasks = db.collection('tasks');
  await tasks.deleteOne({ _id: new ObjectId(taskId) });
  console.log("Task deleted successfully!");
}

async function main() {
  // Use the actual user ID and task ID from your task collection
  const userId = "6706c0f420cd75bdeec73bf8"; // User ID
  const taskId = "6706c16720cd75bdeec73bf9"; // Task ID

  // Register a new user (optional, if you want to test this part)
  await registerUser("new_user", "secure_password");
  
  // Add a task for the existing user
  await addTask(userId, "Learn MongoDB");

  // Mark the task as completed (using the actual task ID)
  await markTaskCompleted(taskId);
  
  // Delete the task (if needed, using the same task ID)
  await deleteTask(taskId);
}

// Call the main function to execute
main().catch(console.error);

 
