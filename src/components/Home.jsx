import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
// import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  Container: {
    borderRadius: '15px',
    padding: '40px',
    height: '100%',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  image: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
  },
  nameStyle: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  roleStyle: {
    fontSize: '1.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: '20px',
  },
  typewriter: {
    display: 'inline-block',
    fontSize: '1.5em',
  },
  bio: {
    fontSize: '1em',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '20px',
  },
};

function Home() {
  const [data, setData] = useState(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ ...styles.Container, backgroundColor: theme.containerBackground }}>
      <div style={styles.imageContainer}>
        <img
          src={data?.profilePicture}
          alt="Profile"
          style={styles.image}
        />
      </div>
      <h1 style={styles.nameStyle}>{data?.name}</h1>
      <div style={styles.roleStyle}>
        <h2 style={{ marginRight: '10px' }}>I&apos;m&nbsp;</h2>
        <div style={styles.typewriter}>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
      </div>
      <p style={styles.bio}>{data?.bio}</p>
      <Social />
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
