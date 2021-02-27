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
        value: {
        min: 0,
        max: 12,
        },
        error: "",
    };
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
          // onSelect={(e) => context.changeskills(e)}
          // onRemove={(e) => context.changeskills(e)}
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
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="work from home"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange}
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
            // value={valr}
            // onChange={(e, v) => setvalr(v)} //
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
            //   context.reset();
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
                // context.state.home === false &&
                // context.state.external === false
                true
              ) {
                return await this.setState({
                  error: "Select atleast one type.",
                });
              } else {
                await this.setState({ error: "" });
                // context.filter();
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
