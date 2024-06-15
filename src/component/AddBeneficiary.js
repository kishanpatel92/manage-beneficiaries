import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Select, MenuItem, InputLabel, FormControl, FormHelperText, Snackbar } from '@mui/material';
import { addBeneficiary } from '../redux/beneficiariesSlice';
import Layout from './Layout';

const AddBeneficiary = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const onSubmit = (data) => {
    dispatch(addBeneficiary({ ...data, id: Date.now() }));
    setShowSnackbar(true); 
  
     setTimeout(() => {
      navigate('/');
    }, 600);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Layout>
        <Container>
          <h1>Add New Beneficiary</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register('name', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name && 'Name is required'}
            />
            <TextField
              label="Account Number"
              {...register('accountNumber', { 
                required: true,
                pattern: /^[0-9]*$/,
              })}
              fullWidth
              margin="normal"
              error={!!errors.accountNumber}
              helperText={errors.accountNumber && 'Account Number is required'}
              inputProps={{
                inputMode: 'numeric', 
                pattern: '[0-9]*', 
                maxLength: 10,
              }}
            />
            <TextField
              label="Bank Name"
              {...register('bankName', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.bankName}
              helperText={errors.bankName && 'Bank Name is required'}
            />
            <FormControl fullWidth margin="normal" error={!!errors.accountType}>
              <InputLabel sx={{
                background: '#fff',
                padding: '3px'
              }}>Account Type</InputLabel>
              <Controller
                name="accountType"
                control={control}
                defaultValue=""
                rules={{ required: 'Account Type is required' }}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="Current">Current</MenuItem>
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Loan">Loan</MenuItem>
                    <MenuItem value="Credit">Credit</MenuItem>
                  </Select>
                )}
              />
              {errors.accountType && <FormHelperText>{errors.accountType.message}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Add Beneficiary
            </Button>
          </form>
        </Container>
      </Layout>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Beneficiary added successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default AddBeneficiary;
