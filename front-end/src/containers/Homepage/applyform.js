import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { apiCall } from "../../api/api";
import { Typography, Slider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        { text: "Python" },
        { text: "Node.Js" },
        { text: "Django" },
        { text: "Javascript" },
        { text: "C++" },
        { text: "React Native" },
        ],
        query: "",
        list: [],
        start: true,
        home: true,
        external: true,
        value: [0,12],
        error: "",
    };
    this.changeskills= (e) => {
      this.setState({ ...this.state, skills: e });
    }
    this.handleChangechb1=(e)=>{
      this.setState({ ...this.state, home: e.target.value });
    }
    this.handleChangechb2=(e)=>{
      this.setState({ ...this.state, external: e.target.value });
    }
    this.dofilter = ()=>{
      var skillArray = [];
      this.state.skills.forEach((skill) => {
        skillArray.push(skill["text"]);
      });
      let type = [];
      if (this.state.home) type.push("Work from Home");
      if (this.state.external) type.push("External");
      let obj = {
        type: type,
        min: this.state.value[0],
        max: this.state.value[1],
        skills: skillArray,
        query: this.state.query,
      };
      console.log("aya boi", obj);
      apiCall("post", "/internship/search/filter", obj)
        .then((internships) => {
          console.log("sahi hua");
          console.log(internships);
          this.props.seti(internships)
        })
        .catch((e) => console.log(e));
    }
    this.reset=async () => {
      await this.setState({
        home: true,
        external: true,
        value:[0,12],
        skills: [],
      });
      this.dofilter()
    }
    this.filter= () => {
      this.dofilter()
    }
    this.handleSkills = this.handleSkills.bind(this);
    this.multiselectRef = React.createRef();
  }

  async handleSkills() {
    await this.setState({ error: "" });
    const skillInput = document.querySelector(".searchBox");
    var query = skillInput.value;
    console.log(query);
    apiCall("get", "/internship/skillSuggestion/" + query, "")
      .then((data) => {
        console.log(data);
        this.setState({ skills: data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="filterForm">
        <label className="labelFilter">By Skills</label>
        <Multiselect
          onSelect={this.changeskills}
          onRemove={this.changeskills}
          options={this.state.skills} // Options to display in the dropdown
          // selectedValues={context.state.skills} // Preselected value to persist in dropdown
          displayValue="text" // Property name to display in the dropdown options
          onSearch={this.handleSkills}
          ref={this.multiselectRef}
        />

        <div
          style={{ padding: "15px", marginLeft: "25px", marginRight: "25px" }}
        >
          <FormControlLabel
            control={
              <Checkbox
              checked={this.state.home}
                onChange={this.handleChangechb1}
                name="checkedB"
                color="primary"
              />
            }
            label="work from home"
          />
          <FormControlLabel
            control={
              <Checkbox
              checked={this.state.external}
                onChange={this.handleChangecb2}
                name="checkedB"
                color="primary"
              />
            }
            label="external"
          />
          <Typography id="range-slider" gutterBottom>
            duration (in months)
          </Typography>
          <Slider
            value={this.state.value}
            onChange={(e, v) => this.setState({value:v})} //
            valueLabelDisplay="auto"
            min={0}
            step={1}
            max={12}
            aria-labelledby="range-slider"
          />
        </div>
        <div className="button-holder">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => {
              this.reset();
              this.props.onHide();
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={async (e) => {
              if (
                this.state.home === false &&
                this.state.external === false
              ) {
                return await this.setState({
                  error: "Select atleast one type.",
                });
              } else {
                await this.setState({ error: "" });
                this.filter();
                this.props.onHide();
              }
            }}
          >
            Apply Filters
          </button>
        </div>
        <p style={{ color: "red" }}>{this.state.error}</p>
      </div>
    );
  }
}

export default FilterForm;
