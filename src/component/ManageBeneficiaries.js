import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Tooltip,
  Container,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { removeBeneficiary } from "../redux/beneficiariesSlice";
import Layout from "./Layout";

const ManageBeneficiaries = () => {
  const beneficiaries = useSelector((state) => state.beneficiaries);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this beneficiary?")) {
      dispatch(removeBeneficiary(id));
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ marginTop: 2 }}
          >
            Manage Beneficiaries
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/add"
            sx={{ marginBottom: 2 }}
          >
            Add New Beneficiary
          </Button>
          <Paper elevation={3}>
            <List>
              {beneficiaries.map((beneficiary) => (
                <ListItem key={beneficiary.id} divider>
                  <ListItemText
                    primary={beneficiary.name}
                    secondary={`${beneficiary.bankName} (${beneficiary.accountType}) (${beneficiary.accountNumber})`}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="View">
                      <IconButton
                        component={Link}
                        to={`/view/${beneficiary.id}`}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        component={Link}
                        to={`/edit/${beneficiary.id}`}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleRemove(beneficiary.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Layout>
    </>
  );
};

export default ManageBeneficiaries;
