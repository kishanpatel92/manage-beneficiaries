import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Layout from './Layout';

const ViewBeneficiary = () => {
  const { id } = useParams();
  const beneficiary = useSelector(state => state.beneficiaries.find(b => b.id === parseInt(id)));

  if (!beneficiary) return <div>Beneficiary not found</div>;

  return (
    <Layout>
      <Container>
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h4" gutterBottom>
            View Beneficiary
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Beneficiary details">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>{beneficiary.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Account Number</strong>
                  </TableCell>
                  <TableCell>{beneficiary.accountNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Bank Name</strong>
                  </TableCell>
                  <TableCell>{beneficiary.bankName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Account Type</strong>
                  </TableCell>
                  <TableCell>{beneficiary.accountType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              startIcon={<ArrowBack />}
            >
              Back to Beneficiaries
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ViewBeneficiary;
