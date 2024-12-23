import React, { useState, useEffect } from "react";
import { fetchTasks, saveAnnotation } from "../api/api";  // We use fetchTasks and saveAnnotation here
import AnnotationCanvas from "../components/AnnotationCanvas";

const AnnotationPage = () => {
    const [task, setTask] = useState(null);

    // Fetch tasks when the component is loaded
    useEffect(() => {
        const getTasks = async () => {
            const tasks = await fetchTasks();
            if (tasks.length > 0) setTask(tasks[0]); // Use the first task for now
        };
        getTasks();
    }, []);

    // Handle saving annotations to the backend
    const handleSave = async (annotations) => {
        if (task) {
            // Format annotation data before sending
            const formattedAnnotations = annotations.map((annotation) => ({
                x: annotation.x,
                y: annotation.y,
                width: annotation.width,
                height: annotation.height,
            }));

            try {
                // Call the API to save the annotations
                await saveAnnotation(task.id, formattedAnnotations);
                alert("Annotations saved successfully!");
            } catch (error) {
                console.error("Error saving annotations:", error);
                alert("Failed to save annotations.");
            }
        }
    };

    return (
        <div>
            <h1>Annotation Page</h1>
            {task ? (
                <AnnotationCanvas
                    imageUrl={task.image_url}
                    onSave={handleSave}
                />
            ) : (
                <p>Loading task...</p>
            )}
        </div>
    );
};

export default AnnotationPage;
