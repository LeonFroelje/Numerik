import '@/styles/globals.css'
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Typography,
Collapse, 
ListSubheader} from '@mui/material'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { MathJaxContext } from "better-react-mathjax";

import Link from 'next/link'

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [algorithm, setAlgorithm] = useState("")
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(true);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const drawerContent = (anchor: Anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List subheader={
        <ListSubheader>
          Verfahren
        </ListSubheader>
      }>
      <Divider/>
        {['Bisektionsverfahren', 'Eulersches Polygonverfahren',
         'Verbessertes Eulerverfahren', 'Lagrange interpolation'].map((text, index) => (
          <>
            <ListItem  key={text} sx={{
              height: 60
            }} disablePadding>
              <ListItemButton id={text} component={Link} href={text.replace(" ", "").toLowerCase()} 
              sx={{
                height: "100%"
              }} onClick={(e: React.MouseEvent) => {
                setAlgorithm(e.currentTarget.id)
              }}>
                {text}
              </ListItemButton>
            </ListItem>
            <Divider/>
          </>
        ))}
      </List>
    </Box>
  );
  return (
    <Paper sx={{
      display: "flex",
      flexDirection: 'column',
      height: "100vh",
      width: "100vw",
      gap: "1rem"
    }}>    
      <Box position={"sticky"} top={0} sx={{
        backgroundColor: "#FFF",
        zIndex: 2
      }}>  
        <Stack sx={{
          flexDirection: "row",
          gap: "1.5rem"
          }} alignItems={"center"}
          padding={".5rem 0rem"}
          >
          <React.Fragment key={'left'}>
            <Button onClick={toggleDrawer("left", true)}>{<MenuIcon/>}</Button>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {drawerContent("left")}
            </Drawer>
          </React.Fragment>            
          <Typography textAlign={"center"}>
            {algorithm}
          </Typography>
        </Stack>
        <Divider/>
      </Box>
      <MathJaxContext config={config}>
        <Component {...pageProps}/>
      </MathJaxContext>
    </Paper>
  )
}
