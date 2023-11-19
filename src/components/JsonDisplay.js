import React from 'react';
import { Paper } from '@mui/material';

const JsonDisplay = ({ data }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2, overflowX: 'auto', width: '100%' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Paper>
    );
};

export default JsonDisplay; 