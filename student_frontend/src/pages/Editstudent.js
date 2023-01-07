import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { host } from "../config";
import withRouter from './withRouter';
import swal from "sweetalert";
class Editstudent extends Component {

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
    //when page load
    async componentDidMount() {
        const res = await axios.get(host + `/edit-student/${this.props.params.id}`)
        if (res.data.status === 200) {
            this.setState({
                name: res.data.student.name,
                course: res.data.student.course,
                email: res.data.student.email,
                phone: res.data.student.phone,

            })
        }

        else if (res.data.status === 404) {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "Warning",
                button: "Ok!",
            });
            this.props.history('/')
        }
    }

    updateStudent = async (e) => {
        e.preventDefault();
        document.getElementById('UpdateBtn').innerText = "Updating"
        document.getElementById('UpdateBtn').disabled = true;
        const res = await axios.put(host + `/update-student/${this.props.params.id}`, this.state);
        if (res.data.status === 200) {
            document.getElementById('UpdateBtn').innerText = "Update Student"
            document.getElementById('UpdateBtn').disabled = false;
            swal({
                title: "Updated!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
            this.props.history('/')
        }
        
        else if (res.data.status === 404) {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "Warning",
                button: "Ok!",
            });
            this.props.history('/')
        }

        else{
            this.setState({
                error_list: res.data.validate_err,
            });
            document.getElementById('UpdateBtn').innerText = "Update Student"
            document.getElementById('UpdateBtn').disabled = false;
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Student </h4>
                                <Link to="/" className="btn btn-primary btn-sm float-end" >Back</Link>
                            </div>
                            <div className="card-body">

                                <form onSubmit={this.updateStudent}>
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
                                        <button type="submit" id="UpdateBtn" className="btn btn-primary">Update Student </button>
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
export default withRouter(Editstudent)