import React, { Component } from "react";
import userdata from "./data/data";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      searchedData: "",
      showRightConatiner: false,
      fetchedData: "",
      filteredData: "",
      filteredDataStatus: false
    };
  }
  handleSearchChange = (event) => {
    const filtered = this.state.userDetails.filter((user) => {
      return user.Name.includes(event.target.value);
    });
    this.setState({ searchedData: event.target.value });
    this.setState({ filteredData: filtered });
    this.setState({ filteredDataStatus: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = this.state.searchedData;
    let userDetails = this.state.userDetails;

    const filtered = userDetails.filter((user) => {
      return user.Name.includes(data);
    });

    if (filtered.length > 0) {
      this.setState({ filteredData: filtered });
      this.setState({ showRightConatiner: false });
    }
  };

  handleUserClick = (event) => {
    let userClicked = event.target.id;
    let userDetails = this.state.userDetails;

    const filtered = userDetails.filter((user) => {
      return user.Name.includes(userClicked);
    });

    if (filtered.length > 0) {
      this.setState({ fetchedData: filtered });
      this.setState({ showRightConatiner: true });
    }
  };

  handleDelete = () => {
    let userToDelete = "";
    let userDetails = this.state.userDetails;

    if (
      this.state.filteredData.length !== 0 ||
      this.state.searchedData === ""
    ) {
      userToDelete = this.state.searchedData;
      const filteredUser = userDetails.filter(
        (user) => user.Name !== userToDelete
      );

      this.setState({ userDetails: filteredUser });
    }
  };

  componentDidMount() {
    this.setState({ userDetails: userdata });
  }
  render() {
    return (
      <div className="flex-container">
        <div className="flex-child left">
          <input
            id="search"
            type="text"
            placeholder="Search"
            name="search"
            value={this.state.searchedData}
            onChange={this.handleSearchChange}
          />
          &nbsp;
          <button type="submit" className="Btn" onClick={this.handleSubmit}>
            {" "}
            Submit
          </button>
          &nbsp;
          <button type="submit" className="Btn" onClick={this.handleDelete}>
            Delete
          </button>
          {this.state.filteredDataStatus === false && (
            <ul>
              {this.state.userDetails.map((data, index) => (
                <li
                  key={index}
                  id={data.Name}
                  className={`userList${
                    this.state.searchedData === data.Name ? " selected" : ""
                  }`}
                  onClick={this.handleUserClick}
                >
                  {data.Name}
                </li>
              ))}
            </ul>
          )}
          {this.state.filteredDataStatus && (
            <ul>
              {this.state.filteredData.map((data, index) => (
                <li
                  key={index}
                  id={data.Name}
                  className={`userList${
                    this.state.searchedData === data.Name ? " selected" : ""
                  }`}
                  onClick={this.handleUserClick}
                >
                  {data.Name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-child right">
          {this.state.showRightConatiner && this.state.fetchedData && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.fetchedData[0].Name}</td>
                  <td>{this.state.fetchedData[0].Emailid}</td>
                  <td>{this.state.fetchedData[0].Mobileno}</td>
                  <td>{this.state.fetchedData[0].Gender}</td>
                  <td>{this.state.fetchedData[0].Nationality}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default App;
