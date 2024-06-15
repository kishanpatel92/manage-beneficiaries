import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Container, FormControl, InputLabel, Select, MenuItem, FormHelperText, Snackbar } from '@mui/material';
import { updateBeneficiary } from '../redux/beneficiariesSlice';
import Layout from './Layout';

const EditBeneficiary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const beneficiary = useSelector(state => state.beneficiaries.find(b => b.id === parseInt(id)));
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (beneficiary) {
      setValue('name', beneficiary.name);
      setValue('accountNumber', beneficiary.accountNumber);
      setValue('bankName', beneficiary.bankName);
      setValue('accountType', beneficiary.accountType);
    }
  }, [beneficiary, setValue]);

  const onSubmit = async (data) => {
    await dispatch(updateBeneficiary({ ...data, id: beneficiary.id }));
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate('/'); 
    }, 600);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!beneficiary) return <div>Beneficiary not found</div>;

  return (
    <>
      <Layout>
        <Container>
          <h1>Edit Beneficiary</h1>
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
              {...register('accountNumber', { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.accountNumber}
              helperText={errors.accountNumber && 'Account Number is required'}
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
              <InputLabel sx={{ background: '#fff', padding: '3px' }}>Account Type</InputLabel>
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
            <Button type="submit" variant="contained" color="primary"  sx={{ marginTop: 2 }}>
              Update Beneficiary
            </Button>
          </form>
        </Container>
      </Layout>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Beneficiary updated successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default EditBeneficiary;
