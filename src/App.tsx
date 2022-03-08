import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const App = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
  
  <LoadingButton
      aria-label="save-task"
      color="primary"
      loading={isLoading}
      disabled={false}
      loadingIndicator={
          <CircularProgress
              color="inherit"
              size={16}
              sx={{ paddingLeft: '5px', paddingRight: '5px' }}
          />
      }
      loadingPosition="start"
      variant="contained"
      size="small"
      sx={{
          minWidth: '35px',
          height: '35px',
          margin: '0px 2px 4px',
          padding: '5px 5px 5px 5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          '& .MuiLoadingButton-loadingIndicator': {
              position: 'unset',
              left: 'unset',
          },
          ':hover': {
              color: '#ffffff',
              backgroundColor: '#0475b4',
          },
          ':active': {
              color: '#fff',
              backgroundColor: '#085ca1',
          },
          ':disabled': {
              color: '#737373',
              backgroundColor: '#f4f5f7',
          },
      }}
      onClick={() => setIsLoading(!isLoading)}
  >
      <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
              paddingLeft: '5px',
              paddingRight: '5px',
              fontSize: '16px',
          }}
      >
          <SaveIcon />
      </Box>
  </LoadingButton>

  );
}

export default App;
