import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserDetails from "./UserDetails";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const[data,setData]=useState([])
  const [rows,setRows]=useState(null)
  const[loading,setLoading]=useState(true)
  const[addUser,setAddUser]=useState(false);
const handleIsAddClose=()=>{setAddUser(false)}

  useEffect(()=>{
      getData();
  },[addUser]);

  const getData=()=>{
    axios.get('/api/users')
    .then(response=>{
        console.log('data',response);
            setData(response.data)
            setLoading(false)
    })
    .catch(error=>{
        console.log('error',error)
    })
  
    console.log('data');
}

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const dateFormater = (dateString) => {
   const parsedDate=new Date(dateString);
   return format(parsedDate, "MMMM dd,yyyy h:mm a");
    };

  const editRecord = (row) => {
  setRows(row)
  setAddUser(true)
  };

  const addRecord = (row) => {
    setRows(null)
    setAddUser(true)
    };

  const deleteRecord = (row) => {
    console.log("row",row)

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this record?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>deleteRow(row)
        },
        {
          label: 'No',
      
        }
      ]
    });
    };

    const deleteRow=(row)=>{
      let data=JSON.stringify({
        "id":row.id,
      });
  
      let config={
        method:'delete',
        url:'/api/users',
        data:data,
      }
  
      axios.request(config)
      .then(response=>{
          console.log('data',response);
          toast.success('Data Deleted!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          getData();
              // setData(response.data)
              // setLoading(false)
      })
      .catch(error=>{
          console.log('error',error)
          toast('🦄 data deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
      })
    }

  return (
<>
<ToastContainer/>
{addUser ? (<UserDetails handleIsAddClose={handleIsAddClose} rows={rows}/>):(<>

<div className="flex justify-between">
        <h1 className="font-bold mb-4">User</h1>
        <Button variant="outlined" className="mb-3" onClick={()=>addRecord()} endIcon={<AddCircleIcon />}>
        Add User
      </Button>
        </div>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell
                  align="right"
                  style={{ minWidth: 70 }}
                >
               ID
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
               Name
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
               Email
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
               Type
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
               Created At
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 170 }}
                >
               Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                <TableCell key={index} align="right">
                       {row.id}
                        </TableCell>
                        <TableCell key={index} align="right">
                       {row.name}
                        </TableCell>
                        <TableCell key={index} align="right">
                       {row.email}
                        </TableCell>
                        <TableCell key={index} align="right">
                       {row.type}
                        </TableCell>
                        <TableCell key={index} align="right">
                       {dateFormater(row.created_at)}
                        </TableCell>
                        <TableCell key={index} align="right">
                    <div className="flex justify-center">

                      <div className="cursor-pointer text-green-700 mr-2" onClick={()=>editRecord(row)}>
<EditIcon/>

                      </div>
                      <div className="cursor-pointer text-orange-700"onClick={()=>deleteRecord(row)}>
                        <DeleteIcon/>
                      </div>
                    </div>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
</>)}

    </>
  );
}