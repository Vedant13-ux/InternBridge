import React, { Component } from "react";

class ExperienceForm extends Component {
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
        title: props.editingexp.title,
        type: props.editingexp.type,
        company: props.editingexp.company,
        startdate: getdate(props.editingexp.startdate),
        enddate: props.editingexp.enddate
          ? getdate(props.editingexp.enddate)
          : null,
        description: props.editingexp.description,
      };
    } else {
      this.state = {
        title: "",
        type: "",
        company: "",
        startdate: "",
        enddate: null,
        description: "",
      };
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      props.onexpsub(this.state);
    };
    this.handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    this.handleenddate = (e) => {
      if (this.state.enddate === null) {
        this.setState({ enddate: false });
      } else {
        this.setState({ enddate: null });
      }
    };
  }
  render() {
    const {
      title,
      type,
      company,
      startdate,
      enddate,
      description,
    } = this.state;
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
              placeholder="eg. Retail sales manager"
            ></input>
          </div>
          <div className="field">
            <label>Type</label>
            <select
              required
              className="ui fluid dropdown"
              name="type"
              onChange={this.handleChange}
              value={type}
            >
              <option value="">None</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
              <option value="research">Research</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="field">
            <label>Company/Team</label>
            <input
              name="company"
              maxLength="30"
              required
              value={company}
              onChange={this.handleChange}
              type="text"
              placeholder="eg. Microsoft"
            ></input>
          </div>
          <div className="field">
            <input
              type="checkbox"
              defaultChecked={true}
              onClick={this.handleenddate}
            ></input>
            currently working
          </div>
          <div className="two fields">
            <div className="field">
              <label>Start date</label>
              <input
                required
                type="Date"
                name="startdate"
                value={startdate}
                onChange={this.handleChange}
              ></input>
            </div>
            {this.state.enddate !== null && (
              <div className="field">
                <label>End date</label>
                <input
                  required
                  type="Date"
                  name="enddate"
                  value={enddate}
                  onChange={this.handleChange}
                ></input>
              </div>
            )}
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

export default ExperienceForm;
