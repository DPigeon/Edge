import React, { Component } from "react";



class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            groupDescritpion: "",
            groupList: [],
            gourpTitle: "",
            isLoaded: false


        };
    }

    componentDidMount() {
        let jwt = localStorage.getItem("jwt");
        if (jwt === undefined || jwt === null) {
            //if the user not logged in
            this.props.history.replace("/login"); //go login
        }
        fetch("http://localhost:8000/groups", {
            method: "GET"
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    groupList: json
                });
            });
    }

    handleClickItem(gN, gD, gT) {
        this.setState({
            groupName: gN,
            groupDescritpion: gD,
            groupTitle: gT

        });
    }


    groupList() {
        var { isLoaded, groups } = this.state;
        if (!isLoaded) {
            return <div> Loading the groups, please wait... </div>;
        } else {
            return (
                <div>
                    <div>
                        {groups.map(item => (
                            <div>
                                <h10>
                                    <div key={item.gN}>
                                        <ul>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        this.individualGroup()
                                                    }
                                                >
                                                    {item.groupName}
                                                    <br />
                                                    Group Description {item.groupDescritpion}
                                                    <br />
                                                    Group Title {item.groupTitle}
                                                    {/* <br/>
                          <button onclick = {() => this.individualGroup()}>
                           Join
                          </button> */}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </h10>
                            </div>
                        ))}
                        <center>
                            <button
                                className="newGroup"
                                onClick={() => this.creatGroup()}
                            >
                                Creat Group
              </button>
                        </center>
                    </div>
                </div>
            );
        }
    }




    render() {
        return (
            //should separate each group to different buttons     
            <React.Fragment>
                <div className="groupList">
                    {this.groupList}
                </div>
            </React.Fragment>
        );
    }
}

export default GroupList;