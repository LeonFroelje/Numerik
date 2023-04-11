import '@/styles/globals.css'
import { Box, Button, Divider, Menu, MenuItem, Paper, Stack, Typography} from '@mui/material'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Link from 'next/link'



export default function App({ Component, pageProps }: AppProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [algorithm, setAlgorithm] = useState("")
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  return (
    <Paper sx={{
      display: "flex",
      flexDirection: 'column',
      height: "100vh",
      width: "100vw",
    }}>    
      <Box padding={".5rem"}>  
        <Stack sx={{
          flexDirection: "row",
          gap: "1.5rem"
          }} alignItems={"center"}
          justifyContent={"space-between"}
          padding={"0rem 1rem"}>
            <Button
              id="VerfahrenButton"
              aria-controls={open ? 'Verfahren' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="outlined"
              onClick={handleClick}
              sx={{
                height: "3rem"
              }}
            >
              Verfahren
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'VerfahrenButton',
              }}
              id='Verfahren'>
              <MenuItem>
                <Link style={{textDecoration: "none", color: "#000"}} href={"bisektionsverfahren"} onClick={(e) => {
                                    console.log(e.currentTarget.innerText)

                  setAlgorithm(e.currentTarget.innerText)
                }}>
                  Bisektionsverfahren
                </Link>
              </MenuItem>
              <MenuItem>
                <Link style={{textDecoration: "none", color: "#000"}} href={"lagrangeinterpolation"} onClick={(e) => {
                  console.log(e.currentTarget.innerText)
                  setAlgorithm(e.currentTarget.innerText)
                }}>
                  Lagrange Interpolation
                </Link>
              </MenuItem>
              <MenuItem>
                <Link style={{textDecoration: "none", color: "#000"}} href={"eulerschepolygonverfahren"} onClick={(e) => {
                  setAlgorithm(e.currentTarget.innerText)
                }}>
                  Eulersches Polygonverfahren
                </Link>
              </MenuItem>
            </Menu>
            <Typography textAlign={"center"}>
              {algorithm}
            </Typography>
        </Stack>
      </Box>
      <Divider/>
      <Component {...pageProps}/>
    </Paper>
  )
}
