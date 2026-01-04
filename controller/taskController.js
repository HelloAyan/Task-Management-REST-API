import Tasks from "../model/taskModel.js"

export const createTask = async (req, res) => {
    try {
        const taskData = new Tasks(req.body);
        const { title, description, assignTo, priority, status, dueDate, createdBy } = taskData;
        const saveTaskData = await taskData.save();
        res.status(201).json({
            message: "Task Created Successfully",
            saveTaskData
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find()
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Tasks.findById(taskId)
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const test = async (req, res) => {
    try {
        const tasks = await Tasks.find();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}