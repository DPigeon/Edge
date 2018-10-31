render() {
    return (
      <React.Fragment>
        <div className="profilecontainer">
          <img
            src={require("./images/banner.jpg")}
            alt="Welcome"
            className="banner"
			/>
          <center>
            {" "}
            <img
              src={require("./images/profile.png")}
              alt="profile"
              className="pp"
            />
          </center>
          <h3>Name Name</h3>
          <button className="editpic">Update Info</button>
          <br />
          <br />
          <br />
          <br />
        </div>
         <div className="profile">
          <form>
            <input
              className=""
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
            <br />
            <button onClick={e => this.onEdit(e)}> Edit </button>
            <button onClick={e => this.onSubmit(e)}> Save </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
