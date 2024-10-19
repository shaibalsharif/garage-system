import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const DynamicForm = ({ formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name} className="mb-4">
          {field.type === 'select' ? (
            <TextField
              select
              label={field.label}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          )}
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
