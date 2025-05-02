import { useEffect, useState } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import api from '../utils/api';

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await api.get('/ideas');
        setIdeas(res.data);
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
      }
    };
    fetchIdeas();
  }, []);

  const handleVote = async (id, direction) => {
    try {
      const endpoint = direction === 'up' ? 'upvote' : 'downvote';
      const res = await api.post(`/ideas/${id}/${endpoint}`);
      setIdeas(ideas.map(idea => 
        idea._id === id ? res.data : idea
      ));
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'secondary',
      approved: 'success',
      rejected: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <div>
      <h2 className="mb-4">Ideas Board</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {ideas.map((idea) => (
          <Col key={idea._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{idea.title}</Card.Title>
                <Card.Subtitle className="mb-2">
                  {getStatusBadge(idea.status)}
                </Card.Subtitle>
                <Card.Text>{idea.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => handleVote(idea._id, 'up')}
                >
                  ↑ {idea.votes}
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleVote(idea._id, 'down')}
                >
                  ↓
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IdeasPage;