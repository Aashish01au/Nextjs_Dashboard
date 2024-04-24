import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { Axios } from "axios";
import { object } from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const schema = yup
  .object({
    name: yup.string().required("Plz enter ur name"),
    email: yup.string().email().required("plz enter ur email"),
  })
  .required();

const UserDetails = ({ handleIsAddClose, rows }) => {
  const [utype, setUtype] = useState("User");

  const handleChange = (event) => {
    setUtype(event.target.value);
  };



  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (rows) {
      setUtype(rows.type)
      reset({
         id:rows.id,
         name:rows.name,
         email:rows.email,
      })
    }
  }, []);

  const onSubmit = (data) => {
    // Object.assign(data,{type:utype})
    // Object.assign(data,{id:rows.id})
    console.log(data);

    if(rows){
    // ================= Axios Start================
    axios
      .put("/api/users", JSON.stringify(data))
      .then((response) => {
        console.log("data", response);
        setData(response.data);
        setLoading(false);

        handleIsAddClose();
      })
      .catch((error) => {
        console.log("error", error);
      });
    // ========================================
    toast.success("Data Added!", {
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
    }else{
    // ================= Axios Start================
    axios
      .post("/api/users", JSON.stringify(data))
      .then((response) => {
        console.log("data", response);
        setData(response.data);
        setLoading(false);

        handleIsAddClose();
      })
      .catch((error) => {
        console.log("error", error);
      });
    // ========================================
    toast.success("Data Added!", {
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
    }

  };

  const [addUser, setAddUser] = useState(false);

  return (
    <>
      <div className="flex justify-start">
        <Button
          variant="outlined"
          className="mb-4"
          onClick={() => handleIsAddClose()}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid  sm:grid-cols-12 md:grid-cols-4 gap-5">
          <div className="">
            <TextField
              label="Name"
              fullWidth
              size="small"
              variant="outlined"
              {...register("name")}
            />
            <p className="text-orange-600 ml-1 text-xs">
              {errors.name?.message}
            </p>
          </div>
          <div className="">
            <TextField
              label="Email"
              fullWidth
              size="small"
              variant="outlined"
              {...register("email")}
            />
            <p className="text-orange-600 ml-1 text-xs">
              {errors.email?.message}
            </p>
          </div>
          <div className="">
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={utype}
                label="Type"
                size="small"
                onChange={handleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex justify-start">
          <Button
            variant="outlined"
            className="my-4 bg-blue-600 text-white hover:bg-slate-600"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserDetails;
