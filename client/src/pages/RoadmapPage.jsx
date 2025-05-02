import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import api from '../utils/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TimelineItem from '../components/TimelineItem';

const RoadmapPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const moveTask = (dragIndex, hoverIndex) => {
    // Handle drag and drop reordering
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(newTasks);
  };

  return (
    <Container>
      <h2 className="mb-4">Project Roadmap</h2>
      <DndProvider backend={HTML5Backend}>
        <Card className="p-3">
          {tasks.map((task, index) => (
            <TimelineItem
              key={task._id}
              index={index}
              task={task}
              moveTask={moveTask}
            />
          ))}
        </Card>
      </DndProvider>
    </Container>
  );
};

export default RoadmapPage;