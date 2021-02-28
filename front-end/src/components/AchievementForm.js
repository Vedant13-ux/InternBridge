import React, { Component } from "react";

class Achievementform extends Component {
  constructor(props) {
    super(props);
    if (props.editing) {
      let getdate = (yourDate) => {
        yourDate = new Date(yourDate);
        let offset = yourDate.getTimezoneOffset();
        yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
        return yourDate.toISOString().split("T")[0];
      };
      this.state = {
        title: props.editingachm.title,
        reward: props.editingachm.reward,
        date: getdate(props.editingachm.date),
        description: props.editingachm.description,
        link: props.editingachm.link,
      };
    } else {
      this.state = {
        title: "",
        reward: "",
        date: "",
        description: "",
        link: "",
      };
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      props.onexpsub(this.state);
    };
    this.handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  }
  render() {
    const { title, reward, date, description, link } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="internshipForm">
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input
              name="title"
              maxLength="30"
              required
              value={title}
              onChange={this.handleChange}
              type="text"
              placeholder="eg. Won hackathon"
            ></input>
          </div>
          <div className="field">
            <label>Award/Prize</label>
            <input
              name="reward"
              maxLength="100"
              value={reward}
              onChange={this.handleChange}
              type="text"
              placeholder="eg. 10k Rupees"
            ></input>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Date</label>
              <input
                required
                type="Date"
                name="date"
                value={date}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label>description</label>
            <textarea
              maxlength="200"
              rows="2"
              placeholder="eg. was assigned to tech team"
              name="description"
              value={description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="field">
            <label>Link</label>
            <input
              name="link"
              value={link}
              onChange={this.handleChange}
              type="url"
              placeholder="eg. https://hackit.com/hackath..."
            ></input>
          </div>
          <div className="submit confirmdiv">
            <button className="medium ui button confirm">
              {this.props.editing ? "EDIT" : "ADD"}
            </button>
            {this.props.editing && (
              <button
                type="button"
                className="medium ui button red"
                onClick={this.props.deleteit}
              >
                DELETE
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default Achievementform;
