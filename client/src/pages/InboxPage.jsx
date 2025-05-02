import { useEffect, useState } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import api from '../utils/api';

const InboxPage = () => {
  const [inboxItems, setInboxItems] = useState([]);

  useEffect(() => {
    const fetchInboxItems = async () => {
      try {
        const res = await api.get('/inbox');
        setInboxItems(res.data);
      } catch (err) {
        console.error('Failed to fetch inbox items:', err);
      }
    };
    fetchInboxItems();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Inbox</h2>
      {inboxItems.map((item) => (
        <Card key={item._id} className="mb-3">
          <Card.Header>
            <Badge bg="secondary">{item.source}</Badge>
            {item.dueDate && (
              <span className="ms-2">
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </span>
            )}
          </Card.Header>
          <Card.Body>
            <Card.Text>{item.content}</Card.Text>
            {item.subTasks.length > 0 && (
              <ListGroup variant="flush">
                {item.subTasks.map((task, i) => (
                  <ListGroup.Item key={i}>
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      className="me-2"
                      readOnly
                    />
                    {task.description}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default InboxPage;