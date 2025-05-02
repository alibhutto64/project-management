import { useDrag, useDrop } from 'react-dnd';
import { Card } from 'react-bootstrap';

const TimelineItem = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TIMELINE_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TIMELINE_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '10px',
      }}
    >
      <Card>
        <Card.Body>
          <Card.Title>{task.description}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Priority: {task.priority}
          </Card.Subtitle>
          <Card.Text>{task.summary}</Card.Text>
          {task.nextSteps.length > 0 && (
            <ul>
              {task.nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TimelineItem;