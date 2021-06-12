import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import Header from "./header";
import clsx from "clsx";
import {useHistory} from "react-router-dom";

export const drawerWidth = 240;

type Props = {
    child: JSX.Element,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);


export default function Layout(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const drawerOptions = [
    {name: 'Home', icon: <HomeIcon />, action: () => history.push('/')},
    {name: 'Feed', icon: <DynamicFeedIcon/>, action: () => history.push('/feed')},
    {name: 'Search', icon: <SearchIcon />, action: () => history.push('/')},
    {name: 'Messages', icon: <ChatIcon/>, action: () => history.push('/dms')}
  ]

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  return (
    <div>
      <Header handleDrawerOpen={handleDrawerOpen} openDrawer={open} drawerWidth={drawerWidth}/>
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
              paper: classes.drawerPaper,
          }}
      >
          <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
          </div>
          <Divider />
          <List>
              {drawerOptions.map((row, index) => (
                  <ListItem button key={row.name} onClick={row.action}>
                      <ListItemIcon>{row.icon}</ListItemIcon>
                      <ListItemText primary={row.name} />
                  </ListItem>
              ))}
          </List>
      </Drawer>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
      })}>
          <header className={"App-header"}>
              {props.child}
          </header>
      </main>
    </div>
  );
}
