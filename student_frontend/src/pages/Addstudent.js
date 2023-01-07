import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { host } from "../config";
import swal from "sweetalert";
class Addstudent extends Component {


    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    saveStudent = async (e) => {
        e.preventDefault();
        const res = await axios.post(host + '/add-student', this.state);

        if (res.data.status === 200) {
            //alert(res.data.message)
            swal({
                title: "Added!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
            this.setState({
                name: '',
                course: '',
                email: '',
                phone: '',
            });
        }
        else {
            this.setState({
                error_list: res.data.validate_err,
            });
        }

    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Student </h4>
                                <Link to="/" className="btn btn-primary btn-sm float-end" >Back</Link>
                            </div>
                            <div className="card-body">

                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Student </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );

    }

}
export default Addstudent