// this file to show all students list

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { host } from "../config";
import axios from 'axios';
import swal from 'sweetalert';

class Student extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        students: [],
        loading: true,
    };

    async componentDidMount() {
        const res = await axios.get(host + '/students');
        //console.log(res)
        if (res.data.status === 200) {
            this.setState({
                students: res.data.students,
                loading: false,
            })

        }
    }

    deleteStudent = async (e, id) => {
        const thisclicked = e.currentTarget;
        thisclicked.innerText = "Deleting"
        const res = await axios.delete(host + '/delete-student/'+ id);
        if(res.data.status === 200)
        {
            //console.log(res.data.message)
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
            thisclicked.closest('tr').remove();

        }
    }

    render() {

        var student_html_table = "";
        if (this.state.loading) {
            student_html_table = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }
        else {
            student_html_table =
                this.state.students.map((item) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.course}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm" >Edit </Link>
                            </td>
                            <td>
                                {/* <Link to={`delete-student/${item.id}`}  >Delete </Link> */}
                                <button onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    );
                });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Student Data</h4>
                                <Link to="add-student" className="btn btn-primary btn-sm float-end" >Add student</Link>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_html_table}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Student