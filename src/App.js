import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Autocomplete,
  Grid,
} from '@mui/material';

import JsonDisplay from './components/JsonDisplay';

const searchableFields = [
  'level',
  'message',
  'resourceId',
  'timestamp',
  'traceId',
  'spanId',
  'commit',
  'parentResourceId',
];

function App() {
  const [queries, setQueries] = useState([{ field: 'Select Field', value: '' }]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableFields, setAvailableFields] = useState(searchableFields);

  const handleQueryChange = (index, field, value) => {
    setQueries((prevQueries) =>
      prevQueries.map((query, i) =>
        i === index ? { ...query, field, value } : query
      )
    );

    // Remove the selected field from availableFields
    setAvailableFields((prevFields) => prevFields.filter((availableField) => availableField !== field));
  };

  const handleAddQuery = () => {
    setQueries((prevQueries) => [...prevQueries, { field: 'Select Field', value: '' }]);
  };

  const handleRemoveQuery = (index) => {
    // Add the removed field back to availableFields
    setAvailableFields((prevFields) => [...prevFields, queries[index].field]);

    setQueries((prevQueries) => prevQueries.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const queryString = queries
        .map(({ field, value }) => `${field}=${value}`)
        .join('&');
      const response = await axios.get(`http://localhost:3000/api/logs?${queryString}`);
      setLogs(response.data.data);
    } catch (error) {
      console.error('Error searching logs:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Log Ingester Query Interface
      </Typography>

      {queries.map((query, index) => (
        <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Autocomplete
              options={availableFields}
              value={query.field}
              onChange={(_, newValue) => handleQueryChange(index, newValue, query.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Field"
                  variant="outlined"
                  disabled={query.field === 'Select Field'}
                />
              )}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              variant="outlined"
              label={`Enter value for ${query.field}`}
              value={query.value}
              onChange={(e) => handleQueryChange(index, query.field, e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveQuery(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" color="primary" onClick={handleAddQuery}>
        Add Query
      </Button>

      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading} sx={{ display: 'block', marginTop: 2 }}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {logs.length > 0 && (
        <div sx={{ marginTop: 2 }}>
          <Typography variant="h5">Search Results:</Typography>
          <List>
            {logs.map((log, index) => (
              <ListItem key={index} sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, marginTop: 1 }}>
                <JsonDisplay data={log} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
}

export default App;