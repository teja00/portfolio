import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
    backgroundColor: '#2d3748',
    borderRadius: 8,
    padding: 20,
  },
  skillContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
  skillTitle: {
    fontSize: '14px',
    marginTop: 10,
    color: '#ffffff',
  },
  sectionContentContainer: {
    textAlign: 'center',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div
            className="section-content-container"
            style={styles.sectionContentContainer}
          >
            <Container>
              {data.skills?.map((rows) => (
                <div key={rows.title}>
                  <br />
                  <h3>{rows.title}</h3>
                  <Row>
                    {rows.items.map((item) => (
                      <Col
                        key={item.title}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        style={styles.skillContainer}
                      >
                        <img
                          style={styles.iconStyle}
                          src={item.icon}
                          alt={item.title}
                        />
                        <p style={styles.skillTitle}>{item.title}</p>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
