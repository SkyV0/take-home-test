import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';

export function NavUpgrade({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={[{ px: 2, py: 5, textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative' }}>
          <Typography color="#AEAEAF" textAlign="center" variant="caption">
            v{CONFIG.appVersion}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
