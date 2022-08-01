import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, Container, Text, Button, Group } from '@mantine/core';
import HomeHeader from '../../../components/Header/Landing/Home/HomeHeader';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 200,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();
  return (
    <>
      <HomeHeader />
      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title}>
            Welcome to{' '}
            <Text component="span" color="green" inherit>
              Banking
            </Text>
            !
          </h1>

          <Text className={classes.description} color="dimmed">
            Easy withdrawals, deposits, and transfers. Create and start your
            savings account with Banking now.
          </Text>

          <Group className={classes.controls}>
            <Button
              size="xl"
              className={classes.control}
              color="green"
              component={Link}
              to="/signup"
            >
              Get started
            </Button>
          </Group>
        </Container>
      </div>
    </>
  );
};

export default Home;
