import '@/styles/globals.css'
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Typography,
Collapse, 
ListSubheader} from '@mui/material'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import { MathJaxContext } from "better-react-mathjax";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Link from 'next/link'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ChevronLeft, ExpandLess } from '@mui/icons-material';

const config = {
  loader: { load: ["[tex]/html", "[tex]/mathtools", "[tex]/ams"]},
  tex: {
    packages: { "[+]": ["html", "mathtools", "ams"]},
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

const chapters: any = {
  "Grundlegende Konzepte": ["Auslöschung"],
  "Interpolation": ["Lagrange Interpolation"],
  "Integration": ["Interpolatorische Quadraturformel"],
  "Lineare Gleichungssysteme": ["QR Zerlegung"],
  "Nichtlineare Gleichungssysteme": ["Bisektionsverfahren"],
  "Gewöhnliche Differentialgleichungen": ["Eulersches Polygonverfahren", "Verbessertes Eulerverfahren"] 
}

const o: boolean[] = []
for(let i = 0; i < Object.keys(chapters).length; i++){
  o.push(false)
}


export default function App({ Component, pageProps }: AppProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [algorithm, setAlgorithm] = useState("")
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(o);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const drawerContent = (anchor: Anchor) => (
    <ClickAwayListener onClickAway={() => {setDrawerOpen(false)}}>
      <List sx={{height: "100%", overflow: "auto"}}>
        {Object.keys(chapters).map((chapter, chapterIndex) => (
          <>
            <ListItem key={chapterIndex} sx={{
                height: 60
              }}
              disablePadding
            >
              <ListItemButton onClick={() => {
                const newOpen = [...open]
                newOpen[chapterIndex] = !newOpen[chapterIndex];
                setOpen(newOpen);
              }}>
                <ListItemText primary={chapter}/>
                {open[chapterIndex] ? <ExpandLess/> : <ExpandMoreIcon/>}
              </ListItemButton>
            </ListItem>
            <Divider/>
            <Collapse in={open[chapterIndex]} timeout={"auto"}>
              {chapters[chapter].map((section: string, sectionIndex: number) => {
                return <>
                  <ListItem  key={sectionIndex} sx={{
                    height: 60
                    }} disablePadding
                  >
                    <ListItemButton id={section} component={Link} 
                      href={`/${chapter.replace(" ", "-").replace("ö", "oe").toLowerCase()}/${section.replace(" ", "").toLowerCase()}`} 
                      sx={{
                        height: "100%",
                        pl: 4
                      }} 
                      onClick={(e: React.MouseEvent) => {
                        setAlgorithm(e.currentTarget.id)
                        toggleDrawer(false);
                      }}
                    >
                      <ListItemText sx={{
                        color: "#555"
                        }}
                        primary={section}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider key={sectionIndex + chapters[chapter].length}/>
                </>
                })
              }
            </Collapse>
          </>
        ))}
      </List>
    </ClickAwayListener>
  );
  return (
    <Paper sx={{
      display: "flex",
      flexDirection: 'column',
      minHeight: "100vh",
      maxWidth: "100vw",
      gap: "1rem",
    }}
    >    
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
            <Button onClick={toggleDrawer(true)}>{<MenuIcon/>}</Button>
              <Drawer
                sx={{
                  width: "90vw",
                  maxWidth: "40vh",
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: "90vw",
                    maxWidth: "40vh",
                    boxSizing: 'border-box',
                  },
                }}
                variant='temporary'
                anchor={"left"}
                open={drawerOpen}
                onClose={() => {
                  toggleDrawer(false);
                }}
              >
                <Stack direction={"row"} justifyContent={"space-between"} height={60}>
                  <Typography alignSelf={"center"} 
                    sx={{
                      fontWeight: 500,
                      paddingLeft: "16px",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                    }}
                  >Verfahren
                  </Typography>
                  
                  <IconButton onClick={toggleDrawer(false)} 
                    sx={{
                      alignSelf: "center"
                    }}
                  >
                    <ChevronLeft/>
                  </IconButton>
                </Stack>
                <Divider/>
                {drawerContent("left")}
              </Drawer>
          </React.Fragment>            
          <Typography>
            {algorithm}
          </Typography>
        </Stack>
        <Divider/>
      </Box>
      <MathJaxContext config={config}>
        <Box paddingBottom={"2rem"} sx={{
          display: "flex",
          flexDirection: 'column',
          gap: "1rem",
        }}>
          <Component {...pageProps}/>
        </Box>
      </MathJaxContext>
    </Paper>
  )
}
